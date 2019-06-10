<template>
	<view class="page contant">
		<view class="page-tittle">
			您的专属信息二维码
		</view>
		<view class="qrvalBox">
			<tki-qrcode ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground"
			 :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" @result="qrR" />
		</view>
		<view class="page-font-green">
			*二维码截图签到无效
		</view>
		<view class="page-font">
			请至会议现场打开签到信息
		</view>
		<view class="page-font">
			扫码签到
		</view>
		<view class="mgt46">
			<button class="mini-btn" type="primary" @click="goIndex">回到首页</button>
		</view>
		<image src="../../static/advertising.png" class="advertising"></image>
	</view>
</template>

<script>
	import tkiQrcode from "../../components/tki-qrcode/tki-qrcode.vue"
	export default {
		data() {
			return {
				val: '', // 要生成的二维码值
				size: 500, // 二维码大小
				unit: 'upx', // 单位
				background: '#fff', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#000000', // 角标色
				icon: '../../static/favicon.jpg', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				resultId: '',
				// memberResume: '',
				signLongitude: '',
				signLatitude: '',
			}
		},
		onLoad() {
			let that = this;
			let serverUrl = that.serverUrl;
			let token = uni.getStorageSync('token');
			that.resultId = uni.getStorageSync('resultId');
			// that.memberResume = uni.getStorageSync('memberResume');
			that.signLongitude = uni.getStorageSync('signLongitude');
			that.signLatitude = uni.getStorageSync('signLatitude');
			var myMesJson = {
				memberId: that.resultId,
				signLongitude: that.signLongitude,
				signLatitude: that.signLatitude
			};
			var myMesJsonStr = JSON.stringify(myMesJson);
			that.val = myMesJsonStr;
			uni.connectSocket({
				url: 'wss://www.qlxlm.com/websocket/' + token,
				header: {

					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'GET'
			});
			uni.onSocketMessage(function(res) {
				let socketRes = JSON.parse(res.data);
				console.log(socketRes)
				if (socketRes.type == '' || socketRes.type == undefined) {
					return;
				} else if (socketRes.type === 'SIGN_SUCCESS') {
					uni.redirectTo({
						url: '../signSucceed/signSucceed'
					});
				} else if (socketRes.type === 'ALREADY_SIGN') {
					uni.redirectTo({
						url: '../signNoo/signNoo'
					});
				} else {
					uni.redirectTo({
						url: '../signDefeated/signDefeated'
					});
				}
			});
		},
		methods: {
			qrR(res) {
				this.src = res
			},
			goIndex() {
				uni.switchTab({
					url: "../index/index"
				})
			},
		},
		components: {
			tkiQrcode
		}

	}
</script>

<style>
	.contant {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-top: 100upx;
		text-align: center;
	}

	.page-tittle {
		font-size: 12px;
		color: #222222;
		margin-bottom: 30upx;
	}

	.qrvalBox {
		width: 500upx;
		height: 500upx;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.page-font-green {
		font-size: 14px;
		color: #1aad19;
		padding: 40upx 0 20upx 0;
	}

	.page-font {
		font-size: 14px;
		color: #999999;
		padding-bottom: 20upx;
	}

	.mgt46 {
		margin-top: 46upx;
		width: 400upx;
	}

	.advertising {
		padding-top: 160upx;
		width: 670upx;
		height: 150upx;
	}
</style>
