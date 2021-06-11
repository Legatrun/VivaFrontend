<template>
  <v-app id="inspire" class='app-login'>
        <v-app-bar v-if="!$store.state.auth" class="primary header-app" dark fixed clipped-left app>
          <img rounded width="70px" height="70px" src="/images/logo.png"/>
            <v-toolbar-title class="v-toolbar-title-app">
                <h2>Bill Payment</h2>
                <h4>Administration Portal</h4>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text @click="Login()">
                    <v-icon style="padding-left:20px; padding-bottom:10px">mdi-login</v-icon>
                    <h3>Entrar</h3>
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-navigation-drawer v-if="$store.state.auth" color="menubar" expand-on-hover permanent app>
            <v-icon style="padding-left:20px; padding-bottom:10px" x-large>mdi-menu</v-icon>
            <Menu></Menu>
        </v-navigation-drawer>
        <v-app-bar class="primary header-session-app" v-if="$store.state.auth" dark fixed clipped-left app>
             <img rounded width="70px" height="70px" src="/images/logo.png"/>
             <v-toolbar-title class="v-toolbar-title-app">
                <h2>Bill Payment</h2>
                <h4>Administration Portal</h4>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <!-- <v-btn text>
                    <v-icon style="padding-left:20px; padding-bottom:10px">mdi-pencil</v-icon>
                    <h3>Contraseña</h3>
                </v-btn> -->
                <v-btn text @click="Logout()">
                    <v-icon style="padding-left:20px; padding-bottom:10px">mdi-location-exit</v-icon>
                    <h3>Salir</h3>
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <main class="body-background">
            <v-content>
                <v-container grid-list-xl>
                    <router-view></router-view>
                </v-container>
            </v-content>
        </main>
        <v-footer class="footer" app fixed>
            <span class="white--text">&copy; {{ new Date().getFullYear()}} PORTAL|</span>
            <!-- <v-spacer/> -->
            <span class="white--text"> v{{version}}</span>
        </v-footer>
    </v-app>
</template>
<script src="./App.ts"></script>
<style scoped>
/************ APP ***************/
.body-background {
  /* The image used */
  /* background-image: url("/images/background3.jpg"); */
  background-color: #508146;
  /* Full height */
  height: 100%;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
/* HEADER */
.header-app {
    height: 0px;
}
.header-session-app {
    height: 0px;
    padding-left: 70px;
}
.v-toolbar-title-app {
  padding-left: 20px;
}
.v-app-bar-app {
    height: "0px";
}
/* FOOTER */
.footer-app {
    height: 0px;
}
.v-toolbar-title-login {
    padding-left: 40px;
    font-size: 1.8em;
}
.menu-position{
    padding-left: 40px;
}
/* APP */
</style>