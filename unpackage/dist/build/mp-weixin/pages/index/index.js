(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"3d66":function(e,t,n){"use strict";var o=n("a37c"),i=n.n(o);i.a},"4e93":function(e,t,n){"use strict";n.r(t);var o=n("ce8e"),i=n("583f");for(var c in i)"default"!==c&&function(e){n.d(t,e,function(){return i[e]})}(c);n("3d66");var s=n("2877"),a=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=a.exports},"583f":function(e,t,n){"use strict";n.r(t);var o=n("c767"),i=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,function(){return o[e]})}(c);t["default"]=i.a},a37c:function(e,t,n){},c767:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{title:"Hello",logoHttp:"../../static/signIconUp.png",tokenIndex:"",memberName:""}},onLoad:function(){e.hideLoading()},methods:{signTouStar:function(){this.logoHttp="../../static/signIconDown.png"},signTouEnd:function(){var t=this,n=t.serverUrl;this.logoHttp="../../static/signIconUp.png",e.getStorage({key:"token",success:function(o){console.log(o),t.tokenIndex=o.data,e.request({url:n+"/memberDetail/select",header:{"Content-Type":"json",token:t.tokenIndex},success:function(n){console.log(n),t.memberName=n.data.result.memberName,console.log(null!=t.memberName),null!=t.memberName?(e.setStorageSync("resultId",n.data.result.id),e.getSetting({success:function(n){console.log(n),void 0!=n.authSetting["scope.userLocation"]&&1!=n.authSetting["scope.userLocation"]?e.showModal({title:"是否授权当前位置",content:"需要获取您的地理位置，请确认授权，否则无法获取您所需数据",success:function(n){console.log(n),n.cancel?(e.showToast({title:"授权失败",icon:"success",duration:1e3}),e.hideLoading()):n.confirm&&e.openSetting({success:function(n){console.log(n),1==n.authSetting["scope.userLocation"]?(e.showToast({title:"授权成功",icon:"success",duration:1e3}),t.getLocation()):(e.showToast({title:"授权失败",icon:"success",duration:1e3}),e.hideLoading())}})}}):(n.authSetting["scope.userLocation"],t.getLocation())}})):(e.setStorageSync("resultId",n.data.result.id),e.hideLoading(),e.navigateTo({url:"../massage/massage"}))}})},fail:function(t){e.hideLoading(),e.navigateTo({url:"../Authorization/Authorization"})}})},getLocation:function(){e.getLocation({type:"wgs84",success:function(t){console.log("当前位置的经度："+t.longitude),console.log("当前位置的纬度："+t.latitude),e.setStorageSync("signLongitude",t.longitude),e.setStorageSync("signLatitude",t.latitude),e.hideLoading(),e.redirectTo({url:"../myMes/myMes"}),e.hideLoading()}})}}};t.default=n}).call(this,n("543d")["default"])},ce8e:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return i})}},[["6e5e","common/runtime","common/vendor"]]]);