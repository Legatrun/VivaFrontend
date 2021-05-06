import Vue from 'vue';
import Inicio from './components/Inicio/Inicio';
import Menu from './components/Menu/Menu';
import { Component } from 'vue-property-decorator';
import Axios from 'axios';
import * as popup from '@/popup';
import crypto from '@/encrypt';
import swal from 'sweetalert2';

@Component({
  components: {
    Inicio,
    Menu,
  },
})
export default class AppComponent extends Vue {
  public name!: 'App';
  public drawer: boolean = true;
  private dialog = new popup.Swal();
  private objcryptServer = new crypto();
  private encryptServer = '';
  private decryptServer = '';
  private version = '2.1.0';
  public Login() {
    this.$router.push({ path: '/Login' });
  }
  public Inicio() {
    this.drawer = !this.drawer;
  }
  public Logout() {
    // this.dialog.warning(
    //   'Aplicacion',
    //   'Está seguro que desea salir de la Aplicacion?',
    //   'Salir!',
    //   this.loggingOut(),
    // );
    swal.fire({
			title: 'Consulta de Aplicación',
			text: 'Está seguro que desea salir de la Aplicacion?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Salir!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
        this.loggingOut();
      }
			}).catch((error) => {
				swal.fire({
					type: 'error',
					title: 'Cerrar Sesión',
					text: 'Error Inesperado',
					showConfirmButton: false,
					timer: 2000,
				});
			});

  }
  private loggingOut() {
    this.$store.commit('logout');
    this.$router.push({ path: '/' });
  }
  private created() {
    this.dialog.success('Bienvenido', 'Proyecto Generado');
    Axios.get('static/params.json').then((Response: any) => {
      this.objcryptServer = new crypto();
      this.encryptServer = this.objcryptServer.EncryptAES(Response.data.urlService);
      this.decryptServer = 'Decrypted: ' + this.objcryptServer.DecryptAES(this.encryptServer);
      this.$store.commit('setServer', Response.data.urlService);
    });
  }
}
