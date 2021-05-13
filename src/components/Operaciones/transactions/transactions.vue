<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Transacciones</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscartransactions"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lsttransactions" 
						:items-per-page="30"
						:search = "buscartransactions" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.id,lsttransactions, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<!-- <td class="datatable-items-small">{{ props.item.id }}</td> -->
					<!-- <td class="datatable-items-small">{{ FormatDate(props.item.updatetimestamp) }}</td> -->
					<td class="datatable-items-small">{{ FormatDate(props.item.createtimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.locationidentification }}</td>
					<td class="datatable-items-small">{{ props.item.deviceidentification }}</td>
					<!-- <td class="datatable-items-small">{{ props.item.servicename }}</td> -->
					<td class="datatable-items-small">{{ props.item.operationname }}</td>
					<!-- <td class="datatable-items-small">{{ FormatDate(props.item.transporttimestamp) }}</td> -->
					<td class="datatable-items-small">{{ props.item.customernumber }}</td>
					<!-- <td class="datatable-items-small">{{ props.item.sequencenumber }}</td> -->
					<td class="datatable-items-small">{{ props.item.transactionidentification }}</td>
					<td class="datatable-items-small">{{ props.item.amount }}</td>
					<td class="datatable-items-small">{{ props.item.resultcode }}</td>
					<td class="datatable-items-small">{{ props.item.amountreturned }}</td>
					<td class="datatable-items-small">{{ props.item.amountticketundelivered }}</td>
					<td class="datatable-items-small">{{ props.item.amountentereddetail }}</td>
					<td class="datatable-items-small">{{ props.item.amountticketundelivereddetail }}</td>
					<!-- <td class="datatable-items-small">{{ props.item.amountreturneddetail }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.payloadrequest }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.payloadanswer }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.resultmessage }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.provideridentification }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.providertransactionid }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.devicetransactionid }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.providerresultcode }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.providerresultmessage }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.batchnumber }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.syncstatus }}</td> -->
					<!-- <td class="datatable-items-small">{{ FormatDate(props.item.synctimestamp) }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.deviceidentificationprovider }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.locationidentificationprovider }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.amountentered }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.operationstatus }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.customercode }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.canceled }}</td> -->
					<!-- <td class="datatable-items-small">{{ FormatDate(props.item.canceledtimestamp) }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.providersequencenumber }}</td> -->
					<!-- <td class="datatable-items-small">{{ props.item.cardsdispensed }}</td> -->
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de transactions</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar transactions </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
					</template>
					<span>Adicionar nuevo registro de Transacción</span>
				</v-tooltip>
			</template>
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
		</v-data-table>
		<v-dialog v-model="dialog" persistent max-width="65%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title class="font-medium-color" >Transacciones</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="Cancelar()">X</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
							</template>
							<template v-else>
							</template>
							<v-flex sm4 style="padding: 5px">
								<v-autocomplete class="input-small" 
											v-model="transactions.deviceidentification"
											label="Terminal"
											clearable
											persistent-hint
											required
											>
								</v-autocomplete>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-autocomplete class="input-small" 
											v-model="transactions.locationidentification"
											label="Sucursal"
											clearable
											persistent-hint
											required
											>
								</v-autocomplete>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.operationname"
											label="Tipo de Transacción"
											clearable
											persistent-hint
											required
											@input="transactions.operationname = updateText(transactions.operationname)">
								</v-text-field>
							</v-flex>
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
											v-model="transactions.createtimestamp"
											label="Fecha"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="transactions.createtimestamp" no-title @input="menu_createtimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.resultcode"
											label="Código de Resultado"
											clearable
											persistent-hint
											required
											@input="transactions.resultcode = updateText(transactions.resultcode)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.resultmessage"
											label="Mensaje"
											clearable
											persistent-hint
											required
											@input="transactions.resultmessage = updateText(transactions.resultmessage)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.transactionidentification"
											label="Recibo #"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.transactionidentification = updateText(transactions.transactionidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.providerresultcode"
											label="Código de Resultado Proveedor"
											clearable
											persistent-hint
											required
											@input="transactions.providerresultcode = updateText(transactions.providerresultcode)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.providerresultmessage"
											label="Mensaje de Proveedor"
											clearable
											persistent-hint
											required
											@input="transactions.providerresultmessage = updateText(transactions.providerresultmessage)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.customernumber"
											label="Número de Cliente"
											clearable
											persistent-hint
											required
											@input="transactions.customernumber = updateText(transactions.customernumber)">
								</v-text-field>
							</v-flex>
								<v-flex sm6 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.customercode"
											label="Código de Cliente"
											clearable
											persistent-hint
											required
											@input="transactions.customercode = updateText(transactions.customercode)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.amount"
											hint="Ingrese AMOUNT"
											label="AMOUNT"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.amount = updateText(transactions.amount)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.amountentered"
											label="Monto Pagado"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.amountentered = updateText(transactions.amountentered)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.amountentereddetail"
											placeholder="Detalle de Monto Recibido"
											clearable
											persistent-hint
											required
											@input="transactions.amountentereddetail = updateText(transactions.amountentereddetail)">
								</v-text-field>
							</v-flex>

							<!-- AQUI -->

							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.servicename"
											hint="Ingrese SERVICENAME"
											label="SERVICENAME"
											clearable
											persistent-hint
											required
											@input="transactions.servicename = updateText(transactions.servicename)">
								</v-text-field>
							</v-flex>
							
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.sequencenumber"
											hint="Ingrese SEQUENCENUMBER"
											label="SEQUENCENUMBER"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.sequencenumber = updateText(transactions.sequencenumber)">
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
											v-model="transactions.transporttimestamp"
											hint="Ingrese transporttimestamp"
											label="TRANSPORTTIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="transactions.transporttimestamp" no-title @input="menu_transporttimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.payloadrequest"
											hint="Ingrese PAYLOADREQUEST"
											label="PAYLOADREQUEST"
											clearable
											persistent-hint
											required
											@input="transactions.payloadrequest = updateText(transactions.payloadrequest)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.payloadanswer"
											hint="Ingrese PAYLOADANSWER"
											label="PAYLOADANSWER"
											clearable
											persistent-hint
											required
											@input="transactions.payloadanswer = updateText(transactions.payloadanswer)">
								</v-text-field>
							</v-flex>
							
							
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.provideridentification"
											hint="Ingrese PROVIDERIDENTIFICATION"
											label="PROVIDERIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="transactions.provideridentification = updateText(transactions.provideridentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.providertransactionid"
											hint="Ingrese PROVIDERTRANSACTIONID"
											label="PROVIDERTRANSACTIONID"
											clearable
											persistent-hint
											required
											@input="transactions.providertransactionid = updateText(transactions.providertransactionid)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.devicetransactionid"
											hint="Ingrese DEVICETRANSACTIONID"
											label="DEVICETRANSACTIONID"
											clearable
											persistent-hint
											required
											@input="transactions.devicetransactionid = updateText(transactions.devicetransactionid)">
								</v-text-field>
							</v-flex>
							
							
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.batchnumber"
											hint="Ingrese BATCHNUMBER"
											label="BATCHNUMBER"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.batchnumber = updateText(transactions.batchnumber)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.syncstatus"
											hint="Ingrese SYNCSTATUS"
											label="SYNCSTATUS"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.syncstatus = updateText(transactions.syncstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_synctimestamp"
										v-model="menu_synctimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="transactions.synctimestamp"
											hint="Ingrese synctimestamp"
											label="SYNCTIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="transactions.synctimestamp" no-title @input="menu_synctimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.deviceidentificationprovider"
											hint="Ingrese DEVICEIDENTIFICATIONPROVIDER"
											label="DEVICEIDENTIFICATIONPROVIDER"
											clearable
											persistent-hint
											required
											@input="transactions.deviceidentificationprovider = updateText(transactions.deviceidentificationprovider)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.locationidentificationprovider"
											hint="Ingrese LOCATIONIDENTIFICATIONPROVIDER"
											label="LOCATIONIDENTIFICATIONPROVIDER"
											clearable
											persistent-hint
											required
											@input="transactions.locationidentificationprovider = updateText(transactions.locationidentificationprovider)">
								</v-text-field>
							</v-flex>
							
							
							
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.amountreturned"
											hint="Ingrese AMOUNTRETURNED"
											label="AMOUNTRETURNED"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.amountreturned = updateText(transactions.amountreturned)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.amountticketundelivered"
											hint="Ingrese AMOUNTTICKETUNDELIVERED"
											label="AMOUNTTICKETUNDELIVERED"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.amountticketundelivered = updateText(transactions.amountticketundelivered)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.operationstatus"
											hint="Ingrese OPERATIONSTATUS"
											placeholder="OPERATIONSTATUS"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.operationstatus = updateText(transactions.operationstatus)">
								</v-text-field>
							</v-flex>
							
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.amountreturneddetail"
											hint="Ingrese AMOUNTRETURNEDDETAIL"
											placeholder="AMOUNTRETURNEDDETAIL"
											clearable
											persistent-hint
											required
											@input="transactions.amountreturneddetail = updateText(transactions.amountreturneddetail)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.amountticketundelivereddetail"
											hint="Ingrese AMOUNTTICKETUNDELIVEREDDETAIL"
											placeholder="AMOUNTTICKETUNDELIVEREDDETAIL"
											clearable
											persistent-hint
											required
											@input="transactions.amountticketundelivereddetail = updateText(transactions.amountticketundelivereddetail)">
								</v-text-field>
							</v-flex>
							
						
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.canceled"
											hint="Ingrese CANCELED"
											placeholder="CANCELED"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.canceled = updateText(transactions.canceled)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_canceledtimestamp"
										v-model="menu_canceledtimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="transactions.canceledtimestamp"
											hint="Ingrese canceledtimestamp"
											placeholder="CANCELEDTIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="transactions.canceledtimestamp" no-title @input="menu_canceledtimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.providersequencenumber"
											hint="Ingrese PROVIDERSEQUENCENUMBER"
											placeholder="PROVIDERSEQUENCENUMBER"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.providersequencenumber = updateText(transactions.providersequencenumber)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="transactions.cardsdispensed"
											hint="Ingrese CARDSDISPENSED"
											placeholder="CARDSDISPENSED"
											clearable
											persistent-hint
											required
											type="number"
											@input="transactions.cardsdispensed = updateText(transactions.cardsdispensed)">
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
