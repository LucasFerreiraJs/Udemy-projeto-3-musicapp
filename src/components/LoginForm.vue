 <!-- eslint-disable -->
<template>
      <!-- Login Form -->
  <div
    v-if="login_show_alert"
    class="text-white text-center font-bold p-5 mb-4"
    v-bind:class="login_alert_variant"
  >
    {{ login_alerg_msg }}
  </div>
    <vee-form
      v-bind:validation-schema="loginSchema"
      v-on:submit="login"
    >
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field
          name="email"
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email" />

          <ErrorMessage class="text-red-600" name="email"/>
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field
          name="password"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password" />

        <ErrorMessage class="text-red-600" name="password"/>

      </div>
      <button
        v-bind:disabled="login_in_submission"
        type="submit"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
          hover:bg-purple-700">
        Submit
      </button>
    </vee-form>
</template>

<script >
/* eslint-disable */

export default {
  name:'AppLoginForm',
  data(){
    return {
       loginSchema: {
        email: 'required|email',
        password: 'required|min:5|max:10',
      },

      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alerg_msg: 'Please wait! We are logging you in.',
    };
  },
  methods:{
    async login(values){

      this.login_in_submission= true;
      this.login_show_alert= true;
      this.login_alert_variant= 'bg-blue-500';
      this.login_alerg_msg= 'Please wait! We are logging you in.';

      try {

        await this.$store.dispatch('login', values);

      }catch(err){

        console.log('error')
        this.login_in_submission= true;
        this.login_alert_variant= 'bg-red-500';
        this.login_alerg_msg= "Invalid login details";

        return;
      }

      this.login_alerg_msg = "Success! You're now logged in";
      this.login_alert_variant = 'bg-green-500';

      console.log(values)
      window.location.reload();
    },
  },
};
</script>