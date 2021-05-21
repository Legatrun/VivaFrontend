import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import * as services from "@/services";
import swal from "sweetalert2";
import moment from "moment";
import roles from "../Roles/Roles";
import aplicaciones from "../Aplicaciones/Aplicaciones";
import Modulos from "../Modulos/Modulos";
import { HexToHSVA } from "vuetify/src/util/colorUtils";
import helpers from "@/components/Helpers/helper";
import * as popup from "@/popup";

@Component({
  components: {
    roles,
    aplicaciones,
    Modulos,
  },
})
export default class AdmInstitucionesRolesComponent extends Vue {
  private headers: any[] = [
    {
      text: "Descripcion",
      align: "left",
      sortable: false,
      value: "descripcion",
      width: "15%",
    },
    {
      text: "Operaciones",
      align: "left",
      sortable: false,
      value: "value",
      width: "15%",
    },
  ];
  private headersAplicaciones: any[] = [
    {
      text: "Nombre",
      align: "left",
      sortable: true,
      value: "nombre",
      width: "40%",
    },
    {
      text: "Descripcion",
      align: "left",
      sortable: false,
      value: "descripcion",
      width: "50%",
    },
  ];
  private headersModulos: any[] = [
    {
      text: "Descripcion",
      align: "left",
      sortable: false,
      value: "moduloDesc",
      width: "50%",
    },
    {
      text: "Operaciones",
      align: "left",
      sortable: false,
      value: "",
      width: "50%",
    },
  ];
  private WebApiInstitucionesRoles: string =
    this.$store.state.server + "Api/institucionesRoles";
  private WebApiInstitucionesRolesConsultar: string =
    this.$store.state.server + "Api/institucionesRoles/Consultar";
  private WebApiInstitucionesRolesBuscar: string =
    this.$store.state.server + "Api/institucionesRoles/Buscar";
  private WebApiInstitucionesRolesBuscarXInstitucion: string =
    this.$store.state.server + "Api/institucionesRoles/BuscarXInstitucion";

  private WebApiRoles: string = this.$store.state.server + "Api/Roles";
  private WebApiRolesConsultar: string =
    this.$store.state.server + "Api/Roles/Consultar";
  private WebApiRolesBuscar: string =
    this.$store.state.server + "Api/Roles/Buscar";

  private WebApiAplicaciones: string =
    this.$store.state.server + "Api/Aplicaciones";
  private WebApiAplicacionesConsultar: string =
    this.$store.state.server + "Api/Aplicaciones/Consultar";
  private WebApiAplicacionesBuscar: string =
    this.$store.state.server + "Api/Aplicaciones/Buscar";

  private WebApiRolesAplicaciones: string =
    this.$store.state.server + "Api/RolesAplicaciones";
  private WebApiRolesAplicacionesConsultar: string =
    this.$store.state.server + "Api/RolesAplicaciones/Consultar";
  private WebApiRolesAplicacionesBuscarXRol: string =
    this.$store.state.server + "Api/RolesAplicaciones/BuscarXRol";

  private WebApiOperaciones: string =
    this.$store.state.server + "Api/Operaciones";
  private WebApiOperacionesConsutar: string =
    this.$store.state.server + "Api/Operaciones/Consultar";
  private WebApiOperacionesBuscar: string =
    this.$store.state.server + "Api/Operaciones/Buscar";

  private WebApiModulos: string = this.$store.state.server + "Api/Modulos";
  private WebApiAplicacionesOpModulos: string =
    this.$store.state.server + "Api/AplicacionesOpModulos";
  private WebApiModulosConsultar: string =
    this.$store.state.server + "Api/Modulos/Consultar";
  private WebApiModulosBuscar: string =
    this.$store.state.server + "Api/Modulos/Buscar";

