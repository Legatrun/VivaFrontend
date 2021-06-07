import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmreportsComponent extends Vue {
	private headers: any[] = [
		//{ text: 'ID', align: 'left', sortable: true, value: 'id', width: '15%' },
		{ text: 'REPORTE', align: 'left', sortable: false, value: 'reportname', width: '20%' },
		//{ text: 'description', align: 'left', sortable: false, value: 'description', width: '15%' },
		//{ text: 'url', align: 'left', sortable: false, value: 'url', width: '15%' },
		{ text: 'OPERACIONES', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private reports = new services.clase_reports();
	private lstreports: services.clase_reports[] = [];
	private buscarreports = '';
	private dialog = false;
	private dialogAbrir = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private fechareporte:any;
	private activa = false;
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
	];
	reportes=['reporte diario','reporte mensual' ]
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
		new services.Operaciones().Consultar(this.WebApi.ws_reports_Consultar)
			.then((resreports) => {
				if (resreports.data._error.error === 0) {
					this.lstreports = resreports.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resreports.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.reports = new services.clase_reports();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_reports_Actualizar, this.reports)
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
		new services.Operaciones().Insertar(this.WebApi.ws_reports_Insertar, this.reports)
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
	private CancelarFormAbrir() {
		this.cargar_data();
		this.dialogAbrir = false;
	}
	private Actualizar(data: services.clase_reports): void {
		this.reports = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_reports): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_reports_Eliminar, data)
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

	AbrirReporte(){
		this.dialogAbrir = true;
	}
}
