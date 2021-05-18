import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmlocationsComponent extends Vue {
	private headers: any[] = [
		{ text: 'Identificacion', align: 'left', sortable: true, value: 'identification', width: '15%' },
		{ text: 'Descripcion', align: 'left', sortable: false, value: 'description', width: '40%' },
		//{ text: 'type', align: 'left', sortable: false, value: 'type', width: '15%' },
		{ text: 'Habilitada', align: 'left', sortable: false, value: 'enabled', width: '15%' },
		/*
		{ text: 'createtimestamp', align: 'left', sortable: false, value: 'createtimestamp', width: '15%' },
		{ text: 'updatetimestamp', align: 'left', sortable: false, value: 'updatetimestamp', width: '15%' },
		{ text: 'createuser', align: 'left', sortable: false, value: 'createuser', width: '15%' },
		{ text: 'updateuser', align: 'left', sortable: false, value: 'updateuser', width: '15%' },
		{ text: 'address', align: 'left', sortable: false, value: 'address', width: '15%' },
		{ text: 'zipcode', align: 'left', sortable: false, value: 'zipcode', width: '15%' },
		{ text: 'city', align: 'left', sortable: false, value: 'city', width: '15%' },
		{ text: 'city_code', align: 'left', sortable: false, value: 'city_code', width: '15%' },
		{ text: 'state', align: 'left', sortable: false, value: 'state', width: '15%' },
		{ text: 'state_code', align: 'left', sortable: false, value: 'state_code', width: '15%' },
		{ text: 'country', align: 'left', sortable: false, value: 'country', width: '15%' },
		{ text: 'identificationprovider', align: 'left', sortable: false, value: 'identificationprovider', width: '15%' },
		{ text: 'email', align: 'left', sortable: false, value: 'email', width: '15%' },
		{ text: 'areacode', align: 'left', sortable: false, value: 'areacode', width: '15%' },
		{ text: 'geocoordinates', align: 'left', sortable: false, value: 'geocoordinates', width: '15%' },
		{ text: 'replanishmentemail', align: 'left', sortable: false, value: 'replanishmentemail', width: '15%' },
		{ text: 'calendarid', align: 'left', sortable: false, value: 'calendarid', width: '15%' },
		{ text: 'locationtypeid', align: 'left', sortable: false, value: 'locationtypeid', width: '15%' },
			*/
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	
	];
	// tslint:disable-next-line: variable-name
	private menu_createtimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_updatetimestamp: boolean = false;
	private WebApi = new services.Endpoints();

	private locations = new services.clase_locations();
	private lstlocations: services.clase_locations[] = [];
	private locationsType = new services.clase_locationstype();
	private lstlocationsType: services.clase_locationstype[] = [];
	private calendarios = new services.clase_calendar();
	private lstcalendarios: services.clase_calendar[] = [];
	private buscarlocations = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activa = false;
	private listahbil: any[] = [
		{habilitado: 'SI',value:1},{habilitado:'NO',value:0}
	];
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
	];
	RulLetras = [
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => !(!/^[a-z A-Z]*$/.test(v)) || "No se permite vacio o espacios en blanco",
	];
	Rules = [
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => !(!/^[a-z A-Z]*$/.test(v)) || "No se permiten numeros o caracteres especiales",
	];
	habilitado = [
		
		(v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',

	];
	RulEmpEmai = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => ( /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) || "Email no es valido"
	];
	private FormatDate(data: any) {
		return moment(data).format('YYYY-MM-DD');
	}
	private Formathabilitado(data: any){
		if (data == 1){
			return 'SI';
		}else{
			return 'NO';
		}
     }	
    private FormatBoolean(data: any) {
		if (data) {
			return 'SI';
		} else {
			return 'NO';
		}
	}
	private updateText(Value: string) {
		if (Value !== null) {
			return Value.toUpperCase();
		} else {
			return Value;
		}
	}
	private mounted() {
		this.cargar_data();
	}
	private cargar_data() {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		new services.Operaciones().Consultar(this.WebApi.ws_locations_Consultar)
			.then((reslocations) => {
				if (reslocations.data._error.error === 0) {
					this.lstlocations = reslocations.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', reslocations.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
		this.cargarTypeLocation();
		this.cargarCalendario();
	}

	private cargarTypeLocation(){
		new services.Operaciones().Consultar(this.WebApi.ws_locationstype_Consultar)
			.then((restepyloca) => {
				if (restepyloca.data._error.error === 0) {
					this.lstlocationsType = restepyloca.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restepyloca.data._error.descripcion);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});
	}
	private cargarCalendario(){
		new services.Operaciones().Consultar(this.WebApi.ws_calendar_Consultar)
			.then((rescalendar) => {
				if (rescalendar.data._error.error === 0) {
					this.lstcalendarios = rescalendar.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', rescalendar.data._error.Descripcion);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});
	}
	private Insertar(): void {
		this.locations = new services.clase_locations();
		this.locations.createtimestamp = this.FormatDate(Date.now());
		this.locations.updatetimestamp = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_locations_Actualizar, this.locations)
			.then((result) => {
				if (result.data.error === 0) {
					this.popup.success('Actualizar', result.data.descripcion);
				this.cargar_data();
				this.dialog = false;
			} else {
			this.popup.error('Actualizar', result.data.descripcion);
			}
		})
		.catch((error) => {
			this.popup.error('Actualizar', 'Error Inesperado: ' + error);
			});
	} else {
		new services.Operaciones().Insertar(this.WebApi.ws_locations_Insertar, this.locations)
		.then((result) => {
			if (result.data.error === 0) {
			this.popup.success('Insertar', result.data.descripcion);
			this.cargar_data();
			this.dialog = false;
			} else {
			this.popup.error('Insertar', result.data.descripcion);
			}
		})
		.catch((error) => {
			this.popup.error('Insertar', 'Error Inesperado: ' + error);
			});
		}
	}
	private Cancelar() {
		this.cargar_data();
		this.dialog = false;
	}
	private Actualizar(data: services.clase_locations): void {
		this.locations = data;
		this.locations.createtimestamp = this.FormatDate(Date.now());
		this.locations.updatetimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_locations): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.identification,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_locations_Eliminar, data)
				.then((result) => {
				if (result.data.error === 0) {
					swal.fire({
					type: 'success',
					title: 'Eliminar',
					text: result.data.descripcion,
					showConfirmButton: false,
					timer: 2000,
				});
				this.cargar_data();
				} else {
					swal.fire({
						type: 'error',
						title: 'Eliminar',
						text: result.data.descripcion,
						showConfirmButton: false,
						timer: 2000,
					});
				}
			}).catch((error) => {
				swal.fire({
					type: 'error',
					title: 'Eliminar',
					text: 'Error Inesperado',
					showConfirmButton: false,
					timer: 2000,
				});
			});
		}
		});
	}
}
