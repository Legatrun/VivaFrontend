import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import * as popup from '@/popup';
import moment from 'moment';

@Component
export default class AdmRolesAplicacionesComponent extends Vue {
  private headers: any[] = [
   // {
     // text: 'IDRolesAplicaciones',
      //align: 'left',
      //sortable: true,
      //value: 'idrolesaplicaciones',
      //width: '15%',
    //},
    {
      text: 'Rol',
      align: 'left',
      sortable: false,
      value: 'idrol',
      width: '15%',
    },
    {
      text: 'Aplicación',
      align: 'left',
      sortable: false,
      value: 'idaplicacion',
      width: '15%',
    },
    {
      text: 'Operaciones',
      align: 'center',
      sortable: false,
      value: 'action',
      width: '20%',
    },
  ];
  private WebApi: string = this.$store.state.server + 'Api/RolesAplicaciones';
  private WebApiConsultar: string = this.$store.state.server + 'Api/RolesAplicaciones/Consultar';
  private WebApiBuscar: string = this.$store.state.server + 'Api/RolesAplicaciones/Buscar';

  private WebApiRolesConsultar: string = this.$store.state.server + 'Api/Roles/Consultar';
  private WebApiAplicacionesConsultar: string = this.$store.state.server + 'Api/Aplicaciones/Consultar';

  private rolesaplicaciones = new services.clase_rolesaplicaciones();
  private lstrolesaplicaciones: services.clase_rolesaplicaciones[] = [];
  private rules = new services.clase_roles();
  private lstrules: services.clase_roles[] = [];
  private aplicaciones = new services.clase_aplicaciones();
  private lstaplicaciones: services.clase_aplicaciones[] = [];
  private buscarrolesaplicaciones = '';
  private dialog = false;
  private operacion = '';
  private activa =  false;
  private popup = new popup.Swal();
  validacion = [
		(v: any) => !!v || "El campo es requerido"
		
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
  private mounted() {
    this.cargar_data();
    this.CargarRoles();
    this.CargarAplicaciones();
  }
  private cargar_data() {
    // /*eslint no-shadow: 'error'*/
    // if (this.$store.state.auth !== true) {
    // this.$router.push({ path: '/Login' });
    // }
    new services.Operaciones()
      .Consultar(this.WebApiConsultar)
      .then((resrolesaplicaciones) => {
        if (resrolesaplicaciones.data._error.error === 0) {
          this.lstrolesaplicaciones = resrolesaplicaciones.data._data;
          this.dialog = false;
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resrolesaplicaciones.data._error.descripcion,
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
    this.rolesaplicaciones = new services.clase_rolesaplicaciones();
    this.operacion = 'Insert';
    this.dialog = true;
  }
  private Grabar() {
    if (this.operacion === 'Update') {
      new services.Operaciones()
        .Actualizar(this.WebApi, this.rolesaplicaciones)
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
        .Insertar(this.WebApi, this.rolesaplicaciones)
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
  private Actualizar(data: services.clase_rolesaplicaciones): void {
    this.rolesaplicaciones = data;
    this.operacion = 'Update';
    this.dialog = true;
  }
  private select_fecha(fecha: string) {
    return fecha.substr(0, 10);
  }
  private Eliminar(data: services.clase_rolesaplicaciones): void {
    swal
      .fire({
        title: 'Esta seguro de esta operacion?',
        text: 'Eliminacion de Registro' + data.idrolesaplicaciones,
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
  private CargarRoles(){
    new services.Operaciones().Consultar(this.WebApiRolesConsultar)
			.then((reslocations) => {
				if (reslocations.data._error.error === 0) {
					this.lstrules = reslocations.data._data;
				} else {
					this.popup.error('Consultar', reslocations.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
  }
  private CargarAplicaciones(){
    new services.Operaciones().Consultar(this.WebApiAplicacionesConsultar)
			.then((reslocations) => {
				if (reslocations.data._error.error === 0) {
					this.lstaplicaciones = reslocations.data._data;
				} else {
					this.popup.error('Consultar', reslocations.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
  }
  private FormatRol(idrol: any):string {
		var nombreRol = "";
		this.lstrules.forEach(function(value) {
		  if (value.idrol == idrol) {
        nombreRol = value.descripcion;
		  }
		});
		return nombreRol;
	}
  private FormatAplicacion(idaplicacion: any):string {
		var nombreAplicacion = "";
		this.lstaplicaciones.forEach(function(value) {
		  if (value.idaplicacion == idaplicacion) {
        nombreAplicacion = value.nombre;
		  }
		});
		return nombreAplicacion;
	}
}
