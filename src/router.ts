import Vue from 'vue';
import Router from 'vue-router';
import Inicio from './components/Inicio/Inicio.vue';
import Login from './components/Login/Login.vue';
import Principal from './components/Principal/Principal.vue';
import applicationdefinition from './components/Operaciones/applicationdefinition/applicationdefinition.vue';
import batches from './components/Operaciones/batches/batches.vue';
import calendar from './components/Operaciones/calendar/calendar.vue';
import calendardayexception from './components/Operaciones/calendardayexception/calendardayexception.vue';
import calendarhourrange from './components/Operaciones/calendarhourrange/calendarhourrange.vue';
import calendarversion from './components/Operaciones/calendarversion/calendarversion.vue';
import dayofweek from './components/Operaciones/dayofweek/dayofweek.vue';
import devicealarms from './components/Operaciones/devicealarms/devicealarms.vue';
import deviceinstalation from './components/Operaciones/deviceinstalation/deviceinstalation.vue';
import deviceinstalationprovider from './components/Operaciones/deviceinstalationprovider/deviceinstalationprovider.vue';
import deviceinstalationtransactionpr from './components/Operaciones/deviceinstalationtransactionpr/deviceinstalationtransactionpr.vue';
import deviceresumeprocess from './components/Operaciones/deviceresumeprocess/deviceresumeprocess.vue';
import devices from './components/Operaciones/devices/devices.vue';
import devicestatuscolletions from './components/Operaciones/devicestatuscolletions/devicestatuscolletions.vue';
import devicestatuscolletionsresume from './components/Operaciones/devicestatuscolletionsresume/devicestatuscolletionsresume.vue';
import devicetypes from './components/Operaciones/devicetypes/devicetypes.vue';
import events from './components/Operaciones/events/events.vue';
import jobs from './components/Operaciones/jobs/jobs.vue';
import locations from './components/Operaciones/locations/locations.vue';
import locationstype from './components/Operaciones/locationstype/locationstype.vue';
import mailingaddress from './components/Operaciones/mailingaddress/mailingaddress.vue';
import provider from './components/Operaciones/provider/provider.vue';
import tb_grupos from './components/Operaciones/tb_grupos/tb_grupos.vue';
import tb_histpwd from './components/Operaciones/tb_histpwd/tb_histpwd.vue';
import tb_params from './components/Operaciones/tb_params/tb_params.vue';
import tb_perfiles from './components/Operaciones/tb_perfiles/tb_perfiles.vue';
import tb_sesiones from './components/Operaciones/tb_sesiones/tb_sesiones.vue';
import tb_usuarios from './components/Operaciones/tb_usuarios/tb_usuarios.vue';
import transactiondefinition from './components/Operaciones/transactiondefinition/transactiondefinition.vue';
import transactions from './components/Operaciones/transactions/transactions.vue';
import reports from './components/Operaciones/reports/reports.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{ path: '/', name: 'Inicio', component: Inicio },
		{ path: '/Login', name: 'Login', component: Login },
		{ path: '/Principal', name: 'Principal', component: Principal  },
		{ path: '/applicationdefinition', name: 'applicationdefinition', component: applicationdefinition },
		{ path: '/batches', name: 'batches', component: batches },
		{ path: '/calendar', name: 'calendar', component: calendar },
		{ path: '/calendardayexception', name: 'calendardayexception', component: calendardayexception },
		{ path: '/calendarhourrange', name: 'calendarhourrange', component: calendarhourrange },
		{ path: '/calendarversion', name: 'calendarversion', component: calendarversion },
		{ path: '/dayofweek', name: 'dayofweek', component: dayofweek },
		{ path: '/devicealarms', name: 'devicealarms', component: devicealarms },
		{ path: '/deviceinstalation', name: 'deviceinstalation', component: deviceinstalation },
		{ path: '/deviceinstalationprovider', name: 'deviceinstalationprovider', component: deviceinstalationprovider },
		{ path: '/deviceinstalationtransactionpr', name: 'deviceinstalationtransactionpr', component: deviceinstalationtransactionpr },
		{ path: '/deviceresumeprocess', name: 'deviceresumeprocess', component: deviceresumeprocess },
		{ path: '/devices', name: 'devices', component: devices },
		{ path: '/devicestatuscolletions', name: 'devicestatuscolletions', component: devicestatuscolletions },
		{ path: '/devicestatuscolletionsresume', name: 'devicestatuscolletionsresume', component: devicestatuscolletionsresume },
		{ path: '/devicetypes', name: 'devicetypes', component: devicetypes },
		{ path: '/events', name: 'events', component: events },
		{ path: '/jobs', name: 'jobs', component: jobs },
		{ path: '/locations', name: 'locations', component: locations },
		{ path: '/locationstype', name: 'locationstype', component: locationstype },
		{ path: '/mailingaddress', name: 'mailingaddress', component: mailingaddress },
		{ path: '/provider', name: 'provider', component: provider },
		{ path: '/tb_grupos', name: 'tb_grupos', component: tb_grupos },
		{ path: '/tb_histpwd', name: 'tb_histpwd', component: tb_histpwd },
		{ path: '/tb_params', name: 'tb_params', component: tb_params },
		{ path: '/tb_perfiles', name: 'tb_perfiles', component: tb_perfiles },
		{ path: '/tb_sesiones', name: 'tb_sesiones', component: tb_sesiones },
		{ path: '/tb_usuarios', name: 'tb_usuarios', component: tb_usuarios },
		{ path: '/transactiondefinition', name: 'transactiondefinition', component: transactiondefinition },
		{ path: '/transactions', name: 'transactions', component: transactions },
		{ path: '/reports', name: 'reports', component: reports },
	],
});

