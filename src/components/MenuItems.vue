<template>
    <!-- <ul>
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/competitions">Соревнования</router-link></li>
        <li><router-link to="/teams">Команды</router-link></li>
        <li><router-link to="/league-calendar">Календарь лиги</router-link></li>
        <li><router-link to="/team-calendar">Календарь команды</router-link></li>
    </ul> -->

    <div>
        <router-link to="/">Главная</router-link> | 
        <router-link to="/competitions">Соревнования</router-link> |
        <router-link to="/teams">Команды</router-link> |
        <router-link to="/league-calendar">Календарь лиги</router-link> |
        <router-link to="/team-calendar">Календарь команды</router-link>
    </div>
    <router-view />
</template>

<script>
export default {
    name: 'MenuItems',

    data() {
        return {
        }
    }
}
</script>