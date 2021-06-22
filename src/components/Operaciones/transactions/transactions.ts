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
	desdePaginacionPrevia: number = 0;
	hastaPaginacionPrevia: number = 0;
	private FormatDate(data: any) {
		return moment(data).format('YYYY-MM-DD');
	}
	private FormatDateTime(data: any) {
		return moment(data).format('YYYY-MM-DD h:mm:ss');
	}
	private FormatBoolean(data: any) {
		if (data) {
			return 'SI';
		} else {
			return 'NO';
		}
	}
	private FormatNull(data: any) {
		if (data=="") {
			return '-';
		
		}else{
			return data;
		}
	}

	private updateText(Value: string) {
		if (Value !== null) {
			return Value.toUpperCase();
		} else {
			return Value;
		}
	}
	private beforeUpdate(){
		this.pagePreviousSelected = this.currentPageSelected;
	}
	private mounted() {
		this.cargar_data();
	}
	private cargar_data() {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		let desde = 0;
		let hasta = 10;
		this.desdePaginacionPrevia = desde;
		this.hastaPaginacionPrevia = hasta;
		this.CargarPorPaginacion(desde,hasta);
		this.itemsPerPage = 10;
		this.totalItems = 0;
		this.totalPages = 0;
		this.maxPagesVisible = 10;
		this.currentPageSelected = 1;
		this.pagePreviousSelected = 0;
		this.loadingDataTable = false;
		this.disabledPagination = false;
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
		this.transactions.deviceidentification = this.FormatNull(data.deviceidentification);
		this.transactions.locationidentification = this.FormatNull(data.deviceidentification);
		this.transactions.createtimestamp = this.FormatNull(data.createtimestamp);
		this.transactions.resultcode = this.FormatNull(data.resultcode);
		this.transactions.resultmessage = this.FormatNull(data.resultmessage);
		this.transactions.transactionidentification = this.FormatNull(data.transactionidentification);
		this.transactions.providerresultcode = this.FormatNull(data.providerresultcode);
		this.transactions.providerresultmessage =  this.FormatNull(data.providerresultmessage);
		this.transactions.customernumber = this.FormatNull(data.customernumber);
		this.transactions.customercode = this.FormatNull(data.customercode);
		this.transactions.amount = this.FormatNull(data.amount);
		this.transactions.amountentered = this.FormatNull(data.amountentered);
		this.transactions.amountentereddetail = this.FormatNull(data.amountentereddetail);
		this.transactions.amountreturned = this.FormatNull(data.amountreturned);
		this.transactions.amountticketundelivereddetail = this.FormatNull(data.amountticketundelivereddetail);
		this.transactions.amountreturneddetail = this.FormatNull(data.amountreturneddetail);
		this.transactions.cardsdispensed = this.FormatNull(data.cardsdispensed);
		this.transactions.batchnumber = this.FormatNull(data.batchnumber);
		this.transactions.servicename = this.FormatNull(data.servicename);
		this.transactions.operationname = this.FormatNull(data.operationname);
		this.transactions.sequencenumber = this.FormatNull(data.sequencenumber);
		this.transactions.providertransactionid = this.FormatNull(data.providertransactionid);
		this.transactions.devicetransactionid = this.FormatNull(data.devicetransactionid);
		
		this.transactions.createtimestamp =this.FormatDateTime(data.createtimestamp); 
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
		if(this.currentPageSelected!=1)
		{
			this.desdePaginacionPrevia = this.pagination.initItemPagination;
			this.hastaPaginacionPrevia = this.pagination.untilItemPagination;
		}
		// calcula paginacion siguiente
		let desde = this.pagination.untilItemPagination;
		let hasta = this.pagination.untilItemPagination + this.itemsPerPage;
		if(this.currentPageSelected > this.pagePreviousSelected)
		{
			// pag siguiente
			this.CargarPorPaginacion(desde, hasta);
		}
		else{
			// pag Anterior
			this.CargarPorPaginacion(this.desdePaginacionPrevia, this.hastaPaginacionPrevia);
		}
	}

	LimpiarFiltros(){
		this.buscartransactions = ""
		this.transactions.createtimestamp = ""
	}

	private next(){
		console.log('pag. siguiente')
	}
	private prev(){
		console.log('pag. anterior')
	}
}
