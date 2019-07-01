<template>
	<view class="page contant">
		<image src="../../static/authorizationIcon.png" class="authorizationIcon"></image>
		<view class="authorization-font">
			医来医往会务组
		</view>
		<view class="authorization-font ">
			申请获得以下授权：
		</view>
		<view class="authorization-smialfont-box">
			<view class="authorization-smialfont padB64">
				· 获取你的公开信息(昵称、头像、地区及性别)
			</view>
		</view>
		<button type="primary" open-type='getUserInfo' @getuserinfo="wxGetUserInfo" withCredentials="true" class="buttonStyle">我知道了</button>
		<!-- <button  type="primary" open-type='getUserInfo' @getuserinfo="wxGetUserInfo" withCredentials="true">我知道了</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			uni.hideLoading();
		},
		methods: {
			wxGetUserInfo(res) {
				console.log(res)
				var that = this;
				var serverUrl = that.serverUrl;
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}
				//获取微信授权信息 拿到code 调接口换取token
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes)
						// return
						uni.request({
							url: serverUrl + 'login/weChat/oauth?code=' + loginRes.code,
							header: {
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							success: (res) => {
								console.log(res);
								//将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
								uni.setStorage({
									key: 'token',
									data: res.data.result,
									success: function() {
										uni.switchTab({
											url: '../index/index' //授权页
										})
									}
								});

							},
						})
					},
				});
			},
		}
	}
</script>

<style scoped>
	.contant {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150upx;

	}

	.buttonStyle {
		width: 400upx;
	}

	.padB64 {
		padding-top: 64upx;
	}

	.authorizationIcon {
		width: 224upx;
		height: 224upx;
		margin-bottom: 200upx;
	}

	.authorization-font {
		font-size: 16px;
		padding-bottom: 20upx;
		color: #222222;
	}

	.authorization-smialfont-box {
		padding-bottom: 70upx;
	}

	.authorization-smialfont {
		font-size: 14px;
		color: #999999;
		padding-bottom: 20upx;
	}
</style>
