// import { shallowReadonly } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import SalaryView from "../views/SalaryView.vue"
import MainCalendar from "../views/MainCalendar.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/maincalendar",
    name: "calendar",
    component: MainCalendar,
  },
  {
    path: "/salary",
    name: "salary",
    component: SalaryView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
