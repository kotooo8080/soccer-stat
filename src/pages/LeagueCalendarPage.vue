<template>
    <date-filter @onDateFilter="dateFiltering"/>
    <p class="error-message" v-if="incorrectDate"> {{ incorrectDate }} </p>
    <div class="wrapper">
        <p class="error-message" v-if="leagueCalErrorMsg"> {{ leagueCalErrorMsg }} </p>
        <table v-else id="leagueCalendarTbl">
            <caption style="display: none;">Календарь лиги</caption>
            <thead>
                <tr>
                    <th id="LCTeams">Команды</th>
                    <th id="LCDate">Дата</th>
                    <th id="LCScore">Счет</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(match, indx) in (!filteredComp ? leagueMatches : filteredComp)" v-bind:key='indx'>
                    <td><span>Команды</span>{{ match.homeTeam.name }} - {{ match.awayTeam.name }}</td>
                    <td><span>Дата</span>{{ match.utcDate }}</td>
                    <td><span>Счет</span>{{ match.status === 'FINISHED' ? match.score.fullTime.homeTeam + ' : ' + match.score.fullTime.awayTeam : '-' }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { loadStatistics } from '../api';
import DateFilter from '../components/DateFilter.vue';

export default {
    name: 'LeagueCalendarPage',

    components: {
        DateFilter
    },

    data() {
        return {
            leagueMatches: [],
            leagueCalErrorMsg: '',
            filteredComp: [],
            compID: '',
            incorrectDate: ''
        }
    },

    methods: {
        async loadingLeagueCalendarFromAPI() {
            this.filteredComp = null;
            this.compID = localStorage.getItem('compId');
            const result = await loadStatistics(`competitions/${this.compID}/matches/`, 'matches');
            if(result && result.length) {
                this.leagueMatches = result;
            }
            else {
                this.leagueCalErrorMsg = 'Данные о лиге/соревновании не были получены!';
            }
        },

        async dateFiltering(startDate, endDate) {
            this.incorrectDate = '';
            let compName = this.$route.query.competition;
            if(startDate && endDate) {
                this.filteredComp = await loadStatistics(`competitions/${this.compID}/matches?dateFrom=${startDate}&dateTo=${endDate}`, 'matches');
                this.$router.push({ name: 'LeagueCalendarPage', query: { competition : compName, dateFrom : startDate, dateTo : endDate }});
            }
            else {
                this.incorrectDate = 'Вы ввели не все данные!';
                this.$router.push({ name: 'LeagueCalendarPage', query: { competition : compName }});
                this.filteredComp = null;
            }
        }
    },

    created() {
        this.loadingLeagueCalendarFromAPI()
    }
}
</script>