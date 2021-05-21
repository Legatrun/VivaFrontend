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
		// { text: 'ID', align: 'left', sortable: true, value: 'id', width: '15%' },
		{ text: 'Fecha', align: 'left', sortable: false, value: 'createtimestamp', width: '7%' },
		// { text: 'updatetimestamp', align: 'left', sortable: false, value: 'updatetimestamp', width: '15%' },
		{ text: 'Terminal', align: 'left', sortable: false, value: 'deviceidentification', width: '7%' },
		{ text: 'Sucursal', align: 'left', sortable: false, value: 'locationidentification', width: '7%' },
		// { text: 'payloadrequest', align: 'left', sortable: false, value: 'payloadrequest', width: '7%' },
		{ text: 'Identificación de Proveedor', align: 'left', sortable: false, value: 'provideridentification', width: '7%' },
		{ text: 'Estado de Dispositivo', align: 'left', sortable: false, value: 'devicestatus', width: '7%' },
		{ text: 'Número', align: 'left', sortable: false, value: 'number_', width: '7%' },
		{ text: 'Estado', align: 'left', sortable: false, value: 'status', width: '7%' },
		// { text: 'opentimestamp', align: 'left', sortable: false, value: 'opentimestamp', width: '15%' },
		// { text: 'closetimestamp', align: 'left', sortable: false, value: 'closetimestamp', width: '15%' },
		// { text: 'syncstatus', align: 'left', sortable: false, value: 'syncstatus', width: '15%' },
		// { text: 'synctimestamp', align: 'left', sortable: false, value: 'synctimestamp', width: '15%' },
		// { text: 'operativeday', align: 'left', sortable: false, value: 'operativeday', width: '15%' },
		// { text: 'totaltx', align: 'left', sortable: false, value: 'totaltx', width: '15%' },
		// { text: 'totalamount', align: 'left', sortable: false, value: 'totalamount', width: '15%' },
		// { text: 'totalaccepted', align: 'left', sortable: false, value: 'totalaccepted', width: '15%' },
		// { text: 'totalreturned', align: 'left', sortable: false, value: 'totalreturned', width: '15%' },
		// { text: 'totalavailable', align: 'left', sortable: false, value: 'totalavailable', width: '15%' },
		// { text: 'totalgivenamount', align: 'left', sortable: false, value: 'totalgivenamount', width: '15%' },
		// { text: 'totaldebtamount', align: 'left', sortable: false, value: 'totaldebtamount', width: '15%' },
		// { text: 'totalrefilloperations', align: 'left', sortable: false, value: 'totalrefilloperations', width: '15%' },
		// { text: 'totalrefillamount', align: 'left', sortable: false, value: 'totalrefillamount', width: '15%' },
		// { text: 'totalcollectoperations', align: 'left', sortable: false, value: 'totalcollectoperations', width: '15%' },
		// { text: 'totalcollectamount', align: 'left', sortable: false, value: 'totalcollectamount', width: '15%' },
		// { text: 'totalcardsdelivered', align: 'left', sortable: false, value: 'totalcardsdelivered', width: '15%' },
		// { text: 'totalcardrefilloperations', align: 'left', sortable: false, value: 'totalcardrefilloperations', width: '15%' },
		// { text: 'totalcardrefillamount', align: 'left', sortable: false, value: 'totalcardrefillamount', width: '15%' },
		// { text: 'totalcardcollectoperations', align: 'left', sortable: false, value: 'totalcardcollectoperations', width: '15%' },
		// { text: 'totalcardcollectamount', align: 'left', sortable: false, value: 'totalcardcollectamount', width: '15%' },
		// { text: 'carddispenserstatus', align: 'left', sortable: false, value: 'carddispenserstatus', width: '15%' },
		// { text: 'totallocks', align: 'left', sortable: false, value: 'totallocks', width: '15%' },
		// { text: 'opentime', align: 'left', sortable: false, value: 'opentime', width: '15%' },
		// { text: 'closetime', align: 'left', sortable: false, value: 'closetime', width: '15%' },
		// { text: 'scannerstatus', align: 'left', sortable: false, value: 'scannerstatus', width: '15%' },
		// { text: 'motionsensorstatus', align: 'left', sortable: false, value: 'motionsensorstatus', width: '15%' },
		// { text: 'printerstatus', align: 'left', sortable: false, value: 'printerstatus', width: '15%' },
		// { text: 'cashacceptorstatus', align: 'left', sortable: false, value: 'cashacceptorstatus', width: '15%' },
		// { text: 'cashchangerstatus', align: 'left', sortable: false, value: 'cashchangerstatus', width: '15%' },
		// { text: 'coinacceptorstatus', align: 'left', sortable: false, value: 'coinacceptorstatus', width: '15%' },
		// { text: 'coinchangerstatus', align: 'left', sortable: false, value: 'coinchangerstatus', width: '15%' },
		// { text: 'cardreaderstatus', align: 'left', sortable: false, value: 'cardreaderstatus', width: '15%' },
		// { text: 'blockreason', align: 'left', sortable: false, value: 'blockreason', width: '15%' },
		// { text: 'blockstatus', align: 'left', sortable: false, value: 'blockstatus', width: '15%' },
		// { text: 'aceptor_000005', align: 'left', sortable: false, value: 'aceptor_000005', width: '15%' },
		// { text: 'aceptor_000010', align: 'left', sortable: false, value: 'aceptor_000010', width: '15%' },
		// { text: 'aceptor_000025', align: 'left', sortable: false, value: 'aceptor_000025', width: '15%' },
		// { text: 'aceptor_000050', align: 'left', sortable: false, value: 'aceptor_000050', width: '15%' },
		// { text: 'aceptor_000100', align: 'left', sortable: false, value: 'aceptor_000100', width: '15%' },
		// { text: 'aceptor_000200', align: 'left', sortable: false, value: 'aceptor_000200', width: '15%' },
		// { text: 'aceptor_000500', align: 'left', sortable: false, value: 'aceptor_000500', width: '15%' },
		// { text: 'aceptor_001000', align: 'left', sortable: false, value: 'aceptor_001000', width: '15%' },
		// { text: 'aceptor_002000', align: 'left', sortable: false, value: 'aceptor_002000', width: '15%' },
		// { text: 'aceptor_005000', align: 'left', sortable: false, value: 'aceptor_005000', width: '15%' },
		// { text: 'aceptor_010000', align: 'left', sortable: false, value: 'aceptor_010000', width: '15%' },
		// { text: 'changer_000005', align: 'left', sortable: false, value: 'changer_000005', width: '15%' },
		// { text: 'changer_000010', align: 'left', sortable: false, value: 'changer_000010', width: '15%' },
		// { text: 'changer_000025', align: 'left', sortable: false, value: 'changer_000025', width: '15%' },
		// { text: 'changer_000050', align: 'left', sortable: false, value: 'changer_000050', width: '15%' },
		// { text: 'changer_000100', align: 'left', sortable: false, value: 'changer_000100', width: '15%' },
		// { text: 'changer_000200', align: 'left', sortable: false, value: 'changer_000200', width: '15%' },
		// { text: 'changer_000500', align: 'left', sortable: false, value: 'changer_000500', width: '15%' },
		// { text: 'changer_001000', align: 'left', sortable: false, value: 'changer_001000', width: '15%' },
		// { text: 'changer_002000', align: 'left', sortable: false, value: 'changer_002000', width: '15%' },
		// { text: 'changer_005000', align: 'left', sortable: false, value: 'changer_005000', width: '15%' },
		// { text: 'changer_010000', align: 'left', sortable: false, value: 'changer_010000', width: '15%' },
		// { text: 'return_000005', align: 'left', sortable: false, value: 'return_000005', width: '15%' },
		// { text: 'return_000010', align: 'left', sortable: false, value: 'return_000010', width: '15%' },
		// { text: 'return_000025', align: 'left', sortable: false, value: 'return_000025', width: '15%' },
		// { text: 'return_000050', align: 'left', sortable: false, value: 'return_000050', width: '15%' },
		// { text: 'return_000100', align: 'left', sortable: false, value: 'return_000100', width: '15%' },
		// { text: 'return_000200', align: 'left', sortable: false, value: 'return_000200', width: '15%' },
		// { text: 'return_000500', align: 'left', sortable: false, value: 'return_000500', width: '15%' },
		// { text: 'return_001000', align: 'left', sortable: false, value: 'return_001000', width: '15%' },
		// { text: 'return_002000', align: 'left', sortable: false, value: 'return_002000', width: '15%' },
		// { text: 'return_005000', align: 'left', sortable: false, value: 'return_005000', width: '15%' },
		// { text: 'return_010000', align: 'left', sortable: false, value: 'return_010000', width: '15%' },
		// { text: 'return_066666', align: 'left', sortable: false, value: 'return_066666', width: '15%' },
		// { text: 'aceptor_100000', align: 'left', sortable: false, value: 'aceptor_100000', width: '15%' },
		// { text: 'aceptor_200000', align: 'left', sortable: false, value: 'aceptor_200000', width: '15%' },
		// { text: 'aceptor_500000', align: 'left', sortable: false, value: 'aceptor_500000', width: '15%' },
		// { text: 'aceptor_1000000', align: 'left', sortable: false, value: 'aceptor_1000000', width: '15%' },
		// { text: 'changer_100000', align: 'left', sortable: false, value: 'changer_100000', width: '15%' },
		// { text: 'changer_200000', align: 'left', sortable: false, value: 'changer_200000', width: '15%' },
		// { text: 'changer_500000', align: 'left', sortable: false, value: 'changer_500000', width: '15%' },
		// { text: 'changer_1000000', align: 'left', sortable: false, value: 'changer_1000000', width: '15%' },
		// { text: 'return_100000', align: 'left', sortable: false, value: 'return_100000', width: '15%' },
		// { text: 'return_1000000', align: 'left', sortable: false, value: 'return_1000000', width: '15%' },
		// { text: 'return_500000', align: 'left', sortable: false, value: 'return_500000', width: '15%' },
		// { text: 'return_200000', align: 'left', sortable: false, value: 'return_200000', width: '15%' },
		// { text: 'aceptordetail', align: 'left', sortable: false, value: 'aceptordetail', width: '15%' },
		// { text: 'changerdetail', align: 'left', sortable: false, value: 'changerdetail', width: '15%' },
		// { text: 'returndetail', align: 'left', sortable: false, value: 'returndetail', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '5%' },
	];
	private headersAceptadores: any[] = [
		{ text: '10', align: 'left', sortable: false, value: 'aceptor_001000', width: '15%' },
		{ text: '20', align: 'left', sortable: false, value: 'aceptor_002000', width: '15%' },
		{ text: '50', align: 'left', sortable: false, value: 'aceptor_005000', width: '15%' },
		{ text: 'aceptor_010000', align: 'left', sortable: false, value: 'aceptor_010000', width: '15%' },
		{ text: 'aceptor_200000', align: 'left', sortable: false, value: 'aceptor_200000', width: '15%' },
		// { text: 'aceptor_1000000', align: 'left', sortable: false, value: 'aceptor_1000000', width: '15%' },
		// { text: 'changer_100000', align: 'left', sortable: false, value: 'changer_100000', width: '15%' },
		// { text: 'changer_200000', align: 'left', sortable: false, value: 'changer_200000', width: '15%' },
		// { text: 'changer_500000', align: 'left', sortable: false, value: 'changer_500000', width: '15%' },
		// { text: 'changer_1000000', align: 'left', sortable: false, value: 'changer_1000000', width: '15%' },
		// { text: 'return_100000', align: 'left', sortable: false, value: 'return_100000', width: '15%' },
		// { text: 'return_1000000', align: 'left', sortable: false, value: 'return_1000000', width: '15%' },
		// { text: 'return_500000', align: 'left', sortable: false, value: 'return_500000', width: '15%' },
		// { text: 'return_200000', align: 'left', sortable: false, value: 'return_200000', width: '15%' },
		// { text: 'aceptordetail', align: 'left', sortable: false, value: 'aceptordetail', width: '15%' },
		// { text: 'changerdetail', align: 'left', sortable: false, value: 'changerdetail', width: '15%' },
		// { text: 'returndetail', align: 'left', sortable: false, value: 'returndetail', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '5%' },
	];
	currentItem = 'tab-Web'
	items = [
	  'Web', 'Shopping', 'Videos', 'Images',
	]
	more = [
	  'News', 'Maps', 'Books', 'Flights', 'Apps',
	]
	text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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
}
