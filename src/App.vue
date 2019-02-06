<template>
<div id="app">
  <div id="container">
    <!-- THREEJS CANVAS -->
    <div id="loading">
      <h1> Loading Files</h1>

    </div>

    <div id="title-text">

    </div>


    <canvas id="canvas"></canvas>
  </div>

  <router-view/>
</div>
</template>

<script>
import ModelLoader from './ModelLoader.js'
import Scene from './Scene.js'
import * as THREE from 'three'
export default {
  name: 'App',

  mounted() {
    ModelLoader.loadFiles().then(() => {
      var canvas = document.getElementById("canvas");
      document.getElementById("loading").style.display = "none";

      this.scene = new Scene(canvas);
      this.scene.loadModel()
      this.clock = new THREE.Clock();

      this.render();

    }).catch((error) => {
      console.warn(error);
    })

    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    document.addEventListener('touchstart', this.onDocumentTouchStart, false);
    document.addEventListener('touchmove', this.onDocumentTouchMove, false);


  },

  methods: {
    render: function() {
      requestAnimationFrame(this.render);
      var delta = this.clock.getDelta();

      if (delta < 1) {
        this.scene.update(delta, this.mouseX, this.mouseY);

      }
    },

    onDocumentMouseMove: function(event) {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      this.mouseX = event.clientX - this.windowHalfX;
      this.mouseY = event.clientY - this.windowHalfY;
    },
    onDocumentTouchStart: function(event) {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      if (event.touches.length === 1) {
        event.preventDefault();
        this.mouseX = event.touches[0].pageX - this.windowHalfX;
        this.mouseY = event.touches[0].pageY - this.windowHalfY;
      }
    },
    onDocumentTouchMove: function(event) {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      if (event.touches.length === 1) {
        event.preventDefault();
        this.mouseX = event.touches[0].pageX - this.windowHalfX;
        this.mouseY = event.touches[0].pageY - this.windowHalfY;
      }
    },
  },
  data() {
    return {
      scene: null,
      clock: null,
      mouseX: 0,
      mouseY: 0,
      windowHalfX: 0,
      windowHalfY: 0,
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Noto+Serif+SC');
#app {
  font-family: 'Noto Serif SC', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#container {
  background: #000000;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  color: white;
  z-index: -1;
}

#loading {
  width: 100vw;
  height: 100vh;
  z-index: 20;
  display: fixed;
  background: black;
}

#title-text {
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  top: 0px;
  left: 0px;
  background: transparent;
}
</style>
