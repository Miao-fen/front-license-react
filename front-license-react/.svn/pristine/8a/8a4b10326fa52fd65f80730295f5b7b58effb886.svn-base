import axios from 'axios';
import { message } from 'antd';

axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
    //发送请求操作，统一再请求里加上userId 
    config.headers['token'] = window.sessionStorage.getItem("token");
    return config;
}, error => {
    //发送请求错误操作
    console.log('请求失败')
    return Promise.reject(error);
})

axios.interceptors.response.use(response => {
    //对响应数据做操作
    if(response.data.respCode === '1000007') {
        message.error('token失效，请重新登录!', 1,function(){
            window.location.href = '/#/login';
        });
        return Promise.reject(response);
    }else{
        return Promise.resolve(response);
    }
}, error => {
    //对响应数据错误做操作
    console.log('请求error', error.message);
    return Promise.reject(error);
})

export default axios;