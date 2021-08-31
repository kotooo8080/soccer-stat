<template>
  <div class="search-field">
        <input
            v-model="searchVal"
            placeholder="Введите запрос"
            type="text"
        >
        <button v-on:click="startSearch">Найти</button>
    </div>
</template>

<script>

export default {
    name: 'SearchField',

    data() {
        return {
            searchVal: '',
            emptyStrMsg: ''
        }
    },

    methods: {
        startSearch() {
            if(this.searchVal) {
                this.$emit('onSearch', this.searchVal );
                this.emptyStrMsg = '';
            }
        },
    },

    created() {
        this.searchVal = this.$route.query.search;
    },
}
</script>
