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
	private message="";
	private activa = false;
	private locationdescription = "";
	private buscarbatches = '';
	private dialog = false;
	private operacion = '';
	private statusDetail = '';
	itemsPerPage: number = 0;
	totalItems: number = 0;
	totalPages: number = 0;
	maxPagesVisible: number = 10;
	currentPageSelected: number = 1;
	loadingDataTable: boolean = false;
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	// pag
	// public buscaragencia = '';
	// public noDataMessage = "Cargando...";
	// public rowsPerPageText = 'Registros por Pagina:';
	// public rowsPerPage = 20;
    // public totalItems = 0;
    // public desactivado = new Boolean;
	// pages()
	// {
	// 	if (this.rowsPerPage == null ||
	// 		this.totalItems == null
	// 	) return 0
	// 	return Math.ceil(this.totalItems / this.rowsPerPage)
	// }
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
	beforeUpdate(){
		this.validarFecha()
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
		this.cargar_data();
		this.CargarSucursales();
		this.batches.opentimestamp = this.FormatDate(Date.now());
		this.batches.closetimestamp = this.FormatDate(Date.now());
	}
	private cargar_data() {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		let desde = 0;
		let hasta = 20;
		this.CargarPorPaginacion(desde,hasta);
		
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
		new services.Operaciones().Insertar(this.WebApi.ws_batches_Insertar, this.batches)
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
		this.dialog = false;
		this.cargar_data();
	}
	private Actualizar(data: services.clase_batches): void {
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

	private CargarPorPaginacion(init:number,until: number){
		this.batches.initItemPagination = init;
		this.batches.untilItemPagination = until;
		this.loadingDataTable = true;
		this.lstbatches = [];
		new services.Operaciones().ConsultarPorPaginacion(this.WebApi.ws_batches_ConsultarPorPaginacion,this.batches)
		.then((resbatches) => {
			if (resbatches.data._error.error === 0) {
				this.lstbatches = resbatches.data._data;
				this.pagination = resbatches.data._pagination;
				// Config Pagination
				this.itemsPerPage = this.pagination.itemsPerPagePagination;
				this.totalPages = Math.ceil(this.pagination.itemsLengthPagination/this.pagination.itemsPerPagePagination)
				
				this.loadingDataTable = false;
				this.dialog = false;
				} else {
					this.popup.error('Consultar', resbatches.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	
	private elementosPorPagina(){
		let desde = this.pagination.untilItemPagination - 1;
		let hasta = this.pagination.untilItemPagination + this.pagination.itemsPerPagePagination;
		this.CargarPorPaginacion(desde, hasta);
	}
}
