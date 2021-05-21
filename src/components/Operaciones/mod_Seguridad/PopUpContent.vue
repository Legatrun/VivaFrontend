<template>
  <v-dialog v-model="$store.state.popUpContentDialog" persistent>
    <v-card max-width="90%" style="margin:auto;">
      <v-toolbar color="primary" style="color:white">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <template>
        <GrpUsuario
          v-if="
            content == 'USUARIOS' &&
              $store.state.popUpContent != 'GestionGrupos' &&
              $store.state.popUpContent != 'GestionUsuarios'
          "
        />
        <v-expand-x-transition>
          <Grupo v-if="$store.state.popUpContent == 'GestionGrupos'" />
        </v-expand-x-transition>
        <v-expand-x-transition>
          <Usuarios v-if="$store.state.popUpContent == 'GestionUsuarios'" />
        </v-expand-x-transition>
        <InstitucionesRoles
          v-if="
            content == 'ROLES' &&
              $store.state.popUpContent != 'GestionRoles' &&
              $store.state.popUpContent != 'GestionAplicaciones' &&
              $store.state.popUpContent != 'GestionModulos'
          "
        ></InstitucionesRoles>
        <v-expand-x-transition>
          <Roles v-if="$store.state.popUpContent == 'GestionRoles'" />
        </v-expand-x-transition>
        <v-expand-x-transition>
          <Aplicaciones
            v-if="$store.state.popUpContent == 'GestionAplicaciones'"
          />
        </v-expand-x-transition>
        <v-expand-x-transition>
          <Modulos v-if="$store.state.popUpContent == 'GestionModulos'" />
        </v-expand-x-transition>
        <GrpUsrRolesInstituciones v-if="content == 'ROLESGRUPOS'" />
      </template>
      <v-btn color="special" dark block @click="cerrar">Cerrar</v-btn>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import GrpUsuario from "./GrpUsuario/GrpUsuario";
import Grupo from "./Grupo/Grupo";
import Usuarios from "./Usuarios/Usuarios";
import InstitucionesRoles from "./InstitucionesRoles/InstitucionesRoles";
import Roles from "./Roles/Roles";
import Aplicaciones from "./Aplicaciones/Aplicaciones";
import Modulos from "./Modulos/Modulos";
import GrpUsrRolesInstituciones from "./GrpUsrRolesInstituciones/GrpUsrRolesInstituciones";

@Component({
  components: {
    GrpUsuario,
    Grupo,
    Usuarios,
    InstitucionesRoles,
    Roles,
    Aplicaciones,
    Modulos,
    GrpUsrRolesInstituciones,
  },
})
export default class PopUpContent extends Vue {
  //   @Prop({ default: "Dialog" })
  //   title!: string;
  @Prop() title!: string;
  @Prop() content!: string;

  created() {}

  private cerrar() {
    this.$store.commit("switchPopUpContentDialog");
    this.$store.commit("setPopUpContent", "");
  }
}
</script>

<style></style>
