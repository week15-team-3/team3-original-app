<template>
  <div v-if="logInOut === false">
    <button @click="SignIn">Googleアカウントでログイン</button>
  </div>

  <div v-else>
    <button @click="SignOut">ログアウト</button>
  </div>
</template>
<script>
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
export default {
  data() {
    return {
      logInOut: false,
    }
  },
  methods: {
    SignIn: async function () {
      const provider = new GoogleAuthProvider()

      const auth = getAuth()
      await signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          const user = result.user
          // this.$router.push({ path: '/' })
          console.log(credential)
          console.log(token)
          console.log(user)
        })
        .catch((error) => {
          console.error(error)
        })
      this.logInOut = !this.logInOut
    },
    SignOut: async function () {
      const auth = getAuth()
      await signOut(auth)
        .then(() => {
          alert("signout")
        })
        .catch((error) => {
          console.log(error)
        })
      this.logInOut = !this.logInOut
    },
  },
}
</script>
