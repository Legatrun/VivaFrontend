<template>
  <v-card>
    <v-toolbar color="primary" style="color:white">
      <v-toolbar-title class="font-large-color">Transacciones</v-toolbar-title>
      <v-divider></v-divider>
      <!-- <v-text-field
        class="input-small"
        v-model="buscartransactions"
        append-icon="search"
        label="Buscar Registro"
        single-line
        solo
        hide-details
      ></v-text-field> -->
    </v-toolbar>
      <!-- hide-default-footer -->
    <v-data-table
    	:headers="headers" 
      :items="lsttransactions" 
      :items-per-page="itemsPerPage"
      :search = "buscartransactions" 
      :footer-props="{
        disablepagination:true,
        showFirstLastPage: true,
        'items-per-page-options': itemsPerPageList,
        'items-per-page-text': 'Página: '+currentPageSelected+' || Registros desplegados:',
      }"
      :loading="loadingDataTable"
      loading-text="Cargando Transacciones"
      dense
      :hide-default-footer="true"
      disable-pagination
      class="elevation-1"
    >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="datatable-items-small">{{ props.item.numberOfItemPagination }}</td>
          <td class="datatable-items-small">{{ FormatDateTime(props.item.createtimestamp) }}</td>
          <td class="datatable-items-small">{{ FormatSucursal(props.item.locationidentification) }}</td>
          <td class="datatable-items-small">{{ FormatNull(props.item.deviceidentification) }}</td>
          <td class="datatable-items-small">{{ FormatNull(props.item.operationname) }}</td>
          <td class="datatable-items-small">{{ FormatNull(props.item.customernumber)}}</td>
          <td class="datatable-items-small">{{ FormatNull(props.item.transactionidentification) }}</td>
          <td class="datatable-items-small">{{ FormatNull(props.item.amount) }}</td>
          <td class="datatable-items-small">{{ FormatNull(props.item.resultcode) }}</td>
          <td class="datatable-items-small">{{ FormatNull(props.item.amountreturned) }}</td>
          <td class="datatable-items-small">{{ FormatNull(props.item.amountticketundelivered) }}</td>
          <td class="datatable-items-small">{{ FormatNull(props.item.amountentereddetail) }}</td>
          <td class="datatable-items-small">{{ FormatNull(props.item.amountticketundelivereddetail) }}</td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="btnedit"
                  v-on="on"
                  small
                  dark
                  @click="Actualizar(props.item)"
                  ><v-icon>mdi-comment-eye</v-icon>Revisar</v-btn
                >
              </template>
              <span>Ver dato de la transacción</span>
            </v-tooltip>
            <!-- <v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar transactions </span>
						</v-tooltip> -->
          </td>
        </tr>
      </template>
      <!-- <template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
					</template>
					<span>Adicionar nuevo registro de Transacción</span>
				</v-tooltip>
			</template> -->
      	<template v-slot:top>
				<v-card dark color="backgroundFilterOptions">
					<v-form ref="form" >
				  	<h2 style="text-align:center; ">Filtros</h2>
						<v-card-text>
						<v-layout wrap>
              <v-flex sm6 style="padding: 0px">
								<v-text-field class="input-small" 
											v-model="buscartransactions"
											label="Nro. Recibo"
											clearable
											persistent-hint
											required
                      outlined
                      >
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 0px">
								<v-text-field class="input-small" 
											v-model="transactions.customernumber"
											label="Cliente"
											clearable
											persistent-hint
											required
                      outlined>
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 0px">
								<v-autocomplete class="input-small" 
											v-model="transactions.locationidentification"
											label="Sucursal"
											clearable
											persistent-hint
											required
                      outlined
                      :items="lstsucursal"
                      item-text="description"
                      item-value="identification"
                      @change="CargarTerminales()"
                      >
								</v-autocomplete>
							</v-flex>
							<v-flex sm4 style="padding: 0px">
								<v-autocomplete class="input-small" 
											v-model="transactions.deviceidentification"
											label="Terminal"
											clearable
											persistent-hint
											required
                      outlined
                      :items="lstdevices"
                      item-text="identification"
                      item-value="identification">
								</v-autocomplete>
							</v-flex>
              <v-flex sm4 style="padding: 0px">
								<v-autocomplete class="input-small" 
											v-model="transactions.operationname"
											label="Tipo de Transacción"
											clearable
											persistent-hint
											required
                      outlined
                      :items="lsttransactions"
                      item-text="operationname"
                      item-value="operationname">
								</v-autocomplete>
							</v-flex>
							<v-spacer></v-spacer>
              <v-flex sm4 style="padding: 0px">
								<v-menu
									ref="menu"
										v-model="menu"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="transactions.opentimestamp"
											label="Fecha Desde"
											outlined
                      readonly
											persistent-hint
											prepend-icon="event"
											v-on="on"
                      @change="validarFecha()"
                      >
										</v-text-field>
									</template>
									<v-date-picker v-model="transactions.opentimestamp" no-title @input="menu = false"></v-date-picker>
								</v-menu>
							</v-flex>
              <v-flex sm4 style="padding: 0px">
								<v-menu
									ref="menu_closetimestamp"
										v-model="menu_closetimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="transactions.closetimestamp"
											label="Fecha Hasta"
											outlined
                      readonly
											persistent-hint
											prepend-icon="event"
                      :error-messages="message"
                      :rules="validacion"
											v-on="on"
                      @change="validarFecha()"
                      >
										</v-text-field>
									</template>
									<v-date-picker v-model="transactions.closetimestamp" :min="transactions.opentimestamp" no-title @input="menu_closetimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
              <v-spacer></v-spacer>
							<v-flex sm2 >
                
								<v-btn large color="green" dark @click="cargar_data_filtrada()">
									<v-icon>mdi-selection-search</v-icon> 
									 Buscar
							    </v-btn>
							</v-flex>
							<v-flex sm2 >
								<v-btn large color="grey" dark @click="LimpiarFiltros()">
									<v-icon>mdi-monitor-clean</v-icon> 
									 Limpiar
							    </v-btn>
							</v-flex>
						</v-layout>
						</v-card-text>
					</v-form>
				</v-card>
             <v-pagination
                v-model="currentPageSelected"
                :length="totalPages"
                dark
                color="cyan"
                @input="cargarNuevosElementos"
                :total-visible="maxPagesVisible"
                :value="currentPageSelected"
                :disabled="disabledPagination"
              >
            </v-pagination>
           <v-flex sm12>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn dark left color="orange" fab small v-on="on" @click="cargar_data()"><v-icon>mdi-update</v-icon></v-btn>
							</template>
							<span>Actualizar Tabla</span>
						</v-tooltip>
					</v-card-actions>						
				</v-flex>
			</template>
      <template v-slot:no-data>
        <v-alert :value="true" color="warning"  icon="warning">
          Lo sentimos, no exiten datos a desplegar: (
        </v-alert>
      </template>
    </v-data-table>
      <!-- <v-flex sm4>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
                <v-autocomplete style="margin-left: 50px"
                      v-model="itemsPerPage"
                      v-on="on"
                      :items="itemsPerPageList"
                      label="Regitros por página:" ></v-autocomplete>

               <h4> {{itemsPerPage}} items de {{pagination.itemsLengthPagination}}</h4>
							</template>
							<span>Actualizar</span>
						</v-tooltip>
					</v-card-actions>						
			</v-flex> -->
    <v-dialog v-model="dialog" persistent max-width="60%">
      <v-card>
        <v-toolbar style="padding:10px" dark class="primary">
          <v-toolbar-title class="font-medium-color"
            >Transacciones</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn color="error" fab dark small @click="Cancelar()">X</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-form ref="form" style="padding:10px">
          <v-card-text>
            <v-layout wrap>
              <template v-if="operacion == 'Insert'"> </template>
              <template v-else> </template>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.deviceidentification"
                  label="Terminal"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  v-model="transactions.locationidentification"
                  class="input-small"
                  label="Sucursal"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                >
                </v-text-field>
              </v-flex>

              <v-flex sm4 class="hidden-xs-only" style="padding: 5px">
                <!-- <v-menu
                  ref="menu_createtimestamp"
                  v-model="menu_createtimestamp"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                > -->
                  <!-- <template v-slot:activator="{ on }">
                    <v-text-field
                      class="date-small"
                      v-model="transactions.createtimestamp"
                      label="Fecha"
                      persistent-hint
                      prepend-icon="event"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="transactions.createtimestamp"
                    no-title
                    @input="menu_createtimestamp = false"
                  ></v-date-picker>
                </v-menu> -->
                 <v-text-field
                      class="date-small"
                      v-model="transactions.createtimestamp"
                      label="Fecha"
                      persistent-hint
                      v-on="on"
                      outlined
                      dense
                    >
                    </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.resultcode"
                  label="Código de Resultado"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.resultcode = updateText(
                      transactions.resultcode
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.resultmessage"
                  label="Mensaje"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.resultmessage = updateText(
                      transactions.resultmessage
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.transactionidentification"
                  label="Recibo #"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  type="number"
                  @input="
                    transactions.transactionidentification = updateText(
                      transactions.transactionidentification
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.providerresultcode"
                  label="Código de Resultado Proveedor"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.providerresultcode = updateText(
                      transactions.providerresultcode
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.providerresultmessage"
                  label="Mensaje de Proveedor"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.providerresultmessage = updateText(
                      transactions.providerresultmessage
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm6 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.customernumber"
                  label="Número de Cliente"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.customernumber = updateText(
                      transactions.customernumber
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm6 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.customercode"
                  label="Código de Cliente"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.customercode = updateText(
                      transactions.customercode
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.amount"
                  label="Monto Pagado"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  type="number"
                  @input="transactions.amount = updateText(transactions.amount)"
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.amountentered"
                  label="Monto Recibido"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  type="number"
                  @input="
                    transactions.amountentered = updateText(
                      transactions.amountentered
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.amountentereddetail"
                  label="Detalle de Monto Recibido"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.amountentereddetail = updateText(
                      transactions.amountentereddetail
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.amountreturned"
                  label="Vuelto"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.amountreturned = updateText(
                      transactions.amountreturned
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.amountticketundelivered"
                  label="Vuelto no Entregado"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.amountticketundelivered = updateText(
                      transactions.amountticketundelivered
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.amountreturneddetail"
                  label="Detalle de Vuelto"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.amountreturneddetail = updateText(
                      transactions.amountreturneddetail
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.cardsdispensed"
                  label="Tarjetas Dispensadas"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  type="number"
                  @input="
                    transactions.cardsdispensed = updateText(
                      transactions.cardsdispensed
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
              </v-flex>
              <v-flex sm4 style="padding: 5px">
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.batchnumber"
                  label="# de Lote"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  type="number"
                  @input="
                    transactions.batchnumber = updateText(
                      transactions.batchnumber
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.servicename"
                  label="Servicio"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.servicename = updateText(
                      transactions.servicename
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.operationname"
                  label="Operación"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.operationname = updateText(
                      transactions.operationname
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.sequencenumber"
                  label="Secuencia"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  type="number"
                  @input="
                    transactions.sequencenumber = updateText(
                      transactions.sequencenumber
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.providertransactionid"
                  label="Internal ID"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.providertransactionid = updateText(
                      transactions.providertransactionid
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="transactions.devicetransactionid"
                  label="Id Transaction Terminal"
                  hint="Solo lectura"
                  outlined
                  dense
                  persistent-hint
                  required
                  readonly
                  @input="
                    transactions.devicetransactionid = updateText(
                      transactions.devicetransactionid
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <!-- AQUI -->
            </v-layout>
          </v-card-text>
        </v-form>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script src="./transactions.ts"></script>
<style scoped>
.font-extralarge-color {
  font-size: 3em; /* tamaño de letra */
  color: white; /* color de letra */
}
.font-large-color {
  font-size: 2.4em; /* tamaño de letra */
  color: white; /* color de letra */
}
.font-medium-color {
  font-size: 2em; /* tamaño de letra */
  color: white; /* color de letra */
}
.font-small-color {
  font-size: 1.4em; /* tamaño de letra */
  color: white; /* color de letra */
}
.btn-small-color {
  font-size: 1.4em; /* tamaño de letra */
  color: white; /* color de letra */
}
.input-small {
  font-size: 1.6em; /* tamaño de letra */
}
.date-small {
  font-size: 1.5em; /* tamaño de letra */
}
.datatable-items-small {
  font-size: 1em; /* tamaño de letra */
}
</style>
