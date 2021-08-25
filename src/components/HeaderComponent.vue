<template>
  <div class="logo">
    <h1>{{ msg }}</h1>
  </div>
  <menu-items />
</template>

<script>
import MenuItems from './MenuItems.vue';

export default {
  name: 'HeaderComponent',
  components: {
    MenuItems
  },

  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
