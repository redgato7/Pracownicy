<template>
  <v-app>
    <v-content>
      <Pracownicy/>
    </v-content>
  </v-app>
</template>

<script>
import Pracownicy from '@/components/Pracownicy'

export default {
  name: 'App',
  components: {
    Pracownicy
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);

}

</style>
