<template>
	<view class="page">
		<view class="page-form">
			<view class="page-item  page-block">
				<view class="page-font">姓名：</view><input type="text" value="" />
			</view>
			<view class="page-item page-block">
				<view class="page-font">所在医院：</view>
				<block v-if="hospatalSleShow =='true'">
					<navigator url="../search/search">
						<view class="page-font-hospatal">
							选择我
						</view>
					</navigator>
				</block>
				<block v-if="hospatalShow === 'true'" class="page-item">
					<input type="text" value="" style="width: 65%;" placeholder="请输入医院" />
				</block>
			</view>
			<view @click.native="handImport" v-html="handImportHtml" class="handImportHtml">
			</view>


			<view class="page-item page-block">
				<view class="page-font">所在科室：</view>
				<block v-if="officeSleShow === 'true'">
					<navigator url="../search/search">
						<view class="page-font-hospatal">
							选择我
						</view>
					</navigator>
				</block>
				<block v-if="officeShow == 'true'" class="page-item">
					<input type="text" value="" style="width: 65%;" placeholder="请输入医院" />
				</block>
			</view>
			<view @click="handImportOffce" v-html="handImportHtmlOffce" class="handImportHtml">
			</view>
			<!-- 	<view class="page-item page-block">
				<view class="page-font">所在科室：</view>
				<picker @change="bindPickerChange2" :value="index2" :range="array">
					<view class="uni-input">{{array[index2]}}</view>
				</picker>
			</view> -->
			<view class="page-item page-block">
				<view class="page-font">联系电话：</view><input type="number" maxlength="11" value="" />
			</view>
		</view>
		<button type="primary" class="page-button" @click="succeed">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				index2: 0,
				hospatalShow: 'false',
				officeShow: 'false',
				handImportHtml: '手动填写',
				handImportHtmlOffce: '手动填写',
				hospatalSleShow: 'true',
				officeSleShow: 'true'
			}
		},
		onLoad() {

		},
		methods: {
			succeed() {
				uni.navigateTo({
					url: "../succeed/succeed"
				})
			},
			bindPickerChange: function(e) {
				console.log(1)
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindPickerChange2: function(e) {
				console.log(1)
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.target.value
			},
			// 手动输入
			handImport() {
				console.log(this.hospatalShow)
				// console.log(this.hospatalShow === 'false')
				// hospatalShow   医院输入框
				// officeShow   医院选择框
				if (this.hospatalShow === 'false') {
					this.handImportHtml = '选择填写'
					this.hospatalShow = "true"
					this.hospatalSleShow = "flase"
				} else {
					this.handImportHtml = '手动填写'
					this.hospatalShow = "false"
					this.hospatalSleShow = "true"
				}
			},
			handImportOffce() {
				// officeSleShow   科室选择框
				// officeShow   科室输入框
				// handImportHtmlOffce 
				console.log(this.officeShow)
				if (this.officeShow === 'false') {
					this.handImportHtmlOffce = '选择填写'
					this.officeShow = "true"
					this.officeSleShow = "flase"
				} else {
					this.handImportHtmlOffce = '手动填写'
					this.officeShow = "false"
					this.officeSleShow = "true"
				}
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
