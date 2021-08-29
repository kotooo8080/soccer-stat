<template>
    <div class="wrapper">
        <p v-if="compErrorMsg"> {{ compErrorMsg }} </p>
        <table v-else id="competitionsTbl">
            <caption style="display: none;">Список лиг и соревнований</caption>
            <thead>
                <tr>
                    <th id="compName">Название лиги/соревнования</th>
                    <th id="compArea">Страна</th>
                    <th id="compDate">Дата проведения</th>
                    <th id="compMatchday">Текущий день соревнования</th>
                    <th id="compWinners">Победитель</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(comp, indx) in competitions" v-bind:key='indx' v-on:click="clickedItem($event)">
                    <td>{{ comp.name }}</td>
                    <td>{{ comp.area.name }}</td>
                    <td>{{ comp.currentSeason ? comp.currentSeason.startDate + '-' + comp.currentSeason.endDate : '-' }}</td>
                    <td>{{ (!(comp.currentSeason && comp.currentSeason.currentMatchday)) ? '-' : comp.currentSeason.currentMatchday }}</td>
                    <td>{{ (comp.currentSeason && comp.currentSeason.winner) ? comp.currentSeason.winner.shortName : '-' }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { loadStatistics } from '../api';

export default {
    name: 'CompetitionsPage',

    data() {
        return {
            competitions: [],
            compErrorMsg: ''
        }
    },

    methods: {
        async loadingDataFromAPI() {
            const result = await loadStatistics('competitions/', 'competitions')
            if(result) {
                this.competitions = result;
            }
            else {
                this.compErrorMsg = 'Данные не получены!';
            }
        },

        clickedItem: function (event) {
            if (event) {
                let elemIndx = event.target.parentNode.rowIndex - 1;
                console.log(this.competitions);
                this.clickedElemId = this.competitions[elemIndx].id;
                console.log(this.competitions[elemIndx].id);
                this.$router.push({ name: 'LeagueCalendarPage', params: { compId : this.clickedElemId }})
            }
        }
    },

    created() {
        this.loadingDataFromAPI();
    }
}
</script>