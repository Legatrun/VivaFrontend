import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmcalendarComponent extends Vue {
	private headers: any[] = [
		{ text: 'Identificación', align: 'left', sortable: true, value: 'identification', width: '20%' },
		{ text: 'Descripción', align: 'left', sortable: true, value: 'description', width: '30%' },
		{ text: 'Calendarios', align: 'left', sortable: true, value: 'description', width: '30%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private headersCalendarVersion: any[] = [
		{ text: 'Versión', align: 'left', sortable: true, value: 'description', width: '25%' },
		{ text: 'Videncia Desde', align: 'left', sortable: true, value: 'validfrom', width: '25%' },
		{ text: 'Vigencia Hasta', align: 'left', sortable: true, value: 'validuntil', width: '25%' },
		// { text: 'calendarid', align: 'left', sortable: false, value: 'calendarid', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '25%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_createtimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_updatetimestamp: boolean = false;
	private WebApi = new services.Endpoints();

	private calendar = new services.clase_calendar();
	private lstcalendar: services.clase_calendar[] = [];
	private lstcalendarversion: services.clase_calendarversion[] = [];
	private buscarcalendar = '';
	private dialog = false;
	private dialogVisualizar = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
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
		new services.Operaciones().Consultar(this.WebApi.ws_calendar_Consultar)
			.then((rescalendar) => {
				if (rescalendar.data._error.error === 0) {
					this.lstcalendar = rescalendar.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', rescalendar.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.calendar = new services.clase_calendar();
		this.calendar.createtimestamp = this.FormatDate(Date.now());
		this.calendar.updatetimestamp = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_calendar_Actualizar, this.calendar)
			.then((result) => {
				if (result.data.error === 0) {
					this.popup.success('Actualizar', result.data.descripcion);
				this.cargar_data();
				this.dialogVisualizar = false;
			} else {
			this.popup.error('Actualizar', result.data.descripcion);
			}
		})
		.catch((error) => {
			this.popup.error('Actualizar', 'Error Inesperado: ' + error);
			});
	} else {
		new services.Operaciones().Insertar(this.WebApi.ws_calendar_Insertar, this.calendar)
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
	private CancelarPopupVisualizar() {
		this.cargar_data();
		this.dialogVisualizar = false;
	}
	private Revisar(data: services.clase_calendar): void {
		this.calendar = data;
		this.calendar.createtimestamp = this.FormatDate(Date.now());
		this.calendar.updatetimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.CargarCalendariosVersion();
		this.dialogVisualizar = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_calendar): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_calendar_Eliminar, data)
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

	CargarCalendariosVersion(){
		new services.Operaciones().Consultar(this.WebApi.ws_calendarversion_Consultar)
			.then((rescalendarversion) => {
				if (rescalendarversion.data._error.error === 0) {
					this.lstcalendarversion = rescalendarversion.data._data;
				} else {
					this.popup.error('Consultar', rescalendarversion.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
}
