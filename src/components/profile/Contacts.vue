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
                fill="black"
              />
            </svg>
          </div>
        </div>
      </template>
      <!-- Using v-once directive -->
      <ul class="contacts-items">
        <li class="contacts-item" v-if="hasUserPhone">
          <div class="contacts-icon" v-once>
            <img src="@/assets/img/tel.svg" alt="Телефон" />
          </div>
          <div class="phone" @click="copyText($event.target)">
            <slot name="phone"></slot>
          </div>
        </li>
        <li class="contacts-item">
          <div class="contacts-icon" v-once>
            <img src="@/assets/img/mail.svg" alt="Email" />
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
}
.phone {
  margin-left: 14px;
}
.v-menu__content {
  max-width: 200px !important;
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