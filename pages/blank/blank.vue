<template>
	<view class="page contant">
		<form @submit="formSubmit" class="page-form" v-show="visible == 1">
			<view class="uni-form-item uni-column topic">
				<view class="title">1、医院级别1医院级别1医院级别1医院级别1医院级别1医院级别1医院级别1 (单选题)</view>
				<radio-group name="医院级别1">
					<label>
						<radio value="radio1" />选项一
					</label>
					<label>
						<radio value="radio2" />选项二
					</label>
				</radio-group>
			</view>

			<view class="uni-form-item uni-column topic">
				<view class="title">医院级别2 (多选题)</view>
				<checkbox-group name="医院级别2">
					<label>
						<checkbox value="checkbox1" />选项一选项一选项一选项一选项一选项一选项一
					</label>
					<label>
						<checkbox value="checkbox2" />选项二
					</label>
					<label>
						<checkbox value="checkbox3" />选项三
					</label>
					<label>
						<checkbox value="checkbox4" />选项四
					</label>
				</checkbox-group>
			</view>
			<view class="mgt30">
				<button formType="submit" type='primary'>提交</button>
			</view>
		</form>
		<view class="page-main"  v-show="visible == 0">
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
				visible: 1,
			}
		},
		methods: {
			formSubmit: function(e) {

				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				uni.redirectTo({
					url: "../submit/submit"
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
