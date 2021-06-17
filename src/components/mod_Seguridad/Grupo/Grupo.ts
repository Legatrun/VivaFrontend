import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import helpers from '@/helper';
import * as popup from '@/popup';

@Component
export default class AdmGrupoComponent extends Vue {
  private headers: any[] = [
    // { text: 'IDGrupo', align: 'left', sortable: true, value: 'idgrupo', width: '15%' },
    {
      text: 'Descripción',
      align: 'left',
      sortable: false,
      value: 'descripcion',
      width: '70%',
    },
    {
      text: 'Operaciones',
      align: 'center',
      sortable: false,
      value: 'action',
      width: '30%',
    },
  ];
  private WebApi: string = this.$store.state.server + 'Api/Grupo';
  private WebApiConsultar: string = this.$store.state.server + 'Api/Grupo/Consultar';
  private WebApiBuscar: string = this.$store.state.server + 'Api/Grupo/Buscar';
  private BuscarGrupoXInstitucion: string = this.$store.state.server + 'Api/Grupo/BuscarGrupoXInstitucion';

  private WebApiGrupoUser: string = this.$store.state.server + 'Api/GrpUsuario';

  private WebApiUsuario: string = this.$store.state.server + 'Api/Usuarios';
  private WebApiUsuarioBuscar: string = this.$store.state.server + 'Api/Usuarios/Buscar';
  

  private grupo = new services.clase_grupo();
  private listagrupo = new services.clase_grupo();
  private lstgrupo: services.clase_grupo[] = [];
  private lstgrupoXInsti: services.clase_grupo[] = [];
  private buscargrupo = '';
  private dialog = false;
  private operacion = '';
  private userSelected = new services.clase_usuarios();
  private listusuarios = new services.clase_usuarios();
  private lstUsersXInsti: services.clase_usuarios[] = [];
  private grupoUser = new services.clase_grpusuario();
  private promisesGrupos: Promise<void>[] = [];
	private helper:helpers = new helpers();
	private popup = new popup.Swal();

