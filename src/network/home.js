import {request} from "./request";

export function getHomeMultidata() {
  return request({
    // 新接口轮播图只有一张照片，所以选以前的接口取轮播图的照片
    baseURL: 'http://123.207.32.32:8000',
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
