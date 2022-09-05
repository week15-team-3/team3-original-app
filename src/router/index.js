// import { shallowReadonly } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import SalaryView from "../views/SalaryView.vue"
import MainCalendar from "../views/MainCalendarView.vue"
import RegisterWorkView from "../views/RegisterWorkView.vue"

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
  {
    path: "/registerwork",
    name: "registerWork",
    component: RegisterWorkView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
