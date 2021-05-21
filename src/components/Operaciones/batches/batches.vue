<template>
  <v-card>
    <v-toolbar color="primary" style="color:white">
      <v-toolbar-title class="font-large-color">Lotes</v-toolbar-title>
      <v-divider></v-divider>
      <v-text-field
        class="input-small"
        v-model="buscarbatches"
        append-icon="search"
        label="Buscar Registro"
        single-line
        solo
        hide-details
      ></v-text-field>
    </v-toolbar>

    <v-data-table
      style="padding: 5px"
      :headers="headers"
      :items="lstbatches"
      :items-per-page="30"
      :search="buscarbatches"
      :footer-props="{
        showFirstLastPage: true,
        'items-per-page-options': [10, 20, 30, 40, 50, -1],
        'items-per-page-text': 'Registros por Pagina:',
      }"
      dense
      class="elevation-1"
    >
      <template slot="item" slot-scope="props">
        <tr>
          <!--<td class="datatable-items-small">{{ helper.showDataDescription(props.item.id,lstbatches, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
          <!--<td class="datatable-items-small">{{ props.item.id }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.createtimestamp) }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.updatetimestamp) }}</td>
                     -->
          <td class="datatable-items-small">
            {{ props.item.locationidentification }}
          </td>
          <td class="datatable-items-small">
            {{ props.item.deviceidentification }}
          </td>

          <!--<td class="datatable-items-small">{{ props.item.payloadrequest }}</td>
					<td class="datatable-items-small">{{ props.item.provideridentification }}</td>
					<td class="datatable-items-small">{{ props.item.devicestatus }}</td>
					<td class="datatable-items-small">{{ props.item.number_ }}</td>
					<td class="datatable-items-small">{{ props.item.status }}</td>-->
          <td class="datatable-items-small">
            {{ FormatDate(props.item.opentimestamp) }}
          </td>
          <!-- <td class="datatable-items-small">{{ FormatDate(props.item.updatetimestamp) }}</td> -->
          <td class="datatable-items-small">
            {{ props.item.deviceidentification }}
          </td>
          <td class="datatable-items-small">
            {{ props.item.locationidentification }}
          </td>
          <!-- <td class="datatable-items-small">{{ props.item.payloadrequest }}</td> -->
          <td class="datatable-items-small">
            {{ props.item.provideridentification }}
          </td>
          <td class="datatable-items-small">{{ props.item.devicestatus }}</td>
          <td class="datatable-items-small">{{ props.item.number_ }}</td>
          <td class="datatable-items-small">{{ props.item.status }}</td>
          <!-- <td class="datatable-items-small">{{ FormatDate(props.item.opentimestamp) }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.closetimestamp) }}</td>
          <td class="datatable-items-small">{{ props.item.syncstatus }}</td>
					<td class="datatable-items-small">{{ FormatDate(props.item.synctimestamp) }}</td>
					<td class="datatable-items-small">{{ props.item.operativeday }}</td>
					<td class="datatable-items-small">{{ props.item.totaltx }}</td>
					<td class="datatable-items-small">{{ props.item.totalamount }}</td>
					<td class="datatable-items-small">{{ props.item.totalaccepted }}</td>
					<td class="datatable-items-small">{{ props.item.totalreturned }}</td>
					<td class="datatable-items-small">{{ props.item.totalavailable }}</td>
					<td class="datatable-items-small">{{ props.item.totalgivenamount }}</td>
					<td class="datatable-items-small">{{ props.item.totaldebtamount }}</td>
					<td class="datatable-items-small">{{ props.item.totalrefilloperations }}</td>
					<td class="datatable-items-small">{{ props.item.totalrefillamount }}</td>
					<td class="datatable-items-small">{{ props.item.totalcollectoperations }}</td>
					<td class="datatable-items-small">{{ props.item.totalcollectamount }}</td>
					<td class="datatable-items-small">{{ props.item.totalcardsdelivered }}</td>
					<td class="datatable-items-small">{{ props.item.totalcardrefilloperations }}</td>
					<td class="datatable-items-small">{{ props.item.totalcardrefillamount }}</td>
					<td class="datatable-items-small">{{ props.item.totalcardcollectoperations }}</td>
					<td class="datatable-items-small">{{ props.item.totalcardcollectamount }}</td>
					<td class="datatable-items-small">{{ props.item.carddispenserstatus }}</td>
					<td class="datatable-items-small">{{ props.item.totallocks }}</td>
					<td class="datatable-items-small">{{ props.item.opentime }}</td>
					<td class="datatable-items-small">{{ props.item.closetime }}</td>
					<td class="datatable-items-small">{{ props.item.scannerstatus }}</td>
					<td class="datatable-items-small">{{ props.item.motionsensorstatus }}</td>
					<td class="datatable-items-small">{{ props.item.printerstatus }}</td>
					<td class="datatable-items-small">{{ props.item.cashacceptorstatus }}</td>
					<td class="datatable-items-small">{{ props.item.cashchangerstatus }}</td>
					<td class="datatable-items-small">{{ props.item.coinacceptorstatus }}</td>
					<td class="datatable-items-small">{{ props.item.coinchangerstatus }}</td>
					<td class="datatable-items-small">{{ props.item.cardreaderstatus }}</td>
					<td class="datatable-items-small">{{ props.item.blockreason }}</td>
					<td class="datatable-items-small">{{ props.item.blockstatus }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_000005 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_000010 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_000025 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_000050 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_000100 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_000200 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_000500 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_001000 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_002000 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_005000 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_010000 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_000005 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_000010 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_000025 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_000050 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_000100 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_000200 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_000500 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_001000 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_002000 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_005000 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_010000 }}</td>
					<td class="datatable-items-small">{{ props.item.return_000005 }}</td>
					<td class="datatable-items-small">{{ props.item.return_000010 }}</td>
					<td class="datatable-items-small">{{ props.item.return_000025 }}</td>
					<td class="datatable-items-small">{{ props.item.return_000050 }}</td>
					<td class="datatable-items-small">{{ props.item.return_000100 }}</td>
					<td class="datatable-items-small">{{ props.item.return_000200 }}</td>
					<td class="datatable-items-small">{{ props.item.return_000500 }}</td>
					<td class="datatable-items-small">{{ props.item.return_001000 }}</td>
					<td class="datatable-items-small">{{ props.item.return_002000 }}</td>
					<td class="datatable-items-small">{{ props.item.return_005000 }}</td>
					<td class="datatable-items-small">{{ props.item.return_010000 }}</td>
					<td class="datatable-items-small">{{ props.item.return_066666 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_100000 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_200000 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_500000 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptor_1000000 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_100000 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_200000 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_500000 }}</td>
					<td class="datatable-items-small">{{ props.item.changer_1000000 }}</td>
					<td class="datatable-items-small">{{ props.item.return_100000 }}</td>
					<td class="datatable-items-small">{{ props.item.return_1000000 }}</td>
					<td class="datatable-items-small">{{ props.item.return_500000 }}</td>
					<td class="datatable-items-small">{{ props.item.return_200000 }}</td>
					<td class="datatable-items-small">{{ props.item.aceptordetail }}</td>
					<td class="datatable-items-small">{{ props.item.changerdetail }}</td>
					<td class="datatable-items-small">{{ props.item.returndetail }}</td>-->
          <td class="datatable-items-small">{{ props.item.returndetail }}</td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="btnedit"
                  v-on="on"
                  small
                  dark
                  @click="Actualizar(props.item)"
                  ><v-icon>mdi-comment-eye</v-icon>Revisar</v-btn
                >
              </template>
              <span>Ver datos del lote</span>
            </v-tooltip>
            <!-- <v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar batches </span>
						</v-tooltip> -->
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-card>
          <v-form>
            <v-container>
              <v-row>
                <v-flex sm4 style="padding:5px" class="input-small">
                  <v-autocomplete
                    label="Sucursal"
                    readonly
                    outlined
                    parsisten-hint
                    required
                  >
                  </v-autocomplete>
                </v-flex>
                <v-flex sm4 style="padding:5px" class="input-small">
                  <v-autocomplete
                    label="Terminal"
                    readonly
                    outlined
                    parsisten-hint
                    required
                  >
                  </v-autocomplete>
                </v-flex>
              </v-row>
              <v-row>
                <v-flex sm3 class="hidden-xs-only" style="padding: 5px">
                  <v-menu
                    ref="menu_createtimestamp"
                    v-model="menu_createtimestamp"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        class="date-small"
                        v-model="batches.createtimestamp"
                        label="Fecha Desde"
                        outlined
                        persistent-hint
                        prepend-icon="event"
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      v-model="batches.createtimestamp"
                      no-title
                      @input="menu_createtimestamp = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex sm3 class="hidden-xs-only" style="padding: 5px">
                  <v-menu
                    ref="menu_updatetimestamp"
                    v-model="menu_updatetimestamp"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        class="date-small"
                        v-model="batches.updatetimestamp"
                        label="Fecha Hasta"
                        outlined
                        persistent-hint
                        prepend-icon="event"
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      v-model="batches.updatetimestamp"
                      no-title
                      @input="menu_updatetimestamp = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-spacer></v-spacer>

                <v-card-actions>
                  <v-flex sm1.5 style="padding: 5px" text-xs-left>
                    <v-btn small color="#808B96" dark>
                      <v-icon>mdi-monitor-clean</v-icon>
                      Limpiar
                    </v-btn>
                    &nbsp;
                    <v-btn small color="cyan" dark>
                      <v-icon>mdi-selection-search</v-icon>
                      Buscar
                    </v-btn>
                  </v-flex>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="warning" icon="warning">
          Lo sentimos, no exiten datos a desplegar: (
        </v-alert>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="70%">
      <v-card>
        <v-toolbar style="padding:10px" dark class="primary">
          <v-toolbar-title class="font-medium-color">Lotes</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="error" fab dark small @click="Cancelar()">X</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-form ref="form" style="padding:10px">
          <v-card-text>
            <v-layout wrap>
              <template v-if="operacion == 'Insert'">
              </template>
              <template v-else>
              </template>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.deviceidentification"
                  hint="Solo lectura"
                  label="Terminal"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.deviceidentification = updateText(
                      batches.deviceidentification
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.locationidentification"
                  hint="Solo lectura"
                  label="Sucursal"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.locationidentification = updateText(
                      batches.locationidentification
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.status"
                  hint="Solo lectura"
                  placeholder="Estado"
                  readonly
                  persistent-hint
                  required
                  @input="batches.status = updateText(batches.status)"
                >
                </v-text-field>
              </v-flex>

              <!-- <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.payloadrequest"
                  hint="Ingrese PAYLOADREQUEST"
                  placeholder="PAYLOADREQUEST"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.payloadrequest = updateText(batches.payloadrequest)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.provideridentification"
                  hint="Ingrese PROVIDERIDENTIFICATION"
                  placeholder="PROVIDERIDENTIFICATION"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.provideridentification = updateText(
                      batches.provideridentification
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.devicestatus"
                  hint="Ingrese DEVICESTATUS"
                  placeholder="DEVICESTATUS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.devicestatus = updateText(batches.devicestatus)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.number_"
                  hint="Ingrese NUMBER_"
                  placeholder="NUMBER_"
                  readonly
                  persistent-hint
                  required
                  type="number"
                  @input="batches.number_ = updateText(batches.number_)"
                >
                </v-text-field>
              </v-flex>
              
              <v-flex sm4 class="hidden-xs-only" style="padding: 5px">
                <v-menu
                  ref="menu_opentimestamp"
                  v-model="menu_opentimestamp"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="date-small"
                      v-model="batches.opentimestamp"
                      hint="Ingrese opentimestamp"
                      placeholder="OPENTIMESTAMP"
                      persistent-hint
                      prepend-icon="event"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="batches.opentimestamp"
                    no-title
                    @input="menu_opentimestamp = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex sm4 class="hidden-xs-only" style="padding: 5px">
                <v-menu
                  ref="menu_closetimestamp"
                  v-model="menu_closetimestamp"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="date-small"
                      v-model="batches.closetimestamp"
                      hint="Ingrese closetimestamp"
                      placeholder="CLOSETIMESTAMP"
                      persistent-hint
                      prepend-icon="event"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="batches.closetimestamp"
                    no-title
                    @input="menu_closetimestamp = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.syncstatus"
                  hint="Ingrese SYNCSTATUS"
                  placeholder="SYNCSTATUS"
                  readonly
                  persistent-hint
                  required
                  type="number"
                  @input="batches.syncstatus = updateText(batches.syncstatus)"
                >
                </v-text-field>
              </v-flex>
              <v-flex sm4 class="hidden-xs-only" style="padding: 5px">
                <v-menu
                  ref="menu_synctimestamp"
                  v-model="menu_synctimestamp"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="date-small"
                      v-model="batches.synctimestamp"
                      hint="Ingrese synctimestamp"
                      placeholder="SYNCTIMESTAMP"
                      persistent-hint
                      prepend-icon="event"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="batches.synctimestamp"
                    no-title
                    @input="menu_synctimestamp = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.operativeday"
                  hint="Ingrese OPERATIVEDAY"
                  placeholder="OPERATIVEDAY"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.operativeday = updateText(batches.operativeday)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totaltx"
                  hint="Ingrese TOTALTX"
                  placeholder="TOTALTX"
                  readonly
                  persistent-hint
                  required
                  @input="batches.totaltx = updateText(batches.totaltx)"
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalamount"
                  hint="Ingrese TOTALAMOUNT"
                  placeholder="TOTALAMOUNT"
                  readonly
                  persistent-hint
                  required
                  @input="batches.totalamount = updateText(batches.totalamount)"
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalaccepted"
                  hint="Ingrese TOTALACCEPTED"
                  placeholder="TOTALACCEPTED"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalaccepted = updateText(batches.totalaccepted)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalreturned"
                  hint="Ingrese TOTALRETURNED"
                  placeholder="TOTALRETURNED"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalreturned = updateText(batches.totalreturned)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalavailable"
                  hint="Ingrese TOTALAVAILABLE"
                  placeholder="TOTALAVAILABLE"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalavailable = updateText(batches.totalavailable)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalgivenamount"
                  hint="Ingrese TOTALGIVENAMOUNT"
                  placeholder="TOTALGIVENAMOUNT"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalgivenamount = updateText(
                      batches.totalgivenamount
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totaldebtamount"
                  hint="Ingrese TOTALDEBTAMOUNT"
                  placeholder="TOTALDEBTAMOUNT"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totaldebtamount = updateText(
                      batches.totaldebtamount
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalrefilloperations"
                  hint="Ingrese TOTALREFILLOPERATIONS"
                  placeholder="TOTALREFILLOPERATIONS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalrefilloperations = updateText(
                      batches.totalrefilloperations
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalrefillamount"
                  hint="Ingrese TOTALREFILLAMOUNT"
                  placeholder="TOTALREFILLAMOUNT"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalrefillamount = updateText(
                      batches.totalrefillamount
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalcollectoperations"
                  hint="Ingrese TOTALCOLLECTOPERATIONS"
                  placeholder="TOTALCOLLECTOPERATIONS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalcollectoperations = updateText(
                      batches.totalcollectoperations
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalcollectamount"
                  hint="Ingrese TOTALCOLLECTAMOUNT"
                  placeholder="TOTALCOLLECTAMOUNT"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalcollectamount = updateText(
                      batches.totalcollectamount
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalcardsdelivered"
                  hint="Ingrese TOTALCARDSDELIVERED"
                  placeholder="TOTALCARDSDELIVERED"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalcardsdelivered = updateText(
                      batches.totalcardsdelivered
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalcardrefilloperations"
                  hint="Ingrese TOTALCARDREFILLOPERATIONS"
                  placeholder="TOTALCARDREFILLOPERATIONS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalcardrefilloperations = updateText(
                      batches.totalcardrefilloperations
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalcardrefillamount"
                  hint="Ingrese TOTALCARDREFILLAMOUNT"
                  placeholder="TOTALCARDREFILLAMOUNT"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalcardrefillamount = updateText(
                      batches.totalcardrefillamount
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalcardcollectoperations"
                  hint="Ingrese TOTALCARDCOLLECTOPERATIONS"
                  placeholder="TOTALCARDCOLLECTOPERATIONS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalcardcollectoperations = updateText(
                      batches.totalcardcollectoperations
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totalcardcollectamount"
                  hint="Ingrese TOTALCARDCOLLECTAMOUNT"
                  placeholder="TOTALCARDCOLLECTAMOUNT"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.totalcardcollectamount = updateText(
                      batches.totalcardcollectamount
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.carddispenserstatus"
                  hint="Ingrese CARDDISPENSERSTATUS"
                  placeholder="CARDDISPENSERSTATUS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.carddispenserstatus = updateText(
                      batches.carddispenserstatus
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.totallocks"
                  hint="Ingrese TOTALLOCKS"
                  placeholder="TOTALLOCKS"
                  readonly
                  persistent-hint
                  required
                  @input="batches.totallocks = updateText(batches.totallocks)"
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.opentime"
                  hint="Ingrese OPENTIME"
                  placeholder="OPENTIME"
                  readonly
                  persistent-hint
                  required
                  @input="batches.opentime = updateText(batches.opentime)"
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.closetime"
                  hint="Ingrese CLOSETIME"
                  placeholder="CLOSETIME"
                  readonly
                  persistent-hint
                  required
                  @input="batches.closetime = updateText(batches.closetime)"
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.scannerstatus"
                  hint="Ingrese SCANNERSTATUS"
                  placeholder="SCANNERSTATUS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.scannerstatus = updateText(batches.scannerstatus)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.motionsensorstatus"
                  hint="Ingrese MOTIONSENSORSTATUS"
                  placeholder="MOTIONSENSORSTATUS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.motionsensorstatus = updateText(
                      batches.motionsensorstatus
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.printerstatus"
                  hint="Ingrese PRINTERSTATUS"
                  placeholder="PRINTERSTATUS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.printerstatus = updateText(batches.printerstatus)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.cashacceptorstatus"
                  hint="Ingrese CASHACCEPTORSTATUS"
                  placeholder="CASHACCEPTORSTATUS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.cashacceptorstatus = updateText(
                      batches.cashacceptorstatus
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.cashchangerstatus"
                  hint="Ingrese CASHCHANGERSTATUS"
                  placeholder="CASHCHANGERSTATUS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.cashchangerstatus = updateText(
                      batches.cashchangerstatus
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.coinacceptorstatus"
                  hint="Ingrese COINACCEPTORSTATUS"
                  placeholder="COINACCEPTORSTATUS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.coinacceptorstatus = updateText(
                      batches.coinacceptorstatus
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.coinchangerstatus"
                  hint="Ingrese COINCHANGERSTATUS"
                  placeholder="COINCHANGERSTATUS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.coinchangerstatus = updateText(
                      batches.coinchangerstatus
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.cardreaderstatus"
                  hint="Ingrese CARDREADERSTATUS"
                  placeholder="CARDREADERSTATUS"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.cardreaderstatus = updateText(
                      batches.cardreaderstatus
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.blockreason"
                  hint="Ingrese BLOCKREASON"
                  placeholder="BLOCKREASON"
                  readonly
                  persistent-hint
                  required
                  @input="batches.blockreason = updateText(batches.blockreason)"
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.blockstatus"
                  hint="Ingrese BLOCKSTATUS"
                  placeholder="BLOCKSTATUS"
                  readonly
                  persistent-hint
                  required
                  @input="batches.blockstatus = updateText(batches.blockstatus)"
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_000005"
                  hint="Ingrese ACEPTOR_000005"
                  placeholder="ACEPTOR_000005"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_000005 = updateText(batches.aceptor_000005)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_000010"
                  hint="Ingrese ACEPTOR_000010"
                  placeholder="ACEPTOR_000010"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_000010 = updateText(batches.aceptor_000010)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_000025"
                  hint="Ingrese ACEPTOR_000025"
                  placeholder="ACEPTOR_000025"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_000025 = updateText(batches.aceptor_000025)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_000050"
                  hint="Ingrese ACEPTOR_000050"
                  placeholder="ACEPTOR_000050"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_000050 = updateText(batches.aceptor_000050)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_000100"
                  hint="Ingrese ACEPTOR_000100"
                  placeholder="ACEPTOR_000100"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_000100 = updateText(batches.aceptor_000100)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_000200"
                  hint="Ingrese ACEPTOR_000200"
                  placeholder="ACEPTOR_000200"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_000200 = updateText(batches.aceptor_000200)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_000500"
                  hint="Ingrese ACEPTOR_000500"
                  placeholder="ACEPTOR_000500"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_000500 = updateText(batches.aceptor_000500)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_001000"
                  hint="Ingrese ACEPTOR_001000"
                  placeholder="ACEPTOR_001000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_001000 = updateText(batches.aceptor_001000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_002000"
                  hint="Ingrese ACEPTOR_002000"
                  placeholder="ACEPTOR_002000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_002000 = updateText(batches.aceptor_002000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_005000"
                  hint="Ingrese ACEPTOR_005000"
                  placeholder="ACEPTOR_005000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_005000 = updateText(batches.aceptor_005000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_010000"
                  hint="Ingrese ACEPTOR_010000"
                  placeholder="ACEPTOR_010000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_010000 = updateText(batches.aceptor_010000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_000005"
                  hint="Ingrese CHANGER_000005"
                  placeholder="CHANGER_000005"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_000005 = updateText(batches.changer_000005)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_000010"
                  hint="Ingrese CHANGER_000010"
                  placeholder="CHANGER_000010"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_000010 = updateText(batches.changer_000010)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_000025"
                  hint="Ingrese CHANGER_000025"
                  placeholder="CHANGER_000025"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_000025 = updateText(batches.changer_000025)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_000050"
                  hint="Ingrese CHANGER_000050"
                  placeholder="CHANGER_000050"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_000050 = updateText(batches.changer_000050)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_000100"
                  hint="Ingrese CHANGER_000100"
                  placeholder="CHANGER_000100"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_000100 = updateText(batches.changer_000100)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_000200"
                  hint="Ingrese CHANGER_000200"
                  placeholder="CHANGER_000200"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_000200 = updateText(batches.changer_000200)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_000500"
                  hint="Ingrese CHANGER_000500"
                  placeholder="CHANGER_000500"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_000500 = updateText(batches.changer_000500)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_001000"
                  hint="Ingrese CHANGER_001000"
                  placeholder="CHANGER_001000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_001000 = updateText(batches.changer_001000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_002000"
                  hint="Ingrese CHANGER_002000"
                  placeholder="CHANGER_002000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_002000 = updateText(batches.changer_002000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_005000"
                  hint="Ingrese CHANGER_005000"
                  placeholder="CHANGER_005000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_005000 = updateText(batches.changer_005000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_010000"
                  hint="Ingrese CHANGER_010000"
                  placeholder="CHANGER_010000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_010000 = updateText(batches.changer_010000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_000005"
                  hint="Ingrese RETURN_000005"
                  placeholder="RETURN_000005"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_000005 = updateText(batches.return_000005)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_000010"
                  hint="Ingrese RETURN_000010"
                  placeholder="RETURN_000010"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_000010 = updateText(batches.return_000010)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_000025"
                  hint="Ingrese RETURN_000025"
                  placeholder="RETURN_000025"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_000025 = updateText(batches.return_000025)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_000050"
                  hint="Ingrese RETURN_000050"
                  placeholder="RETURN_000050"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_000050 = updateText(batches.return_000050)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_000100"
                  hint="Ingrese RETURN_000100"
                  placeholder="RETURN_000100"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_000100 = updateText(batches.return_000100)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_000200"
                  hint="Ingrese RETURN_000200"
                  placeholder="RETURN_000200"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_000200 = updateText(batches.return_000200)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_000500"
                  hint="Ingrese RETURN_000500"
                  placeholder="RETURN_000500"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_000500 = updateText(batches.return_000500)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_001000"
                  hint="Ingrese RETURN_001000"
                  placeholder="RETURN_001000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_001000 = updateText(batches.return_001000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_002000"
                  hint="Ingrese RETURN_002000"
                  placeholder="RETURN_002000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_002000 = updateText(batches.return_002000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_005000"
                  hint="Ingrese RETURN_005000"
                  placeholder="RETURN_005000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_005000 = updateText(batches.return_005000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_010000"
                  hint="Ingrese RETURN_010000"
                  placeholder="RETURN_010000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_010000 = updateText(batches.return_010000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_066666"
                  hint="Ingrese RETURN_066666"
                  placeholder="RETURN_066666"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_066666 = updateText(batches.return_066666)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_100000"
                  hint="Ingrese ACEPTOR_100000"
                  placeholder="ACEPTOR_100000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_100000 = updateText(batches.aceptor_100000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_200000"
                  hint="Ingrese ACEPTOR_200000"
                  placeholder="ACEPTOR_200000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_200000 = updateText(batches.aceptor_200000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_500000"
                  hint="Ingrese ACEPTOR_500000"
                  placeholder="ACEPTOR_500000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_500000 = updateText(batches.aceptor_500000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptor_1000000"
                  hint="Ingrese ACEPTOR_1000000"
                  placeholder="ACEPTOR_1000000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptor_1000000 = updateText(
                      batches.aceptor_1000000
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_100000"
                  hint="Ingrese CHANGER_100000"
                  placeholder="CHANGER_100000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_100000 = updateText(batches.changer_100000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_200000"
                  hint="Ingrese CHANGER_200000"
                  placeholder="CHANGER_200000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_200000 = updateText(batches.changer_200000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_500000"
                  hint="Ingrese CHANGER_500000"
                  placeholder="CHANGER_500000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_500000 = updateText(batches.changer_500000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changer_1000000"
                  hint="Ingrese CHANGER_1000000"
                  placeholder="CHANGER_1000000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changer_1000000 = updateText(
                      batches.changer_1000000
                    )
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_100000"
                  hint="Ingrese RETURN_100000"
                  placeholder="RETURN_100000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_100000 = updateText(batches.return_100000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_1000000"
                  hint="Ingrese RETURN_1000000"
                  placeholder="RETURN_1000000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_1000000 = updateText(batches.return_1000000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_500000"
                  hint="Ingrese RETURN_500000"
                  placeholder="RETURN_500000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_500000 = updateText(batches.return_500000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.return_200000"
                  hint="Ingrese RETURN_200000"
                  placeholder="RETURN_200000"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.return_200000 = updateText(batches.return_200000)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.aceptordetail"
                  hint="Ingrese ACEPTORDETAIL"
                  placeholder="ACEPTORDETAIL"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.aceptordetail = updateText(batches.aceptordetail)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.changerdetail"
                  hint="Ingrese CHANGERDETAIL"
                  placeholder="CHANGERDETAIL"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.changerdetail = updateText(batches.changerdetail)
                  "
                >
                </v-text-field>
              </v-flex>
              <v-flex sm12 style="padding: 5px">
                <v-text-field
                  class="input-small"
                  v-model="batches.returndetail"
                  hint="Ingrese RETURNDETAIL"
                  placeholder="RETURNDETAIL"
                  readonly
                  persistent-hint
                  required
                  @input="
                    batches.returndetail = updateText(batches.returndetail)
                  "
                >
                </v-text-field>
              </v-flex> -->
                 <v-toolbar color="white" >
                  <v-toolbar-title class="font-medium-color">Contadores</v-toolbar-title>
                 </v-toolbar>
                
              <!-- DESDE -->
              <v-tabs
                  color="black"
                  dark
                  slider-color="green"
                  background-color="grey"
                  style="border:solid;"
                >
                  <v-tab ripple>
                    Aceptadores
                  </v-tab>
                  <v-tab ripple>
                    Dispensadores
                  </v-tab>
                  <v-tab ripple>
                    Vueltos
                  </v-tab>
                  <v-tab ripple>
                    Totales
                  </v-tab>
                  <v-tab ripple>
                    Estados
                  </v-tab>
                  <v-tab-item>
                    <v-card flat>
                          <v-data-table
                          style="padding: 5px;"
                          :headers="headers"
                          :items="lstbatches"
                          :items-per-page="30"
                          :search="buscarbatches"
                          :footer-props="{
                            showFirstLastPage: true,
                            'items-per-page-options': [10, 20, 30, 40, 50, -1],
                            'items-per-page-text': 'Registros por Pagina:',
                          }"
                          class="elevation-1"
                    >
                <template slot="item" slot-scope="props">
                  <tr>
                    <td class="datatable-items-small">
                      {{ props.item.locationidentification }}
                    </td>
                    <td class="datatable-items-small">
                      {{ props.item.deviceidentification }}
                    </td>
              <td class="datatable-items-small">
                {{ FormatDate(props.item.opentimestamp) }}
              </td>
              <!-- <td class="datatable-items-small">{{ FormatDate(props.item.updatetimestamp) }}</td> -->
              <td class="datatable-items-small">
                {{ props.item.deviceidentification }}
              </td>
              <td class="datatable-items-small">
                {{ props.item.locationidentification }}
              </td>
              <!-- <td class="datatable-items-small">{{ props.item.payloadrequest }}</td> -->
              <td class="datatable-items-small">
                {{ props.item.provideridentification }}
              </td>
              <td class="datatable-items-small">{{ props.item.devicestatus }}</td>
              <td class="datatable-items-small">{{ props.item.number_ }}</td>
              <td class="datatable-items-small">{{ props.item.status }}</td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="btnedit"
                  v-on="on"
                  small
                  dark
                  @click="Actualizar(props.item)"
                  ><v-icon>mdi-comment-eye</v-icon>Revisar</v-btn
                >
              </template>
              <span>Ver datos del lote</span>
            </v-tooltip>
            <!-- <v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="btndelete" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar batches </span>
						</v-tooltip> -->
          </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="warning" icon="warning">
          Lo sentimos, no exiten datos a desplegar: (
        </v-alert>
      </template>
    </v-data-table>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>Contents for Item 2 go here</v-card-text>
                    </v-card>
                  </v-tab-item>  
                </v-tabs>
              <!-- HASTA -->
            </v-layout>
          </v-card-text>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions style="justify-content: center;padding:10px">
          <v-btn color="success" dark style="width: 50%" @click="Grabar()"
            >Grabar</v-btn
          >
          <v-btn color="error" dark style="width: 50%" @click="Cancelar()"
            >Cancelar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script src="./batches.ts"></script>
<style scoped>
.font-extralarge-color {
  font-size: 3em; /* tamaño de letra */
  color: white; /* color de letra */
}
.font-large-color {
  font-size: 2.4em; /* tamaño de letra */
  color: white; /* color de letra */
}
.font-medium-color {
  font-size: 2em; /* tamaño de letra */
  color: grey; /* color de letra */
}
.font-small-color {
  font-size: 1.4em; /* tamaño de letra */
  color: white; /* color de letra */
}
.btn-small-color {
  font-size: 1.4em; /* tamaño de letra */
  color: white; /* color de letra */
}
.input-small {
  font-size: 1.6em; /* tamaño de letra */
}
.date-small {
  font-size: 1.5em; /* tamaño de letra */
}
.datatable-items-small {
  font-size: 1em; /* tamaño de letra */
}
</style>
