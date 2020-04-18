<template>
   <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu/>
      </el-col>
      <el-col :span="19">
        <life/>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="24">
        <!-- <artistic/> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu.vue'
import Life from '@/components/index/life.vue'
// import Artistic from '@/components/index/artistic.vue'
// import axios from '../server/interface/utils/axios'

export default {
  components: {
    Emenu,
    Life,
    // Artistic
  },

  // 刷新页面的时候不再执行
  // async fetch ({store, params}) {
  //   const {status, data: {province, city}} = await axios.get('/geo/getPosition')
  //   store.commit('geo/setPosition', status === 200 ? {province, city} : {province: '', city: ''})
  // },
}
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";

</style>