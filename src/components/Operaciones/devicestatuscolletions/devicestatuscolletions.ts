import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmdevicestatuscolletionsComponent extends Vue {
	private headers: any[] = [
		// { text: 'ID', align: 'left', sortable: true, value: 'id', width: '15%' },
		// { text: 'updatetimestamp', align: 'left', sortable: true, value: 'updatetimestamp', width: '15%' },
		{ text: 'Sucursal', align: 'left', sortable: true, value: 'locationidentification', width: '7%' },
		{ text: 'Terminal', align: 'left', sortable: true, value: 'deviceidentification', width: '7%' },
		{ text: 'Fecha', align: 'left', sortable: true, value: 'createtimestamp', width: '7%' },
		{ text: 'Alarma', align: 'left', sortable: true, value: 'alarm', width: '7%' },
		{ text: 'Bloqueo', align: 'left', sortable: true, value: 'devicestatus', width: '7%' },
		{ text: 'Detalle', align: 'left', sortable: true, value: 'devicestatusdetail', width: '7%' },
		{ text: 'Modo Op.', align: 'left', sortable: true, value: 'operatingmode', width: '7%' },
		{ text: 'Estado', align: 'left', sortable: true, value: 'status', width: '7%' },
		// { text: 'servicename', align: 'left', sortable: true, value: 'servicename', width: '15%' },
		// { text: 'operationname', align: 'left', sortable: true, value: 'operationname', width: '15%' },
		// { text: 'sequencenumber', align: 'left', sortable: true, value: 'sequencenumber', width: '15%' },
		// { text: 'transporttimestamp', align: 'left', sortable: true, value: 'transporttimestamp', width: '15%' },
		// { text: 'provideridentification', align: 'left', sortable: true, value: 'provideridentification', width: '15%' },
		// { text: 'providertransactionid', align: 'left', sortable: true, value: 'providertransactionid', width: '15%' },
		// { text: 'devicetransactionid', align: 'left', sortable: true, value: 'devicetransactionid', width: '15%' },
		// { text: 'batchnumber', align: 'left', sortable: true, value: 'batchnumber', width: '15%' },
		// { text: 'transactionid', align: 'left', sortable: true, value: 'transactionid', width: '15%' },
		// { text: 'alarmid', align: 'left', sortable: true, value: 'alarmid', width: '15%' },
		// { text: 'aceptordetail', align: 'left', sortable: true, value: 'aceptordetail', width: '15%' },
		// { text: 'changerdetail', align: 'left', sortable: true, value: 'changerdetail', width: '15%' },
		// { text: 'returndetail', align: 'left', sortable: true, value: 'returndetail', width: '15%' },
		// { text: 'operativeday', align: 'left', sortable: true, value: 'operativeday', width: '15%' },
		// { text: 'totaltx', align: 'left', sortable: true, value: 'totaltx', width: '15%' },
		// { text: 'totalamount', align: 'left', sortable: true, value: 'totalamount', width: '15%' },
		// { text: 'totalaccepted', align: 'left', sortable: true, value: 'totalaccepted', width: '15%' },
		// { text: 'totalreturned', align: 'left', sortable: true, value: 'totalreturned', width: '15%' },
		// { text: 'totalavailable', align: 'left', sortable: true, value: 'totalavailable', width: '15%' },
		// { text: 'totalgivenamount', align: 'left', sortable: true, value: 'totalgivenamount', width: '15%' },
		// { text: 'totaldebtamount', align: 'left', sortable: true, value: 'totaldebtamount', width: '15%' },
		// { text: 'totalrefilloperations', align: 'left', sortable: true, value: 'totalrefilloperations', width: '15%' },
		// { text: 'totalrefillamount', align: 'left', sortable: true, value: 'totalrefillamount', width: '15%' },
		// { text: 'totalcollectoperations', align: 'left', sortable: true, value: 'totalcollectoperations', width: '15%' },
		// { text: 'totalcollectamount', align: 'left', sortable: true, value: 'totalcollectamount', width: '15%' },
		// { text: 'totallocks', align: 'left', sortable: true, value: 'totallocks', width: '15%' },
		// { text: 'opentime', align: 'left', sortable: true, value: 'opentime', width: '15%' },
		// { text: 'closetime', align: 'left', sortable: true, value: 'closetime', width: '15%' },
		// { text: 'vdmstatus', align: 'left', sortable: true, value: 'vdmstatus', width: '15%' },
		// { text: 'powerstatus', align: 'left', sortable: true, value: 'powerstatus', width: '15%' },
		// { text: 'scannerstatus', align: 'left', sortable: true, value: 'scannerstatus', width: '15%' },
		// { text: 'motionsensorstatus', align: 'left', sortable: true, value: 'motionsensorstatus', width: '15%' },
		// { text: 'printerstatus', align: 'left', sortable: true, value: 'printerstatus', width: '15%' },
		// { text: 'cashacceptorstatus', align: 'left', sortable: true, value: 'cashacceptorstatus', width: '15%' },
		// { text: 'cashchangerstatus', align: 'left', sortable: true, value: 'cashchangerstatus', width: '15%' },
		// { text: 'coinacceptorstatus', align: 'left', sortable: true, value: 'coinacceptorstatus', width: '15%' },
		// { text: 'coinchangerstatus', align: 'left', sortable: true, value: 'coinchangerstatus', width: '15%' },
		// { text: 'totalcardsdelivered', align: 'left', sortable: true, value: 'totalcardsdelivered', width: '15%' },
		// { text: 'totalcardrefilloperations', align: 'left', sortable: true, value: 'totalcardrefilloperations', width: '15%' },
		// { text: 'totalcardrefillamount', align: 'left', sortable: true, value: 'totalcardrefillamount', width: '15%' },
		// { text: 'totalcardcollectoperations', align: 'left', sortable: true, value: 'totalcardcollectoperations', width: '15%' },
		// { text: 'totalcardcollectamount', align: 'left', sortable: true, value: 'totalcardcollectamount', width: '15%' },
		// { text: 'carddispenserstatus', align: 'left', sortable: true, value: 'carddispenserstatus', width: '15%' },
		// { text: 'cardreaderstatus', align: 'left', sortable: true, value: 'cardreaderstatus', width: '15%' },
		// { text: 'carddispensercount', align: 'left', sortable: true, value: 'carddispensercount', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: true, value: 'action', width: '5%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_createtimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_updatetimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_transporttimestamp: boolean = false;
	private WebApi = new services.Endpoints();

	private devicestatuscolletions = new services.clase_devicestatuscolletions();
	private lstdevicestatuscolletions: services.clase_devicestatuscolletions[] = [];
	private buscardevicestatuscolletions = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_devicestatuscolletions_Consultar)
			.then((resdevicestatuscolletions) => {
				if (resdevicestatuscolletions.data._error.error === 0) {
					this.lstdevicestatuscolletions = resdevicestatuscolletions.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resdevicestatuscolletions.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.devicestatuscolletions = new services.clase_devicestatuscolletions();
		this.devicestatuscolletions.createtimestamp = this.FormatDate(Date.now());
		this.devicestatuscolletions.updatetimestamp = this.FormatDate(Date.now());
		this.devicestatuscolletions.transporttimestamp = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_devicestatuscolletions_Actualizar, this.devicestatuscolletions)
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
		new services.Operaciones().Insertar(this.WebApi.ws_devicestatuscolletions_Insertar, this.devicestatuscolletions)
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
	private Actualizar(data: services.clase_devicestatuscolletions): void {
		this.devicestatuscolletions = data;
		this.devicestatuscolletions.createtimestamp = this.FormatDate(Date.now());
		this.devicestatuscolletions.updatetimestamp = this.FormatDate(Date.now());
		this.devicestatuscolletions.transporttimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_devicestatuscolletions): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_devicestatuscolletions_Eliminar, data)
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
