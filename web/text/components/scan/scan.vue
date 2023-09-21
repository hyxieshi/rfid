<template>
	<view class="content"></view>
</template>

<script>
	var main, receiver, filter;
	var _codeQueryTag = false;
	export default {
		data() {
			return {
				scanCode: ''
			}
		},
		created: function(option) {
			this.initScan()
			this.startScan();
		},
		onHide: function() {
			this.stopScan();
		},
		destroyed: function() {
			this.stopScan();
		},
		methods: {
			initScan() {
				let _this = this;
				main = plus.android.runtimeMainActivity();
				var IntentFilter = plus.android.importClass('android.content.IntentFilter');
				filter = new IntentFilter();
                //下面的addAction内改为自己的广播动作
				filter.addAction("android.rfid.FUN_KEY");
				filter.addAction('android.intent.action.FUN_KEY')
				receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
					onReceive: function(context, intent) {
						plus.android.importClass(intent);
						let code = intent.getIntExtra("keyCode",0);
						let up = intent.getBooleanExtra("keydown", false)
						console.log(up);
						_this.queryCode(code,up);
					}
				});
			},
			startScan() {
				main.registerReceiver(receiver, filter);
			},
			stopScan() {
				main.unregisterReceiver(receiver);
			}, 
			queryCode: function(code,up) {
				// if (_codeQueryTag) return false;
				// _codeQueryTag = true;
				// setTimeout(function() {
				// 	_codeQueryTag = false;
				// }, 150);
				uni.$emit('scan', {
					code,up
				})
			}
		}
	}
</script>


<style>

</style>