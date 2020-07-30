<template>
  <div class="row">
    <form class="col s6 offset-s3">
      <div class="input-field col s12">
        <input 
          id="id" 
          type="text"  
          v-model="$v.id.$model"
          :class="{invalid: !$v.id.minLength}"
        >
        <label for="id">Id</label>
        <small 
          class="helper-text invalid"
          v-if="!$v.id.required"
        >ID is required</small>
        <small 
          class="helper-text invalid"
          v-else-if="!$v.id.minLength"
        >ID must be minimum {{$v.id.$params.minLength.min}} numbers. Now is {{ id.length}}</small>
      </div>
      <div class="input-field col s12">
        <input 
          id="first_name"   
          type="text" 
          v-model.trim="$v.firstName.$model"
        >
        <label for="first_name">First Name</label>
        <small 
          class="helper-text invalid"
          v-if="!$v.lastName.required"
        >First Name is required</small>
        
      </div>
      <div class="input-field col s12">
        <input 
          id="last_name" 
          type="text" 
          v-model.trim="$v.lastName.$model"
        >
        <label for="last_name">Last Name</label>
        <small 
          class="helper-text invalid"
          v-if="!$v.lastName.required"
        >Last Name is required</small>
      </div>
      <div class="input-field col s12">
        <input  
          id="email" 
          type="text"
          v-model.trim="$v.email.$model"
          :class="{invalid: !$v.email.email}"
        >
        <label for="email">Email</label>
        <small 
          class="helper-text invalid"
          v-if="!$v.email.required"
        >Email is required</small>
        <small 
          class="helper-text invalid"
          v-else-if="!$v.email.email"
        >Enter correct Email</small>
      </div>
      <div class="input-field col s12">
        <input 
          id="phone" 
          type="text" 
          v-model.trim="$v.phone.$model"
          :class="{invalid: !$v.phone.minLength || !$v.phone.maxLength}"
        >
        <label for="phone">Phone</label>
        <small 
          class="helper-text invalid"
          v-if="!$v.phone.required"
        >Phone is required</small>
        <small 
          class="helper-text invalid"
          v-else-if="!$v.phone.minLength"
        >Phone must be minimum {{$v.phone.$params.minLength.min}} numbers. Now is {{ phone.length}}</small>
        <small 
          class="helper-text invalid"
          v-else-if="!$v.phone.maxLength"
        >Phone must be maximum {{$v.phone.$params.maxLength.max}} numbers. Now is {{ phone.length}}</small>
      </div>
      <a 
        class="waves-effect waves-light btn"
        @click="cancel"
      >Cancel</a>
      <a 
        class="waves-effect waves-light btn right user-add-btn" 
        @click="onSubmit"
        :class="{disabled: $v.$invalid}"
      >Add New User</a>
    </form>
  </div>
</template>
<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'AddUser',
  data: () => ({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userAddBtn: '',
  }),
  methods: {
    onSubmit() {
      const formData = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone
      }
      console.log(formData)
      this.$store.dispatch('ADD_USER', formData)
      this.$emit('goToTable')
    },
    cancel() {
      this.$emit('goToTable')
    }
  },
  mounted() {
    this.userAddBtn = document.querySelector('.user-add-btn')
    
  },
  validations: {
    id: { required, minLength: minLength(3) },
    firstName: { required },
    lastName: { required },
    email: { required, email},
    phone: { required, minLength: minLength(10), maxLength: maxLength(10)}
  }
}
</script>
<style scoped>
.row {
  margin-top: 60px;
}
</style>