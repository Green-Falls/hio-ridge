// Minimal PNG decoder (8-bit RGB/RGBA, non-interlaced) for qa scripts. No dependencies.
import zlib from 'node:zlib';
export const PNG = {
  parse(buf) {
    let p = 8, width = 0, height = 0, bpp = 4, idat = [];
    while (p < buf.length) {
      const len = buf.readUInt32BE(p); const type = buf.toString('ascii', p + 4, p + 8); const data = buf.subarray(p + 8, p + 8 + len);
      if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); const ct = data[9]; bpp = ct === 6 ? 4 : ct === 2 ? 3 : 1; if (data[8] !== 8 || data[12] !== 0) throw new Error('unsupported PNG'); }
      else if (type === 'IDAT') idat.push(data);
      p += 12 + len;
    }
    const raw = zlib.inflateSync(Buffer.concat(idat));
    const stride = width * bpp, out = Buffer.alloc(width * height * 4);
    let prev = Buffer.alloc(stride);
    for (let y = 0; y < height; y++) {
      const f = raw[y * (stride + 1)]; const line = Buffer.from(raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)));
      for (let i = 0; i < stride; i++) {
        const a = i >= bpp ? line[i - bpp] : 0, b = prev[i], c = i >= bpp ? prev[i - bpp] : 0;
        if (f === 1) line[i] = (line[i] + a) & 255; else if (f === 2) line[i] = (line[i] + b) & 255; else if (f === 3) line[i] = (line[i] + ((a + b) >> 1)) & 255;
        else if (f === 4) { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); line[i] = (line[i] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255; }
      }
      for (let x = 0; x < width; x++) { const s = x * bpp, d = (y * width + x) * 4; out[d] = line[s]; out[d + 1] = bpp >= 3 ? line[s + 1] : line[s]; out[d + 2] = bpp >= 3 ? line[s + 2] : line[s]; out[d + 3] = bpp === 4 ? line[s + 3] : 255; }
      prev = line;
    }
    return { width, height, data: out };
  },
};
