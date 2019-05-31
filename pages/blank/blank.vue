<template>
	<view class="page contant">
		<view class="">
		
		 <form @submit="formSubmit" @reset="formReset">
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
				  <view class="uni-btn-v">
                    <button formType="submit">Submit</button>
                </view>
				</form>
			</view>
		</view>
	</view>
	
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			},
			formReset: function(e) {
				console.log('清空数据')
				this.chosen = ''
			}
		},
	}
</script>

<style>
	.contant{
		padding:20upx;
	}
.topic{
	background-color: #fff;
	margin:30upx 0upx;
	padding:20upx;
}
label{
	display: block;
	padding: 10upx 0;
}
</style>
