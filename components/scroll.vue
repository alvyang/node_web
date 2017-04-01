<template>
	<div class="scroll_center"
		@touchstart.stop="touchStart($event)" 
		@touchmove.stop="touchMove($event)">
		<div class="scroll_message" :id="id" :style="{left:currentTop + 'px'}" >
			<slot></slot>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				handleTouch:null,
				startY:0,//触摸的起始位置Y
				startX:0,//触摸的起始位置X.
				currentTop:0,
			}
		},
		props:["id"],
		methods:{
			touchStart(e){
				this.startY=e.pageY;  
	            this.startX=e.pageX;  
			},
			touchMove(e){
//				e.preventDefault();
				//disX,disY 滑动的距离
//				console.log(-this.currentTop);
//				var disY = -(this.startY - e.pageY)*18/180;
//				if(this.currentTop >= 0 && disY > 0){
//					this.currentTop = 0;
//				}else if(-this.currentTop >= $("#"+this.id)[0].scrollHeight && disY < 0){
//				}else{
//					this.currentTop = this.currentTop + disY;
//				}
			}
		},
		activated(){
			document.addEventListener('touchmove', this.handleTouch, false);
		},
		deactivated(){
			document.removeEventListener('touchmove', this.handleTouch, false);
		},
		mounted(){
			this.handleTouch = function(e){e.preventDefault();}
			document.addEventListener('touchmove', this.handleTouch, false);
		}
	}
</script>
<style>
	.scroll_message{
		position: absolute;
		top: 0px;
		width: 100%; 
	}
	.scroll_center{
		position: absolute;
	}
	
</style>