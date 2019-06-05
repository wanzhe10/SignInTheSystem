<template>
	<view class="page contant">
		<view class="face-wapper">
			<!-- <image 
			src="../../static/logo.png" 
			class="face"
			@longpress="faceClick"
			></image> -->
			<open-data type="userAvatarUrl" class="face"></open-data>
			<open-data type="userNickName" class="userNickName"></open-data>

		</view>
		<view class="info-list">
			<!-- 签到信息 -->
			<navigator url="../signNews/signNews">
				<view class="item-wapper">
					<view class="info-words">签到信息</view>
					<view class="right-wapper">
						<view class="arrow-block">
							<image src="../../static/left-gray-arrow.png" class="arrow-ico"></image>
						</view>
					</view>
				</view>
			</navigator>
			<!-- 联系我们 -->
			<!-- <navigator url="../contactUs/contactUs"> -->
			<view class="item-wapper" @click="contactUs">
				<view class="info-words">联系我们</view>
				<view class="right-wapper">
					<view class="arrow-block">
						<image src="../../static/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			<!-- </navigator> -->
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
			contactUs() {
				uni.makePhoneCall({
					phoneNumber: '010-56252591' //仅为示例
				});
			}
		}
	}
</script>

<style>
	.contant {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	/* 头像 start */
	.face-wapper {
		display: flex;
		flex-direction: column;
		margin-bottom: 120upx;
		margin: 120upx auto;
	}

	.face {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.userNickName {
		padding-top: 20upx;
	}

	/* 头像 end */

	.item-wapper {
		display: flex;
		/* margin-top: 20upx; */
		flex-direction: row;
		justify-content: flex-start;
		background-color: #fff;
		margin-bottom: 30upx;
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
