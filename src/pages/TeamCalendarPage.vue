<template>
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
                <tr v-for="(match, indx) in matches" v-bind:key='indx'>
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

export default {
    name: 'TeamCalendarPage',


    data() {
        return {
            matches: [],
            teamID: 0,
            teamCalErrorMsg: ''
        }
    },

    methods: {
        async loadingTeamCalendarFromAPI() {
            const result = await loadStatistics(`teams/${this.$route.params.teamId}/matches/`, 'matches');
            if(result) {
                this.matches = result;
            }
            else {
                this.teamCalErrorMsg = 'Данные не получены!';
            }
            // this.teamID = this.$route.params.teamId;
            // await loadStatistics(`teams/${this.teamID}/matches/`, 'matches');
        },
    },

    created() {
        this.loadingTeamCalendarFromAPI()
    }
}
</script>