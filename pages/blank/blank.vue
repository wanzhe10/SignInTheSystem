<template>
	<view class="page">
		<view class="page-form">
			<view class="page-item  page-block">
				<view class="page-font">姓名：</view><input type="text" value="" />
			</view>
			<view class="page-item page-block">
				<view class="page-font">所在医院：</view>
				<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex3" :range="multiArray3">
					<view class="uni-input"> aaaa{{multiArray3[0][multiIndex3[0]]}}{{multiArray3[1][multiIndex3[1]]}}{{multiArray3[2][multiIndex3[2]]}}</view>
				</picker>
			</view>
			<view class="page-item page-block">
				<view class="page-font">所在科室：</view>
			</view>
		</view>
		<view class="page-item page-block">
			<view class="page-font">联系电话：</view><input type="number" maxlength="11" value="" />
		</view>
		<button type="primary" class="page-button" @click="succeed">确定</button>
	</view>
</template>
<!-- https://blog.csdn.net/weixin_43743956/article/details/85031747 -->
<script>
	export default {
		data() {
			return {
				multiIndex3: [0, 0, 0],
				multiArray3: [
					[],
					[],
					[]
				], //这里multiArray3是传进多列picker的数组
				province: '', //存放省的数组如：['广东省'，'湖南省',````]，arr类型
				cityList: '', //放某省内的市如：{'广东省':['广州市'，'深圳市'],'北京市'：['北京市','什么市']}，obj类型
				countyHospatel: '', //医院
			}
		},
		onLoad() {
			this.getAddress();
		},
		methods: {
			bindMultiPickerColumnChange(e) {
				
				let val = e.target.value; //每一项改变时，小程序组建传来的当列选中项的index
				console.log(val)
				switch (e.target.column) {
					case 0: //第一列改变时
						let arr = this.getArr(this.province[val], this.cityList)
						this.$set(this.multiArray3, 1, []) //先清空multiArray3的第1项（其实这一步没必要，只是为了逻辑的完整）
						this.$set(this.multiArray3, 1, arr); //设置第二列数据
						let arr2 = this.getArr(arr[0], this.countyList); //从第二列拿出第一项中，在countyList中查找并设置第三列的数组。这么做时为了在选择第一列时，第二列也相应显示出了相应的市，并且第三列联动默认有显示
						if (arr2) {
							this.$set(this.multiArray3, 2, arr2); //设置第三组数据
						} else {
							this.$set(this.multiArray3, 2, ['-']);
						}
						this.$set(this.multiIndex3, 0, val); //设置当前显示的下标
						this.$set(this.multiIndex3, 1, 0);
						this.$set(this.multiIndex3, 2, 0); //又来吐槽一下小程序，真是糟糕的设计
						break;
					case 1:
						let arr3 = this.getArr(this.multiArray3[1][val], this.countyList);
						this.$set(this.multiArray3, 2, [])
						if (arr3) {
							this.$set(this.multiArray3, 2, arr3)
						} else {
							this.$set(this.multiArray3, 2, ['-']);
						}
						this.$set(this.multiIndex3, 1, val)
						this.$set(this.multiIndex3, 2, 0);
						break;
				}
			},
			getArr(address, arr) { //返回一个选中项后，对应的下级数组，例如，选中了广东省，那么就从this.cityList中找出key为广东省的value ：['广州市'，'深圳市']
				for (let p in arr) {
					if (address == p) {
						return arr[p]
					}
				}
			},
			getAddress() { //获取传入的数据
				let province = []; //['广东省','广西省','湖南省']
				var that = this;
				var serverUrl = that.serverUrl
				// 省-市-医院 三级列表数据查询接口
				uni.request({
					url: serverUrl + '/city/selectByCityLevel',
					method: "GET",
					success: (res) => {
						// debugger
						// console.log(res.data);
						if (res.data.code == 20000) {
							that.result = res.data.result;
							// that.result=JSON.parse(JSON.stringify(res.data.result));
							// console.log(that.result)
							var oneResult = that.result
							let province = []; //['广东省','广西省','湖南省']
							let cityList = {}; //{'广东省':['广州市'，'深圳市']}放某省内的市
							let countyList = {}; //{'广州市':['番禺区'，'增城区']}放某区市的区
							// console.log(province)
							res.data.result.forEach((val) => {
								if (val.cityName != '') {
									province.push(val.cityName);
									// console.log(province)
									if (val.cityList != '') {
										let arr = [];
										val.sonCityList.forEach(val1 => {
											arr.push(val1.cityName);
											// console.log(arr)
											if (val1.countyList != '') {
												let arr2 = []
												val1.cityHospital.forEach(val2 => {
													arr2.push(val2.hospitalName)

												})
												// console.log(arr2)
												countyList[val1.cityName] = arr2
												// console.log(countyList)
											}
										})
										cityList[val.cityName] = arr;
									}

								}
							})
							this.province = province;
							this.cityList = cityList;
							this.countyList = countyList;
							this.multiArray3[0] = this.province
							this.multiArray3[1] = this.getArr(this.province[0], this.cityList);
							this.multiArray3[2] = this.getArr(this.multiArray3[1][0], this.countyList);
							console.log(this.province)
							console.log(this.cityList)
							console.log(this.countyList)
						}
					},

				})

			}

		},

		// mounted() {
		//   this.getAddress()
		// },
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
