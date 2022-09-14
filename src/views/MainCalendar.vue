<!-- 参考サイト①:https://reffect.co.jp/vue/javascript-vue-js-create-calendar#i-8 -->
<!-- 参考サイト②:https://reffect.co.jp/vue/vue-js-original-calendar -->

<template>
  <div class="content">
    <h1>メインカレンダー</h1>
    <h2>{{ displayMonth }}</h2>
    <div class="button-area">
      <button @click="prevMonth">前の月</button>
      <button @click="nextMonth">次の月</button>
    </div>
    <div class="calendar">
      <div class="calendar-weekly">
        <div class="calendar-youbi" v-for="n in 7" :key="n">
          {{ youbi(n - 1) }}
        </div>
      </div>
      <div v-for="(week, index) in calendars" :key="index">
        <div class="calendar-weekly">
          <div
            class="calendar-daily"
            :class="{ outside: currentMonth !== day.month }"
            v-for="(day, index) in week"
            :key="index"
            @drop="dragEnd($event, day.date)"
            @dragover.prevent
          >
            <div class="calendar-day">
              {{ day.day }}
              <div v-for="dayEvent in day.dayEvents" :key="dayEvent.id">
                <div
                  v-if="dayEvent.width"
                  class="calendar-event"
                  :style="`width:${dayEvent.width}%;background-color:${dayEvent.color}`"
                  draggable="true"
                  @dragstart="dragStart($event, dayEvent.id)"
                >
                  {{ dayEvent.name }}
                </div>
                <div v-else style="height: 26px"></div>
              </div>
            </div>
          </div>
        </div>
        <button @click="weeklyCalendarButtonChange(index)">週カレンダー</button>
        <div
          class="weekly-calendar-frame calendar-weekly"
          v-if="weeklyCalendarButton[index]"
        >
          <div id="time-zero">00:00</div>
          <div class="calendar-left-bar">
            <div class="calendar-left-bar-content">02:00</div>
            <div class="calendar-left-bar-content">04:00</div>
            <div class="calendar-left-bar-content">06:00</div>
            <div class="calendar-left-bar-content">08:00</div>
            <div class="calendar-left-bar-content">10:00</div>
            <div class="calendar-left-bar-content">12:00</div>
            <div class="calendar-left-bar-content">14:00</div>
            <div class="calendar-left-bar-content">16:00</div>
            <div class="calendar-left-bar-content">18:00</div>
            <div class="calendar-left-bar-content">20:00</div>
            <div class="calendar-left-bar-content">22:00</div>
            <div class="calendar-left-bar-content">24:00</div>
          </div>

          <div
            class="weekly-calendar-day calendar-daily"
            v-for="n in 7"
            :key="n"
          >
            <div class="weekly-calendar-time" v-for="m in 24" :key="m"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="register-shift">
      <h2>シフトの登録</h2>
      <div class="shift-input-area">
        <div class="shift_name-input-area">
          シフトの名前(メモ)：<input
            class="shift_name-input-field"
            type="text"
            v-model="shiftName"
          />
        </div>
        <div class="shift_startTime-input-area">
          シフト開始時刻：<input
            class="shift_startTime-input-field"
            type="datetime-local"
            v-model="shiftStartAt"
          />
          {{ shiftStartAt }}
        </div>
        <div class="shift_endTime-input-area">
          シフト終了時刻：<input
            class="shift_endTime-input-field"
            type="datetime-local"
            v-model="shiftEndAt"
          />
          {{ shiftEndAt }}
        </div>
        <button class="register-shift" @click="registerShift()">
          シフトを登録
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  doc,
  setDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore"
import { getAuth } from "firebase/auth"
import moment from "moment"

const db = getFirestore()
const auth = getAuth()
const user = auth.currentUser
const userName = user.displayName
const userData = doc(db, "users", userName)