  private FormatDate(data: any) {
    return moment(data).format('YYYY-MM-DD');
  }
  private FormatBoolean(data: any) {
    if (data) {
      return 'SI';
    } else {
      return 'NO';
    }
  }
  private updateText(Value: string) {
    if (Value !== null) {
      return Value.toUpperCase();
    } else {
      return Value;
    }
  }
  // ?? WATCHERS
  @Watch('$store.state.institucionSelected') //?? Watcher de Vuex
  onInstitucionSelectedChange(newVal: number) {
    this.cargar_data();
  }
  private mounted() {
    this.cargar_data();
  }
  private cargar_data() {
    // /*eslint no-shadow: 'error'*/
    // if (this.$store.state.auth !== true) {
    // this.$router.push({ path: '/Login' });
    // }
    new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico('Api/Grupo/Consultar'), null)
      .then((resgrupo) => {
        if (resgrupo.data._error.error === 0) {
          // let responsegrupo = resgrupo.data._data;
          this.lstgrupo = resgrupo.data._data;
          // this.helper.filterDataXAgencia(responsegrupo);
          this.dialog = false;
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resgrupo.data._error.descripcion,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        swal.fire({
          type: 'error',
          title: 'Consultar',
          text: 'Error Inesperado',
          showConfirmButton: false,
          timer: 2000,
        });
      });

    // let auxinstitucion:services.clase_instituciones = new services.clase_instituciones();
    // auxinstitucion.idinstitucion = this.$store.state.institucionSelected;

    // new services.Operaciones()
    //   .Buscar(this.helper.getWebServiceDinamico('Api/Grupo/BuscarGrupoXInstitucion?idinstitucion=' + this.$store.state.institucionSelected), null)
    //   .then((resgrupo) => {
    //     if (resgrupo.data._error.error === 0) {
    //       let responsegrupo = resgrupo.data._data;
    //       this.lstgrupoXInsti = this.helper.filterDataXAgencia(responsegrupo);
    //       this.dialog = false;
    //     } else {
    //       swal.fire({
    //         type: 'error',
    //         title: 'Consultar',
    //         text: resgrupo.data._error.descripcion,
    //         showConfirmButton: false,
    //         timer: 2000,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     swal.fire({
    //       type: 'error',
    //       title: 'Consultar',
    //       text: 'Error Inesperado',
    //       showConfirmButton: false,
    //       timer: 2000,
    //     });
    //   });
  }
  private getUsersByInstitucion() {
    //const params = new URLSearchParams();
    //params.append('idinstitucion', this.$store.state.institucionSelected);
    this.listusuarios.idinstitucion = this.$store.state.institucionSelected;
    new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico('Api/Usuarios/BuscarXInstitucion'), this.listusuarios)
      .then((resgrupo) => {
        if (resgrupo.data._error.error === 0) {
          this.lstUsersXInsti = resgrupo.data._data;
          this.Insertar();
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resgrupo.data._error.descripcion,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        swal.fire({
          type: 'error',
          title: 'Consultar',
          text: 'Error Inesperado',
          showConfirmButton: false,
          timer: 2000,
        });
      });
  }
  private Insertar(): void {
    if (this.lstgrupoXInsti.length != 0) {
      this.grupo = new services.clase_grupo();
      this.operacion = 'Insert';
      this.dialog = true;
    } else {
      swal.fire({
        type: 'warning',
        title: 'Usuario',
        text: 'Se requieren usuario(s) para registrar un grupo',
        showConfirmButton: false,
        timer: 4000,
      });
    }
  }
  private insertarGrupo() {
    this.promisesGrupos.push(
      new services.Operaciones()
        .Insertar(this.WebApi, this.grupo)
        .then((result) => {
          if (result.data.error === 0) {
            let dataGrupo = result.data.descripcion;
            let idGrupoInserted = parseInt(
              result.data.descripcion.substr(dataGrupo.indexOf(':') + 1).trim() //!! Revisar supuesto aumento de ID!
            );
            this.grupoUser.idgrupo = idGrupoInserted;
          } else {
            console.log('Error al insertar grupo');
          }
        })
        .catch((error) => {
          console.log('Error al insertar grupo | Error: ' + error);
        })
    );
  }
  private insertarGrupoUser() {
    this.promisesGrupos.push(
      new services.Operaciones()
        .Insertar(this.WebApiGrupoUser, this.grupoUser)
        .then((result) => {
          if (result.data.error === 0) {
            console.log('Relacion usuario-grupo registrada');
          } else {
            console.log('Error al insertar relacion usuario-grupo');
          }
        })
    );
  }
  private async Grabar() {
    if (this.operacion === 'Update') {

      this.grupo.id_agencia = this.$store.state.agenciaSelected;
      await this.helper.setPromesas('Api/Grupo', this.grupo, 'Actualizar');

      await Promise.all(this.$store.state.lstPromises).then((result) => {
        this.popup.success('Modificación', 'La modificación se efectuó en Central y Agencia');
        this.cargar_data();
        this.dialog = false;
      }).catch((error) => {
        this.popup.error('Modificación', 'Error Inesperado: ' + error);
      });

    } else {
      //?? Get IDusuario from Promise 1 and use it in 2nd promise

      this.grupo.id_agencia = this.$store.state.agenciaSelected;
      await this.helper.setPromesas('Api/Grupo', this.grupo, 'Insertar');

      await Promise.all(this.$store.state.lstPromises).then((result) => {
        console.log('La inserción de Grupo se efectuó en Central y Agencia');
        this.cargar_data();
        this.dialog = false;
      }).catch((error) => {
        console.log('Error al registrar grupos en Central y agencia' + error);
      });

      this.grupoUser.id_agencia = this.$store.state.agenciaSelected;
      this.grupoUser.idgrupo = this.$store.state.centralIDresponse;

      await this.helper.setPromesas('Api/GrpUsuario', this.grupoUser, 'Insertar');

      await Promise.all(this.$store.state.lstPromises).then((result) => {
        this.popup.success('Insertar', 'La inserción se efectuó en Central y Agencia');
        this.cargar_data();
        this.dialog = false;
      }).catch((error) => {
        this.popup.error('Insertar', 'Error Inesperado: ' + error);
      });
      
    }
  }
  private Cancelar() {
    this.cargar_data();
    this.dialog = false;
  }
  private Actualizar(data: services.clase_grupo): void {
    this.grupo = data;
    this.operacion = 'Update';
    this.dialog = true;
  }
  private select_fecha(fecha: string) {
    return fecha.substr(0, 10);
  }
  private Eliminar(data: services.clase_grupo): void {
    swal
      .fire({
        title: 'Esta seguro de esta operacion?',
        text: 'Eliminar Grupo  ' + data.descripcion,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar!',
      })
      .then((result) => {
        if (result.value) {
          new services.Operaciones()
            .Eliminar(this.WebApi, data)
            // tslint:disable-next-line: no-shadowed-variable
            .then((result) => {
              if (result.data.error === 0) {
                swal.fire({
                  type: 'success',
                  title: 'Eliminar',
                  text: result.data.descripcion,
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.cargar_data();
              } else {
                swal.fire({
                  type: 'error',
                  title: 'Eliminar',
                  text: result.data.descripcion,
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            })
            .catch((error) => {
              swal.fire({
                type: 'error',
                title: 'Eliminar',
                text: 'Error Inesperado',
                showConfirmButton: false,
                timer: 2000,
              });
            });
        }
      });
  }

  private close () {
    this.$store.commit("setPopUpContent", "");

  }
}
