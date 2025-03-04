import axios from 'axios';

// 创建 axios 实例
const instance = axios.create({
  baseURL: '',
  timeout: 10000000000, // 请求超时
  headers: {
    "ngrok-skip-browser-warning": "true", // 默认绕过 ngrok 警告
    "Content-Type": "application/json"
  }
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
