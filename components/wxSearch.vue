<template>
	<view>
		
	</view>
</template>

<script>
	import * as wxSearch from '../../component/wxSearch';

	export default {
		data() {
			return {
				
			};
		},
		 onLoad: function (options) {
        //初始渲染-读取storage的历史记录
        wxSearch.init(this)
    }
	}
</script>
<style>

</style>
