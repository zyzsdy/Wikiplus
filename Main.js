/**
* Wikiplus
* Author:Eridanus Sora/@妹空酱
* Github:https://github.com/Last-Order/Wikiplus
*
* Include MoeNotification
* https://github.com/Last-Order/MoeNotification
*
* Copyright by Wikiplus, Eridanus Sora and other contributors
* Licensed by Apache License 2.0
* http://wikiplus-app.smartgslb.com/
*/

/**
* MoeNotification mini
*/
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function MoeNotification(undefined) {
	var self = this;
	this.display = function (text, type, callback) {
		var _callback = callback || function () {};
		var _text = text || '喵~';
		var _type = type || 'success';
		$("#MoeNotification").append($("<div>").addClass('MoeNotification-notice').addClass('MoeNotification-notice-' + _type).append('<span>' + _text + '</span>').fadeIn(300));
		self.bind();
		self.clear();
		_callback($("#MoeNotification").find('.MoeNotification-notice').last());
	};
	this.create = {
		success: function success(text, callback) {
			var _callback = callback || function () {};
			self.display(text, 'success', _callback);
		},
		warning: function warning(text, callback) {
			var _callback = callback || function () {};
			self.display(text, 'warning', _callback);
		},
		error: function error(text, callback) {
			var _callback = callback || function () {};
			self.display(text, 'error', _callback);
		}
	};
	this.clear = function () {
		if ($(".MoeNotification-notice").length >= 10) {
			$("#MoeNotification").children().first().fadeOut(150, function () {
				$(this).remove();
			});
			setTimeout(self.clear, 300);
		} else {
			return false;
		}
	};
	this.empty = function (f) {
		$(".MoeNotification-notice").each(function (i) {
			if ($.isFunction(f)) {
				var object = this;
				setTimeout(function () {
					f($(object));
				}, 200 * i);
			} else {
				$(this).delay(i * 200).fadeOut('fast', function () {
					$(this).remove();
				});
			}
		});
	};
	this.bind = function () {
		$(".MoeNotification-notice").mouseover(function () {
			self.slideLeft($(this));
		});
	};
	window.slideLeft = this.slideLeft = function (object, speed) {
		object.css('position', 'relative');
		object.animate({
			left: "-200%"
		}, speed || 150, function () {
			$(this).fadeOut('fast', function () {
				$(this).remove();
			});
		});
	};
	this.init = function () {
		$("body").append('<div id="MoeNotification"></div>');
	};
	if (!($("#MoeNotification").length > 0)) {
		this.init();
	}
}

