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

const functions = require("firebase-functions")
//npm installしたgoogleAPIを宣言
const googleAPI = require("googleapis")

exports.appendSpreadSheet = functions
  .region("asia-northeast1")
  //この実装では、Cloud Firestoreの「hoge」というコレクションに値が追加されたら、スプレッドシートに書き込みをします
  .firestore.document("hoge/{hogeId}")
  .onCreate((snap, context) => {
    const foo = snap.data()
    googleAPI.auth
      .getClient({
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      })
      .then((auth) => {
        const sheets = google.sheets("v4")
        sheets.spreadsheets.values.append({
          auth,
          //シートのURLの https://docs.google.com/spreadsheets/Idはここの部分/edit#gid=0
          spreadsheetId: "1ZJLHOBxXV7xWuJ7yA-AuzmFokdfeb-d0YI7rPq4R-18",
          //書き込み先のシート名
          range: "master",
          //セル範囲
          //公式を参照→ https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append?hl=ja#InsertDataOption
          valueInputOption: "RAW",
          insertDataOption: "INSERT_ROWS",
          resource: {
            values: [
              [
                //ドキュメントキー
                hoge.hogeId,
                //書き込みたいドキュメントの中身
                foo.name,
                foo.age,
              ],
            ],
          },
        })
      })
  })
