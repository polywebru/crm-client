<template>
  <div class="inactive">
    <div class="inactive__inner">
      <div class="inactive__img">
        <img src="@/assets/img/inactive.jpg" alt="Аккаунт не активирован" />
      </div>
      <div class="inactive__text">
        <p>Ваш аккаунт пока не активирован, но очень скоро мы это исправим.</p>
        <p>При активации вам придет письмо на почту</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
@import "@/assets/styles/_variables.scss";
.inactive {
  display: flex;
  padding: 10px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  background-color: var(--main-bg);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  p {
    color: var(--text-color);
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    @media (max-width: 480px) {
      width: 205px;
      height: 119px;
    }
  }
  p:first-child {
    font-weight: bold;
    margin-top: 10px;
    font-size: 25px;
    text-align: center;
    line-height: 36px;
    @media (max-width: 840px) {
      font-size: 19px;
      line-height: 30px;
    }
    @media (max-width: 480px) {
      font-size: 16px;
      line-height: 19px;
    }
    @media (max-width: 330px) {
      font-size: 14px;
      line-height: 16px;
    }
  }
  p:last-child {
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
    font-size: 19px;
    line-height: 28px;
    @media (max-width: 840px) {
      font-size: 16px;
      line-height: 25px;
    }
    @media (max-width: 480px) {
      font-size: 14px;
      line-height: 16px;
    }
    @media (max-width: 330px) {
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>