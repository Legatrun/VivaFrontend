import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class Admtb_sesionesComponent extends Vue {
	private headers: any[] = [
		{ text: 'ID', align: 'left', sortable: true, value: 'id', width: '15%' },
		{ text: 'nombre_usuario', align: 'left', sortable: false, value: 'nombre_usuario', width: '15%' },
		{ text: 'datos', align: 'left', sortable: false, value: 'datos', width: '15%' },
		{ text: 'ultimo_acceso', align: 'left', sortable: false, value: 'ultimo_acceso', width: '15%' },
		{ text: 'creacion', align: 'left', sortable: false, value: 'creacion', width: '15%' },
		{ text: 'fec_modificacion', align: 'left', sortable: false, value: 'fec_modificacion', width: '15%' },
		{ text: 'usua_modificacion', align: 'left', sortable: false, value: 'usua_modificacion', width: '15%' },
		{ text: 'estado', align: 'left', sortable: false, value: 'estado', width: '15%' },
		{ text: 'ip', align: 'left', sortable: false, value: 'ip', width: '15%' },
		{ text: 'cierre', align: 'left', sortable: false, value: 'cierre', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_ultimo_acceso: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_creacion: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_fec_modificacion: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_cierre: boolean = false;
	private WebApi = new services.Endpoints();

	private tb_sesiones = new services.clase_tb_sesiones();
	private lsttb_sesiones: services.clase_tb_sesiones[] = [];
	private buscartb_sesiones = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_tb_sesiones_Consultar)
			.then((restb_sesiones) => {
				if (restb_sesiones.data._error.error === 0) {
					this.lsttb_sesiones = restb_sesiones.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restb_sesiones.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.tb_sesiones = new services.clase_tb_sesiones();
		this.tb_sesiones.ultimo_acceso = this.FormatDate(Date.now());
		this.tb_sesiones.creacion = this.FormatDate(Date.now());
		this.tb_sesiones.fec_modificacion = this.FormatDate(Date.now());
		this.tb_sesiones.cierre = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_tb_sesiones_Actualizar, this.tb_sesiones)
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
		new services.Operaciones().Insertar(this.WebApi.ws_tb_sesiones_Insertar, this.tb_sesiones)
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
	private Actualizar(data: services.clase_tb_sesiones): void {
		this.tb_sesiones = data;
		this.tb_sesiones.ultimo_acceso = this.FormatDate(Date.now());
		this.tb_sesiones.creacion = this.FormatDate(Date.now());
		this.tb_sesiones.fec_modificacion = this.FormatDate(Date.now());
		this.tb_sesiones.cierre = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_tb_sesiones): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_tb_sesiones_Eliminar, data)
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
