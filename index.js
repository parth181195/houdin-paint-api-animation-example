start = performance.now();
let logo = document.querySelector('.logo');
let style = window.getComputedStyle(logo);
let maxTick = style.getPropertyValue('--tick');
isRunning = false;
start = performance.now();

logo.addEventListener('click', event => {
  start = performance.now();
  isRunning = true;

  requestAnimationFrame(function animate(now) {
    count = Math.floor(now - start)
    logo.style.cssText = `--animation-tick: ${count};`;
    if (count > maxTick) {
      // logo.style.cssText = `--animation-tick: 50`;
      isRunning = false;
      return;
    }
    requestAnimationFrame(animate);
  })

})