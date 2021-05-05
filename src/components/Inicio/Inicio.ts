import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// tslint:disable-next-line: class-name
interface interface_carusel {
  src: string;
}

@Component

export default class InicioComponent extends Vue {
  public bottomNav = 'recent';
  public lstitems: interface_carusel[] = [
    { src: '/images/slide01.jpg' },
    { src: '/images/slide02.jpg' },
    { src: '/images/slide03.jpg' },
    ];
}
