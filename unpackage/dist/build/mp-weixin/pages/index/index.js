(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"03e9":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},"3d66":function(e,t,n){"use strict";var o=n("a37c"),a=n.n(o);a.a},"4e93":function(e,t,n){"use strict";n.r(t);var o=n("03e9"),a=n("583f");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("3d66");var u=n("2877"),s=Object(u["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=s.exports},"583f":function(e,t,n){"use strict";n.r(t);var o=n("c767"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);t["default"]=a.a},a37c:function(e,t,n){},c767:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{title:"Hello",logoHttp:"../../static/signIconUp.png",tokenIndex:"",memberName:""}},onLoad:function(){e.hideLoading()},methods:{signTouStar:function(){this.logoHttp="../../static/signIconDown.png"},signTouEnd:function(){e.showLoading({title:"加载中"});var t=this,n=t.serverUrl;this.logoHttp="../../static/signIconUp.png",e.getStorage({key:"token",success:function(o){console.log(o),t.tokenIndex=o.data,e.request({url:n+"/memberDetail/select",header:{"Content-Type":"json",token:t.tokenIndex},success:function(n){console.log(n),t.memberName=n.data.result.memberName,console.log(null!=t.memberName),null!=t.memberName?(e.setStorageSync("resultId",n.data.result.id),e.getLocation({type:"wgs84",success:function(t){console.log("当前位置的经度："+t.longitude),console.log("当前位置的纬度："+t.latitude),e.setStorageSync("signLongitude",t.longitude),e.setStorageSync("signLatitude",t.latitude),e.hideLoading(),e.redirectTo({url:"../myMes/myMes"})}})):(e.setStorageSync("resultId",n.data.result.id),e.navigateTo({url:"../massage/massage"}))}})},fail:function(t){e.navigateTo({url:"../Authorization/Authorization"})}})}}};t.default=n}).call(this,n("543d")["default"])}},[["6e5e","common/runtime","common/vendor"]]]);