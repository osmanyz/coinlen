export default function WindowSizes() {
  let sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener('resize', function () {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
  });

  window.removeEventListener('resize', function () {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
  });

  return sizes;
}
