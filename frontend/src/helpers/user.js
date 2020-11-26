export const User = {
  renewToken: ({token, data = {}}) => {
    localStorage.setItem('token', token)
    localStorage.setItem('data', JSON.stringify(data))
  },
  isLogged: () =>
    localStorage.getItem('token') !== null,
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('data')
  },
  getInfo: () => {
    const data = localStorage.getItem('data')
    const token = localStorage.getItem('token')

    if (data) {
      return {
        ...JSON.parse(data),
        token,
      }
    } else {
      return null
    }
  }
}

export default User
