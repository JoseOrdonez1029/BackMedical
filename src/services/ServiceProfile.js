import Global from '../Global'

class ServiceProfile {
  async consultarListaPacientes() {
    let request = 'paciente/api/PacienteM/'
    let url = Global.API_URL + request
    try {
      const response = await fetch(url)
      const data = await response.json()

      console.log('Esta es la data pacientes', data)
      return data
    } catch (error) {
      console.log('Error:', error)
    }
  }
  async actualizarPaciente(CedulaPac, NombreCompletoPac, TelefonoPac, CorreoPac, CiudadPac, FechaNacimientoPac) {
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    console.log('Entre al actualizarPaciente')
    const raw = JSON.stringify({
      cedulaPac: CedulaPac,
      NombreCompletoPac: NombreCompletoPac,
      telefonoPac: TelefonoPac,
      correoPac: CorreoPac,
      ciudadPac: CiudadPac,
      FechaNacimientoPac: FechaNacimientoPac,
    })

    console.log('raw', raw)
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    let request = 'paciente/api/PacienteM/'
    let url = Global.API_URL + request

    try {
      const response = await fetch(url, requestOptions)
      console.log('Esta es la respuesta', response)
      return response
    } catch (error) {
      console.log('Error:', error)
    }
  }

  async consultarListaEspecialistas() {
    let request = 'medico/apiMedico/MedicoM/'
    let url = Global.API_URL + request
    try {
      const response = await fetch(url)
      const data = await response.json()

      console.log('Esta es la data especialistas', data)
      return data
    } catch (error) {
      console.log('Error:', error)
    }
  }

  async editarMedico(
    NombreCompletoMed,
    TelefonoMed,
    NumeroTarjetaMed,
    CedulaMed,
    CorreoMed,
    FechasDisponibilidad,
    HoraInicio,
    HoraFinal,
    PerfilProfesional,
  ) {
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000')
    console.log('Entre al insertarMedico')
    const raw = JSON.stringify({
      NombreCompletoMed: NombreCompletoMed,
      NumeroTarjetaMed: NumeroTarjetaMed,
      CedulaMed: CedulaMed,
      CorreoMed: CorreoMed,
      TelefonoMed: TelefonoMed,
      CiudadMed: CiudadMed,
      Especialidad: Especialidad,
      FechasDisponibilidad: FechasDisponibilidad,
      HoraInicio: HoraInicio,
      HoraFinal: HoraFinal,
      PerfilProfesional: PerfilProfesional,
    })

    console.log('raw', raw)
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    let request = 'medico/apiMedico/MedicoM'
    let url = Global.API_URL + request
    ;('')
    try {
      const response = await fetch(url, requestOptions)
      console.log('Esta es la respuesta - Médico', response)
      return response
    } catch (error) {
      console.log('Error:', error)
    }
  }
}
export default new ServiceProfile()
