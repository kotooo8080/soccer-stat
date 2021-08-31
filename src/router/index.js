import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import CompetitionsPage from '../pages/CompetitionsPage.vue'
import LeagueCalendarPage from '../pages/LeagueCalendarPage.vue'
import TeamCalendarPage from '../pages/TeamCalendarPage.vue'
import TeamsPage from '../pages/TeamsPage.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
    },
    {
        path: '/competitions',
        name: 'CompetitionsPage',
        component: CompetitionsPage
    },
    {
        path: '/league-calendar',
        name: 'LeagueCalendarPage',
        component: LeagueCalendarPage,
        props: true,
    },
    {
        path: '/team-calendar',
        name: 'TeamCalendarPage',
        component: TeamCalendarPage,
        props: true,
    },
    {
        path: '/teams/:id?',
        name: 'TeamsPage',
        component: TeamsPage
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;