<template>
  <v-card max-width="100%" style="margin:auto;">
    <v-toolbar color="secondary" dark>
      <v-toolbar-title>
        <v-btn color="special" dark @click="close">
          <v-icon>mdi-arrow-left-thick</v-icon>
          Volver
        </v-btn>
        &nbsp; &nbsp;Datos de Modulos</v-toolbar-title
      >
      <v-divider></v-divider>
      <v-text-field
        v-model="buscarmodulos"
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
      :items="lstModulos" 
      :items-per-page="30"
      :search="buscarmodulos"
      :footer-props="{
        showFirstLastPage: true,
        'items-per-page-options': [10, 20, 30, 40, 50, -1],
        'items-per-page-text': 'Página: '+currentPageSelected+' || Registros desplegados:',
      }"
      class="elevation-1"
    >
      <template slot="item" slot-scope="props">
        <tr>
          <!-- <td>{{ props.item.idmodulo }}</td> -->
          <td>{{ props.item.moduloDesc }}</td>
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
                  ><v-icon>edit</v-icon></v-btn
                >
              </template>
              <span>Modificar Registro</span>
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
                  ><v-icon>delete</v-icon></v-btn
                >
              </template>
              <span>Eliminar Registro</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-container style="padding:0">
          <v-row>
            <v-col sm="5"></v-col>
            <v-col sm="5">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="accent" fab v-on="on" @click="Insertar()"
                    ><v-icon>add</v-icon></v-btn
                  >
                </template>
                <span>Adicionar nuevo registro de módulo</span>
              </v-tooltip>
            </v-col>
            <v-col sm="2"> </v-col>
          </v-row>
        </v-container>
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
          <v-toolbar-title>Datos de Modulos</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-form
          ref="form"
          style="padding:10px"
          lazy-validation
          v-model="validar"
        >
          <v-card-text>
            <v-layout wrap>
              <template v-if="operacion == 'Insert'">
                <!-- <v-flex sm12 style="padding: 5px">
									<v-text-field v-model="modulos.idmodulo"
												label="IdModulo"
												hint="Ingrese Nombre de IdModulo"
												placeholder="IdModulo"
												clearable
												persistent-hint
												required
												@input="modulos.idmodulo = updateText(modulos.idmodulo)">
									</v-text-field>
								</v-flex> -->
              </template>
              <template v-else>
                <!-- <v-flex sm12 style="padding: 5px">
									<v-text-field v-model="modulos.idmodulo"
												label="IdModulo"
												placeholder="IdModulo"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex> -->
              </template>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  v-model="modulos.descripcion"
                  label="Descripcion"
                  hint="Ingrese Descripcion del Modulo"
                  placeholder="Descripcion"
                  clearable
                  persistent-hint
                  required
                  @input="modulos.descripcion = updateText(modulos.descripcion)"
                  :rules="validacionNombreArray"
                  maxlength="30"
                  counter
                >
                </v-text-field>
              </v-flex>
                <!-- <v-flex sm6 style="padding: 5px">
								<v-autocomplete
									label="Seleccionar Rol"
									:items="lstRoles"
									item-text="descripcion"
									item-value="idrol"
                  @input="cargarRolesAplicacionesXrol"
									>
								</v-autocomplete>
							</v-flex> -->
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
            :disabled="!validar"
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

<script src="./Modulos.ts"></script>
