 <!-- eslint-disable -->
<template>

      <!-- Registration Form -->
  <div
    v-if="reg_show_alert"
    class="text-white text-center font-bold p-5 mb-4"
    v-bind:class="reg_alert_variant"
  >
    {{ reg_alerg_msg }}
  </div>

  <vee-form

    v-bind:validation-schema="schema"
    v-on:submit="register"
    v-bind:initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
        <ErrorMessage class="text-red-600" name="email"/>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded" />
        <ErrorMessage class="text-red-600" name="age"/>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        v-bind:bails="false"
        v-slot="{field, errors}"
      >
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div
          class="text-red-600"
          v-for="error in errors"
          v-bind:key="error"
        >
          {{error}}
        </div>

      </vee-field>
      <ErrorMessage class="text-red-600" name="password"/>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password" />
        <ErrorMessage class="text-red-600" name="confirm_password"/>
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded">
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
        <ErrorMessage class="text-red-600" name="country"/>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
      name="tos"
      value="1"
      type="checkbox"
      class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600 block" name="tos"/>
    </div>
    <button
      v-bind:disabled="reg_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700">
      Submit
    </button>
  </vee-form>
</template>

<script>
/* eslint-disable */
import {auth, usersCollections} from '@/includes/firebase';

export default {
  name: 'AppRegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:99',
        password: 'required|min:5|max:10',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
      },

      userData: {
        country: 'USA',
      },

      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alerg_msg: 'Please wait! Your account is being created.',
    };
  },
  methods: {
     async register(values) {
      // console.log(values)
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant= 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created.';



      try{
       await this.$store.dispatch('register', values)

      }catch(err){
        this.reg_in_submission = false;
        this.reg_alert_variant= 'bg-red-500';
        this.reg_alert_msg = 'An unexpected error occured. Please try again later.';
        return;
      }

      this.reg_alert_msg = 'Success! Your account has been created.';
      this.reg_alert_variant= 'bg-green-500';

      window.location.reload();
    },
  },
};
</script>