export default {
  data() {
    return {
      currentDate: moment(),
      events: [
        {
          id: 1,
          name: "ミーティング",
          start: "2022-09-01T10:00",
          end: "2022-09-01T12:00",
          color: "blue",
        },
        {
          id: 2,
          name: "イベント",
          start: "2022-09-02T15:00",
          end: "2022-09-03T11:00",
          color: "limegreen",
        },
        {
          id: 3,
          name: "会議",
          start: "2022-09-06T14:00",
          end: "2022-09-06T18:00",
          color: "deepskyblue",
        },
        {
          id: 4,
          name: "有給",
          start: "2022-09-08",
          end: "2022-09-08",
          color: "dimgray",
        },
        {
          id: 5,
          name: "海外旅行",
          start: "2022-09-08",
          end: "2022-09-11",
          color: "navy",
        },
        {
          id: 6,
          name: "誕生日",
          start: "2022-09-16",
          end: "2022-09-16",
          color: "orange",
        },
        {
          id: 7,
          name: "イベント",
          start: "2022-09-12T18:00",
          end: "2022-09-15T20:00",
          color: "limegreen",
        },
        {
          id: 8,
          name: "出張",
          start: "2022-09-12T8:00",
          end: "2022-09-13T17:00",
          color: "teal",
        },
        {
          id: 9,
          name: "客先訪問",
          start: "2022-09-14T7:00",
          end: "2022-09-14T12:00",
          color: "red",
        },
        {
          id: 10,
          name: "パーティ",
          start: "2022-09-15T18:00",
          end: "2022-09-15T21:00",
          color: "royalblue",
        },
        {
          id: 12,
          name: "ミーティング",
          start: "2022-09-18T20:00",
          end: "2022-09-19T21:00",
          color: "blue",
        },
        {
          id: 13,
          name: "イベント",
          start: "2022-09-21T13:00",
          end: "2022-09-21T15:00",
          color: "limegreen",
        },
        {
          id: 14,
          name: "有給",
          start: "2022-09-20",
          end: "2022-09-20",
          color: "dimgray",
        },
        {
          id: 15,
          name: "イベント",
          start: "2022-09-25T18:00",
          end: "2022-09-28T20:00",
          color: "limegreen",
        },
        {
          id: 16,
          name: "会議",
          start: "2022-09-21T13:00",
          end: "2022-09-21T14:00",
          color: "deepskyblue",
        },
        {
          id: 17,
          name: "旅行",
          start: "2022-09-23",
          end: "2022-09-24",
          color: "navy",
        },
        {
          id: 18,
          name: "ミーティング",
          start: "2022-09-28T13:00",
          end: "2022-09-28T14:00",
          color: "blue",
        },
        {
          id: 19,
          name: "会議",
          start: "2022-09-12T15:00",
          end: "2022-09-12T16:00",
          color: "deepskyblue",
        },
        {
          id: 20,
          name: "誕生日",
          start: "2022-09-30",
          end: "2022-09-30",
          color: "orange",
        },
      ],
      shiftName: "",
      shiftStartAt: "",
      shiftEndAt: "",
      weeklyCalendarButton: [false, false, false, false, false],
      // auth: null,
      // user: null,
      // userName: null,
      // useData: null,
    }
  },
  methods: {
    getStartDate() {
      let date = moment(this.currentDate).startOf("month")
      const youbiNum = date.day()
      return date.subtract(youbiNum, "days")
    },
    getEndDate() {
      let date = moment(this.currentDate)
      date.endOf("month")
      const youbiNum = date.day()
      return date.add(6 - youbiNum, "days")
    },
    getCalendar() {
      let startDate = this.getStartDate()
      const endDate = this.getEndDate()
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7)

      let calendars = []
      let calendarDate = this.getStartDate()

      for (let week = 0; week < weekNumber; week++) {
        let weekRow = []
        for (let day = 0; day < 7; day++) {
          let dayEvents = this.getDayEvents(calendarDate, day)
          weekRow.push({
            day: calendarDate.get("date"),
            month: calendarDate.format("YYYY-MM"),
            date: calendarDate.format("YYYY-MM-DD"),
            dayEvents: dayEvents,
          })
          calendarDate.add(1, "days")
        }
        calendars.push(weekRow)
      }
      return calendars
    },
    nextMonth() {
      this.currentDate = moment(this.currentDate).add(1, "month")
      console.log(this.currentDate)
    },
    prevMonth() {
      this.currentDate = moment(this.currentDate).subtract(1, "month")
    },
    youbi(dayIndex) {
      const week = ["日", "月", "火", "水", "木", "金", "土"]
      return week[dayIndex]
    },
    getDayEvents(date, day) {
      let stackIndex = 0
      let dayEvents = []
      let startedEvents = []
      this.sortedEvents.forEach((event) => {
        let startDate = moment(event.start).format("YYYY-MM-DD")
        let endDate = moment(event.end).format("YYYY-MM-DD")
        let Date = date.format("YYYY-MM-DD")

        if (startDate <= Date && endDate >= Date) {
          if (startDate === Date) {
            // eslint-disable-next-line
            ;[stackIndex, dayEvents] = this.getStackEvents(
              event,
              day,
              stackIndex,
              dayEvents,
              startedEvents,
              event.start
            )
          } else if (day === 0) {
            // eslint-disable-next-line
            ;[stackIndex, dayEvents] = this.getStackEvents(
              event,
              day,
              stackIndex,
              dayEvents,
              startedEvents,
              Date
            )
          } else {
            startedEvents.push(event)
          }
        }
      })
      return dayEvents
    },
    getEventWidth(start, end, day) {
      let betweenDays = moment(end).diff(moment(start), "days")
      if (betweenDays > 6 - day) {
        return (6 - day) * 100 + 95
      } else {
        return betweenDays * 100 + 95
      }
    },
    getStackEvents(event, day, stackIndex, dayEvents, startedEvents, start) {
      //eslint-disable-next-line
      ;[stackIndex, dayEvents] = this.getStartedEvents(
        stackIndex,
        startedEvents,
        dayEvents
      )
      let width = this.getEventWidth(start, event.end, day)
      Object.assign(event, {
        stackIndex,
      })
      dayEvents.push({ ...event, width })
      stackIndex++
      return [stackIndex, dayEvents]
    },
    getStartedEvents(stackIndex, startedEvents, dayEvents) {
      let startedEvent
      do {
        startedEvent = startedEvents.find(
          (event) => event.stackIndex === stackIndex
        )
        if (startedEvent) {
          dayEvents.push(startedEvent) // ダミー領域として利用するため
          stackIndex++
        }
      } while (typeof startedEvent !== "undefined")
      return [stackIndex, dayEvents]
    },
    dragStart(event, eventId) {
      event.dataTransfer.effectAllowed = "move"
      event.dataTransfer.dropEffect = "move"
      event.dataTransfer.setData("eventId", eventId)
    },
    dragEnd(event, date) {
      let eventId = event.dataTransfer.getData("eventId")
      let dragEvent = this.events.find((event) => event.id == eventId)
      let betweenDays = moment(dragEvent.end).diff(
        moment(dragEvent.start),
        "days"
      )
      dragEvent.start = date
      dragEvent.end = moment(dragEvent.start)
        .add(betweenDays, "days")
        .format("YYYY-MM-DD")
    },
    weeklyCalendarButtonChange(index) {
      if (this.weeklyCalendarButton[index]) {
        this.weeklyCalendarButton[index] = false
      } else {
        this.weeklyCalendarButton[index] = true
      }
    },
    async addShiftToFirebase() {
      await updateDoc(userData, {
        events: arrayUnion({
          id: "",
          name: this.shiftName,
          start: this.shiftStartAt,
          end: this.shiftEndAt,
          color: "blue",
        }),
      }),
        console.log()
    },
    registerShift() {
      let eventsLength = this.events.length
      this.events.push({
        id: eventsLength + 1,
        name: this.shiftName,
        start: this.shiftStartAt,
        end: this.shiftEndAt,
        color: "blue",
      })
      this.addShiftToFirebase()
    },
  },
  computed: {
    calendars() {
      return this.getCalendar()
    },
    displayMonth() {
      return this.currentDate.format("YYYY[年]M[月]")
    },
    currentMonth() {
      return this.currentDate.format("YYYY-MM")
    },
    sortedEvents() {
      return this.events.slice().sort(function (a, b) {
        let startDate = moment(a.start).format("YYYY-MM-DD")
        let startDate_2 = moment(b.start).format("YYYY-MM-DD")
        if (startDate < startDate_2) return -1
        if (startDate > startDate_2) return 1
        return 0
      })
    },
  },
  async created() {
    await setDoc(
      userData,
      {
        events: [],
      },
      { merge: true }
    )
  },
}
</script>

