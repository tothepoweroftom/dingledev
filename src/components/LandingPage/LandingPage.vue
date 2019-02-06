<template>
<div id="app-container">
  <Scrollama :offset="1.0" :debug="true" @step-enter="({ element }) => (currStep = element.dataset.stepNo)" @step-exit="({ element }) => (currStep = null)" :progress="true" @step-progress="({ progress }) => (currStepProgress = progress)">
    <div v-for="n in 4" :key="n" class="step" :data-step-no="n" :class="{ active: n == currStep }">
      <div>step {{ n }}</div>
      <div>{{ Math.round(currStepProgress * 100) }}%</div>
    </div>
  </Scrollama>
</div>
</template>

<script>
import "intersection-observer";
import Scrollama from "vue-scrollama";

export default {
  name: 'LandingPage',

  mounted() {

  },

  components: {
    Scrollama
  },
  data() {
    return {
      currStep: null,
      currStepProgress: null
    };
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app-container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}

#landing-page {

}

.intro {
  padding: 30vh;
}

.step {
  /* padding: 5vh 0; */
  width: 100vw;
  height:100vh;
  left:0px;
  top:0px;
  margin: 0 auto;
  background-color: rgba(0,0,0,0.35);
  border: 1px solid #ccc;
  /* z-index: 10; */
}

.step.active {
  background-color: rgba(0,0,0,0.4);
  color: white;
}
</style>
