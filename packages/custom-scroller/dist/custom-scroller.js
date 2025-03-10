(() => {
  // src/index.mjs
  function lerp(a, b, f) {
    return f * (b - a) + a;
  }
  var CustomScroller = class {
    constructor(element, easingFunction) {
      this.element = element;
      this.shouldKeepScrolling = false;
      this.hasStoppedScrolling = true;
      this.easingFunction = easingFunction || function(x) {
        return Math.sin(x * Math.PI - Math.PI / 2) * 0.5 + 0.5;
      };
    }
    scrollTo(x, y, ms) {
      const xProperty = this.element === window ? "scrollX" : "scrollLeft";
      const yProperty = this.element === window ? "scrollY" : "scrollTop";
      const originalX = this.element[xProperty];
      const originalY = this.element[yProperty];
      return new Promise((resolve, reject) => {
        try {
          this.stop().then(() => {
            this.shouldKeepScrolling = true;
            this.hasStoppedScrolling = false;
            let elapsedTime = 0;
            let lastTimestamp = /* @__PURE__ */ new Date();
            const loop = () => {
              if (this.shouldKeepScrolling) {
                window.requestAnimationFrame(loop);
              } else {
                this.hasStoppedScrolling = true;
                return resolve();
              }
              this.element.scrollTo(
                lerp(originalX, x, this.easingFunction(elapsedTime / ms)),
                lerp(originalY, y, this.easingFunction(elapsedTime / ms))
              );
              const currentTimestamp = /* @__PURE__ */ new Date();
              elapsedTime += currentTimestamp - lastTimestamp;
              lastTimestamp = currentTimestamp;
              if (elapsedTime >= ms) {
                this.shouldKeepScrolling = false;
              }
            };
            loop();
          });
        } catch (e) {
          reject(e);
        }
      });
    }
    stop() {
      return new Promise((resolve, reject) => {
        try {
          this.shouldKeepScrolling = false;
          let interval = setInterval(() => {
            if (!this.hasStoppedScrolling) return;
            clearInterval(interval);
            resolve();
          }, 5);
        } catch (e) {
          reject(e);
        }
      });
    }
  };

  // src/iife.mjs
  if (typeof globalThis !== "undefined") {
    globalThis.CustomScroller = CustomScroller;
  }
})();
