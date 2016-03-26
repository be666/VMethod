/**
 * Created by bqxu on 15/12/10.
 */
let Vue = require('vue');
let VueRouter = require('vue-router');
let VueResource = require('vue-resource');
let {inArray,config:{auth={}}} = require('./tools');
let {valid} = require('./auth');
let x = require('./plugin/dialog.less');
Vue.config.debug = true;

Vue.use(function (vue) {
  vue.prototype.$tools = require('./tools');
  vue.prototype.$auth = require('./auth');
  vue.prototype.$config = {
    module: 'home'
  }
  vue.prototype.$dialog = require('./plugin/dialog.js');
});


//layout
Vue.use(VueRouter);
Vue.use(VueResource);
//component

Vue.component('i_file', require("./component/file.vue"));
Vue.component('i_nav', require("./component/nav.vue"));
Vue.component('i_pagination', require("./component/pagination.vue"));
Vue.component('i_search', require("./component/search.vue"));
Vue.component('i_search_multi', require("./component/select-multi.vue"));
Vue.component('i_search_single', require("./component/select-single.vue"));
Vue.component('i_table', require("./component/table.vue"));
Vue.component('i_radio', require("./component/radio.vue"));
//directive

//filter

Vue.filter('equal', function (v1, v2) {
  return v1 == v2;
});

Vue.filter('gt0', function (arr) {
  let a = arr || 0;
  return a > 0;
});

//main
let App = Vue.extend({
  events: {
    link: function (pathName, params) {
      router.go({
        name: pathName,
        params: params || {}
      })
    }
  }
});

let router = new VueRouter();
router.map({
  '/': {
    name: "root",
    component: require("./layout/root.vue"),
    subRoutes: {
      "/": {
        component: require("./layout/app.vue"),
        subRoutes: {
          "me": {
            name: "me",
            component: require("./portal/me.vue")
          }
          ,
          "home": {
            name: "home",
            component: require("./portal/home.vue")
          }
        }
      },
      "login": {
        name: "login",
        component: require("./sys/login.vue")
      },
      "sign": {
        name: "sign",
        component: require("./sys/sign.vue")
      }
    },
    "*": {
      "name": "40x",
      component: require("./sys/40x.vue")
    }
  }
});

router.redirect({
  "/": "/home"
});

router.beforeEach(function (transition) {
  if (auth.ignoreAll) {
    transition.next()
  } else if (inArray(auth.ignore, transition.to.path)) {
    transition.next()
  } else {
    valid(transition.to.router.app, function () {
      transition.next();
    }, function () {
      transition.redirect("/login")
    });
  }
});

router.start(App, 'body');
