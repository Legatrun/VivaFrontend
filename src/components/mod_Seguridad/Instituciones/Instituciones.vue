<template>
  <v-card max-width="80%" style="margin:auto;">
    <v-toolbar color="primary" style="color:white">
      <v-toolbar-title>Datos de Instituciones</v-toolbar-title>
      <v-divider></v-divider>
      <v-text-field
        v-model="buscarinstituciones"
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
      :items="lstinstituciones"
      :items-per-page="10"
      :search="buscarinstituciones"
      :footer-props="{
        showFirstLastPage: true,
        'items-per-page-options': [10, 20, 30, 40, 50, -1],
        'items-per-page-text': 'Registros desplegados:',
      }"
      class="elevation-1"
    >
      <template slot="item" slot-scope="props">
        <tr>
          <td>{{ props.item.descripcion }}</td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="accent"
                  v-on="on"
                  icon
                  disabled
                  @click="Actualizar(props.item)"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
              </template>
              <span>Modificar Registro de Institucion</span> </v-tooltip
            >&nbsp;
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="success"
                  v-on="on"
                  icon
                  dark
                  @click="
                    showDialog(
                      props.item.idinstitucion,
                      'Gestión Grupos de Usuarios',
                      'USUARIOS'
                    )
                  "
                >
                  <v-icon>mdi-account-supervisor-circle</v-icon>
                </v-btn>
              </template>
              <span>Gestionar Grupos de Usuarios</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="special"
                  v-on="on"
                  icon
                  dark
                  @click="
                    showDialog(
                      props.item.idinstitucion,
                      'Gestión Roles / Aplicaciones / Módulos',
                      'ROLES'
                    )
                  "
                >
                  <v-icon>mdi-account-key</v-icon>
                </v-btn>
              </template>
              <span>Gestionar Roles</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="info"
                  v-on="on"
                  icon
                  dark
                  @click="
                    showDialog(
                      props.item.idinstitucion,
                      'Roles de Grupo Usuarios',
                      'ROLESGRUPOS'
                    )
                  "
                >
                  <v-icon>mdi-account-group</v-icon>
                </v-btn>
              </template>
              <span>Asignar Roles a Grupos</span>
            </v-tooltip>
            <v-tooltip style="padding-left:10px" bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="error"
                  v-on="on"
                  icon
                  disabled
                  @click="Eliminar(props.item)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar Registro de Institucion</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="accent" disabled v-on="on" @click="Insertar()"
              >Nueva Institución</v-btn
            >
          </template>
          <span>Adicionar nuevo registro de cliente</span>
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
        <v-card>
          <v-toolbar style="padding:10px" dark class="primary">
            <v-toolbar-title>Datos de Instituciones</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-form ref="form" style="padding:10px" lazy-validation>
            <v-card-text>
              <v-layout wrap>
                <template v-if="operacion == 'Insert'">
                  <!-- <v-flex sm12 style="padding: 5px">
									<v-text-field v-model="instituciones.idinstitucion"
												label="IDInstitucion"
												hint="Ingrese Nombre de IDInstitucion"
												placeholder="IDInstitucion"
												clearable
												persistent-hint
												required
												@input="instituciones.idinstitucion = updateText(instituciones.idinstitucion)">
									</v-text-field>
								</v-flex> -->
                </template>
                <template v-else>
                  <!-- <v-flex sm12 style="padding: 5px">
									<v-text-field v-model="instituciones.idinstitucion"
												label="IDInstitucion"
												placeholder="IDInstitucion"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex> -->
                </template>
                <v-flex sm12 style="padding: 5px">
                  <v-text-field
                    v-model="instituciones.descripcion"
                    label="Ingrese Nombre de la Institución"
                    hint="Ingrese Nombre de la Institución"
                    placeholder=""
                    clearable
                    persistent-hint
                    required
                    @input="
                      instituciones.descripcion = updateText(
                        instituciones.descripcion
                      )
                    "
                    counter
                    maxlength="70"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-form>
          <v-divider></v-divider>
          <v-card-actions style="justify-content: center;padding:10px">
            <v-btn color="success" dark style="width: 50%" @click="Grabar()"
              >Grabar</v-btn
            >
            <v-btn color="error" dark style="width: 50%" @click="Cancelar()"
              >Cancelar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
    <!--//?? Componentes de Pop Ups -->
    <popUpContent :title="tituloComponent" :content="contenidoComponente" />
     <grupoUser />
    <institucionesRoles />
    <grpssrroles /> 
  </v-card>
  
</template>

<script src="./Instituciones.ts"></script>
