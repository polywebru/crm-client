<template>
  <div class="contacts">
    <v-menu max-width="300px" offset-y>
      <template v-slot:activator="{ attrs, on }">
        <div class="contacts-opener" v-bind="attrs" v-on="on">
          <div class="menu-title">Контактная информация</div>
          <div class="arrow">
            <svg
              viewBox="0 0 15 10"
              class="arrow-vector"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.0441427 2.20165L1.40498 0.909147L7.49998 6.73915L13.595 0.909147L14.9558 2.20165L7.49998 9.33331L0.0441427 2.20165Z"
                class="vector"
              />
            </svg>
          </div>
        </div>
      </template>
      <!-- Using v-once directive -->
      <ul class="contacts-items">
        <li class="contacts-item" v-if="hasUserPhone">
          <div class="contacts-icon">
            <svg
              width="26"
              height="20"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7527 6.54008L7.66495 1.82154C7.1937 1.27779 6.32975 1.2802 5.78237 1.82879L2.42079 5.19641C1.42029 6.19812 1.13391 7.68558 1.7127 8.8782C5.17049 16.0375 10.9444 21.8196 18.0989 25.2874C19.2903 25.8662 20.7766 25.5798 21.7771 24.5781L25.1701 21.179C25.7199 20.6292 25.7211 19.7605 25.1725 19.2892L20.4358 15.2232C19.9404 14.7978 19.1707 14.8534 18.6741 15.3512L17.0259 17.0018C16.9415 17.0903 16.8305 17.1486 16.7098 17.1678C16.589 17.187 16.4654 17.166 16.3577 17.1082C13.6637 15.5568 11.4289 13.3191 9.88104 10.623C9.82307 10.5152 9.80208 10.3913 9.82129 10.2704C9.8405 10.1495 9.89884 10.0382 9.98737 9.95362L11.6307 8.30908C12.1285 7.80883 12.1829 7.03549 11.7527 6.53887V6.54008Z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="phone-vector"
              />
            </svg>
          </div>
          <div class="phone" @click="copyText($event.target)">
            <slot name="phone"></slot>
          </div>
        </li>
        <li class="contacts-item">
          <div class="contacts-icon">
            <svg
              width="23"
              height="15"
              viewBox="0 0 27 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.375 0.4375H2.625C2.1443 0.4375 1.68328 0.628459 1.34337 0.968369C1.00346 1.30828 0.8125 1.7693 0.8125 2.25V16.75C0.8125 17.2307 1.00346 17.6917 1.34337 18.0316C1.68328 18.3715 2.1443 18.5625 2.625 18.5625H24.375C24.8557 18.5625 25.3167 18.3715 25.6566 18.0316C25.9965 17.6917 26.1875 17.2307 26.1875 16.75V2.25C26.1875 1.7693 25.9965 1.30828 25.6566 0.968369C25.3167 0.628459 24.8557 0.4375 24.375 0.4375ZM22.3812 2.25L13.5 8.39437L4.61875 2.25H22.3812ZM2.625 16.75V3.07469L12.9834 10.2431C13.1351 10.3484 13.3154 10.4048 13.5 10.4048C13.6846 10.4048 13.8649 10.3484 14.0166 10.2431L24.375 3.07469V16.75H2.625Z"
                class="mail-vector"
              />
            </svg>
          </div>
          <div class="mail" @click="copyText($event.target)">
            <slot name="email"></slot>
          </div>
        </li>
      </ul>
    </v-menu>
    <v-alert
      class="success-alert"
      dense
      :class="{ show: isShowAlert }"
      type="success"
    >
      Скопировано!
    </v-alert>
  </div>
</template>
<script>
export default {
  props: {
    hasUserPhone: Boolean,
  },
  data() {
    return {
      isShowAlert: false,
    };
  },
  methods: {
    copyText(element) {
      const range = document.createRange();
      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      this.changeAlertVisibility();
    },
    changeAlertVisibility() {
      this.isShowAlert = true;
      setTimeout(() => {
        this.isShowAlert = false;
      }, 1500);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.contacts {
  margin-right: 45px;
  position: relative;
  &-opener {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    .arrow {
      transition: 0.3s;
      &-vector {
        width: 15px;
        height: 10px;
        @media (max-width: 320px) {
          margin-left: 5px;

          width: 9px;
          height: 7px;
        }
      }
    }
    &[aria-expanded="true"] {
      .arrow {
        transform: rotate(180deg);
        transition: 0.3s;
      }
    }
  }
  &-item {
    display: flex;
    align-items: center;
    &:nth-child(2) {
      margin-top: 25px;
    }
  }
  &-icon {
    margin-top: 5px;
  }
  &-items {
    padding: 15px 17px;
    background-color: var(--menu-bg);
    div {
      color: var(--text-color);
    }
  }
}

.phone,
.mail {
  font-size: 14px;
  cursor: pointer;
}
.mail {
  margin-left: 20px;
  max-width: 164px;
  overflow: hidden;
  text-overflow: ellipsis;
  &-vector {
    fill: var(--text-color);
  }
}
.phone {
  margin-left: 14px;
  &-vector {
    stroke: var(--text-color);
  }
}
.v-menu__content {
  max-width: 200px !important;
  margin-top: 10px;
  @media (max-width: 480px) {
    left: 30% !important;
    transform: translateX(-50%);
  }
  @media (max-width: 340px) {
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>