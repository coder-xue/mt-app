<template>
  <div class="m-geo">
    <!-- {{position.city}} -->
    <i class="el-icon-location"></i>{{currentCity || $store.state.geo.position.city}} 
    <nuxt-link
      class="changeCity"
      to="/changeCity">切换城市</nuxt-link>
    [上海 天津 深圳]
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      currentCity: ''
    }
  },
  computed: {
    // ...mapState({
    //   position: state => state.geo.position
    // }),
    
    // ...mapState('geo', {
    //   position: state => state.position
    // })

  },
  mounted () {
    this.currentCity = localStorage.getItem('currentCity')
  },

}
</script>

<style>

</style>