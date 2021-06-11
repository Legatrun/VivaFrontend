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
		{ text: 'Fecha de Transacción', align: 'center', sortable: true, value: 'createtimestamp', width: '7%' },
		{ text: 'Sucursal', align: 'center', sortable: true, value: 'locationidentification', width: '7%' },
		{ text: 'Terminal', align: 'center', sortable: true, value: 'deviceidentification', width: '7%' },
		{ text: 'Transacción', align: 'center', sortable: true, value: 'operationname', width: '7%' },
		{ text: 'Cliente', align: 'center', sortable: true, value: 'customernumber', width: '7%' },
		{ text: 'Recibo', align: 'center', sortable: true, value: 'transactionidentification', width: '7%' },
		{ text: 'Monto', align: 'center', sortable: true, value: 'amount', width: '5%' },
		{ text: 'Resultado', align: 'center', sortable: true, value: 'resultcode', width: '5%' },
		{ text: 'Vuelto', align: 'center', sortable: true, value: 'amountreturned', width: '5%' },
		{ text: 'Vuelto No Entregado', align: 'center', sortable: true, value: 'amountticketundelivered', width: '5%' },
		{ text: 'Detalle Recibo', align: 'center', sortable: true, value: 'amountentereddetail', width: '7%' },
		{ text: 'Detalle Vuelto', align: 'center', sortable: true, value: 'amountticketundelivereddetail', width: '7%' },
		{ text: 'Opciones', align: 'center', sortable: true, value: 'opciones', width: '3%' },
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
	private pagination = new services.clase_pagination();
	private transactions = new services.clase_transactions();
	private lsttransactions: services.clase_transactions[] = [];
	private buscartransactions = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	itemsPerPage: number = 10;
	totalItems: number = 0;
	totalPages: number = 0;
	maxPagesVisible: number = 10;
	currentPageSelected: number = 1;
	pagePreviousSelected: number = 0;
	loadingDataTable: boolean = false;
	disabledPagination: boolean = false;
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
		this.itemsPerPage = 10;
		this.totalItems = 0;
		this.totalPages = 0;
		this.maxPagesVisible = 10;
		this.currentPageSelected = 1;
		this.pagePreviousSelected = 0;
		this.loadingDataTable = false;
		this.disabledPagination = false;
	}
	private cargar_data() {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		let desde = 0;
		let hasta = 10;
		this.CargarPorPaginacion(desde,hasta);
	}
	private Insertar(): void {
		this.transactions = new services.clase_transactions();
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

	private CargarPorPaginacion(init:number,until: number){
		this.transactions.initItemPagination = init;
		this.transactions.untilItemPagination = until;
		this.loadingDataTable = true;
		this.disabledPagination = true;
		this.lsttransactions = [];


		new services.Operaciones().ConsultarPorPaginacion(this.WebApi.ws_transactions_ConsultarPorPaginacion,this.transactions)
		.then((resbatches) => {
			if (resbatches.data._error.error === 0) {
				this.lsttransactions = resbatches.data._data;
				this.pagination = resbatches.data._pagination;
				// Config Pagination
				// this.itemsPerPage = this.pagination.itemsPerPagePagination;
				this.totalPages = Math.ceil(this.pagination.itemsLengthPagination/this.itemsPerPage)
				
				this.loadingDataTable = false;
				this.disabledPagination = false;
				this.dialog = false;
				} else {
					this.popup.error('Consultar', resbatches.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	
	private elementosPorPagina(){
		// this.pagePreviousSelected = this.currentPageSelected;
		let desde = this.pagination.untilItemPagination;
		let hasta = this.pagination.untilItemPagination + this.itemsPerPage;
		// alert("Pagina actual: "+this.currentPageSelected + " Pagina Anterior: "+this.pagePreviousSelected)
		if(this.currentPageSelected > this.pagePreviousSelected)
		{
			this.CargarPorPaginacion(desde, hasta);
		}
		else{
			var residuo = desde - hasta;
			// alert("else: desde: "+ desde + " hasta: " +hasta)
			this.CargarPorPaginacion(hasta-hasta, desde);
		}
	}

}
