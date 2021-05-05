import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmdeviceinstalationtransactionprComponent extends Vue {
	private headers: any[] = [
		{ text: 'deviceidentification', align: 'left', sortable: false, value: 'deviceidentification', width: '15%' },
		{ text: 'enabled', align: 'left', sortable: false, value: 'enabled', width: '15%' },
		{ text: 'createtimestamp', align: 'left', sortable: false, value: 'createtimestamp', width: '15%' },
		{ text: 'updatetimestamp', align: 'left', sortable: false, value: 'updatetimestamp', width: '15%' },
		{ text: 'createuser', align: 'left', sortable: false, value: 'createuser', width: '15%' },
		{ text: 'updateuser', align: 'left', sortable: false, value: 'updateuser', width: '15%' },
		{ text: 'locationidentification', align: 'left', sortable: false, value: 'locationidentification', width: '15%' },
		{ text: 'provideridentification', align: 'left', sortable: false, value: 'provideridentification', width: '15%' },
		{ text: 'providerdeviceidentification', align: 'left', sortable: false, value: 'providerdeviceidentification', width: '15%' },
		{ text: 'providerlocationidentification', align: 'left', sortable: false, value: 'providerlocationidentification', width: '15%' },
		{ text: 'providersequencenumber', align: 'left', sortable: false, value: 'providersequencenumber', width: '15%' },
		{ text: 'lasttransactiontimestamp', align: 'left', sortable: false, value: 'lasttransactiontimestamp', width: '15%' },
		{ text: 'transactionidentification', align: 'left', sortable: false, value: 'transactionidentification', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_createtimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_updatetimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_lasttransactiontimestamp: boolean = false;
	private WebApi = new services.Endpoints();

	private deviceinstalationtransactionpr = new services.clase_deviceinstalationtransactionpr();
	private lstdeviceinstalationtransactionpr: services.clase_deviceinstalationtransactionpr[] = [];
	private buscardeviceinstalationtransactionpr = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_deviceinstalationtransactionpr_Consultar)
			.then((resdeviceinstalationtransactionpr) => {
				if (resdeviceinstalationtransactionpr.data._error.error === 0) {
					this.lstdeviceinstalationtransactionpr = resdeviceinstalationtransactionpr.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resdeviceinstalationtransactionpr.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.deviceinstalationtransactionpr = new services.clase_deviceinstalationtransactionpr();
		this.deviceinstalationtransactionpr.createtimestamp = this.FormatDate(Date.now());
		this.deviceinstalationtransactionpr.updatetimestamp = this.FormatDate(Date.now());
		this.deviceinstalationtransactionpr.lasttransactiontimestamp = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_deviceinstalationtransactionpr_Actualizar, this.deviceinstalationtransactionpr)
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
		new services.Operaciones().Insertar(this.WebApi.ws_deviceinstalationtransactionpr_Insertar, this.deviceinstalationtransactionpr)
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
	private Actualizar(data: services.clase_deviceinstalationtransactionpr): void {
		this.deviceinstalationtransactionpr = data;
		this.deviceinstalationtransactionpr.createtimestamp = this.FormatDate(Date.now());
		this.deviceinstalationtransactionpr.updatetimestamp = this.FormatDate(Date.now());
		this.deviceinstalationtransactionpr.lasttransactiontimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_deviceinstalationtransactionpr): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_deviceinstalationtransactionpr_Eliminar, data)
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
