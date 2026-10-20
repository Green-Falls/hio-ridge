/* Website preview: navigation and accessible photo viewer. */
'use strict';

const logos = ["<div class=\"lockup lock-a\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 100\" fill=\"none\" role=\"img\" aria-label=\"Botanical rose illustration\"><image href=\"https://green-falls.github.io/hio-ridge/design-preview/rose-art.svg?v=704c95a\" x=\"3\" y=\"0\" width=\"74\" height=\"100\"/></svg><div><span class=\"owners\">R&amp;SVP</span><span class=\"place\">HIO RIDGE</span></div></div>", "<div class=\"lockup lock-b\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 160 180\" fill=\"none\" role=\"img\" aria-label=\"Richard and Susan staggered initials in an oval seal\" class=\"rs-seal rs-seal-small\"><ellipse cx=\"80\" cy=\"90\" rx=\"65\" ry=\"76\" stroke=\"currentColor\" stroke-width=\"2.4\"/><g fill=\"currentColor\"><path transform=\"translate(35 108) scale(.88)\" d=\"M17.285 -19.092Q17.285 -14.941 17.407 -11.841Q17.529 -8.740 17.700 -6.494Q17.871 -4.248 18.140 -2.734Q18.408 -1.221 18.701 -0.195L18.701 -0.000L6.982 -0.000L6.982 -0.195Q7.275 -1.221 7.544 -2.734Q7.812 -4.248 7.983 -6.494Q8.154 -8.740 8.276 -11.816Q8.398 -14.893 8.398 -19.092L8.398 -50.879Q8.398 -55.029 8.276 -58.130Q8.154 -61.230 7.983 -63.477Q7.812 -65.723 7.544 -67.261Q7.275 -68.799 6.982 -69.824L6.982 -70.020L9.033 -69.824Q9.961 -69.727 11.108 -69.702Q12.256 -69.678 13.477 -69.678Q15.381 -69.678 18.628 -70.142Q21.875 -70.605 26.904 -70.605Q31.592 -70.605 35.571 -69.336Q39.551 -68.066 42.480 -65.625Q45.410 -63.184 47.046 -59.644Q48.682 -56.104 48.682 -51.611Q48.682 -48.096 47.778 -45.093Q46.875 -42.090 45.239 -39.648Q43.604 -37.207 41.309 -35.327Q39.014 -33.447 36.182 -32.178L53.320 -8.105Q54.590 -6.299 55.688 -4.980Q56.787 -3.662 57.788 -2.710Q58.789 -1.758 59.717 -1.147Q60.645 -0.537 61.621 -0.195L61.621 -0.000L47.510 -0.000Q47.363 -0.928 46.558 -2.466Q45.752 -4.004 44.678 -5.518L27.393 -29.883Q26.270 -29.785 25.146 -29.712Q24.023 -29.639 22.852 -29.639Q21.484 -29.639 20.093 -29.736Q18.701 -29.834 17.285 -30.078ZM17.285 -33.887Q18.604 -33.594 19.971 -33.472Q21.338 -33.350 22.607 -33.350Q26.270 -33.350 29.297 -34.448Q32.324 -35.547 34.448 -37.793Q36.572 -40.039 37.744 -43.384Q38.916 -46.729 38.916 -51.221Q38.916 -54.883 38.086 -57.861Q37.256 -60.840 35.620 -62.915Q33.984 -64.990 31.494 -66.138Q29.004 -67.285 25.684 -67.285Q22.314 -67.285 20.312 -66.943Q18.311 -66.602 17.285 -66.211Z\"/><path transform=\"translate(80 128) scale(.88)\" d=\"M36.182 -58.887L35.107 -58.887Q34.717 -60.010 33.862 -61.426Q33.008 -62.842 31.616 -64.087Q30.225 -65.332 28.247 -66.162Q26.270 -66.992 23.584 -66.992Q21.191 -66.992 19.336 -66.260Q17.480 -65.527 16.235 -64.209Q14.990 -62.891 14.355 -61.084Q13.721 -59.277 13.721 -57.080Q13.721 -53.564 15.698 -50.366Q17.676 -47.168 20.654 -44.043Q23.633 -40.918 27.100 -37.793Q30.566 -34.668 33.545 -31.299Q36.523 -27.930 38.501 -24.243Q40.479 -20.557 40.479 -16.309Q40.479 -13.135 39.380 -9.937Q38.281 -6.738 35.986 -4.199Q33.691 -1.660 30.078 -0.073Q26.465 1.514 21.484 1.514Q18.701 1.514 16.187 1.001Q13.672 0.488 11.548 -0.269Q9.424 -1.025 7.739 -1.904Q6.055 -2.783 4.980 -3.516L6.104 -14.307L7.324 -14.307Q7.861 -12.012 9.082 -9.937Q10.303 -7.861 12.085 -6.274Q13.867 -4.688 16.162 -3.735Q18.457 -2.783 21.191 -2.783Q23.682 -2.783 25.659 -3.540Q27.637 -4.297 29.053 -5.640Q30.469 -6.982 31.226 -8.838Q31.982 -10.693 31.982 -12.891Q31.982 -15.967 30.859 -18.579Q29.736 -21.191 27.905 -23.535Q26.074 -25.879 23.755 -28.076Q21.436 -30.273 18.994 -32.495Q16.553 -34.717 14.233 -37.061Q11.914 -39.404 10.083 -42.065Q8.252 -44.727 7.129 -47.778Q6.006 -50.830 6.006 -54.492Q6.006 -58.350 7.495 -61.450Q8.984 -64.551 11.450 -66.748Q13.916 -68.945 17.041 -70.117Q20.166 -71.289 23.486 -71.289Q25.928 -71.289 27.979 -70.898Q30.029 -70.508 31.665 -69.971Q33.301 -69.434 34.521 -68.896Q35.742 -68.359 36.523 -68.018Z\"/></g></svg><div><span class=\"owners\">R&amp;SVP</span><span class=\"place\">HIO RIDGE</span></div></div>"];

