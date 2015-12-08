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
		}
		else if (i18n(name) !== 'undefined') {
			return {
				number: errorList[name].number,
				message: i18n(name)
			}
		}
		else {
			return {
				number: errorList[name].number,
				message: i18n('unknownerror')
			}
		}
	}
	else {
		return {
			number: errorList.unknown_error_name.number,
			message: errorList.unknown_error_name.message
		}
	}
}/* end getErrorInfo */

/**
 * 判断值是否存在于数组
 * @param {string} value
 * @param {array} array
 * @return {boolean} whether the value is in the array
 */
function inArray(value, array = []) {
	return $.inArray(value, array) === -1 ? false : true;
}/* end inArray */

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
	console.log(`%c致命错误[${e.number}]:${e.message}`, 'color:red');
	console.log(e);
	return e;
}/* end throwError */
