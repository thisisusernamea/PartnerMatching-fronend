import axios from "axios";

/*全局请求处理器*/
/*axios相当于一个类 myAxios则是axios的一个实例*/
const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api/',
});
myAxios.defaults.withCredentials = true;/*向后端发请求时携带cookie*/

// 添加全局请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log('我要发请求啦',config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加全局响应拦截器
myAxios.interceptors.response.use(function (response) {
    console.log('我收到你的响应啦',response)
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;