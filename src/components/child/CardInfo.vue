<template>
  <v-card
    class="mx-auto"
    max-width="300"
  >
    <v-img
      class="align-end text--white"
      height="200px"
      :src="flag"
    >
    </v-img>

    <v-card-title>{{ country }}</v-card-title>

    <!-- <v-card-subtitle class="pb-0">Number 10</v-card-subtitle> -->

    <v-card-text>
      <div><strong>Cases:</strong> {{ cases }}</div>

      <div><strong>Deaths:</strong> {{ deaths }}</div>
      <div><strong>Recovered:</strong> {{ recovered }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        More Info
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    data: () => ({
    }),
    props: [
        'country', 'flag', 'cases', 'deaths', 'recovered'
    ]
}
</script>

<style>

</style>