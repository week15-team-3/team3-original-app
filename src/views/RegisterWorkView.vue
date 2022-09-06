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
  <h3>バイト先一覧</h3>
  <div class="job-container" v-for="(Job, index) in Jobs" :key="index">
    <div class="job-display-name">{{ Job.name }}</div>
    <div class="job-display-wage">{{ Job.wage }}円</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputJobName: "",
      inputJobWage: "",
      Jobs: [],
    }
  },
  methods: {
    registerWork() {
      this.Jobs.push({ name: this.inputJobName, wage: this.inputJobWage })
    },
  },
}
</script>

<style>
.job-container {
  border: 3px solid;
}
</style>
