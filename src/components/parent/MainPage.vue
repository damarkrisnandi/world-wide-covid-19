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
            </v-data-table>
        </v-container>
    </v-lazy>
</template>

<script>
import axios from 'axios';
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
        ]
    }),
    components: {
        
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
    }
}
</script>

<style>
    .margin-cards {
        margin-top: 25px;
    }
</style>