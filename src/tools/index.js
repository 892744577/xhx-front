/**
   * 获取 Storage 中的数据
   *
   * @param {String} key
   * @param {any} Default  兼容获取空值的情况
   *
   * @return {any}
   *
   * @Author 雨落
   */
import { isString, isObject } from 'lodash'

export const getStorage = (key, Default = '') => {
    let t = window.localStorage.getItem(key)
    t = isString(t) && t.indexOf('{') !== -1 ? JSON.parse(t) : t
    return t || Default
}

/**
   * 设置 Storage 中的数据
   *
   * @param {String} key
   * @param {any} data
   *
   * @return {undefined}
   *
   * @Author 雨落
   */
export const setStorage = (key, data) => {
    return window.localStorage.setItem(
        key,
        (isObject(data) && JSON.stringify(data)) || data
    )
}
/**
   * 清除 Storage 中的数据
   *
   * @param {String} key
   * @param {any} data
   *
   * @return {undefined}
   *
   * @Author 雨落
   */
export const clearStorage = (key) => {
    return window.localStorage.removeItem(
        key
    )
}

/**
 * 时间戳转换
 *
 * @property  {String} timestamp
 * 
 * @Author 雨落
 */
export function getYMDHMS (timestamp) {
    if (timestamp) {
        let time = new Date(timestamp * 1000)
        let year = time.getFullYear()
        const month = (time.getMonth() + 1).toString().padStart(2, '0')
        const date = (time.getDate()).toString().padStart(2, '0')
        const hours = (time.getHours()).toString().padStart(2, '0')
        const minute = (time.getMinutes()).toString().padStart(2, '0')
        const second = (time.getSeconds()).toString().padStart(2, '0')
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
    } else {
        return false
    }
}
