import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserHome from "../views/User/HomeView.vue";
import UserApplications from "../views/User/ApplicationsView.vue";
import UserCourts from "../views/User/CourtsView.vue";
import UserMeetings from "../views/User/MeetingsView.vue";
import JudgeHome from "../views/Judge/HomeView.vue";
import JudgeCourts from "../views/Judge/CourtsView.vue";
import JudgeMeetings from "../views/Judge/MeetingsView.vue";
import CourtAdminHome from "../views/CourtAdmin/HomeView.vue";
import CourtAdminApplications from "../views/CourtAdmin/ApplicationsView.vue";
import ChancelleryHome from "../views/Chancellery/HomeView.vue";
import СhanApplications from "../views/Chancellery/ApplicationsView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user',
    name: 'user_home',
    component: UserHome
  },
  {
    path: '/user/applications',
    name: 'user_applications',
    component: UserApplications
  },
  {
    path: '/user/courts',
    name: 'user_courts',
    component: UserCourts
  },
  {
    path: '/user/meetings',
    name: 'user_meetings',
    component: UserMeetings
  },
  {
    path: '/judge',
    name: 'judge_home',
    component: JudgeHome
  },
  {
    path: '/judge/courts',
    name: 'judge_courts',
    component: JudgeCourts
  },
  {
    path: '/judge/meetings',
    name: 'judge_meetings',
    component: JudgeMeetings
  },
  {
    path: '/court_admin',
    name: 'court_admin_home',
    component: CourtAdminHome
  },
  {
    path: '/court_admin/applications',
    name: 'court_admin_applications',
    component: CourtAdminApplications
  },
  {
    path: '/chancellery',
    name: 'chancellery_home',
    component: ChancelleryHome
  },
  {
    path: '/chancellery/applications',
    name: 'chancellery_applications',
    component: СhanApplications
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
