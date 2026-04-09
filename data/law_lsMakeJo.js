/*
 * 파   일   명 	: lsMakeJo.js

 * 기        능 	: 조문형식을 만들 때 사용하는 js
 * 최초 작성일 	: 
 * Comment      : 
 * history영역 	: 2019. 05. 30. [#15771] 영문법령 본문목록 트리 열림 확인
 * 				  2019. 11. 21. [#17838] 현행법령 서비스 개선
 * 				  2019. 11. 21. [#18273] 최신법령 메뉴 내 본문 확인 요청
 *				  2019. 12. 05. [#18271] 조문목록 확인요청
 *				  2020. 01. 09. [#18390] 웹접근성 및 호환성 관련 처리 요청
 *				  2021. 05. 27. [#24609] 민법 편장절관"항" 밑의 조문의 트리구조 개선
 *				  2022. 06. 30. [#30094] 법령 왼쪽 조문 목록 오류 확인
 *          	  2022. 07. 28. [#30100] 법령 왼쪽 목록에서 별표와 서식을 구분하여 보여질수 있도록 개선
 *          	  2024. 03. 28. [#34193] 본문 내 좌측 트리 조회 기능 개선
 *				  2024. 05. 09. [#34606] 민법, 상법 좌측 목록에 편만 볼 수 있는 기능 추가 요청
 *				  2024. 07. 11. [#34723] 법령 좌측 트리 조회 기능 개선
 *				  2024. 07. 25. [#35155] 가지번호가 있는 편장절관 처리(하위 요소 닫기 기능 추가)
*/

var joTreeValue = {divId : ""
				   ,nwYn : ""
				   ,lsiSeq : ""
				   ,topNode : ""
				   ,mode : 0
				   ,deptPrev: ""
				   ,gubun: ""
				   ,oriJoNoPost: "" // 다음 조문 값
				};
				
function joTreeValueDel() {
		joTreeValue.divId = ""
		joTreeValue.topNode = ""
}
var divIdVal = "";
/**
 * <pre>
 * 	list 목록 클릭 후 (조문/부칙/별표 목록) 조회 요청
 * </pre>
 * @author brKim
 * @since 2017. 6. 8.
 * @param divId
 * @param mode
 * @param nwYn
 * @param lsiSeq
 * @param gubun
 */
function fSelectJoList(divId, mode, nwYn, lsiSeq, gubun, ancYnChk) {
	
	var url = "joListRInc.do";
	var LangType = lsVO.LangType;
	if(subMenuIdx == "4"){
		LangType = "010203";
	}
	
	if($('#'+divId).length != 0){
		if (lsiSeq && divId) {
			
			if (!$("#" + divId).html()) {
				
				if (mode == '11') { // 법령 조문 
					procObj = makeLsTree;
				} else if (mode == '2' || mode == '3' || mode == '7' || mode == '22' || mode == '33') { // 법령 부칙 & 별표 
					procObj = makeLsJoArByTree;
				} else if (mode == '1' || mode == '99') { // 전체 조회 
					procObj = makeLsTreeOpenAll;
				}
				
				var nwJoYnInfoVal = "";
				var efYdVal = "";
                var ancYnChkVal = "";
				
				if ($("#nwJoYnInfo")) {
					nwJoYnInfoVal = $("#nwJoYnInfo").val();
				}
				
				if (el("efYd") != null) {
					efYdVal = $("#efYd").val();
				}
				    
				/*
				 * 20191104 부칙 시행일 기준으로 나오기 위해 시행일자(efYd), 시행 공포구분값(ancYnChk) 을 
				 * 파라미터로 넘겨준다.
				 * 
				 * */
				url += "?lsiSeq=" + lsiSeq + "&mode=" + mode
					+ "&chapNo=1" + "&nwYn=" + nwYn
					+ "&nwJoYnInfo=" + nwJoYnInfoVal
					+ "&efYd=" + efYdVal
					+ "&ancYnChk=" + ancYnChk
					+ "&chrClsCd=" + LangType ;
					
				divIdVal = divId;
				joTreeValue.mode = mode;
				joTreeValue.divId = divId;
				joTreeValue.lsiSeq = lsiSeq;
				joTreeValue.nwYn = nwYn;
				joTreeValue.gubun = gubun;
				doRequestUsingPOST(url);
			} else {
				if (mode == '1' || mode == '11') { // 조문
					eventObj.list.callLsDepth2(divId);
				} else if (mode == '2' || mode == '3' || mode == '7' ||mode == '22' || mode == '33') { // 법령 부칙 & 별표 
					eventObj.list.callDepth2(divId);
				}
			}
		}
	}
}

