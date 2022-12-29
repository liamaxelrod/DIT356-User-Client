<template>
    <div class="container">
      <img src="@/assets/Logo.png" alt="logo" width="50%" />
      <h2>Account Signup</h2>
      <b-form-input
        class="input"
        v-model="Firstname"
        placeholder="Firstname">
      </b-form-input>
      <b-form-input
        class="input"
        v-model="Lastname"
        placeholder="Lastname">
      </b-form-input>
      <b-form-input
        class="input"
        v-model="Email"
        placeholder="Email">
      </b-form-input>
      <b-form-input
        class="input"
        v-model="Password"
        placeholder="Password"
        type="password">
      </b-form-input>
      <b-form-input
        class="input"
        v-model="passwordCheck"
        placeholder="passwordCheck"
        type="password">
      </b-form-input>
      <b-button class="button" variant="primary" @click="submit">Sign Up</b-button>
    </div>
</template>

<script>
</script>

<style scoped>
  .container {
    padding-top: 20px;
    text-align: center;
  }
  h2 {
    font-size: 18px;
    color: rgb(96, 96, 96);
    font-weight: normal;
  }
  .input {
    width: 500px;
    height: 50px;
    margin: 20px auto;
    background-color: rgb(214, 212, 212);
    color: black;
  }
  .button {
    margin-top: 40px;
    padding: 8px 20px;
  }
</style>
