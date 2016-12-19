(function($){
	'use strict';
	
	if( typeof $ === 'function' && $.fn && $.fn.jquery ){
		var version = $.fn.jquery.split(' ')[0].split('.');
		if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
			throw new Error('Plugin Dragmenu for Bootstrap is JavaScript requires jQuery version 1.9.1 or higher')
		}
	} else {
		throw new Error('Plugin Dragmenu for Bootstrap is JavaScript requires jQuery');
	}
	
	// DRAGMENU PUBLIC CLASS DEFINITION
	// ================================
	
	var Dragmenu = function(element, options){
		this.$element	= $(element);
		this.$btn		= this.$element.children('.dragmenu-btn');
		this.options	= $.extend({}, Dragmenu.DEFAULTS, typeof options == 'object' && options);
		
		var blockValue = false;
		this.isBlock = function(){
			return blockValue;
		}
		function toBlock(){
			blockValue = true;
		};
		function toUnblock(){
			blockValue = false;
		};
		this.$element.on('drag.bs.block.dragmenu', toBlock);
		this.$element.on('stay.bs.block.dragmenu', toUnblock);
	}
	
	Dragmenu.VERSION = '1.0.0'
	
	Dragmenu.DEFAULTS = {}
	
	Dragmenu.prototype.open = function(){
		
		if ( this.$element.hasClass("dragmenu-open") && !this.isBlock() ) return
		
		var nowCssLeft = parseFloat(this.$element.css('left')) || 0,
			newCssLeft = 0;
		
		this.$element
			.removeClass('dragmenu-open dragmenu-close dragmenu-transition')
			.addClass('dragmenu-animation')
			.css('left', newCssLeft)
		
		var complete = function(){
//			console.log(newCssLeft);
			this.$element
				.removeClass('dragmenu-animation')
				.addClass('dragmenu-open')
				.css('left', '');
			
			this.$element.trigger($.Event('stay.bs.block.dragmenu'));
		}
		
		if ( nowCssLeft == newCssLeft || !$.support.transition ){
			setTimeout($.proxy(complete, this), 500)
		} else {
		this.$element
			.one( 'transitionend', $.proxy(complete, this) );
		}
		
	}
	
	Dragmenu.prototype.close = function(){
		
		if ( this.$element.hasClass("dragmenu-close") && !this.isBlock() ) return
		
		var nowCssLeft = parseFloat(this.$element.css('left')) || 0,
			newCssLeft = -this.$element.outerWidth();
		
		this.$element
			.removeClass('dragmenu-open dragmenu-close dragmenu-transition')
			.addClass('dragmenu-animation')
			.css('left', newCssLeft)
		
		var complete = function(){
			
//			console.log('кончаем');
			this.$element
				.removeClass('dragmenu-animation')
				.addClass('dragmenu-close')
				.css('left', '');
			
			this.$element.trigger($.Event('stay.bs.block.dragmenu'));
		}
		
		if ( nowCssLeft == newCssLeft || !$.support.transition){
			setTimeout($.proxy(complete, this), 500)
		} else {
		this.$element
			.one( 'transitionend', $.proxy(complete, this) );
		}
	}
	
	function capture(e){
		
		if (capture.isBlock) return;
		
		var $this = $(this),
			data = $this.data('bs.dragmenu') || ( Plugin.call($this), $this.data('bs.dragmenu') );
		
		if ($this.css('position') !== 'fixed' || (data && data.isBlock())) return;
		
		var startElem = $this.hasClass('dragmenu-close') ? -parseFloat($this.outerWidth()) : 0;
		$this.css('left', startElem);
		
		var optionsDrag = {
			$this			: $this,
			data			: data,
			idtouch			: e.changedTouches && e.changedTouches[0].identifier,
			startCursorX	: e.pageX || e.targetTouches[0].pageX,
			startCursorY	: e.pageY || e.targetTouches[0].pageY,
			startElem		: startElem,
			path			: 0
		}
		
		if (e.type == 'mousedown') $(document)
			.on('mousemove.bs.drag.dragmenu.data-api', optionsDrag, drag)
			.on('mouseup.bs.stay.dragmenu.data-api', optionsDrag, stay);
		if (e.type == 'touchstart') $(document)
			.on('touchmove.bs.drag.dragmenu.data-api', optionsDrag, drag)
			.on('touchend.bs.stay.dragmenu.data-api', optionsDrag, stay);
		
	}
	
	Object.defineProperty(capture, 'isBlock', new function(){
		var timer = !!(performance && performance.now) ? performance.now() : Date.now();
		this.get = function(){
			var result = (timer + 500) > (timer = !!(performance && performance.now) ? performance.now() : Date.now());
			return result;
		}
	})
	
	function drag(e){
		
		if (	e.changedTouches && (e.changedTouches[0].identifier !== e.data.idtouch ) || 
				(e.data.idtouch !== undefined && !e.changedTouches) ) return;
		
		var $this = e.data.$this,
			data = e.data.data;
		
		var nowCursoreX = e.pageX || e.targetTouches[0].pageX,
			nowCursoreY = e.pageY || e.targetTouches[0].pageY,
			path = nowCursoreX - e.data.startCursorX,
			scroll = nowCursoreY - e.data.startCursorY;
		
		if (Math.abs(path) < 3 && Math.abs(scroll) < 3 && !data.isBlock() ) {
			e.preventDefault();
			return
		}
		
		if ( Math.abs(path) >= Math.abs(scroll) || data.isBlock() ){
			
			if( !data.isBlock() ){
				$this.trigger($.Event('drag.bs.block.dragmenu'));
				$this
					.removeClass('dragmenu-close dragmenu-open')
					.addClass('dragmenu-transition');
			}
			
			e.preventDefault();
			
			var position = e.data.startElem + path;
			e.data.path = path;
			$this.css({'left' : position < 0 ? position : 0});
			
		} else {
			
			$(document)
				.off('.bs.drag.dragmenu.data-api')
				.off('.bs.stay.dragmenu.data-api');
			
		}
		
	}
	
	function stay(e){
		
		if (e.data.data && !e.data.data.isBlock()){
			var $target = $(e.target),
				$btn = e.data.data.$btn;
			if ( !$target.closest($btn).length ) {
				$(document)
					.off('.bs.drag.dragmenu.data-api')
					.off('.bs.stay.dragmenu.data-api');
				return
			}
		}
		
		e.preventDefault();
		
		if (	e.changedTouches && (e.changedTouches[0].identifier !== e.data.idtouch ) || 
				(e.data.idtouch !== undefined && !e.changedTouches) ) return;
		
		var $this = e.data.$this,
			data = e.data.data,
			position = parseFloat( $this.css('left') ),
			horizon = parseFloat( $this.css('width') ) / 2;
		
		$(document)
			.off('.bs.drag.dragmenu.data-api')
			.off('.bs.stay.dragmenu.data-api');
		
		if ( Math.abs(e.data.path) < 10 ) {
			if (position < -horizon) { data.open() } else { data.close() }
		} else if ( position < -horizon ) { data.close() } else { data.open() }
		
	}
	
	// DRAGMENU PLUGIN DEFINITION
	// ==========================
	
	function Plugin(option){
		return this.each(function(){
			var $this	= $(this),
				data	= $this.data('bs.dragmenu'),
				options = {};
			
			if (!data || typeof option == 'object') $.extend(options, Dragmenu.DEFAULTS, ( data && data.options ), typeof option == 'object' && option);
			if (!data) $this.data('bs.dragmenu', (data = new Dragmenu(this, options)));
			if (typeof option == 'string') data[option].call($this);
		})
	}
	
	var old = $.fn.Dragmenu
	
	$.fn.dragmenu				= Plugin;
	$.fn.dragmenu.Constructor	= Dragmenu;
	
	// DRAGMENU NO CONFLICT
	// =================
	
	$.fn.dragmenu.noConflict = function(){
		$.fn.dragmenu = old;
		return this;
	}
	
	// DRAGMENU DATA-API
	// ==============
	
	$(document)
		.on('touchstart.bs.dragmenu', '.dragmenu-xs, .dragmenu-sm, .dragmenu-md, .dragmenu-lg', capture)
		.on('mousedown.bs.dragmenu', '.dragmenu-xs, .dragmenu-sm, .dragmenu-md, .dragmenu-lg', capture)
	
})(jQuery)