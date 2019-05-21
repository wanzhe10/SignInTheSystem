<template>
	<view class="page">
		<view class="page-box">
			<view class="succeed-top">
				<view class="">
					北京医学会logo
				</view>
				<view class="">
					北京医学会logo
				</view>
			</view>
		</view>
		<view class="page-box">
			<view class="veryCome">
				欢迎莅临
			</view>
			<view class="veryCome">
				《泌尿系感染规范化诊疗基地学习班》
			</view>
			<view class="succeed-num">
				第2站
			</view>
			<view class="hospatalName">
				位置名称：{{name}}
			</view>
			<view class="hospatalName">
				详细地址：{{address}}
			</view>
			<view class="succeed-time">
				{{time}}
			</view>
		</view>
		<navigator url="../myMes/myMes">
			<button type="primary" class="page-button">签到二维码</button>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				address: '',
				latitude: '',
				longitude: '',
				time: ''

			}
		},
		onLoad() {
			var that = this;
			uni.chooseLocation({
				success: function(res) {
					that.name = res.name;
					that.address = res.address;
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					uni.setStorageSync('signLongitude', res.longitude); //经度
					uni.setStorageSync('signLatitude', res.latitude); //纬度
				}
			});
			this.getSystemTime();
		},
		methods: {
			// 获取系统当前时间
			getSystemTime() {
				var that = this;
				var date = new Date();
				var seperator1 = "-";
				var seperator2 = ":";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				that.time = date.getFullYear() + seperator1 + month + seperator1 + strDate +
					" " + date.getHours() + seperator2 + date.getMinutes() +
					seperator2 + date.getSeconds();
			}

		}
	}
</script>

<style>
	.succeed-top {
		display: flex;
		justify-content: space-between;
		/* margin-top: 30upx; */
	}

	.veryCome {
		text-align: center;
		margin-top: 100upx;
		font-size: 18px;
		font-weight: bold;
	}

	.page-button {
		margin-top: 200upx;
	}
</style>
