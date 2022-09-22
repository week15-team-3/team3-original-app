<template>
  <div class="content">
    <h1>バイト先の登録</h1>
    <div class="job-input-area">
      <div id="job_name-input-area">
        名前：
        <input class="job-input-field" v-model="inputJobName" />
      </div>
      <div id="job_wage-input-area">
        時給:
        <input class="job-input-field" v-model="inputJobWage" />円
      </div>
    </div>
    <button class="register-button" @click="registerWork">バイト先を登録</button
    ><br />
    <router-link id="router-link" to="/mainCalendar"
      >カレンダーへ戻る</router-link
    >
    <h3>{{ userName }}さんのバイト先一覧</h3>
    <div class="job-container" v-for="(Job, index) in Jobs" :key="index">
      <div class="job-display-name">{{ Job.name }}</div>
      <div class="job-display-wage">時給：{{ Job.wage }}円</div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../firebase"
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"

export default {
  data() {
    return {
      inputJobName: "",
      inputJobWage: "",
      Jobs: [],
      user: auth.currentUser,
      usreName: null,
      userDataRef: null,
      userSnap: null,
      userData: null,
    }
  },
  methods: {
    registerWork() {
      const JobsLength = this.Jobs.length
      this.Jobs.push({
        id: JobsLength + 1,
        name: this.inputJobName,
        wage: this.inputJobWage,
      })

      this.addJobsToFirebase()
    },
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
    setJobsField() {
      if (!("jobs" in this.userData)) {
        setDoc(
          this.userDataRef,
          {
            jobs: [],
          },
          { merge: true }
        )
        console.log("firestoreにjobsフィールルドを作成しました。")
      } else {
        console.log(
          "すでにこのユーザはFirestore内にjobsフィールドを持っています。"
        )
      }
    },
    displayFirestoreData() {
      this.Jobs = this.userData.jobs
    },
    async addJobsToFirebase() {
      await updateDoc(this.userDataRef, {
        jobs: this.Jobs,
      })
    },
  },
  async created() {
    this.checkUserLogin()
    await this.userSnapGet()
    await this.setJobsField()
    this.displayFirestoreData()
  },
}
</script>

<style scoped>
h1 {
  padding: 25px 0;
}
.content {
  text-align: center;
}
.job-input-area {
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  margin-bottom: 25px;
}
button {
  background: #219ddd;
  border-radius: 10px;
  padding: 0em 1em;
  margin: auto;

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
.job-container {
  margin: auto;
  margin-top: 5px;
  width: 70%;
  background-color: #80cdf3;
  color: white;

  border-radius: 10px;
}
#router-link:visited {
  color: black;
}
h3 {
  padding: 25px 0;
}
</style>
