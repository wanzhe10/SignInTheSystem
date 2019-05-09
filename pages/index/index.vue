<template>
	<view class="page contant">
		<view class="signIconBox"  @touchstart='signTouStar' @touchend="signTouEnd">
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
				logoHttp:'../../static/signIconUp.png'
			}
		},
		onLoad() {

		},
		methods: {
			signTo() {
				
			},
			// 手指按下
			signTouStar(){
				this.logoHttp = '../../static/signIconDown.png';
				// this.logoHttp = '../../static/logo.png';
				console.log(1)
			},
			signTouEnd(){
				this.logoHttp = '../../static/signIconUp.png';
				uni.navigateTo({
					url: '../massage/massage'
				})
			}
		}
	}
</script>

<style>
	.contant{
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
	.sign-font{
		font-size: 18px;
		font-weight: bold;
		}
</style>
