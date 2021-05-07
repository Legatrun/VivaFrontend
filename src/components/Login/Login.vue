<template>
    <section>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card>
                            <v-toolbar dark color="headerform">
                                <v-flex xs1>
                                    <v-icon>people</v-icon>
                                </v-flex>
                                <v-toolbar-title class="header-form-login">Ingreso de Usuario</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field  
                                        class="input-small"                         
                                        v-model="login.usuario"
                                        color="textcolor"
                                        prepend-icon="person" 
                                        name="login" 
                                        placeholder="Nombre de Usuario"
                                        type="text"
                                        clear-icon="mdi-close-circle"
                                        clearable
                                        @click:clear="ClearUsername"
                                        required
                                        :rules="requiredRule"
                                        ></v-text-field>
                                    <v-text-field 
                                        class="input-small"                         
                                        v-model="login.password" color="textcolor" 
                                        id="password"
                                        prepend-icon="lock" 
                                        clear-icon="mdi-close-circle"
                                        @click:clear="ClearPass"
                                        clearable
                                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append="showPassword = !showPassword" 
                                        name="password" 
                                        placeholder="Contraseña"
                                        :type="showPassword ? 'text' : 'password'"
                                        counter
                                        required
                                        :rules="requiredRule"
                                        @keyup.native.enter="Aux"
                                        ></v-text-field>
                                    <v-spacer></v-spacer>
                                </v-form>
                            </v-card-text>
                            <v-card-actions style="justify-content: center">
                                <v-btn color="success" style="width: 32.5%" @click="ingresar">Ingresar</v-btn>
                                <v-btn color="error" style="width: 32.5%" @click="cancelar">Cancelar</v-btn>
                                <v-btn color="accent" style="width: 32.5%" @click="reset">Limpiar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </section>
</template>

<script src="./Login.ts"></script>
<style scoped>
.header-form-login {
    padding-left:50px;
    font-size: 1.6em;
}
.input-small{
  font-size: 1.8em; /* tamaño de letra */
}
</style>