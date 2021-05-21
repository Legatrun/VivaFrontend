import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import grupo from '../Grupo/Grupo';
import user from '../Usuarios/Usuarios';
import helpers from '@/helper';
import * as popup from '@/popup';



@Component({
  components: {
    grupo,
    user,
  },
})
export default class AdmGrpUsuarioComponent extends Vue {
  private headers: any[] = [
    // { text: 'IDGrpUsuario', align: 'left', sortable: true, value: 'idgrpusuario', width: '15%' },
    {
      text: 'Grupo',
      align: 'left',
      sortable: false,
      value: 'idgrupo',
      width: '40%',
    },
    {
      text: 'Usuario',
      align: 'left',
      sortable: false,
      value: 'idusuario',
      width: '40%',
    },
    {
      text: 'Operaciones',
      align: 'center',
      sortable: false,
      value: 'action',
      width: '20%',
    },
  ];
  private headersUsers: any[] = [
    {
      text: 'Nombre',
      align: 'left',
      sortable: true,
      value: 'nombre',
      width: '30%',
    },
    {
      text: 'Usuario de Dominio',
      align: 'left',
      sortable: false,
      value: 'usrdominio',
      width: '10%',
    },
    {
      text: 'Email',
      align: 'left',
      sortable: true,
      value: 'email',
      width: '40%',
    },
    {
      text: 'Fecha Registro',
      align: 'left',
      sortable: true,
      value: 'fechacreacion',
      width: '20%',
    },
  ];
  private WebApiGrupoUser: string = this.$store.state.server + 'Api/GrpUsuario';
  private WebApiGrupoUserConsultar: string = this.$store.state.server + 'Api/GrpUsuario/Consultar';
  private WebApiGrupoUserBuscar: string = this.$store.state.server + 'Api/GrpUsuario/Buscar';

  private WebApiGrupo: string = this.$store.state.server + 'Api/grupo';
  private WebApiGrupoConsultar: string = this.$store.state.server + 'Api/grupo/Consultar';
  private WebApiGrupoBuscar: string = this.$store.state.server + 'Api//Buscar';

  private WebApiUser: string = this.$store.state.server + 'Api/usuarios';
  private WebApiUserConsultar: string = this.$store.state.server + 'Api/usuarios/Consultar';
  private WebApiUserBuscar: string = this.$store.state.server + 'Api/usuarios/Buscar';
  private WebApiUserBuscarXInstitucion: string = this.$store.state.server + 'Api/usuarios/BuscarXInstitucion';

