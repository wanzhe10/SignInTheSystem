<template>
	<view class="page contant">
		<view class="page-tittle">
			您的专属信息二维码
		</view>
		<view class="qrvalBox">
			<qrcode :val="qrval" :size="qrsize" ref="qrcode"></qrcode>
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
		<button class="mini-btn" type="primary" @click="goIndexSue">成功</button>
		<button class="mini-btn" type="primary" @click="goIndexDel">失败</button>
		<image src="../../static/advertising.png" class="advertising"></image>
	</view>
</template>
<script>
	import qrcode from '../../components/qrcode/qrcode.vue'

	export default {
		data() {
			return {
				qrval: '{"memberId":"","signLongitude":"","signLatitude":""}', //内容
				qrsize: 200,
			}
		},
		onLoad() {
			let that = this;
			let serverUrl = that.serverUrl;
			that.resultId = uni.getStorageSync('resultId');
			that.memberResume = uni.getStorageSync('memberResume');
			that.signLongitude = uni.getStorageSync('signLongitude');
			that.signLatitude = uni.getStorageSync('signLatitude');
			var myMesJson = {
				memberId: that.resultId,
				signLongitude: that.signLongitude,
				signLatitude: that.signLatitude
			};
			var myMesJsonStr = JSON.stringify(myMesJson);
			that.qrval = myMesJsonStr;
			console.log(that.qrval)
			that.$refs.qrcode.creatQrcode();
			
			uni.connectSocket({
				url: 'wss://www.example.com/socket'
			});
			uni.onSocketOpen(function(res) {
				console.log('WebSocket连接已打开！');
			});
			
			
		},
		methods: {
				goIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			goIndexSue(){
					uni.redirectTo({
					url: "../signSucceed/signSucceed"
				})	
			},
			goIndexDel(){
				uni.redirectTo({
					url: "../signDefeated/signDefeated"
				})	
			}
		},
		components: {
			qrcode
		}
	}
</script>
<style>
	.contant {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-top:100upx;
		text-align: center;
	}
	.page-tittle{
		font-size: 12px;
		color:#222222;
		margin-bottom: 30upx;
	}
	.qrvalBox{
		width: 500upx;
		height: 500upx;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.page-font-green{
		font-size: 14px;
		color:#1aad19;
		padding:40upx 0 20upx 0;
	}
	.page-font{
		font-size: 14px;
		color:#999999;
		padding-bottom: 20upx;
	}
	.mgt46 {
		margin-top: 46upx;
		width: 400upx;
	}
	.advertising{
		padding-top:160upx;
		width: 670upx;
		height: 150upx;
	}
</style>
