<template>
    <date-filter @onDateFilter="dateFiltering"/>
    <p class="error-message" v-if="incorrectDate"> {{ incorrectDate }} </p>
    <div class="wrapper">
        <p class="error-message" v-if="teamCalErrorMsg"> {{ teamCalErrorMsg }} </p>
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
                    <td><span>Название</span>{{ match.competition.name }}</td>
                    <td><span>Страна</span>{{ match.competition.area.name }}</td>
                    <td><span>Статус</span>{{ match.status }}</td>
                    <td><span>Команды</span>{{ match.homeTeam.name }} - {{ match.awayTeam.name }}</td>
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
    name: 'TeamCalendarPage',

    components: {
        DateFilter
    },

    data() {
        return {
            matches: [],
            teamCalErrorMsg: '',
            filteredMatches: [],
            incorrectDate: '',
            teamID: ''
        }
    },

    methods: {
        async loadingTeamCalendarFromAPI() {
            this.filteredMatches = null;
            this.teamID = localStorage.getItem('teamId');
            const result = await loadStatistics(`teams/${this.teamID}/matches/`, 'matches');
            if(result.length) {
                this.matches = result;
            }
            else {
                this.teamCalErrorMsg = 'Данные о соревнованиях команды не были получены!';
            }
        },

        async dateFiltering(startDate, endDate) {
            this.incorrectDate = '';
            let teamName = this.$route.query.team;
            if(startDate && endDate) {
                this.filteredMatches = await loadStatistics(`teams/${this.teamID}/matches?dateFrom=${startDate}&dateTo=${endDate}`, 'matches');
                this.$router.push({ name: 'TeamCalendarPage', query: { team : teamName, dateFrom : startDate, dateTo : endDate }});
                this.incorrectDate = '';
            }
            else {
                this.incorrectDate = 'Вы ввели не все данные!';
                this.$router.push({ name: 'TeamCalendarPage', query: { team : teamName }});
                this.filteredMatches = null;
            }
        }
    },

    created() {
        this.loadingTeamCalendarFromAPI()
    }
}
</script>