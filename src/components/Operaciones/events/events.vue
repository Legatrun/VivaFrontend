<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Reportes</v-toolbar-title>
			<v-divider></v-divider>
			<!--
			<v-text-field class="input-small"
					v-model="buscarevents"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
					-->
					
		</v-toolbar>
			<template>
				<v-form>
					<v-container>
						<v-row>
							<v-flex sm4 style="padding: 5px">
								<v-autocomplete
								label="Reporte"
								outlined
								clearable
								>
								</v-autocomplete>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_notifytimestamp"
										v-model="menu_notifytimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y

										full-width
										max-width="290px"
										min-width="290px"
										>
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="events.notifytimestamp"
											label="Fecha"
											outlined
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									
									<v-date-picker v-model="events.notifytimestamp" no-title @input="menu_notifytimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							
						</v-row>
					</v-container>
				</v-form>
			</template>
			<!---
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstevents" 
						:items-per-page="30"
						:search = "buscarevents" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros desplegados:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<td class="datatable-items-small">{{ helper.showDataDescription(props.item.sequencenumber,lstevents, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id
					<td class="datatable-items-small">{{ props.item.type }}</td>
					<td class="datatable-items-small">{{ props.item.deviceidentification }}</td>
					<td class="datatable-items-small">{{ props.item.locationidentification }}</td>
					<td class="datatable-items-small">{{ props.item.createtimestamp }}</td>
					<td class="datatable-items-small">{{ props.item.reason }}</td>
					<td class="datatable-items-small">{{ props.item.operationname }}</td>
					<td class="datatable-items-small">{{ props.item.servicename }}</td>
					<td class="datatable-items-small">{{ props.item.sequencenumber }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.notifytimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.text }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de events</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar events </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
		
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="">
				
						<v-btn class="btn-small-color" color="buttonadd" v-on="on" @click="Insertar()">Rep</v-btn>
						
					</template>
				
					<span>Adicionar nuevo registro de events</span>
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
					<v-toolbar-title class="font-medium-color" >Formulario de events</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.type"
												label="TYPE"
												hint="Ingrese TYPE"
												placeholder="TYPE"
												clearable
												persistent-hint
												required
												@input="events.type = updateText(events.type)">
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.deviceidentification"
												label="DEVICEIDENTIFICATION"
												hint="Ingrese DEVICEIDENTIFICATION"
												placeholder="DEVICEIDENTIFICATION"
												clearable
												persistent-hint
												required
												@input="events.deviceidentification = updateText(events.deviceidentification)">
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.locationidentification"
												label="LOCATIONIDENTIFICATION"
												hint="Ingrese LOCATIONIDENTIFICATION"
												placeholder="LOCATIONIDENTIFICATION"
												clearable
												persistent-hint
												required
												@input="events.locationidentification = updateText(events.locationidentification)">
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.createtimestamp"
												label="CREATETIMESTAMP"
												hint="Ingrese CREATETIMESTAMP"
												placeholder="CREATETIMESTAMP"
												clearable
												persistent-hint
												required
												@input="events.createtimestamp = updateText(events.createtimestamp)">
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.reason"
												label="REASON"
												hint="Ingrese REASON"
												placeholder="REASON"
												clearable
												persistent-hint
												required
												@input="events.reason = updateText(events.reason)">
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.operationname"
												label="OPERATIONNAME"
												hint="Ingrese OPERATIONNAME"
												placeholder="OPERATIONNAME"
												clearable
												persistent-hint
												required
												@input="events.operationname = updateText(events.operationname)">
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.servicename"
												label="SERVICENAME"
												hint="Ingrese SERVICENAME"
												placeholder="SERVICENAME"
												clearable
												persistent-hint
												required
												@input="events.servicename = updateText(events.servicename)">
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.sequencenumber"
												label="SEQUENCENUMBER"
												hint="Ingrese SEQUENCENUMBER"
												placeholder="SEQUENCENUMBER"
												clearable
												persistent-hint
												required
												@input="events.sequencenumber = updateText(events.sequencenumber)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.type"
												label="TYPE"
												placeholder="TYPE"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.deviceidentification"
												label="DEVICEIDENTIFICATION"
												placeholder="DEVICEIDENTIFICATION"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.locationidentification"
												label="LOCATIONIDENTIFICATION"
												placeholder="LOCATIONIDENTIFICATION"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.createtimestamp"
												label="CREATETIMESTAMP"
												placeholder="CREATETIMESTAMP"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.reason"
												label="REASON"
												placeholder="REASON"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.operationname"
												label="OPERATIONNAME"
												placeholder="OPERATIONNAME"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.servicename"
												label="SERVICENAME"
												placeholder="SERVICENAME"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="events.sequencenumber"
												label="SEQUENCENUMBER"
												placeholder="SEQUENCENUMBER"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_notifytimestamp"
										v-model="menu_notifytimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="events.notifytimestamp"
											hint="Ingrese notifytimestamp"
											placeholder="NOTIFYTIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="events.notifytimestamp" no-title @input="menu_notifytimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="events.text"
											hint="Ingrese TEXT"
											placeholder="TEXT"
											clearable
											persistent-hint
											required
											@input="events.text = updateText(events.text)">
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
		-->
	</v-card>
</template>

<script src="./events.ts"></script>
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
