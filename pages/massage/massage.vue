<template>
	<view class="page">
		<view class="page-form">
			<view class="page-item ">
				<view class="page-font">姓名：</view><input type="text" value="" />
			</view>
			<view class="page-item">
				<view class="page-font">所在医院：</view>
				<!-- <input type="text" value="" /> -->
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
			<view class="page-item">
				<view class="page-font">所在科室：</view>
				<picker @change="bindPickerChange2" :value="index2" :range="array">
					<view class="uni-input">{{array[index2]}}</view>
				</picker>
			</view>
			<view class="page-item">
				<view class="page-font">联系电话：</view><input type="text" value="" />
			</view>
			<button type="default" plain="true" class="page-button" @click="succeed">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				index2: 0,
			}
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
		}
	}
</script>

<style>
	.page {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		width: 100%;
		height: 100%;
	}

	.page-form {
		display: flex;
		flex-direction: column;
		margin-top: 200upx;
	}

	.page-item {
		display: flex;
		flex-direction: row;
	}

	.page-font {
		width: 200upx;
		text-align: center;
		margin-bottom: 80upx;
	}

	input {
		width: 400upx;
		height: 80upx;
		border: 1px solid #ccc;
		display: inline-block;
		padding-left: 30upx;
		line-height: 80upx;
		border-radius: 8px;
	}

	.page-button {
		width: 400upx;
		margin-top: 200upx;
	}
</style>
