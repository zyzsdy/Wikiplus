class Wikipage {
	constructor(pageName = window.mw.config.values.wgPageName) {
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
		this.API = `${location.protocol}//${location.host}${window.mw.config.values.wgScriptPath}/api.php`;
		//从API获得编辑令牌和起始时间戳
		this.editToken = {};
		this.timeStamp = {};
		this.init(this.pageName, {
			success: function () {
				console.log('Wikiplus加载完毕');
			},
			fail: function (e) {
				console.log(`Wikiplus未能正确加载(${e.message})`)
			}
		})
	}/* end constructor */
	
	/**
	 * 针对非本页面的编辑 提供重定义时间戳和权标接口
	 * @param {string} titile 标题
	 * @param {object} callback 回调函数
	 */
	reConstruct(title, callback = {}) {
		this.init(title, callback);
	}/* end reConstruct */
	
	/**
	 * 获取页面基础信息并记录
	 */
	init(title = this.pageName, callback = {}, config) {
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
			beforeSend: function () {
				console.time('获得页面基础信息时间耗时');
			},
			success: function (data) {
				if (data && data.query && data.query.pages) {
					var info = data.query.pages;
					for (var key in info) {
						if (key !== '-1') {
							if (info[key].revisions && info[key].revisions.length > 0) {
								self.timeStamp[title] = info[key].revisions[0].timestamp;
							}
							else {
								callback.fail(throwError('fail_to_get_timestamp'));
							}
							if (info[key].edittoken) {
								if (info[key].edittoken != '+\\') {
									self.editToken[title] = info[key].edittoken;
								}
								else {
									console.log('无法通过API获得编辑令牌，可能是空页面，尝试通过前端API获取通用编辑令牌');
									self.editToken[title] = window.mw.user.tokens.get('editToken');
									if (self.editToken[title] && self.editToken[title] != '+\\') {
										console.log('成功获得通用编辑令牌 来自前端API');
									}
									else {
										callback.fail(throwError('fail_to_get_edittoken'));
									}
								}
							}
						}
						else {
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
		})
	}/* end init */
	
	/**
	 * 页面编辑
	 * @param {string} content 页面内容
	 * @param {string} title  页面标题 默认为当前页面标题
	 * @param {object} callback 回调函数
	 * @param {object} config 设置 覆盖到默认的设置
	 */
	edit(content, title = this.pageName, callback = {}, config = {}) {
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
				success: function (data) {
					if (data && data.edit) {
						if (data.edit.result && data.edit.result == 'Success') {
							callback.success();
						}
						else {
							if (data.edit.code) {
								//防滥用过滤器
								callback.fail(throwError('hit_abusefilter', `{i18n('hit_abusefilter')}:${data.edit.info.replace('/Hit AbuseFilter: /ig', '') }<br><small>${data.edit.warning}</small>`));
							}
							else {
								callback.fail(throwError('unknown_edit_error'));
							}
						}
					}
					else if (data && data.error && data.error.code) {
						callback.fail(throwError(data.error.code.replace(/-/ig, '_')), i18n('unknown_edit_error_message').replace(/\$1/ig, data.error.code));
					}
					else if (data.code) {
						callback.fail(throwError('unknown_edit_error'), i18n('unknown_edit_error_message').replace(/\$1/ig, data.code));
					}
					else {
						callback.fail(throwError('unknown_edit_error'));
					}
				},
				error: function (e) {
					callback.fail(throwError('network_edit_error'));
				}
			})
		}
		else {
			callback.fail(throwError('uninited'));
		}
	}/* end edit */
	
	/**
	 * 编辑段落
	 * @param {number} section 段落编号
	 * @param {string} content 内容
	 * @param {string} title 页面标题
	 * @param {object} callback 回调函数 
	 * @param {object} config 设置 
	 */
	editSection(section, content, title = this.pageName, config = {}, callback = {}) {
		callback.success = callback.success || new Function();
		callback.fail = callback.fail || new Function();
		this.edit(content, title, callback, $.extend({
			'section': section
		}, config));
	}/* end editSection */
	
	/**
	 * 重定向页面至
	 * @param {string} target 目标页面标题
	 * @param {string} title 页面名 默认为当前页面
	 * @param {object} callback 回调函数
	 */
	redirectTo(target, title = this.pageName, callback = {}) {
		callback.success = callback.success || new Function();
		callback.fail = callback.fail || new Function();
		this.edit(`#REDIRECT [[${target}]]`, title, callback, {
			'summary': i18n('redirect_to_summary').replace(/\$1/ig, target)
		});
	}/* end redirectTo */
	
	/**
	 * 重定向自
	 * @param {string} origin 重定向页标题
	 * @param {string} title 重定向目标页标题 默认为当前页
	 * @param {object} callback
	 */
	redirectFrom(origin, title = this.pageName, callback = {}) {
		callback.success = callback.success || new Function();
		callback.fail = callback.fail || new Function();
		this.edit(`#REDIRECT [[${title}]]`, origin, callback, {
			summary: i18n('redirect_from_summary').replace(/\$1/ig, origin).replace(/\$2/ig, title)
		});
	}/* end redirectFrom */
	
	/**
	 * 获得页面维基文本
	 * @param {object} callback 回调函数
	 * @param {string} title 页面标题 默认为当前页面
	 * @param {object} config 设置
	 */
	getWikiText(callback = {}, title = this.pageName, config = {}) {
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
			beforeSend: function () {
				console.time('获得页面文本耗时');
			},
			success: function (data) {
				console.timeEnd('获得页面文本耗时');
				callback.success(data);
			},
			error: function (e) {
				callback.fail(throwError('fail_to_get_wikitext'));
			}
		})
	}/* end getWikiText */
	
	/**
	 * 解析Wikitext
	 * @param {string} wikitext 维基文本
	 * @param {object} callback 回调函数
	 * @param {object} config 设置
	 */
	parseWikiText(wikitext = '', callback = {}, config) {
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
			success: function (data) {
				if (data && data.parse && data.parse.text) {
					callback.success(data.parse.text['*']);
				}
				else {
					callback.fail(throwError('cant_parse_wikitext'));
				}
			}
		})
	}/* end parseWikiText */
}
