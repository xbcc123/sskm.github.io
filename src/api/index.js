import { message } from 'antd';
import fly from 'flyio'

//添加请求拦截器
fly.interceptors.request.use((request)=>{
    return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        //只将请求结果的data字段返回
        return response.data
    },
    (err) => {
        message.error(err.response.data.errMsg)
        //发生网络错误后会走到这里
        return err
    }
)

// 生产支付二维码
export const payPreCreate = (params) => {
    return fly.post(`https://api.bailan.fun/v1/chatgpt/pay/preCreate`, params)
}

// 查询订单列表
export const orderQuery = (params) => {
    return fly.get(`https://api.bailan.fun/v1/chatgpt/pay/order/query`, params)
}
