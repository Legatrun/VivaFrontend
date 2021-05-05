import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmdeviceresumeprocessComponent extends Vue {
	private headers: any[] = [
		{ text: 'ID', align: 'left', sortable: true, value: 'id', width: '15%' },
		{ text: 'datefrom', align: 'left', sortable: false, value: 'datefrom', width: '15%' },
		{ text: 'dateuntil', align: 'left', sortable: false, value: 'dateuntil', width: '15%' },
		{ text: 'dateprocess', align: 'left', sortable: false, value: 'dateprocess', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_datefrom: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_dateuntil: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_dateprocess: boolean = false;
	private WebApi = new services.Endpoints();

	private deviceresumeprocess = new services.clase_deviceresumeprocess();
	private lstdeviceresumeprocess: services.clase_deviceresumeprocess[] = [];
	private buscardeviceresumeprocess = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_deviceresumeprocess_Consultar)
			.then((resdeviceresumeprocess) => {
				if (resdeviceresumeprocess.data._error.error === 0) {
					this.lstdeviceresumeprocess = resdeviceresumeprocess.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resdeviceresumeprocess.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.deviceresumeprocess = new services.clase_deviceresumeprocess();
		this.deviceresumeprocess.datefrom = this.FormatDate(Date.now());
		this.deviceresumeprocess.dateuntil = this.FormatDate(Date.now());
		this.deviceresumeprocess.dateprocess = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_deviceresumeprocess_Actualizar, this.deviceresumeprocess)
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
		new services.Operaciones().Insertar(this.WebApi.ws_deviceresumeprocess_Insertar, this.deviceresumeprocess)
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
	private Actualizar(data: services.clase_deviceresumeprocess): void {
		this.deviceresumeprocess = data;
		this.deviceresumeprocess.datefrom = this.FormatDate(Date.now());
		this.deviceresumeprocess.dateuntil = this.FormatDate(Date.now());
		this.deviceresumeprocess.dateprocess = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_deviceresumeprocess): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_deviceresumeprocess_Eliminar, data)
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
