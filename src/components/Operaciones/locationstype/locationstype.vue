
<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Tipo de sucursales</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscarlocationstype"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstlocationstype" 
						:items-per-page="30"
						:search = "buscarlocationstype" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Página: '+currentPageSelected+' || Registros desplegados:',
						}"
						:loading="loadingTable"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.id,lstlocationstype, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
				<!--	<td class="datatable-items-small">{{ props.item.id }}</td>-->
					<td class="datatable-items-small">{{ props.item.identification }}</td>
					<td class="datatable-items-small">{{ props.item.description }}</td>
					<td class="datatable-items-small">{{ formatCalendar(props.item.calendarid)}}</td>
          <!--
					<td class="datatable-items-small">{{ FormatDate(props.item.createtimestamp) }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.updatetimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.createuser }}</td>
					<td class="datatable-items-small">{{ props.item.updateuser }}</td>
					-->
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de tipo de sucursal</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar tipo de sucursal </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-flex sm12>
					<v-card-actions>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn dark class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
							</template>
							<span>Adicionar tipo de sucursales</span>
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
		<v-dialog v-model="dialog" persistent max-width="45%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title class="font-medium-color" >Tipo de sucursales</v-toolbar-title>
						<v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="Cancelar()">X</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<v-flex sm12 style="padding: 5px">
								<v-text-field class="input-small"
								v-model="locationstype.identification"
								outlined
								dense
								label="Identificacion"
					            clearable
								required
								:rules="RulLetras"
					            @input="locationstype.identification = updateText(locationstype.identification)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-textarea class="input-small"
								v-model="locationstype.description"
								outlined
								dense
								label="Descripcion"
								clearable
								required
								:rules="RulLetras"
								@input="locationstype.description = updateText(locationstype.description)">
								</v-textarea>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-autocomplete class="input-small"
								v-model="locationstype.calendarid"
								label="Calendario"
								:items="lstcalendarios"
								item-text="identification"
								item-value="id"
								outlined
								autocomplete="off"
								:rules="validacion"
								no-data-text="No se encontro ningun tema"
								@input="locationstype.calendarid = updateText(locationstype.calendarid)">
								</v-autocomplete>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" :disabled="!activa" @click="Grabar()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cerrar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./locationstype.ts"></script>
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
			font-size: 1.1em; /* tamaño de letra */ 
} 
</style> 
