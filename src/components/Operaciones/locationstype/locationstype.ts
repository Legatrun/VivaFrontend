import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmlocationstypeComponent extends Vue {
	private headers: any[] = [
		//{ text: 'ID', align: 'left', sortable: true, value: 'id', width: '15%' },
		{ text: 'Identificacion', align: 'left', sortable: false, value: 'identification', width: '15%' },
		{ text: 'Descripcion', align: 'left', sortable: false, value: 'description', width: '30%' },
		{ text: 'Calendario', align: 'left', sortable: false, value: 'calendarid', width: '30%' },
		/*
		{ text: 'createtimestamp', align: 'left', sortable: false, value: 'createtimestamp', width: '15%' },
		{ text: 'updatetimestamp', align: 'left', sortable: false, value: 'updatetimestamp', width: '15%' },
		{ text: 'createuser', align: 'left', sortable: false, value: 'createuser', width: '15%' },
		{ text: 'updateuser', align: 'left', sortable: false, value: 'updateuser', width: '15%' },
		   */
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
     
		
	];
	// tslint:disable-next-line: variable-name
	private menu_createtimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_updatetimestamp: boolean = false;
	private WebApi = new services.Endpoints();
	private locationstype = new services.clase_locationstype();
	private lstlocationstype: services.clase_locationstype[] = [];
	private lstlocationstypecargar: services.clase_locationstype[] = [];
	private calendarios = new services.clase_calendar();
	private lstcalendarios: services.clase_calendar[] = [];
	private buscarlocationstype = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activa = false;
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
	];
	RulLetras = [
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => !(!/^[a-z A-Z]*$/.test(v)) || "No se permite vacio o espacios en blanco",
	];
	private FormatDate(data: any) {
		return moment(data).format('YYYY-MM-DD');
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
		new services.Operaciones().Consultar(this.WebApi.ws_locationstype_Consultar)
			.then((reslocationstype) => {
				if (reslocationstype.data._error.error === 0) {
					this.lstlocationstype = reslocationstype.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', reslocationstype.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
		this.cargarCalendario();
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
		this.locationstype = new services.clase_locationstype();
		this.locationstype.createtimestamp = this.FormatDate(Date.now());
		this.locationstype.updatetimestamp = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_locationstype_Actualizar, this.locationstype)
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
		new services.Operaciones().Insertar(this.WebApi.ws_locationstype_Insertar, this.locationstype)
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
	private Actualizar(data: services.clase_locationstype): void {
		this.locationstype = data;
		this.locationstype.createtimestamp = this.FormatDate(Date.now());
		this.locationstype.updatetimestamp = this.FormatDate(Date.now());
	
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_locationstype): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.id,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_locationstype_Eliminar, data)
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

	private formatCalendar(idCalendar:any):string{
		var _calendarIdentification = "";
		this.lstcalendarios.forEach(function (calendarios){
			if(calendarios.id == idCalendar){
				_calendarIdentification = calendarios.identification;
				
			}
		})

		return _calendarIdentification;
	}
}
