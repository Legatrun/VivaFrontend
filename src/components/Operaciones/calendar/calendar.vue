<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Calendario</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscarcalendar"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstcalendar" 
						:items-per-page="30"
						:search = "buscarcalendar" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.id,lstcalendar, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td class="datatable-items-small">{{ props.item.identification }}</td>
					<td class="datatable-items-small">{{ props.item.description }}</td>
					<td class="datatable-items-small">{{ props.item.description }}</td>
					<td>
						<v-tooltip bottom style="padding: 10px">
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Revisar(props.item)"><v-icon>mdi-monitor-clean</v-icon> </v-btn>
							</template>
							<span>Revisar datos de calendario</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar calendario </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
					</template>
					<span>Adicionar calendario</span>
				</v-tooltip>
			</template>
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
		</v-data-table>
		<v-dialog v-model="dialog" persistent max-width="30%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title class="font-medium-color" >Calendario</v-toolbar-title>
						<v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="Cancelar()">X</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="calendar.identification"
											label="Identificación"
											clearable
											persistent-hint
											required
											outlined
											dense
											>
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-textarea class="input-small" 
											v-model="calendar.description"
											label="Descripción"
											clearable
											persistent-hint
											required
											outlined
											>
								</v-textarea>
							</v-flex>
							</template>
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
		<v-dialog v-model="dialogVisualizar" persistent max-width="60%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title class="font-medium-color" >Calendarios</v-toolbar-title>
						<v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="CancelarPopupVisualizar()">X</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
								<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="calendar.identification"
											label="Identificación"
											persistent-hint
											required
											outlined
											dense
											>
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-textarea class="input-small" 
											v-model="calendar.description"
											label="Descripción"
											persistent-hint
											required
											outlined
											>
								</v-textarea>
							</v-flex>
							<v-spacer></v-spacer>
							<v-flex sm2 style="padding: 5px">
								<v-btn color="cyan" large dark @click="Grabar()">
									<v-icon left>mdi-plus</v-icon>Agregar
								</v-btn>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-data-table 	style="padding: 5px; border:solid 1px"
									:headers="headersCalendarVersion" 
									:items="lstcalendarversion" 
									:items-per-page="30"
									:search = "buscarcalendar" 
									:footer-props="{
										showFirstLastPage: true,
										'items-per-page-options': [10, 20, 30, 40, 50, -1],
										'items-per-page-text': 'Registros por Pagina:',
									}"
									dense
									class="elevation-1">
								<template slot="item" slot-scope="props">
									<tr>
										<td class="datatable-items-small">{{ props.item.description }}</td>
										<td class="datatable-items-small">{{ FormatDate(props.item.validfrom) }}</td>
										<td class="datatable-items-small">{{ FormatDate(props.item.validuntil) }}</td>
										<!-- <td class="datatable-items-small">{{ props.item.calendarid }}</td> -->
										<td>
											<v-tooltip bottom style="padding: 10px">
												<template v-slot:activator="{ on }">
													<v-btn color="btnedit" v-on="on" fab small dark  @click="Revisar(props.item)"><v-icon>mdi-monitor-clean</v-icon> </v-btn>
												</template>
												<span>Revisar datos de calendario</span>
											</v-tooltip>
											<v-tooltip style="padding-left:10px" bottom>
												<template v-slot:activator="{ on }" >
													<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
												</template>
												<span>Eliminar calendario </span>
											</v-tooltip>
										</td>
									</tr>
									</template>
									<template v-slot:no-data>
										<v-alert :value="true" color="warning" icon="warning">
											Lo sentimos, no exiten datos a desplegar: (
										</v-alert>
									</template>
								</v-data-table>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" @click="Grabar()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="CancelarPopupVisualizar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./calendar.ts"></script>
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
