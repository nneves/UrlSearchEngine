<template>
  <div>
    <!-- THIS DOES NOT WORK -->
    <md-button v-md-theme="'default'">My Search Tiles button</md-button>

    <!-- <br><br><br>
    <div v-for="item in [1,2,3,4,5,6,7,8,9,10]">
        <div class="container">
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">Title goes here {{item}}</div>
                    <div class="md-subhead">Subtitle here</div>
                </md-card-header>

                <md-card-media>
                    <img src="https://marcosmoura.github.io/vue-material/assets/card-image-1.jpg" alt="People">
                </md-card-media>

                <md-card-actions>
                    <md-button>Open</md-button>
                </md-card-actions>
            </md-card>
        </div>
    </div> -->
  </div>>
</template>

<script>
// import Vue from 'vue/dist/vue'
// import VueMaterial from 'vue-material'
//
// Vue.use(VueMaterial)
// Vue.use(VueMaterial.mdButton)
// Vue.material.theme.registerAll({
//   default: {
//     primary: 'cyan',
//     accent: 'pink'
//   },
//   indigo: {
//     primary: 'indigo',
//     accent: 'pink'
//   }
// })
// //Vue.component('md-button',VueMaterial.mdButton)
// Vue.component('md-button',VueMaterial)

export default {
  data () {
    return {
      count: 0
    }
  },
  methods: {
    increment () {
      this.count ++;
    }
  }
}
</script>

<style>
</style>
