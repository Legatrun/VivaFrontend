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
        metodo: string,
        nombreID: string
      ) {
        $store.commit("setPromises", []);
        let lstpromesas: Promise<void>[] = [];
        // $store.state.lstWSAgencias.forEach((element:any) => { //?? importante: Para realizar request asincrono consecutivo no utilizar foreach, usar for in junto con async/await a la promesa
        for (let element of $store.state.lstWSAgencias) {
          if ($store.state.agenciaSelected == -1) {
            //TODO: En caso de seleccionar todas las agencias, se debe registrar en cada agencia y en central por cada agencia
            console.log("pendiente");
          } else {
            let promesa: any;
            if (metodo == "Insertar") {
              //!! El service de central siempre debe ser el primero en el array
              if (element != $store.state.server) {
                //?? Si el servicio no es el de central, setear el id del objComponent al que devolvió la central
    
                objComponent[nombreID] = $store.state.centralIDresponse; // Primer valor del obj seteado
              }
    
              promesa = await new services.Operaciones()
                .Insertar(element + endPoint, objComponent)
                .then((result) => {
                  if (result.data.error === 0) {
                    console.log("registro en Agencia insertada satisfactoriamente");
                  } else {
                    $store.commit("switchSnackErrorRegAgencia");
                  }
    
                  if (element == $store.state.server) {
                    //?? Verificar si el servicio es el de central, si es así obtener el id que devuelve al insertar
                    $store.commit(
                      "setIDCentral",
                      parseInt(result.data.descripcion)
                    );
                  }
                })
                .catch((error) => {
                  $store.commit("switchSnackErrorRegAgencia");
                  console.error(
                    "Error al insertar registro en Agencia: " +
                      element +
                      "Error: " +
                      error
                  );
                });
              lstpromesas.push(promesa);
            } else if (metodo == "Actualizar") {
              lstpromesas.push(
                new services.Operaciones()
                  .Actualizar(element + endPoint, objComponent)
                  .then((result) => {
                    if (result.data.error === 0) {
                      console.log("Modificacion en Agencia satisfactoria");
                    } else {
                      $store.commit("switchSnackErrorRegAgencia");
                    }
                  })
                  .catch((error) => {
                    $store.commit("switchSnackErrorRegAgencia");
                    console.error(
                      "Error al modificar en Agencia: " +
                        element +
                        "Error: " +
                        error
                    );
                  })
              );
            } else if (metodo == "Eliminar") {
              lstpromesas.push(
                new services.Operaciones()
                  .Eliminar(element + endPoint, objComponent)
                  .then((result) => {
                    if (result.data.error === 0) {
                      console.log("Eliminacion en Agencia satisfactoria");
                    } else {
                      $store.commit("switchSnackErrorRegAgencia");
                    }
                  })
                  .catch((error) => {
                    $store.commit("switchSnackErrorRegAgencia");
                    console.error(
                      "Error al Eliminar en Agencia: " + element + "Error: " + error
                    );
                  })
              );
            }
          }
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
