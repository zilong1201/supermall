import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  // 2.axios拦截器
  instance.interceptors.request.use(config => {
    console.log(config)
    // 1.比如config中的一些信息不符服务器的要求
    // 2.比如每次发送请求时，都希望在界面中显示请求图标
    // 3.某些网络请求，必须携带一些特殊的信息（比如登录）

    // 拦截后返回，不然无法得到数据
    return config
  },err => {
    console.log(err)
  })

  // 拦截响应
  instance.interceptors.response.use(res => {
    console.log(res.data)
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.发送真正的网络请求
  return instance(config)
}
