export function configureFakeBackend () {
  const users = [
    { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
    { id: 2, username: 'test2', password: 'test2', firstName: 'Test2', lastName: 'User2' },
    { id: 3, username: 'test3', password: 'test3', firstName: 'Test3', lastName: 'User3' }
  ]
  const realFetch = window.fetch
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // небольшая задержка для симуляции коннекта с апи
      setTimeout(() => {
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          const params = JSON.parse(opts.body)

          // фильтруем пользователей по нашим параметрам (логин и пароль)
          const filteredUsers = users.filter(user => {
            return user.username === params.username && user.password === params.password
          })

          if (filteredUsers.length) {
            // если успешный вход то формируем массив с данными пользователя
            const user = filteredUsers[0]
            const responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName
            }
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) })
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Username or password is incorrect')
          }

          return
        }

        if (url.endsWith('/users') && opts.method === 'GET') {
          // проверяем фейковый токен и возвращаем спосок пользователей если всё хорошо
          if (opts.headers && opts.headers.Authorization === `Basic ${window.btoa('test:test')}`) {
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) })
          } else {
            // возвращаем 401 если проблема с токеном
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Unauthorised')
          }

          return
        }
        realFetch(url, opts).then(response => resolve(response))
      }, 1000)
    })
  }
}
