import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import helpers from '@/helper';
import * as popup from '@/popup';

@Component
export default class AdmGrpUsrRolesInstitucionesComponent extends Vue {
  private headers: any[] = [
    {
      text: 'Grupo de Usuarios',
      align: 'left',
      sortable: false,
      value: 'idgrpusuario',
      width: '40%',
    },
    {
      text: 'Rol de Institucion',
      align: 'left',
      sortable: false,
      value: 'idinstitucionrol',
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
  private headersRoles: any[] = [
    {
      text: 'Descripcion',
      align: 'center',
      sortable: true,
      value: 'descripcion',
      width: '50%',
    },
  ];
  private headersUsers: any[] = [
    {
      text: 'Nombre de Grupo',
      align: 'center',
      sortable: true,
      value: 'grupoDesc',
      width: '50%',
    },
  ];
  private WebApiGrpUsrRoles: string = this.$store.state.server + 'Api/GrpUsrRolesInstituciones';
  private WebApiGrpUsrRolesConsultar: string = this.$store.state.server + 'Api/GrpUsrRolesInstituciones/Consultar';
  private WebApiGrpUsrRolesBuscar: string = this.$store.state.server + 'Api/GrpUsrRolesInstituciones/Buscar';

  private WebApiRoles: string = this.$store.state.server + 'Api/roles';
  private WebApiRolesConsultar: string = this.$store.state.server + 'Api/roles/Consultar';
  private WebApiRolesBuscar: string = this.$store.state.server + 'Api/roles/Buscar';

  private WebApiGrupos: string = this.$store.state.server + 'Api/grupo';
  private WebApiGruposConsultar: string = this.$store.state.server + 'Api/grupo/Consultar';
  private WebApiGruposBuscar: string = this.$store.state.server + 'Api/grupo/Buscar';

  private WebApiInstitucionesRoles: string = this.$store.state.server + 'Api/InstitucionesRoles';
  private WebApiInstitucionesRolesConsultar: string = this.$store.state.server + 'Api/InstitucionesRoles/Consultar';
  private WebApiInstitucionesRolesBuscar: string = this.$store.state.server + 'Api/InstitucionesRoles/Buscar';

  private WebApiGruposUsuarios: string = this.$store.state.server + 'Api/GrpUsuario';
  private WebApiGruposUsuariosConsultar: string = this.$store.state.server + 'Api/GrpUsuario/Consultar';
  private WebApiGruposUsuariosBuscar: string = this.$store.state.server + 'Api/GrpUsuario/Buscar';

  private WebApiUsuarios: string = this.$store.state.server + 'Api/usuarios';
  private WebApiUsuariosConsultar: string = this.$store.state.server + 'Api/usuarios/Consultar';
  private WebApiUsuariosBuscar: string = this.$store.state.server + 'Api/usuarios/Buscar';

  private grpusrrolesinstituciones = new services.clase_grpusrrolesinstituciones();
  private institucionesroles = new services.clase_institucionesroles();

  private lstgrpusrrolesinstituciones: services.clase_grpusrrolesinstituciones[] = [];
  private buscargrpusrrolesinstituciones = '';
  private dialog = false;
  private operacion = '';
  // ?? CUSTOM VARS
  private e1 = 1;
  private lstRoles: services.clase_roles[] = [];
  private lstRolesInstitucion: services.clase_institucionesroles[] = [];
  private lstRolesSelected: services.clase_institucionesroles[] = [];
  private lstOperaciones: services.clase_operaciones[] = [];
  private lstUsuarios: services.clase_usuarios[] = [];
  private lstGrupos: services.clase_grupo[] = [];
  private lstGruposUsers: services.clase_grpusuario[] = [];
  private lstGruposUsersInstitucion: services.clase_grpusuario[] = [];
  private lstGruposSelected: services.clase_grpusuario[] = [];
	private helper:helpers = new helpers();
  private popup = new popup.Swal();

  // ?? WATCHERS
  @Watch('$store.state.institucionSelected') //?? Watcher de Vuex
  onInstitucionSelectedChange(newVal: number) {
    // console.log(newVal);
    // this.cargar_data();
    this.cargar_data();
    // this.filtroGruposxUsersInstituc();
  }
  // ?? COMPUTED Props
  get GruposFormat () {
    let distinctLstGrpUsrs = this.removeDuplicates(this.lstGruposUsers, 'idgrupo');
    let gruposFormatted = distinctLstGrpUsrs.map((grupo:any) => {
      return {
        grupoDesc: this.searchGrupo(grupo.idgrupo),
        ...grupo
      }
    });
    return gruposFormatted;
  }
  
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
  private mounted() {
    this.cargar_data();
  }
  private async cargarGrupos() {
    return new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico('Api/Grupo/Consultar'), null)
      .then((resGrupos) => {
        if (resGrupos.data._error.error === 0) {
          let responseGrpUsrRolesInst = resGrupos.data._data;
          return this.helper.filterDataXAgencia(responseGrpUsrRolesInst);
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resGrupos.data._error.descripcion,
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
  private async cargarGrupoUsersRolesInstitucion () {
    return new services.Operaciones()
    .Buscar(this.helper.getWebServiceDinamico('Api/GrpUsrRolesInstituciones/BuscarXInstitucion?idinstitucion=' + this.$store.state.institucionSelected), null)
    .then((resgrpusrrolesinstituciones) => {
      if (resgrpusrrolesinstituciones.data._error.error === 0) {
        let responseGrpUsrRolesInst = resgrpusrrolesinstituciones.data._data;
          return this.helper.filterDataXAgencia(responseGrpUsrRolesInst);
      } else {
        swal.fire({
          type: 'error',
          title: 'Consultar',
          text: resgrpusrrolesinstituciones.data._error.descripcion,
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
  private async cargarRoles() {
    return new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico('Api/roles/Consultar'), null)
      .then((resRoles) => {
        if (resRoles.data._error.error === 0) {
          let responseRoles = resRoles.data._data;
          return this.helper.filterDataXAgencia(responseRoles);
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resRoles.data._error.descripcion,
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
  private async cargarGrupoUsers() {
    return new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico('Api/GrpUsuario/Consultar'), null)
      .then((resGruposUsers) => {
        if (resGruposUsers.data._error.error === 0) {
          let responseGruposUsers = resGruposUsers.data._data;
          return this.helper.filterDataXAgencia(responseGruposUsers);
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resGruposUsers.data._error.descripcion,
            showConfirmButton: false,
            timer: 2000,
          });
          throw new Error("No se pudo obtener GrupoUsers");
        }
      })
      .catch((error) => {
        swal.fire({
          type: 'error',
          title: 'Consultar',
          text: 'Error Inesperado ' + error,
          showConfirmButton: false,
          timer: 2000,
        });
        throw new Error("No se pudo obtener GrupoUsers");
      });
  }
  private async cargarUsuarios() {
    return new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico('Api/usuarios/Consultar'), null)
      .then((resUsuarios) => {
        if (resUsuarios.data._error.error === 0) {
          let responseUsuarios = resUsuarios.data._data;
          return this.helper.filterDataXAgencia(responseUsuarios);
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resUsuarios.data._error.descripcion,
            showConfirmButton: false,
            timer: 2000,
          });
          throw new Error("No se pudo obtener Usuarios");
        }
      })
      .catch((error) => {
        swal.fire({
          type: 'error',
          title: 'Consultar',
          text: 'Error Inesperado'+ error,
          showConfirmButton: false,
          timer: 2000,
        });
        throw new Error("No se pudo obtener Usuarios");
      });
  }
  private async cargar_data() {
    // /*eslint no-shadow: 'error'*/
    if (this.$store.state.auth !== true) {
    this.$router.push({ path: '/Login' });
    }

    this.lstUsuarios = await this.cargarUsuarios();
    this.lstGruposUsers = await this.cargarGrupoUsers();
    this.lstGrupos = await this.cargarGrupos();
    this.lstRoles = await this.cargarRoles();
    this.lstgrpusrrolesinstituciones = await this.cargarGrupoUsersRolesInstitucion();
    this.llenarRoles();
  }
  private Insertar(): void {
    this.grpusrrolesinstituciones = new services.clase_grpusrrolesinstituciones();
    this.operacion = 'Insert';
    this.dialog = true;
    this.llenarRoles();
    this.llenarUsuarios();
  }
  private Grabar() {
    if (this.operacion === 'Update') {
      new services.Operaciones()
        .Actualizar(this.WebApiGrpUsrRoles, this.grpusrrolesinstituciones)
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
        .Insertar(this.WebApiGrpUsrRoles, this.grpusrrolesinstituciones)
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
  private Actualizar(data: services.clase_grpusrrolesinstituciones): void {
    this.grpusrrolesinstituciones = data;
    this.operacion = 'Update';
    this.dialog = true;
  }
  private select_fecha(fecha: string) {
    return fecha.substr(0, 10);
  }
  private Eliminar(data: services.clase_grpusrrolesinstituciones): void {
    swal
      .fire({
        title: 'Esta seguro de esta operacion?',
        text: 'Baja de Grupo' + data.idgrpusuariorolinstitucion,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Dar Baja!',
      })
      .then(async (result) => {
        if (result.value) {
          await this.helper.setPromesas('Api/GrpUsrRolesInstituciones', data, 'Eliminar');

          await Promise.all(this.$store.state.lstPromises).then((result) => {
            this.popup.success('Baja', 'La baja se efectuó en Central y Agencia');
            this.cargar_data();
            this.dialog = false;
          }).catch((error) => {
            this.popup.error('Baja', 'Error Inesperado: ' + error);
          });
        }
      });
  }
  //?? CUSTOM METHODS
  private searchGrupoUser(idGrupoUser: number) { //?? en caso de presentar error en data-table, revisar Estado de registros en SP
    
    let GrupoUser = this.lstGruposUsers.filter((grupousr) => {
      // debugger;
      return grupousr.idgrpusuario == idGrupoUser;
    });
    //return GrupoUser[0];

    //Busqueda a Grupo
    let Grupo = this.searchGrupo(GrupoUser[0].idgrupo);
    return Grupo;
  }
  private searchGrupo(idGrupo: number) {
    let Grupo = this.lstGrupos.filter((grupo) => {
      return grupo.idgrupo == idGrupo;
    });
    return Grupo[0].descripcion;
  }
  private searchInstitucionRol(idInstitucionRol: number) { //?? en caso de presentar error en data-table, revisar Estado de registros en SP
    let institucionRol = this.lstRolesInstitucion.filter((rolInstitucion) => {
      return rolInstitucion.idinstitucionrol = idInstitucionRol;
    });
    let rol = this.searchRol(institucionRol[0].idrol);
    return rol;
  }
  private searchRol(idRol: number) {
    let Rol = this.lstRoles.filter((rol) => {      
      return rol.idrol == idRol;
    });
    return Rol[0].descripcion;
  }
  private llenarRoles() {
    this.lstRolesInstitucion = [];
    this.institucionesroles.idinstitucion = this.$store.state.institucionSelected;
    new services.Operaciones()
    .Buscar(this.helper.getWebServiceDinamico('Api/InstitucionesRoles/BuscarXInstitucion'), this.institucionesroles)
    .then((resgrpusrrolesinstituciones:any) => {
        if (resgrpusrrolesinstituciones.data._error.error === 0) {
          let InstitucionesRoles = resgrpusrrolesinstituciones.data._data;
          this.lstRolesInstitucion = InstitucionesRoles;
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resgrpusrrolesinstituciones.data._error.descripcion,
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
  private llenarUsuarios() {
    this.lstGruposUsersInstitucion = [];
    let usersInstitucion = this.lstUsuarios.filter((user) => {
      return user.idinstitucion === this.$store.state.institucion;
    });

    usersInstitucion.forEach((userI) => {
      this.lstGruposUsers.forEach((grupoUser) => {
        if (userI.idusuario == grupoUser.idusuario) {
          this.lstGruposUsersInstitucion.push(grupoUser);
        }
      });
    });
  }
  private removeDuplicates(myArr: any, prop: any) {
    // DISTINCT Array
    return myArr.filter((obj: any, pos: any, arr: any) => {
      return arr.map((mapObj: any) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  private async AsignarRolesUsers() {
    if (this.lstRolesSelected.length > 0 && this.lstGruposSelected.length > 0) {

      this.grpusrrolesinstituciones.idinstitucionrol = this.lstRolesSelected[0].idinstitucionrol;
      this.grpusrrolesinstituciones.id_agencia = this.$store.state.agenciaSelected;
      this.grpusrrolesinstituciones.estado = true;

      // this.lstGruposSelected.forEach(async (grupoUser) => {    //!! No utilizar foreach para asignaciones de atributos dinamicos
        for(let i = 0; i <= this.lstGruposSelected.length; i++){
        this.grpusrrolesinstituciones.idgrpusuario = this.lstGruposSelected[i].idgrpusuario;

        await this.helper.setPromesas('Api/GrpUsrRolesInstituciones', this.grpusrrolesinstituciones, 'Insertar');
    
        await Promise.all(this.$store.state.lstPromises).then((result) => {
          this.popup.success('Insertar', 'La inserción se efectuó en Central y Agencia');
          this.cargar_data();
          this.dialog = false;
        }).catch((error) => {
          this.popup.error('Insertar', 'Error Inesperado: ' + error);
        });
      }

    } else {
      swal.fire({
        type: 'warning',
        title: 'Consultar',
        text: 'Seleccione por lo menos un rol y un grupo a asignar',
        showConfirmButton: false,
        timer: 4000,
      });
    }
  }
}
