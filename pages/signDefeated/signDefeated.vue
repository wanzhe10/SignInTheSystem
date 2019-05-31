<template>
	<view class="page contant">
		<view class="page-main">
			<image src="../../static/Signdeu.png" class="SignSucceed"></image>
			<view class="SignSucceed-font">
				签到失败
			</view>
			<image src="../../static/Signdeu-icon.png" class="SignSucceed-icon"></image>
			<view class="mgt30">
				<button class="mini-btn" type="primary" @click="signAgin">重新签到</button>
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
			signAgin() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						// console.log('当前位置的经度：' + res.longitude);
						// console.log('当前位置的纬度：' + res.latitude);
						uni.setStorageSync('signLongitude', res.longitude); //经度
						uni.setStorageSync('signLatitude', res.latitude); //纬度
						uni.navigateTo({
							url: "../myMes/myMes"
						})
					}
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
		margin-top: 30upx;
		width: 400upx;
	}
	.SignSucceed{
		width: 160upx;
		height: 160upx;
		padding-bottom: 40upx;
	}
	.SignSucceed-font{
		font-size: 16px;
		color:#222222;
		padding-bottom: 288upx;
		}
		.SignSucceed-icon{
			width: 397upx;
			height: 73upx;
			padding-bottom: 54upx;
		}
		/* .mini-btn{
			margin-
		} */
</style>
