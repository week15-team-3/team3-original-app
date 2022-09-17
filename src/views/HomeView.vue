<template>
  <div class="wrapper">
    <ul class="back-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>


<style scoped>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
  color: white;
  /* background: black; */
  z-index: -1;
}

.wrapper {
  background: #50a3a2;
  background: -webkit-linear-gradient(top, left, #608a8a 0%, #455f54 100%);
  background: -moz-linear-gradient(top, left, #50a3a6 0%, #53e3a6 100%);
  background: -o-linear-gradient(top, left, #50a3a6 0%, #53e3a6 100%);
  background: linear-gradient(to bottom right, #50a3a6 0%, #53e3a6 100%);
  /* background: black; */

  position: absolute;
  top: 35%;
  left: 0;
  width: 100%;
  height: 600px;
  margin-top: -200px;
  overflow: hidden;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 80px 0;
  height: 400px;
  text-align: center;
}

.container h1 {
  font-size: 40px;
  transition-duration: 1s;
  transition-timing-function: ease-in-out;
  font-weight: 200;
}

.loginform {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
/* .input {
  display: block;
  appearance: none;
  outline: none;
  border: 1px solid fade(white, 40px);
  background-color: fade(white, 40px);
  width: 240px;

  border-radius: 3px;
  padding: 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  color: white;

  transition-duration: 0.25s;
  font-weight: 300;
}
.input:hover {
  background-color: fade(white, 40%);
}
.input:focus {
  background-color: white;
  width: 300px;
} */

.loginbutton {
  appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #50a3a2;
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;
}
.loginbutton:hover {
  background-color: rgb(202, 202, 204);
}

.back-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1;
}

.back-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 100%;
  opacity: 0.3;
  bottom: -160px;

  -webkit-animation: square 10s linear infinite;
  animation: square 10s linear infinite;

  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}

.back-bubbles li:nth-child(1) {
  left: 10%;
}
.back-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;

  animation-delay: 1s;
  animation-duration: 17s;
}
.back-bubbles li:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
}
.back-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;

  animation-duration: 22s;
  background-color: fade(white, 25%);
}
.back-bubbles li:nth-child(5) {
  left: 70%;
}
.back-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;

  animation-delay: 3s;
  background-color: fade(white, 20%);
}
.back-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;

  animation-delay: 7s;
}
.back-bubbles li :nth-child(8) {
  left: 55%;
  width: 1000px;
  height: 20px;

  animation-delay: 15s;
  animation-duration: 40s;
}

.back-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;

  animation-delay: 2s;
  animation-duration: 40s;
  background-color: fade(white, 30%);
}
.back-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;

  animation-delay: 11s;
}

@-webkit-keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-800px) rotate(600deg);
  }
}

@keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-800px) rotate(600deg);
  }
}
</style>

