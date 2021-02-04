// import Vue from 'vue'
// import Vuex from 'vuex'
// import geo from './modules/geo'
// import home from './modules/home'

// Vue.use(Vuex)

// const store = () => new Vuex.Store({
//   modules: {
//     geo,
//     home
//   }, 
//   actions: {
//     async nuxtServerInit ({commit}, {req, app}) {
//       console.log('刷新会再次执行')
//       // 获取城市定位
//       const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition')
//       commit('geo/setPosition', status === 200 ? {province, city} : {province: '', city: ''})

//       // 获取菜单menu
//       const {status: status2, data: {menu}} = await app.$axios.get('/geo/menu')
//       commit('home/setMenu', status2 === 200 ? menu : [])

//       // 搜索
//       const {status:status3,data:{result}}=await app.$axios.get('/search/hotPlace',{
//         params:{
//           city:app.store.state.geo.position.city.replace('市','')
//         }
//       })
//       commit('home/setHotPlace',status3===200?result:[])
//     }
//   }
// })

// export default store





import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'
 
Vue.use(Vuex)
 
const modules = {
geo,
home
}
 
const actions = {
// async nuxtServerInit({ commit }, { req, app }) {
// const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
// commit('geo/setPosition', status === 200 ? { province, city } : { province: '', city: '' })
// const { status: status2, data: { menu } } = await app.$axios.get('/geo/menu')
// commit('home/setMenu', status2 === 200 ? menu : [])
// }
}
 
export default {
modules,
actions
}