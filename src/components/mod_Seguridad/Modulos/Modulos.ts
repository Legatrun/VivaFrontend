import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as services from "@/services";
import swal from "sweetalert2";
import moment from "moment";
import helpers from "@/helper";
import * as popup from "@/popup";
import { parse } from "vuetify/src/services/theme/utils";

@Component
export default class AdmModulosComponent extends Vue {
  private headers: any[] = [
    // { text: 'IdModulo', align: 'left', sortable: true, value: 'idmodulo', width: '15%' },
    {
      text: "Descripcion",
      align: "left",
      sortable: false,
      value: "moduloDesc",
      width: "15%",
    },
    {
      text: "Operaciones",
      align: "center",
      sortable: false,
      value: "action",
      width: "1%",
    },
  ];
  private lstModulosLlenados: {
    idaplicacionesopmodulos: number;
    idoperacion: number;
    idmodulo: number;
    operacionDesc: string;
    moduloDesc: string;
    activo: boolean;
    estado: boolean;
  }[] = [];
  private lstAppOperacionModulosFilled: {
    idaplicacionesopmodulos: number;
    idoperacion: number;
    idmodulo: number;
    operacionDesc: string;
    moduloDesc: string;
    activo: boolean;
    estado: boolean;
  }[] = [];
  private WebApi: string = this.$store.state.server + "Api/Modulos";
  private WebApiConsultar: string = this.$store.state.server + "Api/Modulos/Consultar";
  private WebApiBuscar: string =
    this.$store.state.server + "Api/Modulos/Buscar";
  private WebApiAplicacionesOpModulos: string =
    this.$store.state.server + "Api/AplicacionesOpModulos";
  private modulos = new services.clase_modulos();
  private AppOpModulo = new services.clase_aplicacionesopmodulos();
  private rolAplicacion = new services.clase_rolesaplicaciones();
  private lstAppOpmodulos: services.clase_aplicacionesopmodulos[] = [];
  private lstAppOpmodulosRaw: services.clase_aplicacionesopmodulos[] = [];
  private lstModulos: services.clase_modulos[] = [];
  private lstRoles: services.clase_modulos[] = [];
  private buscarmodulos = "";
  private dialog = false;
  private operacion = "";
  //esta variable debe ponerse en el archivo modulos.vue en el componente v-for
  // y boton guardar
  private validar: boolean = true;
  //esta variale se debe colocar en cada campo del formulario.vue que sera validado
  private validacionNombreArray = [
    (v: any) => !!v || "El campo es requerido",
    (v: any) => !/^\s*$/.test(v) || "No se permite espacios vacios",
  ];
  private helper: helpers = new helpers();
  private popup = new popup.Swal();

