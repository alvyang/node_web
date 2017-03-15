class Address{
	constructor(){
		this.gearArea;
        this.data;
        this.index = 0;
        this.value = [0, 0, 0];
	}
	init(params) {
        this.params = params;//接收参数
        this.trigger = document.querySelector(params.trigger);//选择完成后，数据回显的a标签
        this.bindEvent(this.type);
    }
	getData(callback) {
        var _self = this;
        if (typeof _self.params.data == "object") {
            _self.data = _self.params.data;
            callback();
        } else {//发异步请求
			$.ajaxSettings.async = false; 
			$.getJSON(_self.params.data,{},function(result){
                _self.data = result;
			});
            if (callback) {
                callback()
            };
        }
    }
	bindEvent(type) {
        var _self = this;
        //呼出插件
        function popupArea(e) {
            _self.gearArea = document.createElement("div");
            _self.gearArea.className = "gearArea";
            _self.gearArea.innerHTML = '<div class="area_ctrl slideInUp">' +
                '<div class="area_btn_box">' +
                '<div class="area_btn larea_cancel">取消</div>' +
                '<div class="area_btn larea_finish">确定</div>' +
                '</div>' +
                '<div class="area_roll_mask">' +
                '<div class="area_roll">' +
                '<div>' +
                '<div class="gear area_province" data-areatype="area_province"></div>' +
                '<div class="area_grid">' +
                '</div>' +
                '</div>' +
                '<div>' +
                '<div class="gear area_city" data-areatype="area_city"></div>' +
                '<div class="area_grid">' +
                '</div>' +
                '</div>' +
                '<div>' +
                '<div class="gear area_county" data-areatype="area_county"></div>' +
                '<div class="area_grid">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            document.body.appendChild(_self.gearArea);
            areaCtrlInit();
            var larea_cancel = _self.gearArea.querySelector(".larea_cancel");
            larea_cancel.addEventListener('touchstart', function(e) {
                _self.close(e);
            });
            var larea_finish = _self.gearArea.querySelector(".larea_finish");
            larea_finish.addEventListener('touchstart', function(e) {
                _self.finish(e);
            });
            var area_province = _self.gearArea.querySelector(".area_province");
            var area_city = _self.gearArea.querySelector(".area_city");
            var area_county = _self.gearArea.querySelector(".area_county");
            area_province.addEventListener('touchstart', gearTouchStart);
            area_city.addEventListener('touchstart', gearTouchStart);
            area_county.addEventListener('touchstart', gearTouchStart);
            area_province.addEventListener('touchmove', gearTouchMove);
            area_city.addEventListener('touchmove', gearTouchMove);
            area_county.addEventListener('touchmove', gearTouchMove);
            area_province.addEventListener('touchend', gearTouchEnd);
            area_city.addEventListener('touchend', gearTouchEnd);
            area_county.addEventListener('touchend', gearTouchEnd);
        }
        //初始化插件默认值
        function areaCtrlInit() {
            _self.gearArea.querySelector(".area_province").setAttribute("val", _self.value[0]);
            _self.gearArea.querySelector(".area_city").setAttribute("val", _self.value[1]);
            _self.gearArea.querySelector(".area_county").setAttribute("val", _self.value[2]);
            _self.setGearTooth(_self.data);
        }
        //触摸开始
        function gearTouchStart(e) {
            e.preventDefault();
            var target = e.target;
            while (true) {
                if (!target.classList.contains("gear")) {
                    target = target.parentElement;
                } else {
                    break
                }
            }
            clearInterval(target["int_" + target.code]);
            target["old_" + target.code] = e.targetTouches[0].screenY;
            target["o_t_" + target.code] = (new Date()).getTime();
            var top = target.getAttribute('top');
            if (top) {
                target["o_d_" + target.code] = parseFloat(top.replace(/rem/g, ""));
            } else {
                target["o_d_" + target.code] = 0;
            }
        }
        //手指移动
        function gearTouchMove(e) {
            e.preventDefault();
            var target = e.target;
            while (true) {
                if (!target.classList.contains("gear")) {
                    target = target.parentElement;
                } else {
                    break
                }
            }
            target["new_" + target.code] = e.targetTouches[0].screenY;
            target["n_t_" + target.code] = (new Date()).getTime();
            //var f = (target["new_" + target.code] - target["old_" + target.code]) * 18 / target.clientHeight;
            var f = (target["new_" + target.code] - target["old_" + target.code]) * 18 / 370;
            target["pos_" + target.code] = target["o_d_" + target.code] + f;
            target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.code] + 'rem,0)';
            target.setAttribute('top', target["pos_" + target.code] + 'rem');
        }
        //离开屏幕
        function gearTouchEnd(e) {
            e.preventDefault();
            var target = e.target;
            while (true) {
                if (!target.classList.contains("gear")) {
                    target = target.parentElement;
                } else {
                    break;
                }
            }
            var flag = (target["new_" + target.code] - target["old_" + target.code]) / (target["n_t_" + target.code] - target["o_t_" + target.code]);
            if (Math.abs(flag) <= 0.2) {
                target["spd_" + target.code] = (flag < 0 ? -0.08 : 0.08);
            } else {
                if (Math.abs(flag) <= 0.5) {
                    target["spd_" + target.code] = (flag < 0 ? -0.16 : 0.16);
                } else {
                    target["spd_" + target.code] = flag / 2;
                }
            }
            if (!target["pos_" + target.code]) {
                target["pos_" + target.code] = 0;
            }
            rollGear(target);
        }
        //缓动效果
        function rollGear(target) {
            var d = 0;
            var stopGear = false;
            clearInterval(target["int_" + target.code]);
            target["int_" + target.code] = setInterval(function() {
                var pos = target["pos_" + target.code];
                var speed = target["spd_" + target.code] * Math.exp(-0.03 * d);
                pos += speed;
                if (Math.abs(speed) > 0.1) {} else {
                    speed = 0.1;
                    var b = Math.round(pos / 1) * 1;
                    if (Math.abs(pos - b) < 0.02) {
                        stopGear = true;
                    } else {
                        if (pos > b) {
                            pos -= speed
                        } else {
                            pos += speed
                        }
                    }
                }
                if (pos > 0) {
                    pos = 0;
                    stopGear = true;
                }
                var minTop = -(target.dataset.len - 1) * 1;
                if (pos < minTop) {
                    pos = minTop;
                    stopGear = true;
                }
//                  var maxTop = -(target.dataset.len - 1) * 1;
//                  if(pos > ){
//                  	
//                  }
                if (stopGear) {
                    var gearVal = Math.abs(pos) / 1;
                    setGear(target, gearVal);
                    clearInterval(target["int_" + target.code]);
                }
                target["pos_" + target.code] = pos;
                target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'rem,0)';
                target.setAttribute('top', pos + 'rem');
                d++;
            }, 30);
        }
        //控制插件滚动后停留的值
        function setGear(target, val) {
            val = Math.round(val);
            target.setAttribute("val", val);
            _self.setGearTooth(_self.data);
        }
        _self.getData(function() {
            _self.trigger.addEventListener('click', popupArea);
        });
    }
	setGearTooth(data) {
        var _self = this;
        var item = data || [];
        var l = item.length;
        var gearChild = _self.gearArea.querySelectorAll(".gear");
        var gearVal = gearChild[_self.index].getAttribute('val');
        gearChild[_self.index].setAttribute('data-len', l);
        if (l > 0) {
            //var id = item[gearVal].code;
            gearVal = gearVal<(l-1)?gearVal:(l-1);
            var childData = item[gearVal]["child_code"];
            var itemStr = "";
            for (var i = 0; i < l; i++) {
                itemStr += "<div class='tooth'  ref='" + item[i].code + "'>" + item[i].name + "</div>";
            }
            gearChild[_self.index].innerHTML = itemStr;
            gearChild[_self.index].style["-webkit-transform"] = 'translate3d(0,' + (-gearVal * 1) + 'rem,0)';
            gearChild[_self.index].setAttribute('top', -gearVal * 1 + 'rem');
            _self.index++;
            if (_self.index > 2) {
                _self.index = 0;
                return;
            }
            _self.setGearTooth(childData);
        } else {
            gearChild[1].innerHTML = "<div class='tooth'></div>";
            gearChild[2].innerHTML = "<div class='tooth'></div>";
            _self.index = 0;
        }
    }
	finish(e) {
        var _self = this;
        var area_province = _self.gearArea.querySelector(".area_province");
        var area_city = _self.gearArea.querySelector(".area_city");
        var area_county = _self.gearArea.querySelector(".area_county");
        var provinceVal = parseInt(area_province.getAttribute("val"));
        var provinceText = area_province.childNodes[provinceVal].textContent;
        var cityVal = parseInt(area_city.getAttribute("val"));
        var cityText = area_city.childNodes[cityVal].textContent;
        var countyVal = parseInt(area_county.getAttribute("val"));
        var countyText = area_county.childNodes[countyVal].textContent;
        _self.trigger.value = provinceText + " " + cityText + " " + countyText;
        
        $("#province_code").val(area_province.childNodes[provinceVal].getAttribute("ref"));
        $("#city_code").val(area_city.childNodes[cityVal].getAttribute("ref"));
        $("#county_code").val(area_county.childNodes[countyVal].getAttribute("ref"));
        _self.value = [provinceVal, cityVal, countyVal];
        console.log(_self.value);
        _self.close(e);
    }
	close(e) {
        e.preventDefault();
        var _self = this;
        var evt = new CustomEvent('input');
        _self.trigger.dispatchEvent(evt);
        document.body.removeChild(_self.gearArea);
    }
}

export default Address;