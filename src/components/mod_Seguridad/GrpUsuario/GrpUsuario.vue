<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col sm="3">
          <v-list shaped>
            <v-subheader class="subtitle-1 font-weight-bold"
              >Grupos de Institución</v-subheader
            >
            <v-list-item-group color="special">
              <v-list-item
                v-for="(grupo, i) in lstGrupoXinstit"
                :key="i"
                @click="filtroUsuariosGrupoSelected(grupo.idgrupo)"
              >
                <v-list-item-icon>
                  <v-icon>mdi-account-supervisor-circle</v-icon>
                  <!-- <v-icon>mdi-atm</v-icon> -->
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title style="text-align: left">
                    {{ grupo.descripcion }}
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
          <v-btn class="success" elevation="8" @click="showGrupo">
            <v-icon>mdi-account-switch</v-icon>&nbsp; Gestionar Grupos
          </v-btn>
        </v-col>
        <v-col sm="9">
          <v-card>
            <v-subheader class="subtitle-1 font-weight-bold">
              Usuarios de Grupo
              <v-spacer></v-spacer>
              <v-btn class="accent" elevation="8" @click="showUsers">
                <v-icon>mdi-account-convert</v-icon>&nbsp; Gestionar Usuarios
              </v-btn>
            </v-subheader>
            <v-divider></v-divider>
            <v-data-table
              v-bind:headers="headersUsers"
              :items="lstUserXgrupo"
              class="elevation-1"
              sort-by="nombre"
              :sort-desc="true"
            >
              <template slot="item" slot-scope="props">
                <tr>
                  <td>{{ props.item.nombre }}</td>
                  <td>
                    <v-icon v-if="props.item.usrdominio">mdi-check-bold</v-icon>
                    <v-icon v-else>mdi-close-outline</v-icon>
                  </td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ FormatDate(props.item.fechacreacion) }}</td>
                </tr>
              </template>
              <v-card-actions
                style="justify-content: center;padding:5px"
              ></v-card-actions>
              <template slot="no-data">
                <v-alert :value="true" color="background" dark icon="warning"
                  >Sin Registros, añada un Usuario al grupo o seleccione
                  Otro</v-alert
                >
              </template>
              <template slot="footer">
                <v-autocomplete
                  v-model="userSelected"
                  class="pa-2"
                  :items="lstUser"
                  item-text="nombre"
                  item-value="idusuario"
                  label="Asignar/Excluir Usuario"
                  outlined
                  prepend-icon="mdi-account-arrow-right"
                  return-object
                  autocomplete="off"
                  color="special"
                  @input="asignacionUser"
                >
                  <template v-slot:item="data">
                    <v-list-item-avatar>
                      <img src="/images/logoAlpha.png" style="width=5%" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.nombre"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-html="data.item.email"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!--//?? Componentes de Pop Ups -->
    <!-- <grupo />
    <user /> -->
  </v-card>
</template>

<script src="./GrpUsuario.ts"></script>
