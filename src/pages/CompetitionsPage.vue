<template>
    <div class="wrapper">
        <table id="competitionsTbl">
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
                <tr v-for="(comp, indx) in competitions" v-bind:key='indx'>
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
        }
    },

    methods: {
        async loadingDataFromAPI() {
            await loadStatistics(this, 'competitions/', 'competitions');
            console.log(this.competitions);
        }
    },

    created() {
        this.loadingDataFromAPI();
    }
}
</script>