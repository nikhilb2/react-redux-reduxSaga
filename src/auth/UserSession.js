
import jsCookie from 'js-cookie'

export const saveAuth = jwt => {
  jsCookie.set('jwt', jwt, { expires: 7 })
}

export const login = details => {
  jsCookie.set('user', JSON.stringify(details.data))
}

export const currentSession = () => {
  const user = jsCookie.get('user')
  return user ? JSON.parse(user) : null
}

export const getJwt = () => jsCookie.get('jwt')

export const logout = () => {
  jsCookie.remove('user')
  jsCookie.remove('jwt')
}
