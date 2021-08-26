<template>
    <div class="wrapper">
        <table id="teamsTbl">
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
                <tr v-for="(team, indx) in teams" v-bind:key='indx'>
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
        }
    },

    methods: {
        async loadingTeamsFromAPI() {
            await loadStatistics(this, 'teams/', 'teams');
        }
    },

    created() {
        this.loadingTeamsFromAPI();
    },
}
</script>