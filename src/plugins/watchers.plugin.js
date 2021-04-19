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
    Vue.prototype.$watchClickRow = function(elemClass, router) {
      document.querySelectorAll(elemClass).forEach((el) => {
        el.addEventListener("click", () => {
          const tableUserName = el.children[1];
          if (tableUserName.children.length) {
            router.push({
              path: `/users/${tableUserName.children[1].innerText}`,
            });
          } else {
            router.push({ path: `/users/${tableUserName.innerText}` });
          }
        });
      });
    };
  },
};
