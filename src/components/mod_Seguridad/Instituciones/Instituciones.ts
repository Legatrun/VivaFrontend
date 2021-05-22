import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import popUpContent from '../PopUpContent.vue'
// import grupoUser from '../GrpUsuario/GrpUsuario';
// import institucionesRoles from '../InstitucionesRoles/InstitucionesRoles';
// import grpssrroles from '../GrpUsrRolesInstituciones/GrpUsrRolesInstituciones';

@Component({
  components: {
    // grupoUser,
    // institucionesRoles,
    // grpssrroles,
    popUpContent
  },
})
export default class AdmInstitucionesComponent extends Vue {
  private headers: any[] = [
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
  private WebApiInstituciones: string =
    this.$store.state.server + 'Api/Instituciones';
    private WebApiInstitucionesConsultar: string = this.$store.state.server + 'Api/Instituciones/Consultar';
    private WebApiInstitucionesBuscar: string = this.$store.state.server + 'Api/Instituciones/Buscar';

  private instituciones = new services.clase_instituciones();
  private lstinstituciones: services.clase_instituciones[] = [];
  private buscarinstituciones = '';
  private dialog = false;
  private operacion = '';
  private tituloComponent = '';
  private contenidoComponente = '';
  // ?? CUSTOM VARS
  private institucionSel: number = 0;
  // ?? FORMAT
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
  // ?? MAIN METHODS
  private mounted() {
    this.cargar_data();
  }
  private cargar_data() {
    // /*eslint no-shadow: 'error'*/
    if (this.$store.state.auth !== true) {
      this.$router.push({ path: '/Login' });
    }
    new services.Operaciones()
      .Buscar(this.WebApiInstitucionesConsultar, null)
      .then((resinstituciones) => {
        if (resinstituciones.data._error.error === 0) {
          this.lstinstituciones = resinstituciones.data._data;
          this.dialog = false;
        } else {
          swal.fire({
            type: 'error',
            title: 'Consultar',
            text: resinstituciones.data._error.descripcion,
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
    this.instituciones = new services.clase_instituciones();
    this.operacion = 'Insert';
    this.dialog = true;
  }
  private Grabar() {
    if (this.operacion === 'Update') {
      new services.Operaciones()
        .Actualizar(this.WebApiInstituciones, this.instituciones)
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
        .Insertar(this.WebApiInstituciones, this.instituciones)
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
  private Actualizar(data: services.clase_instituciones): void {
    this.instituciones = data;
    this.operacion = 'Update';
    this.dialog = true;
  }
  private select_fecha(fecha: string) {
    return fecha.substr(0, 10);
  }
  private Eliminar(data: services.clase_instituciones): void {
    swal
      .fire({
        title: 'Esta seguro de esta operacion?',
        text: 'Eliminacion de Registro' + data.idinstitucion,
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
            .Eliminar(this.WebApiInstituciones, data)
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
  // ?? DIALOG METHODS
  private showDialog(idInstitucion: number, titleComponent: string, component: string) {
    this.tituloComponent = titleComponent;
    this.contenidoComponente = component;
    this.$store.commit('selectInstitucion', idInstitucion);
    this.$store.commit('switchPopUpContentDialog');
    // if (component === 'InstitucionRoles') {
    //   this.$store.commit('switch_InstitucionDialogInstitucionRoles');
    // } else if (component === 'GrupoUser') {
    //   this.$store.commit('switch_InstitucionDialogGrupo');
    // } else if (component === 'GrpUsrRoles') {
    //   this.$store.commit('switch_InstitucionDialogGrpUsrRoles');
    // }
  }
}