//Wikiplus Core Start
$(function () {

	var i18nData = {};
	var scriptPath = location.protocol + '//wikiplus-app.smartgslb.com';
	i18nData['zh-cn'] = {
		"__language": "zh-cn",
		"__author": ["Eridanus Sora"],
		"__version": "2.0.0.0",
		"unknown_error_name": "未知的错误名",
		"api_unaccessiable": "无可用的API",
		"api_unwriteable": "无可用的写入API",
		"fail_to_get_timestamp": "无法获得页面编辑起始时间戳",
		"fail_to_get_edittoken": "无法获得页面编辑权标",
		"fail_to_get_pageinfo": "无法获得页面信息",
		"not_autoconfirmed_user": "非自动确认用户",
		"hit_abusefilter": "被防滥用过滤器拦截",
		"unknown_edit_error": "未知编辑错误",
		"unknown_edit_error_message": "未知编辑错误($1)",
		"notitle": "无法编辑空标题页面",
		"notext": "缺少页面内容",
		"notoken": "空编辑权标",
		"invalidsection": "段落编号非法",
		"protectedtitle": "该标题被保护，无法创建",
		"cantcreate": "无新建页面权限",
		"cantcreate_anon": "匿名用户无新建页面权限",
		"articleexists": "无法创建已经存在的页面",
		"noimageredirect_anon": "匿名用户无新建文件重定向权限",
		"noimageredirect": "无新建文件重定向权限",
		"spamdetected": "文本含有敏感内容，被SPAM过滤器拦截",
		"filtered": "编辑被过滤器拦截",
		"contenttoobig": "文本超过最大长度限制",
		"noedit_anon": "匿名用户无编辑页面权限",
		"noedit": "无编辑页面权限",
		"pagedeleted": "编辑时，此页面被删除",
		"emptypage": "无法新建空内容页面",
		"emptynewsection": "无法新建空内容段落",
		"editconflict": "编辑冲突，请手工检查页面当前内容与提交内容差异并修正后，刷新页面提交",
		"revwrongpage": "编辑的修订版本与编辑的页面不匹配",
		"undofailure": "由于存在冲突的中间版本，无法撤销编辑",
		"missingtitle": "无法创建或编辑空标题页面",
		"mustbeposted": "必须使用POST方式提交编辑",
		"readapidenied": "无读取API使用权限",
		"writeapidenied": "无通过API编辑页面权限",
		"noapiwrite": "本Wiki未开启可用的写入API",
		"badtoken": "非法的编辑权标",
		"missingparam": "缺少必要参数，页面名和页面ID不能均为空",
		"invalidparammix": "参数重复，页面名和页面ID不能同时给定",
		"invalidtitle": "非法的标题",
		"nosuchpageid": "不存在的页面ID",
		"pagecannotexist": "该名称空间不允许新建一般页面",
		"nosuchrevid": "不存在的修订版本",
		"badmd5": "非法的MD5值",
		"hookaborted": "编辑被扩展Hook拦截",
		"parseerror": "无法解析页面文本",
		"summaryrequired": "编辑摘要不能为空",
		"blocked": "已被封禁",
		"ratelimited": "达到操作速率上限，请稍后重试",
		"unknownerror": "未知错误",
		"nosuchsection": "无法编辑不存在的段落",
		"sectionsnotsupported": "该页面不支持段落编辑",
		"editnotsupported": "该页面不支持通过API编辑",
		"appendnotsupported": "该页面无法在前后插入文本",
		"redirect_appendonly": "在遵循重定向的情况下，只能进行前后插入或创建新段落",
		"badformat": "文本格式错误",
		"customcssprotected": "无法编辑用户CSS页",
		"customjsprotected": "无法编辑用户JS页",
		"cascadeprotected": "该页面被级联保护",
		"network_edit_error": "由于网络原因编辑失败",
		"redirect_to_summary": "重定向页面至 [[$1]] // Wikiplus",
		"redirect_from_summary": "将[[$1]]重定向至[[$2]] // Wikiplus",
		"need_init": "页面类未加载完成",
		"fail_to_get_wikitext": "无法获得页面文本",
		"quickedit_topbtn": "快速编辑",
		"quickedit_sectionbtn": "快速编辑",
		"fail_to_init_quickedit": "无法加载快速编辑",
		"back": "返回",
		"goto_editbox": "到编辑框",
		"summary_placehold": "请输入编辑摘要",
		"submit": "提交",
		"preview": "预览",
		"cancel": "取消",
		"mark_minoredit": "标记为小编辑",
		"onclose_confirm": "[Wikiplus] 您确认要关闭/刷新页面吗 这会导致您的编辑数据丢失",
		"fail_to_get_wikitext_when_edit": "无法获得页面文本以编辑",
		"cant_parse_wikitext": "无法解析维基文本",
		"loading_preview": "正在读取预览",
		"submitting_edit": "正在提交编辑",
		"edit_success": "编辑成功 用时$1ms",
		"empty_page_confirm": "您向编辑函数传入了空内容参数 这将清空页面\r\n由于该行为危险 请将config参数的empty键值设定为true来确认",
		"cross_page_edit": "编辑目标位于其他页面 正在获取基础信息",
		"cross_page_edit_submit": "基础信息获取成功 正在提交编辑",
		"cross_page_edit_error": "无法获得基础信息>.<",
		"install_tip": "您是否允许Wikiplus采集非敏感数据用于改进Wikiplus及为当前Wiki: $1 提供改进建议?",
		"accept": "接受",
		"decline": "拒绝",
		"install_finish": "Wikiplus安装完毕",
		"loading": "正在载入",
		"cant_add_funcbtn": "无法增加功能按钮",
		"wikiplus_settings": "Wikiplus设置",
		"wikiplus_settings_desc": "请在下方按规范修改Wikiplus设置",
		"wikiplus_settings_placeholder": "当前设置为空 请在此处按规范修改Wikiplus设置",
		"wikiplus_settings_grammar_error": "设置存在语法错误 请检查后重试",
		"wikiplus_settings_saved": "设置已保存",
		"redirect_from": "将页面重定向至此",
		"redirect_desc": "请输入要重定向至此的页面名",
		"empty_input": "输入不能为空",
		"redirect_saved": "重定向完成",
		"uninited": "Wikiplus未加载完毕 请刷新重试",
		"cant_parse_i18ncache": "无法解析多语言定义文件缓存",
		"cant_load_language": "无法获取多语言定义文件",
		"history_edit_warning": " // 正试图编辑历史版本 这将会应用到本页面的最新版本 请慎重提交"
	}; /* end i18ndata */

	/**
  * 加载其他语言文件
  * @param {string} language 语言名
  */
	function loadLanguage(language) {
		$.ajax({
			url: scriptPath + '/languages/get.php?lang=' + language,
			dataType: 'json',
			success: function success(data) {
				if (data.__language) {
					i18nData[data.__language] = data;
					localStorage.Wikiplus_i18nCache = JSON.stringify(i18nData); //更新缓存
				}
			},
			error: function error(e) {
				console.log('无法加载语言' + language);
			}
		});
	} /* end loadLanguage */

	/**
  * 多语言转换
  * @param {stirng} key 字段标识名
  * @return {string} 经过转换的内容 如未找到对应的多语言字段 则返回简体中文
  */
	function i18n(key) {
		var language = window.navigator.language.toLowerCase();
		if (i18nData[language] && i18nData[language][key]) {
			return i18nData[language][key];
		} else if (i18nData['zh-cn'][key]) {
			return i18nData['zh-cn'][key];
		} else {
			return 'undefined';
		}
	} /* end i18n */

	/**
  * 获得错误信息
  * @param {stirng} name
  * @return {object} {number,message}
  */
	function getErrorInfo(name) {
		var errorList = {
			unknown_error_name: {
				number: 1001,
				message: i18n('unknown_error_name')
			},
			api_unaccessiable: {
				number: 1002
			},
			api_unwriteable: {
				number: 1003
			},
			fail_to_get_timestamp: {
				number: 1004
			},
			fail_to_get_edittoken: {
				number: 1005
			},
			fail_to_get_pageinfo: {
				number: 1006
			},
			not_autoconfirmed_user: {
				number: 1007
			},
			hit_abusefilter: {
				number: 1008
			},
			unknown_edit_error: {
				number: 1009
			},
			unknown_edit_error_message: {
				number: 1010
			},
			notitle: {
				number: 1011
			},
			notext: {
				number: 1012
			},
			notoken: {
				number: 1013
			},
			invalidsection: {
				number: 1014
			},
			protectedtitle: {
				number: 1015
			},
			cantcreate: {
				number: 1016
			},
			cantcreate_anon: {
				number: 1017
			},
			articleexists: {
				number: 1018
			},
			noimageredirect_anon: {
				number: 1019
			},
			noimageredirect: {
				number: 1020
			},
			spamdetected: {
				number: 1021
			},
			filtered: {
				number: 1022
			},
			contenttoobig: {
				number: 1023
			},
			noedit_anon: {
				number: 1025
			},
			noedit: {
				number: 1026
			},
			pagedeleted: {
				number: 1027
			},
			emptypage: {
				number: 1028
			},
			emptynewsection: {
				number: 1029
			},
			editconflict: {
				number: 1030
			},
			revwrongpage: {
				number: 1031
			},
			undofailure: {
				number: 1032
			},
			missingtitle: {
				number: 1033
			},
			mustbeposted: {
				number: 1034
			},
			readapidenied: {
				number: 1035
			},
			writeapidenied: {
				number: 1036
			},
			noapiwrite: {
				number: 1037
			},
			badtoken: {
				number: 1038
			},
			missingparam: {
				number: 1039
			},
			invalidparammix: {
				number: 1040
			},
			invalidtitle: {
				number: 1041
			},
			nosuchpageid: {
				number: 1042
			},
			pagecannotexist: {
				number: 1043
			},
			nosuchrevid: {
				number: 1044
			},
			badmd5: {
				number: 1045
			},
			hookaborted: {
				number: 1046
			},
			parseerror: {
				number: 1047
			},
			summaryrequired: {
				number: 1048
			},
			blocked: {
				number: 1049
			},
			ratelimited: {
				number: 1050
			},
			unknownerror: {
				number: 1051
			},
			nosuchsection: {
				number: 1052
			},
			sectionsnotsupported: {
				number: 1053
			},
			editnotsupported: {
				number: 1054
			},
			appendnotsupported: {
				number: 1055
			},
			redirect_appendonly: {
				number: 1056
			},
			badformat: {
				number: 1057
			},
			customcssprotected: {
				number: 1058
			},
			customjsprotected: {
				number: 1059
			},
			cascadeprotected: {
				number: 1060
			},
			network_edit_error: {
				number: 1061
			},
			need_init: {
				number: 1062
			},
			fail_to_get_wikitext: {
				number: 1063
			},
			fail_to_init_quickedit: {
				number: 1064
			},
			fail_to_get_wikitext_when_edit: {
				number: 1065
			},
			cant_parse_wikitext: {
				number: 1066
			},
			empty_page_confirm: {
				number: 1067
			},
			uninited: {
				number: 1068
			},
			cant_parse_i18ncache: {
				number: 1069
			},
			cant_load_language: {
				number: 1070
			}
		};
		if (errorList[name]) {
			if (errorList[name].message) {
				return {
					number: errorList[name].number,
					message: errorList[name].message
				};
			} else if (i18n(name) !== 'undefined') {
				return {
					number: errorList[name].number,
					message: i18n(name)
				};
			} else {
				return {
					number: errorList[name].number,
					message: i18n('unknownerror')
				};
			}
		} else {
			return {
				number: errorList.unknown_error_name.number,
				message: errorList.unknown_error_name.message
			};
		}
	} /* end getErrorInfo */

	/**
  * 判断值是否存在于数组
  * @param {string} value
  * @param {array} array
  * @return {boolean} whether the value is in the array
  */
	function inArray(value) {
		var array = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

		return $.inArray(value, array) === -1 ? false : true;
	} /* end inArray */

	/** 
  * 抛出错误
  * @param {string} name
  * @return boolean
  */
	function throwError(name, message) {
		var errInfo = getErrorInfo(name);
		var e = new Error();
		e.number = errInfo.number;
		e.message = message || errInfo.message;
		console.log('%c致命错误[' + e.number + ']:' + e.message, 'color:red');
		console.log(e);
		return e;
	} /* end throwError */

	var Wikipage = (function () {
		function Wikipage() {
			var pageName = arguments.length <= 0 || arguments[0] === undefined ? window.mw.config.values.wgPageName : arguments[0];

			_classCallCheck(this, Wikipage);

			console.log('页面类构建中');
			//可用性和权限检测
			if (!window.mw) {
				console.log('页面Javascript载入不完全或这不是一个Mediawiki站点');
				return;
			}
			if (!window.mw.config.values.wgEnableAPI || !window.mw.config.values.wgEnableWriteAPI) {
				throwError('api_unaccessiable');
				return;
			}
			if (!inArray('autoconfirmed', window.mw.config.values.wgUserGroups)) {
				throwError('not_autoconfirmed_user');
				return;
			}
			//从MediaWiki定义的全局变量中获得信息
			this.pageName = pageName.replace(/ /ig, '_'); // Mediawiki处理空格时可能会出错
			this.revisionId = window.mw.config.values.wgRevisionId;
			this.articleId = window.mw.config.values.wgArticleId;
			this.API = location.protocol + '//' + location.host + window.mw.config.values.wgScriptPath + '/api.php';
			//从API获得编辑令牌和起始时间戳
			this.editToken = {};
			this.timeStamp = {};
			this.init(this.pageName, {
				success: function success() {
					console.log('Wikiplus加载完毕');
				},
				fail: function fail(e) {
					console.log('Wikiplus未能正确加载(' + e.message + ')');
				}
			});
		}

		/* end constructor */

		/**
   * 针对非本页面的编辑 提供重定义时间戳和权标接口
   * @param {string} titile 标题
   * @param {object} callback 回调函数
   */

		_createClass(Wikipage, [{
			key: 'reConstruct',
			value: function reConstruct(title) {
				var callback = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

				this.init(title, callback);
			}
			/* end reConstruct */

			/**
    * 获取页面基础信息并记录
    */
		}, {
			key: 'init',
			value: function init(title, callback, config) {
				if (title === undefined) title = this.pageName;
				if (callback === undefined) callback = {};

				var self = this;
				callback.success = callback.success || new Function();
				callback.fail = callback.success || new Function();
				$.ajax({
					type: 'GET',
					dataType: 'json',
					url: this.API,
					data: {
						'action': 'query',
						'prop': 'revisions|info',
						'titles': title,
						'rvprop': 'timestamp',
						'intoken': 'edit',
						'format': 'json'
					},
					beforeSend: function beforeSend() {
						console.time('获得页面基础信息时间耗时');
					},
					success: function success(data) {
						if (data && data.query && data.query.pages) {
							var info = data.query.pages;
							for (var key in info) {
								if (key !== '-1') {
									if (info[key].revisions && info[key].revisions.length > 0) {
										self.timeStamp[title] = info[key].revisions[0].timestamp;
									} else {
										callback.fail(throwError('fail_to_get_timestamp'));
									}
									if (info[key].edittoken) {
										if (info[key].edittoken != '+\\') {
											self.editToken[title] = info[key].edittoken;
										} else {
											console.log('无法通过API获得编辑令牌，可能是空页面，尝试通过前端API获取通用编辑令牌');
											self.editToken[title] = window.mw.user.tokens.get('editToken');
											if (self.editToken[title] && self.editToken[title] != '+\\') {
												console.log('成功获得通用编辑令牌 来自前端API');
											} else {
												callback.fail(throwError('fail_to_get_edittoken'));
											}
										}
									}
								} else {
									//原来版本这里依然会试着用前端API来获取Token，但是这样就没有了起始时间戳，有产生编辑覆盖的可能性
									callback.fail(throwError('fail_to_get_pageinfo'));
									self.inited = false;
								}
							}
						}
					}
				}).done(function () {
					console.timeEnd('获得页面基础信息时间耗时');
					self.inited = true;
					callback.success();
				});
			}
			/* end init */

			/**
    * 页面编辑
    * @param {string} content 页面内容
    * @param {string} title  页面标题 默认为当前页面标题
    * @param {object} callback 回调函数
    * @param {object} config 设置 覆盖到默认的设置
    */
		}, {
			key: 'edit',
			value: function edit(content) {
				var title = arguments.length <= 1 || arguments[1] === undefined ? this.pageName : arguments[1];
				var callback = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
				var config = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

				var self = this;
				callback.success = callback.success || new Function();
				callback.fail = callback.fail || new Function();
				if (content === undefined) {
					if (!config.empty === true) {
						callback.fail(throwError('empty_page_confirm'));
						return false;
					}
				}
				if (self.inited) {
					$.ajax({
						type: 'POST',
						url: self.API,
						data: $.extend({
							'action': 'edit',
							'format': 'json',
							'text': content,
							'title': title,
							'token': self.editToken[title] || self.editToken[self.pageName],
							'basetimestamp': self.timeStamp[title]
						}, config),
						success: function success(data) {
							if (data && data.edit) {
								if (data.edit.result && data.edit.result == 'Success') {
									callback.success();
								} else {
									if (data.edit.code) {
										//防滥用过滤器
										callback.fail(throwError('hit_abusefilter', '{i18n(\'hit_abusefilter\')}:' + data.edit.info.replace('/Hit AbuseFilter: /ig', '') + '<br><small>' + data.edit.warning + '</small>'));
									} else {
										callback.fail(throwError('unknown_edit_error'));
									}
								}
							} else if (data && data.error && data.error.code) {
								callback.fail(throwError(data.error.code.replace(/-/ig, '_')), i18n('unknown_edit_error_message').replace(/\$1/ig, data.error.code));
							} else if (data.code) {
								callback.fail(throwError('unknown_edit_error'), i18n('unknown_edit_error_message').replace(/\$1/ig, data.code));
							} else {
								callback.fail(throwError('unknown_edit_error'));
							}
						},
						error: function error(e) {
							callback.fail(throwError('network_edit_error'));
						}
					});
				} else {
					callback.fail(throwError('uninited'));
				}
			}
			/* end edit */

			/**
    * 编辑段落
    * @param {number} section 段落编号
    * @param {string} content 内容
    * @param {string} title 页面标题
    * @param {object} callback 回调函数 
    * @param {object} config 设置 
    */
		}, {
			key: 'editSection',
			value: function editSection(section, content) {
				var title = arguments.length <= 2 || arguments[2] === undefined ? this.pageName : arguments[2];
				var config = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
				var callback = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

				callback.success = callback.success || new Function();
				callback.fail = callback.fail || new Function();
				this.edit(content, title, callback, $.extend({
					'section': section
				}, config));
			}
			/* end editSection */

			/**
    * 重定向页面至
    * @param {string} target 目标页面标题
    * @param {string} title 页面名 默认为当前页面
    * @param {object} callback 回调函数
    */
		}, {
			key: 'redirectTo',
			value: function redirectTo(target) {
				var title = arguments.length <= 1 || arguments[1] === undefined ? this.pageName : arguments[1];
				var callback = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

				callback.success = callback.success || new Function();
				callback.fail = callback.fail || new Function();
				this.edit('#REDIRECT [[' + target + ']]', title, callback, {
					'summary': i18n('redirect_to_summary').replace(/\$1/ig, target)
				});
			}
			/* end redirectTo */

			/**
    * 重定向自
    * @param {string} origin 重定向页标题
    * @param {string} title 重定向目标页标题 默认为当前页
    * @param {object} callback
    */
		}, {
			key: 'redirectFrom',
			value: function redirectFrom(origin) {
				var title = arguments.length <= 1 || arguments[1] === undefined ? this.pageName : arguments[1];
				var callback = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

				callback.success = callback.success || new Function();
				callback.fail = callback.fail || new Function();
				this.edit('#REDIRECT [[' + title + ']]', origin, callback, {
					summary: i18n('redirect_from_summary').replace(/\$1/ig, origin).replace(/\$2/ig, title)
				});
			}
			/* end redirectFrom */

			/**
    * 获得页面维基文本
    * @param {object} callback 回调函数
    * @param {string} title 页面标题 默认为当前页面
    * @param {object} config 设置
    */
		}, {
			key: 'getWikiText',
			value: function getWikiText() {
				var callback = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
				var title = arguments.length <= 1 || arguments[1] === undefined ? this.pageName : arguments[1];
				var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

				callback.success = callback.success || new Function();
				callback.fail = callback.fail || new Function();
				$.ajax({
					url: location.protocol + '//' + location.host + mw.config.values.wgScriptPath + '/index.php',
					type: "GET",
					dataType: "text",
					cache: false,
					data: $.extend({
						'title': title,
						'action': 'raw'
					}, config),
					beforeSend: function beforeSend() {
						console.time('获得页面文本耗时');
					},
					success: function success(data) {
						console.timeEnd('获得页面文本耗时');
						callback.success(data);
					},
					error: function error(e) {
						callback.fail(throwError('fail_to_get_wikitext'));
					}
				});
			}
			/* end getWikiText */

			/**
    * 解析Wikitext
    * @param {string} wikitext 维基文本
    * @param {object} callback 回调函数
    * @param {object} config 设置
    */
		}, {
			key: 'parseWikiText',
			value: function parseWikiText(wikitext, callback, config) {
				if (wikitext === undefined) wikitext = '';
				if (callback === undefined) callback = {};

				callback.success = callback.success || new Function();
				callback.fail = callback.fail || new Function();
				$.ajax({
					type: 'POST',
					dataType: 'json',
					data: $.extend({
						'format': 'json',
						'action': 'parse',
						'text': wikitext,
						'title': this.pageName,
						'pst': 'true'
					}, config),
					url: this.API,
					success: function success(data) {
						if (data && data.parse && data.parse.text) {
							callback.success(data.parse.text['*']);
						} else {
							callback.fail(throwError('cant_parse_wikitext'));
						}
					}
				});
			}
			/* end parseWikiText */
		}]);

		return Wikipage;
	})();

	var Wikiplus = (function () {
		_createClass(Wikiplus, [{
			key: 'initQuickEdit',

			/**
    * 加载快速编辑 第一步 插入页面按钮并绑定入口事件
    */
			value: function initQuickEdit() {
				var callback = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

				var self = this;
				callback.success = callback.success || new Function();
				callback.fail = callback.fail || new Function();
				if (!(mw.config.values.wgIsArticle && mw.config.values.wgAction === "view" && mw.config.values.wgIsProbablyEditable)) {
					console.log('该页面无法编辑 快速编辑界面加载终止');
					return;
				}
				//顶部编辑入口
				var topBtn = $('<li>').attr('id', 'Wikiplus-Edit-TopBtn').append($('<span>').append($('<a>').attr('href', 'javascript:void(0)').text('' + i18n('quickedit_topbtn')))).data({
					number: -1,
					target: self.kotori.pageName
				});
				if ($('#ca-edit').length > 0 && $('#Wikiplus-Edit-TopBtn').length == 0) {
					$('#ca-edit').before(topBtn);
				}
				if ($('.mw-editsection').length > 0) {
					self.sectionMap = {};
					//段落快速编辑按钮
					var sectionBtn = $('<span>').append($('<span>').attr('id', 'mw-editsection-bracket').text('[')).append($('<a>').addClass('Wikiplus-Edit-SectionBtn').attr('href', 'javascript:void(0)').text(i18n('quickedit_sectionbtn'))).append($('<span>').attr('id', 'mw-editsection-bracket').text(']'));
					$('.mw-editsection').each(function (i) {
						try {
							var editURL = $(this).find("a").last().attr('href');
							var sectionNumber = editURL.match(/&[ve]*section\=(.+)/)[1];
							var sectionTargetName = decodeURI(editURL.match(/title=(.+?)&/)[1]);
							var sectionName = decodeURI($(this).prev().attr('id').replace(/\./ig, '%'));
							self.sectionMap[sectionNumber] = {
								name: sectionName,
								target: sectionTargetName
							};
							var _sectionBtn = sectionBtn.clone();
							_sectionBtn.find('.Wikiplus-Edit-SectionBtn').data({
								number: sectionNumber,
								name: sectionName,
								target: sectionTargetName
							});
							$(this).append(_sectionBtn);
						} catch (e) {
							throwError('fail_to_init_quickedit');
						}
					});
				}
				$('.Wikiplus-Edit-SectionBtn').click(function () {
					self.initQuickEditInterface($(this)); //直接把DOM传递给下一步
				});
				$('#Wikiplus-Edit-TopBtn').click(function () {
					self.initQuickEditInterface($(this));
				});
			}
			/* end initQuickEdit */

			/**
    * 加载快速编辑主界面相关内容
    */
		}, {
			key: 'initQuickEditInterface',
			value: function initQuickEditInterface(obj) {
				var self = this;
				var sectionNumber = obj.data('number');
				var sectionTargetName = obj.data('target');
				if (this.kotori.inited) {
					if (mw.config.values.wgCurRevisionId === mw.config.values.wgRevisionId) {
						if (this.preloadData[sectionTargetName + '.' + sectionNumber] === undefined) {
							this.notice.create.success(i18n('loading'));
							this.preload(sectionNumber, sectionTargetName, {
								success: function success(data) {
									obj.data('content', data);
									self.notice.empty();
									self.displayQuickEditInterface(obj);
								},
								fail: function fail(e) {
									throwError('fail_to_get_wikitext_when_edit');
								}
							});
						} else {
							obj.data('content', self.preloadData[sectionTargetName + '.' + sectionNumber]);
							self.displayQuickEditInterface(obj);
						}
					} else {
						this.notice.create.warning(i18n('history_edit_warning'));
						this.notice.create.success(i18n('loading'));
						this.preload(sectionNumber, sectionTargetName, {
							success: function success(data) {
								obj.data('content', data);
								self.notice.empty();
								self.displayQuickEditInterface(obj, '' + i18n('history_edit_warning'));
							},
							fail: function fail(data) {
								throwError('fail_to_get_wikitext_when_edit');
							}
						}, {
							'oldid': mw.config.values.wgRevisionId
						});
					}
				}
			}
			/* end initQuickEditInterface */

			/**
    * 显示快速编辑界面并绑定事件
    */
		}, {
			key: 'displayQuickEditInterface',
			value: function displayQuickEditInterface(obj) {
				var message = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

				var self = this;
				var sectionNumber = obj.data('number');
				var sectionName = obj.data('name');
				var sectionTargetName = obj.data('target');
				var sectionContent = obj.data('content');
				var summary = self.getSetting('defaultSummary', {
					'sectionName': sectionName,
					'sectionNumber': sectionNumber,
					'sectionTargetName': sectionTargetName
				});
				if (summary === undefined) {
					if (sectionName === undefined) {
						summary = '// Edit via Wikiplus';
					} else {
						summary = '/* ' + sectionName + ' */ // Edit via Wikiplus';
					}
				}
				//DOM定义
				var heightBefore = $(document).scrollTop(); //记住当前高度
				var backBtn = $('<span>').attr('id', 'Wikiplus-Quickedit-Back').addClass('Wikiplus-Btn').text('' + i18n('back')); //返回按钮
				var jumpBtn = $('<span>').attr('id', 'Wikiplus-Quickedit-Jump').addClass('Wikiplus-Btn').append($('<a>').attr('href', '#Wikiplus-Quickedit').text('' + i18n('goto_editbox'))); //到编辑框
				var inputBox = $('<textarea>').attr('id', 'Wikiplus-Quickedit'); //主编辑框
				var previewBox = $('<div>').attr('id', 'Wikiplus-Quickedit-Preview-Output'); //预览输出
				var summaryBox = $('<input>').attr('id', 'Wikiplus-Quickedit-Summary-Input').attr('placeholder', '' + i18n('summary_placehold')); //编辑摘要输入
				var editSubmitBtn = $('<button>').attr('id', 'Wikiplus-Quickedit-Submit').text(i18n('submit') + '(Ctrl+S)'); //提交按钮
				var previewSubmitBtn = $('<button>').attr('id', 'Wikiplus-Quickedit-Preview-Submit').text('' + i18n('preview')); //预览按钮
				var isMinorEdit = $('<div>').append($('<input>').attr({ 'type': 'checkbox', 'id': 'Wikiplus-Quickedit-MinorEdit' })).append($('<label>').attr('for', 'Wikiplus-Quickedit-MinorEdit').text(i18n('mark_minoredit') + '(Ctrl+Shift+S)')).css({ 'margin': '5px 5px 5px -3px', 'display': 'inline' });
				//DOM定义结束
				var editBody = $('<div>').append(backBtn, jumpBtn, previewBox, inputBox, summaryBox, $('<br>'), isMinorEdit, editSubmitBtn, previewSubmitBtn);
				this.createDialogBox('' + i18n('quickedit_topbtn') + message, editBody, 1000, function () {
					$('#Wikiplus-Quickedit').text(sectionContent);
					$('#Wikiplus-Quickedit-Summary-Input').val(summary);
					//事件绑定
					//返回
					$("#Wikiplus-Quickedit-Back").click(function () {
						$('.Wikiplus-InterBox').fadeOut('fast', function () {
							window.onclose = window.onbeforeunload = undefined; //取消页面关闭确认
							$(this).remove();
						});
					});
					//预览
					var onPreload = $('<div>').addClass('Wikiplus-Banner').text('' + i18n('loading_preview'));
					$('#Wikiplus-Quickedit-Preview-Submit').click(function () {
						var wikiText = $('#Wikiplus-Quickedit').val();
						$(this).attr('disabled', 'disabled');
						$('#Wikiplus-Quickedit-Preview-Output').fadeOut(100, function () {
							$('#Wikiplus-Quickedit-Preview-Output').html('').append(onPreload);
							$('#Wikiplus-Quickedit-Preview-Output').fadeIn(100);
						});
						$('body').animate({ scrollTop: heightBefore }, 200); //返回顶部
						self.kotori.parseWikiText(wikiText, {
							success: function success(data) {
								$('#Wikiplus-Quickedit-Preview-Output').fadeOut('100', function () {
									$('#Wikiplus-Quickedit-Preview-Output').html('<hr><div class="mw-body-content">' + data + '</div><hr>');
									$('#Wikiplus-Quickedit-Preview-Output').fadeIn('100');
									$('#Wikiplus-Quickedit-Preview-Submit').removeAttr('disabled');
								});
							}
						});
					});
					//提交
					$('#Wikiplus-Quickedit-Submit').click(function () {
						var wikiText = $('#Wikiplus-Quickedit').val();
						var summary = $('#Wikiplus-Quickedit-Summary-Input').val();
						var timer = new Date().valueOf();
						var onEdit = $('<div>').addClass('Wikiplus-Banner').text('' + i18n('submitting_edit'));
						var addtionalConfig = {
							'summary': summary
						};
						if (sectionNumber !== -1) {
							addtionalConfig['section'] = sectionNumber;
						}
						if ($('#Wikiplus-Quickedit-MinorEdit').is(':checked')) {
							addtionalConfig['minor'] = 'true';
						}
						//准备编辑 禁用各类按钮 返回顶部 显示信息
						$('#Wikiplus-Quickedit-Submit,#Wikiplus-Quickedit,#Wikiplus-Quickedit-Preview-Submit').attr('disabled', 'disabled');
						$('body').animate({ scrollTop: heightBefore }, 200);
						//开始提交编辑
						if (sectionTargetName === self.kotori.pageName) {
							$('#Wikiplus-Quickedit-Preview-Output').fadeOut(100, function () {
								$('#Wikiplus-Quickedit-Preview-Output').html('').append(onEdit);
								$('#Wikiplus-Quickedit-Preview-Output').fadeIn(100);
							});
							self.kotori.edit(wikiText, sectionTargetName, {
								success: function success() {
									var useTime = new Date().valueOf() - timer;
									$('#Wikiplus-Quickedit-Preview-Output').find('.Wikiplus-Banner').css('background', 'rgba(6, 239, 92, 0.44)');
									$('#Wikiplus-Quickedit-Preview-Output').find('.Wikiplus-Banner').text(('' + i18n('edit_success')).replace(/\$1/ig, useTime.toString()));
									self.sendStatistic(sectionTargetName, useTime);
									window.onclose = window.onbeforeunload = undefined; //取消页面关闭确认
									setTimeout(function () {
										location.reload();
									}, 500);
								},
								fail: function fail(e) {
									console.log(e);
									$('#Wikiplus-Quickedit-Submit,#Wikiplus-Quickedit,#Wikiplus-Quickedit-Preview-Submit').removeAttr('disabled');
									$('.Wikiplus-Banner').css('background', 'rgba(218, 142, 167, 0.65)');
									console.log($('.Wikiplus-Banner').text(e.message));
								}
							}, addtionalConfig);
						} else {
							//编辑目标非当前页面
							$('#Wikiplus-Quickedit-Preview-Output').fadeOut(100, function () {
								$('#Wikiplus-Quickedit-Preview-Output').html('').append(onEdit.text(i18n('cross_page_edit')));
								$('#Wikiplus-Quickedit-Preview-Output').fadeIn(100);
							});
							self.kotori.reConstruct(sectionTargetName, {
								success: function success() {
									$('.Wikiplus-Banner').text(i18n('cross_page_edit_submit'));
									self.kotori.edit(wikiText, sectionTargetName, {
										success: function success() {
											var useTime = new Date().valueOf() - timer;
											$('#Wikiplus-Quickedit-Preview-Output').find('.Wikiplus-Banner').css('background', 'rgba(6, 239, 92, 0.44)');
											$('#Wikiplus-Quickedit-Preview-Output').find('.Wikiplus-Banner').text(('' + i18n('edit_success')).replace(/\$1/ig, useTime));
											self.sendStatistic(sectionTargetName, useTime);
											window.onclose = window.onbeforeunload = undefined; //取消页面关闭确认
											setTimeout(function () {
												location.reload();
											}, 500);
										},
										fail: function fail(e) {
											$('#Wikiplus-Quickedit-Submit,#Wikiplus-Quickedit,#Wikiplus-Quickedit-Preview-Submit').removeAttr('disabled');
											$('.Wikiplus-Banner').css('background', 'rgba(218, 142, 167, 0.65)');
											$('.Wikiplus-Banner').text(e.message);
										}
									}, addtionalConfig);
								},
								fail: function fail(e) {
									$('.Wikiplus-Banner').css('background', 'rgba(218, 142, 167, 0.65)');
									$('.Wikiplus-Banner').text(i18n('cross_page_edit_error'));
								}
							});
						}
					});
					//快捷键
					//Ctrl+S提交 Ctrl+Shift+S小编辑
					$('#Wikiplus-Quickedit,#Wikiplus-Quickedit-Summary-Input,#Wikiplus-Quickedit-MinorEdit').keydown(function (e) {
						if (e.ctrlKey && e.which == 83) {
							if (e.shiftKey) {
								$('#Wikiplus-Quickedit-MinorEdit').click();
							}
							$('#Wikiplus-Quickedit-Submit').click();
							e.preventDefault();
							e.stopPropagation();
						}
					});
					//由于是异步提交 Wikiplus即使编辑失败 也不会丢失数据 唯一丢失数据的可能性是手滑关了页面
					//第一 关闭页面确认
					$('#Wikiplus-Quickedit').keydown(function () {
						window.onclose = window.onbeforeunload = function () {
							return '' + i18n('onclose_confirm');
						};
					});
				});
			}
			/* end displayQuickEditInterface */

			/**
    * 编辑设置
    */
		}, {
			key: 'editSettings',
			value: function editSettings() {
				var self = this;
				self.addFunctionButton(i18n('wikiplus_settings'), 'Wikiplus-Settings-Intro', function () {
					var input = $('<textarea>').attr('id', 'Wikiplus-Setting-Input').attr('rows', '10');
					var applyBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-Setting-Apply').text(i18n('submit'));
					var cancelBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-Setting-Cancel').text(i18n('cancel'));
					var content = $('<div>').append(input).append($('<hr>')).append(applyBtn).append(cancelBtn); //拼接
					self.createDialogBox(i18n('wikiplus_settings_desc'), content, 600, function () {
						if (localStorage.Wikiplus_Settings) {
							$('#Wikiplus-Setting-Input').val(localStorage.Wikiplus_Settings);
						} else {
							$('#Wikiplus-Setting-Input').attr('placeholder', i18n('wikiplus_settings_placeholder'));
						}
						$('#Wikiplus-Setting-Apply').click(function () {
							var settings = $('#Wikiplus-Setting-Input').val();
							try {
								settings = JSON.parse(settings);
							} catch (e) {
								self.notice.create.error(i18n('wikiplus_settings_grammar_error'));
								return;
							}
							localStorage.Wikiplus_Settings = JSON.stringify(settings);
							$('.Wikiplus-InterBox-Content').html('').append($('<div>').addClass('Wikiplus-Banner').text(i18n('wikiplus_settings_saved')));

							$('.Wikiplus-InterBox').fadeOut(300, function () {
								$(this).remove();
							});
						});
						$('#Wikiplus-Setting-Cancel').click(function () {
							$('.Wikiplus-InterBox').fadeOut(300, function () {
								$(this).remove();
							});
						});
					});
				});
			}
			/* end editSettings */

			/**
    * 快速重定向页面至此页面
    */
		}, {
			key: 'simpleRedirector',
			value: function simpleRedirector() {
				var self = this;
				self.addFunctionButton(i18n('redirect_from'), 'Wikiplus-SR-Intro', function () {
					var input = $('<input>').addClass('Wikiplus-InterBox-Input');
					var applyBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-SR-Apply').text(i18n('submit'));
					var cancelBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-SR-Cancel').text(i18n('cancel'));
					var content = $('<div>').append(input).append($('<hr>')).append(applyBtn).append(cancelBtn); //拼接
					self.createDialogBox(i18n('redirect_desc'), content, 600, function () {
						$('#Wikiplus-SR-Apply').click(function () {
							if ($('.Wikiplus-InterBox-Input').val() != '') {
								var title = $('.Wikiplus-InterBox-Input').val();
								$('.Wikiplus-InterBox-Content').html('<div class="Wikiplus-Banner">' + i18n('submitting_edit') + '</div>');
								self.kotori.redirectFrom(title, self.kotori.pageName, {
									success: function success() {
										$('.Wikiplus-Banner').text(i18n('redirect_saved'));
										$('.Wikiplus-InterBox').fadeOut(300);
										location.href = mw.config.values.wgArticlePath.replace(/\$1/ig, title);
									},
									fail: function fail(e) {
										$('.Wikiplus-Banner').css('background', 'rgba(218, 142, 167, 0.65)');
										$('.Wikiplus-Banner').text(e.message);
									}
								});
							} else {
								self.showNotice.create.warning(i18n('empty_input'));
							}
						});
						$('#Wikiplus-SR-Cancel').click(function () {
							$('.Wikiplus-InterBox').fadeOut(300, function () {
								$(this).remove();
							});
						});
					});
				});
			}
			/* end simpleRedirector */

			/**
    * 预读取相关事件绑定
    */
		}, {
			key: 'preloadEventBinding',
			value: function preloadEventBinding() {
				var self = this;
				$("#toc").children("ul").find("a").each(function (i) {
					$(this).mouseover(function () {
						$(this).unbind('mouseover');
						self.preload(i + 1);
					});
				});
			}
			/* end preloadEventBinding */

			/**
    * 检查多语言定义缓存是否过期
    */
		}, {
			key: 'checki18nCache',
			value: function checki18nCache() {
				if (localStorage.Wikiplus_i18nCache) {
					try {
						var _i18nData = JSON.parse(localStorage.Wikiplus_i18nCache);
						for (var languages in _i18nData) {
							if (_i18nData[languages]['__version'] === this.langVersion) {
								i18nData[_i18nData[languages]['__language']] = _i18nData[languages];
							} else {
								console.log('多语言文件[' + languages + ']已经过期');
								loadLanguage(_i18nData[languages]['__language']); //尝试重新取
							}
						}
					} catch (e) {
						throwError('cant_parse_i18ncache');
					}
				} else {
					localStorage.Wikiplus_i18nCache = JSON.stringify(i18nData);
				}
			}
			/* end checki18nCache */

			/**
    * ===========================
    * 以上是功能函数 以下是通用函数
    * ===========================
    */

			/**
    * 创建对话框
    * @param {string} title 对话框标题
    * @param {HTML} content 内容 
    * @param {interger} width 宽度 单位像素 默认600px
    * @param {function} callback 回调函数
    */
		}, {
			key: 'createDialogBox',
			value: function createDialogBox() {
				var title = arguments.length <= 0 || arguments[0] === undefined ? 'Dialog Box' : arguments[0];
				var content = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
				var width = arguments.length <= 2 || arguments[2] === undefined ? 600 : arguments[2];
				var callback = arguments.length <= 3 || arguments[3] === undefined ? new Function() : arguments[3];

				if ($('.Wikiplus-InterBox').length > 0) {
					$('.Wikiplus-InterBox').each(function () {
						$(this).remove();
					});
				}
				var clientWidth = document.body.clientWidth;
				var clientHeight = document.body.clientHeight;
				var diglogBox = $('<div>').addClass('Wikiplus-InterBox').css({
					'margin-left': clientWidth / 2 - width / 2,
					'top': $(document).scrollTop() + clientHeight * 0.2,
					'display': 'none'
				}).append($('<div>').addClass('Wikiplus-InterBox-Header').html(title)).append($('<div>').addClass('Wikiplus-InterBox-Content').append(content)).append($('<span>').text('×').addClass('Wikiplus-InterBox-Close'));
				$('body').append(diglogBox);
				$('.Wikiplus-InterBox').width(width);
				$('.Wikiplus-InterBox-Close').click(function () {
					$(this).parent().fadeOut('fast', function () {
						window.onclose = window.onbeforeunload = undefined; //取消页面关闭确认
						$(this).remove();
					});
				});
				//拖曳
				var bindDragging = function bindDragging(element) {
					element.mousedown(function (e) {
						var baseX = e.clientX;
						var baseY = e.clientY;
						var baseOffsetX = element.parent().offset().left;
						var baseOffsetY = element.parent().offset().top;
						$(document).mousemove(function (e) {
							element.parent().css({
								'margin-left': baseOffsetX + e.clientX - baseX,
								'top': baseOffsetY + e.clientY - baseY
							});
						});
						$(document).mouseup(function () {
							element.unbind('mousedown');
							$(document).unbind('mousemove');
							$(document).unbind('mouseup');
							bindDragging(element);
						});
					});
				};
				bindDragging($('.Wikiplus-InterBox-Header'));
				$('.Wikiplus-InterBox').fadeIn(500);
				callback();
			}
			/* end createDialogBox */

			/**
    * 增加功能按钮
    * @param {string} text 按钮名
    * @param {string} id 按钮id
    * @param {function} clickEvent 点击事件 
    */
		}, {
			key: 'addFunctionButton',
			value: function addFunctionButton(text, id, clickEvent) {
				var button = $('<li></li>').attr('id', id).append($('<a></a>').attr('href', 'javascript:void(0);').text(text));
				if ($('#p-cactions .menu').length > 0) {
					$('#p-cactions .menu ul').append(button);
					$('#p-cactions .menu ul').find('li').last().click(clickEvent);
				} else {
					throwError('cant_add_funcbtn');
				}
			}
			/* end addFunctionButton */

			/**
    * 预读取内容
    * @param {interger} section 段落编号 默认为-1即全页
    * @param {string} title 页面名 默认为当前页面
    * @param {object} callback 回调
    */
		}, {
			key: 'preload',
			value: function preload() {
				var section = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];
				var title = arguments.length <= 1 || arguments[1] === undefined ? this.kotori.pageName : arguments[1];
				var callback = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
				var config = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

				callback.success = callback.success || new Function();
				callback.fail = callback.fail || new Function();
				var self = this;
				if (config.oldid !== undefined) {
					// oldid 优先于 页面名
					console.log(typeof config.oldid);
					if (this.preloadData[config.oldid + '.' + section]) {
						console.log('[修订版本' + config.oldid + '.' + section + ']已经预读取 跳过本次预读取');
						callback.success(this.preloadData[config.oldid + '.' + section]);
						return;
					}
				} else {
					if (this.preloadData[title + '.' + section]) {
						console.log('[' + title + '.' + section + ']已经预读取 跳过本次预读取');
						callback.success(this.preloadData[title + '.' + section]);
						return;
					}
				}
				this.kotori.getWikiText({
					success: function success(data) {
						if (config.oldid !== undefined) {
							self.preloadData[config.oldid + '.' + section] = data;
							console.log('预读取[修订版本' + config.oldid + '.' + section + ']成功');
						} else {
							self.preloadData[title + '.' + section] = data;
							console.log('预读取[' + title + '.' + section + ']成功');
						}
						callback.success(data);
					},
					fail: function fail(e) {
						if (config.oldid !== undefined) {
							console.log('预读取[修订版本' + config.oldid + '.' + section + ']失败');
						} else {
							console.log('预读取[' + title + '.' + section + ']失败:' + e.message);
						}
						callback.fail(e);
					}
				}, title, $.extend({
					section: section === -1 ? '' : section
				}, config));
			}
			/* end preload */

			/**
    * 提交统计数据
    * @param {string} title 页面名
    * @param {interger} useTime 用时 单位毫秒
    */
		}, {
			key: 'sendStatistic',
			value: function sendStatistic(title, useTime) {
				if (title === undefined) title = mw.config.values.wgPageName;

				if (localStorage.Wikiplus_SendStatistics == 'True') {
					$.ajax({
						url: scriptPath + '/statistics/api/submit',
						type: 'POST',
						dataType: 'json',
						data: {
							'wikiname': mw.config.values.wgSiteName,
							'usetime': useTime,
							'username': mw.config.values.wgUserName,
							'pagename': title
						},
						success: function success(data) {
							//提交成功
						}
					});
				}
			}
			/* end sendStatistic */

			/**
    * 检查安装
    * @param {function} callback 回调函数
    */
		}, {
			key: 'checkInstall',
			value: function checkInstall(callback) {
				var self = this;
				if (!localStorage.Wikiplus_Installed || localStorage.Wikiplus_Installed == 'False') {
					//安装
					var install = function install() {
						localStorage.Wikiplus_Installed = 'True'; //标记已安装
						localStorage.Wikiplus_Version = self.version;
						localStorage.Wikiplus_StartUseAt = new Date().valueOf();
						localStorage.Wikiplus_SrartEditCount = mw.config.values.wgUserEditCount;
						localStorage.Wikiplus_Settings = JSON.stringify(self.defaultSettings);
						$('.Wikiplus-InterBox').fadeOut('fast', function () {
							self.notice.create.success(i18n('install_finish'));
							$(this).remove();
						});
					};
					var notice = $('<div>').text(i18n('install_tip').replace(/\$1/ig, mw.config.values.wgSiteName)).attr('id', 'Wikiplus-InterBox-Content');
					var applyBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-Setting-Apply').text(i18n('accept'));
					var cancelBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-Setting-Cancel').text(i18n('decline'));
					var content = $('<div>').append(notice).append($('<hr>')).append(applyBtn).append(cancelBtn); //拼接
					self.createDialogBox('安装Wikiplus', content, 600, function () {
						$('#Wikiplus-InterBox-Content').css('text-align', 'left');
						$('#Wikiplus-Setting-Apply').click(function () {
							localStorage.Wikiplus_SendStatistics = 'True';
							install();
						});
						$('#Wikiplus-Setting-Cancel').click(function () {
							localStorage.Wikiplus_SendStatistics = 'False';
							install();
						});
					});
				}
			}
			/* end checkInstall */

			/**
    * 获取设置值
    * @param {string} key 键名
    * @param {object} object 传入可用参数
    */
		}, {
			key: 'getSetting',
			value: function getSetting(key, object) {
				var w = object;
				try {
					var settings = $.parseJSON(localStorage.Wikiplus_Settings);
				} catch (e) {
					return localStorage.Wikiplus_Settings || '';
				}
				try {
					var _setting = new Function('return ' + settings[key]);
					if (typeof _setting == 'function') {
						try {
							if (_setting()(w) === true) {
								return undefined;
							} else {
								return _setting()(w) || settings[key];
							}
						} catch (e) {
							return settings[key];
						}
					} else {
						return settings[key];
					}
				} catch (e) {
					try {
						return settings[key];
					} catch (e) {
						return undefined;
					}
				}
			}
			/* end getSetting */

		}, {
			key: 'initBasicFunctions',
			value: function initBasicFunctions() {
				this.initQuickEdit(); //加载快速编辑
				this.editSettings(); //编辑设置
				this.simpleRedirector(); //快速重定向
				this.preloadEventBinding(); //预读取
			}
		}, {
			key: 'initRecentChangesPageFunctions',
			value: function initRecentChangesPageFunctions() {}
		}, {
			key: 'initAdvancedFunctions',
			value: function initAdvancedFunctions() {}
		}]);

		function Wikiplus() {
			_classCallCheck(this, Wikiplus);

			this.version = '2.1.1';
			this.langVersion = '204';
			this.releaseNote = '插件系统-dev 0.0.1';
			this.notice = new MoeNotification();
			this.inValidNameSpaces = [-1, 8964];
			this.defaultSettings = {
				'设置名': '设置值',
				'设置参考': 'http://zh.moegirl.org/User:%E5%A6%B9%E7%A9%BA%E9%85%B1/Wikiplus/%E8%AE%BE%E7%BD%AE%E8%AF%B4%E6%98%8E'
			};
			console.log('正在加载Wikiplus ' + this.version);
			//载入CSS
			$("head").append("<link>");
			$("head").children(":last").attr({
				rel: "stylesheet",
				type: "text/css",
				href: scriptPath + '/wikiplus.css'
			});
			//一些初始化工作
			this.preloadData = {};
			this.checkInstall(); //安装检查
			//语言检测
			var language = this.getSetting('language') && this.getSetting('language').toLowerCase() || window.navigator.language.toLowerCase();
			//版本检查
			if (!(this.version === localStorage.Wikiplus_Version)) {
				localStorage.Wikiplus_Version = this.version;
				this.notice.create.success('Wikiplus ' + this.version);
				this.notice.create.success(language === 'zh-cn' ? this.releaseNote : 'Minor bug fixes.'); // 避免给其他语言用户不必要的理解困难
			}
			if (i18nData[language] === undefined) {
				loadLanguage(language);
			}
			//真正的初始化
			if (!inArray(mw.config.values.wgNameSpaceNumber, this.inValidNameSpaces) && mw.config.values.wgIsArticle && mw.config.values.wgAction === "view") {
				this.kotori = new Wikipage();
				this.checki18nCache();
				this.initBasicFunctions();
			} else {
				console.log('不符合加载条件 Wikiplus终止');
			}
		}

		return Wikiplus;
	})();

	window.Wikiplus = new Wikiplus();
	/* end */
});
