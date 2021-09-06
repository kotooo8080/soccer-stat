<template>
    <div class="date-filter">
        <div class="date date-from">
            <input
                v-model="dateFrom"
                placeholder="yyyy-mm-dd"
            >
            <button class="date-clear-btn btn1" v-on:click="deleteFilterDate(true)"></button>
        </div>
        <div class="date date-to">
            <input
                v-model="dateTo"
                placeholder="yyyy-mm-dd"
            >
            <button class="date-clear-btn btn2" v-on:click="deleteFilterDate(false)"></button>
        </div>
        <button v-on:click="enterFilterDate">
            <img src="../assets/img/filter.png" alt="Отфильтровать">
        </button>
    </div>
</template>

<script>
export default {
    name: 'DateFilter',

    data() {
        return {
            dateFrom: '',
            dateTo: '',
        }
    },

    methods: {
        enterFilterDate() {
            this.$emit('onDateFilter', this.dateFrom,  this.dateTo);
        },

        deleteFilterDate(btn) {
            if(btn) {
                this.dateFrom = '';
                this.$emit('onDateFilter', '', this.dateTo );
            }
            else {
                this.dateTo = '';
                this.$emit('onDateFilter', this.dateFrom, '' );
            }
        }
    },

    created() {
        const { dateFrom } = this.$route.query;
        const { dateTo } = this.$route.query;
        if(dateFrom && dateTo) {
            this.dateFrom = dateFrom;
            this.dateTo = dateTo;
            this.enterFilterDate()
        }
    }
}
</script>