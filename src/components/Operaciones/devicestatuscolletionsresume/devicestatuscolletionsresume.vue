<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Estados</v-toolbar-title>
			<v-divider></v-divider>
			<!-- <v-text-field class="input-small"
					v-model="buscardevicestatuscolletionsresume"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field> -->
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstdevicestatuscolletionsresumeprovider" 
						:items-per-page="30"
						:search = "buscardevicestatuscolletionsresume" 
						:loading="loadingTable"
						loading-text="Cargando datos de Estados"
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.id,lstdevicestatuscolletionsresume, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<!-- <td class="datatable-items-small">{{ props.item.id }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.updatetimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.deviceidentification }}</td>
					<td class="datatable-items-small">{{ props.item.locationidentification }}</td>
					<td class="datatable-items-small">{{ props.item.servicename }}</td>
					<td class="datatable-items-small">{{ props.item.operationname }}</td>
					<td class="datatable-items-small">{{ props.item.sequencenumber }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.transporttimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.provideridentification }}</td>
					<td class="datatable-items-small">{{ props.item.providertransactionid }}</td>
					<td class="datatable-items-small">{{ props.item.devicetransactionid }}</td>
					<td class="datatable-items-small">{{ props.item.batchnumber }}</td>
					<td class="datatable-items-small">{{ props.item.transactionid }}</td>
					<td class="datatable-items-small">{{ props.item.alarm }}</td>
					<td class="datatable-items-small">{{ props.item.devicestatus }}</td>
					<td class="datatable-items-small">{{ props.item.operatingmode }}</td>
					<td class="datatable-items-small">{{ props.item.alarmid }}</td>
					<td class="datatable-items-small">{{ props.item.aceptordetail }}</td>
					<td class="datatable-items-small">{{ props.item.changerdetail }}</td>
					<td class="datatable-items-small">{{ props.item.returndetail }}</td>
					<td class="datatable-items-small">{{ props.item.operativeday }}</td>
					<td class="datatable-items-small">{{ props.item.totaltx }}</td>
					<td class="datatable-items-small">{{ props.item.totalamount }}</td>
					<td class="datatable-items-small">{{ props.item.totalaccepted }}</td>
					<td class="datatable-items-small">{{ props.item.totalreturned }}</td>
					<td class="datatable-items-small">{{ props.item.totalavailable }}</td>
					<td class="datatable-items-small">{{ props.item.totalgivenamount }}</td>
					<td class="datatable-items-small">{{ props.item.totaldebtamount }}</td>
					<td class="datatable-items-small">{{ props.item.totalrefilloperations }}</td>
					<td class="datatable-items-small">{{ props.item.totalrefillamount }}</td>
					<td class="datatable-items-small">{{ props.item.totalcollectoperations }}</td>
					<td class="datatable-items-small">{{ props.item.totalcollectamount }}</td>
					<td class="datatable-items-small">{{ props.item.totallocks }}</td>
					<td class="datatable-items-small">{{ props.item.opentime }}</td>
					<td class="datatable-items-small">{{ props.item.closetime }}</td>
					<td class="datatable-items-small">{{ props.item.vdmstatus }}</td>
					<td class="datatable-items-small">{{ props.item.powerstatus }}</td>
					<td class="datatable-items-small">{{ props.item.scannerstatus }}</td>
					<td class="datatable-items-small">{{ props.item.motionsensorstatus }}</td>
					<td class="datatable-items-small">{{ props.item.printerstatus }}</td>
					<td class="datatable-items-small">{{ props.item.cashacceptorstatus }}</td>
					<td class="datatable-items-small">{{ props.item.cashchangerstatus }}</td>
					<td class="datatable-items-small">{{ props.item.coinacceptorstatus }}</td>
					<td class="datatable-items-small">{{ props.item.coinchangerstatus }}</td>
					<td class="datatable-items-small">{{ props.item.devicestatusdetail }}</td>
					<td class="datatable-items-small">{{ props.item.processid }}</td> -->
					<td class="datatable-items-small">{{ FormatSucursal(props.item.locationidentification) }}</td>
					<td class="datatable-items-small">{{ props.item.deviceidentification }}</td>
					<td class="datatable-items-small">{{ FormatDateTime(props.item.createtimestamp) }}</td>
					<td class="datatable-items-small">{{ FormatAlarma(props.item.alarm) }}</td>
					<td class="datatable-items-small">{{ FormatBloqueo(props.item.devicestatus) }}</td>
					<td class="datatable-items-small">{{ props.item.devicestatusdetail }}</td>
					<td class="datatable-items-small">{{ props.item.operatingmode }}</td>
					<td class="datatable-items-small">{{ props.item.operationname }}</td> 
					<!-- <v-btn :color="colorStatus" fab x-small></v-btn> -->
					<!-- {{ FormatEstado(props.item.operationname) }} -->
					<!-- <td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Ver Estado</span>
						</v-tooltip>
					</td> -->
				</tr>
			</template>
			<template v-slot:top>
				<v-card dark color="blue-grey darken-3">
					<v-form ref="form" >
						<h2 style="text-align:center; ">Filtros</h2>
						<v-card-text>
						<v-layout wrap>
							<v-flex sm3 style="padding: 0px">
											<!-- v-model="devicestatuscolletionsresume.locationidentification" -->
								<v-autocomplete class="input-small" 
											v-model="buscardevicestatuscolletionsresume"
											label="Sucursal"
											clearable
											persistent-hint
											required
											outlined
											:items="lstsucursales"
											item-text="description"
											item-value="identification">
								</v-autocomplete>
							</v-flex>
							<v-flex sm3 style="padding: 0px">
								<v-autocomplete class="input-small" 
											v-model="buscardevicestatuscolletionsresume"
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
							<v-flex sm3 style="padding: 0px">
								<v-autocomplete class="input-small" 
											v-model="buscardevicestatuscolletionsresume"
											label="Estado"
											clearable
											persistent-hint
											required
											outlined
											:items="EstadosDisponibles"
											item-text="estadoDetalle"
											item-value="estadoDetalle">
								</v-autocomplete>
							</v-flex>
							<v-spacer></v-spacer>
							<v-flex sm1.5 style="padding: 0px">
								<v-btn large color="green" dark>
									<v-icon>mdi-selection-search</v-icon> 
									 Buscar
							    </v-btn>
							</v-flex>
							<v-flex sm1.5 style="padding: 0px">
								<v-btn large color="grey" dark>
									<v-icon>mdi-monitor-clean</v-icon> 
									 Limpiar
							    </v-btn>
							</v-flex>
						</v-layout>
						</v-card-text>
					</v-form>
				</v-card>
				   <v-flex sm12>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn dark left color="orange" fab small v-on="on" @click="cargar_data()"><v-icon>mdi-update</v-icon></v-btn>
							</template>
							<span>Actualizar</span>
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
		<v-dialog v-model="dialog" persistent max-width="50%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title class="font-medium-color" >Formulario de devicestatuscolletionsresume</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="devicestatuscolletionsresume.id"
												label="ID"
												hint="Ingrese ID"
												placeholder="ID"
												clearable
												persistent-hint
												required
												@input="devicestatuscolletionsresume.id = updateText(devicestatuscolletionsresume.id)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="devicestatuscolletionsresume.id"
												label="ID"
												placeholder="ID"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
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
											v-model="devicestatuscolletionsresume.createtimestamp"
											hint="Ingrese createtimestamp"
											placeholder="CREATETIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="devicestatuscolletionsresume.createtimestamp" no-title @input="menu_createtimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
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
											v-model="devicestatuscolletionsresume.updatetimestamp"
											hint="Ingrese updatetimestamp"
											placeholder="UPDATETIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="devicestatuscolletionsresume.updatetimestamp" no-title @input="menu_updatetimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.deviceidentification"
											hint="Ingrese DEVICEIDENTIFICATION"
											placeholder="DEVICEIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.deviceidentification = updateText(devicestatuscolletionsresume.deviceidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.locationidentification"
											hint="Ingrese LOCATIONIDENTIFICATION"
											placeholder="LOCATIONIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.locationidentification = updateText(devicestatuscolletionsresume.locationidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.servicename"
											hint="Ingrese SERVICENAME"
											placeholder="SERVICENAME"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.servicename = updateText(devicestatuscolletionsresume.servicename)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.operationname"
											hint="Ingrese OPERATIONNAME"
											placeholder="OPERATIONNAME"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.operationname = updateText(devicestatuscolletionsresume.operationname)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.sequencenumber"
											hint="Ingrese SEQUENCENUMBER"
											placeholder="SEQUENCENUMBER"
											clearable
											persistent-hint
											required
											type="number"
											@input="devicestatuscolletionsresume.sequencenumber = updateText(devicestatuscolletionsresume.sequencenumber)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_transporttimestamp"
										v-model="menu_transporttimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="devicestatuscolletionsresume.transporttimestamp"
											hint="Ingrese transporttimestamp"
											placeholder="TRANSPORTTIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="devicestatuscolletionsresume.transporttimestamp" no-title @input="menu_transporttimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.provideridentification"
											hint="Ingrese PROVIDERIDENTIFICATION"
											placeholder="PROVIDERIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.provideridentification = updateText(devicestatuscolletionsresume.provideridentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.providertransactionid"
											hint="Ingrese PROVIDERTRANSACTIONID"
											placeholder="PROVIDERTRANSACTIONID"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.providertransactionid = updateText(devicestatuscolletionsresume.providertransactionid)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.devicetransactionid"
											hint="Ingrese DEVICETRANSACTIONID"
											placeholder="DEVICETRANSACTIONID"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.devicetransactionid = updateText(devicestatuscolletionsresume.devicetransactionid)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.batchnumber"
											hint="Ingrese BATCHNUMBER"
											placeholder="BATCHNUMBER"
											clearable
											persistent-hint
											required
											type="number"
											@input="devicestatuscolletionsresume.batchnumber = updateText(devicestatuscolletionsresume.batchnumber)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.transactionid"
											hint="Ingrese TRANSACTIONID"
											placeholder="TRANSACTIONID"
											clearable
											persistent-hint
											required
											type="number"
											@input="devicestatuscolletionsresume.transactionid = updateText(devicestatuscolletionsresume.transactionid)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.alarm"
											hint="Ingrese ALARM"
											placeholder="ALARM"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.alarm = updateText(devicestatuscolletionsresume.alarm)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.devicestatus"
											hint="Ingrese DEVICESTATUS"
											placeholder="DEVICESTATUS"
											clearable
											persistent-hint
											required
											type="number"
											@input="devicestatuscolletionsresume.devicestatus = updateText(devicestatuscolletionsresume.devicestatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.operatingmode"
											hint="Ingrese OPERATINGMODE"
											placeholder="OPERATINGMODE"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.operatingmode = updateText(devicestatuscolletionsresume.operatingmode)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.alarmid"
											hint="Ingrese ALARMID"
											placeholder="ALARMID"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.alarmid = updateText(devicestatuscolletionsresume.alarmid)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.aceptordetail"
											hint="Ingrese ACEPTORDETAIL"
											placeholder="ACEPTORDETAIL"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.aceptordetail = updateText(devicestatuscolletionsresume.aceptordetail)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.changerdetail"
											hint="Ingrese CHANGERDETAIL"
											placeholder="CHANGERDETAIL"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.changerdetail = updateText(devicestatuscolletionsresume.changerdetail)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.returndetail"
											hint="Ingrese RETURNDETAIL"
											placeholder="RETURNDETAIL"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.returndetail = updateText(devicestatuscolletionsresume.returndetail)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.operativeday"
											hint="Ingrese OPERATIVEDAY"
											placeholder="OPERATIVEDAY"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.operativeday = updateText(devicestatuscolletionsresume.operativeday)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totaltx"
											hint="Ingrese TOTALTX"
											placeholder="TOTALTX"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totaltx = updateText(devicestatuscolletionsresume.totaltx)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totalamount"
											hint="Ingrese TOTALAMOUNT"
											placeholder="TOTALAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totalamount = updateText(devicestatuscolletionsresume.totalamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totalaccepted"
											hint="Ingrese TOTALACCEPTED"
											placeholder="TOTALACCEPTED"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totalaccepted = updateText(devicestatuscolletionsresume.totalaccepted)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totalreturned"
											hint="Ingrese TOTALRETURNED"
											placeholder="TOTALRETURNED"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totalreturned = updateText(devicestatuscolletionsresume.totalreturned)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totalavailable"
											hint="Ingrese TOTALAVAILABLE"
											placeholder="TOTALAVAILABLE"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totalavailable = updateText(devicestatuscolletionsresume.totalavailable)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totalgivenamount"
											hint="Ingrese TOTALGIVENAMOUNT"
											placeholder="TOTALGIVENAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totalgivenamount = updateText(devicestatuscolletionsresume.totalgivenamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totaldebtamount"
											hint="Ingrese TOTALDEBTAMOUNT"
											placeholder="TOTALDEBTAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totaldebtamount = updateText(devicestatuscolletionsresume.totaldebtamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totalrefilloperations"
											hint="Ingrese TOTALREFILLOPERATIONS"
											placeholder="TOTALREFILLOPERATIONS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totalrefilloperations = updateText(devicestatuscolletionsresume.totalrefilloperations)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totalrefillamount"
											hint="Ingrese TOTALREFILLAMOUNT"
											placeholder="TOTALREFILLAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totalrefillamount = updateText(devicestatuscolletionsresume.totalrefillamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totalcollectoperations"
											hint="Ingrese TOTALCOLLECTOPERATIONS"
											placeholder="TOTALCOLLECTOPERATIONS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totalcollectoperations = updateText(devicestatuscolletionsresume.totalcollectoperations)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totalcollectamount"
											hint="Ingrese TOTALCOLLECTAMOUNT"
											placeholder="TOTALCOLLECTAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totalcollectamount = updateText(devicestatuscolletionsresume.totalcollectamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.totallocks"
											hint="Ingrese TOTALLOCKS"
											placeholder="TOTALLOCKS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.totallocks = updateText(devicestatuscolletionsresume.totallocks)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.opentime"
											hint="Ingrese OPENTIME"
											placeholder="OPENTIME"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.opentime = updateText(devicestatuscolletionsresume.opentime)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.closetime"
											hint="Ingrese CLOSETIME"
											placeholder="CLOSETIME"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.closetime = updateText(devicestatuscolletionsresume.closetime)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.vdmstatus"
											hint="Ingrese VDMSTATUS"
											placeholder="VDMSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.vdmstatus = updateText(devicestatuscolletionsresume.vdmstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.powerstatus"
											hint="Ingrese POWERSTATUS"
											placeholder="POWERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.powerstatus = updateText(devicestatuscolletionsresume.powerstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.scannerstatus"
											hint="Ingrese SCANNERSTATUS"
											placeholder="SCANNERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.scannerstatus = updateText(devicestatuscolletionsresume.scannerstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.motionsensorstatus"
											hint="Ingrese MOTIONSENSORSTATUS"
											placeholder="MOTIONSENSORSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.motionsensorstatus = updateText(devicestatuscolletionsresume.motionsensorstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.printerstatus"
											hint="Ingrese PRINTERSTATUS"
											placeholder="PRINTERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.printerstatus = updateText(devicestatuscolletionsresume.printerstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.cashacceptorstatus"
											hint="Ingrese CASHACCEPTORSTATUS"
											placeholder="CASHACCEPTORSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.cashacceptorstatus = updateText(devicestatuscolletionsresume.cashacceptorstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.cashchangerstatus"
											hint="Ingrese CASHCHANGERSTATUS"
											placeholder="CASHCHANGERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.cashchangerstatus = updateText(devicestatuscolletionsresume.cashchangerstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.coinacceptorstatus"
											hint="Ingrese COINACCEPTORSTATUS"
											placeholder="COINACCEPTORSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.coinacceptorstatus = updateText(devicestatuscolletionsresume.coinacceptorstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.coinchangerstatus"
											hint="Ingrese COINCHANGERSTATUS"
											placeholder="COINCHANGERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.coinchangerstatus = updateText(devicestatuscolletionsresume.coinchangerstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.devicestatusdetail"
											hint="Ingrese DEVICESTATUSDETAIL"
											placeholder="DEVICESTATUSDETAIL"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletionsresume.devicestatusdetail = updateText(devicestatuscolletionsresume.devicestatusdetail)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletionsresume.processid"
											hint="Ingrese PROCESSID"
											placeholder="PROCESSID"
											clearable
											persistent-hint
											required
											type="number"
											@input="devicestatuscolletionsresume.processid = updateText(devicestatuscolletionsresume.processid)">
								</v-text-field>
							</v-flex>
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

<script src="./devicestatuscolletionsresume.ts"></script>
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
			font-size: 1em; /* tamaño de letra */ 
} 
</style> 
