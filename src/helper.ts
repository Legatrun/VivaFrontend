import $store from '@/store';

export default class Filter {
    private descFilter: any;
    public showDataDescription(idItem: any, lstData: any, nombreIdItemArray: string, nombreCampoRetorno: string) {
        this.descFilter = lstData.filter(
        (data: any) => data[nombreIdItemArray] === idItem,
        );
        return this.descFilter[0][nombreCampoRetorno];
    }

}