/**
 * <pre>
 * 	좌측 조문목록 호출 ( InfoR.do 호출시 적용 )
 * </pre>
 * @author jhok
 * @since 2019. 8. 17.
 * @param divId
 * @param mode
 * @param nwYn
 * @param lsiSeq
 * @param efYd
 * @param gubun
 * @param ancYnChk
 * 
 *  2019.08.17
 * 기존에는 좌측 조문목록 호출시에 fSelectJoList 함수를 사용하였으나, 기존의 사용하고 있는 소스를 수정하기에는 영향도가 크므로 fSelectJoListAnc 함수를 새로생성하여사용함.
 * 기존 함수와의 차이점은 efYd, ancYnChk 값을 파라미터로 넘겨서 처리.
 * lsInfoP(팝업)에서 좌측목록 호출시에 사용되어지는 함수 
 */
function fSelectJoListAnc(divId, mode, nwYn, lsiSeq,efYd, gubun, ancYnChk) {	
	
	var url = "joListRInc.do";
	//var url = "joListRInc_XML.do";
	var LangType = lsVO.LangType;
	if(subMenuIdx == "4"){
		LangType = "010203";
	}
	if($('#'+divId).length != 0){
		if (lsiSeq && divId) {
			
			if (!$("#" + divId).html()) {
				joTreeValue.lsId = $('#lsId').val();
				
				if (mode == '1' || mode == '11') { // 법령 조문 
					procObj = makeLsTree;
				} else if (mode == '2' || mode == '3' || mode == '22' || mode == '33') { // 법령 부칙 & 별표 
					procObj = makeLsJoArByTree;
				}else if (mode == '99') { // 전체 조회 
					procObj = makeLsTreeOpenAll;
				}
				
				var nwJoYnInfoVal = "";
								
				if ($("#nwJoYnInfo")) {
					nwJoYnInfoVal = $("#nwJoYnInfo").val();
				}
				
				url += "?lsiSeq=" + lsiSeq + "&mode=" + mode
					+ "&chapNo=1" + "&nwYn=" + nwYn
					+ "&nwJoYnInfo=" + nwJoYnInfoVal
					+ "&efYd=" + efYd // 시행일법령 처리하기 위해 efYd값을 넘겨줌.
					+ "&chrClsCd=" + LangType 
					+ "&ancYnChk=" + ancYnChk; //시행일법령 처리하기 위해 ancYnChk 값을 넘겨줌.

				divIdVal = divId;
				joTreeValue.mode = mode;
				joTreeValue.divId = divId;
				joTreeValue.lsiSeq = lsiSeq;
				joTreeValue.nwYn = nwYn;
				joTreeValue.gubun = gubun;
				doRequestUsingPOST(url);
			} else {
				if (mode == '1' || mode == '11' || mode == '99') { // 조문
					eventObj.list.callLsDepth2(divId);
				} else if (mode == '2' || mode == '3' || mode == '22' || mode == '33') { // 법령 부칙 & 별표 
					eventObj.list.callDepth2(divId);
				}
			}
		}
	}
}

/**
 * <pre>
 * 	좌측 조문목록 호출 ( InfoR.do 호출시 적용 )
 * </pre>
 * @author kimsh900
 * @since 2024. 3. 28.
 * @param divId
 * @param mode
 * @param nwYn
 * @param lsiSeq
 * @param efYd
 * @param gubun
 * @param ancYnChk
 * 
 * lsInfoP(팝업)에서 좌측목록 호출시에 사용되어지는 함수 
 */
