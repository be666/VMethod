<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="am-cf ge-file-group">
    <input type="text" placeholder="{{placeholder}}" class="ge-file-field" v-model="name">
    <span class="ge-input-group-label">
      <button class="ge-file-warp" type="button">
        {{tips}}{{prc}}
        <form onsubmit="return false" enctype="multipart/form-data" v-bind:id="formId">
          <input type="file" v-on:change="submit()" class="ge-file" multiple="multiple" name="fileUpload"
                 id="fileUpload">
        </form>
      </button>
    </span>
  </div>
</template>
<style>
  .ge-file-group {
    display: inline-block;
    width: 100%;
    height: 32px;

  }

  .ge-file-group input[type=text].ge-file-field {
    display: inline-block;
    width: 60%;
    height: inherit;
    float: left;
  }

  .ge-input-group-label {
    display: inline-block;
    width: 40%;
    height: inherit;
    float: left;
  }

  .ge-file-warp {
    position: relative;
    display: inline-block;
    overflow: hidden;
    text-decoration: none;
    width: 100%;
    height: 32px;
  }

  .ge-file {
    width: 100%;
    height: 32px;
  }

  .ge-file-warp .ge-file {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .ge-file-warp:hover {
    text-decoration: none;
  }
</style>
<script>
  module.exports = {
    props: ['name', "size", "path", "placeholder", "tips"],
    data: function () {
      var $this=this;
      $this.placeholder = $this.placeholder || "文件名称";
      $this.tips = $this.tips || "选择文件";
      return {
        placeholder: $this.placeholder,
        tips: $this.tips,
        name: $this.name,
        size: $this.size,
        path: $this.path,
        formId: $this.$tools.getUUid()
      }
    },
    methods: {
      submit: function () {
        var $this = this;
        var formData = new FormData(document.forms.namedItem($this.formId));
        $this.$http.post(tools.config.uploadUrl, formData, function (data, state, req) {
          $this.name = data.name;
          $this.size = data.size;
          $this.path = data.path;
        }, {
          headers: {
            "Content-Type": "multipart/form-data;"
          }
        }).error(function () {

        })
      }
    }
  }
</script>
