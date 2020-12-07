/**
 * @param {string} path 路由
 * @returns {Boolean}
 */
export function isExternal (path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
