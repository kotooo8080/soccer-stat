<template>
    <div class="menu-items">
        <div class="menu">
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
    </div>
</template>

<script>
export default {
    name: 'MenuItems',

    data() {
        return {
            items: [
                { linkText: '/competitions', itemText: 'Соревнования' },
                { linkText: '/teams', itemText: 'Команды' },
            ],
            selectedId: 0
        }
    },
}
</script>