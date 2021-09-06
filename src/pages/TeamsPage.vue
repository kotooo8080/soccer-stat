<template>
    <search-form @onSearch="findTeam"/>
    <div class="wrapper">
        <p class="error-message" v-if="teamsErrorMsg"> {{ teamsErrorMsg }} </p>
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
                <tr v-for="(team, indx) in showTeams" v-bind:key='indx' v-on:click="clickedItem(team.id, team.name)">
                    <td><span>Название</span>{{ team.name }}</td>
                    <td><span>Страна</span>{{ team.area.name }}</td>
                    <td><span>Логотип</span><img v-bind:src=team.crestUrl alt='team-logo'> </td>
                    <td><span>Стадион</span>{{ team.venue }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { loadStatistics } from '../api'
import SearchForm from '../components/SearchForm.vue';

export default {
    name: 'TeamsPage',

    components: {
        SearchForm
    },

    data() {
        return {
            teams: [],
            showTeams: [],
            clickedElemId: '',
            teamsErrorMsg: '',
            //searchVal: ''
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
                this.teamsErrorMsg = 'Список команд не был получен!';
            }
        },

        findTeam(teamSearchName) {
            this.showTeams = this.teams.filter(team => team.name.toLowerCase().includes(teamSearchName.toLowerCase()));
            if(teamSearchName) {
                this.$router.push({ path: '/teams', query: { search : teamSearchName }});
            }
            else {
                this.$router.replace({ path: '/teams' });
            }
        },

        clickedItem: function (elemId, elemName) {
            this.clickedElemId = elemId;
            localStorage.setItem('teamId', elemId);
            this.$router.push({ name: 'TeamCalendarPage', query: { team : elemName } });
        }
    },

    async created() {
        await this.loadingTeamsFromAPI();
        const { search } = this.$route.query;

        if(search) {
            this.findTeam(search);
        }
    },
}
</script>