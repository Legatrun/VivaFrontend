import axios from 'axios';
import $store from './store';

// tslint:disable-next-line: max-classes-per-file class-name
export class Endpoints {
	public ws_applicationdefinition_Consultar: string = $store.state.server + 'Api/applicationdefinition/Consultar';
	public ws_applicationdefinition_Buscar: string = $store.state.server + 'Api/applicationdefinition/Buscar';
	public ws_applicationdefinition_Insertar: string = $store.state.server + 'Api/applicationdefinition/Insertar';
	public ws_applicationdefinition_Actualizar: string = $store.state.server + 'Api/applicationdefinition/Actualizar';
	public ws_applicationdefinition_Eliminar: string = $store.state.server + 'Api/applicationdefinition/Eliminar';
	public ws_batches_Consultar: string = $store.state.server + 'Api/batches/Consultar';
	public ws_batches_Buscar: string = $store.state.server + 'Api/batches/Buscar';
	public ws_batches_Insertar: string = $store.state.server + 'Api/batches/Insertar';
	public ws_batches_Actualizar: string = $store.state.server + 'Api/batches/Actualizar';
	public ws_batches_Eliminar: string = $store.state.server + 'Api/batches/Eliminar';
	public ws_calendar_Consultar: string = $store.state.server + 'Api/calendar/Consultar';
	public ws_calendar_Buscar: string = $store.state.server + 'Api/calendar/Buscar';
	public ws_calendar_Insertar: string = $store.state.server + 'Api/calendar/Insertar';
	public ws_calendar_Actualizar: string = $store.state.server + 'Api/calendar/Actualizar';
	public ws_calendar_Eliminar: string = $store.state.server + 'Api/calendar/Eliminar';
	public ws_calendardayexception_Consultar: string = $store.state.server + 'Api/calendardayexception/Consultar';
	public ws_calendardayexception_Buscar: string = $store.state.server + 'Api/calendardayexception/Buscar';
	public ws_calendardayexception_Insertar: string = $store.state.server + 'Api/calendardayexception/Insertar';
	public ws_calendardayexception_Actualizar: string = $store.state.server + 'Api/calendardayexception/Actualizar';
	public ws_calendardayexception_Eliminar: string = $store.state.server + 'Api/calendardayexception/Eliminar';
	public ws_calendarhourrange_Consultar: string = $store.state.server + 'Api/calendarhourrange/Consultar';
	public ws_calendarhourrange_Buscar: string = $store.state.server + 'Api/calendarhourrange/Buscar';
	public ws_calendarhourrange_Insertar: string = $store.state.server + 'Api/calendarhourrange/Insertar';
	public ws_calendarhourrange_Actualizar: string = $store.state.server + 'Api/calendarhourrange/Actualizar';
	public ws_calendarhourrange_Eliminar: string = $store.state.server + 'Api/calendarhourrange/Eliminar';
	public ws_calendarversion_Consultar: string = $store.state.server + 'Api/calendarversion/Consultar';
	public ws_calendarversion_Buscar: string = $store.state.server + 'Api/calendarversion/Buscar';
	public ws_calendarversion_Insertar: string = $store.state.server + 'Api/calendarversion/Insertar';
	public ws_calendarversion_Actualizar: string = $store.state.server + 'Api/calendarversion/Actualizar';
	public ws_calendarversion_Eliminar: string = $store.state.server + 'Api/calendarversion/Eliminar';
	public ws_dayofweek_Consultar: string = $store.state.server + 'Api/dayofweek/Consultar';
	public ws_dayofweek_Buscar: string = $store.state.server + 'Api/dayofweek/Buscar';
	public ws_dayofweek_Insertar: string = $store.state.server + 'Api/dayofweek/Insertar';
	public ws_dayofweek_Actualizar: string = $store.state.server + 'Api/dayofweek/Actualizar';
	public ws_dayofweek_Eliminar: string = $store.state.server + 'Api/dayofweek/Eliminar';
	public ws_devicealarms_Consultar: string = $store.state.server + 'Api/devicealarms/Consultar';
	public ws_devicealarms_Buscar: string = $store.state.server + 'Api/devicealarms/Buscar';
	public ws_devicealarms_Insertar: string = $store.state.server + 'Api/devicealarms/Insertar';
	public ws_devicealarms_Actualizar: string = $store.state.server + 'Api/devicealarms/Actualizar';
	public ws_devicealarms_Eliminar: string = $store.state.server + 'Api/devicealarms/Eliminar';
	public ws_deviceinstalation_Consultar: string = $store.state.server + 'Api/deviceinstalation/Consultar';
	public ws_deviceinstalation_Buscar: string = $store.state.server + 'Api/deviceinstalation/Buscar';
	public ws_deviceinstalation_Insertar: string = $store.state.server + 'Api/deviceinstalation/Insertar';
	public ws_deviceinstalation_Actualizar: string = $store.state.server + 'Api/deviceinstalation/Actualizar';
	public ws_deviceinstalation_Eliminar: string = $store.state.server + 'Api/deviceinstalation/Eliminar';
	public ws_deviceinstalationprovider_Consultar: string = $store.state.server + 'Api/deviceinstalationprovider/Consultar';
	public ws_deviceinstalationprovider_Buscar: string = $store.state.server + 'Api/deviceinstalationprovider/Buscar';
	public ws_deviceinstalationprovider_Insertar: string = $store.state.server + 'Api/deviceinstalationprovider/Insertar';
	public ws_deviceinstalationprovider_Actualizar: string = $store.state.server + 'Api/deviceinstalationprovider/Actualizar';
	public ws_deviceinstalationprovider_Eliminar: string = $store.state.server + 'Api/deviceinstalationprovider/Eliminar';
	public ws_devicestatuscolletionsresume_Consultar: string = $store.state.server + 'Api/devicestatuscolletionsresume/Consultar';
	public ws_devicestatuscolletionsresume_Buscar: string = $store.state.server + 'Api/devicestatuscolletionsresume/Buscar';
	public ws_devicestatuscolletionsresume_Insertar: string = $store.state.server + 'Api/devicestatuscolletionsresume/Insertar';
	public ws_devicestatuscolletionsresume_Actualizar: string = $store.state.server + 'Api/devicestatuscolletionsresume/Actualizar';
	public ws_devicestatuscolletionsresume_Eliminar: string = $store.state.server + 'Api/devicestatuscolletionsresume/Eliminar';
	public ws_devicetypes_Consultar: string = $store.state.server + 'Api/devicetypes/Consultar';
	public ws_devicetypes_Buscar: string = $store.state.server + 'Api/devicetypes/Buscar';
	public ws_devicetypes_Insertar: string = $store.state.server + 'Api/devicetypes/Insertar';
	public ws_devicetypes_Actualizar: string = $store.state.server + 'Api/devicetypes/Actualizar';
	public ws_devicetypes_Eliminar: string = $store.state.server + 'Api/devicetypes/Eliminar';
	public ws_events_Consultar: string = $store.state.server + 'Api/events/Consultar';
	public ws_events_Buscar: string = $store.state.server + 'Api/events/Buscar';
	public ws_events_Insertar: string = $store.state.server + 'Api/events/Insertar';
	public ws_events_Actualizar: string = $store.state.server + 'Api/events/Actualizar';
	public ws_events_Eliminar: string = $store.state.server + 'Api/events/Eliminar';
	public ws_jobs_Consultar: string = $store.state.server + 'Api/jobs/Consultar';
	public ws_jobs_Buscar: string = $store.state.server + 'Api/jobs/Buscar';
	public ws_jobs_Insertar: string = $store.state.server + 'Api/jobs/Insertar';
	public ws_jobs_Actualizar: string = $store.state.server + 'Api/jobs/Actualizar';
	public ws_jobs_Eliminar: string = $store.state.server + 'Api/jobs/Eliminar';
	public ws_locations_Consultar: string = $store.state.server + 'Api/locations/Consultar';
	public ws_locations_Buscar: string = $store.state.server + 'Api/locations/Buscar';
	public ws_locations_Insertar: string = $store.state.server + 'Api/locations/Insertar';
	public ws_locations_Actualizar: string = $store.state.server + 'Api/locations/Actualizar';
	public ws_locations_Eliminar: string = $store.state.server + 'Api/locations/Eliminar';
	public ws_locationstype_Consultar: string = $store.state.server + 'Api/locationstype/Consultar';
	public ws_locationstype_Buscar: string = $store.state.server + 'Api/locationstype/Buscar';
	public ws_locationstype_Insertar: string = $store.state.server + 'Api/locationstype/Insertar';
	public ws_locationstype_Actualizar: string = $store.state.server + 'Api/locationstype/Actualizar';
	public ws_locationstype_Eliminar: string = $store.state.server + 'Api/locationstype/Eliminar';
	public ws_mailingaddress_Consultar: string = $store.state.server + 'Api/mailingaddress/Consultar';
	public ws_mailingaddress_Buscar: string = $store.state.server + 'Api/mailingaddress/Buscar';
	public ws_mailingaddress_Insertar: string = $store.state.server + 'Api/mailingaddress/Insertar';
	public ws_mailingaddress_Actualizar: string = $store.state.server + 'Api/mailingaddress/Actualizar';
	public ws_mailingaddress_Eliminar: string = $store.state.server + 'Api/mailingaddress/Eliminar';
	public ws_provider_Consultar: string = $store.state.server + 'Api/provider/Consultar';
	public ws_provider_Buscar: string = $store.state.server + 'Api/provider/Buscar';
	public ws_provider_Insertar: string = $store.state.server + 'Api/provider/Insertar';
	public ws_provider_Actualizar: string = $store.state.server + 'Api/provider/Actualizar';
	public ws_provider_Eliminar: string = $store.state.server + 'Api/provider/Eliminar';
	public ws_tb_grupos_Consultar: string = $store.state.server + 'Api/tb_grupos/Consultar';
	public ws_tb_grupos_Buscar: string = $store.state.server + 'Api/tb_grupos/Buscar';
	public ws_tb_grupos_Insertar: string = $store.state.server + 'Api/tb_grupos/Insertar';
	public ws_tb_grupos_Actualizar: string = $store.state.server + 'Api/tb_grupos/Actualizar';
	public ws_tb_grupos_Eliminar: string = $store.state.server + 'Api/tb_grupos/Eliminar';
	public ws_tb_histpwd_Consultar: string = $store.state.server + 'Api/tb_histpwd/Consultar';
	public ws_tb_histpwd_Buscar: string = $store.state.server + 'Api/tb_histpwd/Buscar';
	public ws_tb_histpwd_Insertar: string = $store.state.server + 'Api/tb_histpwd/Insertar';
	public ws_tb_histpwd_Actualizar: string = $store.state.server + 'Api/tb_histpwd/Actualizar';
	public ws_tb_histpwd_Eliminar: string = $store.state.server + 'Api/tb_histpwd/Eliminar';
	public ws_tb_params_Consultar: string = $store.state.server + 'Api/tb_params/Consultar';
	public ws_tb_params_Buscar: string = $store.state.server + 'Api/tb_params/Buscar';
	public ws_tb_params_Insertar: string = $store.state.server + 'Api/tb_params/Insertar';
	public ws_tb_params_Actualizar: string = $store.state.server + 'Api/tb_params/Actualizar';
	public ws_tb_params_Eliminar: string = $store.state.server + 'Api/tb_params/Eliminar';
	public ws_tb_perfiles_Consultar: string = $store.state.server + 'Api/tb_perfiles/Consultar';
	public ws_tb_perfiles_Buscar: string = $store.state.server + 'Api/tb_perfiles/Buscar';
	public ws_tb_perfiles_Insertar: string = $store.state.server + 'Api/tb_perfiles/Insertar';
	public ws_tb_perfiles_Actualizar: string = $store.state.server + 'Api/tb_perfiles/Actualizar';
	public ws_tb_perfiles_Eliminar: string = $store.state.server + 'Api/tb_perfiles/Eliminar';
	public ws_tb_sesiones_Consultar: string = $store.state.server + 'Api/tb_sesiones/Consultar';
	public ws_tb_sesiones_Buscar: string = $store.state.server + 'Api/tb_sesiones/Buscar';
	public ws_tb_sesiones_Insertar: string = $store.state.server + 'Api/tb_sesiones/Insertar';
	public ws_tb_sesiones_Actualizar: string = $store.state.server + 'Api/tb_sesiones/Actualizar';
	public ws_tb_sesiones_Eliminar: string = $store.state.server + 'Api/tb_sesiones/Eliminar';
	public ws_tb_usuarios_Consultar: string = $store.state.server + 'Api/tb_usuarios/Consultar';
	public ws_tb_usuarios_Buscar: string = $store.state.server + 'Api/tb_usuarios/Buscar';
	public ws_tb_usuarios_Insertar: string = $store.state.server + 'Api/tb_usuarios/Insertar';
	public ws_tb_usuarios_Actualizar: string = $store.state.server + 'Api/tb_usuarios/Actualizar';
	public ws_tb_usuarios_Eliminar: string = $store.state.server + 'Api/tb_usuarios/Eliminar';
	public ws_transactiondefinition_Consultar: string = $store.state.server + 'Api/transactiondefinition/Consultar';
	public ws_transactiondefinition_Buscar: string = $store.state.server + 'Api/transactiondefinition/Buscar';
	public ws_transactiondefinition_Insertar: string = $store.state.server + 'Api/transactiondefinition/Insertar';
	public ws_transactiondefinition_Actualizar: string = $store.state.server + 'Api/transactiondefinition/Actualizar';
	public ws_transactiondefinition_Eliminar: string = $store.state.server + 'Api/transactiondefinition/Eliminar';
	public ws_transactions_Consultar: string = $store.state.server + 'Api/transactions/Consultar';
	public ws_transactions_Buscar: string = $store.state.server + 'Api/transactions/Buscar';
	public ws_transactions_Insertar: string = $store.state.server + 'Api/transactions/Insertar';
	public ws_transactions_Actualizar: string = $store.state.server + 'Api/transactions/Actualizar';
	public ws_transactions_Eliminar: string = $store.state.server + 'Api/transactions/Eliminar';
	public ws_devicestatuscolletions_Consultar: string = $store.state.server + 'Api/devicestatuscolletions/Consultar';
	public ws_devicestatuscolletions_Buscar: string = $store.state.server + 'Api/devicestatuscolletions/Buscar';
	public ws_devicestatuscolletions_Insertar: string = $store.state.server + 'Api/devicestatuscolletions/Insertar';
	public ws_devicestatuscolletions_Actualizar: string = $store.state.server + 'Api/devicestatuscolletions/Actualizar';
	public ws_devicestatuscolletions_Eliminar: string = $store.state.server + 'Api/devicestatuscolletions/Eliminar';
	public ws_devices_Consultar: string = $store.state.server + 'Api/devices/Consultar';
	public ws_devices_Buscar: string = $store.state.server + 'Api/devices/Buscar';
	public ws_devices_Insertar: string = $store.state.server + 'Api/devices/Insertar';
	public ws_devices_Actualizar: string = $store.state.server + 'Api/devices/Actualizar';
	public ws_devices_Eliminar: string = $store.state.server + 'Api/devices/Eliminar';
	public ws_deviceresumeprocess_Consultar: string = $store.state.server + 'Api/deviceresumeprocess/Consultar';
	public ws_deviceresumeprocess_Buscar: string = $store.state.server + 'Api/deviceresumeprocess/Buscar';
	public ws_deviceresumeprocess_Insertar: string = $store.state.server + 'Api/deviceresumeprocess/Insertar';
	public ws_deviceresumeprocess_Actualizar: string = $store.state.server + 'Api/deviceresumeprocess/Actualizar';
	public ws_deviceresumeprocess_Eliminar: string = $store.state.server + 'Api/deviceresumeprocess/Eliminar';
	public ws_deviceinstalationtransactionpr_Consultar: string = $store.state.server + 'Api/deviceinstalationtransactionpr/Consultar';
	public ws_deviceinstalationtransactionpr_Buscar: string = $store.state.server + 'Api/deviceinstalationtransactionpr/Buscar';
	public ws_deviceinstalationtransactionpr_Insertar: string = $store.state.server + 'Api/deviceinstalationtransactionpr/Insertar';
	public ws_deviceinstalationtransactionpr_Actualizar: string = $store.state.server + 'Api/deviceinstalationtransactionpr/Actualizar';
	public ws_deviceinstalationtransactionpr_Eliminar: string = $store.state.server + 'Api/deviceinstalationtransactionpr/Eliminar';
	public ws_reports_Consultar: string = $store.state.server + 'Api/reports/Consultar';
	public ws_reports_Buscar: string = $store.state.server + 'Api/reports/Buscar';
	public ws_reports_Insertar: string = $store.state.server + 'Api/reports/Insertar';
	public ws_reports_Actualizar: string = $store.state.server + 'Api/reports/Actualizar';
	public ws_reports_Eliminar: string = $store.state.server + 'Api/reports/Eliminar';
}


