<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Lotes</v-toolbar-title>
			<v-divider></v-divider>
			<!-- <v-text-field class="input-small"
					v-model="buscarbatches"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field> -->
		</v-toolbar>
    <!-- <v-data-table v-bind:items="lstagencia"
							v-bind:headers="headers"
							:search="buscaragencia"
							:rows-per-page-text="rowsPerPageText"
                            :rows-per-page-items="rowsPerPage"
							class="elevation-1"
                            :pagination.sync="pagination"
                            sort-icon="🔽"
                            next-icon=">"
                            prev-icon="<"
                              > -->
            <!-- :hide-default-footer="true" -->
  
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstbatches" 
						:items-per-page="itemsPerPage"
						:search = "buscarbatches" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': itemsPerPageList,
							'items-per-page-text': 'Página: '+currentPageSelected+' || Registros desplegados:',
						}"
            :loading="loadingDataTable"
            loading-text="Cargando Lotes"
						dense
						class="elevation-1"
            :hide-default-footer="true"
            disable-pagination>
			<template slot="item" slot-scope="props">
				<tr>
          <td class="datatable-items-small">
            {{props.item.numberOfItemPagination}}
          </td>
          <td class="datatable-items-small">
            {{ FormatSucursal(props.item.locationidentification) }}
          </td>
          <td class="datatable-items-small">
            {{ props.item.deviceidentification }}
          </td>
					<td class="datatable-items-small">
            {{ FormatEstado(props.item.status) }}
          </td>
					<td class="datatable-items-small">
            {{ FormatDate(props.item.opentimestamp) }}
          </td>
					<td class="datatable-items-small">
            {{ FormatDate(props.item.closetimestamp) }}
          </td>
          <td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" small dark  @click="Revisar(props.item)"><v-icon>mdi-comment-eye</v-icon>Revisar</v-btn>
							</template>
							<span>Ver datos del lote</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top >
				<v-card dark color="backgroundFilterOptions">
					<v-form ref="form" v-model="activa">
            <h2 style="text-align:center; ">Filtros</h2>
							<v-card-text>
						    <v-layout wrap>
								<v-flex sm6 style="padding:0px" class="input-small">
									<v-autocomplete
                   v-model="batches.locationidentification"
									label="Sucursal"
									clearable
									outlined
									parsisten-hint								
                  no-data-text="No se encontro ningun dato"
                  :items="lstsucursal"
                  item-text="description"
                  item-value="identification"
                  @change="CargarTerminales()"
									>
									</v-autocomplete>
								</v-flex>
								<v-flex sm6 style="padding:0px" class="input-small">
									<v-autocomplete
                  v-model="batches.deviceidentification"
									label="Terminal"
									clearable
									outlined
									parsisten-hint
                  no-data-text="No se encontro ningun dato"
                  :items="lstdevices"
                  item-text="identification"
                  item-value="identification"
									>
									</v-autocomplete>
								</v-flex>
								<v-flex sm3 class="hidden-xs-only" style="padding: 0px">
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
											v-model="batches.opentimestamp"
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
									<v-date-picker v-model="batches.opentimestamp" no-title @input="menu = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm3 class="hidden-xs-only" style="padding: 0px">
								<v-menu
									ref="menu_closetimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="batches.closetimestamp"
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
									<v-date-picker v-model="batches.closetimestamp" :min="batches.opentimestamp" no-title @input="menu_closetimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-spacer></v-spacer>
							<v-flex sm1.5 style="padding: 0px">
								<v-btn large color="green" dark @click="cargar_data_fitro()">
									<v-icon>mdi-selection-search</v-icon> 
									 Buscar
							    </v-btn>
							</v-flex>
							<v-flex sm1.5 style="padding: 0px">
								<v-btn large color="grey" dark @click="limpiarFiltros()">
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
								<v-btn dark left color="orange" fab small v-on="on" @click="actualizarTabla()"><v-icon>mdi-update</v-icon></v-btn>
							</template>
							<span>Actualizar Tabla</span>
						</v-tooltip>
					</v-card-actions>						
				</v-flex>	
			</template>
				  
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
		</v-data-table>
    
		<v-dialog v-model="dialog" max-width="70%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title class="font-medium-color" >Lotes</v-toolbar-title>
          	<v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="Cancelar()">X</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
              <!-- FORMULARIO POPUP -->
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.deviceidentification"
                  hint="Solo lectura"
                  label="Terminal"
                  readonly
                  persistent-hint
                  required
                  outlined
                  >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.locationidentification"
                  hint="Solo lectura"
                  label="Sucursal"
                  readonly
                  persistent-hint
                  required
                  outlined
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="statusDetail"
                  hint="Solo lectura"
                  label="Estado"
                  readonly
                  persistent-hint
                  required
                  outlined
                >
                </v-text-field>
              </v-flex>
                <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.opentimestamp"
                  hint="Solo lectura"
                  label="Fecha Apertura"
                  readonly
                  persistent-hint
                  required
                  outlined
                >
                </v-text-field>
              </v-flex>
                <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.closetimestamp"
                  hint="Solo lectura"
                  label="Fecha Cierre"
                  readonly
                  persistent-hint
                  required
                  outlined
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
              </v-flex>
              <!-- PESTAÑAS -->
                <v-toolbar color="headerpestañas" >
                  <v-toolbar-title class="font-medium-color">Contadores</v-toolbar-title>
                </v-toolbar>
                 <!-- DESDE -->
                <v-tabs
                  color="white"
                  dark
                  slider-color="yellow"
                  background-color="blue"
                  style="border:solid 1px;"
                >
                  <v-tab ripple>Aceptadores</v-tab>
                  <v-tab ripple>Dispensadores</v-tab>
                  <v-tab ripple>Vueltos</v-tab>
                  <v-tab ripple>Totales</v-tab>
                  <v-tab ripple>Estados</v-tab>
                  <v-tab-item>
                    <v-card id="Aceptadores" flat dark class="pestaña-aceptadores">
                        <v-form>
                          <v-container>
                            <v-row>
                              <v-flex sm4 style="padding: 5px">
                               <v-text-field class="input-small" v-model="batches.aceptor_001000" 
                                  hint="Billetes de 10 Bs." readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                <v-text-field class="input-small" v-model="batches.aceptor_002000" 
                                  hint="Billetes de 20 Bs." readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.aceptor_005000" 
                                  hint="Billetes de 50 Bs." readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.aceptor_010000" 
                                  hint="Billetes de 100 Bs." readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.aceptor_020000" 
                                  hint="Billetes de 200 Bs." readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                            </v-row>
                          </v-container>
                        </v-form>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item >
                    <v-card id="Dispensadores" flat dark class="pestaña-dispensadores">
                        <v-form>
                          <v-container>
                            <v-row>
                              <v-flex sm4 style="padding: 5px">
                               <v-text-field class="input-small" v-model="batches.changer_001000" 
                                  hint="Billetes de 10 Bs." readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                <v-text-field class="input-small" v-model="batches.changer_002000" 
                                  hint="Billetes de 20 Bs." readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.changer_005000" 
                                  hint="Billetes de 50 Bs." readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.totalcardsdelivered" 
                                  hint="Tarjetas Chip" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                            </v-row>
                          </v-container>
                        </v-form>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item >
                    <v-card id="Vueltos"  flat dark class="pestaña-vueltos">
                        <v-form>
                          <v-container>
                            <v-row>
                              <v-flex sm4 style="padding: 5px">
                               <v-text-field class="input-small" v-model="batches.return_001000" 
                                  hint="Billetes de 10 Bs." readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                <v-text-field class="input-small" v-model="batches.return_002000" 
                                  hint="Billetes de 20 Bs." readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.return_005000" 
                                  hint="Billetes de 50 Bs." readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                            </v-row>
                          </v-container>
                        </v-form>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card id="Totales" flat dark class="pestaña-totales">
                        <v-form>
                          <v-container>
                            <v-row>
                              <v-flex sm4 style="padding: 5px">
                               <h3>Transacciones</h3>
                               <v-text-field class="input-small" v-model="batches.totaltx" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                <h3>Monto Total</h3>
                                <v-text-field class="input-small" v-model="batches.totalamount" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Aceptado</h3>
                                  <v-text-field class="input-small" v-model="batches.totalaccepted" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Vuelto Retornado</h3>
                                  <v-text-field class="input-small" v-model="batches.totalreturned" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Disponible</h3>
                                  <v-text-field class="input-small" v-model="batches.totalavailable" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Regalado</h3>
                                  <v-text-field class="input-small" v-model="batches.totalgivenamount" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Total de Pagos</h3>
                                  <v-text-field class="input-small" v-model="batches.totalcollectamount" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Cantidad de Recargas</h3>
                                  <v-text-field class="input-small" v-model="batches.totalrefilloperations" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Monto Recargas</h3>
                                  <v-text-field class="input-small" v-model="batches.totalrefillamount" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Cantidad de Retiros</h3>
                                  <v-text-field class="input-small" v-model="batches.totaldebtamount" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Monto de Retiros</h3>
                                  <v-text-field class="input-small" v-model="batches.totaldebtamount" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                               <v-flex sm4 style="padding: 5px">
                                  <h3>Cantidad de Bloqueos</h3>
                                  <v-text-field class="input-small" v-model="batches.totallocks" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                               <v-flex sm4 style="padding: 5px">
                                  <h3>Total de Tarjetas Dispensadas</h3>
                                  <v-text-field class="input-small" v-model="batches.totalcardsdelivered" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                               <v-flex sm4 style="padding: 5px">
                                  <h3>Cantidad Operaciones Recarga de Tarjetas</h3>
                                  <v-text-field class="input-small" v-model="batches.totalcardrefilloperations" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Cantidad de Tarjetas Recargadas</h3>
                                  <v-text-field class="input-small" v-model="batches.totalcardrefillamount" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Cantidad Operaciones Retiro de Tarjetas</h3>
                                  <v-text-field class="input-small" v-model="batches.totalcardcollectoperations" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <h3>Cantidad de Tarjetas Retiradas</h3>
                                  <v-text-field class="input-small" v-model="batches.totalcardcollectamount" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                              </v-flex>
                            </v-row>
                          </v-container>
                        </v-form>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card id="Estados"  flat dark class="pestaña-estados">
                        <v-form>
                          <v-container>
                            <v-row>
                             <v-flex sm4 style="padding: 5px">
                               <h3>Estado de Scanner</h3>
                               <v-text-field class="input-small" v-model="batches.scannerstatus" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                               <h3>Estado de Sensor de Mov.</h3>
                               <v-text-field class="input-small" v-model="batches.motionsensorstatus" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                               <h3>Estado de Impresora</h3>
                               <v-text-field class="input-small" v-model="batches.printerstatus" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                               <h3>Estado de Aceptador de Efectivo</h3>
                               <v-text-field class="input-small" v-model="batches.cashacceptorstatus" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                               <h3>Estado de Dispensador de Efectivo</h3>
                               <v-text-field class="input-small" v-model="batches.cashchangerstatus" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                               <h3>Estado de Aceptador de Monedas</h3>
                               <v-text-field class="input-small" v-model="batches.coinacceptorstatus" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                               <h3>Estado de Disp. de Monedas</h3>
                               <v-text-field class="input-small" v-model="batches.coinchangerstatus" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                               <h3>Estado de Bloqueo</h3>
                               <v-text-field class="input-small" v-model="batches.blockstatus" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                               <h3>Razón de Bloqueo</h3>
                               <v-text-field class="input-small" v-model="batches.blockreason" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                               <h3>Estado de Dispensador de Tarjetas</h3>
                               <v-text-field class="input-small" v-model="batches.carddispenserstatus" 
                                  readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                            </v-row>
                          </v-container>
                        </v-form>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              <!-- HASTA -->
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" @click="Grabar()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>
<script src="./batches.ts"></script>
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
.btn-small-color{ 
			font-size: 1.4em; /* tamaño de letra */ 
			color: white; /* color de letra */ 
} 
.input-small{ 
			font-size: 1.3em; /* tamaño de letra */ 
} 
.date-small{ 
			font-size: 1.5em; /* tamaño de letra */ 
} 
.datatable-items-small{ 
			font-size: 1.1em; /* tamaño de letra */ 
} 
.pestaña-aceptadores{
  background-color: #264653;
}
.pestaña-dispensadores{
  background-color: #2A9D8F;
}
.pestaña-vueltos{
  background-color: #82C0CC;
}
.pestaña-totales{
  background-color: #F4A261;
}
.pestaña-estados{
  background-color: #E76F51;
}
</style>