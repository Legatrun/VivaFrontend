<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Datos de tb_sesiones</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscartb_sesiones"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lsttb_sesiones" 
						:items-per-page="30"
						:search = "buscartb_sesiones" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Página: '+currentPageSelected+' || Registros desplegados:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.id,lsttb_sesiones, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td class="datatable-items-small">{{ props.item.id }}</td>
					<td class="datatable-items-small">{{ props.item.nombre_usuario }}</td>
					<td class="datatable-items-small">{{ props.item.datos }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.ultimo_acceso) }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.creacion) }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.fec_modificacion) }}</td>
					<td class="datatable-items-small">{{ props.item.usua_modificacion }}</td>
					<td class="datatable-items-small">{{ props.item.estado }}</td>
					<td class="datatable-items-small">{{ props.item.ip }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.cierre) }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de tb_sesiones</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar tb_sesiones </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="btn-small-color" color="buttonadd" v-on="on" @click="Insertar()">REGISTRAR tb_sesiones</v-btn>
					</template>
					<span>Adicionar nuevo registro de tb_sesiones</span>
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
					<v-toolbar-title class="font-medium-color" >Formulario de tb_sesiones</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="tb_sesiones.id"
												label="ID"
												hint="Ingrese ID"
												placeholder="ID"
												clearable
												persistent-hint
												required
												@input="tb_sesiones.id = updateText(tb_sesiones.id)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="tb_sesiones.id"
												label="ID"
												placeholder="ID"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_sesiones.nombre_usuario"
											hint="Ingrese NOMBRE_USUARIO"
											placeholder="NOMBRE_USUARIO"
											clearable
											persistent-hint
											required
											@input="tb_sesiones.nombre_usuario = updateText(tb_sesiones.nombre_usuario)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_sesiones.datos"
											hint="Ingrese DATOS"
											placeholder="DATOS"
											clearable
											persistent-hint
											required
											@input="tb_sesiones.datos = updateText(tb_sesiones.datos)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_ultimo_acceso"
										v-model="menu_ultimo_acceso"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="tb_sesiones.ultimo_acceso"
											hint="Ingrese ultimo_acceso"
											placeholder="ULTIMO_ACCESO"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="tb_sesiones.ultimo_acceso" no-title @input="menu_ultimo_acceso = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_creacion"
										v-model="menu_creacion"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="tb_sesiones.creacion"
											hint="Ingrese creacion"
											placeholder="CREACION"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="tb_sesiones.creacion" no-title @input="menu_creacion = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fec_modificacion"
										v-model="menu_fec_modificacion"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="tb_sesiones.fec_modificacion"
											hint="Ingrese fec_modificacion"
											placeholder="FEC_MODIFICACION"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="tb_sesiones.fec_modificacion" no-title @input="menu_fec_modificacion = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_sesiones.usua_modificacion"
											hint="Ingrese USUA_MODIFICACION"
											placeholder="USUA_MODIFICACION"
											clearable
											persistent-hint
											required
											@input="tb_sesiones.usua_modificacion = updateText(tb_sesiones.usua_modificacion)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_sesiones.estado"
											hint="Ingrese ESTADO"
											placeholder="ESTADO"
											clearable
											persistent-hint
											required
											type="number"
											@input="tb_sesiones.estado = updateText(tb_sesiones.estado)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_sesiones.ip"
											hint="Ingrese IP"
											placeholder="IP"
											clearable
											persistent-hint
											required
											@input="tb_sesiones.ip = updateText(tb_sesiones.ip)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_cierre"
										v-model="menu_cierre"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="tb_sesiones.cierre"
											hint="Ingrese cierre"
											placeholder="CIERRE"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="tb_sesiones.cierre" no-title @input="menu_cierre = false"></v-date-picker>
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

<script src="./tb_sesiones.ts"></script>
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
