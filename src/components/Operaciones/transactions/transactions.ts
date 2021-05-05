import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmtransactionsComponent extends Vue {
	private headers: any[] = [
		{ text: 'ID', align: 'left', sortable: true, value: 'id', width: '15%' },
		{ text: 'createtimestamp', align: 'left', sortable: false, value: 'createtimestamp', width: '15%' },
		{ text: 'updatetimestamp', align: 'left', sortable: false, value: 'updatetimestamp', width: '15%' },
		{ text: 'deviceidentification', align: 'left', sortable: false, value: 'deviceidentification', width: '15%' },
		{ text: 'locationidentification', align: 'left', sortable: false, value: 'locationidentification', width: '15%' },
		{ text: 'servicename', align: 'left', sortable: false, value: 'servicename', width: '15%' },
		{ text: 'operationname', align: 'left', sortable: false, value: 'operationname', width: '15%' },
		{ text: 'sequencenumber', align: 'left', sortable: false, value: 'sequencenumber', width: '15%' },
		{ text: 'transporttimestamp', align: 'left', sortable: false, value: 'transporttimestamp', width: '15%' },
		{ text: 'payloadrequest', align: 'left', sortable: false, value: 'payloadrequest', width: '15%' },
		{ text: 'payloadanswer', align: 'left', sortable: false, value: 'payloadanswer', width: '15%' },
		{ text: 'resultcode', align: 'left', sortable: false, value: 'resultcode', width: '15%' },
		{ text: 'resultmessage', align: 'left', sortable: false, value: 'resultmessage', width: '15%' },
		{ text: 'provideridentification', align: 'left', sortable: false, value: 'provideridentification', width: '15%' },
		{ text: 'providertransactionid', align: 'left', sortable: false, value: 'providertransactionid', width: '15%' },
		{ text: 'devicetransactionid', align: 'left', sortable: false, value: 'devicetransactionid', width: '15%' },
		{ text: 'providerresultcode', align: 'left', sortable: false, value: 'providerresultcode', width: '15%' },
		{ text: 'providerresultmessage', align: 'left', sortable: false, value: 'providerresultmessage', width: '15%' },
		{ text: 'batchnumber', align: 'left', sortable: false, value: 'batchnumber', width: '15%' },
		{ text: 'syncstatus', align: 'left', sortable: false, value: 'syncstatus', width: '15%' },
		{ text: 'synctimestamp', align: 'left', sortable: false, value: 'synctimestamp', width: '15%' },
		{ text: 'deviceidentificationprovider', align: 'left', sortable: false, value: 'deviceidentificationprovider', width: '15%' },
		{ text: 'locationidentificationprovider', align: 'left', sortable: false, value: 'locationidentificationprovider', width: '15%' },
		{ text: 'customernumber', align: 'left', sortable: false, value: 'customernumber', width: '15%' },
		{ text: 'amount', align: 'left', sortable: false, value: 'amount', width: '15%' },
		{ text: 'amountentered', align: 'left', sortable: false, value: 'amountentered', width: '15%' },
		{ text: 'amountreturned', align: 'left', sortable: false, value: 'amountreturned', width: '15%' },
		{ text: 'amountticketundelivered', align: 'left', sortable: false, value: 'amountticketundelivered', width: '15%' },
		{ text: 'operationstatus', align: 'left', sortable: false, value: 'operationstatus', width: '15%' },
		{ text: 'amountentereddetail', align: 'left', sortable: false, value: 'amountentereddetail', width: '15%' },
		{ text: 'amountreturneddetail', align: 'left', sortable: false, value: 'amountreturneddetail', width: '15%' },
		{ text: 'amountticketundelivereddetail', align: 'left', sortable: false, value: 'amountticketundelivereddetail', width: '15%' },
		{ text: 'transactionidentification', align: 'left', sortable: false, value: 'transactionidentification', width: '15%' },
		{ text: 'customercode', align: 'left', sortable: false, value: 'customercode', width: '15%' },
		{ text: 'canceled', align: 'left', sortable: false, value: 'canceled', width: '15%' },
		{ text: 'canceledtimestamp', align: 'left', sortable: false, value: 'canceledtimestamp', width: '15%' },
		{ text: 'providersequencenumber', align: 'left', sortable: false, value: 'providersequencenumber', width: '15%' },
		{ text: 'cardsdispensed', align: 'left', sortable: false, value: 'cardsdispensed', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_createtimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_updatetimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_transporttimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_synctimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_canceledtimestamp: boolean = false;
	private WebApi = new services.Endpoints();

	private transactions = new services.clase_transactions();
	private lsttransactions: services.clase_transactions[] = [];
	private buscartransactions = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_transactions_Consultar)
			.then((restransactions) => {
				if (restransactions.data._error.error === 0) {
					this.lsttransactions = restransactions.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restransactions.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.transactions = new services.clase_transactions();
		this.transactions.createtimestamp = this.FormatDate(Date.now());
		this.transactions.updatetimestamp = this.FormatDate(Date.now());
		this.transactions.transporttimestamp = this.FormatDate(Date.now());
		this.transactions.synctimestamp = this.FormatDate(Date.now());
		this.transactions.canceledtimestamp = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_transactions_Actualizar, this.transactions)
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
		new services.Operaciones().Insertar(this.WebApi.ws_transactions_Insertar, this.transactions)
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
	private Actualizar(data: services.clase_transactions): void {
		this.transactions = data;
		this.transactions.createtimestamp = this.FormatDate(Date.now());
		this.transactions.updatetimestamp = this.FormatDate(Date.now());
		this.transactions.transporttimestamp = this.FormatDate(Date.now());
		this.transactions.synctimestamp = this.FormatDate(Date.now());
		this.transactions.canceledtimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_transactions): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_transactions_Eliminar, data)
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
