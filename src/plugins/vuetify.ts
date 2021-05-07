import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/es5/util/colors';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#506468',
        secondary: '#848484',
        accent: '#FF8000',
        error: '#B20000',
        info: '#2196F3',
        success: '#397D02',
        warning: '#FFFF99',
        menubar: '#508146',
        menubarbuttons: '#9dbeb9',
        textcolor: '#1A237E',
        headerpage: '#0196BF',
        headerform: '#959FA9',
        bodyform: '#cfe0de',
        footer:'#508146',
        // Buttons
        buttonadd: '#81b214',
        buttonedit: '#ffcc29',
        buttondelete: '#f58634',
        // Switch
        switch: '#de8971',
      },
      dark: {
        primary: colors.green.lighten3,
        secondary: '#ff0000',
      },
    },
  },
  icons: {
    iconfont: 'md', // default - only for display purposes
  },
});
