import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: false,
    server: 'http://localhost:57171/',
    user: '',
    pass:'',
    serverAgen:'http://localhost:57171/', 
    snackbarAgencia: false,
    snackbarErrorRegistroAgencia: false,
    snackbarCentraliza: false,
    porcentajeCentraliza: 0,
    totalTicketsCentraliza: 0,
    currentTicketsCentraliza: 0,
    agenciaSelected: 0,
    agenciaOrigenSelected: 0,
    lstAgencias: [],
    lstWSAgencias: [],
    lstPromises: [],
    instrucciones: false,
    //** DIALOGS */
    popUpContentDialog: false,
    popUpContent: '',
    popUpPassword: false,
    //** SELECTIONS */
    institucionSelected: -1,
    rolSelected: '',
    aplicacionSelected: '',
    centralIDresponse: 0,
    //** AUX */
    agenciaUpdateFlag : false
  },
  plugins: [
    createPersistedState({
      key: 'auth',
    }),
  ],
  mutations: {
    login(state) {
      state.auth = true;
    },
    logout(state) {
      state.auth = false;
    },
    setUser(state, value) {
      state.user = value;
    },
    setPass(state, value){
      state.pass = value;
    },
    setServer(state, value) {
      state.server = value;
    },
    setAgencias (state, value) {
      state.lstAgencias = value;
    },
    setWSAgencias (state, value) {
      state.lstWSAgencias = value;
    },
    changeAgencia(state, value) {
      state.agenciaSelected = value;
    },
    changeAgenciaOrigen(state, value) {
      state.agenciaOrigenSelected = value;
    },
    falseSnackAgencia(state) {
      state.snackbarAgencia = false;
    },
    trueSnackAgencia(state) {
      state.snackbarAgencia = true;
    },
    switchSnackErrorRegAgencia(state) {
      state.snackbarErrorRegistroAgencia = !state.snackbarErrorRegistroAgencia;
    },
    switchSnackCentralizacion(state) {
      state.snackbarCentraliza = !state.snackbarCentraliza;
    },
    setTotalTicketsCentraliza(state, value) {
      state.totalTicketsCentraliza = value;
    },
    addCurrentTicketsCentraliza(state){
      state.currentTicketsCentraliza ++;
    },
    setPorcentajeCentraliza(state, value) {
      state.porcentajeCentraliza = value;
    },
    setPromises(state, value) {
      state.lstPromises = value;
    },
    setInstrucciones(state, value){
      state.instrucciones = value;
    },
    selectInstitucion(state, value) {
      state.institucionSelected = value;
    },
    switchPopUpContentDialog(state) {
      state.popUpContentDialog = !state.popUpContentDialog;
    },
    setPopUpContent(state, value){
      state.popUpContent = value;
    },
    select_Rol(state, value) {
      state.rolSelected = value;
    },
    select_Aplicacion(state, value) {
      state.aplicacionSelected = value;
    },
    switch_popUpPassword(state) {
      state.popUpPassword = !state.popUpPassword;
    },
    setIDCentral(state, value){
      state.centralIDresponse = value; 
    },
    switchAgenciaUpdateFlag(state) {
      state.agenciaUpdateFlag = !state.agenciaUpdateFlag;
    }
  },
  actions: {},
});

