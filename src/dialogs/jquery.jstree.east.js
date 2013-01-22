/* 
 * Custom jsTree plugin for EAST that allows jsTree data to be loaded from a global function 'createHTMLTree'
 *
 * @Note: adapted from the jsTree "html_data" plugin, only tested in as far as used by EAST.
 *
 */
(function ($) {
	$.jstree.plugin("EAST_data", {
		__init : function () { 
		},
		_fn : {
			load_node : function (obj, s_call, e_call) { var _this = this; this.load_node_html(obj, function () { _this.__callback({ "obj" : _this._get_node(obj) }); s_call.call(this); }, e_call); },
			_is_loaded : function (obj) { 
				obj = this._get_node(obj); 
				return obj == -1 || !obj || obj.is(".jstree-open, .jstree-leaf") || obj.children("ul").children("li").size() > 0;
			},
			load_node_html : function (obj, s_call, e_call) {
					var d,
					s = this.get_settings().EAST_data,
					error_func = function () {},
					success_func = function () {};
				obj = this._get_node(obj);
				if(obj && obj !== -1) {
					if(obj.data("jstree_is_loading")) { return; }
					else { obj.data("jstree_is_loading",true); }
				}
				if(!obj || obj == -1) {
					this.get_container()
						.children("ul").empty()
						.append(createHTMLTree())
						.find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end()
						.filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
					this.clean_node();
					if(s_call) { s_call.call(this); }
				}
			}
		}
	});
})(jQuery);
//*/

