<template>
  <div>
    <div class="profile-head">
      <div class="profile-avatar">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
      </div>
    </div>
    <main class="profile-main">
      <div class="profile-info">
        <v-skeleton-loader
          class="text-center"
          type="text"
          v-for="loader in 4"
          :key="loader"
        ></v-skeleton-loader>
      </div>
      <div class="profile-skills">
        <v-skeleton-loader
          type="chip"
          v-for="loader in 10"
          :key="loader"
        ></v-skeleton-loader>
      </div>
      <div class="profile-resources-loader">
        <div class="change-view">
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </div>
        <div class="profile-contacts">
          <v-skeleton-loader type="text"></v-skeleton-loader>
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </div>
      </div>
      <div class="activities">
        <v-skeleton-loader
          type="card"
          class="projects-loader"
        ></v-skeleton-loader>
        <v-skeleton-loader
          type="card"
          class="projects-loader"
        ></v-skeleton-loader>
      </div>
    </main>
  </div>
</template>
<style lang="scss" scoped>
.profile-resources-loader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .change-view {
    margin-left: 20px;
  }
  .profile-contacts {
    min-width: 100px;
    display: flex;
    & div {
      min-width: 100px;
      margin-right: 20px;
    }
  }
}
.v-skeleton-loader__card-heading {
  display: none;
}
</style>