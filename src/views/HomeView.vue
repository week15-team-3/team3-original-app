<template>
  <div v-if="logInOut === false">
    <button @click="SignIn">Googleアカウントでログイン</button>
  </div>

  <div v-else>
    <button @click="SignOut">ログアウト</button>

    <div>ようこそ</div>
    <div>{{ userData[0].name }}さん、こんにちは</div>
  </div>
</template>
<script>
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { db } from "./firebase"
import { setDoc, doc, getDoc } from "firebase/firestore"

export default {
  data() {
    return {
      logInOut: false,
      userData: [],
    }
  },
  methods: {
    SignIn: async function () {
      // クリックしたらgoogleアカウントでサインイン。userのデータをsetUserでfirebaseに登録。
      const provider = new GoogleAuthProvider()

      const auth = getAuth()
      await signInWithPopup(auth, provider)
        .then((result) => {
          // const credential = GoogleAuthProvider.credentialFromResult(result)
          // const token = credential.accessToken
          const user = result.user
          // this.$router.push({ path: '/' })
          // console.log(credential)
          // console.log(token)
          // console.log(user)

          this.setUser(user)
          this.getUserData(user)
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

    setUser(user) {
      //users、googleアカウントの表示名でデータをfirebaseに保管
      setDoc(doc(db, "users", user.displayName), {
        userName: user.displayName,
        ID: user.uid,
      })
    },

    getUserData: async function (user) {
      //ログインするとfirebaseのusersにsetDocで保存したdisplayNameからデータを取得
      const docRef = doc(db, "users", user.displayName)
      const docSnap = await getDoc(docRef)
      this.userData.push({
        name: docSnap.data().userName, //ここではuserNameとIDのみ
        id: docSnap.data().ID,
      })

      console.log(docSnap.data())
      console.log(this.userData[0].name) //concole.log(userData)をするとProxy()と表示されたが[0]をつけると取り出せた。
      //まだよくわかっていないので改良の余地あり
    },
  },
}
</script>