function fSelectJoListAncTree(divId, mode, nwYn, lsiSeq, efYd, gubun, ancYnChk) {	
	// + "&efYd=" + efYd // 시행일법령 처리하기 위해 efYd값을 넘겨줌.
	// + "&ancYnChk=" + ancYnChk; //시행일법령 처리하기 위해 ancYnChk 값을 넘겨줌.
	var url = "joListTreeRInc.do";
	//
	var LangType = lsVO.LangType;
	if(subMenuIdx == "4"){
		LangType = "010203";
	}
	var datCls ="";
	joTreeValue.lsId = $('#lsId').val();
	
	// 민법 및 상법 편 팝업
	if((joTreeValue.lsId == '001706' || joTreeValue.lsId == '001702') && nwYn == '3'){ //joTreeValue.dept
		datCls = "lsMs";
	}
	
	var $targetElement = el(divId);
	var $children = el(divId);
	
	if (lsiSeq && divId) {

		if ($targetElement.innerHTML.length == 0) {

			// 초기화 작업
			lawNavigation.init(divId);

			// 파라미터 세팅
			var params = {};
			params.lsiSeq = lsiSeq;
			params.section = lawNavigation.searchType;
			params.chrClsCd = LangType;
			params.efYd = efYd;
			params.joEfYd = efYd;
			params.ancYnChk = ancYnChk;

			$.ajax({
				url: url,
				data: params,
				timeout: 240000,
				dataType: 'json',
				method: 'GET',
				success: function (responseText) {
					if (lawNavigation.searchType === 'Jo') {
						var joTree = lawNavigation.makeJoTreeArray(responseText);
						lawNavigation.makeTreeHtml(joTree, $targetElement, datCls);
						lawNavigation.openTree($targetElement);
						if($('#' + divId).find('li[data-chap-type]').length == 0){
							$('#' + divId).css('padding-left', '0px');
						}
					} else if (lawNavigation.searchType === 'Ar') {
						var arTree = lawNavigation.makeArTreeArray(responseText);
						lawNavigation.makeTreeHtml(arTree, $targetElement);
						lawNavigation.openTree($targetElement);
						$('#' + divId).css('padding-left', '0px');
					} else if (lawNavigation.searchType === 'By') {
						var bylTree = lawNavigation.makeBylTreeArray(responseText);
						lawNavigation.makeTreeHtml(bylTree, $targetElement);
						lawNavigation.openTree($targetElement);
						$('#' + divId).css('padding-left', '0px');
					} else if (lawNavigation.searchType === 'Bj') {
						var bylTree = lawNavigation.makeBylTreeArray(responseText);
						lawNavigation.makeTreeHtml(bylTree, $targetElement);
						lawNavigation.openTree($targetElement);
						$('#' + divId).css('padding-left', '0px');
					}
				},
				error: function (e) {
					alert('조문 또는 부칙 트리 목록을 가져오는 도중 오류가 발생하였습니다.');
				}
			});
		}
		$targetElement.parentElement.firstElementChild.firstElementChild.textContent = $targetElement.parentElement.classList.toggle('on') ? '본문목록열림' : '본문목록닫힘';
		if ($targetElement.parentElement.firstElementChild.firstElementChild.textContent === '본문목록닫힘') {
			lawNavigation.closeTree($targetElement);
		}
	}
}

/**
 * <pre>
 * 	list 목록 클릭 후 (조문/부칙/별표 목록) 조회 요청 (영문법령)
 * </pre>
 * @author brKim
 * @since 2018. 3. 28.
 * @param divId
 * @param mode
 * @param nwYn
 * @param lsiSeq
 */
function fSelectEngJoList(divId, mode, nwYn, lsiSeq) {
	
	var url = "engJoListRInc.do";
	
	if (lsiSeq && divId) {
		
		if (!$("#" + divId).html()) {
			
			if (mode == '1' || mode == '11') { // 법령 조문 
				procObj = makeLsTree;
			} else if (mode == '2' || mode == '3' || mode == '22' || mode == '33') { // 법령 부칙 & 별표 
				procObj = makeLsJoArByTree;
			}

			url += "?lsiSeq=" + lsiSeq
				+ "&mode=" + mode
				+ "&chapNo=1" + "&nwYn=" + nwYn;
			
			joTreeValue.mode = mode;
			joTreeValue.divId = divId;
			joTreeValue.lsiSeq = lsiSeq;
			joTreeValue.nwYn = nwYn;
			doRequestUsingPOST(url);
		} else {
			if (mode == '1' || mode == '11') { // 조문
				eventObj.list.callLsDepth2(divId);
			} else if (mode == '2' || mode == '3' || mode == '22' || mode == '33') { // 법령 부칙 & 별표 
				eventObj.list.callDepth2(divId);
			}
		}
	}
}

