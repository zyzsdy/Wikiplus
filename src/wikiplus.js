class Wikiplus {
	/**
	 * 加载快速编辑 第一步 插入页面按钮并绑定入口事件
	 */
	initQuickEdit(callback = {}) {
		var self = this;
		callback.success = callback.success || new Function();
		callback.fail = callback.fail || new Function();
		if (!(mw.config.values.wgIsArticle && mw.config.values.wgAction === "view" && mw.config.values.wgIsProbablyEditable)) {
			console.log('该页面无法编辑 快速编辑界面加载终止');
			return;
		}
		//顶部编辑入口
		var topBtn = $('<li>').attr('id', 'Wikiplus-Edit-TopBtn').append(
			$('<span>').append(
				$('<a>').attr('href', 'javascript:void(0)').text(`${i18n('quickedit_topbtn') }`)
				)
			).data({
				number: -1,
				target: self.kotori.pageName
			});
		if ($('#ca-edit').length > 0 && $('#Wikiplus-Edit-TopBtn').length == 0) {
			$('#ca-edit').before(topBtn);
		}
		if ($('.mw-editsection').length > 0) {
			self.sectionMap = {};
			//段落快速编辑按钮
			var sectionBtn = $('<span>').append(
				$('<span>').attr('id', 'mw-editsection-bracket').text('[')
				).append(
					$('<a>').addClass('Wikiplus-Edit-SectionBtn').attr('href', 'javascript:void(0)').text(i18n('quickedit_sectionbtn'))
					).append(
						$('<span>').attr('id', 'mw-editsection-bracket').text(']')
						)
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
					})
					$(this).append(_sectionBtn);
				}
				catch (e) {
					throwError('fail_to_init_quickedit');
				}
			});
		}
		$('.Wikiplus-Edit-SectionBtn').click(function () {
			self.initQuickEditInterface($(this)); //直接把DOM传递给下一步
		});
		$('#Wikiplus-Edit-TopBtn').click(function () {
			self.initQuickEditInterface($(this));
		})
	}/* end initQuickEdit */
	
	/**
	 * 加载快速编辑主界面相关内容
	 */
	initQuickEditInterface(obj) {
		var self = this;
		var sectionNumber = obj.data('number');
		var sectionTargetName = obj.data('target');
		if (this.kotori.inited) {
			if (mw.config.values.wgCurRevisionId === mw.config.values.wgRevisionId) {
				if (this.preloadData[`${sectionTargetName}.${sectionNumber}`] === undefined) {
					this.notice.create.success(i18n('loading'))
					this.preload(sectionNumber, sectionTargetName, {
						success: function (data) {
							obj.data('content', data);
							self.notice.empty();
							self.displayQuickEditInterface(obj);
						},
						fail: function (e) {
							throwError('fail_to_get_wikitext_when_edit');
						}
					})
				}
				else {
					obj.data('content', self.preloadData[`${sectionTargetName}.${sectionNumber}`]);
					self.displayQuickEditInterface(obj);
				}
			}
			else {
				this.notice.create.warning(i18n('history_edit_warning'));
				this.notice.create.success(i18n('loading'))
				this.preload(sectionNumber, sectionTargetName, {
					success: function (data) {
						obj.data('content', data);
						self.notice.empty();
						self.displayQuickEditInterface(obj, `${i18n('history_edit_warning') }`);
					},
					fail: function (data) {
						throwError('fail_to_get_wikitext_when_edit');
					}
				}, {
						'oldid': mw.config.values.wgRevisionId
					})
			}
		}
	}/* end initQuickEditInterface */
	
	/**
	 * 显示快速编辑界面并绑定事件
	 */
	displayQuickEditInterface(obj, message = '') {
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
			}
			else {
				summary = `/* ${sectionName} */ // Edit via Wikiplus`;
			}
		}
		//DOM定义
		var heightBefore = $(document).scrollTop();//记住当前高度
		var backBtn = $('<span>').attr('id', 'Wikiplus-Quickedit-Back').addClass('Wikiplus-Btn').text(`${i18n('back') }`);//返回按钮
		var jumpBtn = $('<span>').attr('id', 'Wikiplus-Quickedit-Jump').addClass('Wikiplus-Btn').append(
			$('<a>').attr('href', '#Wikiplus-Quickedit').text(`${i18n('goto_editbox') }`)
			);//到编辑框
		var inputBox = $('<textarea>').attr('id', 'Wikiplus-Quickedit');//主编辑框
		var previewBox = $('<div>').attr('id', 'Wikiplus-Quickedit-Preview-Output');//预览输出
		var summaryBox = $('<input>').attr('id', 'Wikiplus-Quickedit-Summary-Input').attr('placeholder', `${i18n('summary_placehold') }`);//编辑摘要输入
		var editSubmitBtn = $('<button>').attr('id', 'Wikiplus-Quickedit-Submit').text(`${i18n('submit') }(Ctrl+S)`);//提交按钮
		var previewSubmitBtn = $('<button>').attr('id', 'Wikiplus-Quickedit-Preview-Submit').text(`${i18n('preview') }`);//预览按钮
		var isMinorEdit = $('<div>').append(
			$('<input>').attr({ 'type': 'checkbox', 'id': 'Wikiplus-Quickedit-MinorEdit' })
			)
			.append(
				$('<label>').attr('for', 'Wikiplus-Quickedit-MinorEdit').text(`${i18n('mark_minoredit') }(Ctrl+Shift+S)`)
				)
			.css({ 'margin': '5px 5px 5px -3px', 'display': 'inline' });
		//DOM定义结束
		var editBody = $('<div>').append(backBtn, jumpBtn, previewBox, inputBox, summaryBox, $('<br>'), isMinorEdit, editSubmitBtn, previewSubmitBtn);
		this.createDialogBox(`${i18n('quickedit_topbtn') }${message}`, editBody, 1000, function () {
			$('#Wikiplus-Quickedit').text(sectionContent);
			$('#Wikiplus-Quickedit-Summary-Input').val(summary);
			//事件绑定
			//返回
			$("#Wikiplus-Quickedit-Back").click(function () {
				$('.Wikiplus-InterBox').fadeOut('fast', function () {
					window.onclose = window.onbeforeunload = undefined; //取消页面关闭确认
					$(this).remove();
				})
			});
			//预览
			var onPreload = $('<div>').addClass('Wikiplus-Banner').text(`${i18n('loading_preview') }`);
			$('#Wikiplus-Quickedit-Preview-Submit').click(function () {
				var wikiText = $('#Wikiplus-Quickedit').val();
				$(this).attr('disabled', 'disabled');
				$('#Wikiplus-Quickedit-Preview-Output').fadeOut(100, function () {
					$('#Wikiplus-Quickedit-Preview-Output').html('').append(onPreload);
					$('#Wikiplus-Quickedit-Preview-Output').fadeIn(100);
				});
				$('body').animate({ scrollTop: heightBefore }, 200);//返回顶部
				self.kotori.parseWikiText(wikiText, {
					success: function (data) {
						$('#Wikiplus-Quickedit-Preview-Output').fadeOut('100', function () {
							$('#Wikiplus-Quickedit-Preview-Output').html('<hr><div class="mw-body-content">' + data + '</div><hr>');
							$('#Wikiplus-Quickedit-Preview-Output').fadeIn('100');
							$('#Wikiplus-Quickedit-Preview-Submit').removeAttr('disabled');
						});
					}
				})
			});
			//提交
			$('#Wikiplus-Quickedit-Submit').click(function () {
				var wikiText = $('#Wikiplus-Quickedit').val();
				var summary = $('#Wikiplus-Quickedit-Summary-Input').val();
				var timer = new Date().valueOf();
				var onEdit = $('<div>').addClass('Wikiplus-Banner').text(`${i18n('submitting_edit') }`);
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
						success: function () {
							var useTime = new Date().valueOf() - timer;
							$('#Wikiplus-Quickedit-Preview-Output').find('.Wikiplus-Banner').css('background', 'rgba(6, 239, 92, 0.44)');
							$('#Wikiplus-Quickedit-Preview-Output').find('.Wikiplus-Banner').text(`${i18n('edit_success') }`.replace(/\$1/ig, useTime.toString()));
							self.sendStatistic(sectionTargetName, useTime);
							window.onclose = window.onbeforeunload = undefined; //取消页面关闭确认
							setTimeout(function () {
								location.reload();
							}, 500);
						},
						fail: function (e) {
							console.log(e);
							$('#Wikiplus-Quickedit-Submit,#Wikiplus-Quickedit,#Wikiplus-Quickedit-Preview-Submit').removeAttr('disabled');
							$('.Wikiplus-Banner').css('background', 'rgba(218, 142, 167, 0.65)');
							console.log($('.Wikiplus-Banner').text(e.message));
						}
					}, addtionalConfig);
				}
				else {
					//编辑目标非当前页面
					$('#Wikiplus-Quickedit-Preview-Output').fadeOut(100, function () {
						$('#Wikiplus-Quickedit-Preview-Output').html('').append(onEdit.text(i18n('cross_page_edit')));
						$('#Wikiplus-Quickedit-Preview-Output').fadeIn(100);
					});
					self.kotori.reConstruct(sectionTargetName, {
						success: function () {
							$('.Wikiplus-Banner').text(i18n('cross_page_edit_submit'));
							self.kotori.edit(wikiText, sectionTargetName, {
								success: function () {
									var useTime = new Date().valueOf() - timer;
									$('#Wikiplus-Quickedit-Preview-Output').find('.Wikiplus-Banner').css('background', 'rgba(6, 239, 92, 0.44)');
									$('#Wikiplus-Quickedit-Preview-Output').find('.Wikiplus-Banner').text(`${i18n('edit_success') }`.replace(/\$1/ig, useTime));
									self.sendStatistic(sectionTargetName, useTime);
									window.onclose = window.onbeforeunload = undefined; //取消页面关闭确认
									setTimeout(function () {
										location.reload();
									}, 500);
								},
								fail: function (e) {
									$('#Wikiplus-Quickedit-Submit,#Wikiplus-Quickedit,#Wikiplus-Quickedit-Preview-Submit').removeAttr('disabled');
									$('.Wikiplus-Banner').css('background', 'rgba(218, 142, 167, 0.65)');
									$('.Wikiplus-Banner').text(e.message);
								}
							}, addtionalConfig);
						},
						fail: function (e) {
							$('.Wikiplus-Banner').css('background', 'rgba(218, 142, 167, 0.65)');
							$('.Wikiplus-Banner').text(i18n('cross_page_edit_error'));
						}
					})
				}
			})
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
			})
			//由于是异步提交 Wikiplus即使编辑失败 也不会丢失数据 唯一丢失数据的可能性是手滑关了页面
			//第一 关闭页面确认
			$('#Wikiplus-Quickedit').keydown(function () {
				window.onclose = window.onbeforeunload = function () {
					return `${i18n('onclose_confirm') }`;
				}
			});
		})
	}/* end displayQuickEditInterface */
	
	/**
	 * 编辑设置
	 */
	editSettings() {
		var self = this;
		self.addFunctionButton(i18n('wikiplus_settings'), 'Wikiplus-Settings-Intro', function () {
			var input = $('<textarea>').attr('id', 'Wikiplus-Setting-Input').attr('rows', '10');
			var applyBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-Setting-Apply').text(i18n('submit'));
			var cancelBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-Setting-Cancel').text(i18n('cancel'));
			var content = $('<div>').append(input).append($('<hr>')).append(applyBtn).append(cancelBtn);//拼接
			self.createDialogBox(i18n('wikiplus_settings_desc'), content, 600, function () {
				if (localStorage.Wikiplus_Settings) {
					$('#Wikiplus-Setting-Input').val(localStorage.Wikiplus_Settings);
				}
				else {
					$('#Wikiplus-Setting-Input').attr('placeholder', i18n('wikiplus_settings_placeholder'));
				}
				$('#Wikiplus-Setting-Apply').click(function () {
					var settings = $('#Wikiplus-Setting-Input').val();
					try {
						settings = JSON.parse(settings);
					}
					catch (e) {
						self.notice.create.error(i18n('wikiplus_settings_grammar_error'));
						return;
					}
					localStorage.Wikiplus_Settings = JSON.stringify(settings);
					$('.Wikiplus-InterBox-Content').html('').append(
						$('<div>').addClass('Wikiplus-Banner').text(i18n('wikiplus_settings_saved'))
						);

					$('.Wikiplus-InterBox').fadeOut(300, function () {
						$(this).remove();
					});
				})
				$('#Wikiplus-Setting-Cancel').click(function () {
					$('.Wikiplus-InterBox').fadeOut(300, function () {
						$(this).remove();
					});
				})
			});
		});
	}/* end editSettings */
	
	/**
	 * 快速重定向页面至此页面
	 */
	simpleRedirector() {
		var self = this;
		self.addFunctionButton(i18n('redirect_from'), 'Wikiplus-SR-Intro', function () {
			var input = $('<input>').addClass('Wikiplus-InterBox-Input');
			var applyBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-SR-Apply').text(i18n('submit'));
			var cancelBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-SR-Cancel').text(i18n('cancel'));
			var content = $('<div>').append(input).append($('<hr>')).append(applyBtn).append(cancelBtn);//拼接
			self.createDialogBox(i18n('redirect_desc'), content, 600, function () {
				$('#Wikiplus-SR-Apply').click(function () {
					if ($('.Wikiplus-InterBox-Input').val() != '') {
						var title = $('.Wikiplus-InterBox-Input').val()
						$('.Wikiplus-InterBox-Content').html(`<div class="Wikiplus-Banner">${i18n('submitting_edit') }</div>`);
						self.kotori.redirectFrom(title, self.kotori.pageName, {
							success: function () {
								$('.Wikiplus-Banner').text(i18n('redirect_saved'));
								$('.Wikiplus-InterBox').fadeOut(300);
								location.href = mw.config.values.wgArticlePath.replace(/\$1/ig, title);
							},
							fail: function (e) {
								$('.Wikiplus-Banner').css('background', 'rgba(218, 142, 167, 0.65)');
								$('.Wikiplus-Banner').text(e.message);
							}
						});
					}
					else {
						self.showNotice.create.warning(i18n('empty_input'));
					}
				});
				$('#Wikiplus-SR-Cancel').click(function () {
					$('.Wikiplus-InterBox').fadeOut(300, function () {
						$(this).remove();
					});
				})
			});
		})
	}/* end simpleRedirector */
	
	/**
	 * 预读取相关事件绑定
	 */
	preloadEventBinding() {
		var self = this;
		$("#toc").children("ul").find("a").each(function (i) {
			$(this).mouseover(function () {
				$(this).unbind('mouseover');
				self.preload(i + 1);
			});
		});
	}/* end preloadEventBinding */
	
	/**
	 * 检查多语言定义缓存是否过期
	 */
	checki18nCache() {
		if (localStorage.Wikiplus_i18nCache) {
			try {
				var _i18nData = JSON.parse(localStorage.Wikiplus_i18nCache);
				for (var languages in _i18nData) {
					if (_i18nData[languages]['__version'] === this.langVersion) {
						i18nData[_i18nData[languages]['__language']] = _i18nData[languages];
					}
					else {
						console.log(`多语言文件[${languages}]已经过期`);
						loadLanguage(_i18nData[languages]['__language']);//尝试重新取
					}
				}
			}
			catch (e) {
				throwError('cant_parse_i18ncache');
			}
		}
		else {
			localStorage.Wikiplus_i18nCache = JSON.stringify(i18nData);
		}
	}/* end checki18nCache */
	
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
	createDialogBox(title = 'Dialog Box', content = '', width = 600, callback = new Function()) {
		if ($('.Wikiplus-InterBox').length > 0) {
			$('.Wikiplus-InterBox').each(function () {
				$(this).remove();
			});
		}
		var clientWidth = document.body.clientWidth;
		var clientHeight = document.body.clientHeight;
		var diglogBox = $('<div>').addClass('Wikiplus-InterBox')
			.css({
				'margin-left': (clientWidth / 2) - (width / 2),
				'top': $(document).scrollTop() + clientHeight * 0.2,
				'display': 'none'
			})
			.append(
				$('<div>').addClass('Wikiplus-InterBox-Header')
					.html(title)
				)
			.append(
				$('<div>').addClass('Wikiplus-InterBox-Content')
					.append(content)
				)
			.append(
				$('<span>').text('×').addClass('Wikiplus-InterBox-Close')
				)
		$('body').append(diglogBox);
		$('.Wikiplus-InterBox').width(width);
		$('.Wikiplus-InterBox-Close').click(function () {
			$(this).parent().fadeOut('fast', function () {
				window.onclose = window.onbeforeunload = undefined; //取消页面关闭确认
				$(this).remove();
			})
		});
		//拖曳
		var bindDragging = function (element) {
			element.mousedown(function (e) {
				var baseX = e.clientX;
				var baseY = e.clientY;
				var baseOffsetX = element.parent().offset().left;
				var baseOffsetY = element.parent().offset().top;
				$(document).mousemove(function (e) {
					element.parent().css({
						'margin-left': baseOffsetX + e.clientX - baseX,
						'top': baseOffsetY + e.clientY - baseY
					})
				});
				$(document).mouseup(function () {
					element.unbind('mousedown');
					$(document).unbind('mousemove');
					$(document).unbind('mouseup');
					bindDragging(element);
				})
			});
		}
		bindDragging($('.Wikiplus-InterBox-Header'));
		$('.Wikiplus-InterBox').fadeIn(500);
		callback();
	}/* end createDialogBox */
	
	/**
	 * 增加功能按钮
	 * @param {string} text 按钮名
	 * @param {string} id 按钮id
	 * @param {function} clickEvent 点击事件 
	 */
	addFunctionButton(text, id, clickEvent) {
		var button = $('<li></li>').attr('id', id).append($('<a></a>').attr('href', 'javascript:void(0);').text(text));
		if ($('#p-cactions .menu').length > 0) {
			$('#p-cactions .menu ul').append(button);
			$('#p-cactions .menu ul').find('li').last().click(clickEvent);
		}
		else {
			throwError('cant_add_funcbtn');
		}
	}/* end addFunctionButton */
	
	/**
	 * 预读取内容
	 * @param {interger} section 段落编号 默认为-1即全页
	 * @param {string} title 页面名 默认为当前页面
	 * @param {object} callback 回调
	 */
	preload(section = -1, title = this.kotori.pageName, callback = {}, config = {}) {
		callback.success = callback.success || new Function();
		callback.fail = callback.fail || new Function();
		var self = this;
		if (config.oldid !== undefined) {
			// oldid 优先于 页面名
			console.log(typeof config.oldid);
			if (this.preloadData[`${config.oldid}.${section}`]) {
				console.log(`[修订版本${config.oldid}.${section}]已经预读取 跳过本次预读取`);
				callback.success(this.preloadData[`${config.oldid}.${section}`]);
				return;
			}
		}
		else {
			if (this.preloadData[`${title}.${section}`]) {
				console.log(`[${title}.${section}]已经预读取 跳过本次预读取`);
				callback.success(this.preloadData[`${title}.${section}`]);
				return;
			}
		}
		this.kotori.getWikiText({
			success: function (data) {
				if (config.oldid !== undefined) {
					self.preloadData[`${config.oldid}.${section}`] = data;
					console.log(`预读取[修订版本${config.oldid}.${section}]成功`);
				}
				else {
					self.preloadData[`${title}.${section}`] = data;
					console.log(`预读取[${title}.${section}]成功`);
				}
				callback.success(data);
			},
			fail: function (e) {
				if (config.oldid !== undefined) {
					console.log(`预读取[修订版本${config.oldid}.${section}]失败`);
				}
				else {
					console.log(`预读取[${title}.${section}]失败:${e.message}`);
				}
				callback.fail(e);
			}
		}, title, $.extend({
			section: section === -1 ? '' : section
		}, config));
	}/* end preload */
	
	/**
	 * 提交统计数据
	 * @param {string} title 页面名
	 * @param {interger} useTime 用时 单位毫秒
	 */
	sendStatistic(title = mw.config.values.wgPageName, useTime) {
		if (localStorage.Wikiplus_SendStatistics == 'True') {
			$.ajax({
				url: `${scriptPath}/statistics/api/submit`,
				type: 'POST',
				dataType: 'json',
				data: {
					'wikiname': mw.config.values.wgSiteName,
					'usetime': useTime,
					'username': mw.config.values.wgUserName,
					'pagename': title
				},
				success: function (data) {
					//提交成功
				}
			})
		}
	}/* end sendStatistic */
	
	/**
	 * 检查安装
	 * @param {function} callback 回调函数
	 */
	checkInstall(callback) {
		var self = this;
		if (!localStorage.Wikiplus_Installed || localStorage.Wikiplus_Installed == 'False') {
			//安装
			var install = function () {
				localStorage.Wikiplus_Installed = 'True';//标记已安装
				localStorage.Wikiplus_Version = self.version;
				localStorage.Wikiplus_StartUseAt = new Date().valueOf();
				localStorage.Wikiplus_SrartEditCount = mw.config.values.wgUserEditCount;
				localStorage.Wikiplus_Settings = JSON.stringify(self.defaultSettings);
				$('.Wikiplus-InterBox').fadeOut('fast', function () {
					self.notice.create.success(i18n('install_finish'));
					$(this).remove();
				})
			}
			var notice = $('<div>').text(i18n('install_tip').replace(/\$1/ig, mw.config.values.wgSiteName)).attr('id', 'Wikiplus-InterBox-Content');
			var applyBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-Setting-Apply').text(i18n('accept'));
			var cancelBtn = $('<div>').addClass('Wikiplus-InterBox-Btn').attr('id', 'Wikiplus-Setting-Cancel').text(i18n('decline'));
			var content = $('<div>').append(notice).append($('<hr>')).append(applyBtn).append(cancelBtn);//拼接
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
			})
		}
	}/* end checkInstall */
	
	/**
	 * 获取设置值
	 * @param {string} key 键名
	 * @param {object} object 传入可用参数
	 */
	getSetting(key, object) {
		var w = object;
		try {
			var settings = $.parseJSON(localStorage.Wikiplus_Settings);
		}
		catch (e) {
			return localStorage.Wikiplus_Settings || '';
		}
		try {
			var _setting = new Function('return ' + settings[key]);
			if (typeof _setting == 'function') {
				try {
					if (_setting()(w) === true) {
						return undefined
					}
					else {
						return _setting()(w) || settings[key];
					}
				}
				catch (e) {
					return settings[key];
				}
			}
			else {
				return settings[key];
			}
		}
		catch (e) {
			try {
				return settings[key];
			}
			catch (e) {
				return undefined;
			}
		}
	}/* end getSetting */
	
	initBasicFunctions() {
		this.initQuickEdit();//加载快速编辑
		this.editSettings();//编辑设置
		this.simpleRedirector();//快速重定向
		this.preloadEventBinding();//预读取
	}
	initRecentChangesPageFunctions() {

	}
	initAdvancedFunctions() {

	}
	constructor() {
		this.version = '2.1.1';
		this.langVersion = '204';
		this.releaseNote = '插件系统-dev 0.0.1';
		this.notice = new MoeNotification();
		this.inValidNameSpaces = [-1, 8964];
		this.defaultSettings = {
			'设置名': '设置值',
			'设置参考': 'http://zh.moegirl.org/User:%E5%A6%B9%E7%A9%BA%E9%85%B1/Wikiplus/%E8%AE%BE%E7%BD%AE%E8%AF%B4%E6%98%8E'
		};
		console.log(`正在加载Wikiplus ${this.version}`);
		//载入CSS
		$("head").append("<link>");
		$("head").children(":last").attr({
			rel: "stylesheet",
			type: "text/css",
			href: `${scriptPath}/wikiplus.css`
		});
		//一些初始化工作
		this.preloadData = {};
		this.checkInstall(); //安装检查
		//语言检测
		var language = this.getSetting('language') && this.getSetting('language').toLowerCase() || window.navigator.language.toLowerCase();
		//版本检查
		if (!(this.version === localStorage.Wikiplus_Version)) {
			localStorage.Wikiplus_Version = this.version;
			this.notice.create.success(`Wikiplus ${this.version}`);
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
		}
		else {
			console.log('不符合加载条件 Wikiplus终止');
		}
	}
}
window.Wikiplus = new Wikiplus();