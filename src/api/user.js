import { loadJwt } from "../utils/handleJwt";
import {API_URL} from '@env'
/**
 * @typedef {Object} User
 * @property {number} ID 用户 ID.
 * @property {string} CreatedAt 用户创建时的时间.
 * @property {string} UpdatedAt 用户数据上次更新的时间.
 * @property {null} DeletedAt 用户被删除的时间.
 * @property {string} username 用户的用户名.
 * @property {string} password 用户的密码. 为了保护，它是空的.
 * @property {string} avatar 用户头像的 URL.
 * @property {null} todos 用户的待办事项.
 */

/**
 * 这个函数从 API 获取当前用户的信息。
 * @returns {Promise<User>} 一个解析为用户数据的 Promise。
 * @throws {Error} 当有获取问题时抛出。
 */
async function getCurrentUser() {
  try {
    const jwtToken = await loadJwt();
    const headers = { "Authorization": jwtToken }; // 修改这里的键名
    const response = await fetch(`${API_URL}/users/info`, {
      method: "GET",
      headers: headers,
    });
    const resJson = await response.json(); // 获取响应数据
    return resJson.data; // 返回响应数据
  } catch (error) {
    throw new Error(error);
  }
}
export {getCurrentUser}
