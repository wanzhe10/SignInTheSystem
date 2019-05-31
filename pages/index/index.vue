<template>
	<view class="contant page">
		<view class="page-tittle">
			《泌尿系感染规范化诊疗基地学习班》
		</view>
		<view class="page-nav">
			会议签到
		</view>
		<view class="signIconBox" @touchstart='signTouStar' @touchend="signTouEnd">
			<image :src="logoHttp" class="logo"></image>
			<view class="sign-font">签到信息</view>
			<view class="sign-font-nav">点击获取签到二维码</view>
			
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello',
				logoHttp: '../../static/signIconUp.png',
				tokenIndex: ''
			}
		},
		methods: {
			// 手指按下
			signTouStar() {
				this.logoHttp = '../../static/signIconDown.png';
			},
			// 手指弹起
			signTouEnd() {
				let that = this;
				let serverUrl = that.serverUrl
				this.logoHttp = '../../static/signIconUp.png';
				//从本地缓存中异步获取指定 key 对应的内容
				 uni.getStorage({
					key: 'token',
					success: function(res) { //成功
						that.tokenIndex = res.data;
							uni.request({
							// url: serverUrl + '/memberDetail/select?token=' + that.tokenIndex, //获取微信授权信息
							url: serverUrl + '/memberDetail/select', //获取微信授权信息
							header: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'token': that.tokenIndex
							},
							success: (res) => {
								console.log(res)
								if (res.data.result == null) {
									uni.navigateTo({
										url: "../massage/massage"
									})
								} else {
									uni.setStorageSync('resultId', res.data.result.id); //将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
									uni.setStorageSync('memberResume', res.data.result.memberResume); //将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
										uni.getLocation({
										type: 'wgs84',
										success: function(res) {
											console.log('当前位置的经度：' + res.longitude);
											console.log('当前位置的纬度：' + res.latitude);
											uni.setStorageSync('signLongitude', res.longitude); //经度
											uni.setStorageSync('signLatitude', res.latitude); //纬度
											uni.redirectTo({
												url: "../myMes/myMes"
											})
										}
									});
								}
							},
						})
					},
					fail(res) {
						uni.navigateTo({
							url: "../Authorization/Authorization"
						})
					}
				});
				

			
			}
		}
	}
</script>

<style>
	.contant {
	text-align: center;
	}
	.page-tittle{
	padding-top:67upx;
	padding-bottom:26upx;
	}
	.page-nav{
		padding-bottom:100upx;
	}
	.logo{
		width: 640upx;
		height: 640upx;
		}

	.signIconBox {
		text-align: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.sign-font {
		font-size: 24px;
		font-weight: bold;
		color:#1aad19;
		
	}
	.sign-font-nav{
		font-size: 15px;
		color:#999999;
		margin-top:38upx;
	}
</style>
