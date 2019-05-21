<template>
	<view class="page contant">
		<view class="signIconBox" @touchstart='signTouStar' @touchend="signTouEnd">
			<image :src="logoHttp" class="logo"></image>
			<view class="sign-font">点击签到</view>
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
							url: serverUrl + '/memberDetail/select?token=' + that.tokenIndex, //获取微信授权信息
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
									uni.navigateTo({
										url: "../succeed/succeed"
									})
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
