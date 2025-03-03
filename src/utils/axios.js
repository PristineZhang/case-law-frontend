import axios from 'axios';

// 创建 axios 实例
const instance = axios.create({
  baseURL: '',
  timeout: 10000, // 请求超时
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
