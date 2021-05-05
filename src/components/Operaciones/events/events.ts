import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmeventsComponent extends Vue {
	private headers: any[] = [
		{ text: 'TYPE', align: 'left', sortable: true, value: 'type', width: '15%' },
		{ text: 'DEVICEIDENTIFICATION', align: 'left', sortable: true, value: 'deviceidentification', width: '15%' },
		{ text: 'LOCATIONIDENTIFICATION', align: 'left', sortable: true, value: 'locationidentification', width: '15%' },
		{ text: 'CREATETIMESTAMP', align: 'left', sortable: true, value: 'createtimestamp', width: '15%' },
		{ text: 'REASON', align: 'left', sortable: true, value: 'reason', width: '15%' },
		{ text: 'OPERATIONNAME', align: 'left', sortable: true, value: 'operationname', width: '15%' },
		{ text: 'SERVICENAME', align: 'left', sortable: true, value: 'servicename', width: '15%' },
		{ text: 'SEQUENCENUMBER', align: 'left', sortable: true, value: 'sequencenumber', width: '15%' },
		{ text: 'notifytimestamp', align: 'left', sortable: false, value: 'notifytimestamp', width: '15%' },
		{ text: 'text', align: 'left', sortable: false, value: 'text', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_notifytimestamp: boolean = false;
	private WebApi = new services.Endpoints();

	private events = new services.clase_events();
	private lstevents: services.clase_events[] = [];
	private buscarevents = '';
	private dialog = false;
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
		new services.Operaciones().Consultar(this.WebApi.ws_events_Consultar)
			.then((resevents) => {
				if (resevents.data._error.error === 0) {
					this.lstevents = resevents.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resevents.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.events = new services.clase_events();
		this.events.notifytimestamp = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_events_Actualizar, this.events)
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
		new services.Operaciones().Insertar(this.WebApi.ws_events_Insertar, this.events)
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
	private Actualizar(data: services.clase_events): void {
		this.events = data;
		this.events.notifytimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_events): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.type + data.deviceidentification + data.locationidentification + data.createtimestamp + data.reason + data.operationname + data.servicename + data.sequencenumber,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_events_Eliminar, data)
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
