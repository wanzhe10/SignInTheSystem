<template>
	<view class="contant page">
		<view class="page-tittle">
			《泌尿系感染规范化诊疗基地学习班》
		</view>
		<view class="page-nav">
			会议签到
		</view>
		<view class="signIconBox">
			<image :src="logoHttp" class="logo" @touchstart='signTouStar' @touchend="signTouEnd"></image>
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
				tokenIndex: '',
				memberName: ''
			}
		},
		onLoad() {
			uni.hideLoading();
		},
		methods: {
			// 手指按下
			signTouStar() {
				this.logoHttp = '../../static/signIconDown.png';
			},
			// 手指弹起
			signTouEnd() {
				// uni.showLoading({
				// 	title: '加载中'
				// });
				var that = this;
				let serverUrl = that.serverUrl
				this.logoHttp = '../../static/signIconUp.png';
				//从本地缓存中异步获取指定 key 对应的内容
				uni.getStorage({
					key: 'token',
					success: function(res) { //成功
						console.log(res)
						that.tokenIndex = res.data;
						uni.request({
							url: serverUrl + '/memberDetail/select', //获取微信授权信息
							header: {
								'Content-Type': 'json',
								'token': that.tokenIndex
							},
							success: (res) => {
								console.log(res)
								that.memberName = res.data.result.memberName;
								console.log(that.memberName != null)
								if (that.memberName != null) {
									uni.setStorageSync('resultId', res.data.result.id); //将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
									uni.getSetting({
										success: (res) => {
											console.log(res)
											if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] !=
												true) { //非初始化进入该页面,且未授权
												uni.showModal({
													title: '是否授权当前位置',
													content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
													success: function(res) {
														console.log(res)
														if (res.cancel) {
															uni.showToast({
																title: '授权失败',
																icon: 'success',
																duration: 1000
															})
															uni.hideLoading();
														} else if (res.confirm) {
															uni.openSetting({
																success: function(dataAu) {
																	console.log(dataAu)
																	if (dataAu.authSetting["scope.userLocation"] == true) {
																		uni.showToast({
																			title: '授权成功',
																			icon: 'success',
																			duration: 1000
																		})
																		//再次授权，调用getLocationt的API
																		that.getLocation();

																	} else {
																		uni.showToast({
																			title: '授权失败',
																			icon: 'success',
																			duration: 1000
																		})
																		uni.hideLoading();
																	}
																}
															})
														}
													}
												})
											} else if (res.authSetting['scope.userLocation'] == undefined) { //初始化进入
												that.getLocation();
											} else { //授权后默认加载
												that.getLocation();

											}
										}
									})

								} else {
									uni.setStorageSync('resultId', res.data.result.id); //将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
									uni.hideLoading();
									uni.navigateTo({
										url: "../massage/massage"
									})

								}
							},
						})
					},
					fail(res) {
						uni.hideLoading();
						uni.navigateTo({
							url: "../Authorization/Authorization"
						})
					}
				});



			},
			getLocation() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						uni.setStorageSync('signLongitude', res.longitude); //经度
						uni.setStorageSync('signLatitude', res.latitude); //纬度
						uni.hideLoading();
						uni.redirectTo({
							url: "../myMes/myMes"
						})
						uni.hideLoading();
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

	.page-tittle {
		padding-top: 80upx;
		padding-bottom: 30upx;
		font-size: 19px;
	}

	.page-nav {
		padding-bottom: 100upx;
		font-size: 19px;
	}

	.logo {
		width: 480upx;
		height: 480upx;
		margin-bottom: 80upx;
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
		color: #1aad19;

	}

	.sign-font-nav {
		font-size: 15px;
		color: #999999;
		margin-top: 34upx;
	}
</style>
