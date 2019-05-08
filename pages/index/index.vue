<template>
	<view class="page contant">
		<view class="signIconBox" @click="signTo">
			<image src="../../static/logo.png" class="logo"></image>
			<view class="sign-font">签到</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			signTo() {
				uni.navigateTo({
					url: '../massage/massage'
				})
			}
		}
	}
</script>

<style>

	.contant {
		/* display: flex; */
		/* align-items: center; */
		/* justify-content: center; */
	}

	.signIconBox {
		text-align: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;

	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