  private rol = new services.clase_roles();
  private lstRoles: services.clase_roles[] = [];
  private lstAplicaciones: services.clase_aplicaciones[] = [];
  private aplicacionRolAsignar = new services.clase_rolesaplicaciones();
  private aplicacionSelected: services.clase_aplicaciones[] = [];
  private lstAplicacionesRol: services.clase_aplicaciones[] = [];
  private lstAplicacionesXRol: services.clase_rolesaplicaciones[] = [];
  private lstInstitucionesRoles: services.clase_institucionesroles[] = [];
  private institucionesRoles = new services.clase_institucionesroles();
  // Operaciones/Modulos
  private lstOperaciones: services.clase_operaciones[] = [];
  private lstModulos: services.clase_modulos[] = [];
  private lstOperacionesAplicacion: services.clase_aplicacionesoperaciones[] = [];
  private operacionesValores = "";
  private lstAppOperacionModulos: services.clase_aplicacionesopmodulos[] = [];
  private lstAppOpmodulos: services.clase_aplicacionesopmodulos[] = [];
  private lstAppOperacionModulosFilled: {
    idaplicacionesopmodulos: number;
    idrolesaplicaciones: number;
    idoperacion: number;
    idmodulo: number;
    operacionDesc: string;
    moduloDesc: string;
    activo: boolean;
    estado: boolean;
    id_agencia: number;
  }[] = [];
  private lstModulosLlenados: {
    idaplicacionesopmodulos: number;
    idrolesaplicaciones: number;
    idoperacion: number;
    idmodulo: number;
    operacionDesc: string;
    moduloDesc: string;
    activo: boolean;
    estado: boolean;
    Operaciones: { text: string; value: boolean; idOperacion: number }[];
    valoresOperaciones: { text: string; value: boolean; idOperacion: number }[];
  }[] = [];
  private lstModulosLlenadosXRol: {
    idaplicacionesopmodulos: number;
    idoperacion: number;
    idmodulo: number;
    operacionDesc: string;
    moduloDesc: string;
    activo: boolean;
    estado: boolean;
  }[] = [];
  private promisesModulos: Promise<void>[] = [];
  private helper: helpers = new helpers();
  private popup = new popup.Swal();

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
  @Watch("$store.state.institucionDialogInstitucionRoles")
  onInstitucionSelected(newVal: boolean) {
    if (newVal) {
      this.cargar_data();
    } else if (newVal == false) {
      this.limpiar();
      this.aplicacionSelected = [];
    }
  }
  private removeDuplicates(myArr: any, prop: any) {
    // DISTINCT Array
    return myArr.filter((obj: any, pos: any, arr: any) => {
      return arr.map((mapObj: any) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  private setModuloDesc(idModulo: Number) {
    let modulo = this.lstModulos.filter((modulo) => {
      return modulo.idmodulo === idModulo;
    });
    return modulo[0].descripcion;
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
      .Buscar(this.WebApiRolesConsultar, null)
      .then((resroles) => {
        if (resroles.data._error.error === 0) {
          this.lstRoles = resroles.data._data;
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resroles.data._error.descripcion,
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

    this.getRolesByInstitucion();

    new services.Operaciones()
      .Buscar(
        this.helper.getWebServiceDinamico("Api/Aplicaciones/Consultar"),
        null
      )
      .then((resaplicaciones) => {
        if (resaplicaciones.data._error.error === 0) {
          let responseAplicaciones = resaplicaciones.data._data;
          this.lstAplicaciones = this.helper.filterDataXAgencia(
            responseAplicaciones
          );
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resaplicaciones.data._error.descripcion,
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

    new services.Operaciones()
      .Buscar(this.WebApiOperacionesConsutar, null)
      .then((resOperaciones) => {
        if (resOperaciones.data._error.error === 0) {
          this.lstOperaciones = resOperaciones.data._data;
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
          text: "Error Inesperado",
          showConfirmButton: false,
          timer: 2000,
        });
      });

    new services.Operaciones()
      .Buscar(this.WebApiModulosConsultar, null)
      .then((resModulos) => {
        if (resModulos.data._error.error === 0) {
          this.lstModulos = resModulos.data._data;
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resModulos.data._error.descripcion,
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
  //?? CUSTOM METHODS
  private getRolesByInstitucion() {
    this.lstInstitucionesRoles = [];
    this.institucionesRoles.idinstitucion = this.$store.state.institucionSelected;
    new services.Operaciones()
      .Buscar(
        this.WebApiInstitucionesRolesBuscarXInstitucion,
        this.institucionesRoles
      )
      .then((resroles) => {
        if (resroles.data._error.error === 0) {
          this.lstInstitucionesRoles = resroles.data._data;
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resroles.data._error.descripcion,
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
  private getRolDesc(paramIdRol: number) {
    let rolFound = this.lstRoles.filter((rol) => {
      return paramIdRol === rol.idrol;
    });
    return rolFound[0].descripcion;
  }
  private getModuloDesc(paramIdMod: number) {
    let modFound = this.lstModulos.filter((modulo) => {
      return paramIdMod === modulo.idmodulo;
    });
    console.log(modFound[0].descripcion);
    return modFound[0].descripcion;
  }
  private searchAplicacion(paramIdRol: number) {
    this.rol.idrol = paramIdRol;
    this.$store.commit("select_Rol", paramIdRol.toString());
    let rolesaplicaciones: services.clase_rolesaplicaciones = new services.clase_rolesaplicaciones();
    rolesaplicaciones.idrol = this.$store.state.rolSelected;
    new services.Operaciones()
      .Buscar(this.WebApiRolesAplicacionesBuscarXRol, rolesaplicaciones)
      .then((resaplicacionesrol) => {
        if (resaplicacionesrol.data._error.error === 0) {
          this.lstAplicacionesRol = [];
          let responseAplicacionesRol = resaplicacionesrol.data._data;
          this.lstAplicacionesXRol = responseAplicacionesRol;
          let aplicacionesXRol = responseAplicacionesRol.filter(
            (aplicacion: any) => {
              return aplicacion.idrol == paramIdRol;
            }
          );
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
            type: "error",
            title: "Consultar",
            text: resaplicacionesrol.data._error.descripcion,
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
  private searchModulos(paramIdRol: number) {
    new services.Operaciones()
      .Buscar(
        this.WebApiAplicacionesOpModulos + "/BuscarXRol?idrol=" + paramIdRol,
        null
      )
      .then((resaplicacionesrol) => {
        if (resaplicacionesrol.data._error.error === 0) {
          this.lstModulosLlenadosXRol = [];
          let responseAplicacionesRol = resaplicacionesrol.data._data;
          this.lstModulosLlenadosXRol = responseAplicacionesRol.map(
            (modulo: any) => {
              return {
                idaplicacion: modulo.idaplicacion,
                idoperacion: modulo.idoperacion,
                idmodulo: modulo.idmodulo,
                estado: modulo.estado,
                moduloDesc: this.getModuloDesc(modulo.idmodulo),
              };
            }
          );
        } else {
          swal.fire({
            type: "error",
            title: "Consultar",
            text: resaplicacionesrol.data._error.descripcion,
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
  private searchData(paramIdRol: number) {
    this.searchAplicacion(paramIdRol);
  }
  private asignacionApp(App: services.clase_aplicaciones) {
    this.aplicacionRolAsignar.idaplicacion = App.idaplicacion;
    if (
      this.lstAplicacionesRol.some(
        (app) => app["idaplicacion"] === App["idaplicacion"]
      )
    ) {
      swal
        .fire({
          title: "Retirar Aplicación",
          text: "Esta seguro de excluir esta aplicación del Grupo?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "success",
          cancelButtonColor: "error",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Aceptar!",
        })
        .then((result) => {
          if (result.value) {
            let appAcambiar = this.lstAplicacionesXRol.filter(
              (appRol) =>
                appRol.idaplicacion ===
                  this.aplicacionRolAsignar.idaplicacion &&
                appRol.idrol === this.rol.idrol
            );

            appAcambiar[0].id_agencia = this.$store.state.agenciaSelected;

            this.helper.setPromesas(
              "Api/RolesAplicaciones",
              appAcambiar[0],
              "Eliminar",
              "idrolesaplicaciones"
            );

            Promise.all(this.$store.state.lstPromises)
              .then((result) => {
                this.popup.success(
                  "Baja",
                  "La baja se efectuó en Central y Agencia"
                );
                this.limpiar();
                this.cargar_data();
                this.aplicacionRolAsignar = new services.clase_rolesaplicaciones();
              })
              .catch((error) => {
                this.popup.error("Baja", "Error Inesperado: " + error);
              });
          }
        });
    } else {
      // !! Pendiente modificacion en caso de existir registro dado de baja

      this.aplicacionRolAsignar.idrol = this.rol.idrol;
      this.aplicacionRolAsignar.id_agencia = this.$store.state.agenciaSelected;

      this.helper.setPromesas(
        "Api/RolesAplicaciones",
        this.aplicacionRolAsignar,
        "Insertar",
        "idrolesaplicaciones"
      );

      Promise.all(this.$store.state.lstPromises)
        .then((result) => {
          this.popup.success(
            "Insertar",
            "La Inserción se efectuó en Central y Agencia"
          );
          this.limpiar();
          this.cargar_data();
          this.aplicacionRolAsignar = new services.clase_rolesaplicaciones();
        })
        .catch((error) => {
          this.popup.error("Insertar", "Error Inesperado: " + error);
        });
    }
  }
  private async asignacionMod(Mod: any) {
    debugger;
    if (
      this.lstModulosLlenados.some(
        (mod) => mod["moduloDesc"] === Mod["moduloDesc"]
      )
    ) {
      swal
        .fire({
          title: "Retirar Módulo",
          text: "Esta seguro de excluir éste módulo de la Aplicación del Rol?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "success",
          cancelButtonColor: "error",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Aceptar!",
        })
        .then(async (result) => {
          if (result.value) {
            let modAcambiar = this.lstAppOperacionModulosFilled.filter(
              (mod) =>
                mod.idrolesaplicaciones === Mod.idrolesaplicaciones &&
                mod.idmodulo === Mod.idmodulo
            );
            for (let element of modAcambiar) {
              element.activo = false;

              await this.helper.setPromesas(
                "Api/AplicacionesOpModulos",
                element,
                "Actualizar",
                "idaplicacionesopmodulos"
              );

              await Promise.all(this.$store.state.lstPromises)
                .then((result) => {
                  this.popup.success(
                    "Excluir",
                    "Módulo excluido de la aplicación en Central y Agencia"
                  );
                })
                .catch((error) => {
                  this.popup.error(
                    "Excluir",
                    "Fallo en transacción Módulo: " + error
                  );
                });
            }
          }
        });
    } else {
      let modAsignar = new services.clase_aplicacionesopmodulos();
      modAsignar.idmodulo = Mod.idmodulo;
      modAsignar.idoperacion = Mod.idoperacion;
      modAsignar.idrolesaplicaciones = Mod.idrolesaplicaciones;
      modAsignar.activo = true;
      modAsignar.estado = true;
      modAsignar.id_agencia = this.$store.state.agenciaSelected;

      for (let i = 0; i < this.lstOperaciones.length; i++) {
        modAsignar.idoperacion = this.lstOperaciones[i].idoperacion;

        await this.helper.setPromesas(
          "Api/AplicacionesOpModulos",
          modAsignar,
          "Insertar",
          "idaplicacionesopmodulos"
        );

        await Promise.all(this.$store.state.lstPromises)
          .then((result) => {
            this.popup.success(
              "Asignación",
              "Módulo Asignado correctamente en Central y Agencia"
            );
          })
          .catch((error) => {
            this.popup.error(
              "Asignación",
              "Fallo en transacción AplicacionOpModulo: " + error
            );
          });
      }
    }
  }

  private actualizarOperacion(objModulo: any) {
    return new services.Operaciones()
      .Actualizar(this.WebApiAplicacionesOpModulos, objModulo)
      .then((result) => {
        if (result.data.error === 0) {
          console.log("Operacion Modificada correctamente");
        } else {
          console.log(
            "Error al modificar operacion: " + JSON.stringify(objModulo)
          );
        }
      })
      .catch((error) => {
        console.log("Error al modificar operacion" + error);
      });
  }

  private asignaOperacion(arrayOp: any) {
    let arrayPromesasModulo: Promise<void>[] = [];
    this.lstAppOperacionModulosFilled.forEach((element) => {
      if (
        element.idmodulo == arrayOp.idmodulo &&
        element.idrolesaplicaciones == arrayOp.idrolesaplicaciones
      ) {
        let promesasModulo: Promise<void>;
        if (
          arrayOp.valoresOperaciones.some(
            (Op: any) => Op.idOperacion === element.idoperacion
          )
        ) {
          // Si está check
          element.activo = true;
        } else {
          element.activo = false;
        }
        element.id_agencia = this.$store.state.agenciaSelected;
        promesasModulo = this.actualizarOperacion(element);
        arrayPromesasModulo.push(promesasModulo);
      }
    });
    Promise.all(arrayPromesasModulo)
      .then((result) => {
        if (result) {
          console.log("Operacion(es) Modificada(s) correctamente");
          swal.fire({
            type: "success",
            title: "Actualizar",
            text: "Operacion(es) Modificada(s) correctamente",
            showConfirmButton: false,
            timer: 4000,
          });
          this.cargar_data();
        }
      })
      .catch((error) => {
        swal.fire({
          type: "error",
          title: "Actualizar",
          text: "Problema al actualizar la(s) operacion(es)" + error,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  }
  private filterModulosXAplicacionRol(item: any) {
    let idapp = item.item.idaplicacion.toString();
    this.lstModulosLlenados = [];
    this.$store.commit("select_Aplicacion", idapp);
    const params = new URLSearchParams();
    params.append("idaplicacion", idapp);
    params.append("idrol", this.rol.idrol.toString());
    new services.Operaciones()
      .Buscar(
        this.WebApiAplicacionesOpModulos + "/BuscarXAplicacionRol?" + params,
        null
      )
      .then((resmodulos) => {
        if (resmodulos.data._error.error === 0) {
          this.lstAppOperacionModulos = resmodulos.data._data;
          this.setDescripcion();
          this.lstModulosLlenados = this.removeDuplicates(
            this.lstAppOperacionModulosFilled,
            "idmodulo"
          );
          // debugger;
          this.lstModulosLlenados.forEach((element) => {
            element.Operaciones = [
              { text: "Altas", value: true, idOperacion: 4 },
              { text: "Modificaciones", value: true, idOperacion: 6 },
              { text: "Bajas", value: true, idOperacion: 5 },
            ];
          });

          this.fillOperaciones();
          this.filterModulosXAplicacion();
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
          text: "Error Inesperado" + error,
          showConfirmButton: false,
          timer: 2000,
        });
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
  private setDescripcion() {
    this.lstAppOperacionModulosFilled = [];
    this.lstAppOperacionModulos.forEach((appOpMod: any) => {
      let modulo = this.lstModulos.filter(
        (mod) => mod.idmodulo === appOpMod.idmodulo
      )[0];
      let operacion = this.lstOperaciones.filter(
        (op) => op.idoperacion === appOpMod.idoperacion
      )[0];
      // debugger;
      this.lstAppOperacionModulosFilled.push({
        idaplicacionesopmodulos: appOpMod.idaplicacionesopmodulos,
        idrolesaplicaciones: appOpMod.idrolesaplicaciones,
        idoperacion: appOpMod.idoperacion,
        idmodulo: appOpMod.idmodulo,
        operacionDesc: operacion.descripcion,
        moduloDesc: modulo.descripcion,
        activo: appOpMod.activo,
        estado: appOpMod.estado,
        id_agencia: this.$store.state.agenciaSelected,
      });
    });
  }
  private fillOperaciones() {
    let arrValoresOp: any = [];
    this.lstModulosLlenados.forEach((elementModuloFinal) => {
      // Recorrer array de distinct modulos
      this.lstAppOperacionModulosFilled.forEach((elementModuloRaw) => {
        // Recorrer array AplicacionesOpModulos
        //** Set de Operaciones según registros en AplicacionesOpModulos */
        elementModuloFinal.Operaciones.forEach((Operacion) => {
          if (Operacion.idOperacion == elementModuloRaw.idoperacion) {
            if (elementModuloRaw.activo) {
              arrValoresOp.push(Operacion);
              //!! REVISION PENDIENTE
            }
          }
        });
        elementModuloFinal.valoresOperaciones = this.removeDuplicates(
          arrValoresOp,
          "idOperacion"
        );
        //*** */
      });
    });
  }
  private findModulo(idMod: number) {
    let Modulo = this.lstModulos.filter((modulo) => {
      return modulo.idmodulo == idMod;
    });
    return Modulo[0];
  }
  private onlyUnique(value: any, index: any, self: any) {
    return self.indexof(value) === index;
  }
  private limpiar() {
    this.lstAplicaciones = [];
    this.lstAplicacionesRol = [];
    this.lstAplicacionesXRol = [];
    this.lstInstitucionesRoles = [];
    this.lstRoles = [];
    this.aplicacionRolAsignar = new services.clase_rolesaplicaciones();
  }
  // ?? DIALOG METHODS
  private showDialog(component: string) {
    if (component === "Roles") {
      this.$store.commit("setPopUpContent", "GestionRoles");
    } else if (component === "Aplicaciones") {
      this.$store.commit("setPopUpContent", "GestionAplicaciones");
    } else if (component === "Modulos") {
      this.$store.commit("setPopUpContent", "GestionModulos");
    }
  }
}
