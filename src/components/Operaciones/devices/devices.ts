import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmdevicesComponent extends Vue {
	private headers: any[] = [
		{ text: 'IDENTIFICATION', align: 'left', sortable: true, value: 'identification', width: '15%' },
		{ text: 'description', align: 'left', sortable: false, value: 'description', width: '15%' },
		{ text: 'devicetypeidentification', align: 'left', sortable: false, value: 'devicetypeidentification', width: '15%' },
		{ text: 'enabled', align: 'left', sortable: false, value: 'enabled', width: '15%' },
		{ text: 'createtimestamp', align: 'left', sortable: false, value: 'createtimestamp', width: '15%' },
		{ text: 'updatetimestamp', align: 'left', sortable: false, value: 'updatetimestamp', width: '15%' },
		{ text: 'createuser', align: 'left', sortable: false, value: 'createuser', width: '15%' },
		{ text: 'updateuser', align: 'left', sortable: false, value: 'updateuser', width: '15%' },
		{ text: 'configuration', align: 'left', sortable: false, value: 'configuration', width: '15%' },
		{ text: 'identificationprovider', align: 'left', sortable: false, value: 'identificationprovider', width: '15%' },
		{ text: 'locationidentification', align: 'left', sortable: false, value: 'locationidentification', width: '15%' },
		{ text: 'coinacceptordenoms', align: 'left', sortable: false, value: 'coinacceptordenoms', width: '15%' },
		{ text: 'cashacceptordenoms', align: 'left', sortable: false, value: 'cashacceptordenoms', width: '15%' },
		{ text: 'maxamountodispense', align: 'left', sortable: false, value: 'maxamountodispense', width: '15%' },
		{ text: 'maxbillstodispense', align: 'left', sortable: false, value: 'maxbillstodispense', width: '15%' },
		{ text: 'maxcoinstodispense', align: 'left', sortable: false, value: 'maxcoinstodispense', width: '15%' },
		{ text: 'video_intro', align: 'left', sortable: false, value: 'video_intro', width: '15%' },
		{ text: 'video_insert_cash', align: 'left', sortable: false, value: 'video_insert_cash', width: '15%' },
		{ text: 'video_take_cash', align: 'left', sortable: false, value: 'video_take_cash', width: '15%' },
		{ text: 'video_take_cash_chash_receipt', align: 'left', sortable: false, value: 'video_take_cash_chash_receipt', width: '15%' },
		{ text: 'video_read_barcode', align: 'left', sortable: false, value: 'video_read_barcode', width: '15%' },
		{ text: 'payment_success', align: 'left', sortable: false, value: 'payment_success', width: '15%' },
		{ text: 'payment_cancel', align: 'left', sortable: false, value: 'payment_cancel', width: '15%' },
		{ text: 'final_success', align: 'left', sortable: false, value: 'final_success', width: '15%' },
		{ text: 'cashacceptorfullalarm', align: 'left', sortable: false, value: 'cashacceptorfullalarm', width: '15%' },
		{ text: 'cashacceptorfulllimit', align: 'left', sortable: false, value: 'cashacceptorfulllimit', width: '15%' },
		{ text: 'coinacceptorfullalarm', align: 'left', sortable: false, value: 'coinacceptorfullalarm', width: '15%' },
		{ text: 'coinacceptorfulllimit', align: 'left', sortable: false, value: 'coinacceptorfulllimit', width: '15%' },
		{ text: 'cashchangeremptyalarm', align: 'left', sortable: false, value: 'cashchangeremptyalarm', width: '15%' },
		{ text: 'cashchangeremptylimit', align: 'left', sortable: false, value: 'cashchangeremptylimit', width: '15%' },
		{ text: 'cashchangersecuritystock', align: 'left', sortable: false, value: 'cashchangersecuritystock', width: '15%' },
		{ text: 'coinchangeremptyalarm', align: 'left', sortable: false, value: 'coinchangeremptyalarm', width: '15%' },
		{ text: 'coinchangeremptylimit', align: 'left', sortable: false, value: 'coinchangeremptylimit', width: '15%' },
		{ text: 'coinchangersecuritystock', align: 'left', sortable: false, value: 'coinchangersecuritystock', width: '15%' },
		{ text: 'carddispenseremptylimit', align: 'left', sortable: false, value: 'carddispenseremptylimit', width: '15%' },
		{ text: 'carddispenseremptyalarm', align: 'left', sortable: false, value: 'carddispenseremptyalarm', width: '15%' },
		{ text: 'emptydenomblockcondition1', align: 'left', sortable: false, value: 'emptydenomblockcondition1', width: '15%' },
		{ text: 'emptydenomblockcondition2', align: 'left', sortable: false, value: 'emptydenomblockcondition2', width: '15%' },
		{ text: 'emptydenomblockcondition3', align: 'left', sortable: false, value: 'emptydenomblockcondition3', width: '15%' },
		{ text: 'emptydenomblockcondition4', align: 'left', sortable: false, value: 'emptydenomblockcondition4', width: '15%' },
		{ text: 'totalchangeemptyalarm', align: 'left', sortable: false, value: 'totalchangeemptyalarm', width: '15%' },
		{ text: 'totalchangeemptylimit', align: 'left', sortable: false, value: 'totalchangeemptylimit', width: '15%' },
		{ text: 'scp_statusinterval', align: 'left', sortable: false, value: 'scp_statusinterval', width: '15%' },
		{ text: 'sct_step', align: 'left', sortable: false, value: 'sct_step', width: '15%' },
		{ text: 'sct_changevalidatoramount', align: 'left', sortable: false, value: 'sct_changevalidatoramount', width: '15%' },
		{ text: 'sct_finishscreentimeout', align: 'left', sortable: false, value: 'sct_finishscreentimeout', width: '15%' },
		{ text: 'cashchangerfill', align: 'left', sortable: false, value: 'cashchangerfill', width: '15%' },
		{ text: 'coinchangerfill', align: 'left', sortable: false, value: 'coinchangerfill', width: '15%' },
		{ text: 'coinchangerdenoms', align: 'left', sortable: false, value: 'coinchangerdenoms', width: '15%' },
		{ text: 'cashchangerdenoms', align: 'left', sortable: false, value: 'cashchangerdenoms', width: '15%' },
		{ text: 'lastreporttimestamp', align: 'left', sortable: false, value: 'lastreporttimestamp', width: '15%' },
		{ text: 'laststatusreported', align: 'left', sortable: false, value: 'laststatusreported', width: '15%' },
		{ text: 'serviceuser', align: 'left', sortable: false, value: 'serviceuser', width: '15%' },
		{ text: 'operatorcode', align: 'left', sortable: false, value: 'operatorcode', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_createtimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_updatetimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_lastreporttimestamp: boolean = false;
	private WebApi = new services.Endpoints();

	private devices = new services.clase_devices();
	private lstdevices: services.clase_devices[] = [];
	private buscardevices = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_devices_Consultar)
			.then((resdevices) => {
				if (resdevices.data._error.error === 0) {
					this.lstdevices = resdevices.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resdevices.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.devices = new services.clase_devices();
		this.devices.createtimestamp = this.FormatDate(Date.now());
		this.devices.updatetimestamp = this.FormatDate(Date.now());
		this.devices.lastreporttimestamp = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_devices_Actualizar, this.devices)
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
		new services.Operaciones().Insertar(this.WebApi.ws_devices_Insertar, this.devices)
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
	private Actualizar(data: services.clase_devices): void {
		this.devices = data;
		this.devices.createtimestamp = this.FormatDate(Date.now());
		this.devices.updatetimestamp = this.FormatDate(Date.now());
		this.devices.lastreporttimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_devices): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_devices_Eliminar, data)
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
