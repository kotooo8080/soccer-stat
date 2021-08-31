<template>
    <date-filter @onDateFilter="dateFiltering"/>
    <div class="wrapper">
        <p v-if="teamCalErrorMsg"> {{ teamCalErrorMsg }} </p>
        <table v-else id="teamCalendarTbl">
            <caption style="display: none;">Календарь команды</caption>
            <thead>
                <tr>
                    <th id="teamCompName">Название соревнования</th>
                    <th id="teamCompArea">Страна</th>
                    <th id="teamCompStatus">Статус</th>
                    <th id="teamCompTeams">Команды</th>
                    <th id="teamsScore">Счет</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(match, indx) in (!filteredMatches ? matches : filteredMatches)" v-bind:key='indx'>
                    <td>{{ match.competition.name }}</td>
                    <td>{{ match.competition.area.name }}</td>
                    <td>{{ match.status }}</td>
                    <td>{{ match.homeTeam.name }} - {{ match.awayTeam.name }}</td>
                    <td>{{ match.status === 'FINISHED' ? match.score.fullTime.homeTeam + ' : ' + match.score.fullTime.awayTeam : '-' }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { loadStatistics } from '../api';
import DateFilter from '../components/DateFilter.vue';

export default {
    name: 'TeamCalendarPage',

    components: {
        DateFilter
    },

    data() {
        return {
            matches: [],
            teamCalErrorMsg: '',
            filteredMatches: []
        }
    },

    methods: {
        async loadingTeamCalendarFromAPI() {
            this.filteredMatches = null;
            const result = await loadStatistics(`teams/${this.$route.params.teamId}/matches/`, 'matches');
            if(result) {
                this.matches = result;
            }
            else {
                this.teamCalErrorMsg = 'Данные о команде не были получены!';
            }
        },

        async dateFiltering(startDate, endDate) {
            // console.log(startDate);
            // console.log(endDate);
            //let filterResult = [];
            if(startDate) {
                if(endDate) {
                    this.filteredMatches = await loadStatistics(`teams/${this.$route.params.teamId}/matches?dateFrom=${startDate}&dateTo=${endDate}`, 'matches');
                }
                // else {
                //     this.filteredMatches = await loadStatistics(`teams/${this.$route.params.teamId}/matches?dateFrom=${startDate}&dateTo=${null}`, 'matches');
                // }
            }
            // else if(endDate) {
            //     this.filteredMatches = await loadStatistics(`teams/${this.$route.params.teamId}/matches?dateFrom=${}&dateTo=${endDate}`, 'matches');
            // }
            // else {
            //     this.teamCalErrorMsg = 'Данные о команде не были получены!';
            // }
            //console.log(filterResult);
        }
    },

    created() {
        this.loadingTeamCalendarFromAPI()
    }
}
</script>