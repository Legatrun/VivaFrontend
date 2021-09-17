import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmbatchesComponent extends Vue {
	private headers: any[] = [
		{ text: 'Nro', align: 'left', sortable: true, value: 'operations', width: '5%' },
		{ text: 'Sucursal', align: 'left', sortable: true, value: 'locationidentification', width: '15%' },
		{ text: 'Terminal', align: 'left', sortable: true, value: 'deviceidentification', width: '15%' },
		{ text: 'Estado', align: 'left', sortable: true, value: 'status', width: '15%' },
		{ text: 'Fecha Apertura', align: 'left', sortable: true, value: 'opentimestamp', width: '15%' },
		{ text: 'Fecha Cierre', align: 'left', sortable: true, value: 'closetimestamp', width: '15%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'operations', width: '15%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_createtimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_updatetimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_opentimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_closetimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_synctimestamp: boolean = false;
	private WebApi = new services.Endpoints();
	private batches = new services.clase_batches();
	private lstbatches: services.clase_batches[] = [];
	private sucursal = new services.clase_locations();
	private pagination = new services.clase_pagination();
	private lstsucursal: services.clase_locations[] = [];
	private devices = new services.clase_devices();
	private lstdevices: services.clase_devices[] = [];
	private message="";
	private activa = false;
	private locationdescription = "";
	private buscarbatches = '';
	private dialog = false;
	private operacion = '';
	private statusDetail = '';
	//paginacion
	desdeInicial=1;
	cantidadInicial=50;
	itemsPerPage: number = 10;
	totalItems: number = 0;
	totalPages: number = 0;
	maxPagesVisible: number = 10;
	currentPageSelected: number = 1;
	itemsPerPageList = [2, 5, 10, 15, -1]
	loadingDataTable: boolean = false;
	disabledPagination: boolean = false;
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	description: string = "";
	autoselectTerminal:boolean = false;
	validacion = [
		(v: any) => !!v || "El campo es requerido"
	];
	/*
	get lstLotesFormateados() {
		return this.lstbatches.map((batches: services.clase_batches) => {
		  return {
			locationidentification:this.FormatearSucursal(batches.locationidentification),
			deviceidentification:batches.deviceidentification,
			status:this.FormatEstado(batches.status),
			opentimestamp:this.FormatDate(batches.opentimestamp),
			closetimestamp:this.FormatDate(batches.closetimestamp),
		  };
		});
	  }
	  */
	private beforeUpdate(){
		if(this.batches.createtimestamp != this.FormatDate(Date.now()) && this.batches.closetimestamp != this.FormatDate(Date.now()) ){
			this.validarFecha()
		}
		if(this.batches.locationidentification != undefined){
			this.CargarTerminales()
		}
	}
	private validarFecha(){
		var fecha_inicio = this.batches.opentimestamp;
		var fecha_fin = this.batches.closetimestamp;
		//fecha_inicio.setHours(0,0,0,0);
		if(fecha_inicio <= fecha_fin){
			this.message = "";
		}else{
			this.message = "Fecha de Hasta no tiene que ser menor de fecha desde";
		}

	}
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
	private FormatEstado(data: any): string{
		if(data == 1){
			return "Close";
		}
		if(data == 2){
			return "Open";
		}	

		return ""
	}
	private updateText(Value: string) {
		if (Value !== null) {
			return Value.toUpperCase();
		} else {
			return Value;
		}
	}
	private mounted() {
		this.cargar_data(this.desdeInicial,this.cantidadInicial);
		this.CargarSucursales();
		this.CargarTerminales();
		
		// this.batches.opentimestamp = this.FormatDate(Date.now());
		// this.batches.closetimestamp = this.FormatDate(Date.now());
	}
	private CargarTerminales(){
		this.autoselectTerminal = false;
		if (this.batches.locationidentification === undefined){
			this.devices.locationidentification = ""
		}else{
			this.devices.locationidentification = this.batches.locationidentification
		}
		// console.log("devices" ,JSON.stringify(this.batches.locationidentification))
		new services.Operaciones().Buscar(this.WebApi.ws_devices_Consultar, this.devices)
		.then((resdevices) => {
			if (resdevices.data._error.error === 0) {
				this.lstdevices = resdevices.data._data;
				this.autoselectTerminal = true;
			} else {
				this.popup.error('Consultar', resdevices.data._error.descripcion);
			}
		}).catch((error) => {
				this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});
	}

	private cargar_data(initPag: number,quantityPag: number) {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		this.lstbatches = [];
		this.batches.initPagination = initPag;
		this.batches.quantityPagination = quantityPag;
		this.itemsPerPage = 50;
		this.totalItems = 0;
		this.totalPages = 0;
		this.maxPagesVisible = 10;
		this.disabledPagination = true;
		this.loadingDataTable = true;
		if( this.batches.locationidentification === undefined && this.batches.deviceidentification === undefined ){
			new services.Operaciones().ConsultarPorPaginacion(this.WebApi.ws_batches_ConsultarPorPaginacion,this.batches)
			.then((resbatches) => {
				if (resbatches.data._error.error === 0) {
					this.lstbatches = resbatches.data._data;
					this.pagination = resbatches.data._pagination;
					this.totalPages = Math.ceil(this.pagination.itemsLengthPagination/this.itemsPerPage)
					//console.log("device1" ,JSON.stringify(this.totalPages))
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
		//este "else" se cumple cuando pasamos a la siguiente pagina
		else{
			new services.Operaciones().Buscar(this.WebApi.ws_batches_ConsultarPorPaginacion_filtro,this.batches)
			.then((resbatchesconfiiltro) => {
				console.log("Filtro: "+JSON.stringify(resbatchesconfiiltro))
				if (resbatchesconfiiltro.data._error.error === 0) {
					this.lstbatches = resbatchesconfiiltro.data._data;
					this.pagination = resbatchesconfiiltro.data._pagination;
					this.totalPages = Math.ceil(this.pagination.itemsLengthPagination/this.itemsPerPage)

					this.loadingDataTable = false;
					this.disabledPagination = false;
					this.dialog = false;
					} else {
						this.popup.error('Consultar', resbatchesconfiiltro.data._error.descripcion);
					}
				}).catch((error) => {
						this.popup.error('Consultar', 'Error Inesperado: ' + error);
				});
		}
		
	}
	private cargar_data_fitro(initPag: number,quantityPag: number) {
		this.lstbatches = [];
		this.batches.initPagination = initPag;
		this.batches.quantityPagination = quantityPag;
		this.itemsPerPage = quantityPag;
		this.totalItems = 0;
		this.totalPages = 0;
		this.maxPagesVisible = 10;
		this.disabledPagination = true;
		this.loadingDataTable = true;

		if( this.batches.locationidentification === undefined && this.batches.deviceidentification === undefined ){
			new services.Operaciones().Buscar(this.WebApi.ws_batches_ConsultarPorPaginacion,this.batches)
		.then((resbatches) => {
			if (resbatches.data._error.error === 0) {
				this.lstbatches = resbatches.data._data;
				this.pagination = resbatches.data._pagination;
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
		else{
		new services.Operaciones().Buscar(this.WebApi.ws_batches_ConsultarPorPaginacion_filtro,this.batches)
		.then((resbatchesconfiltro) => {
			if (resbatchesconfiltro.data._error.error === 0) {
				this.lstbatches = resbatchesconfiltro.data._data;
				this.pagination = resbatchesconfiltro.data._pagination;
				this.totalPages = Math.ceil(this.pagination.itemsLengthPagination/this.itemsPerPage)
				this.loadingDataTable = false;
				this.disabledPagination = false;
				this.dialog = false;
				} else {
					this.popup.error('Consultar', resbatchesconfiltro.data._error.descripcion);
				}
		}).catch((error) => {
				this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});
	}
	}
	private Insertar(): void {
		this.batches = new services.clase_batches();
		this.batches.createtimestamp = this.FormatDate(Date.now());
		this.batches.updatetimestamp = this.FormatDate(Date.now());
		this.batches.opentimestamp = this.FormatDate(Date.now());
		this.batches.closetimestamp = this.FormatDate(Date.now());
		this.batches.synctimestamp = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_batches_Actualizar, this.batches)
			.then((result) => {
				if (result.data.error === 0) {
					this.popup.success('Revisar', result.data.descripcion);
					this.cargar_data(this.desdeInicial,this.cantidadInicial);
				this.dialog = false;
			} else {
			this.popup.error('Revisar', result.data.descripcion);
			}
		})
		.catch((error) => {
			this.popup.error('Revisar', 'Error Inesperado: ' + error);
			});
	} else {
		new services.Operaciones().Insertar(this.WebApi.ws_batches_Insertar, this.batches)
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
		this.dialog = false;
		this.cargar_data(this.desdeInicial,this.cantidadInicial);
	}
	private Revisar(data: services.clase_batches): void {
		this.batches = data;
		this.batches.createtimestamp = this.FormatDate(Date.now());
		this.batches.updatetimestamp = this.FormatDate(Date.now());
		this.batches.opentimestamp = this.FormatDate(Date.now());
		this.batches.closetimestamp = this.FormatDate(Date.now());
		this.batches.synctimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.batches.locationidentification = this.FormatSucursal(this.batches.locationidentification);
		this.statusDetail = this.FormatEstado(this.batches.status);
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_batches): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_batches_Eliminar, data)
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
	private FormatSucursal(locationidentification: any):string {
		var nombreSucursal = "";
		this.lstsucursal.forEach(function(value) {
		  if (value.identification == locationidentification) {
			nombreSucursal = value.description;
		  }
		});
		return nombreSucursal;
	}

	private cargarNuevosElementos(){
		//1(1-51) 2(52-102) 3(103-1523) 4(154-204) 5(205-255)
		let desde = (this.currentPageSelected*this.pagination.itemsPerPagePagination)+(this.currentPageSelected-1)-(this.pagination.itemsPerPagePagination);
		if(desde <= 0){
			desde = 1;
		}
		//console.log("device" ,JSON.stringify(this.disabledPagination))
		let cantidad = this.pagination.itemsPerPagePagination;
		this.cargar_data_fitro(desde, cantidad);
	}

	private cargarNuevosElementos_filter(){
		//1(1-51) 2(52-102) 3(103-1523) 4(154-204) 5(205-255)
		let desde = (this.currentPageSelected*this.pagination.itemsPerPagePagination)+(this.currentPageSelected-1)-(this.pagination.itemsPerPagePagination);
		if(desde <= 0){
			desde = 1;
		}
		let cantidad = this.pagination.itemsPerPagePagination;
		this.cargar_data(desde, cantidad);
	}

	private limpiarFiltros(){
		this.buscarbatches = ""
		this.batches.createtimestamp = ""
		this.batches.closetimestamp = ""
	}
	
	private actualizarTabla(){
		this.cargarNuevosElementos();
	}

}