// tslint:disable-next-line: max-classes-per-file class-name
export class clase_autenticacion {
    public usuario!: string;
    public password!: string;
    public dominio?: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_applicationdefinition {
	public identification!: string;
	public description!: string;
	public type!: string;
	public enabled!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
	public configuration!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_batches {
	public id!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public deviceidentification!: string;
	public locationidentification!: string;
	public payloadrequest!: string;
	public provideridentification!: string;
	public devicestatus!: string;
	public number_!: number;
	public status!: number;
	public opentimestamp!: any;
	public closetimestamp!: any;
	public syncstatus!: number;
	public synctimestamp!: any;
	public operativeday!: string;
	public totaltx!: string;
	public totalamount!: string;
	public totalaccepted!: string;
	public totalreturned!: string;
	public totalavailable!: string;
	public totalgivenamount!: string;
	public totaldebtamount!: string;
	public totalrefilloperations!: string;
	public totalrefillamount!: string;
	public totalcollectoperations!: string;
	public totalcollectamount!: string;
	public totalcardsdelivered!: string;
	public totalcardrefilloperations!: string;
	public totalcardrefillamount!: string;
	public totalcardcollectoperations!: string;
	public totalcardcollectamount!: string;
	public carddispenserstatus!: string;
	public totallocks!: string;
	public opentime!: string;
	public closetime!: string;
	public scannerstatus!: string;
	public motionsensorstatus!: string;
	public printerstatus!: string;
	public cashacceptorstatus!: string;
	public cashchangerstatus!: string;
	public coinacceptorstatus!: string;
	public coinchangerstatus!: string;
	public cardreaderstatus!: string;
	public blockreason!: string;
	public blockstatus!: string;
	public aceptor_000005!: string;
	public aceptor_000010!: string;
	public aceptor_000025!: string;
	public aceptor_000050!: string;
	public aceptor_000100!: string;
	public aceptor_000200!: string;
	public aceptor_000500!: string;
	public aceptor_001000!: string;
	public aceptor_002000!: string;
	public aceptor_005000!: string;
	public aceptor_010000!: string;
	public changer_000005!: string;
	public changer_000010!: string;
	public changer_000025!: string;
	public changer_000050!: string;
	public changer_000100!: string;
	public changer_000200!: string;
	public changer_000500!: string;
	public changer_001000!: string;
	public changer_002000!: string;
	public changer_005000!: string;
	public changer_010000!: string;
	public return_000005!: string;
	public return_000010!: string;
	public return_000025!: string;
	public return_000050!: string;
	public return_000100!: string;
	public return_000200!: string;
	public return_000500!: string;
	public return_001000!: string;
	public return_002000!: string;
	public return_005000!: string;
	public return_010000!: string;
	public return_066666!: string;
	public aceptor_100000!: string;
	public aceptor_200000!: string;
	public aceptor_500000!: string;
	public aceptor_1000000!: string;
	public changer_100000!: string;
	public changer_200000!: string;
	public changer_500000!: string;
	public changer_1000000!: string;
	public return_100000!: string;
	public return_1000000!: string;
	public return_500000!: string;
	public return_200000!: string;
	public aceptordetail!: string;
	public changerdetail!: string;
	public returndetail!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_calendar {
	public id!: number;
	public identification!: string;
	public description!: string;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_calendardayexception {
	public id!: number;
	public day!: Date;
	public description!: string;
	public calendarversionid!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_calendarhourrange {
	public id!: number;
	public fromhour!: number;
	public fromminute!: number;
	public untilhour!: number;
	public untilminute!: number;
	public calendardayexceptionid!: number;
	public dayofweekid!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_calendarversion {
	public id!: number;
	public description!: string;
	public validfrom!: any;
	public validuntil!: any;
	public calendarid!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_dayofweek {
	public id!: number;
	public description!: string;
	public calendarversionid!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
	public orden!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_devicealarms {
	public id!: number;
	public identification!: string;
	public alarmgroup!: string;
	public reportenabled!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_deviceinstalation {
	public deviceidentification!: string;
	public enabled!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
	public configuration!: string;
	public locationidentification!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_deviceinstalationprovider {
	public deviceidentification!: string;
	public enabled!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
	public locationidentification!: string;
	public provideridentification!: string;
	public providerdeviceidentification!: string;
	public providerlocationidentification!: string;
	public providersequencenumber!: number;
	public lasttransactiontimestamp!: any;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_deviceinstalationtransactionpr {
	public deviceidentification!: string;
	public enabled!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
	public locationidentification!: string;
	public provideridentification!: string;
	public providerdeviceidentification!: string;
	public providerlocationidentification!: string;
	public providersequencenumber!: number;
	public lasttransactiontimestamp!: any;
	public transactionidentification!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_deviceresumeprocess {
	public id!: number;
	public datefrom!: any;
	public dateuntil!: any;
	public dateprocess!: any;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_devices {
	public identification!: string;
	public description!: string;
	public devicetypeidentification!: string;
	public enabled!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
	public configuration!: string;
	public identificationprovider!: string;
	public locationidentification!: string;
	public coinacceptordenoms!: string;
	public cashacceptordenoms!: string;
	public maxamountodispense!: string;
	public maxbillstodispense!: string;
	public maxcoinstodispense!: string;
	public video_intro!: string;
	public video_insert_cash!: string;
	public video_take_cash!: string;
	public video_take_cash_chash_receipt!: string;
	public video_read_barcode!: string;
	public payment_success!: string;
	public payment_cancel!: string;
	public final_success!: string;
	public cashacceptorfullalarm!: string;
	public cashacceptorfulllimit!: string;
	public coinacceptorfullalarm!: string;
	public coinacceptorfulllimit!: string;
	public cashchangeremptyalarm!: string;
	public cashchangeremptylimit!: string;
	public cashchangersecuritystock!: string;
	public coinchangeremptyalarm!: string;
	public coinchangeremptylimit!: string;
	public coinchangersecuritystock!: string;
	public carddispenseremptylimit!: string;
	public carddispenseremptyalarm!: string;
	public emptydenomblockcondition1!: string;
	public emptydenomblockcondition2!: string;
	public emptydenomblockcondition3!: string;
	public emptydenomblockcondition4!: string;
	public totalchangeemptyalarm!: string;
	public totalchangeemptylimit!: string;
	public scp_statusinterval!: string;
	public sct_step!: string;
	public sct_changevalidatoramount!: string;
	public sct_finishscreentimeout!: string;
	public cashchangerfill!: string;
	public coinchangerfill!: string;
	public coinchangerdenoms!: string;
	public cashchangerdenoms!: string;
	public lastreporttimestamp!: any;
	public laststatusreported!: string;
	public serviceuser!: string;
	public operatorcode!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_devicestatuscolletions {
	public id!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public deviceidentification!: string;
	public locationidentification!: string;
	public servicename!: string;
	public operationname!: string;
	public sequencenumber!: number;
	public transporttimestamp!: any;
	public provideridentification!: string;
	public providertransactionid!: string;
	public devicetransactionid!: string;
	public status!: string;
	public batchnumber!: number;
	public transactionid!: number;
	public alarm!: string;
	public devicestatus!: number;
	public operatingmode!: string;
	public alarmid!: string;
	public aceptordetail!: string;
	public changerdetail!: string;
	public returndetail!: string;
	public operativeday!: string;
	public totaltx!: string;
	public totalamount!: string;
	public totalaccepted!: string;
	public totalreturned!: string;
	public totalavailable!: string;
	public totalgivenamount!: string;
	public totaldebtamount!: string;
	public totalrefilloperations!: string;
	public totalrefillamount!: string;
	public totalcollectoperations!: string;
	public totalcollectamount!: string;
	public totallocks!: string;
	public opentime!: string;
	public closetime!: string;
	public vdmstatus!: string;
	public powerstatus!: string;
	public scannerstatus!: string;
	public motionsensorstatus!: string;
	public printerstatus!: string;
	public cashacceptorstatus!: string;
	public cashchangerstatus!: string;
	public coinacceptorstatus!: string;
	public coinchangerstatus!: string;
	public devicestatusdetail!: string;
	public totalcardsdelivered!: string;
	public totalcardrefilloperations!: string;
	public totalcardrefillamount!: string;
	public totalcardcollectoperations!: string;
	public totalcardcollectamount!: string;
	public carddispenserstatus!: string;
	public cardreaderstatus!: string;
	public carddispensercount!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_devicestatuscolletionsresume {
	public id!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public deviceidentification!: string;
	public locationidentification!: string;
	public servicename!: string;
	public operationname!: string;
	public sequencenumber!: number;
	public transporttimestamp!: any;
	public provideridentification!: string;
	public providertransactionid!: string;
	public devicetransactionid!: string;
	public batchnumber!: number;
	public transactionid!: number;
	public alarm!: string;
	public devicestatus!: number;
	public operatingmode!: string;
	public alarmid!: string;
	public aceptordetail!: string;
	public changerdetail!: string;
	public returndetail!: string;
	public operativeday!: string;
	public totaltx!: string;
	public totalamount!: string;
	public totalaccepted!: string;
	public totalreturned!: string;
	public totalavailable!: string;
	public totalgivenamount!: string;
	public totaldebtamount!: string;
	public totalrefilloperations!: string;
	public totalrefillamount!: string;
	public totalcollectoperations!: string;
	public totalcollectamount!: string;
	public totallocks!: string;
	public opentime!: string;
	public closetime!: string;
	public vdmstatus!: string;
	public powerstatus!: string;
	public scannerstatus!: string;
	public motionsensorstatus!: string;
	public printerstatus!: string;
	public cashacceptorstatus!: string;
	public cashchangerstatus!: string;
	public coinacceptorstatus!: string;
	public coinchangerstatus!: string;
	public devicestatusdetail!: string;
	public processid!: number;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_devicetypes {
	public identification!: string;
	public description!: string;
	public enabled!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
	public configuration!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_events {
	public type!: number;
	public deviceidentification!: string;
	public locationidentification!: string;
	public createtimestamp!: any;
	public reason!: string;
	public operationname!: string;
	public servicename!: string;
	public sequencenumber!: number;
	public notifytimestamp!: any;
	public text!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_jobs {
	public jobname!: string;
	public jobstarttimestamp!: any;
	public jobendtimestamp!: any;
	public jobstatus!: number;
	public jobcommand!: string;
	public jobreturncode!: number;
	public joboutputfile!: string;
	public userid!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_locations {
	public identification!: string;
	public description!: string;
	public type!: string;
	public enabled!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
	public address!: string;
	public zipcode!: string;
	public city!: string;
	public city_code!: string;
	public state!: string;
	public state_code!: string;
	public country!: string;
	public identificationprovider!: string;
	public email!: string;
	public areacode!: string;
	public geocoordinates!: string;
	public replanishmentemail!: string;
	public calendarid!: number;
	public locationtypeid!: number;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_locationstype {
	public id!: number;
	public identification!: string;
	public description!: string;
	public calendarid!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_mailingaddress {
	public id!: number;
	public email!: string;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_provider {
	public identification!: string;
	public description!: string;
	public type!: string;
	public enabled!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tb_grupos {
	public id!: number;
	public descripcion!: string;
	public create_timestamp!: any;
	public fec_modificacion!: any;
	public usua_modificacion!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tb_histpwd {
	public nombre_usuario!: string;
	public creacion!: any;
	public hash!: string;
	public fec_modificacion!: any;
	public usua_modificacion!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tb_params {
	public clave!: string;
	public valor!: string;
	public create_timestamp!: any;
	public fec_modificacion!: any;
	public usua_modificacion!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tb_perfiles {
	public id!: number;
	public descripcion!: string;
	public create_timestamp!: any;
	public fec_modificacion!: any;
	public usua_modificacion!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tb_sesiones {
	public id!: string;
	public nombre_usuario!: string;
	public datos!: string;
	public ultimo_acceso!: any;
	public creacion!: any;
	public fec_modificacion!: any;
	public usua_modificacion!: string;
	public estado!: number;
	public ip!: string;
	public cierre!: any;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tb_usuarios {
	public nombre_usuario!: string;
	public nombre!: string;
	public apellido!: string;
	public email!: string;
	public tel!: string;
	public telmovil!: string;
	public hash!: string;
	public idgrupo!: number;
	public idperfil!: number;
	public aplicacion!: string;
	public enabled!: number;
	public config!: string;
	public notas!: string;
	public cambiar_pwd!: number;
	public estado!: number;
	public create_timestamp!: any;
	public usuario_creacion!: string;
	public usuario_modif!: string;
	public ultimo_acceso!: any;
	public fec_modificacion!: any;
	public usua_modificacion!: string;
	public intentos!: number;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_transactiondefinition {
	public identification!: string;
	public description!: string;
	public type!: string;
	public enabled!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public createuser!: string;
	public updateuser!: string;
	public configuration!: string;
	public servicename!: string;
	public operationname!: string;
	public hlabel!: string;
	public vlabel!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_transactions {
	public id!: number;
	public createtimestamp!: any;
	public updatetimestamp!: any;
	public deviceidentification!: string;
	public locationidentification!: string;
	public servicename!: string;
	public operationname!: string;
	public sequencenumber!: number;
	public transporttimestamp!: any;
	public payloadrequest!: string;
	public payloadanswer!: string;
	public resultcode!: number;
	public resultmessage!: string;
	public provideridentification!: string;
	public providertransactionid!: string;
	public devicetransactionid!: string;
	public providerresultcode!: string;
	public providerresultmessage!: string;
	public batchnumber!: number;
	public syncstatus!: number;
	public synctimestamp!: any;
	public deviceidentificationprovider!: string;
	public locationidentificationprovider!: string;
	public customernumber!: string;
	public amount!: number;
	public amountentered!: number;
	public amountreturned!: number;
	public amountticketundelivered!: number;
	public operationstatus!: number;
	public amountentereddetail!: string;
	public amountreturneddetail!: string;
	public amountticketundelivereddetail!: string;
	public transactionidentification!: string;
	public customercode!: string;
	public canceled!: number;
	public canceledtimestamp!: any;
	public providersequencenumber!: number;
	public cardsdispensed!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_reports {
	public id!: number;
	public reportname!: string;
	public description!: string;
	public url!: string;
}

// MODULO SEGURIDAD

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_instituciones {
	public idinstitucion!: number;
	public descripcion!: string;
	public estado!: number;
  }

  // tslint:disable-next-line: max-classes-per-file class-name
export class clase_usuarios {
	public idusuario!: number;
	public nombre!: string;
	public email!: string;
	public fechacreacion!: any;
	public usrdominio!: boolean;
	public idinstitucion!: number;
	public idautenticacion!: number;
	public id_agencia!: number;
	public estado!: boolean;
  }

  
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_grpusuario {
	public idgrpusuario!: number;
	public idgrupo!: number;
	public idusuario!: number;
	public estado!: number;
	public id_agencia!: number;
  
  }
  
  // tslint:disable-next-line: max-classes-per-file class-name
  export class clase_institucionesroles {
	public idinstitucionrol!: number;
	public idinstitucion!: number;
	public idrol!: number;
	public estado!: number;
  }
  
  // tslint:disable-next-line: max-classes-per-file class-name
  export class clase_grpusrrolesinstituciones {
	public idgrpusuariorolinstitucion!: number;
	public idgrpusuario!: number;
	public idinstitucionrol!: number;
	public estado!: boolean;
	public id_agencia!: number;
  }

  
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_operaciones {
	public idoperacion!: number;
	public descripcion!: string;
	public id_agencia!: number;
	public estado!: number;
  }
  
  // tslint:disable-next-line: max-classes-per-file class-name
  export class clase_grupo {
	public idgrupo!: number;
	public descripcion!: string;
	public estado!: number;
	public id_agencia!: number;
  }
  
  // tslint:disable-next-line: max-classes-per-file class-name
  export class clase_roles {
	public idrol!: number;
	public descripcion!: string;
	public estado!: number;
	public id_agencia!: number;
  }
  
  // tslint:disable-next-line: max-classes-per-file class-name
  export class clase_aplicaciones {
	public idaplicacion!: number;
	public nombre!: string;
	public descripcion!: string;
	public estado!: number;
	public id_agencia!: number;
  }
  
  // tslint:disable-next-line: max-classes-per-file class-name
  export class clase_modulos {
	public idmodulo!: number;
	public descripcion!: string;
	public operaciones!: clase_operaciones;
	public id_agencia!: number;
	public estado!: boolean;
  }
  
  // tslint:disable-next-line: max-classes-per-file class-name
  export class clase_rolesaplicaciones {
	public idrolesaplicaciones!: number;
	public idrol!: number;
	public idaplicacion!: number;
	public id_agencia!: number;
	public estado!: boolean;
  }
  
  // tslint:disable-next-line: max-classes-per-file class-name
  export class clase_aplicacionesoperaciones {
	public idaplicacionesoperaciones!: number;
	public idaplicaciones!: number;
	public idoperaciones!: number;
	public estado!: number;
  }
  
  // tslint:disable-next-line: max-classes-per-file class-name
  export class clase_aplicacionesopmodulos {
	public idaplicacionesopmodulos!: number;
	public idrolesaplicaciones!: number;
	public idoperacion!: number;
	public idmodulo!: number;
	public activo!: boolean;
	public estado!: boolean;
	public id_agencia!: number;
  
  }

// tslint:disable-next-line: max-classes-per-file class-name
export class Operaciones {
	public Login(url: string, objeto: any) {
		return axios.post(url, objeto, {
			headers: { 'Content-Type': 'application/json' },
		  });
	  }
	public Logout(url: string, objeto: any) {
		return axios.post(url, objeto, {
			headers: { 'Content-Type': 'application/json' },
		  });
	  }
	public Consultar(url: string) {
	  return axios.post(url);
	}
	public Buscar(url: string, objeto: any) {
		return axios.post(url, objeto, {
			headers: { 'Content-Type': 'application/json' },
		  });
	  }
	  public Insertar(url: string, objeto: any) {
		  return axios.post(url, objeto, {
			  headers: { 'Content-Type': 'application/json' },
			});
		}
	public Actualizar(url: string, objeto: any) {
		return axios.put(url, objeto, {
		headers: { 'Content-Type': 'application/json' },
		});
	}
	public Eliminar(url: string, objeto: any) {
	  return axios.delete(url, {
		headers: { 'Content-Type': 'application/json' },
		data: objeto,
	  });
	}
  }
