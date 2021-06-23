<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Datos de tb_usuarios</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscartb_usuarios"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lsttb_usuarios" 
						:items-per-page="30"
						:search = "buscartb_usuarios" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros desplegados:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.nombre_usuario,lsttb_usuarios, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td class="datatable-items-small">{{ props.item.nombre_usuario }}</td>
					<td class="datatable-items-small">{{ props.item.nombre }}</td>
					<td class="datatable-items-small">{{ props.item.apellido }}</td>
					<td class="datatable-items-small">{{ props.item.email }}</td>
					<td class="datatable-items-small">{{ props.item.tel }}</td>
					<td class="datatable-items-small">{{ props.item.telmovil }}</td>
					<td class="datatable-items-small">{{ props.item.hash }}</td>
					<td class="datatable-items-small">{{ props.item.idgrupo }}</td>
					<td class="datatable-items-small">{{ props.item.idperfil }}</td>
					<td class="datatable-items-small">{{ props.item.aplicacion }}</td>
					<td class="datatable-items-small">{{ props.item.enabled }}</td>
					<td class="datatable-items-small">{{ props.item.config }}</td>
					<td class="datatable-items-small">{{ props.item.notas }}</td>
					<td class="datatable-items-small">{{ props.item.cambiar_pwd }}</td>
					<td class="datatable-items-small">{{ props.item.estado }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.create_timestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.usuario_creacion }}</td>
					<td class="datatable-items-small">{{ props.item.usuario_modif }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.ultimo_acceso) }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.fec_modificacion) }}</td>
					<td class="datatable-items-small">{{ props.item.usua_modificacion }}</td>
					<td class="datatable-items-small">{{ props.item.intentos }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de tb_usuarios</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar tb_usuarios </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="btn-small-color" color="buttonadd" v-on="on" @click="Insertar()">REGISTRAR tb_usuarios</v-btn>
					</template>
					<span>Adicionar nuevo registro de tb_usuarios</span>
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
					<v-toolbar-title class="font-medium-color" >Formulario de tb_usuarios</v-toolbar-title>
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
												v-model="tb_usuarios.nombre_usuario"
												label="NOMBRE_USUARIO"
												hint="Ingrese NOMBRE_USUARIO"
												placeholder="NOMBRE_USUARIO"
												clearable
												persistent-hint
												required
												@input="tb_usuarios.nombre_usuario = updateText(tb_usuarios.nombre_usuario)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="tb_usuarios.nombre_usuario"
												label="NOMBRE_USUARIO"
												placeholder="NOMBRE_USUARIO"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.nombre"
											hint="Ingrese NOMBRE"
											placeholder="NOMBRE"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.nombre = updateText(tb_usuarios.nombre)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.apellido"
											hint="Ingrese APELLIDO"
											placeholder="APELLIDO"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.apellido = updateText(tb_usuarios.apellido)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.email"
											hint="Ingrese EMAIL"
											placeholder="EMAIL"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.email = updateText(tb_usuarios.email)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.tel"
											hint="Ingrese TEL"
											placeholder="TEL"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.tel = updateText(tb_usuarios.tel)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.telmovil"
											hint="Ingrese TELMOVIL"
											placeholder="TELMOVIL"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.telmovil = updateText(tb_usuarios.telmovil)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.hash"
											hint="Ingrese HASH"
											placeholder="HASH"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.hash = updateText(tb_usuarios.hash)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.idgrupo"
											hint="Ingrese IDGRUPO"
											placeholder="IDGRUPO"
											clearable
											persistent-hint
											required
											type="number"
											@input="tb_usuarios.idgrupo = updateText(tb_usuarios.idgrupo)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.idperfil"
											hint="Ingrese IDPERFIL"
											placeholder="IDPERFIL"
											clearable
											persistent-hint
											required
											type="number"
											@input="tb_usuarios.idperfil = updateText(tb_usuarios.idperfil)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.aplicacion"
											hint="Ingrese APLICACION"
											placeholder="APLICACION"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.aplicacion = updateText(tb_usuarios.aplicacion)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.enabled"
											hint="Ingrese ENABLED"
											placeholder="ENABLED"
											clearable
											persistent-hint
											required
											type="number"
											@input="tb_usuarios.enabled = updateText(tb_usuarios.enabled)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.config"
											hint="Ingrese CONFIG"
											placeholder="CONFIG"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.config = updateText(tb_usuarios.config)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.notas"
											hint="Ingrese NOTAS"
											placeholder="NOTAS"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.notas = updateText(tb_usuarios.notas)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.cambiar_pwd"
											hint="Ingrese CAMBIAR_PWD"
											placeholder="CAMBIAR_PWD"
											clearable
											persistent-hint
											required
											type="number"
											@input="tb_usuarios.cambiar_pwd = updateText(tb_usuarios.cambiar_pwd)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.estado"
											hint="Ingrese ESTADO"
											placeholder="ESTADO"
											clearable
											persistent-hint
											required
											type="number"
											@input="tb_usuarios.estado = updateText(tb_usuarios.estado)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_create_timestamp"
										v-model="menu_create_timestamp"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="tb_usuarios.create_timestamp"
											hint="Ingrese create_timestamp"
											placeholder="CREATE_TIMESTAMP"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="tb_usuarios.create_timestamp" no-title @input="menu_create_timestamp = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
								v-model="tb_usuarios.usuario_creacion"
											hint="Ingrese USUARIO_CREACION"
											placeholder="USUARIO_CREACION"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.usuario_creacion = updateText(tb_usuarios.usuario_creacion)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
								v-model="tb_usuarios.usuario_modif"
											hint="Ingrese USUARIO_MODIF"
											placeholder="USUARIO_MODIF"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.usuario_modif = updateText(tb_usuarios.usuario_modif)">
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
											v-model="tb_usuarios.ultimo_acceso"
											hint="Ingrese ultimo_acceso"
											placeholder="ULTIMO_ACCESO"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="tb_usuarios.ultimo_acceso" no-title @input="menu_ultimo_acceso = false"></v-date-picker>
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
											v-model="tb_usuarios.fec_modificacion"
											hint="Ingrese fec_modificacion"
											placeholder="FEC_MODIFICACION"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="tb_usuarios.fec_modificacion" no-title @input="menu_fec_modificacion = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.usua_modificacion"
											hint="Ingrese USUA_MODIFICACION"
											placeholder="USUA_MODIFICACION"
											clearable
											persistent-hint
											required
											@input="tb_usuarios.usua_modificacion = updateText(tb_usuarios.usua_modificacion)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="tb_usuarios.intentos"
											hint="Ingrese INTENTOS"
											placeholder="INTENTOS"
											clearable
											persistent-hint
											required
											type="number"
											@input="tb_usuarios.intentos = updateText(tb_usuarios.intentos)">
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

<script src="./tb_usuarios.ts"></script>
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
