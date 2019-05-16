<template>
	<view class="page contant">
		<view class="signIconBox" @touchstart='signTouStar' @touchend="signTouEnd">
			<image :src="logoHttp" class="logo"></image>

			<view class="sign-font">点击签到</view>
		</view>
		<button type="primary" open-type='getUserInfo' @getuserinfo="wxGetUserInfo" withCredentials="true">授权</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello',
				logoHttp: '../../static/signIconUp.png'
			}
		},
		onLoad() {
			var that = this;
			var serverUrl = that.serverUrl
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					// console.log(loginRes.code) //向后台发送的code 换取token
					uni.request({
						url: serverUrl + '/login/weChat/oauth?code=' + loginRes.code,
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							// "token":
						},
						success: (res) => {
							// console.log(res.data.result)
							uni.setStorageSync('token',res.data.result); //将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
							// if (res.data.code == 20000) {
							// 	uni.navigateTo({
							// 		url: "../succeed/succeed"
							// 	})
							// }
						},
					})
					// uni.getUserInfo({
					// 	provider: 'weixin',
					// 	withCredentials: true,
					// 	success: function(infoRes) {
					// 		console.log('用户昵称为：' + infoRes.userInfo.nickname);
					// 	},
					// 	fail: function(res) {
					// 		// 这里res = {"errMsg":"getUserInfo:fail scope unauthorized"}   
					// 		console.log('res=' + JSON.stringify(res))
					// 	}
					// });
				},
				fail: function(es) {
					console.log('fail')
					console.log(es)
				}
			});
		},
		methods: {
			// wxGetUserInfo(res) {
			// 	if (!res.detail.iv) {
			// 		uni.showToast({
			// 			title: "您取消了授权,登录失败",
			// 			icon: "none"
			// 		});
			// 		return false;
			// 	}
			// 	console.log('-------用户授权，并获取用户基本信息和加密数据------')
			// 	console.log(res.detail);
			// },

			// 手指按下
			signTouStar() {
				this.logoHttp = '../../static/signIconDown.png';
				// this.logoHttp = '../../static/logo.png';
			
			},
			signTouEnd() {
				this.logoHttp = '../../static/signIconUp.png';
					let token = uni.getStorage({ //从本地缓存中异步获取指定 key 对应的内容
					key: 'token',
					success: function(res) {  //成功
							uni.navigateTo({
								url: "../succeed/succeed"
							})
					},
						fail: function(res) {//失败
							uni.navigateTo({
								url: '../massage/massage'
							})
					},
					
				});
			}
		}
	}
</script>

<style>
	.contant {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.signIconBox {
		text-align: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.sign-font {
		font-size: 18px;
		font-weight: bold;
	}
</style>
