<template>
	<view class="page contant">
		<button type="primary" open-type='getUserInfo' @getuserinfo="wxGetUserInfo" withCredentials="true">点击授权</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			wxGetUserInfo(res) {
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
						uni.request({
							url: serverUrl + '/login/weChat/oauth?code=' + loginRes.code,
							header: {
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							success: (res) => {
								 //将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
								uni.setStorage({
									key: 'token',
									data:  res.data.result,
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

<style>
.contant{
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
