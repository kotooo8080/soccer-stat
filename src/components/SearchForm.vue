<template>
  <div class="search-form">
        <input
            v-model="searchVal"
            placeholder="Введите запрос"
            type="text"
        >
        <button class="clear-btn" v-on:click="clearSearch"></button>
        <button class="btn" v-on:click="startSearch">
           <img src="../assets/img/loupe.png" alt="Найти">
        </button>
    </div>
</template>

<script>

export default {
    name: 'SearchForm',

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

        clearSearch() {
            this.searchVal = '';
            this.$emit('onSearch', '' );
        }
    },

    created() {
        this.searchVal = this.$route.query.search;
    },
}
</script>
