<template>
    <div class="container">
      <img src="@/assets/Logo.png" alt="logo" width="50%" />
      <h2>Forgot Password</h2>
      <b-input-group class="input-group">
        <b-form-input
          class="input"
          v-model="Email"
          placeholder="Email"
        ></b-form-input>
        <b-input-group-append>
          <b-button variant="primary" class="send_btn" @click="send"
            >send</b-button
          >
        </b-input-group-append>
      </b-input-group>
      <b-form-input
        class="input"
        v-model="code"
        placeholder="code"
        type="text"
      ></b-form-input>
      <b-form-input
        class="input"
        v-model="Password"
        placeholder="new Password"
        type="password"
      ></b-form-input>
      <b-form-input
        class="input"
        v-model="passwordCheck"
        placeholder="passwordCheck"
        type="password"
      ></b-form-input>
      <b-button class="button" variant="primary" @click="submit">Submit</b-button>
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
.input-group {
  width: 500px;
  margin: 20px auto;
}
.input-group .input {
  margin: 0;
}
.input {
  width: 500px;
  height: 50px;
  margin: 20px auto;
  background-color: rgb(214, 212, 212);
  color: black;
}
.send_btn {
  padding: 0 20px;
}
.button {
  margin-top: 40px;
  padding: 8px 20px;
}
</style>
