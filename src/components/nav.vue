<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <ul class="am-nav">
    <template v-for="nav in navList[moduleName]">
      <li v-link="{name:nav.linkName,activeClass: 'am-active'}">
        <a>
          {{nav.name}}
            <span class="am-nav-en">
              {{nav.en}}
            </span>
        </a>
      </li>
    </template>
  </ul>
</template>
<style lang="less">
  #ge-nav .am-nav {
    border: 1px solid #ddd;
  }

</style>
<script>
  module.exports = {
    name: 'i_nav',
    data: function () {
      return {
        moduleName: this.moduleName,
        navList: this.navList
      }
    },
    props: ["moduleName", "navList"],
    created: function () {

    },
    methods: {
      update: function () {

      }
    }
  }

</script>