/**
 * <pre>
 * 	조 타입 세팅
 * </pre>
 * @author brKim
 * @since 2018. 3. 12.
 * @param joDat
 */
function joType(joDat) {
	if (joDat.chapNo.substring(4) == "0000000000000000") { // 편
		setTopNodeSe(1, joTreeValue);
		joTreeValue.pyun = joDat.chapNo;
		joTreeValue.dept = "dep01";
	} else if (joDat.chapNo.substring(8) == "000000000000") { // 장
		setTopNodeSe(2, joTreeValue);
		joTreeValue.jang = joDat.chapNo;
		joTreeValue.dept = "dep02";
	} else if (joDat.chapNo.substring(12) == "00000000") { // 절
		setTopNodeSe(3, joTreeValue);
	 	joTreeValue.jul = joDat.chapNo;
		joTreeValue.dept = "dep03";
	} else if (joDat.chapNo.substring(16) == "0000") { // 관
		setTopNodeSe(4, joTreeValue);
	 	joTreeValue.kwan = joDat.chapNo;
		joTreeValue.dept = "dep04";
	} else if (joDat.chapNo.substring(18) == "00") { // 항
		setTopNodeSe(5, joTreeValue);
	 	joTreeValue.hang = joDat.chapNo;
		joTreeValue.dept = "dep05";
	} else { // 목
		setTopNodeSe(6, joTreeValue);
	 	joTreeValue.mok = joDat.chapNo;
		joTreeValue.dept =  "dep06";
	}

}

/**
 * <pre>
 * 	topNode 와 node 값 설정
 * </pre>
 * @author brKim
 * @since 2018. 3. 12.
 * @param value
 * @param obj
 */
function setTopNodeSe(value, obj) {
	if (!obj.topNode) {
		obj.topNode = value;
	}
	obj.node = value;
}

/**
 * <pre>
 * 	조타입 반환
 * </pre>
 * @author brKim
 * @since 2018. 3. 12.
 * @param cls
 * @returns
 */
function getJoType(cls) {
	var resultVal = null;
	switch (cls) {
	case 1: resultVal = joTreeValue.pyun; break;
	case 2: resultVal = joTreeValue.jang; break;
	case 3: resultVal = joTreeValue.jul; break;
	case 4: resultVal = joTreeValue.kwan; break;
	case 5: resultVal = joTreeValue.hang; break;
	default: resultVal = joTreeValue.mok; break;
	}
	return resultVal;
}

/**
 * <pre>
 * 	법령 조문 목록 트리구조 생성
 *  =>	편장절관 순으로 뎁스가 생긴다.
 *  
 * </pre>
 * @author brKim
 * @since 2017. 7. 10.
 */
