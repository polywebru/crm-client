<template>
  <div class="box">
    <div class="cat">
      <div class="cat__body"></div>
      <div class="cat__body"></div>
      <div class="cat__tail"></div>
      <div class="cat__head"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin fill-full($dir: "full", $type: absolute) {
  position: $type;
  @if $dir != "bottom" {
    top: 0;
  }
  @if $dir != "right" {
    left: 0;
  }
  @if $dir != "left" {
    right: 0;
  }
  @if $dir != "top" {
    bottom: 0;
  }
}

.cat {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 200px;
  @media (max-width: 480px) {
    max-width: 150px;
  }
  overflow: hidden;

  &::before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  &:hover > * {
    animation-play-state: paused;
  }
  &:active > * {
    animation-play-state: running;
  }
}

%cat-img {
  @include fill-full;
  animation: rotating 3s cubic-bezier(0.65, 0.54, 0.12, 0.93) infinite;

  &::before {
    content: "";
    position: absolute;
    width: 50%;
    height: 50%;
    background-size: 200%;
    background-repeat: no-repeat;
    background-image: url("../assets/img/cat_loader.png");
  }
}

.cat__head {
  @extend %cat-img;

  &::before {
    top: 0;
    right: 0;
    background-position: 100% 0%;
    transform-origin: 0% 100%;
    transform: rotate(80deg);
  }
}

.cat__tail {
  @extend %cat-img;
  animation-delay: 0.2s;

  &::before {
    left: 0;
    bottom: 0;
    background-position: 0% 100%;
    transform-origin: 100% 0%;
    transform: rotate(-48deg);
  }
}

.cat__body {
  @extend %cat-img;
  animation-delay: 0.1s;

  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }

  &::before {
    right: 0;
    bottom: 0;
    background-position: 100% 100%;
    transform-origin: 0% 0%;
  }
}

@keyframes rotating {
  from {
    transform: rotate(720deg);
  }
  to {
    transform: none;
  }
}

.box {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: center;
  align-items: center;
  background-color: #e6dcdc;
}
</style>