  private grpusuario = new services.clase_grpusuario();
  private lstgrpusuario: services.clase_grpusuario[] = [];
  private buscargrpusuario = '';
  private dialog = false;
  private operacion = '';
  // ?? CUSTOM VARS
  private lstGrupo: services.clase_grupo[] = [];
  private lstUser: services.clase_usuarios[] = [];
  private lstGrupoXinstit: services.clase_grupo[] = [];
  private lstUserXgrupo: services.clase_usuarios[] = [];
  private lstUsersExcluidos: services.clase_usuarios[] = [];
  private userSelected: services.clase_usuarios = new services.clase_usuarios();
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
    // console.log(newVal);
    // this.cargar_data();
    this.limpiar();
    this.cargar_data();
    // this.filtroGruposxUsersInstituc();
  }
  @Watch('$store.state.grpUsuarioDialogGrupo')
  onGrupoCreated(newVal: boolean) {
    if (!newVal) {
      this.cargar_data();
    }
  }
  @Watch('$store.state.grpUsuarioDialogUser')
  onUserCreated(newVal: boolean) {
    if (!newVal) {
      this.cargar_data();
    }
  }
  // ?? MAIN METHODS
  private mounted() {
    this.cargar_data();
  }
  private cargar_data() {
    // /*eslint no-shadow: 'error'*/
    // if (this.$store.state.auth !== true) {
    // this.$router.push({ path: '/Login' });
    // }

    new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico('Api/GrpUsuario/Consultar'), null)
      .then((resgrpusuario) => {
        if (resgrpusuario.data._error.error === 0) {
          let responseGrpusuario = resgrpusuario.data._data;
          this.lstgrpusuario = this.helper.filterDataXAgencia(responseGrpusuario);
          this.dialog = false;
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resgrpusuario.data._error.descripcion,
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

    new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico('Api/grupo/Consultar'), null)
      .then((resGrp) => {
        if (resGrp.data._error.error === 0) {
          let responseGrp = resGrp.data._data;
          this.lstGrupo = this.helper.filterDataXAgencia(responseGrp);
          this.dialog = false;
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resGrp.data._error.descripcion,
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

    let user:services.clase_usuarios = new services.clase_usuarios();
    user.idinstitucion = this.$store.state.institucionSelected;
    new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico('Api/usuarios/BuscarXInstitucion'), user)
      .then((resUsr) => {
        if (resUsr.data._error.error === 0) {
          let responseUsuarios = resUsr.data._data;
          this.lstUser = this.helper.filterDataXAgencia(responseUsuarios);
          this.filtroGruposxUsersInstituc();
          this.dialog = false;
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resUsr.data._error.descripcion,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch(() => {
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
    this.grpusuario = new services.clase_grpusuario();
    this.operacion = 'Insert';
    this.dialog = true;
  }
  private Grabar() {
    if (this.operacion === 'Update') {
      new services.Operaciones()
        .Actualizar(this.WebApiGrupoUser, this.grpusuario)
        .then((result) => {
          if (result.data.error === 0) {
            swal.fire({
              type: 'success',
              title: 'Actualizar',
              text: result.data.descripcion,
              showConfirmButton: false,
              timer: 2000,
            });
            this.cargar_data();
            this.dialog = false;
          } else {
            swal.fire({
              type: 'error',
              title: 'Actualizar',
              text: result.data.descripcion,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((error) => {
          swal.fire({
            type: 'error',
            title: 'Actualizar',
            text: 'Error Inesperado',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    } else {
      new services.Operaciones()
        .Insertar(this.WebApiGrupoUser, this.grpusuario)
        .then((result) => {
          if (result.data.error === 0) {
            swal.fire({
              type: 'success',
              title: 'Insertar',
              text: result.data.descripcion,
              showConfirmButton: false,
              timer: 2000,
            });
            this.cargar_data();
            this.dialog = false;
          } else {
            swal.fire({
              type: 'error',
              title: 'Insertar',
              text: result.data.descripcion,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((error) => {
          swal.fire({
            title: 'Insertar',
            text: 'Error Inesperado',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }
  }
  private Cancelar() {
    this.cargar_data();
    this.dialog = false;
  }
  private Actualizar(data: services.clase_grpusuario): void {
    this.grpusuario = data;
    this.operacion = 'Update';
    this.dialog = true;
  }
  private select_fecha(fecha: string) {
    return fecha.substr(0, 10);
  }
  private Eliminar(data: services.clase_grpusuario): void {
    swal
      .fire({
        title: 'Esta seguro de esta operacion?',
        text: 'Eliminacion de Registro' + data.idgrpusuario,
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
            .Eliminar(this.WebApiGrupoUser, data)
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
  // ?? CUSTOM METHODS
  private searchGrupo(idGrupo: number) {
    let lstGrupoFind = this.lstGrupo.filter(
      (grupo: any) => grupo.idgrupo === idGrupo
    );
    return lstGrupoFind[0].descripcion;
  }
  private searchUser(idUser: number) {
    console.log(idUser);

    let lstUserFind = this.lstUser.filter(
      (user: any) => user.idusuario === idUser
    );
    console.log(lstUserFind[0].nombre);
    return lstUserFind[0].nombre;
    // if (lstUserFind[0].estado) {    //!! Importante Agregar Validacion en back para que no mande registros con estado false
    //   return lstUserFind[0].nombre;
    // }
  }
  private filtroUsersxInstituc() {
    let idinstitucion = this.$store.state.institucionSelected;
    let usuariosInsti = this.lstUser.filter(
      (item) => item.idinstitucion === idinstitucion
    );

    return usuariosInsti;
  }
  private filtroGruposxUsersInstituc() {
    let scope = this;
    let usuariosInsti = this.filtroUsersxInstituc();
    let gruposUsuariosInsti: services.clase_grpusuario[] = [];
    usuariosInsti.forEach((users) => {
      scope.lstgrpusuario.forEach((userGrupos) => {
        if (users.idusuario === userGrupos.idusuario) {
          if (
            !gruposUsuariosInsti.some((g) => g.idgrupo === userGrupos.idgrupo) // en caso de que el grupo no esté en array
          ) {
            gruposUsuariosInsti.push(userGrupos); // grupos de usuarios que pertenecen a la institucion
          }
        }
      });
    });
    let gruposFiltrados: services.clase_grupo[] = [];
    gruposUsuariosInsti.forEach((grupoInsti) => {
      scope.lstGrupo.forEach((grupo) => {
        if (grupoInsti.idgrupo === grupo.idgrupo) {
          gruposFiltrados.push(grupo); // registros de grupos según la filtracion
        }
      });
    });
    this.lstGrupoXinstit = gruposFiltrados;
  }
  private filtroUsuariosGrupoSelected(idGrupo: number) {
    let scope = this;
    this.grpusuario.idgrupo = idGrupo;
    scope.lstUserXgrupo = [];
    let idUsersGrupo = this.lstgrpusuario.filter(
      (grpUser) => grpUser.idgrupo === idGrupo
    );
    idUsersGrupo.forEach((element) => {
      scope.lstUser.forEach((elem) => {
        if (element.idusuario === elem.idusuario) {
          scope.lstUserXgrupo.push(elem);
        }
      });
    });
  }
  private asignacionUser(Usuario: services.clase_usuarios) {
    //if (this.lstUserXgrupo.indexOf(Usuario) > -1) { // Probado tambien con include
    if (
      this.lstUserXgrupo.some(
        (User) => User['idusuario'] === Usuario['idusuario']
      )
    ) {
      swal
        .fire({
          title: 'Retirar Usuario',
          text: 'Esta seguro de excluir este usuario del Grupo?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'success',
          cancelButtonColor: 'error',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Aceptar!',
        })
        .then((result) => {
          if (result.value) {
            this.grpusuario.idusuario = Usuario.idusuario;
            let grpUserAeliminar = this.lstgrpusuario.filter(
              (grupo) =>
                grupo.idgrupo === this.grpusuario.idgrupo &&
                grupo.idusuario === this.grpusuario.idusuario
            );
            // new services.Operaciones()
            //   .Eliminar(this.WebApiGrupoUser, grpUserAeliminar[0])
            //   .then((result) => {
            //     if (result.data.error === 0) {
            //       swal.fire({
            //         type: 'success',
            //         title: 'Eliminar',
            //         text: result.data.descripcion,
            //         showConfirmButton: false,
            //         timer: 4000,
            //       });
            //       //   this.lstUserXgrupo = [];
            //       //   this.filtroUsuariosGrupoSelected(this.grpusuario.idgrupo);
            //       this.limpiar();
            //       this.cargar_data();
            //     } else {
            //       swal.fire({
            //         type: 'error',
            //         title: 'Eliminar',
            //         text: result.data.descripcion,
            //         showConfirmButton: false,
            //         timer: 4000,
            //       });
            //     }
            //   });

            grpUserAeliminar[0].id_agencia = this.$store.state.agenciaSelected;
            this.helper.setPromesas('Api/GrpUsuario', grpUserAeliminar[0], 'Eliminar', 'idgrpusuario');

            Promise.all(this.$store.state.lstPromises).then((result) => {
              this.popup.success('Baja', 'La baja se efectuó en Central y Agencia');
              this.limpiar();
              this.cargar_data();
            }).catch((error) => {
              this.popup.error('Baja', 'Error Inesperado: ' + error);
            });
          }
        });
    } else {
      // !! Pendiente modificacion en caso de existir registro dado de baja

      this.grpusuario.idusuario = Usuario.idusuario;
      this.grpusuario.id_agencia = this.$store.state.agenciaSelected;
      // new services.Operaciones()
      //   .Insertar(this.WebApiGrupoUser, this.grpusuario)
      //   .then((result) => {
      //     if (result.data.error === 0) {
      //       swal.fire({
      //         type: 'success',
      //         title: 'Insertar',
      //         text: result.data.descripcion,
      //         showConfirmButton: false,
      //         timer: 2000,
      //       });
      //       // this.lstUserXgrupo = [];
      //       // this.filtroUsuariosGrupoSelected(this.grpusuario.idgrupo);
      //       this.limpiar();
      //       this.cargar_data();
      //     } else {
      //       swal.fire({
      //         type: 'error',
      //         title: 'Insertar',
      //         text: result.data.descripcion,
      //         showConfirmButton: false,
      //         timer: 2000,
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     swal.fire({
      //       title: 'Insertar',
      //       text: 'Error Inesperado',
      //       showConfirmButton: false,
      //       timer: 2000,
      //     });
      //   });

      this.helper.setPromesas('Api/GrpUsuario', this.grpusuario, 'Insertar', 'idgrpusuario');

      Promise.all(this.$store.state.lstPromises).then((result) => {
        this.popup.success('Insertar', 'La Inserción se efectuó en Central y Agencia');
        this.limpiar();
        this.cargar_data();
      }).catch((error) => {
        this.popup.error('Insertar', 'Error Inesperado: ' + error);
      });
    }
  }
  // ?? DIALOG METHODS
  private showGrupo() {
    // this.$store.commit('switch_GrpUsuarioDialogGrupo');
    this.$store.commit('setPopUpContent', 'GestionGrupos');
  }
  private showUsers() {
    // this.$store.commit('switch_GrpUsuarioDialogUsers');
    this.$store.commit('setPopUpContent', 'GestionUsuarios');

  }
  private limpiar() {
    this.lstGrupo = [];
    this.lstGrupoXinstit = [];
    this.lstUser = [];
    this.lstUserXgrupo = [];
    this.lstUsersExcluidos = [];
    this.lstgrpusuario = [];
    this.userSelected = new services.clase_usuarios();
  }
  private cerrar() {
    //this.limpiar();
    this.lstUserXgrupo = [];
    this.$store.commit('switch_InstitucionDialogGrupo');
  }
}