function initializeWebsite() {
  const brandAnchors = ['#directions', '#route-a', '#route-b', '#type', '#sources'];
  if (brandAnchors.includes(window.location.hash)) {
    window.location.replace('./brand.html' + window.location.hash);
    return;
  }

  const direction = new URLSearchParams(window.location.search).get('direction') === 'a' ? 'a' : 'b';
  document.body.dataset.route = direction;
  const logo = logos[direction === 'a' ? 0 : 1];
  ['site-logo', 'footer-logo'].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.innerHTML = logo;
  });

  const menu = document.getElementById('menu');
  const openMenu = document.getElementById('open-menu');
  const closeMenu = document.getElementById('close-menu');
  const viewer = document.getElementById('photo-viewer');
  const viewerImage = document.getElementById('viewer-image');
  const photoCount = document.getElementById('photo-count');
  const closePhoto = document.getElementById('close-photo');
  const previousPhoto = document.getElementById('prev-photo');
  const nextPhoto = document.getElementById('next-photo');

  function updateScrollLock() {
    document.body.classList.toggle('dialog-open', Boolean(menu?.open || viewer?.open));
  }

  function closeFromBackdrop(dialog, event) {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialog.close();
  }

  if (menu && openMenu && closeMenu) {
    openMenu.setAttribute('aria-expanded', 'false');
    openMenu.addEventListener('click', () => {
      if (!menu.open) menu.showModal();
      openMenu.setAttribute('aria-expanded', 'true');
      updateScrollLock();
    });
    closeMenu.addEventListener('click', () => menu.close());
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.close());
    });
    menu.addEventListener('click', event => closeFromBackdrop(menu, event));
    menu.addEventListener('close', () => {
      openMenu.setAttribute('aria-expanded', 'false');
      updateScrollLock();
    });
  }

  const photos = Array.from(document.querySelectorAll('[data-gallery]')).map(button => ({
    button,
    source: button.dataset.full,
    image: button.querySelector('img')
  })).filter(photo => photo.source && photo.image);
  let currentPhoto = 0;

  function showPhoto(index) {
    currentPhoto = (index + photos.length) % photos.length;
    const photo = photos[currentPhoto];
    viewerImage.src = photo.source;
    viewerImage.alt = photo.image.alt;
    photoCount.textContent = (currentPhoto + 1) + ' of ' + photos.length;
  }

  if (viewer && viewerImage && photoCount && closePhoto && previousPhoto && nextPhoto && photos.length) {
    previousPhoto.disabled = photos.length < 2;
    nextPhoto.disabled = photos.length < 2;
    photos.forEach((photo, index) => {
      photo.button.addEventListener('click', () => {
        showPhoto(index);
        if (!viewer.open) viewer.showModal();
        updateScrollLock();
      });
    });
    closePhoto.addEventListener('click', () => viewer.close());
    previousPhoto.addEventListener('click', () => showPhoto(currentPhoto - 1));
    nextPhoto.addEventListener('click', () => showPhoto(currentPhoto + 1));
    viewer.addEventListener('click', event => closeFromBackdrop(viewer, event));
    viewer.addEventListener('close', updateScrollLock);
    document.addEventListener('keydown', event => {
      if (!viewer.open || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showPhoto(currentPhoto + (event.key === 'ArrowLeft' ? -1 : 1));
      }
    });
  }


}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite, {once: true});
  } else {
    initializeWebsite();
  }
}
