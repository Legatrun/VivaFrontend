<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Reportes</v-toolbar-title>
			
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscarreports"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstreports" 
						:items-per-page="30"
						:search = "buscarreports" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Página:',
						}"
						dense
						:loading="loadingTable"
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.id,lstreports, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<!--<td class="datatable-items-small">{{ props.item.id }}</td>-->
					<td class="datatable-items-small">{{ props.item.reportname }}</td>
					<!--<td class="datatable-items-small">{{ props.item.description }}</td>-->
					<!--<td class="datatable-items-small">{{ props.item.url }}</td>-->
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="cyan" v-on="on" fab small dark  @click="AbrirReporte(props.item)"><v-icon>event</v-icon></v-btn>
							</template>
							<span>Abrir reporte</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px"   bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de reporte</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar reporte </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-flex sm12>
					<v-card-actions>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>

							</template>
							<span>Adicionar reportes</span>
						</v-tooltip>
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
		<v-dialog v-model="dialog" persistent max-width="40%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title class="font-medium-color" >Reportes</v-toolbar-title>

					<v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="Cancelar()">X</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<!--
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="reports.id"
												label="ID"
												hint="Ingrese ID"
												placeholder="ID"
												clearable
												persistent-hint
												required
												@input="reports.id = updateText(reports.id)">
									</v-text-field>
								</v-flex>
								-->
							</template>
							<template v-else>
								<!--
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="reports.id"
												label="ID"
												placeholder="ID"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								-->
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="reports.reportname"
											label="Nombre de Reporte"
											clearable
											persistent-hint
											outlined
											required
											:rules="validacion"
											@input="reports.reportname = updateText(reports.reportname)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-textarea class="input-small" 
											v-model="reports.description"
											label="Descripción"
											outlined
											clearable
											persistent-hint
											required
											rows="3"
											:rules="validacion"
											@input="reports.description = updateText(reports.description)">
								</v-textarea>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-textarea class="input-small" 
											v-model="reports.url"
											label=" URL"
											outlined
											clearable
											persistent-hint
											required
											rows="1"
											:rules="validacion"
											@input="reports.url = updateText(reports.url)">
								</v-textarea>
							</v-flex>
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
		<v-dialog v-model="dialogAbrir" persistent max-width="50%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title class="font-medium-color" >Abrir Reporte</v-toolbar-title>

					<v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="CancelarFormAbrir()">X</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<v-flex sm4 style="padding: 5px">
								<v-autocomplete
								:items="reportes"
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
											v-model="fechareporte"
											label="Fecha"
											outlined
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									
									<v-date-picker v-model="fechareporte" no-title @input="menu_notifytimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" >Abrir</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="CancelarFormAbrir()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./reports.ts"></script>
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