function makeLsTree() {
	
	var text = xmlHttp.responseText;
	var list = null;
	var joList = ""; 
	var dept = "";
	var clickEvent = null;
	var rgExpPJ = /([0-9]+[편|장|절|관])/g;
	var pjCntYn = "";
	var isPgYn = "Y";
	
	list = eval('('+text+')');
	
	if (list.length > 0) {
		
		for (var i = 0; i < list.length; i++) {
			isPgYn = "N";
			if(list[i].joYn == "N" && $('#lsId').val() == "001444" ){
			//전문, 1장, 2장 이어지는 형식일 경우(case: 대한민국헌법) 예외처리
				pjCntYn = list[i].joTit.match(rgExpPJ);
				if(list[i].joTit.indexOf("전문") < 0 && pjCntYn == null){
					continue;
				}else if(i == 0 && list[i].joTit.indexOf("전문") > 0 && pjCntYn == null){
					pjCntYn = "Y";
				} 
			}
			
			if (list[i].joYn == "N") { // 편장절관이 들어올 경우 (조문이 아닌 경우)
				
	  			joType(list[i]);
	  			
	  			clickEvent = "";
	  			// 현재 조번호와 다음 조번호가 같을 경우 온클릭을 넣지 않는다.
	  			try {
	  				if(pjCntYn == "Y"){
	  					//첫번째 편,장,절,관 이전에 전문이 오는경우 전문은 첫번째 장으로 세팅한다.
	  					joTreeValue.dept = "dep02";
	  					clickEvent = "onclick=\"showJoDept('" + getJoType(joTreeValue.node) + "','" + i + "','" + joTreeValue.dept + "','" + joTreeValue.lsiSeq + "', this);\"";
	  				}else{
		  				if (list[i].oriJoNo === list[i+1].oriJoNo && list[i].joBrNo == list[i+1].joBrNo) {
		  					clickEvent = "onclick=\"eventObj.list.callLsDepth3(this);\"";
		  				} else {
		  					clickEvent = "onclick=\"showJoDept('" + getJoType(joTreeValue.node) + "','" + i + "','" + joTreeValue.dept + "','" + joTreeValue.lsiSeq + "', this);\"";
		  				}
	  				}
	  			} catch (e) {
	  				clickEvent = "onclick=\"showJoDept('" + getJoType(joTreeValue.node) + "','" + i + "','" + joTreeValue.dept + "','" + joTreeValue.lsiSeq + "', this);\"";
	  			}
	  			
	  			joList += "<div class=\"" + joTreeValue.dept + " on\">"
							+ "<a href=\"javascript:;\" " + clickEvent + ">"
								+ "<span class=\"ico\">하위메뉴닫기</span>" + list[i].joTit
							+ "</a>"
						+ "</div>";
	  			
			} else { // 조문 형태가 올 경우
				
				joList += "<div class=\"dep00 type\">"
							+ "<a href=\"#J" + list[i].joLink + "\" onkeypress=\"\" onclick=\"focusMulti('J" + list[i].joLink + "');return false;\">" + list[i].joTit + "</a>"
						+ "</div>";
			}
		}
	}
	
	$('#'+joTreeValue.divId).html(joList);
	
	eventObj.list.callLsDepth2(joTreeValue.divId);
}

/**
 * <pre>
 * 	부칙, 별표 트리 생성
 * </pre>
 * @author brKim
 * @since 2018. 3. 28.
 */
function makeLsJoArByTree() {
	
	var text = xmlHttp.responseText;
	var list = null;
	var joList = ""; 
	var dept = "";
	
	list = eval('('+text+')');
	if (list.length > 0) {
  		for (var i = 0; i < list.length; i++) {
  			joList += "<div class=\"dep2\">"
  						+ "<a href=\"#J" + list[i].joLink + "\" onclick=\"focusMulti('J" + list[i].joLink + "');return false;\">" 
  							+ list[i].joTit 
  						+ "</a>" 
  					+ "</div>";
   		}
	}
	
	$('#'+joTreeValue.divId).html(joList);

	eventObj.list.callDepth2(joTreeValue.divId);
}

/**
 * <pre>
 * 	법령 목록 트리구조 AJAX 호출 (2뎁스 클릭 시)
 * </pre>
 * @author brKim
 * @since 2017. 7. 10.
 * @param nodeId
 * @param num
 * @param detp
 * @param lsiseq
 * @returns
 */
function showJoDept(nodeId, num, dept, lsiseq, obj) {
	
	var list = els(nodeId);
	
	joTreeValue.deptPrev = dept;
	var LangType = lsVO.LangType;
	if(subMenuIdx == "4"){
		LangType = "010203";
	}
	var mode = "";
	var checkJoDiv = false;
	
	checkJoDiv = $(obj).parent().next('div').hasClass('type');
	
	if (!checkJoDiv) {
		
		procObj = makeJoTree; // 콜백 함수
		
		joTreeValue.divId = $(obj).parent();
		
		var url = "joListRInc.do?lsiSeq=";
		//var url = "joListRInc_XML.do?lsiSeq=";
		var lsCls = 1;
		
		doRequestUsingPOST(url + lsiseq + "&mode=" + lsCls + "&chapNo=" + nodeId
					+ "&nwYn=" + joTreeValue.nwYn + "&gubun=" + joTreeValue.gubun+ "&chrClsCd=" + LangType );
		
	} else {
		eventObj.list.callLsDepth3(obj);
	}
	
	
}

