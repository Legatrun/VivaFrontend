import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmdevicestatuscolletionsresumeComponent extends Vue {
	private headers: any[] = [
		// { text: 'ID', align: 'left', sortable: true, value: 'id', width: '15%' },
		// { text: 'createtimestamp', align: 'left', sortable: false, value: 'createtimestamp', width: '15%' },
		// { text: 'updatetimestamp', align: 'left', sortable: false, value: 'updatetimestamp', width: '15%' },
		// { text: 'deviceidentification', align: 'left', sortable: false, value: 'deviceidentification', width: '15%' },
		// { text: 'locationidentification', align: 'left', sortable: false, value: 'locationidentification', width: '15%' },
		// { text: 'servicename', align: 'left', sortable: false, value: 'servicename', width: '15%' },
		// { text: 'operationname', align: 'left', sortable: false, value: 'operationname', width: '15%' },
		// { text: 'sequencenumber', align: 'left', sortable: false, value: 'sequencenumber', width: '15%' },
		// { text: 'transporttimestamp', align: 'left', sortable: false, value: 'transporttimestamp', width: '15%' },
		// { text: 'provideridentification', align: 'left', sortable: false, value: 'provideridentification', width: '15%' },
		// { text: 'providertransactionid', align: 'left', sortable: false, value: 'providertransactionid', width: '15%' },
		// { text: 'devicetransactionid', align: 'left', sortable: false, value: 'devicetransactionid', width: '15%' },
		// { text: 'batchnumber', align: 'left', sortable: false, value: 'batchnumber', width: '15%' },
		// { text: 'transactionid', align: 'left', sortable: false, value: 'transactionid', width: '15%' },
		// { text: 'alarm', align: 'left', sortable: false, value: 'alarm', width: '15%' },
		// { text: 'devicestatus', align: 'left', sortable: false, value: 'devicestatus', width: '15%' },
		// { text: 'operatingmode', align: 'left', sortable: false, value: 'operatingmode', width: '15%' },
		// { text: 'alarmid', align: 'left', sortable: false, value: 'alarmid', width: '15%' },
		// { text: 'aceptordetail', align: 'left', sortable: false, value: 'aceptordetail', width: '15%' },
		// { text: 'changerdetail', align: 'left', sortable: false, value: 'changerdetail', width: '15%' },
		// { text: 'returndetail', align: 'left', sortable: false, value: 'returndetail', width: '15%' },
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
		// { text: 'totallocks', align: 'left', sortable: false, value: 'totallocks', width: '15%' },
		// { text: 'opentime', align: 'left', sortable: false, value: 'opentime', width: '15%' },
		// { text: 'closetime', align: 'left', sortable: false, value: 'closetime', width: '15%' },
		// { text: 'vdmstatus', align: 'left', sortable: false, value: 'vdmstatus', width: '15%' },
		// { text: 'powerstatus', align: 'left', sortable: false, value: 'powerstatus', width: '15%' },
		// { text: 'scannerstatus', align: 'left', sortable: false, value: 'scannerstatus', width: '15%' },
		// { text: 'motionsensorstatus', align: 'left', sortable: false, value: 'motionsensorstatus', width: '15%' },
		// { text: 'printerstatus', align: 'left', sortable: false, value: 'printerstatus', width: '15%' },
		// { text: 'cashacceptorstatus', align: 'left', sortable: false, value: 'cashacceptorstatus', width: '15%' },
		// { text: 'cashchangerstatus', align: 'left', sortable: false, value: 'cashchangerstatus', width: '15%' },
		// { text: 'coinacceptorstatus', align: 'left', sortable: false, value: 'coinacceptorstatus', width: '15%' },
		// { text: 'coinchangerstatus', align: 'left', sortable: false, value: 'coinchangerstatus', width: '15%' },
		// { text: 'devicestatusdetail', align: 'left', sortable: false, value: 'devicestatusdetail', width: '15%' },
		// { text: 'processid', align: 'left', sortable: false, value: 'processid', width: '15%' },
		// { text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
		{ text: 'Sucursal', align: 'left', sortable: true, value: 'locationidentification', width: '7%' },
		{ text: 'Terminal', align: 'left', sortable: true, value: 'deviceidentification', width: '7%' },
		{ text: 'Fecha', align: 'left', sortable: true, value: 'createtimestamp', width: '7%' },
		{ text: 'Alarma', align: 'left', sortable: true, value: 'alarm', width: '7%' },
		{ text: 'Bloqueo', align: 'left', sortable: true, value: 'devicestatus', width: '7%' },
		{ text: 'Detalle', align: 'left', sortable: true, value: 'devicestatusdetail', width: '7%' },
		{ text: 'Modo Op.', align: 'left', sortable: true, value: 'operatingmode', width: '7%' },
		{ text: 'Estado', align: 'left', sortable: true, value: 'operatingname', width: '7%' },
		// { text: 'Operaciones', align: 'left', sortable: false, value: 'operaciones', width: '7%' },
	];
	EstadosDisponibles=[
		{ estadoID:'0', estadoDetalle:'Inform'},
		{ estadoID:'1', estadoDetalle:'Open'},
		{ estadoID:'2', estadoDetalle:'Close'},
	]
	// tslint:disable-next-line: variable-name
	private menu_createtimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_updatetimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_transporttimestamp: boolean = false;
	private WebApi = new services.Endpoints();

	private devicestatuscolletionsresume = new services.clase_devicestatuscolletionsresume();
	private lstdevicestatuscolletionsresumeprovider: services.clase_devicestatuscolletionsresumeprovider[] = [];
	private lstsucursales: services.clase_locations[] = [];
	private lstdevices: services.clase_devices[] = [];
	private buscardevicestatuscolletionsresume = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private colorStatus: string = 'white';
	private loadingTable = false;

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
	private FormatBloqueo(data: any) {
		switch (data){
			case 0:
				return 'NO'
				break;
			case 1:
				return 'SI'
				break;
			case 2:
				return 'Ninguno'
				break;
		}
	}
	private FormatEstado(data: any) {
		if(data == "Close"){
			return "Cerrado"
		}
		if(data == "Open"){
			return "Abierto"
		}
		if(data == "Inform"){
			return "Inform"
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
		this.CargarSucursales();
		this.CargarTerminales();
		
	}
	private cargar_data() {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		this.loadingTable = true; 
		new services.Operaciones().Consultar(this.WebApi.ws_devicestatuscolletionsresumeprovider_Consultar)
			.then((resdevicestatuscolletionsresumeprovider) => {
				if (resdevicestatuscolletionsresumeprovider.data._error.error === 0) {
					this.lstdevicestatuscolletionsresumeprovider = resdevicestatuscolletionsresumeprovider.data._data;
					// this.FormatEstado(this.devicestatuscolletionsresume)
					this.loadingTable = false;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resdevicestatuscolletionsresumeprovider.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.devicestatuscolletionsresume = new services.clase_devicestatuscolletionsresume();
		this.devicestatuscolletionsresume.createtimestamp = this.FormatDate(Date.now());
		this.devicestatuscolletionsresume.updatetimestamp = this.FormatDate(Date.now());
		this.devicestatuscolletionsresume.transporttimestamp = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_devicestatuscolletionsresume_Actualizar, this.devicestatuscolletionsresume)
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
		new services.Operaciones().Insertar(this.WebApi.ws_devicestatuscolletionsresume_Insertar, this.devicestatuscolletionsresume)
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
	private Actualizar(data: services.clase_devicestatuscolletionsresume): void {
		this.devicestatuscolletionsresume = data;
		this.devicestatuscolletionsresume.createtimestamp = this.FormatDate(Date.now());
		this.devicestatuscolletionsresume.updatetimestamp = this.FormatDate(Date.now());
		this.devicestatuscolletionsresume.transporttimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_devicestatuscolletionsresume): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_devicestatuscolletionsresume_Eliminar, data)
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
					this.lstsucursales = reslocations.data._data;
				} else {
					this.popup.error('Consultar', reslocations.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private CargarTerminales(){
		new services.Operaciones().Consultar(this.WebApi.ws_devices_Consultar)
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
		this.lstsucursales.forEach(function(value) {
		  if (value.identification === locationidentification) {
			nombreSucursal = value.description;
		  }
		});
		return nombreSucursal;
	}
	private FormatAlarma(locationidentification: any) {
		if(locationidentification == undefined || locationidentification == "" ){
			return "Ninguna"
		}
		else{
			return locationidentification;
		}
	}

}
