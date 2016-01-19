<template>
  <header class="am-topbar">
    <div class="am-container">
      <h1 class="am-topbar-brand">
        <a href="javascript:void(0)">VMethod</a>
      </h1>
      <vm_header
        v-bind:user-info="userInfo">
      </vm_header>
    </div>
  </header>
  <section>
    <router-view></router-view>
  </section>
</template>
<script>
  var tools = require("../tools");
  module.exports = {
    components: {
      "vm_header": require("./header.vue")
    },
    data: function () {
      return {
        userInfo: this.userInfo
      }
    },
    route: {
      data: function (transition) {
        this.userInfo = tools.getUserInfo();
      }
    }
  }
</script>
