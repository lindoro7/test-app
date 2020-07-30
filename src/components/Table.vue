<template>
  <div  class='row offset-top'>
    <div class="col s10 offset-s1">
      <input 
        type="text"   
        id="search__input"
        placeholder="Search by name"
        v-model="searchString"
      >
      <a 
        class="waves-effect waves-light btn"
        @click="search"
      >Search</a>
      <a 
        class="waves-effect waves-light btn right"
        @click="useradd"
      >Добавить пользователя</a>
    </div>
    <div class="col s10 offset-s1 offset-top">
      <table>
        <thead>
          <tr>
              <th @click="sortParam='id', resetSortedBy('id')">
                ID 
                  <i 
                    class="material-icons"
                    v-if="sortedBy.id"
                  >arrow_downward</i>
              </th>
              <th @click="sortParam='firstname', resetSortedBy('firstName')">
                First Name 
                  <i 
                    class="material-icons"
                    v-if="sortedBy.firstName"
                  >arrow_downward</i>
              </th>
              <th @click="sortParam='lastname', resetSortedBy('lastName')">
                Last Name
                  <i 
                    class="material-icons"
                    v-if="sortedBy.lastName"
                  >arrow_downward</i>
              </th>
              <th @click="sortParam='email', resetSortedBy('email')">
                Email
                  <i 
                    class="material-icons"
                    v-if="sortedBy.email"
                  >arrow_downward</i>
              </th>
              <th  @click="sortParam='phone', resetSortedBy('phone')" >
                Phone
                  <i 
                    class="material-icons"
                    v-if="sortedBy.phone" 
                  >arrow_downward</i>
              </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="user in paginatedUsers"
            :key="user.email"
            @click="clickedUser(user)"
          >
            <td>{{ user.id }}</td>   
            <td>{{ user.firstName }}</td>        
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col s4 offset-s4" v-if="!clickedUserInfo">
      User not selected
    </div>
    <div class="col s4 offset-s4" v-else>
      <p>Выбран пользователь <b>{{ clickedUserInfo.firstName}}</b></p>  <br>
      <textarea v-model="clickedUserInfo.description" id='textarea'> </textarea>
      <p>Адрес проживания: <b>{{ clickedUserInfo.address.streetAddress }}</b></p>
       <p>Город: <b>{{ clickedUserInfo.address.city}}</b></p> <br>
      <p>Провинция/штат: <b>{{ clickedUserInfo.address.state}}</b></p> <br>
      <p>Индекс: <b>{{ clickedUserInfo.address.zip}}</b></p>
    </div>
    <div class="col s10 offset-s1">
    <ul class="pagination">
      <li 
        class="waves-effect"
        v-if="pageNumber != 1"
        @click="pageNumber--"
      ><a><i class="material-icons">chevron_left</i></a></li>
      <li 
        class="waves-effect"
        v-for="page in pages"
        :key="page"
        @click="pageClick(page)"
        :class="{'active': page === pageNumber}"
      ><a >{{page}}</a></li>
      <li 
        class="waves-effect"
        v-if="pageNumber != pages"
        @click="pageNumber++"
      ><a ><i class="material-icons">chevron_right</i></a></li>
    </ul>
  </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Table',
  data() {
    return {
      clickedUserInfo: '',
      searchString: '',
      searchHelper: '',
      userPerPage: 50,
      pageNumber: 1,
      sortParam: '',
      sortedBy: {
        id: false,
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
      },
    } 
  },

  methods: {
    clickedUser(man) {
      this.clickedUserInfo = this.USERS.find(user => man.email === user.email)
    },
    useradd() {
      this.$emit('useradd')
    },
    search() {
      this.sortParam = this.searchString
    },
    pageClick(page) {
      this.pageNumber = page
    },
    resetSortedBy(prop) {
      for (let key in this.sortedBy) {
        if (key === prop) {
          this.sortedBy[key] = true
        } else {
          this.sortedBy[key] = false
        }
      }
    },

    sortById: (d1, d2) => {return (d1.id > d2.id) ? 1 : -1;},
    sortByFirstName: (d1, d2) => {return d1.firstName.localeCompare(d2.firstName)},
    sortByLastName: (d1, d2) => {return d1.lastName.localeCompare(d2.lastName)},
    sortByEmail: (d1, d2) => {return d1.email.localeCompare(d2.email)},
    sortByPhone: (d1, d2) => {return (d1.phone > d2.phone) ? 1 : -1;},
  },
  computed: {
    ...mapGetters([
      'USERS'
    ]),
    sortedList () {
      switch(this.sortParam){
        case this.searchString: return [...this.USERS].filter((user) => {return user.firstName.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1})
        case 'id': return [...this.USERS].sort(this.sortById)
        case 'firstname': return [...this.USERS].sort(this.sortByFirstName)
        case 'lastname': return [...this.USERS].sort(this.sortByLastName)
        case 'email': return [...this.USERS].sort(this.sortByEmail)
        case 'phone': return [...this.USERS].sort(this.sortByPhone)
        default: return this.USERS
      }
    },
    pages() {
      return Math.ceil(this.sortedList.length / this.userPerPage)
    },
    paginatedUsers() {
      let from = (this.pageNumber - 1) * this.userPerPage
      let to = from + this.userPerPage
      return this.sortedList.slice(from, to)
    }
  },
}
</script>
<style scoped>
textarea {
  height: 4rem;
}
  th {
    width: 20%;
    text-align: left;
    cursor: pointer;
  }
  td {
    font-size: 13px;
    line-height: 13px;
    padding: 2px;
  }
  .pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
  }
  #search__input {
    width: 20%;
  }
  .offset-top {
    margin-top: 20px;
  }
  
</style>
