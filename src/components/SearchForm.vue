<template>
  <div class="search-form">
        <div class="search">
            <input
                v-model="searchVal"
                placeholder="Введите запрос"
                type="text"
            >
            <button class="btn3 clear-btn" v-on:click="clearSearch"></button>
        </div>
        <button class="btn" type="submit" v-on:click="startSearch" v-on:keyup.enter="startSearch">
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
