<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.page {
		width: 100%;
		height:100%;
		background-color: #f7f7f7;
		/* background: red; */
		/* padding:20upx; */
		position: absolute;
		
	}
	
	.page-block {
		background-color: #ffffff;
	}
	.page-box{
		padding:20upx;
	}
	
	.line-wapper {
		padding: 0upx 20upx;
	}
	.line {
		height: 1px;
		background-color: #DBDBDA;
	}
</style>
