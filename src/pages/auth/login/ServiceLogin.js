import Global from '../../../Global'

class ServiceLogin {
  async login(user, password) {
    console.log('Entrada usuario al hacer login:')
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const raw = JSON.stringify({
      username: user,
      password: password,
    })

    console.log('raw de insertar usuario', raw)
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    let request = 'api/login/'
    let url = Global.API_URL + request

    try {
      const response = await fetch(url, requestOptions)
      const result = await response.json() // Parsea la respuesta como JSON

      console.log('Esta es la respuesta de login', result)

      return result // Retorna el resultado de la petición
    } catch (error) {
      console.log('Error:', error)
      throw error // Lanza el error para manejarlo en un nivel superior si es necesario
    }
  }
}
export default new ServiceLogin()