/**
 * <pre>
 * 	목록 장 이후 클릭 시 조문 생성
 *  2019. 05. 02 [#15536] 좌측 본문 목록에 조 누락 확인
 * </pre>
 * @author brKim
 * @since 2017. 7. 10.
 */
function makeJoTree() {
	
	var text = xmlHttp.responseText;
	var list = null;
	var joList = "";
	var rgExpPJ = /([0-9]+[편|장|절|관])/g;
	var isPgYn = "Y";
	
	list = eval('('+text+')');
	
	if (list.length > 0) {
		
		for (var i = 0; i < list.length; i++) {
			//조문목록에 전문이 오는경우
			isPgYn = list[i].joTit.match(rgExpPJ);
			if((i==0 && list[i].joTit.indexOf("전문") > 0) || isPgYn != null){
				joTreeValue.node = "dep02";
				joTreeValue.dept = "dep02";
			}
			//행정망 팝업에서는 다른 class이름, 다른 css를 적용시킨다.
			if(joTreeValue.mode == "0"){
				joList += "<div style =\"padding:2px 0;\" class=\"" + setLsJoDept(joTreeValue.dept) + " type on\">"
				+ "<a style =\"padding-left:17px;\" href=\"#J" + list[i].joLink + "\" onclick=\"focusMulti('J" + list[i].joLink + "'); retrun false;\">"
					+ list[i].joTit
				+ "</a>"+ "</div>";
				
				//행정망 wide
			}else{
			joList += "<div class=\"" + setJoDept(joTreeValue.deptPrev) + " type\">"
						+ "<a href=\"#J" + list[i].joLink + "\" onclick=\"focusMulti('J" + list[i].joLink + "');return false;\">"
							+ list[i].joTit
						+ "</a>"
					+ "</div>";
			}

					
		}
		
	}
	//행정망 팝업에서 호출
	if(joTreeValue.mode == "0"){
		$('#'+joTreeValue.divId).html(joList);
		eventObj.list.callLsDepth3($("#"+joTreeValue.divId));
	//행정망 wide에서 호출
	}else{
		joTreeValue.divId.after(joList);
		eventObj.list.callLsDepth3(joTreeValue.divId);
	}
	
}

/**
 * <pre>
 * 	조문 뎁스 세팅
 * </pre>
 * @author brKim
 * @since 2018. 3. 31.
 */
function setJoDept(dept) {
	var resultDept = null;
	switch (dept) {
	case "dep01": resultDept = "dep02"; break;
	case "dep02": resultDept = "dep03"; break;
	case "dep03": resultDept = "dep04"; break;
	case "dep04": resultDept = "dep05"; break;
	case "dep05": resultDept = "dep06"; break;
	}
	return resultDept;
}
/**
 * <pre>
 * 	조문 전체 펼치기
 * </pre>
 * @author dsKim
 * @since 2019. 2. 21.
 */
