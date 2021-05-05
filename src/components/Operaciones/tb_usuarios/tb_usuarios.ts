import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class Admtb_usuariosComponent extends Vue {
	private headers: any[] = [
		{ text: 'NOMBRE_USUARIO', align: 'left', sortable: true, value: 'nombre_usuario', width: '15%' },
		{ text: 'nombre', align: 'left', sortable: false, value: 'nombre', width: '15%' },
		{ text: 'apellido', align: 'left', sortable: false, value: 'apellido', width: '15%' },
		{ text: 'email', align: 'left', sortable: false, value: 'email', width: '15%' },
		{ text: 'tel', align: 'left', sortable: false, value: 'tel', width: '15%' },
		{ text: 'telmovil', align: 'left', sortable: false, value: 'telmovil', width: '15%' },
		{ text: 'hash', align: 'left', sortable: false, value: 'hash', width: '15%' },
		{ text: 'idgrupo', align: 'left', sortable: false, value: 'idgrupo', width: '15%' },
		{ text: 'idperfil', align: 'left', sortable: false, value: 'idperfil', width: '15%' },
		{ text: 'aplicacion', align: 'left', sortable: false, value: 'aplicacion', width: '15%' },
		{ text: 'enabled', align: 'left', sortable: false, value: 'enabled', width: '15%' },
		{ text: 'config', align: 'left', sortable: false, value: 'config', width: '15%' },
		{ text: 'notas', align: 'left', sortable: false, value: 'notas', width: '15%' },
		{ text: 'cambiar_pwd', align: 'left', sortable: false, value: 'cambiar_pwd', width: '15%' },
		{ text: 'estado', align: 'left', sortable: false, value: 'estado', width: '15%' },
		{ text: 'create_timestamp', align: 'left', sortable: false, value: 'create_timestamp', width: '15%' },
		{ text: 'usuario_creacion', align: 'left', sortable: false, value: 'usuario_creacion', width: '15%' },
		{ text: 'usuario_modif', align: 'left', sortable: false, value: 'usuario_modif', width: '15%' },
		{ text: 'ultimo_acceso', align: 'left', sortable: false, value: 'ultimo_acceso', width: '15%' },
		{ text: 'fec_modificacion', align: 'left', sortable: false, value: 'fec_modificacion', width: '15%' },
		{ text: 'usua_modificacion', align: 'left', sortable: false, value: 'usua_modificacion', width: '15%' },
		{ text: 'intentos', align: 'left', sortable: false, value: 'intentos', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_create_timestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_ultimo_acceso: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_fec_modificacion: boolean = false;
	private WebApi = new services.Endpoints();

	private tb_usuarios = new services.clase_tb_usuarios();
	private lsttb_usuarios: services.clase_tb_usuarios[] = [];
	private buscartb_usuarios = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_tb_usuarios_Consultar)
			.then((restb_usuarios) => {
				if (restb_usuarios.data._error.error === 0) {
					this.lsttb_usuarios = restb_usuarios.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restb_usuarios.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.tb_usuarios = new services.clase_tb_usuarios();
		this.tb_usuarios.create_timestamp = this.FormatDate(Date.now());
		this.tb_usuarios.ultimo_acceso = this.FormatDate(Date.now());
		this.tb_usuarios.fec_modificacion = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_tb_usuarios_Actualizar, this.tb_usuarios)
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
		new services.Operaciones().Insertar(this.WebApi.ws_tb_usuarios_Insertar, this.tb_usuarios)
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
	private Actualizar(data: services.clase_tb_usuarios): void {
		this.tb_usuarios = data;
		this.tb_usuarios.create_timestamp = this.FormatDate(Date.now());
		this.tb_usuarios.ultimo_acceso = this.FormatDate(Date.now());
		this.tb_usuarios.fec_modificacion = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_tb_usuarios): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_tb_usuarios_Eliminar, data)
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
