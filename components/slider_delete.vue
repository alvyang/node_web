<template>
	<div class="slider_delete" :id="'slider_delete'+index" @touchstart="touchStart($event)" @touchend="touchEnd($event)" @touchmove="touchMove($event)">
		<slot></slot>
		<div>
			{{index}}{{sliderConf.direction}}
		</div>
	</div>
</template>
<script>
	/* 
	 * 滑动配置，direction:滑动方向。distance 滑动距离
	 */
	export default({
		data(){
			return {
				startPos:{x:0,y:0},
				endPos:{x:0,y:0},
			}
		},
		props:['sliderConf','index'],
		methods:{
			touchStart(e){
				this.startPos.x = e.pageX;
				this.startPos.y = e.pageY;
			},
			touchMove(e){
				var x = e.pageX,y=e.pageY;
				var distance =  this.sliderConf.distance * 75;
				var currentLeft = $("#slider_delete"+this.index).css("left");
				currentLeft = currentLeft.substring(0,currentLeft.length - 2);
//				if( currentLeft < 0 && parseInt(currentLeft) < -distance){
//					$("#slider_delete"+this.index).css("left",-distance+"px");
//				}else if(currentLeft > 0){
//					$("#slider_delete"+this.index).css("left","0px");
//				}else{
					$("#slider_delete"+this.index).css("left",(x-this.startPos.x)+"px");
//				}
			},
			touchEnd(e){
				var distance =  this.sliderConf.distance * 75;
				this.endPos.x = e.pageX;
				this.endPos.y = e.pageY;
				if(this.endPos.x - this.startPos.x < 0){
					$("#slider_delete"+this.index).css("left",-distance+"px");
				}else if(this.endPos.x - this.startPos.x > 0){
					$("#slider_delete"+this.index).css("left","0px");
				}
			}
		}
	})
</script>
<style>
	.slider_delete{
		position: absolute;
		left: 0;
		z-index: 100;
	}
</style>