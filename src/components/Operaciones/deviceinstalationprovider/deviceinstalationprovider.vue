<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Datos de deviceinstalationprovider</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscardeviceinstalationprovider"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstdeviceinstalationprovider" 
						:items-per-page="30"
						:search = "buscardeviceinstalationprovider" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Página:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.deleted,lstdeviceinstalationprovider, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
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
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de deviceinstalationprovider</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar deviceinstalationprovider </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="btn-small-color" color="buttonadd" v-on="on" @click="Insertar()">REGISTRAR deviceinstalationprovider</v-btn>
					</template>
					<span>Adicionar nuevo registro de deviceinstalationprovider</span>
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
					<v-toolbar-title class="font-medium-color" >Formulario de deviceinstalationprovider</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationprovider.deviceidentification"
											hint="Ingrese DEVICEIDENTIFICATION"
											placeholder="DEVICEIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="deviceinstalationprovider.deviceidentification = updateText(deviceinstalationprovider.deviceidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationprovider.enabled"
											hint="Ingrese ENABLED"
											placeholder="ENABLED"
											clearable
											persistent-hint
											required
											type="number"
											@input="deviceinstalationprovider.enabled = updateText(deviceinstalationprovider.enabled)">
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
											v-model="deviceinstalationprovider.createtimestamp"
											hint="Ingrese createtimestamp"
											placeholder="CREATETIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="deviceinstalationprovider.createtimestamp" no-title @input="menu_createtimestamp = false"></v-date-picker>
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
											v-model="deviceinstalationprovider.updatetimestamp"
											hint="Ingrese updatetimestamp"
											placeholder="UPDATETIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="deviceinstalationprovider.updatetimestamp" no-title @input="menu_updatetimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationprovider.createuser"
											hint="Ingrese CREATEUSER"
											placeholder="CREATEUSER"
											clearable
											persistent-hint
											required
											@input="deviceinstalationprovider.createuser = updateText(deviceinstalationprovider.createuser)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationprovider.updateuser"
											hint="Ingrese UPDATEUSER"
											placeholder="UPDATEUSER"
											clearable
											persistent-hint
											required
											@input="deviceinstalationprovider.updateuser = updateText(deviceinstalationprovider.updateuser)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationprovider.locationidentification"
											hint="Ingrese LOCATIONIDENTIFICATION"
											placeholder="LOCATIONIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="deviceinstalationprovider.locationidentification = updateText(deviceinstalationprovider.locationidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationprovider.provideridentification"
											hint="Ingrese PROVIDERIDENTIFICATION"
											placeholder="PROVIDERIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="deviceinstalationprovider.provideridentification = updateText(deviceinstalationprovider.provideridentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationprovider.providerdeviceidentification"
											hint="Ingrese PROVIDERDEVICEIDENTIFICATION"
											placeholder="PROVIDERDEVICEIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="deviceinstalationprovider.providerdeviceidentification = updateText(deviceinstalationprovider.providerdeviceidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationprovider.providerlocationidentification"
											hint="Ingrese PROVIDERLOCATIONIDENTIFICATION"
											placeholder="PROVIDERLOCATIONIDENTIFICATION"
											clearable
											persistent-hint
											required
											@input="deviceinstalationprovider.providerlocationidentification = updateText(deviceinstalationprovider.providerlocationidentification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="deviceinstalationprovider.providersequencenumber"
											hint="Ingrese PROVIDERSEQUENCENUMBER"
											placeholder="PROVIDERSEQUENCENUMBER"
											clearable
											persistent-hint
											required
											type="number"
											@input="deviceinstalationprovider.providersequencenumber = updateText(deviceinstalationprovider.providersequencenumber)">
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
											v-model="deviceinstalationprovider.lasttransactiontimestamp"
											hint="Ingrese lasttransactiontimestamp"
											placeholder="LASTTRANSACTIONTIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="deviceinstalationprovider.lasttransactiontimestamp" no-title @input="menu_lasttransactiontimestamp = false"></v-date-picker>
								</v-menu>
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

<script src="./deviceinstalationprovider.ts"></script>
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
