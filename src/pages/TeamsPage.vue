<template>
    <search-field @onSearch="findTeam"/>
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
                <tr v-for="(team, indx) in showTeams" v-bind:key='indx' v-on:click="clickedItem(team.id)">
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
import SearchField from '../components/SearchField.vue';

export default {
    name: 'TeamsPage',

    components: {
        SearchField
    },

    data() {
        return {
            teams: [],
            showTeams: [],
            clickedElemId: '',
            teamsErrorMsg: '',
            searchVal: ''
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
            //this.$router.push({ name: 'TeamPage', params: { searchValue : teamSearchName }});
            // this.$router.replace({ name: 'TeamPage', query: {id:teamSearchName} });
            this.$router.push({path:'/teams', query:{id: teamSearchName}})
        },

        clickedItem: function (elemId) {
            this.clickedElemId = elemId;
            this.$router.push({ name: 'TeamCalendarPage', params: { teamId : this.clickedElemId }});
        }
    },

    created() {
        this.loadingTeamsFromAPI();
        //let param = this.$route.query.id;
        // if(param !== undefined) {
        //     this.findTeam(param);
        //     this.searchVal = param;
        // }
    },
}
</script>