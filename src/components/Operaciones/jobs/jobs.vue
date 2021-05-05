<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Datos de jobs</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscarjobs"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstjobs" 
						:items-per-page="30"
						:search = "buscarjobs" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.jobname,lstjobs, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td class="datatable-items-small">{{ props.item.jobname }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.jobstarttimestamp) }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.jobendtimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.jobstatus }}</td>
					<td class="datatable-items-small">{{ props.item.jobcommand }}</td>
					<td class="datatable-items-small">{{ props.item.jobreturncode }}</td>
					<td class="datatable-items-small">{{ props.item.joboutputfile }}</td>
					<td class="datatable-items-small">{{ props.item.userid }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de jobs</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar jobs </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="btn-small-color" color="buttonadd" v-on="on" @click="Insertar()">REGISTRAR jobs</v-btn>
					</template>
					<span>Adicionar nuevo registro de jobs</span>
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
					<v-toolbar-title class="font-medium-color" >Formulario de jobs</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="jobs.jobname"
												label="JOBNAME"
												hint="Ingrese JOBNAME"
												placeholder="JOBNAME"
												clearable
												persistent-hint
												required
												@input="jobs.jobname = updateText(jobs.jobname)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="jobs.jobname"
												label="JOBNAME"
												placeholder="JOBNAME"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_jobstarttimestamp"
										v-model="menu_jobstarttimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="jobs.jobstarttimestamp"
											hint="Ingrese jobstarttimestamp"
											placeholder="JOBSTARTTIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="jobs.jobstarttimestamp" no-title @input="menu_jobstarttimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_jobendtimestamp"
										v-model="menu_jobendtimestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="jobs.jobendtimestamp"
											hint="Ingrese jobendtimestamp"
											placeholder="JOBENDTIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="jobs.jobendtimestamp" no-title @input="menu_jobendtimestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="jobs.jobstatus"
											hint="Ingrese JOBSTATUS"
											placeholder="JOBSTATUS"
											clearable
											persistent-hint
											required
											type="number"
											@input="jobs.jobstatus = updateText(jobs.jobstatus)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="jobs.jobcommand"
											hint="Ingrese JOBCOMMAND"
											placeholder="JOBCOMMAND"
											clearable
											persistent-hint
											required
											@input="jobs.jobcommand = updateText(jobs.jobcommand)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="jobs.jobreturncode"
											hint="Ingrese JOBRETURNCODE"
											placeholder="JOBRETURNCODE"
											clearable
											persistent-hint
											required
											type="number"
											@input="jobs.jobreturncode = updateText(jobs.jobreturncode)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="jobs.joboutputfile"
											hint="Ingrese JOBOUTPUTFILE"
											placeholder="JOBOUTPUTFILE"
											clearable
											persistent-hint
											required
											@input="jobs.joboutputfile = updateText(jobs.joboutputfile)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="jobs.userid"
											hint="Ingrese USERID"
											placeholder="USERID"
											clearable
											persistent-hint
											required
											@input="jobs.userid = updateText(jobs.userid)">
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

<script src="./jobs.ts"></script>
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
