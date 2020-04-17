import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'


passport.use(new LocalStrategy(async function(username,password,done){
  let where = {
    username
  };
  let result = await UserModel.findOne(where)
  if(result!=null){
    if(result.password===password){
      return done(null,result)
    }else{
      return done(null,false,'密码错误')
    }
  }else{
    return done(null,false,'用户不存在')
  }
}))

// 序列化 序列化指的是把用户对象存到session里
passport.serializeUser(function(user,done){
  done(null,user)
})

// 反序列化 反序列化就是从session里取用户数据
passport.deserializeUser(function(user,done){
  return done(null,user)
})

export default passport
