import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as services from "../../../services";
import swal from "sweetalert2";
import moment from "moment";
import crypto from "@/encrypt";
import helpers from "@/components/Helpers/helper";
import * as popup from "@/popup";

@Component
export default class AdmUsuariosComponent extends Vue {
  private headers: any[] = [
    // { text: 'IdUsuario', align: 'left', sortable: true, value: 'idusuario', width: '15%' },
    {
      text: "Nombre de Usuario",
      align: "left",
      sortable: false,
      value: "nombre",
      width: "10%",
    },
    {
      text: "Correo Electrónico",
      align: "left",
      sortable: false,
      value: "email",
      width: "20%",
    },
    // { text:'Password', align: 'left', sortable: false, value: 'password', width: '15%' },
    {
      text: "Fecha de Creación (día/mes/año)",
      align: "left",
      sortable: false,
      value: "fechacreacionFormat",
      width: "15%",
    },
    {
      text: "Usuario de Dominio",
      align: "left",
      sortable: false,
      value: "usrdominioFormat",
      width: "10%",
    },
    {
      text: "Institución",
      align: "left",
      sortable: false,
      value: "idinstitucionFormat",
      width: "15%",
    },
    {
      text: "Agencia",
      align: "left",
      sortable: false,
      value: "id_agenciaFormat",
      width: "15%",
    },
    {
      text: "Operaciones",
      align: "left",
      sortable: false,
      value: "action",
      width: "20%",
    },
  ];
  // tslint:disable-next-line: variable-name
  private menu_fechacreacion: boolean = false;
  private WebApi: string = this.$store.state.server + "Api/Usuarios";
  private WebApiInstituciones: string =
    this.$store.state.server + "Api/Instituciones";
  private WebApiAgencias: string = this.$store.state.server + "Api/Agencias";
  private WebApiAutenticacion: string =
    this.$store.state.server + "Api/Autenticacion";
  private usuarios = new services.clase_usuarios();
  private instituciones = new services.clase_instituciones();
  private lstusuarios: services.clase_usuarios[] = [];
  private lstinstituciones: services.clase_instituciones[] = [];
  private buscarusuarios = "";
  private dialog = false;
  private operacion = "";
  private validacion: boolean = true;
  private show = false;
  private lstagencias: services.clase_agencias[] = [];
  private confirmedPassword: string = "";
  private autenticacion: services.clase_autenticacion = new services.clase_autenticacion();
  private lstAutenticacion: services.clase_autenticacion[] = [];
  private helper: helpers = new helpers();
  private popup = new popup.Swal();

