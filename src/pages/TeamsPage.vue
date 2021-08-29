<template>
    <div class="search-field">
        <input
            v-model="searchTeam"
            placeholder="Введите название команды"
            type="text"
        >
    </div>
    <div class="wrapper">
        <p v-if="teamsErrorMsg"> {{ teamsErrorMsg }} </p>
        <table v-else id="teamsTbl">
            <caption style="display: none;">Список команд</caption>
            <thead>
                <tr>
                    <th id="teamName">Название команды</th>
                    <th id="teamArea">Страна</th>
                    <th id="teamImg">Логотип</th>
                    <th id="teamVenue">Стадион</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(team, indx) in showTeams" v-bind:key='indx' v-on:click="clickedItem($event)">
                    <td>{{ team.name }}</td>
                    <td>{{ team.area.name }}</td>
                    <td><img v-bind:src=team.crestUrl alt='team-logo'> </td>
                    <td>{{ team.venue }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { loadStatistics } from '../api'

export default {
    name: 'TeamsPage',

    data() {
        return {
            teams: [],
            searchTeam: '',
            foundTeams: [],
            showTeams: [],
            clickedElemId: '',
            teamsErrorMsg: ''
        }
    },

    methods: {
        async loadingTeamsFromAPI() {
            const result = await loadStatistics('teams/', 'teams')
            if(result) {
                this.teams = result;
                this.showTeams = this.teams;
            }
            else {
                this.teamsErrorMsg = 'Данные не получены!';
            }
            //this.showTeams = this.teams;
        },

        findTeam() {
            this.showTeams = this.teams.filter(team => team.name.toLowerCase().includes(this.searchTeam.toLowerCase()));
        },

        clickedItem: function (event) {
            if (event) {
                let elemIndx = event.target.parentNode.rowIndex - 1;
                this.clickedElemId = this.teams[elemIndx].id;
                this.$router.push({ name: 'TeamCalendarPage', params: { teamId : this.clickedElemId }})
            }
        }
    },

    created() {
        this.loadingTeamsFromAPI();
    },

    watch: {
        searchTeam: function() {
            this.findTeam();
        }
    }
}
</script>