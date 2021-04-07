<template>
  <tbody>
    <tr v-for="row in perPage" :key="row">
      <td v-for="cell in 9" :key="cell">
        <v-skeleton-loader indeterminate type="table-cell"></v-skeleton-loader>
      </td>
    </tr>
  </tbody>
</template>
<script>
export default {
  props: {
    perPage: Number,
  },
};
</script>
<style lang="scss">
td {
  div {
    width: 100% !important;
  }
}
</style>