<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de RolesAplicaciones</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarrolesaplicaciones"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstrolesaplicaciones" 
						:items-per-page="30"
						:search = "buscarrolesaplicaciones" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<td>{{ props.item.idrolesaplicaciones }}</td>
					<td>{{ props.item.idrol }}</td>
					<td>{{ props.item.idaplicacion }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Demo</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Demo</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de RolesAplicaciones</v-btn>
					</template>
					<span>Adicionar nuevo registro de cliente</span>
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
					<v-toolbar-title>Datos de RolesAplicaciones</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="rolesaplicaciones.idrolesaplicaciones"
												label="IDRolesAplicaciones"
												hint="Ingrese Nombre de IDRolesAplicaciones"
												placeholder="IDRolesAplicaciones"
												clearable
												persistent-hint
												required
												@input="rolesaplicaciones.idrolesaplicaciones = updateText(rolesaplicaciones.idrolesaplicaciones)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="rolesaplicaciones.idrolesaplicaciones"
												label="IDRolesAplicaciones"
												placeholder="IDRolesAplicaciones"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="rolesaplicaciones.idrol"
											label="IDRol"
											hint="Ingrese Nombre de IDRol"
											placeholder="IDRol"
											clearable
											persistent-hint
											required
											@input="rolesaplicaciones.idrol = updateText(rolesaplicaciones.idrol)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="rolesaplicaciones.idaplicacion"
											label="IDAplicacion"
											hint="Ingrese Nombre de IDAplicacion"
											placeholder="IDAplicacion"
											clearable
											persistent-hint
											required
											@input="rolesaplicaciones.idaplicacion = updateText(rolesaplicaciones.idaplicacion)">
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

<script src="./RolesAplicaciones.ts"></script>
