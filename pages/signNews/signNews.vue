<template>
	<view class="page contant">
		<view class="page-top">
			<image src="../../static/hospatel1.jpg"></image>
			<image src="../../static/hospatel2.jpg"></image>
		</view>
		<view class="page-form">
			<view class="page-font-contant">
				<view class="page-font">您的姓名</view>
				<view class="page-font2">(实名签到,请您填写真实信息,方便会务人员联系您)</view>
			</view>
			<input type="text" value="" v-model="signName" />
			<view class="page-font">所在医院：</view>
			<input type="text" value="" v-model="signHospatel" />
			<view class="page-font">所在科室：</view>
			<input type="text" value="" v-model="signOffeice" />
			<view class="page-font">联系电话：</view>
			<input type="number" maxlength="11" value="" v-model="signNum" />
		</view>
		<button type="primary" class="page-button" @click="succeed">保存修改</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				signName: '', //姓名
				signNum: '', //电话
				signHospatel: '', //医院
				signOffeice: '', //科室
				token: ''
			}
		},
		onLoad() {
				var that = this;
			var serverUrl = that.serverUrl
			that.token = uni.getStorageSync('token');
					uni.request({
					url: serverUrl + '/memberDetail/select',
					method: "GET",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"token": that.token
					},
					success: (res) => {
						console.log(res.data.result)
						if (res.data.code == 20000) {
							if(res.data.result.memberName !== undefined || res.data.result.memberName !== ''){
									this.signName = res.data.result.memberName;
									this.signNum = res.data.result.telephone;
									this.signHospatel = res.data.result.hospitalName;
									this.signOffeice = res.data.result.branchName;
							}
						} else {
							this.signName = '';
							this.signNum = '';
							this.signHospatel = '';
							this.signOffeice = '';
						}
					},
				})
		},
		methods: {
			checkMobile(mobile) {
				return RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/).test(mobile);
			},
			succeed() {
				if (this.signName == '') {
					uni.showToast({
						title: "名字不能为空	",
						icon: 'none'
					})
				} else if (this.signHospatel == '') {

					uni.showToast({
						title: "医院不能为空",
						icon: 'none',
					})
				} else if (this.signOffeice == '') {

					uni.showToast({
						title: "科室不能为空",
						icon: 'none',
					})
				} else if (this.signNum == '') {

					uni.showToast({
						title: "手机号不能为空",
						icon: 'none',
					})
				} else if (!this.checkMobile(this.signNum)) {
					uni.showToast({
						title: "手机号格式不正确",
						icon: 'none',
					})
				} else {
					var that = this;
					var serverUrl = that.serverUrl
					that.token = uni.getStorageSync('token');
					uni.request({
						url: serverUrl + '/memberDetail/update',
						method: "POST",
						data: {
							memberName: that.signName,
							telephone: that.signNum,
							hospitalId: that.signHospatel,
							branchId: that.signOffeice,
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							"token": that.token
						},
						success: (res) => {
							console.log(res)
							if (res.data.code == 20000) {
								uni.showToast({
								title: "修改成功",
								icon: 'success',
							})	
							} else {
								uni.showToast({
									title: "修改失败",
									icon: 'none',
								})
							}
						},
					})
				}
			},
		},
	}
</script>

<style>
	.contant {
		padding: 25upx;
	}

	.page-top {
		margin-bottom: 50upx;
	}

	.page-top image {
		width: 184upx;
		height: 38upx;
		margin-right: 30upx;

	}

	.page-form {
		display: flex;
		flex-direction: column;
	}

	.page-font-contant {
		display: flex;
		align-items: baseline;
	}

	.page-font {
		font-size: 14px;
		padding: 20upx 0;
	}

	.page-font-contant .page-font2 {
		font-size: 11px;
		color: #555555;
		padding-left: 20upx;
	}

	input {
		height: 95upx;
		line-height: 95upx;
		border-radius: 8px;
		font-size: 14px;
		background-color: #fff;
		padding-left: 20upx;
	}

	.page-button {
		margin-top: 100upx;
	}

	.handImportHtml {
		font-size: 14px;
		color: #007aff;
		margin-bottom: 30upx;
		margin-left: 20upx;
		;
	}

	.page-font-hospatal {
		font-size: 18px;
	}
</style>
