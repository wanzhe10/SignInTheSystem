<template>
	<view class="page">
		<view class="page-form">
			<view class="page-item  page-block">
				<view class="page-font">姓名：</view><input type="text" value="" />
			</view>
			<view class="page-item page-block">
				<view class="page-font">所在医院：</view>
				<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
					<view class="uni-input">{{multiArray[0][multiIndex[0]]}}</view>
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

<script>
	export default {
		data() {
			return {
				multiIndex: [0, 0, 0],
				multiArray: [
					['无脊柱动物', '脊柱动物'],
					['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
					['猪肉绦虫', '吸血虫'],
					['无脊柱动物', '脊柱动物'],

				],
				province: '', //存放省的数组如：['广东省'，'湖南省',````]，arr类型
				cityList: '', //放某省内的市如：{'广东省':['广州市'，'深圳市'],'北京市'：['北京市','什么市']}，obj类型
				countyHospatel: '', //医院
			}
		},
		onLoad() {
			// this.cityListHostpatel();
		
					var that = this;
						var serverUrl = that.serverUrl
		// 省-市-医院 三级列表数据查询接口
				uni.request({
					url: serverUrl + '/city/selectByCityLevel',
					method: "GET",
					success: (res) => {
						// debugger
						console.log(res.data);
						if (res.data.code == 20000) {
							that.result = res.data.result;
							 // that.result=JSON.parse(JSON.stringify(res.data.result));
							console.log(that.result)
							// var oneResult = that.result
							// for (let i = 0; i < oneResult.length; i++) {
							// 	console.log(oneResult[i].cityName)
							// }
							// var myArray= new Array()
							
							// console.log(res.data.result);
						}
					}
				});
			// 科室两级联动列表
			// uni.request({
			// 		url: serverUrl + '/branch/multistage',
			// 		method: "GET",
			// 		success: (res) => {
			// 			// debugger
			// 			console.log(res.data);
			// 			if (res.data.status == 200) {
			// 				// that.carouseList = res.data.data;
			// 			}
			// 		}
			// 	});

		},
		methods: {
	// 			cityListHostpatel(){
	// 				var that = this;
	// 				var serverUrl = that.serverUrl
	// // 省-市-医院 三级列表数据查询接口
	// 		uni.request({
	// 			url: serverUrl + '/city/selectByCityLevel',
	// 			method: "GET",
	// 			success: (res) => {
	// 				// debugger
	// 				// console.log(res.data);
	// 				if (res.data.code == 20000) {
	// 					that.result = res.data.result;
	// 					console.log(that.result)
	// 					// console.log(res.data.result);
	// 				}
	// 			}
	// 		});
	// 			},
		
			succeed() {
				uni.navigateTo({
					url: "../succeed/succeed"
				})
			},
			bindMultiPickerColumnChange: function(e) {
				// var that = this;
				console.log(this.result);
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.multiIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0:
						switch (this.multiIndex[0]) {
							case 0:
								this.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']
								this.multiArray[2] = ['猪肉绦虫', '吸血虫']
								break
							case 1:
								this.multiArray[1] = ['鱼', '两栖动物', '爬行动物']
								this.multiArray[2] = ['鲫鱼', '带鱼']
								break
						}
						this.multiIndex[1] = 0
						this.multiIndex[2] = 0
						break
					case 1:
						switch (this.multiIndex[0]) {
							case 0:
								switch (this.multiIndex[1]) {
									case 0:
										this.multiArray[2] = ['猪肉绦虫', '吸血虫']
										break
									case 1:
										this.multiArray[2] = ['蛔虫']
										break
									case 2:
										this.multiArray[2] = ['蚂蚁', '蚂蟥']
										break
									case 3:
										this.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓']
										break
									case 4:
										this.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物']
										break
								}
								break
							case 1:
								switch (this.multiIndex[1]) {
									case 0:
										this.multiArray[2] = ['鲫鱼', '带鱼']
										break
									case 1:
										this.multiArray[2] = ['青蛙', '娃娃鱼']
										break
									case 2:
										this.multiArray[2] = ['蜥蜴', '龟', '壁虎']
										break
								}
								break
						}
						this.multiIndex[2] = 0
						break
				}
				this.$forceUpdate()
			},


		}
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
