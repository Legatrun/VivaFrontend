<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title class="font-large-color">Sucursales</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field class="input-small"
					v-model="buscarlocations"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstlocations" 
						:items-per-page="30"
						:search = "buscarlocations" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Página: '+currentPageSelected+' || Registros desplegados:',
						}"
						dense	
						:loading="loadingTable"
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.identification,lstlocations, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td class="datatable-items-small">{{ props.item.identification }}</td>
					<td class="datatable-items-small">{{ props.item.description +' '+ props.item.city +' '+ props.item.address +' ( '+ props.item.city_code +' ) '}}</td>
					<!--<td class="datatable-items-small">{{ props.item.type }}</td>-->
					<td class="datatable-items-small">{{ Formathabilitado(props.item.enabled) }}</td>
					<!--
					<td class="datatable-items-small">{{ FormatDate(props.item.createtimestamp) }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.updatetimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.createuser }}</td>
					<td class="datatable-items-small">{{ props.item.updateuser }}</td>
				
					<td class="datatable-items-small">{{ props.item.address }}</td>
					<td class="datatable-items-small">{{ props.item.zipcode }}</td>
					<td class="datatable-items-small">{{ props.item.city }}</td>
					<td class="datatable-items-small">{{ props.item.city_code }}</td>
					<td class="datatable-items-small">{{ props.item.state }}</td>
					<td class="datatable-items-small">{{ props.item.state_code }}</td>
					<td class="datatable-items-small">{{ props.item.country }}</td>
					<td class="datatable-items-small">{{ props.item.identificationprovider }}</td>
					<td class="datatable-items-small">{{ props.item.email }}</td>
					<td class="datatable-items-small">{{ props.item.areacode }}</td>
					<td class="datatable-items-small">{{ props.item.geocoordinates }}</td>
					<td class="datatable-items-small">{{ props.item.replanishmentemail }}</td>
					<td class="datatable-items-small">{{ props.item.calendarid }}</td>
					<td class="datatable-items-small">{{ props.item.locationtypeid }}</td>
						-->
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="btnedit" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar datos de Sucursal</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Sucursal </span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
			
				<v-flex sm12>
					<v-card-actions>
						<v-tooltip bottom>
							<template  v-slot:activator="{ on }">
								<v-btn right class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
							</template>
								<span>Adicionar Sucursal</span>
						</v-tooltip>
						<v-spacer></v-spacer>
						<v-tooltip bottom>
							<template  v-slot:activator="{ on }">
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
		<v-dialog v-model="dialog" persistent max-width="80%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title class="font-medium-color" >Sucursales</v-toolbar-title>
						<v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="Cancelar()">X</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm4 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="locations.identification"
												label="Identificacion"
												outlined
												dense
												clearable
												required
												:rules="RulLetras"
												@input="locations.identification = updateText(locations.identification)">
									</v-text-field>
								</v-flex>
							</template>


							<template v-else>
								<v-flex sm4 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="locations.identification"
												label="Identificacion"
												outlined
												dense
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm5 style="padding: 5px">
								<v-autocomplete class="input-small" 
											v-model="locations.locationtypeid"
											label="Tipo Sucursal"
											:items="lstlocationsType"
											item-text="identification"
											item-value="id"
											outlined
											autocomplete="off"
											:rules="validacion"
											no-data-text="No se encontro ningun tema"
											>
								</v-autocomplete>
							</v-flex>
								<v-flex sm3 style="padding: 5px">
								<v-autocomplete class="input-small" 
											v-model="locations.enabled"
											label="Habilitada"
											:items="listahbil"
											item-text="habilitado"
											item-value="value"
											outlined
											autocomplete="off"
											:rules="habilitado"
											no-data-text="No se encontro ningun tema"
											>
								</v-autocomplete>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.description"
											label="Descripcion"
											outlined
											dense
											clearable
											required
											:rules="RulLetras"
											@input="locations.description = updateText(locations.description)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.type"
											label="Tipo"
											outlined
											dense
											clearable
											required
											:rules="RulLetras"
											@input="locations.type = updateText(locations.type)">
								</v-text-field>
							</v-flex>
								<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.state_code"
											label=" Codigo Sucursal"
											outlined
											dense
											clearable
											persistent-hint
											required
											:rules="RulLetras"
											@input="locations.state_code = updateText(locations.state_code)">
								</v-text-field>
							</v-flex>
						
						
							<v-flex sm5 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.address"
											label="Direccion"
											outlined
											dense
											clearable
											required
											:rules="RulLetras"
											@input="locations.address = updateText(locations.address)">
								</v-text-field>
							</v-flex>
							<v-flex sm3 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.zipcode"
											label="Codigo Postal"
											outlined
											dense
											clearable
											required
											:rules="RulLetras"
											@input="locations.zipcode = updateText(locations.zipcode)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.city"
											label="Ciudad"
											outlined
											dense
											clearable
											required
											:rules="Rules"
											@input="locations.city = updateText(locations.city)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.identificationprovider"
											label="Provincia"
											outlined
											dense
											clearable
											persistent-hint
											required
											:rules="Rules"
											@input="locations.identificationprovider = updateText(locations.identificationprovider)">
								</v-text-field>
							</v-flex>
					
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.country"
											label="Pais"
											outlined
											dense
											clearable
											required
											:rules="Rules"
											@input="locations.country = updateText(locations.country)">
								</v-text-field>
							</v-flex>
					
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.email"
											label="Email"
											outlined
											dense
											clearable
											required
											:rules="RulEmpEmai"
											>
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.replanishmentemail"
											label="Email Recaudacion"
											outlined
											dense
											clearable
											persistent-hint
											required
											:rules="RulEmpEmai"
											>
								</v-text-field>
							</v-flex>

							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.areacode"
											label="Codigo de Area"
											outlined
											dense
											clearable
											required
											:rules="RulLetras"
											@input="locations.areacode = updateText(locations.areacode)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.geocoordinates"
											label=" Coordinadas Geograficas"
											outlined
											dense
											clearable
											persistent-hint
											required
											@input="locations.geocoordinates = updateText(locations.geocoordinates)">
								</v-text-field>
							</v-flex>
						
							<v-flex sm4 style="padding: 5px">
								<v-autocomplete class="input-small" 
											v-model="locations.calendarid"
											label="Calendario"
											:items="lstcalendarios"
											item-text="identification"
											item-value="id"
											outlined
											autocomplete="off"
											:rules="validacion"
											no-data-text="No se encontro ningun tema"
											>
								</v-autocomplete>
							</v-flex>
							
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.city_code"
											label=" Codigo de Departamento"
											outlined
											dense
											clearable
											required
											:rules="RulLetras"
											@input="locations.city_code = updateText(locations.city_code)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field class="input-small" 
											v-model="locations.state"
											label="Ingrese Codigo Localidad"
											outlined
											dense
											clearable
											persistent-hint
											:rules="RulLetras"
											required
											@input="locations.state = updateText(locations.state)">
								</v-text-field>
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
	</v-card>
</template>

<script src="./locations.ts"></script>
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
