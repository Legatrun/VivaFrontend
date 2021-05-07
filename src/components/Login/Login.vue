<template>
    <section>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md7>
                        <v-card color="bodyform">
                            <v-toolbar dark color="headerform">
                                <v-flex xs1>
                                    <v-icon>shield</v-icon>
                                </v-flex>
                                <v-toolbar-title class="header-form-login">Entrar</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field  
                                        class="input-small"                         
                                        v-model="login.usuario"
                                        color="textcolor"
                                        prepend-icon="person" 
                                        name="login" 
                                        placeholder="Usuario"
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
                                <v-flex md12>
                                    <v-btn color="success" @click="ingresar">Ingresar</v-btn>
                                </v-flex>
                                <v-flex md12>
                                    <v-btn color="accent" @click="reset">Limpiar</v-btn>
                                </v-flex>
                                <v-flex md6>
                                    <v-btn color="error" @click="cancelar">Cancelar</v-btn>
                                </v-flex>
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
    padding-left:33%;
    font-size: 2.3em;
    color:#cfe0de;
    font-weight: 700;
}
.input-small{
  font-size: 1.7em; /* tamaño de letra */
}
</style>