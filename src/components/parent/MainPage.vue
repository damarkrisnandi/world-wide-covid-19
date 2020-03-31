<template>
    <v-lazy
        transition="fade-transition"
    >
        <v-container>
            <v-text-field label="Choose any Country" v-model="country" hide-details="auto" @keyup="searchCountry"></v-text-field>
            <v-data-table
                :headers="headers"
                :items="dataList"
                :sort-by="['country']"
                class="elevation-1 margin-cards"
                :loading="loading" 
                loading-text="Loading... Please wait"
            >
                <template v-slot:item.country="{ item }">
                    <v-container>
                        <v-row style="display: flex; justify-content: center; align-items: center;">
                            <v-col md="2" sm="1" xs="1">
                                <v-avatar
                                size="28px">
                                    <img
                                        :src="item.countryInfo.flag"
                                        :alt="item.country"
                                    >
                                </v-avatar>
                            </v-col>
                            <v-col>
                                <strong> {{ item.country }} </strong>
                            </v-col>
                        </v-row>
                    </v-container>
                </template>
                <template v-slot:item.cases="{ item }">
                    <v-chip :color="getColor(item.cases)" dark>{{ item.cases }}</v-chip>
                </template>
                <template v-slot:item.todayDeaths="{ item }">
                    <v-chip v-if="getColorDeath(item.todayDeaths)=='red'" :color="getColorDeath(item.todayDeaths)" dark>{{ item.todayDeaths }}</v-chip>
                    <v-chip v-if="getColorDeath(item.todayDeaths)=='white'" :color="getColorDeath(item.todayDeaths)" >{{ item.todayDeaths }}</v-chip>
                </template>
                <template v-slot:item.dailyData="{ item }">
                    <v-btn small color="primary" @click="getData(item)">View Data</v-btn>
                </template>
            </v-data-table>
            <v-dialog
        v-model="dialog"
        fullscreen hide-overlay transition="dialog-bottom-transition"
        >

        <v-card>
            <v-card-title
            class="headline grey lighten-2"
            primary-title
            >
            {{ selectedCountry }}
            </v-card-title>

            <!-- <InfoPerDay :country="selectedCountry"/> -->
            <v-container>
                <line-chart :chart-data="dataCollection"
                :options="{responsive: true, maintainAspectRatio: false}"
                ></line-chart>
            </v-container>

            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="closeDialog"
            >
                Close
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        </v-container>
    </v-lazy>
</template>

<script>
import axios from 'axios';
import { Line } from 'vue-chartjs'
import LineChart from '../child/LineChart'
export default {
    name: 'MainPage',
    data: () => ({
        dataList: [],
        country: '',
        loading: false,
        headers: [
          {
            text: 'Country',
            align: 'start',
            value: 'country',
          },
          { text: 'Cases', value: 'cases' },
          { text: 'Death', value: 'deaths' },
          { text: 'Recovered', value: 'recovered' },
          { text: 'Today Cases', value: 'todayCases' },
          { text: 'Today Death', value: 'todayDeaths' },
          { text: 'View Data', value: 'dailyData' },
        ],
        dialog: false,
        selectedCountry: '',

        idnData: [],
        dataRecovered: [],
        dataDeath: [],
        dataConfirmed: [],
        labelData: [],
        dataCollection: { labels:[], datasets: [] }
    }),
    extends: Line,
    components: {
        LineChart
    },
    async mounted() {
        this.loading = true;
        await this.getAll();
        this.loading = false;
    },
    methods: {
        async searchCountry() {
            this.loading = true;
            const data = (await axios.get('https://corona.lmao.ninja/countries/' + this.country)).data;
            if (this.country.length > 0 && data) {
                this.dataList = [];
                this.dataList.push(data);
            } else {
                this.dataList = data;
            }
            this.loading = false;
        },
        async getAll () {
            this.dataList = (await axios.get('https://corona.lmao.ninja/countries/')).data;
        },
        getColor (num) {
            if (num > 5000) return 'red'
            else if (num > 1000) return 'orange'
            else if (num > 500) return 'yellow'
            else return 'green'
        },
        getColorDeath (num) {
            if (num > 0) return 'red'
            return 'white'
        },
        getData (item) {
            this.selectedCountry = item.country
            this.dialog = true;
            this.generateChart();
        },
        generateChart() {
            (axios.get('https://pomber.github.io/covid19/timeseries.json')).then((res) => {
            this.idnData = res.data[this.selectedCountry];
            console.log('cek data', this.selectedCountry, this.idnData[0].recovered);
            this.idnData.forEach(item => {
                this.dataRecovered.push(item.recovered);
                this.dataDeath.push(item.deaths);
                this.dataConfirmed.push(item.confirmed);
                }
            );
            this.idnData.forEach(item => {
                this.labelData.push(item.date);
                }
            );
            console.log('cek ulang', this.dataRecovered);
            this.dataCollection = {
                labels: this.labelData,
                datasets: [
                    {
                        label: 'Recovered',
                        backgroundColor: '#32CD32',
                        data: this.dataRecovered
                    },
                    {
                        label: 'Infected',
                        backgroundColor: '#800000',
                        data: this.dataConfirmed
                    },
                ],
            };
        });
        },
        clearChart() {
            this.idnData = [];
            this.dataRecovered = [];
            this.dataDeath = [];
            this.dataConfirmed = [];
            this.labelData = [];
            this.dataCollection = { labels:[], datasets: [] };
        },
        closeDialog() {
            this.dialog = false;
            this.clearChart();
        }
    }
}
</script>

<style>
    .margin-cards {
        margin-top: 25px;
    }
</style>