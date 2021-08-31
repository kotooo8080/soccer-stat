<template>
    <div class="wrapper">
        <p v-if="leagueCalErrorMsg"> {{ leagueCalErrorMsg }} </p>
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
                <tr v-for="(match, indx) in leagueMatches" v-bind:key='indx'>
                    <td>{{ match.homeTeam.name }} - {{ match.awayTeam.name }}</td>
                    <td>{{ match.utcDate }}</td>
                    <td>{{ match.status === 'FINISHED' ? match.score.fullTime.homeTeam + ' : ' + match.score.fullTime.awayTeam : '-' }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { loadStatistics } from '../api';

export default {
    name: 'LeagueCalendarPage',

    data() {
        return {
            leagueMatches: [],
            leagueCalErrorMsg: ''
        }
    },

    methods: {
        async loadingLeagueCalendarFromAPI() {
            const result = await loadStatistics(`competitions/${this.$route.params.compId}/matches/`, 'matches');
            if(result) {
                this.leagueMatches = result;
            }
            else {
                this.leagueCalErrorMsg = 'Данные о лиге/соревновании не были получены!';
            }
        }
    },

    created() {
        this.loadingLeagueCalendarFromAPI()
    }
}
</script>