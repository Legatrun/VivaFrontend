<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Terminales</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscardevices"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstdevices" 
						:items-per-page="30"
						:search = "buscardevices" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.identification,lstdevices, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td class="datatable-items-small">{{ props.item.identification }}</td>
					<td class="datatable-items-small">{{ props.item.description }}</td>
					<td class="datatable-items-small">{{ props.item.devicetypeidentification }}</td>
					<td class="datatable-items-small">{{FormatBoolean(props.item.enabled)  }}</td>
					<!--
					<td class="datatable-items-small">{{ FormatDate(props.item.createtimestamp) }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.updatetimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.createuser }}</td>
					<td class="datatable-items-small">{{ props.item.updateuser }}</td>
					<td class="datatable-items-small">{{ props.item.configuration }}</td>
					<td class="datatable-items-small">{{ props.item.identificationprovider }}</td>
					<td class="datatable-items-small">{{ props.item.locationidentification }}</td>
					<td class="datatable-items-small">{{ props.item.coinacceptordenoms }}</td>
					<td class="datatable-items-small">{{ props.item.cashacceptordenoms }}</td>
					<td class="datatable-items-small">{{ props.item.maxamountodispense }}</td>
					<td class="datatable-items-small">{{ props.item.maxbillstodispense }}</td>
					<td class="datatable-items-small">{{ props.item.maxcoinstodispense }}</td>
					<td class="datatable-items-small">{{ props.item.video_intro }}</td>
					<td class="datatable-items-small">{{ props.item.video_insert_cash }}</td>
					<td class="datatable-items-small">{{ props.item.video_take_cash }}</td>
					<td class="datatable-items-small">{{ props.item.video_take_cash_chash_receipt }}</td>
					<td class="datatable-items-small">{{ props.item.video_read_barcode }}</td>
					<td class="datatable-items-small">{{ props.item.payment_success }}</td>
					<td class="datatable-items-small">{{ props.item.payment_cancel }}</td>
					<td class="datatable-items-small">{{ props.item.final_success }}</td>
					<td class="datatable-items-small">{{ props.item.cashacceptorfullalarm }}</td>
					<td class="datatable-items-small">{{ props.item.cashacceptorfulllimit }}</td>
					<td class="datatable-items-small">{{ props.item.coinacceptorfullalarm }}</td>
					<td class="datatable-items-small">{{ props.item.coinacceptorfulllimit }}</td>
					<td class="datatable-items-small">{{ props.item.cashchangeremptyalarm }}</td>
					<td class="datatable-items-small">{{ props.item.cashchangeremptylimit }}</td>
					<td class="datatable-items-small">{{ props.item.cashchangersecuritystock }}</td>
					<td class="datatable-items-small">{{ props.item.coinchangeremptyalarm }}</td>
					<td class="datatable-items-small">{{ props.item.coinchangeremptylimit }}</td>
					<td class="datatable-items-small">{{ props.item.coinchangersecuritystock }}</td>
					<td class="datatable-items-small">{{ props.item.carddispenseremptylimit }}</td>
					<td class="datatable-items-small">{{ props.item.carddispenseremptyalarm }}</td>
					<td class="datatable-items-small">{{ props.item.emptydenomblockcondition1 }}</td>
					<td class="datatable-items-small">{{ props.item.emptydenomblockcondition2 }}</td>
					<td class="datatable-items-small">{{ props.item.emptydenomblockcondition3 }}</td>
					<td class="datatable-items-small">{{ props.item.emptydenomblockcondition4 }}</td>
					<td class="datatable-items-small">{{ props.item.totalchangeemptyalarm }}</td>
					<td class="datatable-items-small">{{ props.item.totalchangeemptylimit }}</td>
					<td class="datatable-items-small">{{ props.item.scp_statusinterval }}</td>
					<td class="datatable-items-small">{{ props.item.sct_step }}</td>
					<td class="datatable-items-small">{{ props.item.sct_changevalidatoramount }}</td>
					<td class="datatable-items-small">{{ props.item.sct_finishscreentimeout }}</td>
					<td class="datatable-items-small">{{ props.item.cashchangerfill }}</td>
					<td class="datatable-items-small">{{ props.item.coinchangerfill }}</td>
					<td class="datatable-items-small">{{ props.item.coinchangerdenoms }}</td>
					<td class="datatable-items-small">{{ props.item.cashchangerdenoms }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.lastreporttimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.laststatusreported }}</td>
					<td class="datatable-items-small">{{ props.item.serviceuser }}</td>
					<td class="datatable-items-small">{{ props.item.operatorcode }}</td>
					-->
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de Terminal</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Terminal </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
					</template>
					<span>Adicionar nuevo registro de Terminal</span>
				</v-tooltip>
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
					<v-toolbar-title class="font-medium-color" >Terminales</v-toolbar-title>
						<v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="Cancelar()">X</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm6 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="devices.identification"
												label="Terminal"
												outlined
												dense
												clearable
												persistent-hint
												:rules="Rules"
												@input="devices.identification = updateText(devices.identification)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm6 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="devices.identification"
												label="Terminal"
												outlined
												readonly
												persistent-hint>
									</v-text-field>
									<!-- por parte de billpaymente ncr   -->
								</v-flex>
							</template>
							<v-flex sm6 style="padding: 5px">
								<v-textarea class="input-small" 
											v-model="devices.description"
											label=" Descripcion"
											outlined
											dense
											clearable
											persistent-hint
											required
											:rules="Rules"
											@input="devices.description = updateText(devices.description)">
								</v-textarea>
							</v-flex>
								<v-flex sm6 style="padding: 5px">
								<v-autocomplete class="input-small" 
											v-model="devices.enabled"
											label="Habilitada"
											:items="listahbil"
											item-text="habilitado"
											item-value="value"
											outlined
											dense
											autocomplete="off"
											:rules="habilitado"
											no-data-text="No se encontro ningun tema"
											>
								</v-autocomplete>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-autocomplete class="input-small" 
											v-model="devices.devicetypeidentification"
											label="Tipo"
											:items="lstdivtype"
											item-text="identification"
											item-value="identification"
											outlined
											dense
											autocomplete="off"
											:rules="validacion"
											no-data-text="No se encontro ningun tema"
											>
								</v-autocomplete>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-autocomplete class="input-small" 
											v-model="devices.locationidentification"
											label="Sucursal"
											:items="lstlocations"
											:item-text="getItem"
											item-value="description"
											autocomplete="off"
											:rules="validacion"
											no-data-text="No se encontro ningun tema"
											outlined
											
											>
								</v-autocomplete>
							</v-flex>
							<!--
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.coinacceptordenoms"
											hint="Ingrese COINACCEPTORDENOMS"
											placeholder="COINACCEPTORDENOMS"
											clearable
											persistent-hint
											required
											@input="devices.coinacceptordenoms = updateText(devices.coinacceptordenoms)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.cashacceptordenoms"
											hint="Ingrese CASHACCEPTORDENOMS"
											placeholder="CASHACCEPTORDENOMS"
											clearable
											persistent-hint
											required
											@input="devices.cashacceptordenoms = updateText(devices.cashacceptordenoms)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.maxamountodispense"
											hint="Ingrese MAXAMOUNTODISPENSE"
											placeholder="MAXAMOUNTODISPENSE"
											clearable
											persistent-hint
											required
											@input="devices.maxamountodispense = updateText(devices.maxamountodispense)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.maxbillstodispense"
											hint="Ingrese MAXBILLSTODISPENSE"
											placeholder="MAXBILLSTODISPENSE"
											clearable
											persistent-hint
											required
											@input="devices.maxbillstodispense = updateText(devices.maxbillstodispense)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.maxcoinstodispense"
											hint="Ingrese MAXCOINSTODISPENSE"
											placeholder="MAXCOINSTODISPENSE"
											clearable
											persistent-hint
											required
											@input="devices.maxcoinstodispense = updateText(devices.maxcoinstodispense)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.video_intro"
											hint="Ingrese VIDEO_INTRO"
											placeholder="VIDEO_INTRO"
											clearable
											persistent-hint
											required
											@input="devices.video_intro = updateText(devices.video_intro)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.video_insert_cash"
											hint="Ingrese VIDEO_INSERT_CASH"
											placeholder="VIDEO_INSERT_CASH"
											clearable
											persistent-hint
											required
											@input="devices.video_insert_cash = updateText(devices.video_insert_cash)">
								</v-text-field>
							</v-flex>

							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.video_take_cash"
											hint="Ingrese VIDEO_TAKE_CASH"
											placeholder="VIDEO_TAKE_CASH"
											clearable
											persistent-hint
											required
											@input="devices.video_take_cash = updateText(devices.video_take_cash)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.video_take_cash_chash_receipt"
											hint="Ingrese VIDEO_TAKE_CASH_CHASH_RECEIPT"
											placeholder="VIDEO_TAKE_CASH_CHASH_RECEIPT"
											clearable
											persistent-hint
											required
											@input="devices.video_take_cash_chash_receipt = updateText(devices.video_take_cash_chash_receipt)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.video_read_barcode"
											hint="Ingrese VIDEO_READ_BARCODE"
											placeholder="VIDEO_READ_BARCODE"
											clearable
											persistent-hint
											required
											@input="devices.video_read_barcode = updateText(devices.video_read_barcode)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.payment_success"
											hint="Ingrese PAYMENT_SUCCESS"
											placeholder="PAYMENT_SUCCESS"
											clearable
											persistent-hint
											required
											@input="devices.payment_success = updateText(devices.payment_success)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.payment_cancel"
											hint="Ingrese PAYMENT_CANCEL"
											placeholder="PAYMENT_CANCEL"
											clearable
											persistent-hint
											required
											@input="devices.payment_cancel = updateText(devices.payment_cancel)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.final_success"
											hint="Ingrese FINAL_SUCCESS"
											placeholder="FINAL_SUCCESS"
											clearable
											persistent-hint
											required
											@input="devices.final_success = updateText(devices.final_success)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.cashacceptorfullalarm"
											hint="Ingrese CASHACCEPTORFULLALARM"
											placeholder="CASHACCEPTORFULLALARM"
											clearable
											persistent-hint
											required
											@input="devices.cashacceptorfullalarm = updateText(devices.cashacceptorfullalarm)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.cashacceptorfulllimit"
											hint="Ingrese CASHACCEPTORFULLLIMIT"
											placeholder="CASHACCEPTORFULLLIMIT"
											clearable
											persistent-hint
											required
											@input="devices.cashacceptorfulllimit = updateText(devices.cashacceptorfulllimit)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.coinacceptorfullalarm"
											hint="Ingrese COINACCEPTORFULLALARM"
											placeholder="COINACCEPTORFULLALARM"
											clearable
											persistent-hint
											required
											@input="devices.coinacceptorfullalarm = updateText(devices.coinacceptorfullalarm)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.coinacceptorfulllimit"
											hint="Ingrese COINACCEPTORFULLLIMIT"
											placeholder="COINACCEPTORFULLLIMIT"
											clearable
											persistent-hint
											required
											@input="devices.coinacceptorfulllimit = updateText(devices.coinacceptorfulllimit)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.cashchangeremptyalarm"
											hint="Ingrese CASHCHANGEREMPTYALARM"
											placeholder="CASHCHANGEREMPTYALARM"
											clearable
											persistent-hint
											required
											@input="devices.cashchangeremptyalarm = updateText(devices.cashchangeremptyalarm)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.cashchangeremptylimit"
											hint="Ingrese CASHCHANGEREMPTYLIMIT"
											placeholder="CASHCHANGEREMPTYLIMIT"
											clearable
											persistent-hint
											required
											@input="devices.cashchangeremptylimit = updateText(devices.cashchangeremptylimit)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.cashchangersecuritystock"
											hint="Ingrese CASHCHANGERSECURITYSTOCK"
											placeholder="CASHCHANGERSECURITYSTOCK"
											clearable
											persistent-hint
											required
											@input="devices.cashchangersecuritystock = updateText(devices.cashchangersecuritystock)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.coinchangeremptyalarm"
											hint="Ingrese COINCHANGEREMPTYALARM"
											placeholder="COINCHANGEREMPTYALARM"
											clearable
											persistent-hint
											required
											@input="devices.coinchangeremptyalarm = updateText(devices.coinchangeremptyalarm)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.coinchangeremptylimit"
											hint="Ingrese COINCHANGEREMPTYLIMIT"
											placeholder="COINCHANGEREMPTYLIMIT"
											clearable
											persistent-hint
											required
											@input="devices.coinchangeremptylimit = updateText(devices.coinchangeremptylimit)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.coinchangersecuritystock"
											hint="Ingrese COINCHANGERSECURITYSTOCK"
											placeholder="COINCHANGERSECURITYSTOCK"
											clearable
											persistent-hint
											required
											@input="devices.coinchangersecuritystock = updateText(devices.coinchangersecuritystock)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.carddispenseremptylimit"
											hint="Ingrese CARDDISPENSEREMPTYLIMIT"
											placeholder="CARDDISPENSEREMPTYLIMIT"
											clearable
											persistent-hint
											required
											@input="devices.carddispenseremptylimit = updateText(devices.carddispenseremptylimit)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.carddispenseremptyalarm"
											hint="Ingrese CARDDISPENSEREMPTYALARM"
											placeholder="CARDDISPENSEREMPTYALARM"
											clearable
											persistent-hint
											required
											@input="devices.carddispenseremptyalarm = updateText(devices.carddispenseremptyalarm)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.emptydenomblockcondition1"
											hint="Ingrese EMPTYDENOMBLOCKCONDITION1"
											placeholder="EMPTYDENOMBLOCKCONDITION1"
											clearable
											persistent-hint
											required
											@input="devices.emptydenomblockcondition1 = updateText(devices.emptydenomblockcondition1)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.emptydenomblockcondition2"
											hint="Ingrese EMPTYDENOMBLOCKCONDITION2"
											placeholder="EMPTYDENOMBLOCKCONDITION2"
											clearable
											persistent-hint
											required
											@input="devices.emptydenomblockcondition2 = updateText(devices.emptydenomblockcondition2)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.emptydenomblockcondition3"
											hint="Ingrese EMPTYDENOMBLOCKCONDITION3"
											placeholder="EMPTYDENOMBLOCKCONDITION3"
											clearable
											persistent-hint
											required
											@input="devices.emptydenomblockcondition3 = updateText(devices.emptydenomblockcondition3)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.emptydenomblockcondition4"
											hint="Ingrese EMPTYDENOMBLOCKCONDITION4"
											placeholder="EMPTYDENOMBLOCKCONDITION4"
											clearable
											persistent-hint
											required
											@input="devices.emptydenomblockcondition4 = updateText(devices.emptydenomblockcondition4)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.totalchangeemptyalarm"
											hint="Ingrese TOTALCHANGEEMPTYALARM"
											placeholder="TOTALCHANGEEMPTYALARM"
											clearable
											persistent-hint
											required
											@input="devices.totalchangeemptyalarm = updateText(devices.totalchangeemptyalarm)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.totalchangeemptylimit"
											hint="Ingrese TOTALCHANGEEMPTYLIMIT"
											placeholder="TOTALCHANGEEMPTYLIMIT"
											clearable
											persistent-hint
											required
											@input="devices.totalchangeemptylimit = updateText(devices.totalchangeemptylimit)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.scp_statusinterval"
											hint="Ingrese SCP_STATUSINTERVAL"
											placeholder="SCP_STATUSINTERVAL"
											clearable
											persistent-hint
											required
											@input="devices.scp_statusinterval = updateText(devices.scp_statusinterval)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.sct_step"
											hint="Ingrese SCT_STEP"
											placeholder="SCT_STEP"
											clearable
											persistent-hint
											required
											@input="devices.sct_step = updateText(devices.sct_step)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.sct_changevalidatoramount"
											hint="Ingrese SCT_CHANGEVALIDATORAMOUNT"
											placeholder="SCT_CHANGEVALIDATORAMOUNT"
											clearable
											persistent-hint
											required
											@input="devices.sct_changevalidatoramount = updateText(devices.sct_changevalidatoramount)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.sct_finishscreentimeout"
											hint="Ingrese SCT_FINISHSCREENTIMEOUT"
											placeholder="SCT_FINISHSCREENTIMEOUT"
											clearable
											persistent-hint
											required
											@input="devices.sct_finishscreentimeout = updateText(devices.sct_finishscreentimeout)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.cashchangerfill"
											hint="Ingrese CASHCHANGERFILL"
											placeholder="CASHCHANGERFILL"
											clearable
											persistent-hint
											required
											@input="devices.cashchangerfill = updateText(devices.cashchangerfill)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.coinchangerfill"
											hint="Ingrese COINCHANGERFILL"
											placeholder="COINCHANGERFILL"
											clearable
											persistent-hint
											required
											@input="devices.coinchangerfill = updateText(devices.coinchangerfill)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.coinchangerdenoms"
											hint="Ingrese COINCHANGERDENOMS"
											placeholder="COINCHANGERDENOMS"
											clearable
											persistent-hint
											required
											@input="devices.coinchangerdenoms = updateText(devices.coinchangerdenoms)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.cashchangerdenoms"
											hint="Ingrese CASHCHANGERDENOMS"
											placeholder="CASHCHANGERDENOMS"
											clearable
											persistent-hint
											required
											@input="devices.cashchangerdenoms = updateText(devices.cashchangerdenoms)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_lastreporttimestamp"
										v-model="menu_lastreporttimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="devices.lastreporttimestamp"
											hint="Ingrese lastreporttimestamp"
											placeholder="LASTREPORTTIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="devices.lastreporttimestamp" no-title @input="menu_lastreporttimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.laststatusreported"
											hint="Ingrese LASTSTATUSREPORTED"
											placeholder="LASTSTATUSREPORTED"
											clearable
											persistent-hint
											required
											@input="devices.laststatusreported = updateText(devices.laststatusreported)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.serviceuser"
											hint="Ingrese SERVICEUSER"
											placeholder="SERVICEUSER"
											clearable
											persistent-hint
											required
											@input="devices.serviceuser = updateText(devices.serviceuser)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="devices.operatorcode"
											hint="Ingrese OPERATORCODE"
											placeholder="OPERATORCODE"
											clearable
											persistent-hint
											required
											@input="devices.operatorcode = updateText(devices.operatorcode)">
								</v-text-field>
							</v-flex>
							-->
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" :disabled="!activa" @click="Grabar()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./devices.ts"></script>
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
