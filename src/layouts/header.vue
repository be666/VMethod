<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="am-collapse am-topbar-collapse">
    <ul class="am-nav am-nav-pills am-topbar-nav">
      <li
      >
        <a
        >HOME PAGE</a>
      </li>
    </ul>

    <div class="am-topbar-right">
      <ul class="am-nav am-nav-pills am-topbar-nav">
        <li
        >
          <a>
            {{userInfo.userName}}
          </a>
        </li>
        <li
        >
          <button v-on:click="logout()" class="am-btn am-topbar-btn am-btn-sm"
          >注销
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  module.exports = {
    created: function () {
      var $this = this;
      $this.userInfo = $this.userInfo || {};
    },
    props: ["userInfo"],
    methods: {
      logout: function () {
        var $this = this;
        $this.$http.post($this.$tools.resolveUrl("/Users/logout"), function (data, status, request) {
          $this.$auth.loginOut();
          $this.$dispatch('link', "login");
        })
      }
    }
  }
</script>
