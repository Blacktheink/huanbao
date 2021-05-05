import axios from 'axios'
// import {Loading, Message, Alert, Notification, MessageBox} from 'element-ui';
// import router from '../router';

axios.defaults.withCredentials = true;//让ajax携带cookie
axios.defaults.timeout = 0;
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_URL : process.env.VUE_APP_BASE_URL;
// axios.defaults.baseURL = process.env.VUE_APP_URL;
export const http = (options) => {
    // let loadingType = Loading.service({
    //     lock: true,
    //     text: '加载数据ing···',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    // });
    if (window.localStorage.getItem('secretKey')) {
        Object.assign(options, {
            headers: {
                'S-TOKEN-SecretKey': window.localStorage.getItem('secretKey') || null,
            },
        })
    }
    return new Promise((resolve, reject) => {
        axios(options)
            .then(res => {
                res = res.data;
                setTimeout(() => {
                    // loadingType.close();
                    resolve(res);
                }, 1000);
            })
            .catch(error => {
                setTimeout(() => {
                    // loadingType.close();
                    // Notification.error({
                    //     title: '提示',
                    //     message: '网络错误: ' + error.message || '请求错误',
                    // });
                    reject(error)
                }, 1000);
            })
    })
};

export const http_async = (options) => {
    if (window.localStorage.getItem('secretKey')) {
        Object.assign(options, {
            headers: {
                'S-TOKEN-SecretKey': window.localStorage.getItem('secretKey') || null,
            },
        })
    }
    return new Promise((resolve, reject) => {
        axios(options)
            .then(res => {
                res = res.data;
                setTimeout(() => {
                    resolve(res);
                }, 1000);
            })
            .catch(error => {
                // Notification.error({
                //     title: '提示',
                //     message: '网络错误: ' + error.message || '请求错误',
                // });
                reject(error)
            })
    })
};

export const http_CORS = (method, url, data) => {
    // let loadingType = Loading.service({
    //     lock: true,
    //     text: '加载数据ing···',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    // });
    let xhr;
    if (window.XMLHttpRequest) {// code for all new browsers
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {// code for IE5 and IE6
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        xhr = null;
    }
    return new Promise((resolve, reject) => {
        if (xhr) {
            xhr.withCredentials = true;
            url = process.env.VUE_APP_URL + url;
            xhr.open(method, url, true);
            if (data !== undefined) {
                xhr.send(data);
            } else {
                xhr.send(null);
            }
            xhr.onload = (res) => {
                res = JSON.parse(res.target.responseText);
                setTimeout(() => {
                    // loadingType.close();
                    resolve(res);
                }, 1000);
            };
            xhr.onerror = (error) => {

                setTimeout(() => {
                    // loadingType.close();
                    // Notification.error({
                    //     title: '提示',
                    //     message: '网络错误: ' + error.message || '请求错误',
                    // });
                    reject(error)
                }, 1000);
            };
        } else {
            setTimeout(() => {
                // Notification.error({
                //     title: '提示',
                //     message: '网络错误:未进行请求 ',
                // });
            }, 1000);
        }
    })
};

export const http_CORS_async = (method, url, data) => {
    let xhr;
    if (window.XMLHttpRequest) {// code for all new browsers
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {// code for IE5 and IE6
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        xhr = null;
    }
    return new Promise((resolve, reject) => {
        if (xhr) {
            xhr.withCredentials = true;
            url = process.env.VUE_APP_URL + url;
            xhr.open(method, url, true);
            if (data !== undefined) {
                xhr.send(data);
            } else {
                xhr.send(null);
            }
            xhr.onload = (res) => {
                res = JSON.parse(res.target.responseText);
                setTimeout(() => {
                    resolve(res);
                }, 1000);
            };
            xhr.onerror = (error) => {
                setTimeout(() => {
                    // Notification.error({
                    //     title: '提示',
                    //     message: '网络错误: ' + error.message || '请求错误',
                    // });
                    reject(error)
                }, 1000);
            };
        } else {
            setTimeout(() => {
                // Notification.error({
                //     title: '提示',
                //     message: '网络错误:未进行请求 ',
                // });
            }, 1000);
        }
    })
};
//导出http函数
export default {
    http,
    http_async,
    http_CORS,
    http_CORS_async
};