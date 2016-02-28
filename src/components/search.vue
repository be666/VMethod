<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="am-cf ge-input-group ge-search-warp">
    <input type="text" placeholder="{{placeholder}}" class="ge-search-field" v-model="keyWord">
    <span class="ge-input-search-label">
      <button type="button" v-on:click="searched">
        {{tips}}
      </button>
    </span>
  </div>
</template>
<style>
  .ge-search-warp {
    display: inline-block;
    width: 100%;
    height: 32px;

  }

  .ge-search-warp .ge-search-field {
    display: inline-block;
    width: 60%;
    height: inherit;
    line-height: 1.5rem;
    vertical-align: middle;
    float: left;
  }

  .ge-input-search-label {
    display: inline-block;
    width: 40%;
    height: inherit;
    float: left;
  }

  .ge-input-search-label button {
    height: inherit;
  }

</style>
<script>
  module.exports = {
    props: ["keyWord", "placeholder", "tips"],
    data: function () {
      var $this = this;
      $this.placeholder = $this.placeholder || "输入";
      $this.tips = $this.tips || "查询";
      return {
        placeholder: $this.placeholder,
        tips: $this.tips,
        keyWord: $this.keyWord,
        formId: $this.$tools.getUUid()
      }
    },
    methods: {
      searched: function () {
        var $this = this;
        $this.$dispatch("searched")
      }
    }
  }
</script>
