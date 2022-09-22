<template>
  <div class="main-container">
    <div>
      <h1 class="project-title">バイトシフター</h1>
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/maincalendar">calendar</router-link>
      <router-link to="/salary">salary</router-link>
    </nav>
  </div>
  <div class="router-views">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main-container {
  color: white;
  background-color: #219ddd;
  box-shadow: 0px -1px 10px 8px #777777;
  position: fixed;
  top: 0;
  width: 100%;
  height: 55px;
}

.project-title {
  display: inline-block;
  line-height: 55px;
  margin-left: 15px;
}

nav {
  display: inline-block;
  position: absolute;
  right: 15px;
  top: 17px;
  height: 21px;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  color: white;
  margin: 0 5px 0 5px;
}

nav a.router-link-exact-active {
  color: #8ff8fd;
}

.router-views {
  margin-top: 65px;
}
</style>
