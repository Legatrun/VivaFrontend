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
		{ text: 'Fecha de Transacción', align: 'left', sortable: true, value: 'createtimestamp', width: '7%' },
		{ text: 'Sucursal', align: 'left', sortable: true, value: 'locationidentification', width: '7%' },
		{ text: 'Terminal', align: 'left', sortable: true, value: 'deviceidentification', width: '7%' },
		{ text: 'Transacción', align: 'left', sortable: true, value: 'operationname', width: '7%' },
		{ text: 'Cliente', align: 'left', sortable: true, value: 'customernumber', width: '7%' },
		{ text: 'Recibo', align: 'left', sortable: true, value: 'transactionidentification', width: '7%' },
		{ text: 'Monto', align: 'left', sortable: true, value: 'amount', width: '7%' },
		{ text: 'Resultado', align: 'left', sortable: true, value: 'resultcode', width: '7%' },
		{ text: 'Vuelto', align: 'left', sortable: true, value: 'amountreturned', width: '7%' },
		{ text: 'Vuelto no Entregado', align: 'left', sortable: true, value: 'amountticketundelivered', width: '7%' },
		{ text: 'Detalle Recibo', align: 'left', sortable: true, value: 'amountentereddetail', width: '7%' },
		{ text: 'Detalle Vuelto', align: 'left', sortable: true, value: 'amountticketundelivereddetail', width: '7%' },
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
