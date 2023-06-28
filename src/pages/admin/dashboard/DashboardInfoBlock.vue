<template>
  <div class="row row-equal">
    <div class="flex xl6 xs12 lg6">
      <div class="row" v-if="!isLoading">
        <div class="flex xs12 sm4">
          <va-card class="mb-4" :color="success">
            <va-card-content>
              <h2 class="va-h2 ma-0" style="color: white">{{ citasRealizadas }}</h2>
              <p style="color: white">Realizadas</p>
            </va-card-content>
          </va-card>
        </div>
        <div class="flex xs12 sm4">
          <va-card class="mb-4" :color="info">
            <va-card-content>
              <h2 class="va-h2 ma-0" style="color: white">{{ citasPendientes }}</h2>
              <p style="color: white">Pendientes</p>
            </va-card-content>
          </va-card>
        </div>
        <div class="flex xs12 sm4">
          <va-card class="mb-4" :color="danger">
            <va-card-content>
              <h2 class="va-h2 ma-0" style="color: white">{{ citasCanceladas }}</h2>
              <p style="color: white">Canceladas</p>
            </va-card-content>
          </va-card>
        </div>
      </div>
      <div v-else>Cargando...</div>
    </div>
    <div class="flex xl6 xs12 lg6">
      <div class="row">
        <div class="flex xs12 sm6 md6">
          <va-card v-if="!isLoading">
            <va-card-content>
              <h2 class="va-h2 ma-0" :style="{ color: colors.primary }">{{ lista.length }}</h2>
              <p class="no-wrap">Totales</p>
            </va-card-content>
          </va-card>
          <div v-else>Cargando...</div>
        </div>
        <!-- <div class="flex xs12 sm6 md6">
          <va-card>
            <va-card-content>
              <div class="row row-separated">
                <div class="flex xs4">
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.primary }">{{ lista.length }}</h2>
                  <p class="va-text-center">Hoy</p>
                </div>
                <div class="flex xs4">
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.info }">24</h2>
                  <p class="va-text-center no-wrap">{{ t('dashboard.info.points') }}</p>
                </div>
                <div class="flex xs4">
                  <h2 class="va-h2 ma-0 va-text-center" :style="{ color: colors.warning }">91</h2>
                  <p class="va-text-center">{{ t('dashboard.info.units') }}</p>
                </div>
              </div>
            </va-card-content>
          </va-card>
        </div> -->
      </div>
    </div>

    <!-- <div class="flex xs12 sm6 md6 xl3 lg3">
      <va-card stripe stripe-color="info">
        <va-card-title>
          {{ t('dashboard.info.componentRichTheme') }}
        </va-card-title>
        <va-card-content>
          <p class="rich-theme-card-text">
            Buying the right telescope to take your love of astronomy to the next level is a big next step.
          </p>

          <div class="mt-3">
            <va-button color="primary" target="_blank" href="https://github.com/epicmaxco/vuestic-ui">
              {{ t('dashboard.info.viewLibrary') }}
            </va-button>
          </div>
        </va-card-content>
      </va-card>
    </div>

    <div class="flex xs12 sm6 md6 xl3 lg3">
      <va-card>
        <va-image :src="images[currentImageIndex]" style="height: 200px" />
        <va-card-title>
          <va-button preset="plain" icon-right="fa-arrow-circle-right" @click="showModal">
            {{ t('dashboard.info.exploreGallery') }}
          </va-button>
        </va-card-title>
      </va-card>
    </div> -->
    <!-- <va-modal v-model="modal">
      <va-carousel v-model="currentImageIndex" :items="images" class="gallery-carousel" />
    </va-modal> -->
  </div>
  <div class="flex xs12">
    <va-button class="mr-2 mb-2" @click="buscar"> Refrescar</va-button>
  </div>
  <div class="markup-tables flex">
    <va-card class="flex mb-4">
      <va-card-title>Pacientes atendidos</va-card-title>
      <va-card-content>
        <div class="table-wrapper" v-if="!isLoading">
          <div class="table-wrapper">
            <table class="va-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Motivo</th>
                  <th>Tipo Cita</th>
                  <th>Estado</th>
                  <th>Info Paciente</th>
                  <th>Cancelar</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="cita in lista" :key="cita.IdCita">
                  <td>{{ cita.Fecha }}</td>
                  <td>{{ cita.Hora }}</td>
                  <td>{{ cita.Motivo }}</td>
                  <td>
                    <va-badge :text="cita.Estados" :color="getStatusColor(cita.Estados)" />
                  </td>
                  <td>{{ cita.Tipodeconsulta }}</td>
                  <td><va-button class="mr-2 mb-2" color="info" @click="showModal(cita)"> Paciente </va-button></td>
                  <td>
                    <va-button class="mr-2 mb-2" color="danger" @click="estadoCita(establecerIdCita('Cancelada',cita.IdCita))"> Cancelar </va-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else>Cargando...</div>
      </va-card-content>
    </va-card>
  </div>
  <va-modal v-model="modalInferior" size="small" :title="infoPaciente" :cancel-text="cerrarBoton">
    <template #default>
      <div v-if="pacienteInfo">
        <h3>{{ pacienteInfo.NombreCompletoPac }}</h3>
        <p>
          <b>Ciudad:</b> {{ pacienteInfo.ciudadPac }} <br />
          <b>Fecha Nacimiento:</b> {{ pacienteInfo.FechaNacimientoPac }} <br /><b>Cédula:</b>
          {{ pacienteInfo.cedulaPac }}
        </p>
        <br />
        <va-button class="mr-2 mb-2" color="success" @click="estadoCita('Realizada')"> Realizada</va-button>
        <!-- Aquí puedes mostrar la información del paciente según tus necesidades -->
      </div>
      <div v-else>
        <p>No se ha seleccionado ninguna cita.</p>
      </div>
    </template>
  </va-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { VaCarousel, VaModal, VaCard, VaCardContent, VaCardTitle, VaButton, VaImage, useColors } from 'vuestic-ui'
  import { onMounted } from 'vue'
  import store from '../../../stores/vuexStore'
  import ServiceData from '../../../services/ServiceData'
  import ServiceProfile from '../../../services/ServiceProfile'

  const { colors } = useColors()
  import data from '../../../data/tables/markup-table/data.json'

  const { t } = useI18n()

  const users = ref(data.slice(0, 8))
  const infoPaciente = 'Información del Paciente'
  const detallePaciente = 'Data:'
  const cerrarBoton = 'Cerrar'
  const citas = ref([])
  let lista = []
  const success = 'success'
  const danger = 'danger'
  const info = 'info'
  let citasRealizadas = 0
  let citasCanceladas = 0
  let citasPendientes = 0
  const showLargeModal = ref(false)

  function getStatusColor(status: string) {
    if (status === 'Realizada') {
      return 'success'
    }

    if (status === 'Pendiente') {
      return 'info'
    }

    return 'danger'
  }
  function establecerIdCita(estado: string, idCita: number) {
    idCitaSeleccionada.value = idCita
    return estado
  }
  function estadoCita(estado: string) {
    const idCita = idCitaSeleccionada.value

    // Buscar la cita en la lista
    const cita = lista.find((c) => c.IdCita === idCita)

    if (cita) {
      console.log('Entreee')
      // Actualizar el estado de la cita
      let estadoAnterior = cita.Estados
      cita.Estados = estado

      // Actualizar la lista en la interfaz
      lista = [...lista] // Hacer una copia de la lista para Vue reactividad

      // Actualizar los contadores de citas
      if (estado === 'Realizada') {
        citasRealizadas++
        if (estadoAnterior == 'Pendiente') {
          citasPendientes--
        } else {
          citasCanceladas--
        }
      } else {
        citasCanceladas++
        if (estadoAnterior == 'Realizada') {
          citasRealizadas--
        } else {
          citasPendientes--
        }
      }
      // Actualizar la tabla y las variables después de un breve retraso (simulando una operación de carga)
      isLoading.value = true
      setTimeout(() => {
        isLoading.value = false
      }, 500) // Cambiar el valor del tiempo de espera según sea necesario
      // Cerrar el modal inferior
      modalInferior.value = false
    }
  }

  const modal = ref(false)
  const currentImageIndex = ref(0)
  const images = ref([
    'https://i.imgur.com/qSykGko.jpg',
    'https://i.imgur.com/jYwT08D.png',
    'https://i.imgur.com/9930myH.jpg',
    'https://i.imgur.com/2JxhWD6.jpg',
    'https://i.imgur.com/MpiOWbM.jpg',
  ])
  const pacienteInfo = ref(null)
  const idCitaSeleccionada = ref(0)
  const modalInferior = ref(false)
  async function showModal(cita) {
    // console.log("Cita:",cita)
    // Realizar la consulta del paciente correspondiente a la cita.IdPaciente
    const responsePaciente = await ServiceProfile.consultarListaPacientes()

    // Obtener la información del paciente
    const paciente = responsePaciente.filter((p) => {
      return p.IdPaciente == cita.IdPaciente
    })
    console.log('Hay paciente muchachos', paciente)
    // Actualizar la propiedad pacienteInfo con la información del paciente
    idCitaSeleccionada.value = cita.IdCita
    pacienteInfo.value = paciente[0]
    console.log('Paiente Seleccionado:', pacienteInfo.value)
    // Mostrar el modal inferior
    modalInferior.value = true
  }

  async function dataPerfil() {
    let perfil = store.state.User
    let responseCitas = await ServiceData.consultarCitas()
    let Realizadas = responseCitas.filter((cita) => {
      return cita.Estados == 'Realizada'
    })
    let Canceladas = responseCitas.filter((cita) => {
      return cita.Estados == 'Cancelada'
    })
    let Pendientes = responseCitas.filter((cita) => {
      return cita.Estados == 'Pendiente'
    })
    console.log('Estas son las Realizadas', Realizadas.length)

    console.log('Estas son las Canceladas', Canceladas.length)
    console.log('Estas son las Pendientes', Pendientes.length)
    console.log('Estas son las citas', responseCitas)
    citasRealizadas = Realizadas.length
    citasCanceladas = Canceladas.length
    citasPendientes = Pendientes.length
    citas.value = responseCitas
    console.log('Antes', lista)
    lista = responseCitas
    console.log('Estas son las citas agendadas', lista)
    console.log('perfil', perfil)
  }
  const isLoading = ref(true)

  onMounted(async () => {
    await dataPerfil()
    isLoading.value = false
  })

  async function buscar() {
    isLoading.value = true
    await dataPerfil()
    isLoading.value = false
  }
</script>

<style lang="scss" scoped>
  .row-separated {
    .flex + .flex {
      border-left: 1px solid var(--va-background-primary);
    }
  }

  .rich-theme-card-text {
    line-height: 1.5;
  }

  .gallery-carousel {
    width: 80vw;
    max-width: 100%;

    @media all and (max-width: 576px) {
      width: 100%;
    }
  }
  .markup-tables {
    .table-wrapper {
      overflow: auto;
    }

    .va-table {
      width: 100%;
    }
  }
</style>
