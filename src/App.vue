<template>
  <div class="main-container">
    <div>
      <h2>バイトシフター</h2>
    </div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/maincalendar">calendar</router-link>
      <router-link to="/salary">salary</router-link>
    </nav>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
