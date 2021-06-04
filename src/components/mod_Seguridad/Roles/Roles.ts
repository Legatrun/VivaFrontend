import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import helpers from '@/helper';
import * as popup from '@/popup';


@Component
export default class AdmRolesComponent extends Vue {
  private headers: any[] = [
    //{ text: 'Id_Rol', align: 'left', sortable: true, value: 'idrol', width: '15%' },
    //{ text: 'Descripcion', aligen: 'left', sortable: true, value: 'descripcion', width: '15%'},
    //{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
    {
      text: 'Descripcion',
      align: 'left',
      sortable: false,
      value: 'descripcion',
      width: '70%',
    },
    {
      text: 'Operaciones',
      align: 'left',
      sortable: false,
      value: 'action',
      width: '30%',
    },
  ];

  private WebApiInstitucionesRoles: string = this.$store.state.server + 'Api/institucionesRoles';
  private WebApiInstitucionesRolesBuscar: string = this.$store.state.server + 'Api/institucionesRoles/buscar';
  private WebApiRoles: string = this.$store.state.server + 'Api/Roles';
  private WebApiRolesConsultar: string = this.$store.state.server + 'Api/Roles/Consultar';
  private WebApiRolesBuscar: string = this.$store.state.server + 'Api/Roles/buscar';
  private WebApiRolesAplicaciones: string =
    this.$store.state.server + 'Api/RolesAplicaciones';
  private WebApiAplicaciones: string =
    this.$store.state.server + 'Api/Aplicaciones';

  private roles = new services.clase_roles();
  private lstInstitucionesRoles: services.clase_institucionesroles[] = [];
  private buscarroles = '';
  private dialog = false;
  private lstAplicaciones: services.clase_aplicaciones[] = [];
  private lstAplicacionesRol: services.clase_aplicaciones[] = [];
  private lstAplicacionesXRol: services.clase_rolesaplicaciones[] = [];
  private operacion = '';
  private helper:helpers = new helpers();
	private popup = new popup.Swal();
  private activa = false;

  private lstroles: services.clase_roles[] = [];

	RulLetras = [
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => !(!/^[a-z A-Z 0-9ñÑáéíóú]*$/.test(v)) || "No se permiten caracteres especiales",
	];
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
  @Watch('$store.state.institucionSelected')
  onInstitucionSelected(newVal: boolean) {
      this.getRolesByInstitucion();
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
      .Buscar(this.helper.getWebServiceDinamico('Api/Roles/Consultar'), null)
      .then((resroles) => {
        if (resroles.data._error.error === 0) {
          this.lstroles = resroles.data._data;
          this.dialog = false;
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resroles.data._error.descripcion,
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

      // this.getRolesByInstitucion(); //?? En caso de búsqueda por institucion
  }

  private searchAplicacion() {
    let rol = this.$store.state.rolSelected;
    const params = new URLSearchParams();
    params.append('idrol', rol.toString());
    new services.Operaciones()
      .Consultar(this.WebApiRolesAplicaciones + '?' + params)
      .then((resaplicacionesrol) => {
        if (resaplicacionesrol.data._error.error === 0) {
          this.lstAplicacionesRol = [];
          let responseAplicacionesRol = resaplicacionesrol.data._data;
          this.lstAplicacionesXRol = responseAplicacionesRol;
          let aplicacionesXRol = responseAplicacionesRol.filter(
            (aplicacion: any) => {
              return aplicacion.idrol == rol;
            }
          );
          //console.log(aplicacionesXRol);
          aplicacionesXRol.forEach((elemAplicacionRol: any) => {
            this.lstAplicaciones.forEach((elemAplicacion: any) => {
              if (
                elemAplicacionRol.idaplicacion === elemAplicacion.idaplicacion
              ) {
                this.lstAplicacionesRol.push(elemAplicacion);
              }
            });
          });
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resaplicacionesrol.data._error.descripcion,
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

  private getRolesByInstitucion () {
    this.lstInstitucionesRoles = [];
    // const paramsInstitucionRol = new URLSearchParams();
    // paramsInstitucionRol.append('idinstitucion', this.$store.state.institucionSelected);
    let auxinstitucion: services.clase_instituciones = new services.clase_instituciones();
    auxinstitucion.idinstitucion = this.$store.state.institucionSelected;
    new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico('Api/institucionesRoles/BuscarXInstitucion'), auxinstitucion)
      .then((resroles) => {
        if (resroles.data._error.error === 0) {
          this.lstInstitucionesRoles = resroles.data._data;
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resroles.data._error.descripcion,
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
    this.roles = new services.clase_roles();
    this.operacion = 'Insert';
    this.dialog = true;
  }
  private async Grabar() {
    if (this.operacion === 'Update') {
      
      await this.helper.setPromesas('Api/Roles', this.roles, 'Actualizar', 'idrol');

      await Promise.all(this.$store.state.lstPromises).then((result) => {
        this.popup.success('Actualizar', 'La actualización se efectuó en Central y Agencia');
        this.cargar_data();
        this.dialog = false;
      }).catch((error) => {
        this.popup.error('Actualizar', 'Error Inesperado: ' + error);
      });

    } else {

      this.roles.id_agencia = this.$store.state.agenciaSelected;

      await this.helper.setPromesas('Api/Roles', this.roles, 'Insertar', 'idrol');

      await Promise.all(this.$store.state.lstPromises).then((result) => {
        this.popup.success('Insertar', 'La inserción se efectuó en Central y Agencia');
        this.lstroles = [];
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
  private Actualizar(data: services.clase_roles): void {
    this.roles = data;
    this.operacion = 'Update';
    this.dialog = true;
  }
  private select_fecha(fecha: string) {
    return fecha.substr(0, 10);
  }
  private Eliminar(data: services.clase_roles): void {
    swal
      .fire({
        title: 'Esta seguro de esta operacion?',
        text: 'Eliminacion de Registro ' + data.descripcion,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar!',
      })
      .then(async (result) => {
        if (result.value) {
          await this.helper.setPromesas('Api/Roles', data, 'Eliminar', 'idrol');

          await Promise.all(this.$store.state.lstPromises).then((result) => {
            this.popup.success('Baja', 'La baja se efectuó en Central y Agencia');
            this.lstroles = [];
            this.cargar_data();
            this.dialog = false;
          }).catch((error) => {
            this.popup.error('Baja', 'Error Inesperado: ' + error);
          });
        }
      });
  }
  //?? CUSTOM METHODS
  private searchRol(paramIdRol: number) {
    let rolFound = this.lstroles.filter((rol) => {
      return paramIdRol === rol.idrol;
    });
    return rolFound[0].descripcion;
  }
  private close() {
    this.$store.commit("setPopUpContent", "");
  }
}
