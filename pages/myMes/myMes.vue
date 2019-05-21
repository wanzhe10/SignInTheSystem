<template>
	<view class="page contant">
		<view class="qrimg">
			<tki-qrcode ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground"
			 :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" @result="qrR" />
		</view>
		<!-- <button type="primary" @tap="saveQrcode">保存到图库</button> -->
	</view>
</template>

<script>
	// import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import tkiQrcode from "../../components/tki-qrcode/tki-qrcode.vue"
	export default {
		data() {
			return {
				val: '二维码', // 要生成的二维码值
				size: 600, // 二维码大小
				unit: 'upx', // 单位
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '../../static/favicon.jpg', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				resultId: '',
				memberResume: '',
				signLongitude: '',
				signLatitude: '',
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
			that.val = myMesJsonStr;
		},
		methods: {
			// 保存二维码
			// saveQrcode() {
			// 	this.$refs.qrcode._saveCode()
			// },
			qrR(res) {
				this.src = res
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
		align-items: ceter;
		    -webkit-align-items: center;
	}
	.qrimg {
		text-align: center;
	}
</style>
