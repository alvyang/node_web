<template>
	<div class="scroll_center" id="id"
		@touchstart.stop="touchStart($event)" 
		@touchmove.stop="touchMove($event)">
		<div class="scroll_message">
			<slot></slot>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				handleTouch:null,
				scrollStartPosY:0,
				scrollStartPosX:0,
			}
		},
		methods:{
			touchStart(e){
				 this.scrollStartPosY=e.target.scrollTop + e.pageY;  
	             this.scrollStartPosX=e.target.scrollLeft + e.pageX;  
			},
			touchMove(e){
				if ((e.target.scrollTop < e.target.scrollHeight-e.target.offsetHeight &&  
	                e.target.scrollTop+e.pageY < this.scrollStartPosY-5) ||  
	                (e.target.scrollTop != 0 && e.target.scrollTop+e.pageY > this.scrollStartPosY+5))  
	                    e.preventDefault();   
	            if ((e.target.scrollLeft < e.target.scrollWidth-e.target.offsetWidth &&  
	                e.target.scrollLeft+e.pageX < this.scrollStartPosX-5) ||  
	                (e.target.scrollLeft != 0 && e.target.scrollLeft+e.pageX > this.scrollStartPosX+5))  
	                    e.preventDefault();   
	            e.target.scrollTop=this.scrollStartPosY-e.pageY;  
	            e.target.scrollLeft=this.scrollStartPosX-e.pageX; 
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
	.scroll_center{
		width: 100%;  
	    height: 100%;  
	    overflow-x: hidden;  
	    overflow-y: scroll;  
	    position: relative 
	}
	.scroll_message{
		position: absolute; 
		width: 100%; 
	}
</style>