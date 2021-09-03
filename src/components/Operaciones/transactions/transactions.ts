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
		{ text: 'Nro', align: 'center', sortable: true, value: 'nro', width: '5%' },
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
	private lstsucursal: services.clase_locations[] = [];
	private devices = new services.clase_devices();
	private lstdevices: services.clase_devices[] = [];
	private lsttransactions: services.clase_transactions[] = [];
	private buscartransactions = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private message="";
	//paginacion
	desdeInicial=1;
	cantidadInicial=50;
	itemsPerPage: number = 50;
	totalItems: number = 0;
	totalPages: number = 0;
	maxPagesVisible: number = 15;
	currentPageSelected: number = 1;
	itemsPerPageList = [2, 5, 10, 15, -1]
	loadingDataTable: boolean = false;
	disabledPagination: boolean = false;
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
		
		}
		else{
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
		if(this.transactions.opentimestamp != undefined && this.transactions.closetimestamp != undefined){
			this.validarFecha()	
		}
		if(this.transactions.locationidentification != undefined){
			this.CargarTerminales()
		}
	}

	private mounted() {
		this.cargar_data(this.desdeInicial,this.cantidadInicial);
		this.CargarSucursales();
		this.CargarTerminales();
		// console.log("opentimestamp",JSON.stringify(this.transactions.opentimestamp))
		// this.transactions.opentimestamp = this.FormatDate(Date.now());
		// this.transactions.closetimestamp = this.FormatDate(Date.now());
	}
	private cargar_data(initPag: number,quantityPag: number) {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		this.lsttransactions = [];
		this.transactions.initPagination = initPag;
		this.transactions.quantityPagination = quantityPag;
		this.totalItems = 0;
		this.totalPages = 0;
		this.disabledPagination = true;
		this.loadingDataTable = true;
		new services.Operaciones().ConsultarPorPaginacion(this.WebApi.ws_transactions_ConsultarPorPaginacion,this.transactions)
		.then((restrans) => {
			if (restrans.data._error.error === 0) {
				this.lsttransactions = restrans.data._data;
				this.pagination = restrans.data._pagination;
				debugger
				this.totalPages = Math.ceil(this.pagination.itemsLengthPagination/this.itemsPerPage)
				this.loadingDataTable = false;
				this.disabledPagination = false;
				this.dialog = false;
				} else {
					this.popup.error('Consultar', restrans.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private cargar_data_filtrada() {
		this.lsttransactions = [];
		this.transactions.quantityPagination = 50;
		this.totalItems = 0;
		this.totalPages = 0;
		this.disabledPagination = true;
		this.loadingDataTable = true;

		if(this.transactions.locationidentification === undefined){
			this.popup.error('Sucursal', 'El campo se encuentra vacio');
			this.cargar_data(this.desdeInicial, this.cantidadInicial)
		} else if(this.transactions.deviceidentification === undefined){
			this.popup.error('Terminal', 'El campo se encuentra vacio');
			this.cargar_data(this.desdeInicial, this.cantidadInicial)
		} else if(this.transactions.operationname === undefined){
			this.popup.error('Tipo de transaccion', 'El campo se encuentra vacio');
			this.cargar_data(this.desdeInicial, this.cantidadInicial)
		} else if(this.transactions.opentimestamp === undefined){
			this.popup.error('Fecha desde', 'El campo se encuentra vacio');
			this.cargar_data(this.desdeInicial, this.cantidadInicial)
		} else if(this.transactions.closetimestamp === undefined){
			this.popup.error('Fecha hasta', 'El campo se encuentra vacio');
			this.cargar_data(this.desdeInicial, this.cantidadInicial)
		} 
		else{
			new services.Operaciones().Buscar(this.WebApi.ws_transactions_ConsultarPorFiltro,this.transactions)
			.then((restrans) => {
				if (restrans.data._error.error === 0) {
					this.lsttransactions = restrans.data._data;
					this.pagination = restrans.data._pagination;
					this.totalPages = Math.ceil(this.pagination.itemsLengthPagination/this.itemsPerPage)
					this.loadingDataTable = false;
					this.disabledPagination = false;
					this.dialog = false;
					} else {
						this.popup.error('Consultar', restrans.data._error.descripcion);
					}
				}).catch((error) => {
						this.popup.error('Consultar', 'Error Inesperado: ' + error);
				});
		}	
	}

	private CargarSucursales(){
		new services.Operaciones().Consultar(this.WebApi.ws_locations_Consultar)
			.then((reslocations) => {
				if (reslocations.data._error.error === 0) {
					this.lstsucursal = reslocations.data._data;
				} else {
					this.popup.error('Consultar', reslocations.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private CargarTerminales(){
		if (this.transactions.locationidentification === undefined){
			this.devices.locationidentification = ""
		}else{
			this.devices.locationidentification = this.transactions.locationidentification
		}
		new services.Operaciones().Buscar(this.WebApi.ws_devices_Consultar, this.devices)
		.then((resdevices) => {
			if (resdevices.data._error.error === 0) {
				this.lstdevices = resdevices.data._data;
			} else {
				this.popup.error('Consultar', resdevices.data._error.descripcion);
			}
		}).catch((error) => {
				this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});
	}

	private FormatSucursal(locationidentification: any):string {
		var nombreSucursal = "";
		this.lstsucursal.forEach(function(value) {
		  if (value.identification == locationidentification) {
			nombreSucursal = value.description;
		  }
		});
		return nombreSucursal;
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
				this.cargar_data(this.desdeInicial,this.cantidadInicial);
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
			this.cargar_data(this.desdeInicial,this.cantidadInicial);
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
		this.cargar_data(this.desdeInicial,this.cantidadInicial);
		this.dialog = false;
	}
	private Actualizar(data: services.clase_transactions): void {
		this.transactions = data;
		this.transactions.deviceidentification = this.FormatNull(data.deviceidentification);
		this.transactions.locationidentification = this.FormatNull(data.locationidentification);
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
				this.cargar_data(this.desdeInicial,this.cantidadInicial);
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
	private validarFecha(){

		const yearInicio = parseInt(this.transactions.opentimestamp.slice(0,4));
		const yearFin = parseInt(this.transactions.closetimestamp.slice(0,4));
		const mesInicio = parseInt(this.transactions.opentimestamp.slice(5,7));
		const mesFin = parseInt(this.transactions.closetimestamp.slice(5,7));
		const diaInicio = parseInt(this.transactions.opentimestamp.slice(8,10));
		const diaFin = parseInt(this.transactions.closetimestamp.slice(8,10));

		if(yearInicio != yearFin){
			this.popup.error("Fecha","El intervalo de tiempo maximo es de 15 dias")
			this.transactions.closetimestamp = ""
		} else if(mesInicio != mesFin){
			if((mesFin - mesInicio) > 1){
				this.popup.error("Fecha","El intervalo de tiempo maximo es de 15 dias")
				this.transactions.closetimestamp = ""
			}
			else if(diaInicio < 16 || diaFin > 15){
				this.popup.error("Fecha","El intervalo de tiempo maximo es de 15 dias")
				this.transactions.closetimestamp = ""
			}
		} else if((diaFin - diaInicio) > 15){
			this.popup.error("Fecha","El intervalo de tiempo maximo es de 15 dias")
			this.transactions.closetimestamp = ""
		}
		//fecha_inicio.setHours(0,0,0,0);
		// if(fecha_inicio <= fecha_fin){
		// 	this.message = "";
		// }else{
		// 	this.message = "Fecha de Hasta no tiene que ser menor de fecha desde";
		// }

	}

	private cargarNuevosElementos(){
		//1(1-51) 2(52-102) 3(103-1523) 4(154-204) 5(205-255)...9820(981151-981251)
		alert("currentPageSelected: "+this.currentPageSelected + "  this.pagination.itemsPerPagePagination:"+ this.pagination.itemsPerPagePagination)
		let desde = (this.currentPageSelected*this.pagination.itemsPerPagePagination)+(this.currentPageSelected-1)-(this.pagination.itemsPerPagePagination);
		if(desde <= 0){
			desde = 1;
		}
		let cantidad = this.pagination.itemsPerPagePagination;
		this.cargar_data(desde, cantidad);
	}

	LimpiarFiltros(){
		this.transactions.locationidentification = ""
		this.transactions.deviceidentification = ""
		this.transactions.opentimestamp = "";
		this.transactions.closetimestamp = "";
		this.cargar_data(this.desdeInicial,this.cantidadInicial)
		this.transactions.opentimestamp = this.FormatDate(Date.now());
		this.transactions.closetimestamp = this.FormatDate(Date.now());
	}
}
