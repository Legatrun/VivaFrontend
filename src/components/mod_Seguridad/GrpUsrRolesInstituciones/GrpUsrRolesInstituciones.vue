<template>
  <v-card max-width="100%" style="margin:auto;">
    <v-data-table
      style="padding: 5px"
      :headers="headers"
      :items="lstgrpusrrolesinstituciones"
      :items-per-page="30"
      :search="buscargrpusrrolesinstituciones"
      :footer-props="{
        showFirstLastPage: true,
        'items-per-page-options': [10, 20, 30, 40, 50, -1],
        'items-per-page-text': 'Página: '+currentPageSelected+' || Registros desplegados:',
      }"
      class="elevation-1"
    >
      <template slot="item" slot-scope="props">
        <tr>
          <td>{{ searchGrupoUser(props.item.idgrpusuario) }}</td>
          <td>{{ searchInstitucionRol(props.item.idinstitucionrol) }}</td>
          <td>
            <!-- <v-tooltip bottom>
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
                <span>Modificar Registro de Demo</span>
              </v-tooltip> -->
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
              <span>Eliminar Registro de Roles a Grupos</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="accent" v-on="on" @click="Insertar()"
              >Nueva Asignación de Rol(es) a Usuarios</v-btn
            >
          </template>
          <span>Adicionar nuevo registro grupo</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="warning" icon="warning"
          >Lo sentimos, no exiten datos a desplegar: (</v-alert
        >
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="80%">
      <v-card>
        <v-toolbar style="padding:10px;" max-height="80" dark class="primary">
          <v-toolbar-title>Agregar nuevo grupo de Roles</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-form ref="form" style="padding:10px">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <!-- <v-stepper-step :complete="e1 > 1" step="1" editable
                  >Info de Grupo</v-stepper-step
                >

                <v-divider></v-divider> -->

              <v-stepper-step :complete="e1 > 2" step="1" editable
                >Añadir Roles</v-stepper-step
              >

              <v-divider></v-divider>

              <v-stepper-step step="2">Añadir Usuarios</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <!-- <v-stepper-content step="1">
                  <v-card outlined hover width="100%" class="pl-5" height="200">
                    <v-row>
                      <v-col sm="2"> <br />Nombre: </v-col>
                      <v-col sm="9" style="text-align:center;">
                        <v-text-field
                          placeholder="Nombre"
                          persistent-hint
                          filled
                          v-on="on"
                        ></v-text-field>
                      </v-col>
                      <v-col sm="1"></v-col>
                    </v-row>
                    <v-row>
                      <v-col sm="2"> <br />Descripción: </v-col>
                      <v-col sm="9" style="text-align:center;">
                        <v-text-field
                          placeholder="Descripción"
                          persistent-hint
                          filled
                          v-on="on"
                        ></v-text-field>
                      </v-col>
                      <v-col sm="1"></v-col>
                    </v-row>
                  </v-card>

                  <v-divider></v-divider>
                  <br />
                  <br />
                  <v-btn color="error" @click="Cancelar()">Cancelar</v-btn
                  >&nbsp;
                  <v-btn color="success" @click="e1 = 2">Continuar</v-btn>
                </v-stepper-content> -->

              <v-stepper-content step="1">
                <h4
                  class="title font-weight-light ml-12"
                  style="color:#2f5572; margin:auto;"
                >
                  <b
                    >Seleccionar el rol que se asignará a los grupos de
                    usuarios</b
                  >
                </h4>
                <br />
                <v-card class="mb-12" max-width="80%" style="margin:auto;">
                  <v-data-table
                    style="padding: 5px"
                    v-model="lstRolesSelected"
                    :headers="headersRoles"
                    :items="lstRolesInstitucion"
                    show-select
                    single-select
                    selectable-key="idrol"
                    item-key="idrol"
                    hide-default-footer
                    class="elevation-1"
                  >
                    <template slot="item.descripcion" slot-scope="props">
                      <td>{{ searchRol(props.item.idrol) }}</td>
                    </template>

                    <!-- <template slot="item" slot-scope="props">
															<tr>
																<td>{{ props.item.descripcion }}</td>
																<td>
																	<v-select
																		:items="lstOperaciones"
																		item-text="descripcion"
																		label="Seleccionar Operación"
																		solo
																		></v-select>
																</td>
															</tr>
                    </template>-->
                    <!-- <template v-slot:item.actions="{ item }">
                        <v-select
                          :items="lstOperaciones"
                          item-text="descripcion"
                          label="Seleccionar Operación"
                          solo
                        ></v-select>
                      </template> -->
                  </v-data-table>
                </v-card>

                <v-divider></v-divider>
                <br />

                <!-- <v-btn color="accent" @click="e1 = 1" outlined dark
                    >atras</v-btn -->
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-btn color="error" @click="Cancelar()">Cancelar</v-btn>&nbsp;
                <v-btn
                  color="success"
                  @click="e1 = 2"
                  :disabled="lstRolesSelected.length < 1 ? true : false"
                  >Continuar</v-btn
                >
              </v-stepper-content>

              <v-stepper-content step="2">
                <h4
                  class="title font-weight-light ml-12"
                  style="color:#2f5572; margin:auto;"
                >
                  <b
                    >Seleccionar el/los grupos de usuarios que obtendrán los
                    roles seleccionados</b
                  >
                </h4>
                <br />
                <v-card class="mb-12" max-width="80%" style="margin:auto;">
                  <v-data-table
                    v-model="lstGruposSelected"
                    style="padding: 5px"
                    :headers="headersUsers"
                    :items="GruposFormat"
                    show-select
                    selectable-key="idgrupo"
                    item-key="idgrupo"
                    hide-default-footer
                    class="elevation-1"
                  >
                    <template slot="item.idusuario" slot-scope="props">
                      <tr>
                        <td>{{ props.item.grupoDesc }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-card>

                <v-divider></v-divider>
                <br />

                <v-btn color="accent" @click="e1 = 1" outlined dark>atras</v-btn
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-btn color="error" @click="Cancelar()">Cancelar</v-btn>&nbsp;
                <v-btn
                  color="success"
                  @click="AsignarRolesUsers"
                  :disabled="lstGruposSelected.length < 1 ? true : false"
                  >Asignar Roles A Grupos &nbsp;
                  <v-icon> mdi-location-enter </v-icon></v-btn
                >
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-form>
        <!-- <v-divider></v-divider>
						<v-card-actions style="justify-content: center;padding:10px">
							
							<v-spacer></v-spacer>
							<v-btn color="error" dark @click="Cancelar()">Cancelar</v-btn>
							<v-btn color="success" dark @click="Grabar()">Continuar</v-btn>
        </v-card-actions>-->
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script src="./GrpUsrRolesInstituciones.ts"></script>