  // ?? COMPUTED PROPS
  get ModulosFormat() {
    let modulosFormatted = this.lstAppOpmodulos.map((appOpModulo) => {
      return {
        moduloDesc: this.setModuloDesc(appOpModulo.idmodulo),
        ...appOpModulo,
      };
    });
    return modulosFormatted;
  }
  private FormatDate(data: any) {
    return moment(data).format("YYYY-MM-DD");
  }
  private FormatBoolean(data: any) {
    if (data) {
      return "SI";
    } else {
      return "NO";
    }
  }
  private updateText(Value: string) {
    if (Value !== null) {
      return Value.toUpperCase();
    } else {
      return Value;
    }
  }
  private async cargarOperaciones() {
    return new services.Operaciones()
      .Buscar(
        this.helper.getWebServiceDinamico("Api/Operaciones/Consultar"),
        null
      )
      .then((resOperaciones) => {
        if (resOperaciones.data._error.error === 0) {
          let responseOperaciones = resOperaciones.data._data;
          return this.helper.filterDataXAgencia(responseOperaciones);
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resOperaciones.data._error.descripcion,
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
  private mounted() {
    this.cargar_data();
  }
  private async cargar_data() {
    // /*eslint no-shadow: 'error'*/
    if (this.$store.state.auth !== true) {
      this.$router.push({ path: "/Login" });
    }

    new services.Operaciones()
      .Buscar(this.WebApiConsultar, null)
      .then((resmodulos) => {
        if (resmodulos.data._error.error === 0) {
          this.lstModulos = resmodulos.data._data;
          this.dialog = false;
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resmodulos.data._error.descripcion,
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

    // this.filterModulosXAplicacion();
    // this.cargarRolAplicacion();



    // this.lstRoles = await this.cargarRoles();
  }
  private Insertar(): void {
    this.modulos = new services.clase_modulos();
    this.operacion = "Insert";
    this.dialog = true;
  }
  private async Grabar() {
    if (this.modulos.descripcion == null) {
      swal.fire({
        type: "error",
        title: "Registrar",
        text: "Debe digitar una descripcion",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (this.operacion === "Update") {
      this.transaccionModulo("Actualizar")
        .then((resultMod) => {
          if (resultMod) {
            this.popup.success(
              "Actualizar",
              "El módulo se actualizó correctamente"
            );
            this.dialog = false;
          } else {
            this.popup.error("Actualizar", "Error al actualizar módulo");
          }
        })
        .catch((error) => {
          this.popup.error(
            "Actualizar",
            "Error al actualizar módulo: " + error
          );
        });
    } else {
      //** Mayor ejemplo de Promesas hasta el momento (Ejecucion de promesas anidadas) */

      this.transaccionModulo("Insertar")
        .then(async (resultMod) => {
          //TODO: Semi-CallbackHell, refactorizar
          if (resultMod) {
            await this.transaccionAplicacionOpModulo("Insertar")
              .then((resultAppOpMod) => {
                if (resultAppOpMod) {
                  this.popup.success(
                    "Registrar",
                    "Registro de Módulo y Operaciones Satisfactoria"
                  );
                  this.dialog = false;
                } else {
                  this.popup.error("Error", "Fallo al registrar Operaciones");
                }
              })
              .catch(() => {
                this.popup.error("Error", "Fallo al registrar Operaciones");
              });
          } else {
            this.popup.error("Error", "Fallo al registrar Módulo");
          }
        })
        .catch(() => {
          this.popup.error("Error", "Fallo al registrar Módulo");
        });
      //******** */
      //!! WorkAround con PromiseAll, no respeta secuencia de promesas en array
      // let promesasRegistro: Promise<void>[] = [];
      // promesasRegistro.push(this.grabarModulo());
      // promesasRegistro.push(this.grabarRolAplicacion());
      // promesasRegistro.push(this.grabarAplicacionOpModulo());
      // await Promise.all(promesasRegistro).then((result) => {
      //   if (result) {
      //     console.log('Modulo y Operaciones registradas correctamente en Central y Agencia');
      //     this.popup.success('Insertar', 'Módulo y Operaciones registradas correctamente en Central y Agencia');
      //   }
      // }).catch((error) => {
      //   this.popup.success('Insertar', 'Módulo y Operaciones registradas correctamente en Central y Agencia');
      //   console.log('Fallo al registrar Módulo y Operaciones: ' + error);
      // });

      // let PromesasSecuenciales = async () => {
      //   for (let i = 0; i < promesasRegistro.length; i++) {
      //     const element = await promesasRegistro[i]();
      //   }
      // }
      //!!!!!!!!!!/
    }
  }

  private async transaccionModulo(tipo: string) {
    // this.modulos.id_agencia = this.$store.state.agenciaSelected;
    this.modulos.estado = true;

    await this.helper.setPromesas(
      "Api/Modulos",
      this.modulos,
      tipo
    );

    let successPromise: boolean = false;
    await Promise.all(this.$store.state.lstPromises)
      .then((result) => {
        if (tipo == "Insertar") {
          console.log("Modulo registrado correctamente en Central y Agencia");
        } else if (tipo == "Actualizar") {
          console.log("Modulo modificado correctamente en Central y Agencia");
        } else if (tipo == "Eliminar") {
          console.log("Modulo dado de baja correctamente en Central y Agencia");
        }

        this.AppOpModulo.idmodulo = parseInt(
          this.$store.state.centralIDresponse
        ); //?? Obtención de idModulo
        successPromise = true;
      })
      .catch((error) => {
        console.error("Fallo al en transaccion Módulo" + error);
        successPromise = false;
      });
    return successPromise;
  }

  private cargarRolAplicacion() {
    let rolesaplicaciones = new services.clase_rolesaplicaciones();
    rolesaplicaciones.idrol = this.$store.state.rolSelected;
    new services.Operaciones()
      .Buscar(
        this.helper.getWebServiceDinamico("Api/RolesAplicaciones/BuscarXRol"),
        rolesaplicaciones
      )
      .then((resRolAplicacion) => {
        if (resRolAplicacion.data._error.error === 0) {
          let responseRolApp = resRolAplicacion.data._data;
          let lstRolAppXRol = this.helper.filterDataXAgencia(responseRolApp);
          this.AppOpModulo.idrolesaplicaciones = lstRolAppXRol.filter(
            (RolApp: any) => {
              return (
                RolApp.idaplicacion == this.$store.state.aplicacionSelected
              );
            }
          )[0].idrolesaplicaciones;
        } else {
          console.error("Error al obtener RolAplicacion");
        }
      })
      .catch((error) => {
        console.error("Error al obtener RolAplicacion: " + error);
      });
  }

  private async transaccionAplicacionOpModulo(tipo: string) {
    this.AppOpModulo.activo = true;
    this.AppOpModulo.estado = true;
    // this.AppOpModulo.id_agencia = this.$store.state.agenciaSelected;
    let successPromise: boolean = false;

    let lstOperaciones = await this.cargarOperaciones();
    for (let i = 0; i <= lstOperaciones.length; i++) {
      this.AppOpModulo.idoperacion = lstOperaciones[i].idoperacion;
      //!! Verificar Retorno de IDs !!

      await this.helper.setPromesas(
        "Api/AplicacionesOpModulos",
        this.AppOpModulo,
        tipo
      );

      await Promise.all(this.$store.state.lstPromises)
        .then((result) => {
          //!! Verificar razon por la que registra lectura !!

          if (tipo == "Insertar") {
            console.log(
              "AplicacionOpModulo " +
                lstOperaciones[i].descripcion +
                "  registrado correctamente en Central y Agencia"
            );
          } else if (tipo == "Eliminar") {
            console.log(
              "AplicacionOpModulo " +
                lstOperaciones[i].descripcion +
                "  dado de baja correctamente en Central y Agencia"
            );
          }
          successPromise = true;
        })
        .catch((error) => {
          console.error(
            "Fallo en transacción AplicacionOpModulo:" +
              lstOperaciones[i].descripcion +
              " " +
              error
          );
          successPromise = false;
        });
      this.dialog = false;
    }

    return successPromise;
  }

  private Cancelar() {
    this.cargar_data();
    this.dialog = false;
  }
  private Actualizar(data: any): void {
    this.modulos.descripcion = data.moduloDesc;
    this.modulos.idmodulo = data.idmodulo;
    this.operacion = "Update";
    this.dialog = true;
  }
  private select_fecha(fecha: string) {
    return fecha.substr(0, 10);
  }
  private Eliminar(data: services.clase_aplicacionesopmodulos): void {
    swal
      .fire({
        title: "Esta seguro de esta operacion?",
        text: "Baja del modulo y Operaciones",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "red",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar!",
      })
      .then(async (result) => {
        if (result.value) {
          this.AppOpModulo.idaplicacionesopmodulos =
            data.idaplicacionesopmodulos;
          await this.transaccionAplicacionOpModulo("Eliminar")
            .then((resultAppOpMod) => {
              if (resultAppOpMod) {
                console.log("AppOpModulo dado de baja correctamente");
              } else {
                console.error("Error al dar de baja AppOpModulo");
              }
            })
            .catch(() => {
              console.error("Error al dar de baja AppOpModulo");
            });

          await this.transaccionModulo("Eliminar")
            .then((resultMod) => {
              if (resultMod) {
                this.popup.success(
                  "Eliminar",
                  "El módulo se dió de baja correctamente"
                );
              } else {
                this.popup.error("Eliminar", "Error al dar de baja módulo");
              }
            })
            .catch((error) => {
              this.popup.error(
                "Eliminar",
                "Error al dar de baja  módulo y Operaciones: " + error
              );
            });
          this.AppOpModulo = new services.clase_aplicacionesopmodulos();
          this.cargar_data();
          this.dialog = false;
        }
      });
  }

  private filterModulosXAplicacion() {
    let idapp = this.$store.state.aplicacionSelected;
    const params = new URLSearchParams();
    params.append("idaplicacion", idapp);
    new services.Operaciones()
      .Buscar(
        this.helper.getWebServiceDinamico(
          "Api/AplicacionesOpModulos/BuscarXAplicacion?" + params
        ),
        null
      )
      .then((resmodulos) => {
        if (resmodulos.data._error.error === 0) {
          let responseModulos = resmodulos.data._data;
          this.lstAppOpmodulosRaw = responseModulos;
          this.lstAppOpmodulos = this.removeDuplicates(
            responseModulos,
            "idmodulo"
          );
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resmodulos.data._error.descripcion,
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

  private setModuloDesc(idModulo: Number) {
    let modulo = this.lstModulos.filter((modulo) => {
      return modulo.idmodulo === idModulo;
    });
    return modulo[0].descripcion;
  }

  private removeDuplicates(myArr: any, prop: any) {
    // DISTINCT Array
    return myArr.filter((obj: any, pos: any, arr: any) => {
      return arr.map((mapObj: any) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  private close() {
    this.$store.commit("setPopUpContent", "");
  }
}
