<template>
  <div >
  <v-card color="headerform">
    <v-list class="menubarbuttons" dense nav>
      <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path" no-action>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="font-size:1.2em; color:white">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group v-for="item in menuParametros" :key="item.title" :prepend-icon="item.icon" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title style="font-size:1.2em; color:#c6ffc1" v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-for="subItem in menuListaParametros" :key="subItem.title" :to="subItem.path" no-action>
          <v-list-item-content>
            <v-list-item-title style="font-size:1.3em; color:white" v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item v-for="item in menuSalir" :key="item.title" @click="Logout()">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>            
        <v-list-item-content>
          <v-list-item-title style="font-size:1.2em; color:grey">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
  </div>
</template>

<script src="./Menu.ts"></script>