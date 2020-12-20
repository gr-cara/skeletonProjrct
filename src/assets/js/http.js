/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
//import store from './store/store'
import {Indicator,Toast} from 'mint-ui';
//import * as types from './store/types'
import router from '../../router/index'

// axios 配置
axios.defaults.timeout = 1000*60;
axios.defaults.baseURL = 'process.env.API_ROOT';
// http request 拦截器
axios.interceptors.request.use(
    config => {
        Indicator.open({
         text: 'Loading...',
         spinnerType: 'fading-circle'
        });
        /* if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        } */
        return config;
    },
    err => {
      Indicator.close();
      return Promise.reject(err);
    });
// http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.code == 401){
            sessionStorage.clear();
            //store.commit(types.LOGOUT);//localStorage
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}
            })
            Indicator.close();
        }else if(response.data.code == 500){
          //sessionStorage.clear();
          Toast(response.data.message);
          Indicator.close();
    
          // store.commit(types.LOGOUT);//localStorage
          // router.replace({
          //   path: '/login',
          //   query: {redirect: router.currentRoute.fullPath}
          // })

        }else if(response.data.code == 200){
            Indicator.close();
        }
        return response;
    },
    error => {
        Indicator.close();
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    sessionStorage.clear();
                    // 401 清除token信息并跳转到登录页面
                    //store.commit(types.LOGOUT);
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;
