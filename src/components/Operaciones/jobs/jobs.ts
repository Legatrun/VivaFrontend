import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmjobsComponent extends Vue {
	private headers: any[] = [
		{ text: 'JOBNAME', align: 'left', sortable: true, value: 'jobname', width: '15%' },
		{ text: 'jobstarttimestamp', align: 'left', sortable: false, value: 'jobstarttimestamp', width: '15%' },
		{ text: 'jobendtimestamp', align: 'left', sortable: false, value: 'jobendtimestamp', width: '15%' },
		{ text: 'jobstatus', align: 'left', sortable: false, value: 'jobstatus', width: '15%' },
		{ text: 'jobcommand', align: 'left', sortable: false, value: 'jobcommand', width: '15%' },
		{ text: 'jobreturncode', align: 'left', sortable: false, value: 'jobreturncode', width: '15%' },
		{ text: 'joboutputfile', align: 'left', sortable: false, value: 'joboutputfile', width: '15%' },
		{ text: 'userid', align: 'left', sortable: false, value: 'userid', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_jobstarttimestamp: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_jobendtimestamp: boolean = false;
	private WebApi = new services.Endpoints();

	private jobs = new services.clase_jobs();
	private lstjobs: services.clase_jobs[] = [];
	private buscarjobs = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_jobs_Consultar)
			.then((resjobs) => {
				if (resjobs.data._error.error === 0) {
					this.lstjobs = resjobs.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resjobs.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.jobs = new services.clase_jobs();
		this.jobs.jobstarttimestamp = this.FormatDate(Date.now());
		this.jobs.jobendtimestamp = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_jobs_Actualizar, this.jobs)
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
		new services.Operaciones().Insertar(this.WebApi.ws_jobs_Insertar, this.jobs)
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
	private Actualizar(data: services.clase_jobs): void {
		this.jobs = data;
		this.jobs.jobstarttimestamp = this.FormatDate(Date.now());
		this.jobs.jobendtimestamp = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_jobs): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.jobname,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_jobs_Eliminar, data)
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
