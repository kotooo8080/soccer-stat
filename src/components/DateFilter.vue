<template>
    <div class="date-filter">
        <p>с: </p>
        <input
            v-model="dateFrom"
            placeholder="Введите начальную дату"
        >
        <p>по: </p>
        <input
            v-model="dateTo"
            placeholder="Введите конечную дату"
        >
        <button v-on:click="enterFilterDate">OK</button>
    </div>
</template>

<script>
export default {
    name: 'DateFilter',

    data() {
        return {
            dateFrom: '',
            dateTo: ''
        }
    },

    methods: {
        enterFilterDate() {
            this.$emit('onDateFilter', this.dateFrom,  this.dateTo);
        }
    }
}
</script>