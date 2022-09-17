<template>
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
  <button class="register-button" @click="registerWork">バイト先を登録</button>
  <h3>{{ userName }}さんのバイト先一覧</h3>
  <div class="job-container" v-for="(Job, index) in Jobs" :key="index">
    <div class="job-display-name">{{ Job.name }}</div>
    <div class="job-display-wage">時給：{{ Job.wage }}円</div>
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

<style>
.job-container {
  border: 3px solid;
}
</style>
