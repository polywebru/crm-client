export default {
  install(Vue, _) {
    Vue.prototype.$watchScroll = function(elemClass) {
      document.querySelector(elemClass).addEventListener("scroll", (event) => {
        if (
          Math.round(
            event.target.clientWidth -
              event.target.scrollWidth +
              event.target.scrollLeft
          ) === 0
        ) {
          event.target.classList.add("fullScroll");
        } else {
          event.target.classList.remove("fullScroll");
        }
      });
    };
  },
};