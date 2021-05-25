<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Lotes</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscarbatches"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstbatches" 
						:items-per-page="30"
						:search = "buscarbatches" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
          <td class="datatable-items-small">
            {{ props.item.locationidentification }}
          </td>
          <td class="datatable-items-small">
            {{ props.item.deviceidentification }}
          </td>
					<td class="datatable-items-small">
            {{ props.item.status }}
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
								<v-btn color="btnedit" v-on="on" small dark  @click="Actualizar(props.item)"><v-icon>mdi-comment-eye</v-icon>Revisar</v-btn>
							</template>
							<span>Ver datos del lote</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top >
				<v-card flat>
					<v-form>
						<v-container>
							<v-row>
								<v-flex sm4 style="padding:5px" class="input-small">
									<v-autocomplete
									label="Sucursal"
									clearable
									outlined
									parsisten-hint
									required
									>
									</v-autocomplete>
								</v-flex>
								<v-flex sm4 style="padding:5px" class="input-small">
									<v-autocomplete
									label="Terminal"
									clearable
									outlined
									parsisten-hint
									required
									>
									</v-autocomplete>
								</v-flex>
								</v-row>
								<v-row>
								<v-flex sm3 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_createtimestamp"
										v-model="menu_createtimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="batches.createtimestamp"
											label="Fecha Desde"
											outlined
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="batches.createtimestamp" no-title @input="menu_createtimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm3 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_updatetimestamp"
										v-model="menu_updatetimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="batches.updatetimestamp"
											label="Fecha Hasta"
											outlined
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="batches.updatetimestamp" no-title @input="menu_updatetimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-spacer></v-spacer>
						<v-card-actions>
							<v-flex sm1.5 style="padding: 5px" text-xs-left>
								<v-btn small color="#808B96" dark>
									<v-icon>mdi-monitor-clean</v-icon> 
									 Limpiar
							    </v-btn>
								&nbsp;
								<v-btn small color="cyan" dark>
									<v-icon>mdi-selection-search</v-icon> 
									 Buscar
							    </v-btn>
							</v-flex>
						</v-card-actions>
						</v-row>
						</v-container>
					</v-form>
				</v-card>
			</template>
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
		</v-data-table>
		<v-dialog v-model="dialog" max-width="55%">
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
                  v-model="batches.status"
                  hint="Solo lectura"
                  placeholder="Estado"
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
                <v-toolbar color="#FFC300" >
                  <v-toolbar-title class="font-medium-color">Contadores</v-toolbar-title>
                </v-toolbar>
                 <!-- DESDE -->
                <v-tabs
                  color="white"
                  dark
                  slider-color="green"
                  background-color="blue"
                  style="border:solid;"
                >
                  <v-tab ripple>Aceptadores</v-tab>
                  <v-tab ripple>Dispensadores</v-tab>
                  <v-tab ripple>Vueltos</v-tab>
                  <v-tab ripple>Totales</v-tab>
                  <v-tab ripple>Estados</v-tab>
                  <v-tab-item>
                    <v-card flat dark style="background-color:#264653">
                        <v-form>
                          <v-container>
                            <v-row>
                              <v-flex sm4 style="padding: 5px">
                               <v-text-field class="input-small" v-model="batches.aceptor_001000" 
                                  hint="10" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                <v-text-field class="input-small" v-model="batches.aceptor_002000" 
                                  hint="20" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.aceptor_005000" 
                                  hint="50" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.aceptor_010000" 
                                  hint="100" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.aceptor_020000" 
                                  hint="200" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                            </v-row>
                          </v-container>
                        </v-form>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat dark style="background-color:#2A9D8F">
                        <v-form>
                          <v-container>
                            <v-row>
                              <v-flex sm4 style="padding: 5px">
                               <v-text-field class="input-small" v-model="batches.return_001000" 
                                  hint="10" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                <v-text-field class="input-small" v-model="batches.return_002000" 
                                  hint="20" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.return_005000" 
                                  hint="50" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.totalcardsdelivered" 
                                  hint="Tarjetas" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                            </v-row>
                          </v-container>
                        </v-form>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat dark style="background-color:#82C0CC">
                        <v-form>
                          <v-container>
                            <v-row>
                              <v-flex sm4 style="padding: 5px">
                               <v-text-field class="input-small" v-model="batches.return_001000" 
                                  hint="10" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                <v-text-field class="input-small" v-model="batches.return_002000" 
                                  hint="20" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.return_005000" 
                                  hint="50" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.totalcardsdelivered" 
                                  hint="Tarjetas" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                            </v-row>
                          </v-container>
                        </v-form>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat dark style="background-color:#F4A261">
                        <v-form>
                          <v-container>
                            <v-row>
                              <v-flex sm4 style="padding: 5px">
                               <v-text-field class="input-small" v-model="batches.return_001000" 
                                  hint="10" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                <v-text-field class="input-small" v-model="batches.return_002000" 
                                  hint="20" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.return_005000" 
                                  hint="50" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.totalcardsdelivered" 
                                  hint="Tarjetas" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                            </v-row>
                          </v-container>
                        </v-form>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat dark style="background-color:#E76F51">
                        <v-form>
                          <v-container>
                            <v-row>
                              <v-flex sm4 style="padding: 5px">
                               <v-text-field class="input-small" v-model="batches.return_001000" 
                                  hint="10" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                <v-text-field class="input-small" v-model="batches.return_002000" 
                                  hint="20" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.return_005000" 
                                  hint="50" readonly persistent-hint required>
                                </v-text-field>
                              </v-flex>
                              <v-flex sm4 style="padding: 5px">
                                  <v-text-field class="input-small" v-model="batches.totalcardsdelivered" 
                                  hint="Tarjetas" readonly persistent-hint required>
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
			font-size: 1.6em; /* tamaño de letra */ 
} 
.date-small{ 
			font-size: 1.5em; /* tamaño de letra */ 
} 
.datatable-items-small{ 
			font-size: 1.3em; /* tamaño de letra */ 
} 
</style>