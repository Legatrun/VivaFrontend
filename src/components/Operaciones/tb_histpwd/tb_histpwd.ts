import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class Admtb_histpwdComponent extends Vue {
	private headers: any[] = [
		{ text: 'NOMBRE_USUARIO', align: 'left', sortable: true, value: 'nombre_usuario', width: '15%' },
		{ text: 'creacion', align: 'left', sortable: false, value: 'creacion', width: '15%' },
		{ text: 'hash', align: 'left', sortable: false, value: 'hash', width: '15%' },
		{ text: 'fec_modificacion', align: 'left', sortable: false, value: 'fec_modificacion', width: '15%' },
		{ text: 'usua_modificacion', align: 'left', sortable: false, value: 'usua_modificacion', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_creacion: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_fec_modificacion: boolean = false;
	private WebApi = new services.Endpoints();

	private tb_histpwd = new services.clase_tb_histpwd();
	private lsttb_histpwd: services.clase_tb_histpwd[] = [];
	private buscartb_histpwd = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_tb_histpwd_Consultar)
			.then((restb_histpwd) => {
				if (restb_histpwd.data._error.error === 0) {
					this.lsttb_histpwd = restb_histpwd.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restb_histpwd.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.tb_histpwd = new services.clase_tb_histpwd();
		this.tb_histpwd.creacion = this.FormatDate(Date.now());
		this.tb_histpwd.fec_modificacion = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_tb_histpwd_Actualizar, this.tb_histpwd)
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
		new services.Operaciones().Insertar(this.WebApi.ws_tb_histpwd_Insertar, this.tb_histpwd)
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
	private Actualizar(data: services.clase_tb_histpwd): void {
		this.tb_histpwd = data;
		this.tb_histpwd.creacion = this.FormatDate(Date.now());
		this.tb_histpwd.fec_modificacion = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_tb_histpwd): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.nombre_usuario,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_tb_histpwd_Eliminar, data)
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
