export function authHeader () {
  // считывание данных пользователя из localStorage
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.authdata) {
    return { Authorization: 'Basic ' + user.authdata }
  } else {
    return {}
  }
}
