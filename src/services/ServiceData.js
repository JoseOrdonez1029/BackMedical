import Global from '../Global'

class ServiceData {
  async consultarListaCiudades() {
    let request = 'ciudades/apiciu/Ciudad/'
    let url = Global.API_URL + request
    try {
      const response = await fetch(url)
      const data = await response.json()

      console.log('Esta es la data', data)
      return data
    } catch (error) {
      console.log('Error:', error)
    }
  }

  async consultarListaEspecialidades() {
    let request = 'especialidad/apiespecialidad/Especialidad/'
    let url = Global.API_URL + request
    try {
      const response = await fetch(url)
      const data = await response.json()

      console.log('Esta es la data', data)
      return data
    } catch (error) {
      console.log('Error:', error)
    }
  }
  async consultarCitas() {
    let request = 'agendar/apiagendar/Agendar/'
    let url = Global.API_URL + request
    try {
      const response = await fetch(url)
      const data = await response.json()

      console.log('Esta es la data de citas agendadas', data)
      return data
    } catch (error) {
      console.log('Error:', error)
    }
  }
}
export default new ServiceData()
