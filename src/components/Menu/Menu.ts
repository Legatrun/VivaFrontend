import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';
import swal from 'sweetalert2';

class MenuItem {
    constructor(
        public title: string,
        public icon: string,
        public path: string,
    ) { }
}

// tslint:disable-next-line: max-classes-per-file
@Component

export default class MenuComponent extends Vue {
    public menuItems: MenuItem[] = [
        new MenuItem('Transacciones', 'mdi-cash-multiple', '/transactions'), 
        new MenuItem('Lotes', 'mdi-archive', '/batches'), 
        new MenuItem('Terminales', 'mdi-laptop', '/devices'), 
        new MenuItem('Sucursales', 'mdi-bank', '/locations'), 
        new MenuItem('Tipos de Sucursales', 'mdi-bank-transfer', '/locationstype'), 
        new MenuItem('Estados', 'mdi-chart-bar-stacked', '/devicestatuscolletions'), 
        new MenuItem('Reportes', 'mdi-chart-arc', '/reports'), 
        new MenuItem('Calendarios', 'mdi-calendar', '/calendar'), 
        new MenuItem('Usuarios', 'mdi-human-capacity-increase', '/tb_usuarios'), 
    ];

    public menuParametros: MenuItem[] = [
        new MenuItem ('Otros', 'mdi-more', ''),
    ];
    public menuListaParametros: MenuItem[] = [
        new MenuItem('applicationdefinition', 'exit_to_app', '/applicationdefinition'), 
        new MenuItem('batches', 'exit_to_app', '/batches'), 
        new MenuItem('calendar', 'exit_to_app', '/calendar'), 
        new MenuItem('calendardayexception', 'exit_to_app', '/calendardayexception'), 
        new MenuItem('calendarhourrange', 'exit_to_app', '/calendarhourrange'), 
        new MenuItem('calendarversion', 'exit_to_app', '/calendarversion'), 
        new MenuItem('dayofweek', 'exit_to_app', '/dayofweek'), 
        new MenuItem('devicealarms', 'exit_to_app', '/devicealarms'), 
        new MenuItem('deviceinstalation', 'exit_to_app', '/deviceinstalation'), 
        new MenuItem('deviceinstalationprovider', 'exit_to_app', '/deviceinstalationprovider'), 
        new MenuItem('deviceinstalationtransactionpr', 'exit_to_app', '/deviceinstalationtransactionpr'), 
        new MenuItem('deviceresumeprocess', 'exit_to_app', '/deviceresumeprocess'), 
        new MenuItem('devices', 'exit_to_app', '/devices'), 
        new MenuItem('devicestatuscolletions', 'exit_to_app', '/devicestatuscolletions'), 
        new MenuItem('devicestatuscolletionsresume', 'exit_to_app', '/devicestatuscolletionsresume'), 
        new MenuItem('devicetypes', 'exit_to_app', '/devicetypes'), 
        new MenuItem('events', 'exit_to_app', '/events'), 
        new MenuItem('jobs', 'exit_to_app', '/jobs'), 
        new MenuItem('locations', 'exit_to_app', '/locations'), 
        new MenuItem('locationstype', 'exit_to_app', '/locationstype'), 
        new MenuItem('mailingaddress', 'exit_to_app', '/mailingaddress'), 
        new MenuItem('provider', 'exit_to_app', '/provider'), 
        new MenuItem('tb_grupos', 'exit_to_app', '/tb_grupos'), 
        new MenuItem('tb_histpwd', 'exit_to_app', '/tb_histpwd'), 
        new MenuItem('tb_params', 'exit_to_app', '/tb_params'), 
        new MenuItem('tb_perfiles', 'exit_to_app', '/tb_perfiles'), 
        new MenuItem('tb_sesiones', 'exit_to_app', '/tb_sesiones'), 
        new MenuItem('tb_usuarios', 'exit_to_app', '/tb_usuarios'), 
        new MenuItem('transactiondefinition', 'exit_to_app', '/transactiondefinition'), 
        new MenuItem('transactions', 'exit_to_app', '/transactions'), 
    ];

    public menuSalir: MenuItem[] = [
        new MenuItem ('Salir', 'exit_to_app', ''),
    ];

    public Logout() {
        swal.fire({
            title: 'Aplicacion',
            text: 'Esta seguro de salir del Sistema?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar!',
        }).then((result) => {
            if (result.value) {
                this.$store.commit('logout');
                localStorage.setItem('auth', this.$store.state.auth);
                this.$router.push({ path: '/' });
            }
        });
    }
}
