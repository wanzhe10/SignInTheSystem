<template>
	<view class="page">
		<view class="page-form">
			<view class="page-item  page-block">
				<view class="page-font">姓名：</view><input type="text" value="" v-model="signName" />
			</view>
			<view class="page-item page-block" style="width: 100%;">
				<view class="page-font">所在医院：</view>
				<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex3" :range="multiArray3"
				 range-key="name" style="min-width: 65%;">
					<view class="uni-input">{{multiArray3[0][multiIndex3[0]].name}}{{multiArray3[1][multiIndex3[1]].name}}{{multiArray3[2][multiIndex3[2]].name}}</view>
				</picker>
			</view>

			<view class="page-item page-block">
				<view class="page-font">所在科室：</view>
				<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChangeOffice" :value="officeIndex" :range="officeArray"
				 range-key="branchName" style="min-width: 65%;">
					<view class="uni-input">{{officeArray[0][officeIndex[0]].branchName}}{{officeArray[1][officeIndex[1]].branchName}}</view>
				</picker>
				<view>
				</view>
			</view>
		</view>
		<view class="page-item page-block">
			<view class="page-font">联系电话：</view><input type="number" maxlength="11" value="" v-model="signNum" />
		</view>
		<button type="primary" class="page-button" @click="succeed">确定</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				signName: '',
				signNum: '',
				multiIndex3: [0, 0, 0], // 所在医院各列下标
				multiArray3: [ // 所在医院数据
					[{
						"name": ""
					}],
					[{
						"name": ""
					}],
					[{
						"name": ""
					}]
				],
				officeIndex: [0, 0], // 所在科室各列下标
				officeArray: [ // 所在科室数据
					[{
						"branchName": ""
					}],
					[{
						"branchName": ""
					}]
				],
				//这里multiArray3是传进多列picker的数组
				// requestData: [],
				provinceList: {}, //存放省的数组如：['广东省'，'湖南省',````]，arr类型
				cityList: {}, //放某省内的市如：{'广东省':['广州市'，'深圳市'],'北京市'：['北京市','什么市']}，obj类型
				countyHospatelList: {}, //医院 

				advocateOfficeList: {}, //一级科室
				hospitalId: '', //医院ID
				officeId: '', //科室id
				token:''

			}
		},
		onLoad() {
			this.getAddress();
			this.getOffice();

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
					// console.log('通过');
					// console.log(this.hospitalId);
					// console.log(this.officeId);
						var that = this;
					var serverUrl = that.serverUrl
					// console.log(that.signName)
					// console.log(that.signNum)
					// console.log(that.hospitalId)
					// console.log(that.officeId)
				 that.token = uni.getStorageSync('token');
					uni.request({
						url: serverUrl + '/memberDetail/update',
						method: "POST",
						data: {
							memberName: that.signName,
							telephone: that.signNum,
							hospitalId: that.hospitalId,
							branchId: that.officeId,
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							"token":that.token
						},
						success: (res) => {
							console.log(res)
							if (res.data.code == 20000) {
								uni.navigateTo({
									url: "../succeed/succeed"
								})
							}
						},
					})

				}

			},
			bindMultiPickerColumnChange(e) {
				let hospitalId;
				switch (e.target.column) {
					case 0: //第一列改变时
						let arr = this.provinceList[this.multiArray3[0][e.target.value].id];
						this.$set(this.multiArray3, 1, []) //先清空multiArray3的第1项（其实这一步没必要，只是为了逻辑的完整）
						this.$set(this.multiArray3, 1, arr); //设置第二列数据
						let arr2 = this.cityList[this.provinceList[this.multiArray3[0][e.target.value].id][0].id];
						hospitalId = arr2[0].id;
						if (arr2) {
							this.$set(this.multiArray3, 2, arr2); //设置第三组数据
						} else {
							this.$set(this.multiArray3, 2, ['-']);
						}
						this.$set(this.multiIndex3, 0, e.target.value); //设置当前显示的下标
						this.$set(this.multiIndex3, 1, 0);
						this.$set(this.multiIndex3, 2, 0); //又来吐槽一下小程序，真是糟糕的设计
						break;
					case 1:
						let arr3 = this.cityList[this.multiArray3[1][e.target.value].id];
						hospitalId = arr3[0].id;
						this.$set(this.multiArray3, 2, [])
						if (arr3) {
							this.$set(this.multiArray3, 2, arr3)
						} else {
							this.$set(this.multiArray3, 2, ['-']);
						}
						this.$set(this.multiIndex3, 1, e.target.value)
						this.$set(this.multiIndex3, 2, 0);
						break;
					case 2:
						this.hospitalId = this.multiArray3[2][e.target.value].id;
						this.$set(this.multiIndex3, 2, e.target.value);
						break;
				}
				console.log(this.hospitalId)

			},
			getArr(address, arr) { //返回一个选中项后，对应的下级数组，例如，选中了广东省，那么就从this.cityList中找出key为广东省的value ：['广州市'，'深圳市']
				for (let p in arr) {
					if (address == p) {
						return arr[p]
					}
				}
			},
			getAddress() { //获取传入的数据
				// let province = []; //['广东省','广西省','湖南省']
				var that = this;
				var serverUrl = that.serverUrl
				// 省-市-医院 三级列表数据查询接口
				uni.request({
					url: serverUrl + '/city/selectByCityLevel',
					method: "GET",
					success: (res) => {
						if (res.data.code == 20000) {
							// that.result = res.data.result;
							// var oneResult = that.result;
							// this.requestData = oneResult;
							// console.log(this.requestData)
							let province = []; //['广东省','广西省','湖南省']
							let cityArr = []; //{'广东省':['广州市'，'深圳市']}放某省内的市
							let countyHospatelArr = []; //{'广州市':['番禺区'，'增城区']}放某区市的区
							res.data.result.forEach((val) => {
								if (val.cityName != '') {
									province.push({
										"id": val.id,
										"name": val.cityName
									});
									if (val.cityList != '') {
										let arr = [];
										val.sonCityList.forEach(val1 => {
											arr.push({
												"id": val1.id,
												"name": val1.cityName
											});
											if (val1.countyHospatel != '') {
												let hospitalEntity = {};
												let arr2 = []
												val1.cityHospital.forEach(val2 => {
													arr2.push({
														"id": val2.hospitalId,
														"name": val2.hospitalName
													});
												})
												countyHospatelArr = arr2;
												this.cityList[val1.id] = arr2;
											}
										})
										cityArr = arr;
										this.provinceList[val.id] = arr;
									}
								}
							})
							this.multiArray3[0] = province
							this.multiArray3[1] = this.provinceList[province[0].id];
							this.multiArray3[2] = this.cityList[this.provinceList[province[0].id][0].id];
							this.hospitalId = this.multiArray3[2][0].id; // 医院id
						}
					},
				})
			},
			bindMultiPickerColumnChangeOffice(e) {
				// let officeId;
				switch (e.target.column) {
					case 0: //第一列改变时
						let arr = this.advocateOfficeList[this.officeArray[0][e.target.value].id];
						console.log(arr)
						console.log(arr)
						this.$set(this.officeArray, 1, []) //先清空advocateOffice的第1项（其实这一步没必要，只是为了逻辑的完整）
						if (arr) {
							this.$set(this.officeArray, 1, arr); //设置第二列数据
						} else {
							this.$set(this.officeArray, 1, ['-']); //设置第二列数据
						}
						this.$set(this.officeIndex, 0, e.target.value); //设置当前显示的下标
						break;
					case 1:
						this.officeId = this.officeArray[1][e.target.value].id;
						this.$set(this.officeIndex, 1, e.target.value);
						break;
				}
				console.log(this.officeId)
			},
			getOffice() {
				var that = this;
				var serverUrl = that.serverUrl
				// 科室联动查询
				uni.request({
					url: serverUrl + '/branch/multistage',
					method: "GET",
					success: (res) => {
						if (res.data.code == 20000) {
							var Office = res.data.result;
							let advocateOffice = []; //['外科','内科','其他科室']
							let assistantOffice = []; //{'外科':['胸外科'，'骨科']}放二级科室
							// console.log(Office)
							res.data.result.forEach((val) => {
								if (val.branchName != '') {
									advocateOffice.push({
										"id": val.id,
										"branchName": val.branchName
									});
									if (val.childList != '') {
										let arr = [];
										val.childList.forEach(val1 => {
											arr.push({
												"id": val1.id,
												"branchName": val1.branchName
											});
											// if (val1.countyHospatel != '') {
											// 	countyHospatelArr = arr2;
											// 	this.childList[val1.id] = arr2;
											// }
										})
										assistantOffice = arr;
										this.advocateOfficeList[val.id] = arr;
										// console.log(assistantOffice)
										// console.log(this.advocateOfficeList[val.id])
									}
								}
							})
							this.officeArray[0] = advocateOffice; //第一列数据
							// this.officeArray[1] = this.advocateOfficeList[advocateOffice[0].id];
							this.officeArray[1] = assistantOffice;
							this.officeId = assistantOffice[0].id;
						}
					},
				})
			}

		},
	}
</script>

<style>
	.page-form {
		display: flex;
		flex-direction: column;
		margin-top: 200upx;
	}

	.page-item {
		display: flex;
		flex-direction: row;
		padding: 20upx;
		margin-bottom: 30upx;
		font-size: 18px;
	}

	.page-font {
		width: 30%;
		text-align: center;
	}

	input {
		width: 70%;
		/* height: 80upx; */
		/* border: 1px solid #ccc; */
		display: inline-block;
		/* line-height: 80upx; */
		border-radius: 8px;
		font-size: 18px;
		padding-left: 20upx;
		;
	}

	.page-button {
		/* width: 400upx; */
		margin-top: 200upx;
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
