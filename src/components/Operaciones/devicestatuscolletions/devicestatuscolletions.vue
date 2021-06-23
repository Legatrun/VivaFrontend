<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Estados</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscardevicestatuscolletions"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstdevicestatuscolletions" 
						:items-per-page="30"
						:search = "buscardevicestatuscolletions" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros desplegados:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.id,lstdevicestatuscolletions, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<!-- <td class="datatable-items-small">{{ props.item.id }}</td> -->
					<!-- <td class="datatable-items-small">{{ FormatDate(props.item.updatetimestamp) }}</td>  -->
					<td class="datatable-items-small">{{ props.item.locationidentification }}</td>
					<td class="datatable-items-small">{{ props.item.deviceidentification }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.createtimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.alarm }}</td>
					<td class="datatable-items-small">{{ props.item.devicestatus }}</td>
					<td class="datatable-items-small">{{ props.item.devicestatusdetail }}</td>
					<td class="datatable-items-small">{{ props.item.operatingmode }}</td>
					<td class="datatable-items-small">{{ props.item.operationname }}</td>
					<!-- <td class="datatable-items-small">{{ FormatDate(props.item.createtimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.operationname }}</td>
					<td class="datatable-items-small">{{ props.item.sequencenumber }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.transporttimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.provideridentification }}</td>
					<td class="datatable-items-small">{{ props.item.providertransactionid }}</td>
					<td class="datatable-items-small">{{ props.item.devicetransactionid }}</td>
					<td class="datatable-items-small">{{ props.item.servicename }}</td> 
					<td class="datatable-items-small">{{ props.item.batchnumber }}</td>
					<td class="datatable-items-small">{{ props.item.transactionid }}</td>
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
					<td class="datatable-items-small">{{ props.item.totalcardsdelivered }}</td>
					<td class="datatable-items-small">{{ props.item.totalcardrefilloperations }}</td>
					<td class="datatable-items-small">{{ props.item.totalcardrefillamount }}</td>
					<td class="datatable-items-small">{{ props.item.totalcardcollectoperations }}</td>
					<td class="datatable-items-small">{{ props.item.totalcardcollectamount }}</td>
					<td class="datatable-items-small">{{ props.item.carddispenserstatus }}</td>
					<td class="datatable-items-small">{{ props.item.cardreaderstatus }}</td>
					<td class="datatable-items-small">{{ props.item.carddispensercount }}</td>-->
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de devicestatuscolletions</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar devicestatuscolletions </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-card dark color="blue-grey darken-3">
					<v-form ref="form" >
						<h2 style="text-align:center; ">Filtros</h2>
						<v-card-text>
						<v-layout wrap>
							<v-flex sm3 style="padding: 0px">
								<v-autocomplete class="input-small" 
											v-model="devicestatuscolletions.id"
											label="Sucursal"
											clearable
											persistent-hint
											required
											outlined>
								</v-autocomplete>
							</v-flex>
							<v-flex sm3 style="padding: 0px">
								<v-autocomplete class="input-small" 
											v-model="devicestatuscolletions.id"
											label="Terminal"
											clearable
											persistent-hint
											required
											outlined>
								</v-autocomplete>
							</v-flex>
							<v-flex sm3 style="padding: 0px">
								<v-autocomplete class="input-small" 
											v-model="devicestatuscolletions.id"
											label="Estado"
											clearable
											persistent-hint
											required
											outlined>
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
					<v-toolbar-title class="font-medium-color" >Estados</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="devicestatuscolletions.id"
												label="ID"
												hint="Ingrese ID"
												placeholder="ID"
												clearable
												persistent-hint
												required
												@input="devicestatuscolletions.id = updateText(devicestatuscolletions.id)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="devicestatuscolletions.id"
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
											v-model="devicestatuscolletions.createtimestamp"
											hint="Ingrese createtimestamp"
											placeholder="CREATETIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="devicestatuscolletions.createtimestamp" no-title @input="menu_createtimestamp = false"></v-date-picker>
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
											v-model="devicestatuscolletions.updatetimestamp"
											hint="Ingrese updatetimestamp"
											placeholder="UPDATETIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="devicestatuscolletions.updatetimestamp" no-title @input="menu_updatetimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.deviceidentification"
											hint="Ingrese DEVICEIDENTIFICATION"
											placeholder="DEVICEIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.deviceidentification = updateText(devicestatuscolletions.deviceidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.locationidentification"
											hint="Ingrese LOCATIONIDENTIFICATION"
											placeholder="LOCATIONIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.locationidentification = updateText(devicestatuscolletions.locationidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.servicename"
											hint="Ingrese SERVICENAME"
											placeholder="SERVICENAME"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.servicename = updateText(devicestatuscolletions.servicename)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.operationname"
											hint="Ingrese OPERATIONNAME"
											placeholder="OPERATIONNAME"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.operationname = updateText(devicestatuscolletions.operationname)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.sequencenumber"
											hint="Ingrese SEQUENCENUMBER"
											placeholder="SEQUENCENUMBER"
											clearable
											persistent-hint
											required
											type="number"
											@input="devicestatuscolletions.sequencenumber = updateText(devicestatuscolletions.sequencenumber)">
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
											v-model="devicestatuscolletions.transporttimestamp"
											hint="Ingrese transporttimestamp"
											placeholder="TRANSPORTTIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="devicestatuscolletions.transporttimestamp" no-title @input="menu_transporttimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.provideridentification"
											hint="Ingrese PROVIDERIDENTIFICATION"
											placeholder="PROVIDERIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.provideridentification = updateText(devicestatuscolletions.provideridentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.providertransactionid"
											hint="Ingrese PROVIDERTRANSACTIONID"
											placeholder="PROVIDERTRANSACTIONID"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.providertransactionid = updateText(devicestatuscolletions.providertransactionid)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.devicetransactionid"
											hint="Ingrese DEVICETRANSACTIONID"
											placeholder="DEVICETRANSACTIONID"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.devicetransactionid = updateText(devicestatuscolletions.devicetransactionid)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.status"
											hint="Ingrese STATUS"
											placeholder="STATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.status = updateText(devicestatuscolletions.status)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.batchnumber"
											hint="Ingrese BATCHNUMBER"
											placeholder="BATCHNUMBER"
											clearable
											persistent-hint
											required
											type="number"
											@input="devicestatuscolletions.batchnumber = updateText(devicestatuscolletions.batchnumber)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.transactionid"
											hint="Ingrese TRANSACTIONID"
											placeholder="TRANSACTIONID"
											clearable
											persistent-hint
											required
											type="number"
											@input="devicestatuscolletions.transactionid = updateText(devicestatuscolletions.transactionid)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.alarm"
											hint="Ingrese ALARM"
											placeholder="ALARM"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.alarm = updateText(devicestatuscolletions.alarm)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.devicestatus"
											hint="Ingrese DEVICESTATUS"
											placeholder="DEVICESTATUS"
											clearable
											persistent-hint
											required
											type="number"
											@input="devicestatuscolletions.devicestatus = updateText(devicestatuscolletions.devicestatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.operatingmode"
											hint="Ingrese OPERATINGMODE"
											placeholder="OPERATINGMODE"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.operatingmode = updateText(devicestatuscolletions.operatingmode)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.alarmid"
											hint="Ingrese ALARMID"
											placeholder="ALARMID"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.alarmid = updateText(devicestatuscolletions.alarmid)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.aceptordetail"
											hint="Ingrese ACEPTORDETAIL"
											placeholder="ACEPTORDETAIL"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.aceptordetail = updateText(devicestatuscolletions.aceptordetail)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.changerdetail"
											hint="Ingrese CHANGERDETAIL"
											placeholder="CHANGERDETAIL"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.changerdetail = updateText(devicestatuscolletions.changerdetail)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.returndetail"
											hint="Ingrese RETURNDETAIL"
											placeholder="RETURNDETAIL"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.returndetail = updateText(devicestatuscolletions.returndetail)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.operativeday"
											hint="Ingrese OPERATIVEDAY"
											placeholder="OPERATIVEDAY"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.operativeday = updateText(devicestatuscolletions.operativeday)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totaltx"
											hint="Ingrese TOTALTX"
											placeholder="TOTALTX"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totaltx = updateText(devicestatuscolletions.totaltx)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalamount"
											hint="Ingrese TOTALAMOUNT"
											placeholder="TOTALAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalamount = updateText(devicestatuscolletions.totalamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalaccepted"
											hint="Ingrese TOTALACCEPTED"
											placeholder="TOTALACCEPTED"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalaccepted = updateText(devicestatuscolletions.totalaccepted)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalreturned"
											hint="Ingrese TOTALRETURNED"
											placeholder="TOTALRETURNED"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalreturned = updateText(devicestatuscolletions.totalreturned)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalavailable"
											hint="Ingrese TOTALAVAILABLE"
											placeholder="TOTALAVAILABLE"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalavailable = updateText(devicestatuscolletions.totalavailable)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalgivenamount"
											hint="Ingrese TOTALGIVENAMOUNT"
											placeholder="TOTALGIVENAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalgivenamount = updateText(devicestatuscolletions.totalgivenamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totaldebtamount"
											hint="Ingrese TOTALDEBTAMOUNT"
											placeholder="TOTALDEBTAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totaldebtamount = updateText(devicestatuscolletions.totaldebtamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalrefilloperations"
											hint="Ingrese TOTALREFILLOPERATIONS"
											placeholder="TOTALREFILLOPERATIONS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalrefilloperations = updateText(devicestatuscolletions.totalrefilloperations)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalrefillamount"
											hint="Ingrese TOTALREFILLAMOUNT"
											placeholder="TOTALREFILLAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalrefillamount = updateText(devicestatuscolletions.totalrefillamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalcollectoperations"
											hint="Ingrese TOTALCOLLECTOPERATIONS"
											placeholder="TOTALCOLLECTOPERATIONS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalcollectoperations = updateText(devicestatuscolletions.totalcollectoperations)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalcollectamount"
											hint="Ingrese TOTALCOLLECTAMOUNT"
											placeholder="TOTALCOLLECTAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalcollectamount = updateText(devicestatuscolletions.totalcollectamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totallocks"
											hint="Ingrese TOTALLOCKS"
											placeholder="TOTALLOCKS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totallocks = updateText(devicestatuscolletions.totallocks)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.opentime"
											hint="Ingrese OPENTIME"
											placeholder="OPENTIME"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.opentime = updateText(devicestatuscolletions.opentime)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.closetime"
											hint="Ingrese CLOSETIME"
											placeholder="CLOSETIME"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.closetime = updateText(devicestatuscolletions.closetime)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.vdmstatus"
											hint="Ingrese VDMSTATUS"
											placeholder="VDMSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.vdmstatus = updateText(devicestatuscolletions.vdmstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.powerstatus"
											hint="Ingrese POWERSTATUS"
											placeholder="POWERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.powerstatus = updateText(devicestatuscolletions.powerstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.scannerstatus"
											hint="Ingrese SCANNERSTATUS"
											placeholder="SCANNERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.scannerstatus = updateText(devicestatuscolletions.scannerstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.motionsensorstatus"
											hint="Ingrese MOTIONSENSORSTATUS"
											placeholder="MOTIONSENSORSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.motionsensorstatus = updateText(devicestatuscolletions.motionsensorstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.printerstatus"
											hint="Ingrese PRINTERSTATUS"
											placeholder="PRINTERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.printerstatus = updateText(devicestatuscolletions.printerstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.cashacceptorstatus"
											hint="Ingrese CASHACCEPTORSTATUS"
											placeholder="CASHACCEPTORSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.cashacceptorstatus = updateText(devicestatuscolletions.cashacceptorstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.cashchangerstatus"
											hint="Ingrese CASHCHANGERSTATUS"
											placeholder="CASHCHANGERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.cashchangerstatus = updateText(devicestatuscolletions.cashchangerstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.coinacceptorstatus"
											hint="Ingrese COINACCEPTORSTATUS"
											placeholder="COINACCEPTORSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.coinacceptorstatus = updateText(devicestatuscolletions.coinacceptorstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.coinchangerstatus"
											hint="Ingrese COINCHANGERSTATUS"
											placeholder="COINCHANGERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.coinchangerstatus = updateText(devicestatuscolletions.coinchangerstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.devicestatusdetail"
											hint="Ingrese DEVICESTATUSDETAIL"
											placeholder="DEVICESTATUSDETAIL"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.devicestatusdetail = updateText(devicestatuscolletions.devicestatusdetail)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalcardsdelivered"
											hint="Ingrese TOTALCARDSDELIVERED"
											placeholder="TOTALCARDSDELIVERED"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalcardsdelivered = updateText(devicestatuscolletions.totalcardsdelivered)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalcardrefilloperations"
											hint="Ingrese TOTALCARDREFILLOPERATIONS"
											placeholder="TOTALCARDREFILLOPERATIONS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalcardrefilloperations = updateText(devicestatuscolletions.totalcardrefilloperations)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalcardrefillamount"
											hint="Ingrese TOTALCARDREFILLAMOUNT"
											placeholder="TOTALCARDREFILLAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalcardrefillamount = updateText(devicestatuscolletions.totalcardrefillamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalcardcollectoperations"
											hint="Ingrese TOTALCARDCOLLECTOPERATIONS"
											placeholder="TOTALCARDCOLLECTOPERATIONS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalcardcollectoperations = updateText(devicestatuscolletions.totalcardcollectoperations)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.totalcardcollectamount"
											hint="Ingrese TOTALCARDCOLLECTAMOUNT"
											placeholder="TOTALCARDCOLLECTAMOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.totalcardcollectamount = updateText(devicestatuscolletions.totalcardcollectamount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.carddispenserstatus"
											hint="Ingrese CARDDISPENSERSTATUS"
											placeholder="CARDDISPENSERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.carddispenserstatus = updateText(devicestatuscolletions.carddispenserstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.cardreaderstatus"
											hint="Ingrese CARDREADERSTATUS"
											placeholder="CARDREADERSTATUS"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.cardreaderstatus = updateText(devicestatuscolletions.cardreaderstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devicestatuscolletions.carddispensercount"
											hint="Ingrese CARDDISPENSERCOUNT"
											placeholder="CARDDISPENSERCOUNT"
											clearable
											persistent-hint
											required
											@input="devicestatuscolletions.carddispensercount = updateText(devicestatuscolletions.carddispensercount)">
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

<script src="./devicestatuscolletions.ts"></script>
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
