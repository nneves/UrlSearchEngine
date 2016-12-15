import Vue from 'vue/dist/vue'
import VueMaterial from 'vue-material'
import NavBar from './navbar.vue'
import SearchPanel from './searchpanel.vue'
import SearchTiles from './searchtiles.vue'

Vue.use(VueMaterial)
Vue.material.theme.registerAll({
  default: {
    primary: 'cyan',
    accent: 'pink'
  },
  indigo: {
    primary: 'indigo',
    accent: 'pink'
  }
})
//Vue.component('md-button',VueMaterial.mdButton)
//Vue.component('md-button',VueMaterial)

new Vue({
  el: '#my-app',
  components: {
    'my-navbar': NavBar,
    'my-searchpanel': SearchPanel,
    'my-searchtiles': SearchTiles
  }
})
