var i18nData = {};
var scriptPath = `${location.protocol}//wikiplus-app.smartgslb.com`;
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
};/* end i18ndata */

/**
 * 加载其他语言文件
 * @param {string} language 语言名
 */
function loadLanguage(language) {
	$.ajax({
		url: `${scriptPath}/languages/get.php?lang=${language}`,
		dataType: 'json',
		success: function (data) {
			if (data.__language) {
				i18nData[data.__language] = data;
				localStorage.Wikiplus_i18nCache = JSON.stringify(i18nData);//更新缓存
			}
		},
		error: function (e) {
			console.log(`无法加载语言${language}`);
		}
	})
}/* end loadLanguage */

/**
 * 多语言转换
 * @param {stirng} key 字段标识名
 * @return {string} 经过转换的内容 如未找到对应的多语言字段 则返回简体中文
 */
function i18n(key) {
	var language = window.navigator.language.toLowerCase();
	if (i18nData[language] && i18nData[language][key]) {
		return i18nData[language][key];
	}
	else if (i18nData['zh-cn'][key]) {
		return i18nData['zh-cn'][key];
	}
	else {
		return 'undefined';
	}
}/* end i18n */
