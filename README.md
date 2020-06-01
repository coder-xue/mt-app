# mt-app

> My amazing Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# nuxtjs学习踩坑记录
1. 在SSR中，created生命周期在服务端执行，node环境中没有localStorage所以会报错，将需要使用localStorage的代码放到浏览器使用的生命周期(mounted)中。

2.页面组件才能调用asyncData(就是components下是不能调用，必须路由的页面才行)

<img src="https://zh.nuxtjs.org/nuxt-schema.svg" width="375" height="667" />
3.通过上面的流程图可以看出，当一个客户端请求进入的时候，服务端有通过nuxtServerInit这个命令执行在Store的action中，在这里接收到客户端请求的时候，可以将一些客户端信息存储到Store中，也就是说可以把在服务端存储的一些客户端的一些登录信息存储到Store中。之后使用了中间件机制，中间件其实就是一个函数，会在每个路由执行之前去执行，在这里可以做很多事情，或者说可以理解为是路由器的拦截器的作用。然后再validate执行的时候对客户端携带的参数进行校验，在asyncData与fetch进入正式的渲染周期，asyncData向服务端获取数据，把请求到的数据合并到Vue中的data中，asyncData 用来异步的进行组件数据的初始化工作，而 fetch 方法偏重于异步获取数据后修改 Vuex 中的状态。
