<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Datos de deviceinstalationtransactionpr</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscardeviceinstalationtransactionpr"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstdeviceinstalationtransactionpr" 
						:items-per-page="30"
						:search = "buscardeviceinstalationtransactionpr" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Página: '+currentPageSelected+' || Registros desplegados:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.deleted,lstdeviceinstalationtransactionpr, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td class="datatable-items-small">{{ props.item.deviceidentification }}</td>
					<td class="datatable-items-small">{{ props.item.enabled }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.createtimestamp) }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.updatetimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.createuser }}</td>
					<td class="datatable-items-small">{{ props.item.updateuser }}</td>
					<td class="datatable-items-small">{{ props.item.locationidentification }}</td>
					<td class="datatable-items-small">{{ props.item.provideridentification }}</td>
					<td class="datatable-items-small">{{ props.item.providerdeviceidentification }}</td>
					<td class="datatable-items-small">{{ props.item.providerlocationidentification }}</td>
					<td class="datatable-items-small">{{ props.item.providersequencenumber }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.lasttransactiontimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.transactionidentification }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de deviceinstalationtransactionpr</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar deviceinstalationtransactionpr </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="btn-small-color" color="buttonadd" v-on="on" @click="Insertar()">REGISTRAR deviceinstalationtransactionpr</v-btn>
					</template>
					<span>Adicionar nuevo registro de deviceinstalationtransactionpr</span>
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
					<v-toolbar-title class="font-medium-color" >Formulario de deviceinstalationtransactionpr</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationtransactionpr.deviceidentification"
											hint="Ingrese DEVICEIDENTIFICATION"
											placeholder="DEVICEIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="deviceinstalationtransactionpr.deviceidentification = updateText(deviceinstalationtransactionpr.deviceidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationtransactionpr.enabled"
											hint="Ingrese ENABLED"
											placeholder="ENABLED"
											clearable
											persistent-hint
											required
											type="number"
											@input="deviceinstalationtransactionpr.enabled = updateText(deviceinstalationtransactionpr.enabled)">
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
											v-model="deviceinstalationtransactionpr.createtimestamp"
											hint="Ingrese createtimestamp"
											placeholder="CREATETIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="deviceinstalationtransactionpr.createtimestamp" no-title @input="menu_createtimestamp = false"></v-date-picker>
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
											v-model="deviceinstalationtransactionpr.updatetimestamp"
											hint="Ingrese updatetimestamp"
											placeholder="UPDATETIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="deviceinstalationtransactionpr.updatetimestamp" no-title @input="menu_updatetimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationtransactionpr.createuser"
											hint="Ingrese CREATEUSER"
											placeholder="CREATEUSER"
											clearable
											persistent-hint
											required
											@input="deviceinstalationtransactionpr.createuser = updateText(deviceinstalationtransactionpr.createuser)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationtransactionpr.updateuser"
											hint="Ingrese UPDATEUSER"
											placeholder="UPDATEUSER"
											clearable
											persistent-hint
											required
											@input="deviceinstalationtransactionpr.updateuser = updateText(deviceinstalationtransactionpr.updateuser)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationtransactionpr.locationidentification"
											hint="Ingrese LOCATIONIDENTIFICATION"
											placeholder="LOCATIONIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="deviceinstalationtransactionpr.locationidentification = updateText(deviceinstalationtransactionpr.locationidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationtransactionpr.provideridentification"
											hint="Ingrese PROVIDERIDENTIFICATION"
											placeholder="PROVIDERIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="deviceinstalationtransactionpr.provideridentification = updateText(deviceinstalationtransactionpr.provideridentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationtransactionpr.providerdeviceidentification"
											hint="Ingrese PROVIDERDEVICEIDENTIFICATION"
											placeholder="PROVIDERDEVICEIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="deviceinstalationtransactionpr.providerdeviceidentification = updateText(deviceinstalationtransactionpr.providerdeviceidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationtransactionpr.providerlocationidentification"
											hint="Ingrese PROVIDERLOCATIONIDENTIFICATION"
											placeholder="PROVIDERLOCATIONIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="deviceinstalationtransactionpr.providerlocationidentification = updateText(deviceinstalationtransactionpr.providerlocationidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationtransactionpr.providersequencenumber"
											hint="Ingrese PROVIDERSEQUENCENUMBER"
											placeholder="PROVIDERSEQUENCENUMBER"
											clearable
											persistent-hint
											required
											type="number"
											@input="deviceinstalationtransactionpr.providersequencenumber = updateText(deviceinstalationtransactionpr.providersequencenumber)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_lasttransactiontimestamp"
										v-model="menu_lasttransactiontimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="deviceinstalationtransactionpr.lasttransactiontimestamp"
											hint="Ingrese lasttransactiontimestamp"
											placeholder="LASTTRANSACTIONTIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="deviceinstalationtransactionpr.lasttransactiontimestamp" no-title @input="menu_lasttransactiontimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationtransactionpr.transactionidentification"
											hint="Ingrese TRANSACTIONIDENTIFICATION"
											placeholder="TRANSACTIONIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="deviceinstalationtransactionpr.transactionidentification = updateText(deviceinstalationtransactionpr.transactionidentification)">
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

<script src="./deviceinstalationtransactionpr.ts"></script>
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
