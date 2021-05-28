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
		{ text: 'Sucursal', align: 'left', sortable: false, value: 'locationidentification', width: '15%' },
		{ text: 'Terminal', align: 'left', sortable: false, value: 'deviceidentification', width: '15%' },
		{ text: 'Estado', align: 'left', sortable: false, value: 'status', width: '15%' },
		{ text: 'Fecha Apertura', align: 'left', sortable: false, value: 'opentimestamp', width: '15%' },
		{ text: 'Fecha Cierre', align: 'left', sortable: false, value: 'closetimestamp', width: '15%' },
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
	private lstlocations: services.clase_locations[] = [];
	private locationdescription = "";
	private buscarbatches = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_batches_Consultar)
			.then((resbatches) => {
				if (resbatches.data._error.error === 0) {
					this.lstbatches = resbatches.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resbatches.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
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
		this.cargar_data();
		this.dialog = false;
	}
	private Actualizar(data: services.clase_batches): void {
		this.batches = data;
		this.batches.createtimestamp = this.FormatDate(Date.now());
		this.batches.updatetimestamp = this.FormatDate(Date.now());
		this.batches.opentimestamp = this.FormatDate(Date.now());
		this.batches.closetimestamp = this.FormatDate(Date.now());
		this.batches.synctimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.FormatLocation(this.batches.locationidentification);
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

	private FormatLocation(locationId:any):string{
		new services.Operaciones().Consultar(this.WebApi.ws_locations_Consultar)
			.then((reslocation) => {
				if (reslocation.data._error.error === 0) {
					this.lstlocations = reslocation.data._data;
					var newthis = this;
					this.lstlocations.forEach(function(loc)
					{
						newthis.locationdescription = loc.description;
					})

					return this.locationdescription;
				} else {
					this.popup.error('Consultar', reslocation.data._error.descripcion);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});
		return this.locationdescription;
	}
}
