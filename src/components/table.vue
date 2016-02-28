<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <table class="am-table am-table-bordered">
    <thead>
    <tr>
      <th>
        <input v-on:change="toggleAll" type="checkbox"/>
      </th>
      <template v-for="title in titleList">
        <th>
          {{title.text}}
        </th>
      </template>
      <th v-if="optionList.length | gt0">
        操作
      </th>
    </tr>
    </thead>
    <tbody v-if="dataList && dataList.length | gt0 ">
    <template v-for="data in dataList">
      <tr>
        <td>
          <input type="checkbox" v-model="checkbox" value="{{$index}}">
        </td>
        <template v-for="title in titleList">
          <td>
            <template v-if="title.render">
              {{ (title.render)(data,data[title.id],$index) }}
            </template>
            <template v-else>
              {{data[title.id]}}
            </template>
          </td>
        </template>
        <td v-if="optionList.length  | gt0">
          <div class="am-btn am-btn-default" v-for="option in optionList" v-on:click="optionEvent(option.id,data)">
            <template v-if="option.render">
              {{ (option.render)(data,$index) }}
            </template>
            <template v-else>
              {{option.text}}
            </template>
          </div>
        </td>
      </tr>
    </template>
    </tbody>
    <tfoot>
    <tr>
      <td colspan="{{ (optionList.length>0) ? (titleList.length+2) : (titleList.length+1) }}"
          v-if="dataList | gt0">
        <i_pagination
          :page-maker="pageMaker"
        >
        </i_pagination>
      </td>
    </tr>
    </tfoot>
  </table>
</template>
<script>
  module.exports = {
    name: 'i_table',
    created: function () {
      if (!this.pageMaker) {
        this.pageMaker = {};
      }
    },
    beforeCompile: function () {
      this.optionList = this.optionList || [];
    },
    props: {
      titleList: 'Array',
      dataList: 'Array',
      pageMaker: 'Object',
      checkbox: 'Array',
      optionList: 'Array',
      pid: {
        type: 'String',
        default: function () {
          var $this = this;
          return $this.$tools.getUUid();
        }
      }
    },
    events: {
      pageClick: function (index, size) {
        var $this = this;
        $this.$dispatch('tablePageClick', index, size)
      }
    },
    methods: {
      toggleAll: function (event) {
        var $this = this;
        var checkbox = [];
        if (event.target.checked) {
          for (var i = 0; i < $this.dataList.length; i++) {
            checkbox.push(i);
          }
        }
        $this.checkbox = checkbox;
      },
      optionEvent: function (optionId, data) {
        var $this = this;
        $this.$dispatch('table-click', $this.pid, optionId, data);
      }
    }
  }
</script>
