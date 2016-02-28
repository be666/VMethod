<template>
  <i_header v-bind:user-info="userInfo"></i_header>
  <section>
    <router-view></router-view>
  </section>
</template>
<script>
  module.exports = {
    components: {
      'i_header': require("./header.vue")
    },
    data: function () {
      return {
        userInfo: this.userInfo
      }
    },
    route: {
      data: function (transition) {
        var $this = this;
        $this.userInfo = $this.$tools.getUserInfo();
      }
    }
  }
</script>
