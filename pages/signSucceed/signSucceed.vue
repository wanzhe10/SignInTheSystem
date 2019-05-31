<template>
	<view class="page contant">
		<view class="page-main">
			<image src="../../static/SignSucceed.png" class="SignSucceed"></image>
			<view class="SignSucceed-font">
				签到成功
			</view>
			<image src="../../static/SignSucceed-icon.png" class="SignSucceed-icon"></image>
			<view class="mgt30">
				<button class="mini-btn" type="primary" @click="goBlack">去填写</button>
			</view>
			<view class="mgt30">
				<button class="mini-btn" type="default" @click="goIndex">回首页</button>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad(e) {
		
		},
		methods: {
			goIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			goBlack() {
				uni.switchTab({
					url: '/pages/blank/blank'
				});

			}
		},
	}
</script>

<style>
	.contant {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.page-main{
		padding-top:170upx;
		text-align: center;
	}

	.mgt30 {
		width: 400upx;
		margin:30upx auto;
	}
	.SignSucceed{
		width: 160upx;
		height: 160upx;
		padding-bottom: 40upx;
	}
	.SignSucceed-font{
		font-size: 16px;
		color:#1aad19;
		padding-bottom: 74upx;
	}
	.SignSucceed-icon{
		width: 638upx;
		height: 232upx;
		padding-bottom: 54upx;
	}
</style>