<style>
.content {
  margin: 2em auto;
  width: 90%;
  left: 30px;
}
.button-area {
  margin: 0.5em 0;
}
.button {
  padding: 4px 8px;
  margin-right: 8px;
}
.calendar {
  max-width: 900px;
  border-top: 1px solid #e0e0e0;
  font-size: 0.8em;
}
.calendar-youbi {
  flex: 1;
  border-right: 1px solid #e0e0e0;
  margin-right: -1px;
  text-align: center;
}
.calendar-weekly {
  display: flex;
  border-left: 1px solid #e0e0e0;
  /* background-color: black; */
}
.calendar-daily {
  flex: 1;
  min-height: 125px;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-right: -1px;
}
.outside {
  background-color: #f7f7f7;
}
.calendar-day {
  text-align: center;
}
.calendar-event {
  color: white;
  margin-bottom: 1px;
  height: 25px;
  line-height: 25px;
  position: relative;
  z-index: 1;
  border-radius: 4px;
  padding-left: 4px;
}
.register-shift {
  border: solid 3px;
}
.weekly-calendar-frame {
  border-bottom: solid 1px;
}
.weekly-calendar-time {
  min-height: 20px;
  border-top: solid 1px black;
}
.calendar-left-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30px;
  position: relative;
  left: -30px;
  margin-right: -30px;
  font-size: 10px;
  top: 7px;
}
.calendar-left-bar-content {
  margin: auto;
  text-align: right;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
#time-zero {
  width: 30px;
  position: relative;
  left: -30px;
  margin-right: -30px;
  font-size: 10px;
  top: -5px;
}
</style>
