<template>
	<view class="page contant">
		<view class="page-main">
			<image src="../../static/SignSucceed.png" class="SignSucceed"></image>
			<view class="SignSucceed-font">
				提交成功！
			</view>
			<view class="SignSucceed-font-small">
				感谢您的参与
			</view>
			<view class="mgt30">
				<button class="mini-btn" type="primary" @click="goIndex">回首页</button>
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
		methods: {
			goIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
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
	.SignSucceed{
		width: 160upx;
		height: 160upx;
		padding-bottom: 40upx;
	}
		.SignSucceed-font{
		font-size: 16px;
		color:#222222;
		padding-bottom: 40upx;
		font-weight: bold;
	}
	.SignSucceed-font-small{
		font-size: 14px;
		color:#222222;
	}
	.mgt30 {
		margin-top: 340upx;
		width: 400upx;
	}
</style>
