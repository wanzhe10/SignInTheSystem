<template>
	<view class="page">
		<view class="face-wapper">
			<image src="../../static/logo.png" class="face"></image>
		</view>
		<view class="info-list">
			<!-- 我参与的签到 -->
			<navigator url="../signIn/signIn">
		<view class="item-wapper">
			
			<view class="info-words">我参与的签到</view>
			<view class="right-wapper">
				<view class="arrow-block">
					<image src="../../static/left-gray-arrow.png" class="arrow-ico"></image>
				</view>
			</view>
		</view>
		</navigator>

				<!-- 使用说明 -->
				<navigator url="../explain/explain">
		<view class="item-wapper">
			<view class="info-words">使用说明</view>
			<view class="right-wapper">
				<view class="arrow-block">
					<image src="../../static/left-gray-arrow.png" class="arrow-ico"></image>
				</view>
			</view>
		</view>
		</navigator>
				<!-- 联系我们 -->
				<navigator url="../contactUs/contactUs">
		<view class="item-wapper">
			<view class="info-words">联系我们</view>
			<view class="right-wapper">
				<view class="arrow-block">
					<image src="../../static/left-gray-arrow.png" class="arrow-ico"></image>
				</view>
			</view>
		</view>
		</navigator>
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
			
		}
	}
</script>

<style>
/* 头像 start */
.face-wapper {
	display: flex;
	flex-direction: row;
	justify-content: center;
	
	margin-top: 120upx;
	margin-bottom: 120upx;
}

.face {
	width: 160upx;
	height: 160upx;
}
/* 头像 end */

.item-wapper {
	display: flex;
	/* margin-top: 20upx; */
	flex-direction: row;
	justify-content: flex-start;
	background-color: #fff;
	margin-bottom:30upx;
	/* border-bottom: 1px solid red; */
}
.info-words {
	color: #333333;
	font-size: 16px;
	width: 30%;
	line-height: 80upx;
	padding-left: 20upx;
	/* font-weight: bold; */
}
.right-wapper {
	width: 65%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}
.arrow-block {
	margin-left: 10upx;
	line-height: 86upx;
}
.arrow-ico {
	width: 30upx;
	height: 30upx;
}
	.line-wapper {
		padding: 0upx 20upx;
	}
/* 	.line {
		height: 1px;
		background-color: #DBDBDA;
	} */
</style>
