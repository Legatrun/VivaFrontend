<template>
  <v-card max-width="100%" style="margin:auto;">
    <v-toolbar color="primary" style="color:white">
      <v-toolbar-title class="font-large-color">
        <!--
        <v-btn color="special" dark @click="close">
          <v-icon>mdi-arrow-left-thick</v-icon>
          Volver
        </v-btn>

        &nbsp; &nbsp; 
        -->
        Roles</v-toolbar-title
      >
      <v-divider></v-divider>
      <v-text-field
        v-model="buscarroles"
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
      :items="lstroles"
      :items-per-page="10"
      :search="buscarroles"
      :footer-props="{
        showFirstLastPage: true,
        'items-per-page-options': [10, 20, 30, 40, 50, -1],
        'items-per-page-text': 'Registros desplegados:',
      }"
      class="elevation-1"
    >
      <template slot="item" slot-scope="props">
        <tr>
          <!-- <td>{{ props.item.idrol }}</td> -->
          <td>{{ searchRol(props.item.idrol) }}</td>
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
              <span>Modificar Registro de ROL</span>
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
              <span>Eliminar Registro de ROL</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="btn-small-color" color="cyan" v-on="on" @click="Insertar()"
              ><v-icon left>mdi-plus</v-icon>AGREGAR</v-btn
            >
          </template>
          <span>Adicionar nuevo ROL</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="warning" icon="warning"
          >Lo sentimos, no exiten datos a desplegar: (</v-alert
        >
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="50%">
      <v-card>
        <v-toolbar style="padding:10px" dark class="primary">
          <v-toolbar-title>Roles</v-toolbar-title>
          <v-spacer></v-spacer>
					<v-btn color="error" fab dark small @click="Cancelar()">X</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-form ref="form" style="padding:10px" v-model="activa">
          <v-card-text>
            <v-layout wrap>
              <template v-if="operacion == 'Insert'">
               <!-- <v-flex sm12 style="padding: 5px">
									<v-text-field v-model="roles.idrol"
												label="IdRol"
                        outlined
												clearable
												persistent-hint
												required
                        :rules="RulLetras"
												@input="roles.idrol = updateText(roles.idrol)">
									</v-text-field>
               </v-flex>-->
              </template>
              <template v-else>
                <!-- <v-flex sm12 style="padding: 5px">
									<v-text-field v-model="roles.idrol"
												label="IdRol"
												placeholder="IdRol"
												readonly
												persistent-hint>
									</v-text-field>
                  </v-flex>-->
              </template>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  v-model="roles.descripcion"
                  label="Descripcion"
                  outlined
                  clearable
                  persistent-hint
                  required
                  
                  :rules="RulLetras"
                  @input="roles.descripcion = updateText(roles.descripcion)"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions style="justify-content: center;padding:10px">
          <v-btn color="success" dark style="width: 50%" :disabled="!activa
          " @click="Grabar()"
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

<script src="./Roles.ts"></script>
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