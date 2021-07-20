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
	private calendarversion = new services.clase_calendarversion();
	private lstcalendar: services.clase_calendar[] = [];
	private lstcalendarversion: services.clase_calendarversion[] = [];
	private buscarcalendar = '';
	private dialog = false;
	private dialogVisualizar = false;
	private dialogAddCalendarVersion = false;
	private dialogRevisarCalendarVersion = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private loadingTable = false;
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
		this.loadingTable =  true;
		new services.Operaciones().Consultar(this.WebApi.ws_calendar_Consultar)
			.then((rescalendar) => {
				if (rescalendar.data._error.error === 0) {
					this.lstcalendar = rescalendar.data._data;
					this.loadingTable = false;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', rescalendar.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private cargar_data_calendarversion() {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		this.loadingTable =  true;
		this.calendarversion.calendarid = this.calendar.id 
		new services.Operaciones().Buscar(this.WebApi.ws_calendarversion_Buscar, this.calendarversion)
			.then((rescalendar) => {
				if (rescalendar.data._error.error === 0) {
					this.lstcalendarversion = rescalendar.data._data;
					this.loadingTable = false;
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
			var esRepetido = this.ValidaRepetidoCalendario(this.calendar)
			if(esRepetido)
			{

				return;
			}
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
		} else if(this.operacion === 'Insert'){
			var esRepetido = this.ValidaRepetidoCalendario(this.calendar)
			if(esRepetido)
			{
				this.popup.error('Validación', 'Ya existe un Calendario con el mismo identificador');
				return;
			}
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
		else{
			var esRepetido = this.ValidaRepetidoCalendarVersion(this.calendarversion)
			if(esRepetido)
			{
				this.popup.error('Validación', 'Ya existe una Versión de Calendario con el mismo nombre');
				return;
			}
			this.calendarversion.calendarid = this.calendar.id;
			new services.Operaciones().Insertar(this.WebApi.ws_calendarversion_Insertar, this.calendarversion)
			.then((result) => {
				if (result.data.error === 0) {
				this.popup.success('Insertar', result.data.descripcion);
				this.cargar_data_calendarversion();
				this.dialogAddCalendarVersion = false;
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
	private CancelarPopupAddCalendarVersion() {
		this.cargar_data();
		this.dialogAddCalendarVersion = false;
	}
	private CancelarPopupRevisarCalendarVersion() {
		this.cargar_data();
		this.dialogRevisarCalendarVersion = false;
	}
	private Revisar(data: services.clase_calendar): void {
		this.calendar = data;
		this.calendar.createtimestamp = this.FormatDate(Date.now());
		this.calendar.updatetimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.cargar_data_calendarversion();
		this.dialogVisualizar = true;
	}
	private AddCalendarVersion(){
		this.operacion = 'InsertarVersion';
		this.dialogAddCalendarVersion =  true;
	}
	private RevisarCalendarVersion(data: services.clase_calendarversion): void {
		this.calendarversion = data;
		this.calendarversion.validfrom = this.FormatDate(Date.now());
		this.calendarversion.validuntil = this.FormatDate(Date.now());
		this.calendarversion.createtimestamp = this.FormatDate(Date.now());
		this.calendarversion.updatetimestamp = this.FormatDate(Date.now());
		this.dialogRevisarCalendarVersion = true;
		// this.CargarCalendariosVersion();
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_calendar): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro: ' + data.description,
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

	private EliminarCalendarVersion(data: services.clase_calendarversion): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro: ' + data.description,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_calendarversion_Eliminar, data)
				.then((result) => {
				if (result.data.error === 0) {
					swal.fire({
					type: 'success',
					title: 'Eliminar',
					text: result.data.descripcion,
					showConfirmButton: false,
					timer: 2000,
				});
				this.cargar_data_calendarversion();
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

	private ValidaRepetidoCalendario(data: services.clase_calendar):boolean{
		var repetido:boolean = false;
		this.lstcalendar.forEach((elem: any) => {
              if (elem.identification === data.identification){
					repetido = true
					return repetido;
              }
        });
		return repetido;
	}

	private ValidaRepetidoCalendarVersion(data: services.clase_calendarversion):boolean{
		var repetido:boolean = false;
		this.lstcalendarversion.forEach((elem: any) => {
              if (elem.description === data.description){
					repetido = true
					return repetido;
              }
        });
		return repetido;
	}
}
