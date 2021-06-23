<template>
  <v-card>
    <v-toolbar color="contrast" dark>
      <v-toolbar-title>
        <v-btn color="special" dark @click="close">
          <v-icon>mdi-arrow-left-thick</v-icon>
          Volver
        </v-btn>
        &nbsp; &nbsp; Datos de Usuarios</v-toolbar-title
      >
      <v-divider></v-divider>
      <v-text-field
        v-model="buscarusuarios"
        append-icon="search"
        label="Buscar Registro"
        single-line
        solo
        hide-details
      ></v-text-field>
    </v-toolbar>
    <v-data-table
      style="padding: 5px"
      :headers="headers"
      :items="lstUsuariosFormateados"
      :items-per-page="30"
      :search="buscarusuarios"
      :footer-props="{
        showFirstLastPage: true,
        'items-per-page-options': [10, 20, 30, 40, 50, -1],
        'items-per-page-text': 'Registros desplegados:',
      }"
      class="elevation-1"
    >
      <template slot="item" slot-scope="props">
        <tr>
          <!-- <td>{{ props.item.idusuario }}</td> -->
          <td>{{ props.item.nombre }}</td>
          <td>{{ props.item.email }}</td>
          <!-- <td>{{ props.item.password }}</td> -->
          <td>{{ props.item.fechacreacionFormat }}</td>
          <td>{{ props.item.usrdominioFormat }}</td>
          <td>{{ props.item.idinstitucionFormat }}</td>
          <td>{{ props.item.id_agenciaFormat }}</td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="success"
                  v-on="on"
                  fab
                  small
                  dark
                  @click="Actualizar(props.item)"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
              </template>
              <span>Modificar Datos del Usuario</span>
            </v-tooltip>
            <v-tooltip style="padding-left:10px" bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="error"
                  v-on="on"
                  fab
                  small
                  dark
                  @click="Eliminar(props.item)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar Usuario</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-container>
          <v-row>
            <v-col sm="5"></v-col>
            <v-col sm="5">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="accent" fab v-on="on" @click="Insertar()"
                    ><v-icon>add</v-icon></v-btn
                  >
                </template>
                <span>Adicionar nuevo registro de usuario</span>
              </v-tooltip>
            </v-col>
            <v-col sm="2"> </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="warning" icon="warning"
          >Lo sentimos, no exiten datos a desplegar: (</v-alert
        >
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="60%">
      <v-card>
        <v-toolbar style="padding:10px" dark class="primary">
          <v-toolbar-title>Datos de Usuarios</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-form
          ref="form"
          style="padding:10px"
          lazy-validation
          v-model="validacion"
        >
          <v-card-text>
            <v-layout wrap>
              <template v-if="operacion == 'Insert'">
                <!-- <v-flex sm12 style="padding: 5px">
									<v-text-field v-model="usuarios.idusuario"
												label="IdUsuario"
												hint="Ingrese Nombre de IdUsuario"
												placeholder="IdUsuario"
												clearable
												persistent-hint
												required
												@input="usuarios.idusuario = updateText(usuarios.idusuario)">
									</v-text-field>
                  </v-flex>-->
              </template>
              <template v-else>
                <!-- <v-flex sm12 style="padding: 5px">
									<v-text-field v-model="usuarios.idusuario"
												label="IdUsuario"
												placeholder="IdUsuario"
												readonly
												persistent-hint>
									</v-text-field>
                  </v-flex>-->
              </template>
              <v-flex sm6 style="padding: 5px">
                <v-text-field
                  v-model="usuarios.nombre"
                  hint="Ingrese nombre de usuario"
                  label="Nombre de usuario"
                  clearable
                  persistent-hint
                  required
                  maxlength="50"
                  counter
                  :rules="validacionNombreArray"
                ></v-text-field>
              </v-flex>
              <v-flex sm6 style="padding: 5px">
                <v-text-field
                  v-model="usuarios.email"
                  hint="Ingrese el correo del usuario"
                  label="Correo Electrónico"
                  clearable
                  persistent-hint
                  required
                  autocomplete="off"
                  maxlength="50"
                  counter
                  :rules="validacionEmailArray"
                ></v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  v-model="autenticacion.usuario"
                  hint="Ingrese Usuario (nombre de Ingreso)"
                  label="Usuario"
                  clearable
                  persistent-hint
                  required
                  maxlength="50"
                  counter
                  :rules="validacionNombreArray"
                ></v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  v-model="autenticacion.password"
                  hint="Ingrese una contraseña"
                  label="Contraseña"
                  clearable
                  persistent-hint
                  required
                  maxlength="50"
                  counter
                  :rules="validacionPasswordArray"
                  :append-icon="show ? '👁️' : 'lock'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                ></v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  v-model="confirmedPassword"
                  hint="Confirme la contraseña"
                  label="Confirmación Contraseña"
                  clearable
                  persistent-hint
                  required
                  maxlength="50"
                  counter
                  :rules="validacionPasswordArray"
                  :append-icon="show ? '👁️' : 'lock'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                ></v-text-field>
              </v-flex>
              <!-- <v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fechacreacion"
										v-model="menu_fechacreacion"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="usuarios.fechacreacion"
											hint="Ingrese la fechacreacion"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="usuarios.fechacreacion" no-title @input="menu_fechacreacion = false"></v-date-picker>
								</v-menu>
                </v-flex>-->
              <v-flex sm12 style="padding: 5px">
                <v-flex sm12 style="padding: 5px">
                  <v-autocomplete
                    v-model="usuarios.idinstitucion"
                    :items="lstinstituciones"
                    item-text="descripcion"
                    item-value="idinstitucion"
                    label="Institución"
                    persistent-hint
                    :rules="validacionAutocompleteArray"
                    color="#1A237E"
                  ></v-autocomplete>
                </v-flex>
              </v-flex>
              <v-flex sm6 style="padding: 5px">
                <v-switch
                  v-model="usuarios.usrdominio"
                  color="indigo"
                  :label="
                    `${
                      usuarios.usrdominio
                        ? 'Usuario de Dominio'
                        : 'Usuario Local'
                    }`
                  "
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions style="justify-content: center;padding:10px">
          <v-btn
            color="success"
            dark
            style="width: 50%"
            @click="Grabar()"
            :disabled="!validacion"
            >Grabar</v-btn
          >
          <v-btn color="error" dark style="width: 50%" @click="Cancelar()"
            >Cancelar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script src="./Usuarios.ts"></script>
