<template>
  <v-card>
    <section class="pa-2">
      <v-row>
        <v-col sm="2">
          <v-list shaped>
            <v-subheader class="subtitle-1 font-weight-bold"
              >Roles de Institución</v-subheader
            >
            <v-list-item-group color="special">
              <v-list-item
                v-for="(rol, i) in lstInstitucionesRoles"
                :key="i"
                @click="searchData(rol.idrol)"
              >
                <v-list-item-icon>
                  <v-icon>mdi-account-supervisor-circle</v-icon>
                  <!-- <v-icon>mdi-atm</v-icon> -->
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title style="text-align: left">
                    {{ getRolDesc(rol.idrol) }}
                    <!-- &nbsp;&nbsp;&nbsp; //?? (Mejora) En caso de requerir suprimir item
						<v-btn
							@click="suprimirEquipo(equipo.cod_equipo)"
							small
							text
							icon
							color="error"
						>
							<v-icon>mdi-minus-circle</v-icon>
                      </v-btn>-->
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-divider></v-divider>
          <br />
          <v-btn class="success" elevation="8" @click="showDialog('Roles')">
            <v-icon>mdi-account-lock</v-icon>&nbsp; Gestionar Roles
          </v-btn>
        </v-col>
        <v-col :sm="aplicacionSelected.length > 0 ? 5 : 10">
          <!--//?? Aplicaciones de rol-->
          <v-card flat>
            <strong class="subtitle-1 font-weight-bold pt-5"
              >Aplicaciones de Rol</strong
            >
            <v-subheader
              class="body-2 font-weight-bold"
              color="indigo darken-1"
            >
              <p>A qué aplicaciones tendrá acceso el rol seleccionado?</p>

              <v-spacer></v-spacer>
              <v-btn
                class="accent"
                elevation="8"
                @click="showDialog('Aplicaciones')"
              >
                <v-icon>mdi-apps</v-icon>&nbsp; Gestionar Aplicaciones
              </v-btn>
            </v-subheader>
            <v-divider></v-divider>
            <v-data-table
              v-model="aplicacionSelected"
              :items="lstAplicacionesRol"
              :headers="headersAplicaciones"
              class="elevation-1"
              sort-by="nombre"
              :sort-desc="true"
              show-select
              single-select
              selectable-key="idaplicacion"
              item-key="idaplicacion"
              @item-selected="filterModulosXAplicacionRol"
            >
              //?? Importante: props selactable-key e item-key para evitar
              seleccion multiple
              <v-card-actions
                style="justify-content: center;padding:5px"
              ></v-card-actions>
              <template slot="no-data">
                <v-alert :value="true" color="background" dark icon="warning">
                  Sin Registros, añada una Aplicación al rol o seleccione Otra
                </v-alert>
              </template>
              <template slot="footer">
                <v-autocomplete
                  v-model="aplicacionRolAsignar.idaplicacion"
                  class="pa-2"
                  :items="lstAplicaciones"
                  item-text="nombre"
                  item-value="idaplicacion"
                  label="Asignar/Excluir Aplicacion"
                  outlined
                  prepend-icon="mdi-open-in-app"
                  return-object
                  autocomplete="off"
                  color="special"
                  @input="asignacionApp"
                >
                  <template v-slot:item="data">
                    <v-list-item-avatar>
                      <v-icon>mdi-apps-box</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.nombre"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-html="data.item.descripcion"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col
          v-if="aplicacionSelected.length > 0"
          sm="5"
          transition="fab-transition"
        >
          <!--//?? Módulos de App-->
          <v-card flat>
            <strong class="subtitle-1 font-weight-bold pt-5"
              >Módulos de Aplicación</strong
            >
            <v-subheader
              class="body-2 font-weight-bold"
              color="indigo darken-1"
            >
              <p>
                A qué módulos se tendrá acceso en la aplicación seleccionada?
              </p>

              <v-spacer></v-spacer>
              <v-btn
                class="special"
                elevation="8"
                dark
                @click="showDialog('Modulos')"
              >
                <v-icon>mdi-hexagon-multiple</v-icon>&nbsp; Gestionar Módulos
              </v-btn>
            </v-subheader>
            <v-divider></v-divider>
            <v-data-table
              class="elevation-1"
              :headers="headersModulos"
              :items="lstModulosLlenados"
              :single-select="true"
            >
              <v-card-actions
                style="justify-content: center;padding:5px"
              ></v-card-actions>
              <template slot="no-data">
                <v-alert :value="true" color="background" dark icon="warning">
                  Sin Registros, agregue una Aplicación al rol o seleccione Otra
                </v-alert>
              </template>
              <template slot="item" slot-scope="props">
                <tr>
                  <td>{{ props.item.moduloDesc }}</td>
                  <td>
                    <v-select
                      v-model="props.item.valoresOperaciones"
                      :items="props.item.Operaciones"
                      item-text="text"
                      item-value="idOperacion"
                      label="Operaciones"
                      outlined
                      chips
                      multiple
                      return-object
                      @input="asignaOperacion(props.item)"
                    >
                    </v-select>
                    <!--//!! Caso de estudio: siempre asignar item-value con dígito, caso contrario habrá render solo del primer elemento-->
                  </td>
                </tr>
              </template>
              <template slot="footer">
                <v-autocomplete
                  class="pa-2"
                  :items="ModulosFormat"
                  item-value="idaplicacionesopmodulos"
                  item-text="moduloDesc"
                  label="Asignar/Excluir Módulo"
                  outlined
                  prepend-icon="mdi-open-in-app"
                  return-object
                  autocomplete="off"
                  color="special"
                  @input="asignacionMod"
                >
                  <template v-slot:item="data">
                    <v-list-item-avatar>
                      <v-icon>mdi-texture-box</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.moduloDesc"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </section>
    <!-- <roles />
      <aplicaciones />
      <Modulos /> -->
  </v-card>
</template>

<script src="./InstitucionesRoles.ts"></script>
