<template>
  <div id="app">
    <Loader v-if="LOADING"/>
    <AddUser v-else-if="userAdding" @goToTable='userAdding= false'/>
    <Table v-else @useradd='userAdding= true'/>
  </div>
</template>

<script>
import Table from './components/Table'
import Loader from './components/Loader'
import AddUser from './components/AddUser'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'App',
  data: () => ({
      userAdding: false
  }),

  methods: {
    ...mapActions([
      'GET_USERS_FROM_API', 'LOADING_TO_FALSE'
    ]),
  },
  async mounted() {
    await this.GET_USERS_FROM_API()
    this.$store.dispatch('LOADING_TO_FALSE')
  },
  computed: {
    ...mapGetters([
      'LOADING'
    ])
  },
  components: {
    Table, Loader, AddUser
  }
}
</script>

