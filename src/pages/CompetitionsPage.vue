<template>
    <search-field @onSearch="findCompetition"/>
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
                <tr v-for="(comp, indx) in showCompetitions" v-bind:key='indx' v-on:click="clickedItem(comp.id)">
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
import SearchField from '../components/SearchField.vue';

export default {
    name: 'CompetitionsPage',

    components: {
        SearchField
    },

    data() {
        return {
            competitions: [],
            compErrorMsg: '',
            showCompetitions: []
        }
    },

    methods: {
        async loadingDataFromAPI() {
            this.showCompetitions = null;
            const result = await loadStatistics('competitions/', 'competitions')
            if(result) {
                this.competitions = result;
                this.showCompetitions = this.competitions;
            }
            else {
                this.compErrorMsg = 'Список лиг/соревнований не был получен!';
            }
        },

        findCompetition(compSearchName) {
            this.showCompetitions = this.competitions.filter(comp => comp.name.toLowerCase().includes(compSearchName.toLowerCase()));
        },


        clickedItem: function (elemId) {
            this.clickedElemId = elemId;
            this.$router.push({ name: 'LeagueCalendarPage', params: { compId : this.clickedElemId }});
        }
    },

    created() {
        this.loadingDataFromAPI();
    }
}
</script>