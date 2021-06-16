import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment, { isDuration } from 'moment';
import helpers from '@/helper';
import * as popup from '@/popup';



@Component
export default class AdmAplicacionesComponent extends Vue {
  private headers: any[] = [
    // { text: 'IdAplicacion', align: 'left', sortable: true, value: 'idaplicacion', width: '15%' },
    {
      text: 'Nombre',
      align: 'left',
      sortable: false,
      value: 'nombre',
      width: '5%',
    },
    {
      text: 'Descripcion',
      align: 'left',
      sortable: false,
      value: 'descripcion',
      width: '15%',
    },
    {
      text: 'Operaciones',
      align: 'center',
      sortable: false,
      value: 'action',
      width: '5%',
    },
  ];
  private WebApi: string = this.$store.state.server + 'Api/Aplicaciones';
  private WebApiConsultar: string = this.$store.state.server + 'Api/Aplicaciones/Consultar';
  private WebApiBuscar: string = this.$store.state.server + 'Api/Aplicaciones/Buscar';

  private WebApiRolesAplicaciones: string = this.$store.state.server + 'Api/RolesAplicaciones';
  private WebApiRolesAplicacionesBuscar: string = this.$store.state.server + 'Api/RolesAplicaciones/BuscarXRol';

  private aplicaciones = new services.clase_aplicaciones();
  private rolesaplica = new services.clase_rolesaplicaciones();
  private lstaplicaciones: services.clase_aplicaciones[] = [];
  private lstAplicacionesRol: services.clase_aplicaciones[] = [];
  private lstAplicacionesXRol: services.clase_rolesaplicaciones[] = [];
  private buscaraplicaciones = '';
  private dialog = false;
  private operacion = '';
  private validar: boolean = true; //v-Form y en el Boton Grabar
  private validacionNombreArray = [
    //Debe ir en cada camo en propiedad Rules
    (v: any) => !!v || 'El campo es requerido',
    (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
  ];
  private validacionDescripcionArray = [
    (v: any) => !!v || 'El campo es requerido',
    (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
  ];
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
  // @Watch('$store.state.rolSelected')
  // onRolSelected(newVal: boolean) {
  //   debugger;

  //   if (newVal) {
  //     this.searchAplicacion();
  //   }
  // }
  private mounted() {
    this.cargar_data();
  }
  private cargar_data() {
    // /*eslint no-shadow: 'error'*/
    // if (this.$store.state.auth !== true) {
    // this.$router.push({ path: '/Login' });
    // }
    new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico('Api/Aplicaciones/Consultar'), null)
      .then((resaplicaciones) => {
        if (resaplicaciones.data._error.error === 0) {
          let responseAplicaciones = resaplicaciones.data._data;
          this.lstaplicaciones = responseAplicaciones;
          // this.lstaplicaciones = this.helper.filterDataXAgencia(responseAplicaciones);
          this.dialog = false;
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resaplicaciones.data._error.descripcion,
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
    
      // this.searchAplicacion(); //?? Descomentar para desplegar aplicaciones por rol
  }

  private searchAplicacion() {
    let rol = this.$store.state.rolSelected;

    //const params = new URLSearchParams();
    //params.append('idrol', rol.toString());
    this.rolesaplica.idrol = rol;
    new services.Operaciones()
      .Buscar(this.WebApiRolesAplicacionesBuscar, this.rolesaplica)
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
            this.lstaplicaciones.forEach((elemAplicacion: any) => {
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

  private Insertar(): void {
    this.aplicaciones = new services.clase_aplicaciones();
    this.operacion = 'Insert';
    this.dialog = true;
  }
  private async Grabar() {
    if (this.aplicaciones.nombre == null) {
      swal.fire({
        type: 'error',
        title: 'Debe digitar un nombre',
        showConfirmButton: false,
        timer: 2000,
      });

      return;
    }

    if (this.operacion === 'Update') {

      await this.helper.setPromesas('Api/Aplicaciones', this.aplicaciones, 'Actualizar');

      await Promise.all(this.$store.state.lstPromises).then((result) => {
        this.popup.success('Actualizar', 'La modificación se efectuó en Central y Agencia');
        this.cargar_data();
        this.dialog = false;
      }).catch((error) => {
        this.popup.error('Actualizar', 'Error Inesperado: ' + error);
      });
    } else {

      this.aplicaciones.id_agencia = this.$store.state.agenciaSelected;

      await this.helper.setPromesas('Api/Aplicaciones', this.aplicaciones, 'Insertar');

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
  private Actualizar(data: services.clase_aplicaciones): void {
    this.aplicaciones = data;
    this.operacion = 'Update';
    this.dialog = true;
  }
  private select_fecha(fecha: string) {
    return fecha.substr(0, 10);
  }
  private Eliminar(data: services.clase_aplicaciones): void {
    swal
      .fire({
        title: 'Esta seguro de esta operacion?',
        text: 'Eliminacion de Aplicacion  ' + data.nombre,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar!',
      })
      .then((result) => {
        if (result.value) {

            this.helper.setPromesas('Api/Aplicaciones', data, 'Eliminar');

            Promise.all(this.$store.state.lstPromises).then((result) => {
              this.popup.success('Baja', 'La baja se efectuó en Central y Agencia');
              this.cargar_data();
              this.dialog = false;
            }).catch((error) => {
              this.popup.error('Baja', 'Error Inesperado: ' + error);
            });
        }
      });
  }
  private close() {
    this.$store.commit("setPopUpContent", "");
  }
}
