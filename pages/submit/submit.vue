<template>
	<view class="page contant">
		<view class="page-main">
			<icon :type="iconType" size="46" />
			<view class="">
				已提交
			</view>
			<view class="">
				感谢参与
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
				iconType: ['success']
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS|| MP-WEIXIN
			this.iconType = ['success']
			// #endif
			// #ifdef MP-ALIPAY
			this.iconType = ['success']
			// #endif
			// #ifdef MP-BAIDU
			this.iconType = ['success']
			// #endif
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

	.mgt30 {
		margin-top: 30upx;
		width: 400upx;
	}
</style>