function makeLsTreeOpenAll() {
	
	var text = xmlHttp.responseText;
	var list = null;
	var joList = ""; 
	var dept = "";
	var pgYn = "N"; // 편장절관형식
	var beforeJoYn = "N";
	var beforePg = ""; 
	var rgExpPJ = /([0-9]+[편|장|절|관])/g;
	var pjCntYn = "";
	var isPgYn = "Y";
	
	list = eval('('+text+')');
	
	if(list[0].joYn == "N"){
		  pgYn = "Y";
	  }
	
	if (list.length > 0) {
		
		for(var i = 0; i < list.length; i++){
			isPgYn = "Y";
  			//편장절관형식 경우
  			if(pgYn == "Y"){
  				
  				//전문, 1장, 2장 이어지는 형식일 경우(case: 대한민국헌법) 예외처리(장으로 세팅)
  				if(list[i].joYn == "N"  && $('#lsId').val() == "001444" ){
  					pjCntYn = list[i].joTit.match(rgExpPJ);
  					if(i != 0 && pjCntYn == null){
  						list[i].joYn = "Y";
  					}else if(i == 0 && list[i].joTit.indexOf("전문") > 0){
  						isPgYn = "N";
  					}
  				}
					
  				//편장절관 뽑아냄
  				if(list[i].joYn == "N" ){
  					// topNode 세팅
  					joType(list[i]);
  					
  		  			//편장절관
  					var clickEvent = "";
  					//조문이 아닌 첫번째 노드(편, 장, 절, 관중 아무거나 다 올수 있음. 대체로 편, 장이 옴)
	  				if(joTreeValue.topNode == joTreeValue.node ){
	  				//첫번째 편,장,절,관 이전에 전문이 오는경우 전문은 첫번째 장으로 세팅한다.
	  					if(isPgYn == "N"){
	  						joTreeValue.node = "dep02";
	  						joTreeValue.dept = "dep02";
	  					}
	  					try {
  							clickEvent = "onclick=\"showJoDept('" + getJoType(joTreeValue.node) + "','" + i + "','" + joTreeValue.dept + "','" + joTreeValue.lsiSeq + "', this);\"";
	  					} catch (e) {
	  						clickEvent = "onclick=\"showJoDept('" + getJoType(joTreeValue.node) + "','" + i + "','" + joTreeValue.dept + "','" + joTreeValue.lsiSeq + "', this);\"";
	  					}
	  					
	  					joList += "<div class=\"" + joTreeValue.dept + "\">"
	  							+ "<a href=\"javascript:;\" " + clickEvent + "style =\"background-image: url(\"\")!important;\">"
	  							+ "<span class=\"ico\" style =\"background-image: url(images/button/btn_lmcl.gif)\">하위메뉴닫기</span>" + list[i].joTit +"";
	  					joList += "</a>";
  						if(joTreeValue.dept == 'dep01' && (joTreeValue.lsId == '001706' || joTreeValue.lsId == '001702') && joTreeValue.nwYn == '3'){	//민법,상법 편 팝업
	  						joList += "<a href=\"javascript:;\" id=\"btnPyunDetail\" onclick=\"javascript:lsContentsView(true, true, '"+getJoType(joTreeValue.node)+"');\"></a>";
	  					}
	  					joList += "</div>";
	  					beforePg = joTreeValue.dept;
	  					beforeJoYn = "N";
	  					//조문이 아닌 두번째 노드(편이 있다면 편을 제외한 장, 절, 관이 해당됨, 장만 있다면 해당)
	  				}else{
	  					try {
	  						clickEvent = "onclick=\"showJoDept('" + getJoType(joTreeValue.node) + "','" + i + "','" + joTreeValue.dept + "','" + joTreeValue.lsiSeq + "', this);\"";
	  					} catch (e) {
	  						clickEvent = "onclick=\"showJoDept('" + getJoType(joTreeValue.node) + "','" + i + "','" + joTreeValue.dept + "','" + joTreeValue.lsiSeq + "', this);\"";
	  					}
	  					
	  					joList += "<div class=\"" + joTreeValue.dept + " type on\">"
	  					+ "<a href=\"javascript:;\" " + clickEvent + ">"
	  					+ "<span class=\"ico\" style =\"background-image: url(images/button/btn_lmcl.gif)\">하위메뉴닫기</span>" + list[i].joTit + "</a></div>";
	  					beforePg = joTreeValue.dept;
	  					beforeJoYn = "N";
	  				}
	  				//해당 편장절관의 조문뽑아냄
  				}else{
  					joList += "<div class=\"" + setJoDept(joTreeValue.dept) + " type on\">"
					+ "<a href=\"#J" + list[i].joLink + "\" onclick=\"focusMulti('J" + list[i].joLink + "');return false;\">"
						+ list[i].joTit
					+ "</a>"+ "</div>";
  					beforeJoYn = "Y";
  				}
  				//편장절관이 없는 경우 조문만 뽑아낸다.
  			}else{
  				joList += "<div class=\"dep00 type\">"
					+ "<a href=\"#J" + list[i].joLink + "\" onkeypress=\"\" onclick=\"focusMulti('J" + list[i].joLink + "');return false;\">" + list[i].joTit + "</a>"
				+ "</div>";
  			}
   		}
	}
	$('#'+divIdVal).html(joList);
	eventObj.list.callLsDepth2(divIdVal);
}