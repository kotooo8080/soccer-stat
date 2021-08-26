<template>
  <div class="header">
    <div class="logo">
      <h1>{{ msg }}</h1>
      <h4>Статистика ведущих европейских турниров по футболу</h4>
    </div>
    <menu-items />
  </div>
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
