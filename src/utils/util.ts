/*
 * @Author: Rock Chang
 * @Date: 2021-08-10 09:34:39
 * @LastEditTime: 2021-08-10 09:38:00
 * @Description: 工具类方法
 */

/**
 * @description: 根据 key 获取 url 中的值
 * @param {string} key
 * @param {string} url
 * @return {string}
 */
export const getQueryString = (key: string, url = location.search) => {
	const urlSP = new URLSearchParams(url);
	return urlSP.get(key);
};
