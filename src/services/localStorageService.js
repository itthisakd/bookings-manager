const tokenName = 'token'
const setToken = (token) => localStorage.setItem(tokenName, token)
const getToken = () => localStorage.getItem(tokenName)
const clearToken = () => localStorage.removeItem(tokenName)
// const getRole = async () => {
//   const token = await getToken()
//   if (token) {
//     const decoded = await jwt_decode(token)
//     console.log(decoded)
//     return decoded.position.toUpperCase()
//   } else {
//     return 'GUEST'
//   }
// }

export default {
  setToken,
  getToken,
  clearToken
}
