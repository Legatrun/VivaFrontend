import Vue from 'vue';
import Inicio from './components/Inicio/Inicio';
import Menu from './components/Menu/Menu';
import { Component } from 'vue-property-decorator';
import Axios from 'axios';
import * as popup from '@/popup';
import crypto from '@/encrypt';

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
    this.dialog.warning(
      'Aplicacion',
      'Está seguro que desea salir de la Aplicacion?',
      'Salir!',
      this.loggingOut(),
    );
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
