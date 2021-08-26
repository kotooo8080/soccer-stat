<template>
    <div class="menu-items">
        <ul>
            <li v-for="(item, indx) in items" :key=indx :class="selectedId === indx ? 'highlighted' : null">
                <router-link 
                    v-bind:to="item.linkText"
                    @click="clickedElemHighlight(indx)"
                >
                {{ item.itemText }}</router-link>
            </li>
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

    methods: {
        clickedElemHighlight(id) {
            this.selectedId = id;
        }
    }
}
</script>