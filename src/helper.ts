import $store from '@/store';
import * as services from "@/services";
import * as popup from "@/popup";

export default class Filter {
    private descFilter: any;
    public showDataDescription(idItem: any, lstData: any, nombreIdItemArray: string, nombreCampoRetorno: string) {
        this.descFilter = lstData.filter(
        (data: any) => data[nombreIdItemArray] === idItem,
        );
        return this.descFilter[0][nombreCampoRetorno];
    }

    // MODULO SEGURIDAD
    public filterDataXAgencia(lstGenerico: any) {
        if ($store.state.agenciaSelected != -1) {
          let lstResponse;
          lstResponse = lstGenerico.filter((item: any) => {
            if (item.id_agencia) {
              return item.id_agencia == $store.state.agenciaSelected;
            } else if (item.idagencia) {
              return item.idagencia == $store.state.agenciaSelected;
            }
          });
          return lstResponse;
        } else {
          return lstGenerico;
        }
      }
    
      public async setPromesas(
        endPoint: string,
        objComponent: any,
        metodo: string
      ) {
        $store.commit("setPromises", []);
        let lstpromesas: Promise<void>[] = [];

        let promesa: any;
            if (metodo == "Insertar") {
              promesa = await new services.Operaciones()
                .Insertar($store.state.server + endPoint, objComponent)
                .then((result) => {
                  if (result.data.error === 0) {
                    console.log("Registro realizado correctamente");
                  } else {
                    console.log("error al ingresar nuevo registro")
                  }
                })
                .catch((error) => {
                  console.error(
                    "Error al insertar registro: " +
                    objComponent.stringify +
                      "Error: " +
                      error
                  );
                });
              lstpromesas.push(promesa);
            } else if (metodo == "Actualizar") {
              lstpromesas.push(
                new services.Operaciones()
                  .Actualizar($store.state.server + endPoint, objComponent)
                  .then((result) => {
                    if (result.data.error === 0) {
                      console.log("Modificacion satisfactoria");
                    } else {
                      console.error(
                        "Error al modificar en Agencia: " +
                        objComponent.stringify 
                      );
                    }
                  })
                  .catch((error) => {
                    console.error(
                      "Error al modificar en Agencia: " +
                        objComponent.stringify +
                        "Error: " +
                        error
                    );
                  })
              );
            } else if (metodo == "Eliminar") {
              lstpromesas.push(
                new services.Operaciones()
                  .Eliminar($store.state.server + endPoint, objComponent)
                  .then((result) => {
                    if (result.data.error === 0) {
                      console.log("Eliminacion satisfactoria");
                    } else {
                      console.error(
                        "Error al Eliminar en Agencia: " + objComponent.stringify
                      );
                    }
                  })
                  .catch((error) => {
                    console.error(
                      "Error al Eliminar en Agencia: " + objComponent.stringify + "Error: " + error
                    );
                  })
              );
            }
        $store.commit("setPromises", lstpromesas);
      }
    
      public getWebServiceDinamico(endPoint: string) {
        // método para consultas
        // if ($store.state.agenciaOrigenSelected == -1) {
        //   return $store.state.lstWSAgencias[0] + endPoint;
        // } else {
        //   return $store.state.lstWSAgencias[1] + endPoint;
        // }
        return $store.state.server + endPoint;
      }
}
