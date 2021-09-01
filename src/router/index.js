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
        path: '/competitions/:search?',
        name: 'CompetitionsPage',
        component: CompetitionsPage
    },
    {
        path: '/league-calendar/:competition?:dateFrom?:dateTo?',
        name: 'LeagueCalendarPage',
        component: LeagueCalendarPage,
        props: true,
    },
    {
        path: '/team-calendar/:team?:dateFrom?:dateTo?',
        name: 'TeamCalendarPage',
        component: TeamCalendarPage,
        props: true,
    },
    {
        path: '/teams/:search?',
        name: 'TeamsPage',
        component: TeamsPage
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;