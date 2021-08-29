<template>
    <div class="menu-items">
        <ul>
            <router-link
                v-for="(item, indx) in items" v-bind:key=indx 
                tag="li"
                v-bind:to="item.linkText"
            >
                {{ item.itemText }}
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MenuItems',

    data() {
        return {
            items: [
                { linkText: '/', itemText: 'Главная' },
                { linkText: '/competitions', itemText: 'Соревнования' },
                { linkText: '/teams', itemText: 'Команды' },
                { linkText: '/league-calendar', itemText: 'Календарь лиги' },
                { linkText: '/team-calendar', itemText: 'Календарь команды' }
            ],
            selectedId: 0
        }
    },
}
</script>