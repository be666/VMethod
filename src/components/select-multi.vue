<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="ge-multi">
    <ul v-if="itemList.length">
      <template v-for="item in itemList">
        <li
          v-on:click="toggle(item[id])"
          v-bind:class="{'am-active':isSelected(item[id])}"
        >
          <a>
            {{item[text]}}
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>
<style>
  .ge-multi {
    background-color: #fff;
    border: 1px solid #ddd;
  }

  .ge-multi ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .ge-multi li {
    border-top: 1px solid #ddd;
  }

  .ge-multi li:first-child {
    border-top-width: 0;
  }

  .ge-multi a {
    display: block;
    padding: 6px 20px;
    font-weight: 400;
    color: #333;
    white-space: nowrap
  }

  .ge-multi .am-active a {
    color: #fff;
    text-decoration: none;
    outline: 0;
    background-color: #0e90d2
  }
</style>
<script>
  module.exports = {
    name: "ge_select",
    props: ['id', 'text', 'selected', 'itemList'],
    data: function () {
      var $this=this;
      return {
        id: $this.id || "id",
        text: $this.text || "text",
        selected: $this.selected,
        itemList: $this.itemList
      }
    },
    methods: {
      toggle: function (id) {
        var $this=this;
        if (!$this.selected) {
          $this.selected = [];
        }
        var $selected = $this.selected;
        if (tools.inArray($selected, id)) {
          for (var i = 0; i < $selected.length; i++) {
            var $s = $selected[i];
            if ($s == id) {
              $selected.splice(i, 1);
              break;
            }
          }
        } else {
          $selected.push(id);
        }
      },
      isSelected: function (id) {
        var $this=this;
        return $this.$tools.inArray(this.selected, id);
      }
    }
  };
</script>
