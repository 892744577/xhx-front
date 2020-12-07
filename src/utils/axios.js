/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
import store from '../store/index'
import router from '@/router/router'
import { getStorage } from '../tools/index'

const baseUrl = process.env.VUE_APP_BASE_URL;
function errorrequest (response) {

    console.log(response)
    let data = response.data
    console.log(data)
    switch (data.code) {
        case 0:
            Toast(data.msg);
            break
        case 401:
            Toast('登陆过期或未登录');
            router.replace('/login')
            break
        case 500:
            Toast('服务器错误');
            break
    }
}

// 请求超时时间
axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // console.log(config, "请求拦截器")
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        // console.log(error, "200的情况 ")
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code == 200) {
            //return Promise.resolve(response);
            return response.data;
        } else {
            errorrequest(response)
            console.log(response.data)
            Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况 
    error => {
        errorrequest(error)
        Promise.reject(error);
    }
);
export async function get(url = '',param = {},headers={},token = false) {
    if (token) {
        param.token = getStorage('pifa')
    }
    return await axios.get(baseUrl + url, {
            params: param,
            headers: {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        })
}

export async function postUrlEncode(url = '',param = {},headers={},token = false) {
    if (token) {
        param.token = getStorage('pifa')
    }
    return await axios.post(baseUrl + url, qs.stringify(param),{
            headers: {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        });
}

export async function postJson(url = '',param = {},headers={},token = false) {
    if (token) {
        param.token = getStorage('pifa')
    }
    return await axios.post(baseUrl + url,param,{
            headers: {
                "Content-Type":"application/json;charset=UTF-8"
            }
        })
}

// 复制代码
// 2、service.js--再次封装具体的请求

// import { get, post } from './axios'
// export const apiAddress = p => post('/service/v1/users/my_address/address_edit_before', p);
// // 3、页面使用

// // 复制代码
// import { apiAddress } from '@/request/service';// 导入我们的api接口
// export default {
//     name: 'Address',
//     created () {
//         this.onLoad();
//     },
//     methods: {
//         // 获取数据   
//         onLoad () {
//             // 调用api接口，并且提供了两个参数    
//             apiAddress({
//                 type: 0,
//                 sort: 1
//             }).then(res => {
//                 // 获取数据成功后的其他操作
//             })
//         }
//     }
// }