  validacionNombreArray = [
    (v: any) => !!v || "El campo es requerido",
    (v: any) =>
      /^[a-zA-Z ]+(?:-[a-zA-Z ]+)*$/.test(v) ||
      "Formato incorrecto. Solo se permiten letras",
  ];
  validacionEmailArray = [
    (v: any) => !!v || "El campo es requerido",
    (v: any) =>
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        v
      ) || "El correo ingresado es incorrecto ",
  ];
  validacionPasswordArray = [
    (v: any) => !!v || "El campo es requerido",
    (v: any) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$^!¡.,;:_+"()[¨´|°¬`%*?&#/={}])([A-Za-z\d$@$!¡.,%*?&"#/=]|[^ ]){8,15}$/.test(
        v
      ) ||
      "Debe tener un mínimo de 8 dígitos y cumplir un formato como el siguiente: Ejemplo123!",
  ];
  validacionAutocompleteArray = [(v: any) => !!v || "El campo es requerido"];

  get lstUsuariosFormateados() {
    return this.lstusuarios.map((usuario: services.clase_usuarios) => {
      return {
        idusuario: usuario.idusuario,
        nombre: usuario.nombre,
        email: usuario.email,
        fechacreacionFormat: this.FormatDate(usuario.fechacreacion),
        usrdominioFormat: this.FormatBoolean(usuario.usrdominio),
        idinstitucionFormat: this.FormatInstitucion(usuario.idinstitucion),
        id_agenciaFormat: this.FormatearNombreAgencia(usuario.id_agencia),
      };
    });
  }
  private FormatDate(data: any) {
    return moment(data).format("DD/MM/YYYY");
  }
  private FormatDateAndHour(data: any) {
    return moment(data).format("YYYY/MM/DD hh:mm:ss");
  }
  private FormatBoolean(data: any) {
    if (data) {
      return "SI";
    } else {
      return "NO";
    }
  }
  private FormatInstitucion(idinstitucion: any) {
    let data: string = "";
    this.lstinstituciones.forEach(function(value) {
      if (value.idinstitucion === idinstitucion) data = value.descripcion;
    });
    return data;
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
    // this.FormatInstitucion(1);
  }

  private cargar_data() {
    // /*eslint no-shadow: 'error'*/
    // if (this.$store.state.auth !== true) {
    // this.$router.push({ path: '/Login' });
    // }
    new services.Operaciones()
      .Buscar(this.helper.getWebServiceDinamico("Api/Usuarios/Consultar"), null)
      .then((resusuarios) => {
        if (resusuarios.data._error.error === 0) {
          let responseUsuarios = resusuarios.data._data;
          this.lstusuarios = this.helper.filterDataXAgencia(responseUsuarios);
          this.dialog = false;
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resusuarios.data._error.descripcion,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        swal.fire({
          type: "error",
          title: "Consultar",
          text: "Error Inesperado",
          showConfirmButton: false,
          timer: 2000,
        });
      });

    this.Cargar_Instituciones();
    this.CargarAgencias();
    this.CargarAutenticacion();
  }
  private Insertar(): void {
    this.usuarios = new services.clase_usuarios();
    this.usuarios.fechacreacion = this.FormatDateAndHour(Date.now());
    this.operacion = "Insert";
    this.dialog = true;
  }
  private Grabar() {
    if (this.usuarios.nombre == undefined) {
      swal.fire({
        type: "error",
        title: "Debe colocar un Nombre de Usuario",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (this.autenticacion.password == undefined) {
      swal.fire({
        type: "error",
        title: "Debe colocar un Password",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (this.confirmedPassword != this.autenticacion.password) {
      swal.fire({
        type: "error",
        title: "Las contraseñas no coinciden",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (this.usuarios.email == undefined) {
      swal.fire({
        type: "error",
        title: "Debe colocar un Correo Electrónico",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (!(this.usuarios.idinstitucion >= 0)) {
      swal.fire({
        type: "error",
        title: "Debe elegir una Institución",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    let idAuth = this.getIDAutenticacion();
    //** Data Usuario */
    this.usuarios.idautenticacion = ++idAuth;
    this.usuarios.id_agencia = this.$store.state.agenciaSelected.toString();
    //** Data Autenticacion */
    let objcrypt = new crypto();
    this.autenticacion.idautenticacion = this.usuarios.idautenticacion;
    this.autenticacion.usuario = objcrypt.EncryptAES(
      this.autenticacion.usuario
    );
    this.autenticacion.password = objcrypt.EncryptAES(
      this.autenticacion.password
    );
    this.autenticacion.fechaultimasesioniniciada = this.FormatDateAndHour(
      moment()
    );
    this.autenticacion.fechaultimasesioncerrada = this.FormatDateAndHour(
      moment()
    );
    this.autenticacion.sesioniniciada = false;
    this.autenticacion.estado = true;

    if (this.operacion === "Update") {
      this.actualizarAutenticacion();
    } else {
      this.insertarAutenticacion();
    }
  }
  private Cancelar() {
    this.cargar_data();
    this.dialog = false;
  }
  private Actualizar(data: services.clase_usuarios): void {
    this.usuarios = data;
    this.usuarios.fechacreacion = this.FormatDateAndHour(Date.now());
    this.operacion = "Update";
    this.dialog = true;
  }
  private Cargar_Instituciones() {
    new services.Operaciones()
      .Buscar(this.WebApiInstituciones + "/Consultar", null)
      .then((resusuarios) => {
        if (resusuarios.data._error.error === 0) {
          this.lstinstituciones = resusuarios.data._data;
          this.dialog = false;
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resusuarios.data._error.descripcion,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        swal.fire({
          type: "error",
          title: "Consultar",
          text: "Error Inesperado",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  }
  private select_fecha(fecha: string) {
    return fecha.substr(0, 10);
  }
  private Eliminar(data: services.clase_usuarios): void {
    swal
      .fire({
        title: "Esta seguro de esta operacion?",
        text: "Eliminacion del usuario   " + data.nombre,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "red",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar!",
      })
      .then((result) => {
        if (result.value) {
          new services.Operaciones()
            .Eliminar(this.WebApi, data)
            // tslint:disable-next-line: no-shadowed-variable
            .then((result) => {
              if (result.data.error === 0) {
                swal.fire({
                  type: "success",
                  title: "Eliminar",
                  text: result.data.descripcion,
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.cargar_data();
              } else {
                swal.fire({
                  type: "error",
                  title: "Eliminar",
                  text: result.data.descripcion,
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            })
            .catch((error) => {
              swal.fire({
                type: "error",
                title: "Eliminar",
                text: "Error Inesperado",
                showConfirmButton: false,
                timer: 2000,
              });
            });
        }
      });
  }

  private CargarAgencias() {
    new services.Operaciones()
      .Consultar(this.WebApiAgencias)
      .then((resAgencias) => {
        if (resAgencias.data._error.error === 0) {
          this.lstagencias = resAgencias.data._data;
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resAgencias.data._error.descripcion,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        swal.fire({
          type: "error",
          title: "Consultar",
          text: "Error Inesperado",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  }

  private getIDAutenticacion() {
    //** Get de numero mayor de array de objetos */
    let idUltimoReg = Math.max.apply(
      Math,
      this.lstAutenticacion.map((auth) => {
        return auth.idautenticacion;
      })
    );
    return idUltimoReg;
    //!! Debe haber por lo menos un registro en Autenticacion
  }

  private CargarAutenticacion() {
    new services.Operaciones()
      .Buscar(this.WebApiAutenticacion + "/Consultar", null)
      .then((resAutenticacion) => {
        if (resAutenticacion.data._error.error === 0) {
          this.lstAutenticacion = resAutenticacion.data._data;
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resAutenticacion.data._error.descripcion,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        swal.fire({
          type: "error",
          title: "Consultar",
          text: "Error Inesperado: " + error,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  }

  private async insertarUsuario() {
    // new services.Operaciones()
    //     .Insertar(this.WebApi, this.usuarios)
    //     .then((result) => {
    //       if (result.data.error === 0) {
    //         swal.fire({
    //           type: 'success',
    //           title: 'Insertar',
    //           text: result.data.descripcion,
    //           showConfirmButton: false,
    //           timer: 2000,
    //         });
    //         this.cargar_data();
    //         this.dialog = false;
    //       } else {
    //         swal.fire({
    //           type: 'error',
    //           title: 'Insertar',
    //           text: result.data.descripcion,
    //           showConfirmButton: false,
    //           timer: 2000,
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       swal.fire({
    //         title: 'Insertar',
    //         text: 'Error Inesperado',
    //         showConfirmButton: false,
    //         timer: 2000,
    //       });
    //     });

    await this.helper.setPromesas(
      "Api/Usuarios",
      this.usuarios,
      "Insertar",
      "idusuario"
    );

    await Promise.all(this.$store.state.lstPromises)
      .then((result) => {
        this.popup.success(
          "Insertar",
          "La inserción se efectuó en Central y Agencia"
        );
        this.cargar_data();
        this.clearCampos();
        this.dialog = false;
      })
      .catch((error) => {
        this.popup.error("Insertar", "Error Inesperado: " + error);
      });
  }

  private ActualizarUsuario() {
    new services.Operaciones()
      .Actualizar(this.WebApi, this.usuarios)
      .then((result) => {
        if (result.data.error === 0) {
          swal.fire({
            type: "success",
            title: "Actualizar",
            text: result.data.descripcion,
            showConfirmButton: false,
            timer: 2000,
          });
          this.cargar_data();
          this.dialog = false;
        } else {
          swal.fire({
            type: "error",
            title: "Actualizar",
            text: result.data.descripcion,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        swal.fire({
          type: "error",
          title: "Actualizar",
          text: "Error Inesperado",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  }

  private async insertarAutenticacion() {
    // new services.Operaciones()
    //   .Insertar(this.WebApiAutenticacion, this.autenticacion)
    //   .then((result) => {
    //     if (result.data.error === 0) {
    //       console.log('Autenticacion registrada correctamente');
    //       this.insertarUsuario();
    //     } else {
    //       console.log('Fallo al registrar la autenticacion');
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('Fallo al registrar la autenticacion' + error);
    //   });

    await this.helper.setPromesas(
      "Api/Autenticacion",
      this.autenticacion,
      "Insertar",
      "idautenticacion"
    );

    await Promise.all(this.$store.state.lstPromises)
      .then((result) => {
        console.log(
          "Autenticacion registrada correctamente en Central y Agencia"
        );
        this.insertarUsuario();
      })
      .catch((error) => {
        console.log("Fallo al registrar la autenticacion" + error);
      });
  }

  private actualizarAutenticacion() {
    new services.Operaciones()
      .Actualizar(this.WebApiAutenticacion, this.autenticacion)
      .then((result) => {
        if (result.data.error === 0) {
          console.log("Autenticacion Actualizada correctamente");
          this.ActualizarUsuario();
        } else {
          console.log("Fallo al actualizar la autenticacion");
        }
      })
      .catch((error) => {
        console.log("Fallo al actualizar la autenticacion" + error);
      });
  }

  private FormatearNombreAgencia(id_agencia: Number) {
    let nombreAgencia: string = "";
    this.lstagencias.forEach(function(value) {
      if (value.id_agencia == id_agencia) {
        nombreAgencia = value.nombre;
      }
    });
    return nombreAgencia;
  }

  private close() {
    this.$store.commit("setPopUpContent", "");
  }

  private clearCampos() {
    this.confirmedPassword = "";
    this.usuarios = new services.clase_usuarios();
    this.autenticacion = new services.clase_autenticacion();
  }
}
