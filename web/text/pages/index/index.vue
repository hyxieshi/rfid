<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<button @click="openCamera(1)">拍照</button>
			<button @click="openCamera(2)">视频</button>
			<scan></scan>
		</view>
	</view>
</template>

<script>
	import scan from "@/components/scan/scan.vue"
	export default {
		onShow() {
			let that = this
			uni.$off('scan') // 每次进来先 移除全局自定义事件监听器
			uni.$on('scan', function(data) {
				// console.log(data);
				//扫码成功后的回调，你可以写自己的逻辑代码在这里
				if (data.code != 134) {
					return
				}
				console.log(`${data.up?'按下':'抬起'}扫描枪`);
				that.scanState = data.up
			})

		},
		data() {
			
			return {
				/**
				 * - 扫描枪状态
				 */
				scanState:false,
				title: 'Hello',
				src:'',
				/**
				 * 提交的数据
				 * - id  唯一表示
				 * - text 文本介绍
				 * - imgFile 图片文件
				 * - videoFile 视频文件
				 */
				form:{
					id:'',
					text:'',
					imgFile:{},
					videoFile:{}
				}
			}
		},
		onLoad() {
		},
		methods: {
			// --------------------------------------------扫描枪操作---------------------------------
			/**
			 * 打开扫描枪
			 */
			openScan(){
				this.scanState = true
			},
			/**
			 * 关闭扫描枪
			 */
			closeScan(){
				this.scanState = false
			},
			// --------------------------------------------------调用相机 拍照拍视频------------------------------------
			/**
			 * 打开相机
			 * @param {number} state 1 拍照  2 拍视频
			 */
			openCamera(state) {
				let _this = this
				if (state == 1) {
					uni.chooseImage({
						count: 1, //默认9
						sourceType: ['camera'],
						success: function(res) {
							console.log(JSON.stringify(res.tempFilePaths));
						}
					});
				} else {
					uni.chooseVideo({
						sourceType: ['camera'],
						maxDuration:6,
						compressed:false,
						success: function(res) {
							console.log(res);
							_this.src = res.tempFilePath
						}
					});
				}
			},
			// --------------------------------------------------数据请求-------------------------------------------
			/**
			 * 获取一条数据详情
			 * @param {String} id  查询的id
			 */
			getOneData(id) {
				if (!id || typeof id !== 'string') {
					uni.showToast({
						title: 'id 不合法',
						duration: 1000
					});
					return
				}
			},
			/**
			 * @param {String} id 提交数据的id
			 */
			postOneData(id) {
				if (!id || typeof id !== 'string') {
					uni.showToast({
						title: 'id 不合法',
						duration: 1000
					});
					return
				}
				
			}

		},
		components: {
			scan
		},
		watch:{
			scanState:{
				handler(n,o){
					/* true  打开 */
					if(n){
						// 如已经打开什么都不做
						if(o){
							
						}else{
							this.openScan()
						}
					}else{
						this.closeScan()
					}
				},
				deep:true
			}
		}
	}
</script>

<style>

</style>