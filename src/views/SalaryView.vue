<template>
  <div class="content">
    <div class="user-title">
      <button @click="prevMonth">前の月</button>
      <h2>{{ displayMonth }}の{{ userName }}さんの給料</h2>
      <button @click="nextMonth">次の月</button>
    </div>
    <div id="salary_for-each-area">
      <ul class="salary_for-each">
        <li v-for="job in Jobs" :key="job.id">
          {{ job.name }}：時給（{{ job.wage }}円）×働いた時間（{{
            job.hours
          }}h）＝{{ Math.trunc(job.wage * job.hours) }}円
        </li>
      </ul>
    </div>
    <h2 id="total-salary">合計：{{ computeTotalWage }}円</h2>
  </div>
</template>

<script>
import moment from "moment"
import { db, auth } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

export default {
  data() {
    return {
      // 月関連の変数
      currentDate: moment(),
      // firebase関連の変数
      user: auth.currentUser,
      userName: null,
      userData: null,
      userDataRef: null,
      userSnap: null,
      // シフト情報を保存する変数
      events: [],
      currentEvents: [],
      // バイト先情報を保存する変数
      Jobs: [],
    }
  },
  methods: {
    // firestore関連の関数
    checkUserLogin() {
      if (this.user !== null) {
        this.userName = this.user.displayName
        this.userDataRef = doc(db, "users", this.userName)
      } else {
        this.userName = "未ログイン"
        this.userDataRef = ""
        console.log("ログインしてください。")
      }
    },
    userSnapGet: async function () {
      this.userSnap = await getDoc(this.userDataRef)
      this.userData = await this.userSnap.data()
    },
    getFirestoreData() {
      this.events = this.userData.events
      this.Jobs = this.userData.jobs
    },
    // 月関連の関数
    nextMonth() {
      this.currentDate = moment(this.currentDate).add(1, "month")
      console.log(this.currentDate)
    },
    prevMonth() {
      this.currentDate = moment(this.currentDate).subtract(1, "month")
    },
    // 給料計算関連の関数
    getCurrentEvents() {
      this.currentEvents = []
      let currentMonthStart = moment(this.currentDate)
        .startOf("months")
        .format("YYYY-MM-DD")
      let currentMonthEnd = moment(this.currentDate)
        .endOf("months")
        .format("YYYY-MM-DD")
      this.events.forEach((event) => {
        let eventStart = moment(event.start).format("YYYY-MM-DD")
        let eventEnd = moment(event.end).format("YYYY-MM-DD")

        if (eventStart >= currentMonthStart && eventEnd <= currentMonthEnd) {
          this.currentEvents.push(event)
        }
      })
    },
    computeWorkHour() {
      this.Jobs.forEach((job) => {
        let numsHoursWorked = []
        let appropriateShifts = this.currentEvents.filter(
          (currentEvent) => (currentEvent.name = job.name)
        )
        appropriateShifts.forEach((shift) => {
          let shiftStart = moment(shift.start)
          let shiftEnd = moment(shift.end)

          let hoursWorked = shiftEnd.diff(shiftStart, "hours", true)
          console.log(hoursWorked)

          shift.hoursWorked = hoursWorked
          numsHoursWorked.push(hoursWorked)
        })
        console.log(numsHoursWorked)
        const sum = numsHoursWorked.reduce((sum, num) => sum + num, 0)
        job.hours = sum
      })
    },
  },
  computed: {
    displayMonth() {
      console.log(this.currentData)
      return this.currentDate.format("YYYY[年]MM[月]")
    },
    computeTotalWage() {
      this.getCurrentEvents()
      this.computeWorkHour()

      let salaries = []
      this.Jobs.forEach((job) => {
        let salary = job.wage * job.hours
        salaries.push(salary)
      })
      const sum = salaries.reduce((a, x) => a + x)

      return Math.trunc(sum)
    },
  },
  async created() {
    this.checkUserLogin()
    await this.userSnapGet()
    this.getFirestoreData()
  },
}
</script>

<style scoped>
button {
  background: #219ddd;
  border-radius: 10px;
  padding: 0em 1em;
  margin: 0 37px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 27px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;

  border: none;
  box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.5);
}
.content {
  display: block;
  text-align: center;
}
.user-title {
  display: flex;
  justify-content: center;

  padding-top: 45px;
  padding-bottom: 45px;
}
#salary_for-each-area {
  width: 676px;
  margin: auto;
  padding-top: 45px;
  padding-bottom: 45px;

  background: rgba(0, 34, 100, 0.5);
  border-radius: 10px;

  color: white;
}
.salary_for-each {
  display: table;
  text-align: left;
  margin-left: auto;
  margin-right: auto;

  line-height: 40px;
}
#total-salary {
  color: #79d06a;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 100%;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  height: 110px;
  width: 70%;
  margin: auto;
  margin-top: 45px;

  background: rgba(233, 246, 223, 0.2);
  border-radius: 10px;
}
</style>
