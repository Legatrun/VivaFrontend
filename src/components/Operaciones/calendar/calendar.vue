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
							'items-per-page-text': 'Página: '+currentPageSelected+' || Registros desplegados:',
						}"
						dense
						:loading="loadingTable"
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
				<v-flex sm12>
					<v-card-actions>
						<v-tooltip bottom>
							<template  v-slot:activator="{ on }">
								<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
							</template>
							<span>Adicionar calendario</span>
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
								<v-btn color="cyan" large dark @click="AddCalendarVersion()">
									<v-icon left>mdi-plus</v-icon>Agregar
								</v-btn>
								<v-span>Agregar versión a Calendario</v-span>
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
										'items-per-page-text': 'Página: '+currentPageSelected+' || Registros desplegados:',
									}"
									dense
									class="elevation-1">
								<template slot="item" slot-scope="props">
									<tr>
										<td class="datatable-items-small">{{ props.item.description }}</td>
										<td class="datatable-items-small">{{ FormatDate(props.item.validfrom) }}</td>
										<td class="datatable-items-small">{{  }}</td>
										<!-- <td class="datatable-items-small">{{ FormatDate(props.item.validuntil) }}</td> -->
										<!-- <td class="datatable-items-small">{{ props.item.calendarid }}</td> -->
										<td>
											<v-tooltip bottom style="padding: 10px">
												<template v-slot:activator="{ on }">
													<v-btn color="btnedit" v-on="on" fab small dark  @click="RevisarCalendarVersion(props.item)"><v-icon>mdi-monitor-clean</v-icon> </v-btn>
												</template>
												<span>Revisar versión de Calendario</span>
											</v-tooltip>
											<v-tooltip style="padding-left:10px" bottom>
												<template v-slot:activator="{ on }" >
													<v-btn color="btndelete" v-on="on" fab small dark  @click="EliminarCalendarVersion(props.item)"><v-icon>delete</v-icon></v-btn>
												</template>
												<span>Eliminar versión de Calendario </span>
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
		<v-dialog v-model="dialogAddCalendarVersion" persistent max-width="35%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title class="font-small-color" >Agregar Versión</v-toolbar-title>
						<v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="CancelarPopupAddCalendarVersion()">X</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
								<v-flex sm12 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="calendarversion.description"
												label="Descripción"
												persistent-hint
												required
												outlined
												>
									</v-text-field>
								</v-flex>
								<v-flex sm12 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_validfrom"
										v-model="menu_validfrom"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="calendarversion.validfrom"
											hint="Ingrese una fecha"
											placeholder="Vigencia Desde"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm12 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_validuntil"
										v-model="menu_validuntil"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="calendarversion.validuntil"
											hint="Ingrese una fecha"
											placeholder="Valido Hasta"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="calendarversion.validuntil" no-title @input="menu_validuntil = false"></v-date-picker>
								</v-menu>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" @click="Grabar()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="CancelarPopupAddCalendarVersion()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialogRevisarCalendarVersion" persistent max-width="70%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title class="font-small-color" >Revisar versión de Calendario</v-toolbar-title>
						<v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="CancelarPopupRevisarCalendarVersion()">X</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_validfrom"
										v-model="menu_validfrom"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="calendarversion.validfrom"
											hint="Ingrese una fecha"
											placeholder="Vigencia Desde"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_validuntil"
										v-model="menu_validuntil"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field class="date-small" 
											v-model="calendarversion.validuntil"
											hint="Ingrese una fecha"
											placeholder="Valido Hasta"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="calendarversion.validuntil" no-title @input="menu_validuntil = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
									<v-text-field class="input-small" 
												v-model="calendarversion.description"
												label="Descripción"
												persistent-hint
												required
												outlined
												>
									</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-flex sm12 style="padding: 5px">
									<h3>Excepciones</h3>
									<v-btn dark style="padding: 5px" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon></v-btn>
									<v-text-field class="input-small" 
												v-model="calendar.identification"
												placeholder="Identificación"
												persistent-hint
												required
												outlined
												dense
												>
									</v-text-field>
								</v-flex>
								<v-flex sm12>
									<v-text-field class="input-small" 
												v-model="calendarversion.description"
												label="Descripción"
												persistent-hint
												required
												outlined
												>
									</v-text-field>
								</v-flex>
							</v-flex>
							<v-flex sm8 style="padding: 5px">
										<!-- PESTAÑAS -->
										<!-- <v-toolbar color="headerpestañas" >
										<v-toolbar-title class="font-medium-color">Contadores</v-toolbar-title>
										</v-toolbar> -->
										<!-- DESDE -->
										<v-tabs
										color="white"
										dark
										slider-color="yellow"
										background-color="grey"
										style="border:solid 1px;"
										>
										<v-tab ripple>Lunes</v-tab>
										<v-tab ripple>Martes</v-tab>
										<v-tab ripple>Miércoles</v-tab>
										<v-tab ripple>Jueves</v-tab>
										<v-tab ripple>Viernes</v-tab>
										<v-tab ripple>Sábado</v-tab>
										<v-tab ripple>Domingo</v-tab>
										<v-tab-item>
											<v-card id="Lunes" flat class="pestaña-aceptadores">
												<v-form>
												<v-container>
													<v-row>
													<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
													</v-row>
												</v-container>
												</v-form>
											</v-card>
										</v-tab-item>
										<v-tab-item >
											<v-card id="Martes" flat dark >
												<v-form>
												<v-container>
													<v-row>
														<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
													</v-row>
												</v-container>
												</v-form>
											</v-card>
										</v-tab-item>
										<v-tab-item >
											<v-card id="Miércoles"  flat dark >
												<v-form>
												<v-container>
													<v-row>
														<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
													</v-row>
												</v-container>
												</v-form>
											</v-card>
										</v-tab-item>
										<v-tab-item>
											<v-card id="Jueves" flat dark >
												<v-form>
												<v-container>
													<v-row>
														<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
													</v-row>
												</v-container>
												</v-form>
											</v-card>
										</v-tab-item>
										<v-tab-item>
											<v-card id="Viernes"  flat dark >
												<v-form>
												<v-container>
													<v-row>
														<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
													</v-row>
												</v-container>
												</v-form>
											</v-card>
										</v-tab-item>
												<v-tab-item>
											<v-card id="Sábado"  flat dark >
												<v-form>
												<v-container>
													<v-row>
														<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
													</v-row>
												</v-container>
												</v-form>
											</v-card>
										</v-tab-item>
												<v-tab-item>
											<v-card id="Domingo"  flat dark >
												<v-form>
												<v-container>
													<v-row>
														<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-menu
														ref="menu_validfrom"
															v-model="menu_validfrom"
															:close-on-content-click="false"
															transition="scale-transition"
															offset-y
															full-width
															max-width="200px"
															min-width="200px">
														<template v-slot:activator="{ on }">
															<v-text-field class="date-small" 
																v-model="calendarversion.validfrom"
																hint="Ingrese una fecha"
																placeholder="Vigencia Desde"
																persistent-hint
																prepend-icon="event"
																v-on="on">
															</v-text-field>
														</template>
														<v-date-picker v-model="calendarversion.validfrom" no-title @input="menu_validfrom = false"></v-date-picker>
													</v-menu>
													<v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar</v-btn>
													</v-row>
												</v-container>
												</v-form>
											</v-card>
										</v-tab-item>
										</v-tabs>
									<!-- HASTA -->
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" @click="Grabar()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="CancelarPopupRevisarCalendarVersion()">Cancelar</v-btn>
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
