<template>
	<view class="page contant">
		<form @submit="formSubmit" class="page-form" v-show="visible == 1">
			<view class="uni-form-item uni-column topic" v-for="(item,index) in surveyArr" :key='index'>
				<view class="titleBox">
					<view class="title">{{index+1}}.{{item.name}}
						<view class="" v-show="item.type == 'SINGLE'">(单选)</view>
						<view class="" v-show="item.type == 'MULTIPLE'">(多选)</view>
						<view class="" v-show="item.type == 'COMPLETION'">(填空)</view>
					</view>
				</view>
				<radio-group :name="item.id" v-if="item.type == 'SINGLE'">
					<label v-for="(itemson,index) in item.childList" :key='index'>
						<radio :value="itemson.id" data='0' />{{itemson.name}}
					</label>
				</radio-group>
				<checkbox-group :name="item.id" v-if="item.type == 'MULTIPLE'">
					<label v-for="(itemson,index) in item.childList" :key='index'>
						<checkbox :value="itemson.id" />{{itemson.name}}
					</label>
				</checkbox-group>
				<view class="uni-form-item uni-column">
					<input class="uni-input" :name="item.id" v-if="item.type == 'COMPLETION'" placeholder="请输入" />
				</view>
			</view>
			<view class="mgt30">
				<button formType="submit" type='primary'>提交</button>
			</view>
		</form>
		<view class="page-main" v-show="visible == 0">
			<image src="../../static/SignSucceed.png" class="SignSucceed"></image>
			<view class="SignSucceed-font">
				您已填写过本次调查问卷
			</view>
			<view class="SignSucceed-font-small">
				感谢您的参与
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				visible: -1,
				token: "",
				surveyArr: [],
				sinArray: [], //单选
				muArray: [], //多选
			}
		},
		onLoad() {
			var that = this;
			var serverUrl = that.serverUrl
			that.token = uni.getStorageSync('token');
			if (that.token == '' || that.token == undefined) {
				uni.redirectTo({
					url: "../Authorization/Authorization"
				})
			} else {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: serverUrl + '/questionnaire/selectByMeet', //获取微信授权信息
					method: "GET",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': that.token
					},
					success: (res) => {
						console.log(res)
						uni.hideLoading();
						if (res.data.result == '您已填写过问卷') {
							that.visible = 0;
						} else {
							that.visible = 1;
							that.surveyArr = res.data.result;
						}
					},
					fail(res) {
						uni.showToast({
							title: "查询失败，请联系管理员",
							icon: 'none',
						})
					}
				})
			}


		},
		methods: {
			formSubmit: function(e) {
				var that = this;
				var serverUrl = that.serverUrl
				var token = uni.getStorageSync('token');
				var resultId = uni.getStorageSync('resultId');
				// console.log(e.detail.value)
				var NumBase = e.detail.value
				for (var key in NumBase) {
					// console.log(key + " " + NumBase[key])
					if (NumBase[key] == "") {
						uni.showToast({
							title: "有未答题目",
							icon: 'none',
						})
						return false;
					} else {
						var selectVaule = JSON.stringify(e.detail.value);
					}
				}
				console.log(selectVaule)
				uni.request({
					url: serverUrl + '/questionnaireRecord/insert', //获取微信授权信息
					method: "POST",
					data: {
						meetingId: '',
						memberId: '',
						recordJson: selectVaule,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': token
					},
					success: (res) => {
						uni.redirectTo({
							url: "../submit/submit"
						})

					},
					fail(res) {
						uni.showToast({
							title: "失败重试",
							icon: 'none',
						})
					}
				})
			},
		},
	}
</script>

<style>
	.contant {
		padding: 20upx;
	}

	/* 	.page-form {
		display: flex;
		flex-direction: column;
		justify-content: center;
	} */
	.title {
		display: flex;
		flex-wrap: wrap;
		padding: 10upx 0;
	}

	.topic {
		background-color: #fff;
		margin: 30upx 0upx;
		padding: 20upx;
	}

	label {
		display: block;
		padding: 10upx 0;
	}

	.mgt30 {
		width: 400upx;
		margin: 30upx auto;
	}

	.page-main {
		padding-top: 170upx;
		text-align: center;
	}

	.SignSucceed {
		width: 160upx;
		height: 160upx;
		padding-bottom: 40upx;
	}

	.SignSucceed-font {
		font-size: 16px;
		color: #222222;
		padding-bottom: 74upx;
		font-weight: bold;
	}

	.SignSucceed-font-small {
		font-size: 14px;
		color: #222222;
	}
</style>
