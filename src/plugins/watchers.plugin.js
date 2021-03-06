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
        el.addEventListener("click", async () => {
          const tableUserName = el.children[1];
          if (tableUserName.children.length) {
            try {
              await router.push({
                path: `/users/${tableUserName.children[1].innerText}`,
              });
            } catch (e) {
              console.log(e);
            }
          } else {
            try {
              await router.push({ path: `/users/${tableUserName.innerText}` });
            } catch (e) {
              console.log(e);
            }
          }
        });
      });
    };
  },
};
