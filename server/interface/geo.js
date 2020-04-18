import Router from 'koa-router'
import axios from './utils/axios'
import Menu from '../dbs/models/menu'

const router = new Router({
  prefix: '/geo'
})

router.get('/getPosition', async ctx => {
  let {status, data: {province, city}} = await axios.get('http://cp-tools.cn/geo/getPosition')
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/menu', async ctx => {
  // const result = await Menu.findOne()
  // ctx.body = {
  //   menu: result.menu
  // }
  let {status, data: {menu}} = await axios.get('http://cp-tools.cn/geo/menu')
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

export default router