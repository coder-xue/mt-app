import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

const router = new router({
  prefix: '/users'
})

let Store = new Redis().client

/**
 * 注册
 */
router.post('/signup', async (ctx) => {
  const {username, password, email, code} = ctx.request.body // 从请求中拿数据
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code') // 从redis数据库读取验证码
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire') // 读取验证码过期时间
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  let user = await User.find({username})
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '账号已被注册'
    }
  }
  // 写入数据库
  let nuser = await User.create({
    username, password, email
  })
  // 判断是否写入成功
  if (nuser) {
    let res = await axios.post('/users/signin', {username, password}) 
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

/**
 * 登陆
 */
router.post('/signin', async (ctx, next) => {
  // 使用passport的local策略, 下面是固定写法
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登陆成功',
          user
        }
        return ctx.login(user)
      } else {
        // 异常
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

/**
 * 验证码接口
 */
router.post('/verify', async(ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  let transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass,
    }
  })
  // 接收
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.user
  }

  // 邮件配置信息
  let mailOptions = {
    from: `"认证邮件"<${Email.smtp.user}>`,
    to: ko.email,
    subject: '《慕课网高仿美团网全栈实战》注册码',
    html: `您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
  }

  // 发送邮件
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
      Store.hset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })

  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})