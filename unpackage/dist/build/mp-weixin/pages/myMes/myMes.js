(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myMes/myMes"],{"0dfc":function(e,n,t){"use strict";var o=t("6d1a"),i=t.n(o);i.a},"28fd":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){return Promise.all([t.e("common/vendor"),t.e("components/tki-qrcode/tki-qrcode")]).then(t.bind(null,"16b4"))},i={data:function(){return{val:"",size:400,unit:"upx",background:"#fff",foreground:"#000000",pdground:"#000000",icon:"../../static/favicon.jpg",iconsize:40,lv:3,onval:!0,loadMake:!0,src:"",resultId:"",signLongitude:"",signLatitude:""}},onLoad:function(){e.hideLoading();var n=this,t=(n.serverUrl,e.getStorageSync("token"));n.resultId=e.getStorageSync("resultId"),n.signLongitude=e.getStorageSync("signLongitude"),n.signLatitude=e.getStorageSync("signLatitude");var o={memberId:n.resultId,signLongitude:n.signLongitude,signLatitude:n.signLatitude},i=JSON.stringify(o);n.val=i,e.connectSocket({url:"wss://www.qlxlm.com/websocket/"+t,header:{"Content-Type":"application/x-www-form-urlencoded"},method:"GET"}),e.onSocketMessage(function(n){var t=JSON.parse(n.data);console.log(t),""!=t.type&&void 0!=t.type&&("SIGN_SUCCESS"===t.type?e.redirectTo({url:"../signSucceed/signSucceed"}):"ALREADY_SIGN"===t.type?e.redirectTo({url:"../signNoo/signNoo"}):"LOCATION_MISTAKE"==t.type&&e.redirectTo({url:"../signDefeated/signDefeated"}))})},methods:{qrR:function(e){this.src=e},goIndex:function(){e.switchTab({url:"../index/index"})}},components:{tkiQrcode:o}};n.default=i}).call(this,t("543d")["default"])},"393c":function(e,n,t){"use strict";t.r(n);var o=t("28fd"),i=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);n["default"]=i.a},"6d1a":function(e,n,t){},7274:function(e,n,t){"use strict";t.r(n);var o=t("ef1b"),i=t("393c");for(var r in i)"default"!==r&&function(e){t.d(n,e,function(){return i[e]})}(r);t("0dfc");var u=t("2877"),c=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=c.exports},ef1b:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})}},[["de61","common/runtime","common/vendor"]]]);