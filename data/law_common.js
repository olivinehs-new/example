/* 
 * file_name : common.js


 * summary	 : 
 * history	 : 2017. 03. 31. 최초작성
 *			   2019. 03. 20. [#13761] 행정규칙, 자치법규 본문 제명 폰트 관련 개선요청
 *			   2019. 04. 24. [#14008] 목록이동시 화면내검색 레이어 닫힘, IE 환경에서 중복검색시 텍스트 사라짐 현상 수정
 *			   2019. 05. 02. [#15516] 국법 자치법규 법령주소복사 시 공포번호 앞의 0 제거 
 * 			   2019. 05. 02. [#13826] FAQ리스트 클릭 이벤트 추가
 * 			   2019. 05. 02. [#15541] 화면내 검색 레이어 위치 개선 요청 -> 검색 레이어가 제명에 겹치지 않도록 변경처리
 * 			   2019. 05. 07. [#15578] 근대법령 국회도서관 안내 레이어 보지않기 수정
 *			   2019. 07. 18. [#16080] 판례·해석례·학칙·규정 등등 제명에서 검색어 강조표시 제거요청
 *			   2019. 08. 01. [#16186] 내가 찾은 법령 등록 방법 개선요청 -> 로그인 했을 때에도 쿠키에 저장하여 보여지도록 수정
 *			   2019. 09. 05. [#16536] 법령명/본문 탭 키워드 강조표시 개선
 *			   2019. 09. 09. [#16371] 입력 도구 기능 개발요청
 *			   2019. 09. 18. [#17661] 국가법령정보센터에서 다국어 서비스 요청
 *			   2019. 10. 10. [#17806] 학칙규정 관심법령 등록 오류
 *			   2019. 10. 16. [#17761] 메인화면 클릭수 확인
 *			   2020. 01. 08. [#18501] 법령 팝업화면에서 화면내검색기능 확인요청
 *			   2020. 02. 06. [#18742] 상세검색 후 목록 저장시 오류 확인
 *			   2020. 06. 17. [#20087] LSW 입법예고 미사용 소스 제거
 *			   2020. 09. 10. [#20808] 법령용어 Extjs 제거
 *			   2020. 10. 08. [#21062] 화면내검색 기능 개선
 *			   2020. 10. 12. [#21214] 3단비교 화면내검색 오류 수정
 *			   2020. 10. 15. [#21182] 내가 찾은 검색어 삭제 기능 추가
 *			   2020. 10. 29. [#21281] 법령주소복사 수정
 *			   2021. 05. 20. [#24324] 3단비교 조문 이동 기능 개발
 *			   2021. 06. 15. [#24819] 크롬 검색창에서 x버튼이 안보이는 오류 확인
 *			   2021. 08. 26. [#25310] 조회이력, 내가 찾은 법령에 학칙규정, 별표서식도 추가되도록 기능 개선
 *		       2021. 09. 30. [#25736] 공공기관 규정 화면내 검색 오류 확인
 *			   2021. 12. 23. [#26482] 최신법령 본문 조회 오류 확인
 *		       2021. 12. 23. [#26496] 크롬 브라우저에서 화면내검색 오류 확인		
 *		       2022. 01. 06. [#26630] 한글주소명 호출 시 에러페이지 뜨는 현상
 *			   2022. 01. 14. [#26339] 공공기관 신구법 비교 서비스 요청
 *			   2022. 02. 08. [#26977] 법령팝업 왼쪽레이어 조문이동 스크립트에러 확인
 *			   2022. 02. 17. [#26942] 공공기관 정관/규정 조문이동 및 주소복사 기능 추가 요청	
 *			   2022. 04. 15. [#28929] 위원회결정문 서비스 관련 추가
 *			   2022. 05. 02. [#28929] 위원회결정문 2차 수정
*			   2022. 05. 31. [#29372] 법령비교 저장 및 인쇄 기능 추가
 *			   2022. 06. 10. [#29830] 제정·개정이유 팝업 스크롤 확인
 *			   2022. 06. 10. [#29953] 화면내 검색목록 조문이동 오류 확인
 *			   2022. 10. 27. [#31128] 별표 레이어 오류 확인
 *			   2022. 11. 04. [#31188] 행정규칙 본문 조회 오류 수정
 *			   2022. 12. 08. [#31453] 자치법규 본문 저장 오류 확인
 *			   2023. 04. 27. [#32423] 모바일앱 앱링크 기능 추가
 *			   2023. 10. 26. [#33596] 검색어가 입력된 상태에서 본문을 열면 화면내 검색 레이어가 열리도록 요청
 *			   2023. 11. 09. [#33596] 검색어 미 입력 후 화면내 검색 클릭 시 나타나는 오류 수정
 *			   2023. 11. 16. [#33775] 화면내 검색 기능 원복 처리
 *			   2023. 11. 23. 위원회 개방체계구축2차 -  위원회결정문 화면내 검색 오류 수정
 *			   2023. 12. 15. [#33524] 조문 장바구니 기능 추가
 *			   2024. 01. 11. [#33956] 화면내검색 레이어 하단의 검색어 목록 삭제기능 추가
 *			   2024. 01. 11. [#34026] 국법 2024년 01월 웹 호환성 및 접근성 보완 조치(1차)
 *			   2024. 01. 25. [#34027] 국법 2024년 01월 웹 호환성 및 접근성 보완 조치(2차)
 *			   2024. 02. 07. [#34236] 앱 링크 기능 개선
 *			   2024. 02. 15. [#34211] 대한민국헌법 전문앞에 체크박스 추가 요청
 *			   2024. 02. 29. [#34214] 모바일 공유하기 기능 추가
 *			   2024. 03. 14. [#34416] 좌측 트리 별표/서식을 클릭시 본문 이미지 열리도록 개선요청
 *			   2024. 03. 28. [#34471] SNS 공유기능 기능 개선
 *			   2024. 04. 12. [#34569] 앱으로보기 레이어 오류 수정
 *			   2024. 05. 10. [#34690] 주소복사 기능 개선
 *			   2024. 05. 10. [#34732] 인터넷망 법령 주소복사 오류
 *			   2024. 05. 23. [#34812] 조약 화면내 검색 기능 추가
 *			   2024. 05. 23. [#34784] 공유하기 라인메신저 추가 요청
 *			   2024. 05. 23. [#34803] 시각장애인협회 웹접근성 검토의견 조치
 *			   2024. 06. 20. [#34923] 국법 2024년 6월 웹접근성/호환성 등 개선
 *			   2024. 08. 29. [#34913] 행정규칙 팝업페이지 오류
 *			   2024. 09. 26. [#34167] 행정규칙 신구법비교 개발
 *			   2024. 09. 26. [#35411] 국법 2024년 9월 웹접근성/호환성 등 개선
 *			   2025. 06. 26. [#36854] [만족도조사 개선사항] 조문단위 SNS 공유 기능 추가
 *			   2025. 07. 10. [#36882] [만족도조사 개선사항] 신속한 민원 응대를 위한 챗봇 서비스 도입
 *			   2025. 09. 25. [#37574] 외부망 공유하기 주소복사 기능 띄어쓰기 제거
 *			   2025. 11. 27. [#37431] 조약 영문/한글 동시보기 기능 제공 요청
 * @author   : kimchaeha
 * @date	 : 2018. 03. 20.
 */

var console = window.console || {log:function(){}};

String.prototype.trim = function(str) {
	str = this != window ? this : str;
	return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

String.prototype.replaceAll = function(str1, str2){ 
	var temp_str = ""; 
	var temp_trim = this.replace(/(^\s*)|(\s*$)/g, ""); 
	if (temp_trim && str1 != str2) { 
		temp_str = temp_trim; 
		while (temp_str.indexOf(str1) > -1) temp_str = temp_str.replace(str1, str2); 
	}
	return temp_str;
}

String.prototype.hasFinalConsonant = function(str) {
	if(str == null || str == "") return false;
	str = this != window ? this : str;
	var strTemp = str.substr(str.length-1);
	return ((strTemp.charCodeAt(0) - 16) % 28 != 0);
}
Array.prototype.containsValue = function(compareValue){
	for(i = 0; i < this.length; i++){
		if(this[i] == compareValue)
			return true;
	}
	return false;
}

function el(id){
	return document.getElementById(id);
}

function els(name){
	return document.getElementsByName(name);
}

function setDisplay(id, display){
	if(el(id) != null)
		el(id).style.display = display;
}

function isDisplay(param){
	var obj;
	if(typeof(param) == "string"){
		obj = el(param);
	}
	else if(typeof(param) == "object"){
		obj = param;
	}

	if(obj != null
		&& obj.style != null
		&& obj.style.display == "none"){
		return false;
	}
	return true;
}

/**
 *  undefined, null 체크 유효성검사
 */
function isExistProperty(id) {
	var isBoolean = true;
	if( typeof(id) == 'undefined' )
		isBoolean = false;
	else if( id == null )
		isBoolean = false;
	
	return isBoolean;
}

/**
 * 라디오 버튼 검사
 */
function changeNwYn(obj){
	
	var mode = "";
	if(el("query").value == searchMessage[searchId]){
    	el("query").value ="";    
    }
    
    if(obj.id == 'nwYn1' || obj.id == 'nwYn2'){
        var query = el('query').value.trim();
     	location.href = "ordinSc.do?menuId=2&schtype=0" + "&query=" + encodeURIComponent(query)+"&nwYn="+obj.value; 
    } else if(obj.id == 'nwYn3') {
     	var query = el('query').value.trim();
     	location.href = "ordinScNw.do?menuId=2&schtype=0" + "&query=" + encodeURIComponent(query)+"&nwYn="+obj.value; 
    } else if(obj.id == 'nwYn5') {
        var query = el('query').value.trim();
     	location.href = "ordcSc.do?menuId=2&schtype=0" + "&query=" + encodeURIComponent(query)+"&nwYn="+obj.value; 
    } else if(obj.id == 'nwYn6'){
    	var query = el('query').value.trim();
    	location.href = "unOrdinSc.do?menuId=2&schtype=0" + "&query=" + encodeURIComponent(query)+"&nwYn=6";
    } else if(obj.id == 'nwYn7'){
    	var query = el('query').value.trim();
    	location.href = "ordinDelegationSc.do?menuId=2&schtype=0" + "&query=" + encodeURIComponent(query)+"&nwYn=7&tabNo=1";
    }
} 


/*
 * 상위 updateDiv 함수로는 update후 처리가 안되어
 * Ajax 기반으로 추가함 
 * */
function updateDiv(divId, url, paramArray, callback, flag){
	if(flag == true){
		// 이미지 전체 display none
		var hanImg = document.getElementById("hanImg");
		var odtImg = document.getElementById("odtImg");
		var pdfImg = document.getElementById("pdfImg"); 
		var govLnk = document.getElementById("govLnk");
		
		layoutLoadMask(divId);
		logger.def(divId + "---" +url + "--" + paramArray,1);
		
		$.ajax({
		   url: url,
		   data: makeParam(paramArray),
		   success: function(responseText) {
			   $('#'+divId).html(responseText);
				// 파일이 있는 경우에만 아이콘을 뿌려준다.
				var han = document.getElementById("hanFlSeq");
				var odt = document.getElementById("odtFlSeq");
				var pdf = document.getElementById("pdfFlSeq");
				var govLnkUrl = document.getElementById("govLnkUrl");
				
				if( isExistProperty(hanImg) && han.value != 0)
					hanImg.style.display="";
				
				if( isExistProperty(odtImg) && odt.value != 0)
					odtImg.style.display="";
				
				if( isExistProperty(pdfImg) && pdf.value != 0)
					pdfImg.style.display="";
				
				if( isExistProperty(govLnkUrl) && govLnkUrl.value != ""){
					govLnk.style.display="";
					document.getElementById("govLnk").href = govLnkUrl.value;
				}else{
					if(isExistProperty(govLnk)){
						govLnk.style.display="none";
						document.getElementById("govLnk").href = "";
					}
				}
				
				layoutUnMask(divId);
				
		   },
			error: function(e) {
				layoutUnMask(divId);
			}
		});	
	}else{
		$.ajax({
			   url: url,
			   data: makeParam(paramArray),
			   success: function(responseText) {
				   $('#'+divId).html(responseText);
				   callback();
			   },
				error: function(e) {
				}
			});	
	}
}

/* 무조건 적으로 callback 함수가 호출된다. 단. 페이지내의 script 가 실행되지 않는다. */
function updateDivCall(divId, url, paramArray, callback){
	
	$.ajax({
		url: 		url
	   ,timeout:	240000 // 240 seconds
	   ,data:		makeParam(paramArray)
	   ,dataType:	"html"
	   ,method:		"POST"
	   ,success:	callback
	});
}
	
/**
 * <pre>
 * 	파라미터 세팅 및 인코딩 세팅
 *  => (key=value&key=value)
 * </pre>
 * @author brKim
 * @since 2017. 9. 6.
 * @param paramArray
 * @returns
 */
function makeParam(paramArray) {
	
	if (paramArray == null) {
		return "";
	}
	
	if (!(paramArray instanceof Object)) {
		return paramArray;
	}
	
	var param = "";
	var isFirst = true;

	for (var i in paramArray) {
		
		// 파라미터 세팅 중 함수가 들어올 경우 패스
		if (paramArray[i] instanceof Function) {
			continue;
		}
		
		if (paramArray[i] != "") {
			
			if (param != "") {
				param += "&";
			}
			
			param += i + "=";

			if ((paramArray[i] + "").indexOf("&") > 0
					|| (paramArray[i] + "").indexOf("+") > 0
					|| (paramArray[i] + "").indexOf("%") > 0
					|| (paramArray[i] + "").indexOf("#") > 0) {
				param += encodeURIComponent(paramArray[i]);
			} else {
				// 조회이력 검색어가 있을경우 파라미터 인코딩해서 넘겨줌.
				// 행정규칙 링크관련 추가_20170103
				if (i == "vSct" || i == "joLnkStr") {
					param += encodeURIComponent(paramArray[i]);
				} else {
					param += paramArray[i];
				}
			}
		}
		
	}
	return param;
}

//글씨 강조
var preSelectedObj;
function setStrong(obj){
	if(preSelectedObj)
		preSelectedObj.style.fontWeight = "";
	if(obj){
		obj.style.fontWeight = "bold";
		preSelectedObj = obj;
	}
}
	
/*토글*/
var Toggle =  function(){
	this.toggleItems = new Array();
	this.currentId = "";
}

Toggle.prototype.addObject = function(id){
	this.toggleItems[id] = document.getElementById(id);
}

Toggle.prototype.getItems = function(id){
	return this.toggleItems;
}

Toggle.prototype.showObject = function(id){
	for(var i in this.toggleItems){
		if(this.toggleItems[i] != null 
				&& typeof(this.toggleItems[i]) != 'undefined'
				&& this.toggleItems[i].style != null){
			this.toggleItems[i].style.display = "none";
		}
	}
	
	if(this.toggleItems[id] != null 
			&& typeof(this.toggleItems[id]) != 'undefined'
			&& this.toggleItems[id].style != null){
		this.toggleItems[id].style.display = "block";
		this.currentId = id;
	}		
}

Toggle.prototype.getCurrentId = function(){
	if(this.currentId != ""){
		return this.currentId;
	}
	for(var i in this.toggleItems){
		if(this.toggleItems[i] != null 
				&& typeof(this.toggleItems[i]) != 'undefined'
				&& this.toggleItems[i].style != null
				&& this.toggleItems[i].style.display != "none"){
			this.currentId = this.toggleItems[i].id;
			return this.toggleItems[i].id;
		}
	}
}

Toggle.prototype.getCurrentImgOnId = function(){
	for(var i in this.toggleItems){
		if(this.toggleItems[i] != null 
			&& typeof(this.toggleItems[i]) != 'undefined'
			&& this.toggleItems[i].src != null){
				if(this.toggleItems[i].src.indexOf('on.gif') != -1){
					return this.toggleItems[i].id;
				}
		}
	}
}

Toggle.prototype.onImage = function(id){
	for(var i in this.toggleItems){
		if(this.toggleItems[i] != null 
				&& typeof(this.toggleItems[i]) != 'undefined'
				&& this.toggleItems[i].src != null){
			this.toggleItems[i].src = this.toggleItems[i].src.replace("on.gif", ".gif");
		}
	}
	
	if(this.toggleItems[id] != null 
			&& typeof(this.toggleItems[id]) != 'undefined'
			&& this.toggleItems[id].src != null){
		this.toggleItems[id].src = this.toggleItems[id].src.replace(".gif", "on.gif");
	}
}

Toggle.prototype.onImageCnt = function(){
	var cnt=0;
	for(var i in this.toggleItems){
	if(this.toggleItems[i] != null 
			&& typeof(this.toggleItems[i]) != 'undefined'
			&& this.toggleItems[i].src != null){
			if(this.toggleItems[i].src.indexOf('on.gif') != -1){
				cnt++;
			}
		}
	}
	return cnt;
}

Toggle.prototype.setClass = function(id, onClass, offClass){
	for(var i in this.toggleItems){
		if(this.toggleItems[i] != null 
				&& typeof(this.toggleItems[i]) != 'undefined'
				&& this.toggleItems[i].className != null){
			this.toggleItems[i].className = offClass;
		}
	}
	if(this.toggleItems[id] != null 
			&& typeof(this.toggleItems[id]) != 'undefined'
			&& this.toggleItems[id].className != null){
		this.toggleItems[id].className = onClass;
	}
}

/* calender */
var cal; 
function showCalener(id, obj){
	displayCalendar(el(id),'yyyy-mm-dd',obj)	
}

/**
전체 체크박스를 체크
*/
function checkAllCheckbox(checked, checkArray){
	for(var i = 0; i < checkArray.length; i++){
		checkArray[i].checked = checked;
	}
}

/**
전체 체크박스를 활성화/비활성화
*/
function disabledAllCheckbox(mode, checkArray){
	for(var i = 0; i < checkArray.length; i++){
		checkArray[i].disabled = mode;
	}
}


/**
체크박스 배열중 체크된 부분만 , 로 구분하여 스트링 로 넘겨준다.
**/
function chkArrayToDelimitedString(paramArray){
	var param = "";
	for(var i = 0; i < paramArray.length; i++){
		if(paramArray[i].checked){
			if(param != "")
				param += ",";
			param += paramArray[i].value;
		}
	}
	return param;
}

/**
체크박스 배열중 체크된 부분만 스트링 배열로 넘겨준다.
**/
function chkArrayToStringArray(paramArray){
	var param = new Array();
	var arrayIdx = 0;
	for(var i = 0; i < paramArray.length; i++){
		if(paramArray[i].checked){
			param[arrayIdx++] = paramArray[i].value;
		}
	}
	return param;
}

function setClass(pId, className){
	if(pId != "" && el(pId) != null){
		el(pId).className = className;
	}
}

/**
	검색 정렬 설정 공통 부분 Start
**/
var SortMode = function(idx, SortId, SortImgId){
	this.arrMode = new Array();
	for(var i=0; i<idx; i++){
		this.arrMode[i] = "0";
	}
	this.sortId = SortId;
	this.sortImg = SortImgId;
}

SortMode.prototype.clear = function (idx, SortId, SOrtImgId){
	for(var i=0; i<this.arrMode.length; i++){
		if(idx != i){
			if(this.arrMode[i] == "1"){
				//디폴트 내림으로 초기화
				this.arrMode[i] = "0";
				//이미지 내림으로 초기화
				el(this.sortImg + i).src = el(this.sortImg + i).src.replace("btn_sort1.gif","/btn_sort.gif");
			}
			//클래스 지우기	
			setClass(this.sortId + i, "");	
		}
	}
}

SortMode.prototype.ImgChange = function (idx , SortId, SortImgId){
	if(idx == "0"){ 			//내림
		el(SortImgId).src = el(SortImgId).src.replace("btn_sort1.gif","/btn_sort.gif");
	}else{						//오름 
		el(SortImgId).src = el(SortImgId).src.replace("btn_sort.gif","/btn_sort1.gif");
	}
}
/** 
	검색 정렬 설정 공통부분 끝
**/

function chkArrayTitleToStringArray(paramArray){
	var param = new Array();
	var arrayIdx = 0;
	for(var i = 0; i < paramArray.length; i++){
		if(paramArray[i].checked){
			if(paramArray[i].value != '00')
			param[arrayIdx++] = paramArray[i].title;
		}
	}
	return param;
}

function arrayToSomeAndEtcString(paramArray, limit){
	if(paramArray == null || paramArray.length == 0)
		return "";
		
	var str = "(";
	var roopIdx = limit;
	if(paramArray.length < roopIdx)
		roopIdx = paramArray.length;
		
	for(var i = 0; i < roopIdx; i++){
		if(i > 0)str += ",";
		str += paramArray[i];
	}
	if(paramArray.length > roopIdx){
		var remainCount = paramArray.length - roopIdx;
		str += " 외 <strong>" + remainCount + "</strong>건 ";
	}
	str += ")";
	return str;
}
/** 
 * 목록저장 , 본문 저장 , 본문 검색
 * 2018.11.29. 2018 국가법령 - showBydSearch - 별표본문내용 검색 기능 추가에 따른 수정
 * 2018.12.06. 2018 국가법령 - 화면내 검색 기능 Layer 수정
 */
var SaveWindow = function(){
	var htmlSaveWin=false;
	var thdCmpSaveWin=false;
	var thdCmpTmpSaveWin=false;
	var thdCmpNewSaveWin=false;
	var lsPtnThdCmpSaveWin=false;
	var newSaveWin=false;
	var admRulOANSaveWin=false;
	var schlPubRulOANSaveWin=false;
	var infoSaveWin=false;
	var infoSaveWinNew=false;
	var listSaveWin=false;
	var joListSaveWin=false;
	var joInfoSaveWin=false;
	var bdySearchWin=false;
	var lsRvsRsnSave=false;
	var bdySearchRvsRsnWin=false;
	var engInfoSaveWin=false;
	var multiLingualActInfoSaveWin=false;
	var moreSchLayer;
	var siteMapLayer;
	var schlPubRulRvsRsnSave=false;
	return {
		/* 본문 저장 시작 (조약 등) */
		showInfoSave: function(obj) { // 본문저장 레이어 시작
			
			if (infoSaveWin) {
				infoSaveWin.dialog("close");
			}

			if (!infoSaveWin) {

				infoSaveWin = $("#infoSaveLayer").dialog({
					autoOpen : false
				   ,width:253
				   ,height:141
				   ,modal : false
				   ,resizable: false
				   ,position : {
						// 내 객체 위치
						my : 'center top',
						// 참조할 객체 위치
						at : 'center bottom',
						// 참조할 객체 지정
						of : $(obj)
				}
				}).css("top","5px");
			}

			// 타이틀 바 숨김
			$("#infoSaveLayer").parent().find(".ui-dialog-titlebar").hide();
			
			infoSaveWin.dialog("option","position",{
				// 내 객체 위치
				my : 'center top',
				// 참조할 객체 위치
				at : 'center bottom',
				// 참조할 객체 지정
				of : $(obj)
			});
			
			infoSaveWin.dialog("open");
		}, 		
		hideInfoSave: function() {
			
			if (infoSaveWin) {
				infoSaveWin.dialog('close');
			}
			
		},
		/* 본문 저장 종료 */
		/* 학칙공단 제개정문 저장 시작 */
		showSchlPubRulRvsRsnSave: function(obj) { // 본문저장 레이어 시작
			
			if (schlPubRulRvsRsnSave) {
				schlPubRulRvsRsnSave.dialog("close");
			}

			if (!schlPubRulRvsRsnSave) {

				schlPubRulRvsRsnSave = $("#schlRvsRsnSaveLayer").dialog({
					autoOpen : false
				   ,width : 253
				   ,height : 141
				   ,modal : false
				   ,resizable: false
				   ,position : {
						// 내 객체 위치
						my : 'center top',
						// 참조할 객체 위치
						at : 'center bottom',
						// 참조할 객체 지정
						of : $(obj)
				}
				}).css("top","5px");
			}

			// 타이틀 바 숨김
			$("#schlRvsRsnSaveLayer").parent().find(".ui-dialog-titlebar").hide();
			
			schlPubRulRvsRsnSave.dialog("open");
		}, 		
		hideSchlPubRulRvsRsnSave: function() {
			
			if (schlPubRulRvsRsnSave) {
				schlPubRulRvsRsnSave.dialog('close');
			}
			
		},
		/* 학칙공단 제개정문 저장 종료 */
		/* 본문 저장 레이어 시작 (전체 제개정이유 등) */
		showLsRvsRsnSave: function(obj) {
			
			if (lsRvsRsnSave) {
				lsRvsRsnSave.dialog("close");
			}
			 
			if (!lsRvsRsnSave) {
				
				lsRvsRsnSave = $("#lsRvsRsnInfoSaveLayer").dialog({
					autoOpen : false
				   ,width:253
				   ,modal : false
				   ,resizable: false
				   ,position : {
						// 내 객체 위치
						my : 'center top',
						// 참조할 객체 위치
						at : 'center bottom',
						// 참조할 객체 지정
						of : $(obj)
				}
				}).css("top","5px");
			}
			
			if(el("lsSaveBtn")) {
				setTimeout(function(){
					el("lsSaveBtn").focus();
				},10); 
			}
			
			// 타이틀 바 숨김
			$("#infoSaveLayer").parent().find(".ui-dialog-titlebar").hide();
			
			lsRvsRsnSave.dialog("open");
		},
		hideLsRvsRsnSave: function() {
			
			if (lsRvsRsnSave) {
				lsRvsRsnSave.dialog('close');
				if (el("bdySaveBtn") && el("lsOpBar") == null) {
					el("bdySaveBtn").focus();
				} else if (el("bdySaveBtn") && el("lsOpBar").style.display != "none") {
					el("bdySaveBtn").focus();
				} else if (el("bdySaveNBtn")) {
					el("bdySaveNBtn").focus();
				}
			}
		},
		/*법령용어 저장 레이어*/
		showInfoSaveNew : function(obj){
			
			if(infoSaveWinNew){
				infoSaveWinNew.hide();
				infoSaveWinNew = null;
			}
			
			if(!infoSaveWinNew){
				infoSaveWinNew = $('#lsTrmInfoSaveLayer2').dialog({
					autoOpen : false,
					width: 253,
					height: 141,
					modal : false,
					resizable : false,
					position : {
						// 내 객체 위치
						my : 'center top',
						// 참조할 객체 위치
						at : 'center bottom',
						// 참조할 객체 지정
						of : $(obj)
					}
				});
			
			}
			// 타이틀 바 숨김
			$('#lsTrmInfoSaveLayer2').parent().find(".ui-dialog-titlebar").hide();
			infoSaveWinNew.dialog("open");
		}, 		
		hideInfoSaveNew: function(){
			if(infoSaveWinNew){
				infoSaveWinNew.hide();
				infoSaveWinNew = null;

			}
		},
		/* 영문 본문 저장 시작 */
		showEngInfoSave: function(obj) {
			
			if (engInfoSaveWin) {
				engInfoSaveWin.dialog("close");
			}
			
			engInfoSaveWin = $("#engInfoSaveLayer").dialog({
				autoOpen : false
			   ,width:253
			   ,height:141
			   ,modal : false
			   ,resizable: false
			   ,position : {
					// 내 객체 위치
					my : 'center top',
					// 참조할 객체 위치
					at : 'center bottom',
					// 참조할 객체 지정
					of : $(obj)
			}
			}).css("top","5px");
			
			// 타이틀 바 숨김
			$("#engInfoSaveLayer").parent().find(".ui-dialog-titlebar").hide();
			
			engInfoSaveWin.dialog("open");
		}, 		
		hideEngInfoSave: function() {
			if(engInfoSaveWin){
				engInfoSaveWin.dialog("close");
			}
		},
		/* 영문 본문 저장 종료 */
		/* 다국어 본문 저장 시작 */
		showMultiLingualActInfoSave: function(obj) {
			
			if (multiLingualActInfoSaveWin) {
				multiLingualActInfoSaveWin.dialog("close");
			}
			
			multiLingualActInfoSaveWin = $("#multiLingualActInfoSaveLayer").dialog({
				autoOpen : false
			   ,width:253
			   ,height:141
			   ,modal : false
			   ,resizable: false
			   ,position : {
					// 내 객체 위치
					my : 'center top',
					// 참조할 객체 위치
					at : 'center bottom',
					// 참조할 객체 지정
					of : $(obj)
			}
			}).css("top","5px");
			
			// 타이틀 바 숨김
			$("#multiLingualActInfoSaveLayer").parent().find(".ui-dialog-titlebar").hide();
			
			multiLingualActInfoSaveWin.dialog("open");
		}, 		
		hideMultiLingualActInfoSave: function() {
			if(multiLingualActInfoSaveWin){
				multiLingualActInfoSaveWin.dialog("close");
			}
		},
		/* 다국어 본문 저장 종료 */
		/* 법령 변경조문 본문 저장 시작 */
		showJoInfoSave: function(obj) {	
						
			if (joInfoSaveWin) {
				joInfoSaveWin.hide();
				joInfoSaveWin = null;
			}
			 
			if (!joInfoSaveWin) {
				
				joInfoSaveWin = $("#joInfoSaveLayer").dialog({
					autoOpen : false
				   ,height: 141
				   ,modal : false
				   ,resizable: false
				   ,position : {
						// 내 객체 위치
						my : 'center top',
						// 참조할 객체 위치
						at : 'center bottom',
						// 참조할 객체 지정
						of : $(obj)
				   }
				}).css("top","5px");
			}
			
			// 타이틀 바 숨김
			$("#engInfoSaveLayer").parent().find(".ui-dialog-titlebar").hide();
			
			joInfoSaveWin.dialog("open");
			
			if(el("joSaveBtn")) {
				setTimeout(function(){
					el("joSaveBtn").focus();
				},10);
			}
		}, 		
		hideJoInfoSave: function(){
			if(joInfoSaveWin){
				joInfoSaveWin.dialog("close");
			}
		},
		/* 법령 변경조문 본문 저장 종료 */
		showHtmlSave: function(obj,xx,yy){			/*본문저장(html) 레이어 시작*/	

			var title = "<div class=\"towpLt\"><div class=\"ltitLt\">내용저장</div><div class=\"btnLt\">"
						+"<a href=\"#AJAX\" onclick=\"javascript:SaveWindow.hideHtmlSave();\"><img src=\"/LSW/images/button/btn_close8.gif\" alt=\"닫기\" /></a>"
						+"</div></div>";
						
			if(htmlSaveWin){
				htmlSaveWin.hide();
				htmlSaveWin = null;
			}
			 
			if(!htmlSaveWin){
				var relEle = Ext.get(obj);
				var x, y;
				if(relEle != null){
					x = relEle.getX() - 280;
					y = relEle.getY() + 20;	
					if(x < 0) x = relEle.getX()
					if(y < 0) y = relEle.getY()
				}
							
				Ext.get('htmlSaveLayer').show();
				htmlSaveWin = new Ext.Window({
						autoScroll:false
						//,id : 'adfawefcxvsefw'
						,contentEl : 'htmlSaveLayer'
						,baseCls:'p-window'
						,cls:'owindow'
						,layout:'fit'
						,title:title
						,width:253
						,height:141
						,borer: false
						,closeAction:'close'
						,resizable: false
						,x : x
						,y : y			
				});
			}
			htmlSaveWin.show();	

		},
		showThdCmpSave: function(obj,xx,yy){			/*3단비교 레이어 시작*/	
			
			var title = "<div class=\"towpLt\"><div class=\"ltitLt\">내용저장</div><div class=\"btnLt\">"
						+"<a href=\"#AJAX\" onclick=\"javascript:SaveWindow.hideThdCmpSave();\"><img src=\"/LSW/images/button/btn_close8.gif\" alt=\"닫기\" /></a>"
						+"</div></div>";
						
			if(thdCmpSaveWin){
				thdCmpSaveWin.hide();
				thdCmpSaveWin = null;
			}
			 
			if(!thdCmpSaveWin){
				var relEle = Ext.get(obj);
				var x, y;
				if(relEle != null){
					x = relEle.getX() - 280;
					y = relEle.getY() + 20;	
					if(x < 0) x = relEle.getX()
					if(y < 0) y = relEle.getY()
				}
							
				Ext.get('thdCmpSaveLayer').show();
				thdCmpSaveWin = new Ext.Window({
						autoScroll:false
						,contentEl : 'thdCmpSaveLayer'
						,baseCls:'p-window'
						,cls:'owindow'
						,layout:'fit'
						,title:title
						,width:253
						,height:141
						,borer: false
						,closeAction:'close'
						,resizable: false
						,x : x
						,y : y			
				});
			}
			thdCmpSaveWin.show();	

		},

		showThdCmpTmpSave: function(obj,xx,yy){			/*3단비교 레이어 시작 임시*/	
			
			var title = "<div class=\"towpLt\"><div class=\"ltitLt\">내용저장</div><div class=\"btnLt\">"
						+"<a href=\"#AJAX\" onclick=\"javascript:SaveWindow.hideThdCmpTmpSave();\"><img src=\"/LSW/images/button/btn_close8.gif\" alt=\"닫기\" /></a>"
						+"</div></div>";
						
			if(thdCmpTmpSaveWin){
				thdCmpTmpSaveWin.hide();
				thdCmpTmpSaveWin = null;
			}
			 
			if(!thdCmpTmpSaveWin){
				var relEle = Ext.get(obj);
				var x, y;
				if(relEle != null){
					x = relEle.getX() - 280;
					y = relEle.getY() + 20;	
					if(x < 0) x = relEle.getX()
					if(y < 0) y = relEle.getY()
				}
							
				Ext.get('thdCmpTmpSaveLayer').show();
				thdCmpTmpSaveWin = new Ext.Window({
						autoScroll:false
						//,id : 'adfawefcxvsefw'
						,contentEl : 'thdCmpTmpSaveLayer'
						,baseCls:'p-window'
						,cls:'owindow'
						,layout:'fit'
						,title:title
						,width:253
						,height:141
						,borer: false
						,closeAction:'close'
						,resizable: false
						,x : x
						,y : y			
				});
			}
			thdCmpTmpSaveWin.show();	

		},
		hideThdCmpTmpSave: function(){
			if(thdCmpTmpSaveWin){
				thdCmpTmpSaveWin.hide();
				thdCmpTmpSaveWin = null;
			}
		},
		hideThdCmpSave: function(){
			if(thdCmpSaveWin){
				thdCmpSaveWin.hide();
				thdCmpSaveWin = null;
			}
		},
		/* 법령단위비교 레이어 시작 */
		showThdCmpNewSave: function(obj) {
			
			if (thdCmpNewSaveWin) {
				thdCmpNewSaveWin.dialog("close");
			}
			 
			if (!thdCmpNewSaveWin) {
				
				thdCmpNewSaveWin = $("#thdCmpNewSaveLayer").dialog({
					autoOpen : false
				   ,modal : false
				   ,resizable: false
				   ,position : {
						// 내 객체 위치
						my : 'center top',
						// 참조할 객체 위치
						at : 'center bottom',
						// 참조할 객체 지정
						of : $(obj)
				   }
				}).css("top","5px");
				
			}
			
			// 타이틀 바 숨김
			$("#thdCmpNewSaveLayer").parent().find(".ui-dialog-titlebar").hide();
			
			thdCmpNewSaveWin.dialog("open");	
		},
		hideThdCmpNewSave: function() {
			if (thdCmpNewSaveWin) {
				thdCmpNewSaveWin.dialog('close');
			}
		},
		/* 법령단위비교 레이어 종료 */
		/* 위임법령 3단비교 레이어 시작 */
		showLsPtnThdCmpSave: function(obj) {	
			
			var title = "<div class=\"towpLt\"><div class=\"ltitLt\">내용저장</div><div class=\"btnLt\">"
				+"<a href=\"#AJAX\" onclick=\"javascript:SaveWindow.hideLsPtnThdCmpSave();\"><img src=\"/LSW/images/button/btn_close8.gif\" alt=\"닫기\" /></a>"
				+"</div></div>";
			
			if (lsPtnThdCmpSaveWin) {
				lsPtnThdCmpSaveWin.dialog("close");
			}
			 
			if (!lsPtnThdCmpSaveWin) {
				
				lsPtnThdCmpSaveWin = $("#lsPtnThdCmpSaveLayer").dialog({
					autoOpen : false
				   ,width:316
				   ,height:493
				   ,title: title
				   ,modal : false
				   ,resizable: false
				   ,position : {
						// 내 객체 위치
						my : 'center top',
						// 참조할 객체 위치
						at : 'center bottom',
						// 참조할 객체 지정
						of : $(obj)
				   }
				}).css("top","5px");
			}
			
			lsPtnThdCmpSaveWin.dialog("open");
		},
		hideLsPtnThdCmpSave: function() {
			if (lsPtnThdCmpSaveWin) {
				lsPtnThdCmpSaveWin.dialog('close');
			}
		},
		/* 위임법령 3단비교 레이어 종료; */
		hideHtmlSave: function(){
			if(htmlSaveWin){
				htmlSaveWin.hide();
				htmlSaveWin = null;
			}
		},
		/* 신구법 비교 저장 레이어 시작 */
		showNewSave: function(obj) {
						
			if (newSaveWin) {
				newSaveWin.dialog("close");
			}
			 
			if (!newSaveWin) {
				
				newSaveWin = $("#newSaveLayer").dialog({
					autoOpen : false
				   ,modal : false
				   ,resizable: false
				   ,position : {
						// 내 객체 위치
						my : 'right top',
						// 참조할 객체 위치
						at : 'left bottom',
						// 참조할 객체 지정
						of : $(obj)
				}
				});
				
			}
			
			// 타이틀 바 숨김
			$("#newSaveLayer").parent().find(".ui-dialog-titlebar").hide();
			
			newSaveWin.dialog("open");
		}, 	
		hideNewSave: function() {
			if (newSaveWin) {
				newSaveWin.dialog('close');
			}
		},
		/* 신구법 비교 저장 레이어 종료; */
		
		showLawCompareSave: function(obj) {
			
			if (newSaveWin) {
				newSaveWin.dialog("close");
			}
			 
			if (!newSaveWin) {
				
				newSaveWin = $("#lawCompareSaveLayer").dialog({
					autoOpen : false
				   ,modal : false
				   ,resizable: false
				   ,position : {
						// 내 객체 위치
						my : 'right top',
						// 참조할 객체 위치
						at : 'left bottom',
						// 참조할 객체 지정
						of : $(obj)
				}
				});		
			}	
			// 타이틀 바 숨김
			$("#lawCompareSaveLayer").parent().find(".ui-dialog-titlebar").hide();		
			newSaveWin.dialog("open");
		}, 
		hideLawCompareSave: function() {
			if (newSaveWin) {
				newSaveWin.dialog('close');
			}
		},

		/* WIDE 목록 저장 레이어 시작 */
		showListSave: function(obj) {
						
			if(listSaveWin){
				listSaveWin.dialog("close");
			}
			
			listSaveWin = $("#listSaveLayer").dialog({
				autoOpen : false
			   ,width:253
			   ,height:141
			   ,modal : false
			   ,resizable: false
			   ,position : {
					// 내 객체 위치
					my : 'center top',
					// 참조할 객체 위치
					at : 'center bottom',
					// 참조할 객체 지정
					of : $(obj)
			}
			}).css("top","5px");
				
			// 타이틀 바 숨김
			$("#listSaveLayer").parent().find(".ui-dialog-titlebar").hide();
			
			listSaveWin.dialog("open");
		}, 
		hideListSave: function(){
			if(listSaveWin){
				listSaveWin.dialog("close");
			}
		},
		/* WIDE 목록 저장 레이어 종료 */
		/* 법령 조문 목록 저장 레이어 시작 */
		showJoListSave: function(obj,xx,yy) {
							
				if (joListSaveWin) {
					joListSaveWin.dialog("close");
				}
				 
				if (!joListSaveWin) {
								
					joListSaveWin = $("#joListSaveLayer").dialog({
						autoOpen : false
					   ,modal : false
					   ,resizable: false
					   ,position : {
							// 내 객체 위치
							my : 'center top',
							// 참조할 객체 위치
							at : 'center bottom',
							// 참조할 객체 지정
							of : $(obj)
					}
					}).css("top","5px");
				}
				
				// 타이틀 바 숨김
				$("#listSaveLayer").parent().find(".ui-dialog-titlebar").hide();
				
				joListSaveWin.dialog("open");
			}, 
			hideJoListSave: function(){
				if (joListSaveWin) {
					joListSaveWin.dialog("close");
				}
			},	
		/* 법령 조문 목록 저장 레이어 종료 */
		/* 화면내 검색 레이어 시작  */	
		showBydSearch: function(obj) {
			if (bdySearchWin) {
				bdySearchWin.dialog("close");
			}

            var vWidth = 283;
            var vWidSty="";
            if (arguments[3] != null && typeof(arguments[3]) != "undefined" && typeof(arguments[3]) != "LS" && (arguments[3] != undefined && arguments[3] != "DECSN")) {
                vWidth = 325;
                vWidSty= " style=\"width:" + vWidth + "px;\"";
                $("#bdySearchLayer").find(".viewla:first").css("width", vWidth + "px"); // 내용
            }

			var title = "<div class=\"towpSh\"" + vWidSty + "><div class=\"ltitSh\">화면내검색</div><div class=\"btnSh\">"
						+"<a href=\"#\" onclick=\"javascript:SaveWindow.hideBdySearch();\"><img src=\"" + webRoot + "/images/button/btn_close8.gif\" alt=\"닫기\" /></a>"
						+"</div></div>";

			if (!bdySearchWin) {
				bdySearchWin = $("#bdySearchLayer").dialog({
					autoOpen : false
				   ,width : vWidth
				   ,height : 108
				   ,title: title
				   ,modal : false
				   ,resizable: false
				   ,position : {
					   // 내 객체 위치
					   my : 'right top',
					   // 참조할 객체 위치
					   at : 'right bottom',
					   // 참조할 객체 지정
					   of : obj
				   }
				}).css("top","5px");
			} else {
				if(arguments[3] != undefined && arguments[3] == "DECSN") {
					bdySearchWin = $("#bdySearchLayer").dialog({position : {my:'right top', at:'right bottom', of:obj}});
				}
			}
			
			bdySearchWin.dialog("open");
			
			var timer;
            var f = function() {
                clearInterval(timer);
                
                if(el('bdySearch')) el('bdySearch').focus();
                
                el('bdyKeyVal').innerHTML = printBdySchKeywordList();
            }
            
            timer = setInterval(f, 200);
		},
		hideBdySearch: function(){
			if (bdySearchWin) {
				bdySearchWin.dialog('close');
			}
		}
		/* 화면내 검색 레이어 종료  */
		,showMoreSchLayer : function(obj, xValue){
				var relEle = Ext.get(obj);
					var x, y;
					if(relEle != null){
						x = relEle.getX() - 200 - xValue  ;
						y = relEle.getY() + 100;	
						if(x < 0) x = relEle.getX()
						if(y < 0) y = relEle.getY()
					}

					var title = "<div class=\"towpShMore\"><div class=\"ltitShMore\">다른 법령정보</div><div class=\"btnShMore\">"
								+"<a href=\"#AJAX\" onclick=\"javascript:SaveWindow.hideMoreSchBdySearch();\"><img src=\"/LSW/images/button/btn_close8.gif\" alt=\"닫기\" /></a>"
								+"</div></div>";	
					
					Ext.get('moreSchLayer').show();	
					moreSchLayer= new Ext.Window({
						 autoScroll:false
						,contentEl : 'moreSchLayer'
						,baseCls:'p-window'
						,cls:'owindow'
						,layout:'fit'
						,title:title
						,width:416
						,height:360
						,resizable : false
						,border: false
						,closeAction:'close'
						, x : x
						, y : y
						,listeners:
						{'close':function(){
						 		try{	
									el("moreSchDivWrite").innerHTML = "<div id=\"moreSchLayer\" style=\"display:none\"></div>";
								}catch(e){}
								 
						}}	
						});

					moreSchLayer.show();
		}
		
		,hideMoreSchBdySearch: function(){
			if(moreSchLayer){
				moreSchLayer.hide();
				moreSchLayer = null;
			}
		}
		,showSiteMapLayer : function(obj, xValue){
			var relEle = Ext.get(obj);
				var x, y;
				if(relEle != null){
					x = relEle.getX() - 1200 - xValue  ;
					y = relEle.getY() + 100;	
					if(x < 0) x = relEle.getX()
					if(y < 0) y = relEle.getY()
				}

				var title = "<div class=\"towpSiteMore\"><div class=\"ltitSiteMore\">사이트맵</div><div class=\"btnShMore\">"
							+"<a href=\"#AJAX\" onclick=\"javascript:SaveWindow.hideSiteMap();\"><img src=\"/LSW/images/button/btn_close8.gif\" alt=\"닫기\" /></a>"
							+"</div></div>";	
				
				Ext.get('siteMapLayer').show();	
				siteMapLayer= new Ext.Window({
					 autoScroll:false
					,contentEl : 'siteMapLayer'
					,baseCls:'p-window'
					,cls:'owindow'
					,layout:'fit'
					,title:title
					,width:865
					,height:754
					,resizable : false
					,border: false
					,closeAction:'close'
					, x : x
					, y : y
					,listeners:
					{'close':function(){
					 		try{	
								el("siteMapDivWrite").innerHTML = "<div id=\"siteMapLayer\" style=\"display:none\"></div>";
							}catch(e){}
							 
					}}	
					});

				siteMapLayer.show();
		}
		
		,hideSiteMap: function(){
			if(siteMapLayer){
				siteMapLayer.hide();
				siteMapLayer = null;
			}
		},
		
		/* 행정규칙 신구법 비교 저장 레이어 시작 */
		showAdmRulOANSave: function(obj) {
			if (admRulOANSaveWin) {
				admRulOANSaveWin.dialog("close");
			}
			if (!admRulOANSaveWin) {
				admRulOANSaveWin = $("#admRulOANSaveLayer").dialog({
					autoOpen : false
				   ,modal : false
				   ,resizable: false
				   ,position : {
						// 내 객체 위치
						my : 'right top',
						// 참조할 객체 위치
						at : 'left bottom',
						// 참조할 객체 지정
						of : $(obj)
				}
				});
			}
			// 타이틀 바 숨김
			$("#admRulOANSaveLayer").parent().find(".ui-dialog-titlebar").hide();
			
			admRulOANSaveWin.dialog("open");
		}, 	
		hideAdmRulOANSave: function() {
			if (admRulOANSaveWin) {
				admRulOANSaveWin.dialog('close');
			}
		},
		/* 행정규칙 신구법 비교 저장 레이어 종료; */
		
		/* 학칙공단 신구법 비교 저장 레이어 시작 */
		showSchlPubRulOANSave: function(obj) {
						
			if (schlPubRulOANSaveWin) {
				schlPubRulOANSaveWin.dialog("close");
			}
			 
			if (!schlPubRulOANSaveWin) {
				
				schlPubRulOANSaveWin = $("#schlPubRulOANSaveLayer").dialog({
					autoOpen : false
				   ,modal : false
				   ,resizable: false
				   ,position : {
						// 내 객체 위치
						my : 'right top',
						// 참조할 객체 위치
						at : 'left bottom',
						// 참조할 객체 지정
						of : $(obj)
				}
				});
				
			}
			
			// 타이틀 바 숨김
			$("#schlPubRulOANSaveLayer").parent().find(".ui-dialog-titlebar").hide();
			
			schlPubRulOANSaveWin.dialog("open");
		}, 	
		hideSchlPubRulOANSave: function() {
			if (schlPubRulOANSaveWin) {
				schlPubRulOANSaveWin.dialog('close');
			}
		},
		/* 신구법 비교 저장 레이어 종료; */
	};
}();

function appendInputEls(parent, type, paramArray){
	if (paramArray == null) return "";
	for (var i in paramArray){
		$('input[name='+i+']').remove();
		if (paramArray[i] != ""){
			appendInputEl(parent, type, i, paramArray[i]);
		}
	}
}

function appendInputEl(parent, type, name, value){
	if(eval("parent." + parent.name + name) != null){
		eval("parent." + parent.name + name).value = value;
	}
	else{
		var inputEl = document.createElement("INPUT");
		inputEl.type = type;
		inputEl.name = name;
		inputEl.id = parent.name + name;
		inputEl.value = value;
		parent.appendChild(inputEl);
	}
}

function appendInputXEl(divName, list){
	var temp = list.split(",");
	var liObj;
	var aObj;
	
	var spanObj;
	var uccAObj;
	var uccA1Obj;
	var uccTemp;
	var ebookA2Obj;
	
	liObj = document.createElement("li");
	liObj.className = "deptx";
	var imgObj = document.createElement("img");
	imgObj.src = "images/pop/stit_life.gif";
	imgObj.alt = "이 법이 규율하고 있는 다음 생활분야에 대한 법령정보를 찾기쉽게 해설하여 드립니다.";
	imgObj.width = "286";
	imgObj.height = "31";
	liObj.appendChild(imgObj);
	el(divName).appendChild(liObj);
	
	for(var i=0; i < temp.length; i++){
		var url = null;
		url = temp[i].split("--");
		liObj = document.createElement("li");
		aObj =  document.createElement("a");
		aObj.id = "csmLi" + i;
		aObj.href = url[2].replaceAll("&amp;","&");
		aObj.title = url[0];
		aObj.target = "_blank";
		aObj.clasName = url[2];
		aObj.className = "boldcsmlnk";
		var imgObjDot = document.createElement("img");
		imgObjDot.src = "images/pop/dot.gif";
		imgObjDot.className = "imgcsmlnk";
		
		liObj.appendChild(imgObjDot);
		
		var textObj = document.createTextNode(" "+url[1]); // (i+1) + ". " + 
		aObj.appendChild(textObj);
		liObj.appendChild(aObj);
		
		if(url[3] != "" && typeof(url[3]) != "undefined"){
			var imgObj = document.createElement("img");
			imgObj.src = "images/button/icn_vod.gif";
			imgObj.className = "imgcsmlnk";
			
			if(url[3].indexOf("__") > -1){
				var imgObj2 = document.createElement("img");
				imgObj2.src   = "images/button/icn_vod.gif";
				imgObj2.className = "imgcsmlnk";
				
				uccTemp = url[3].split("__");
				uccAObj = document.createElement("a");
				uccAObj.href = uccTemp[0].replace("amp;","");
				uccAObj.target = "_blank";
				uccAObj.appendChild(imgObj);
				liObj.appendChild(uccAObj); 
				uccA1Obj = document.createElement("a");
				uccA1Obj.href = uccTemp[1].replace("amp;","");
				uccA1Obj.target = "_blank";
				uccA1Obj.appendChild(imgObj2);
				liObj.appendChild(uccA1Obj); 
			}else{
				uccAObj = document.createElement("a");
				uccAObj.href = url[3].replace("amp;","");
				uccAObj.target = "_blank";
				uccAObj.appendChild(imgObj);
				liObj.appendChild(uccAObj); 
			}
		}
		
		if(url[4] != "" && typeof(url[4]) != "undefined"){
			
			if(url[4].replaceAll(" ","").length > 1){
				ebookA2Obj = document.createElement("a");
				ebookA2Obj.href = url[4];
				ebookA2Obj.target = "_blank";
				var imgObj = document.createElement("img");
				imgObj.src = "images/button/icn_book.gif";
				imgObj.className = "imgcsmlnk";
				 
				ebookA2Obj.appendChild(imgObj);
				liObj.appendChild(ebookA2Obj); 
			}
		}
		el(divName).appendChild(liObj);
	}
}

function removeInPutXEl(divName){
	var deleteObj = document.getElementsByName(divName); 
	for(var i=0; i<deleteObj.length;i++){ 
   		deleteObj[i].parentNode.removeChild(deleteObj[i]); 
   	}
} 

function openPop(url, width, height){
	if(width == null || width == ""){
		width = "1040px";
	}
    
	if(height == null || height == ""){
		height = "630px";
	}
	
	/*
	 * 팝업으로뜨는 별표는 사이즈를 좀 키움 2013.03.20 홍석균
	 * 자치법규 별표 팝업은 그대로 함 2015.11.04 k.b.r
	 * [#29830] 제정·개정이유 팝업 스크롤 확인 -> height 변경
	 */
	if(   url.indexOf("lsBylInfoP.do") > -1
	   || url.indexOf("admRulBylInfoP.do") > -1
	   || url.indexOf("ordinBylInfoP.do") > -1
	   )
	{
	    height = "850px";
	}
	else if ( url.indexOf("lsSideInfoP.do") > -1) {
		height = "655px";
	}
	
	var win = window.open(url,'', 'scrollbars=no,toolbar=no,resizable=yes,status=no,location=yes,menubar=no,width=' + width + ',height=' +  height);
	return false;
}

function openPrintPop(url,name){
	var encodeVal = encodeURI(url);
	var win = window.open(encodeVal, name, 'scrollbars=yes,toolbar=no,resizable=yes,status=no,menubar=no,width=900px,height=700px');
	return false;
}

function openScrollPop(url, width, height){
	if(width == null || width == ""){
		width = "900px";
	}

	if(height == null || height == ""){
		height = "630px";
	}
	
	if ( url.indexOf("lsRvsRsnListP.do") > -1 || url.indexOf("lsRvsDocListP.do") > -1 ) {
		height = "628px";
	}
	
	var win = window.open(url,'', 'scrollbars=yes,toolbar=no,resizable=yes,status=no,location=yes,menubar=no,width=' + width + ',height=' +  height); 
	
	return false;
}

function openPopDetailOptions(url, width, height, scrollbar, toolbar, resizable, status, menubar){
	if (width == null || width == "") {
		width = "900px";
	}
	if (height == null || height == "") {
		height = "630px";
	}
	if (scrollbar == null || scrollbar == "") {
		scrollbar = "no";
	}
	if (toolbar == null || toolbar == "") {
		toolbar = "no";
	}
	if (resizable == null || resizable == "") {
		resizable = "yes";
	}
	if (status == null || status == "") {
		status = "no";
	}
	if (menubar == null || menubar == "") {
		menubar = "no";
	}
	var win = window.open(url,'', 'scrollbars=' + scrollbar + ',toolbar=' + toolbar + ',resizable=' + resizable + ',status=' + status + ',menubar=' + menubar + ',width=' + width + ',height=' + height);
}

function openScrollPopM(url){
	var win = window.open(url,'', 'scrollbars=yes,toolbar=no,resizable=yes,status=no,menubar=no,width=720px,height=450px'); 
	return false;
}


function beforeSave(){
	return true;	
}

function beforeInfoSave(){
	return true;
}

function beforePrint(){
	return true;
}

function beforeHtmlSave(){
	return true;
}

var Logger = function(){}
// 1: alert창 x , 그외에 뜸
Logger.prototype.def = function (msg, mode){
	if(mode != 1){
		alert(msg);
	}
}
Logger.prototype.err = function (msg){
	alert("ERROR: " + msg);
}

var logger = new Logger();




function isCheckboxArrayChecked(paramArray){
	for(var i = 0; i < paramArray.length; i++){
		if(paramArray[i].checked){
			return true;
		}
	}
	return false;
}

function checkIntForm(pIntObj){
	if(pIntObj == null) return false;
	if(pIntObj.value == "") return false;
	var data = pIntObj.value;
	if(!isNumber(data)){
		alert("숫자만 입력가능합니다.");
		pIntObj.value = "";
		pIntObj.focus();
		return false;
	}else{
		return true;
	}

}


function isNumber(str){
	var src = new String(str);
	var tar = true;
	var i;
	var len = src.length;

	for (i=0; i < len; i++) {
		if((src.charAt(i) < '0') | (src.charAt(i) > '9')){
			if(i==0) {
				if(src.charAt(i) != '-') return false;
			}
			else {
				if(src.charAt(i) != '.') return false;
			}
		}
	}
	return true;
}


/* 상세검색 날짜를 searchParam에 설정한다. */
function detailDateSet(startDateId, endDateId){
	var dateStr;
	var StartDate = el(startDateId).value.trim();
	var EndDate = el(endDateId).value.trim();
	if(StartDate != "" && EndDate == "") EndDate = '99999999';
	if(StartDate == "" && EndDate != "") StartDate = '00000000';
	
	
	if(StartDate != "" || EndDate != ""){
		dateStr = (StartDate + "~" + EndDate).replaceAll("-", "");
	}else{
		dateStr = "";
	}
	
	return dateStr;
}

//본문 검색 
var TRange = null;
var TRangeCopy = null;
var n = 0;
var preSearchText;
var preSearchType = "";
var isFirstSearch = true;
var clickElement = null;
var chkImVal = true;

var chkTmp = "1";
var chkTmp1 = true;

function bodySearch(targetDiv, searchText, clear, inputId, chkMode, chkAr) {
	if(clear != null && clear && preSearchType == "W"){
		bodySearchReset(targetDiv);
	}
	
	preSearchType = "T";
	
	if(searchText.trim() == ""){
		alert("검색어를 입력해 주세요.");
		if(el("bdySearch")) el("bdySearch").focus();
		return;
	}
	
	var hasInput = false;
	
	if(inputId != null && typeof(el(inputId)) != "undefined"){
		hasInput = true;;
	}
	
	var strFound = "";
	
	el('bdyKeyVal').innerHTML = "";
	
	if($.browser.isIE) {
		// EXPLORER-SPECIFIC CODE
		if(TRange != null) {
			if(!isFirstSearch){
				if(chkMode == "up"){
				    setTRangeSelectOff();
				    chkTmp = "2";
				    
				} else {
				    if(chkTmp == "1"){
				        setTRangeSelectOff();
				        
				    } else {
				        setTRangeSelectOff();
				    }
				}
			}
			
			isFirstSearch = false;

			if(clickElement != null){
				try{
					TRange.moveToElementText(clickElement);
					
				} catch(e) {
					//잘못된 범위를 클릭했을 때
				}
				
				clickElement = null;
			}
			
			if(chkMode == "up"){
    		    TRange.collapse(true);
    		    strFound = TRange.findText(searchText, -100000000,4);
    		    
    		    // 위로찾을대 더이상 위에 해당 검색어가 없을경우
    		    // 닫혀져있는 부칙을 열어놓고 검색처리후 닫아준다
    		    // 닫아주는 처리는 밑에서 함 2013.2.21 홍석균
    		    if(!strFound){
                    var arInfs = document.getElementsByName("arInf");
                    var arInfCnt = arInfs.length;
                    
                    if(arInfCnt > 1){
                        for(var i = 0; i < arInfCnt-1; i++){
                            var arInf = arInfs[i].value;
                            
                            if(el("ar"+arInfs[i].value) != null && el("ar"+arInfs[i].value).style.display != ""){
                                arView("ar" + arInf);
                            }
                        }
                    }
                }
    			
    			strFound = TRange.findText(searchText, -100000000,4);
    			
    			
    			if(    TRange.parentElement().parentNode.parentNode.id.indexOf("liBgcolor") > -1
    			    || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("liBgcolor") > -1
    			   )
    			{
    			    TRange = null;
		            bodySearch(targetDiv, searchText, false, inputId, chkMode);
    			}
    			
    		} else {
    		    TRange.collapse(false);
    		    strFound = TRange.findText(searchText);
    		}
    		
			try {
				if(strFound){
					if(chkMode == "up"){
    					TRange.select();
            			setTRangeSelectOn();
            			
    					
    					// 전엔 부칙쪽 화면내검색 위치정보찾을때 엘리먼트네임 "arDivs" 이걸 기준으로 찾앗었는데
    					// 누군가 수정하다 지워버린거같음(웹접근성하다가 안쓰는걸로 인식해서 지운거 같음)
    					// 각각의 부칙 엘리먼트id값으로 위치정보 다시 적용함(이후 밑으로 전부) 2013.2.21 홍석균
    					if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
            			    || TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
            			    || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
            			    || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
            			   )
            			{
                            var arInfsId = "";
                            
                            if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
	            		        || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
	            		       )
	            		    {
	            		    	  arInfsId = TRange.parentElement().parentNode.parentNode.id;
	            		    }
	            		    
	            		    if(    TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
	            		        || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
	            		       )
	            		    {
	            		    	  arInfsId = TRange.parentElement().parentNode.parentNode.parentNode.id;
	            		    }
    		                
                            var arInfs = document.getElementsByName("arInf");
                            var arInfCnt = arInfs.length;
                            
                            if(arInfCnt > 1){
                                if(chkAr == "ar"){
                                    for(var i = 0; i < arInfCnt-1; i++){
                                        var arInf = arInfs[i].value;
                                        
                                        if(arInfsId != "ar" + arInf){
                                            if(el("ar"+arInfs[i].value) != null && el("ar"+arInfs[i].value).style.display == ""){
                                                arView("ar" + arInf);
                                            }
                                        }
                                    }
                                    
                                } else  if(arInfsId == "ar"+arInfs[arInfCnt-1].value){
                                    if(el("ar"+arInfs[arInfCnt-2].value) != null && el("ar"+arInfs[arInfCnt-2].value).style.display == ""){
                                        arView("ar" + arInfs[arInfCnt-2].value);
                                    }
                                }
                            }
                            
                		} else {
                		    if(chkAr == "ar"){
                		        bodySearch(targetDiv, searchText, false, inputId, "up", "ar");
                		        return;
                		    }
                		    
                		    var arInfs = document.getElementsByName("arInf");
                            var arInfCnt = arInfs.length;
                            
                		    if(arInfCnt > 1){
                                var arInf = arInfs[0].value;
                                
                                if(el("ar"+arInf) != null && el("ar"+arInf).style.display == ""){
                                    arView("ar" + arInf);
                                }
                            }
                		}
                        
    				} else {
    				    TRange.select();
    					setTRangeSelectOn();
    					
    					if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
            			    || TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
            			    || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
            			    || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
            			   )
            			{
                            var arInfsId = "";
                            
                            if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
	            		        || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
	            		       )
	            		    {
	            		    	  arInfsId = TRange.parentElement().parentNode.parentNode.id;
	            		    }
	            		    
	            		    if(    TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
	            		        || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
	            		       )
	            		    {
	            		    	  arInfsId = TRange.parentElement().parentNode.parentNode.parentNode.id;
	            		    }
    		                
                            var arInfs = document.getElementsByName("arInf");
                            var arInfCnt = arInfs.length;
                            
                            if(arInfCnt > 1){
                                if(arInfsId == "ar"+arInfs[arInfCnt-1].value){
                                    if(el("ar"+arInfs[arInfCnt-2].value) != null && el("ar"+arInfs[arInfCnt-2].value).style.display == ""){
                                        arView("ar" + arInfs[arInfCnt-2].value);
                                    }
                                }
                            }
                		}
    				}
    				
					if(chkAr != "ar"){
					    if(hasInput) el(inputId).focus();
					    
					} else {
					    TRange.execCommand("Unselect");
					}
					
					return;
				}
				
			} catch(e) {
			    if(chkMode == "up"){
            		setShowArUp3(hasInput, inputId);
        		
            	} else {
            	    setShowArDown2(hasInput, inputId);
            	}
            	
        		if(chkTmp1){
    				TRange = null;
    				bodySearch(targetDiv, searchText, false, inputId, chkMode);
    				chkTmp1 = true;
			    }
			}
			
			if(chkImVal){
			    TRange.collapse(false);
			}
			
			chkImVal = true;
		}
		
		if(TRange == null || !strFound) {
			TRange = document.body.createTextRange();
			TRange.moveToElementText(el(targetDiv));
			
			if(chkMode == "up"){
    			strFound = TRange.findText(searchText, -100000000,4);
    			
    		} else {
    		    strFound = TRange.findText(searchText);
    		}
			
			try {
				if(strFound){
					TRange.select();
					setTRangeSelectOn();
					
					if(chkMode == "up"){
					    if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
            			    || TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
            			    || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
            			    || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
            			   )
            			{
                		    var arInfs = document.getElementsByName("arInf");
                            var arInfCnt = arInfs.length;
                            
                		    var arInfsId = "";
                		    
                		    if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
	            		        || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
	            		       )
	            		    {
	            		    	  arInfsId = TRange.parentElement().parentNode.parentNode.id;
	            		    }
	            		    
	            		    if(    TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
	            		        || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
	            		       )
	            		    {
	            		    	  arInfsId = TRange.parentElement().parentNode.parentNode.parentNode.id;
	            		    }
                		    
                		    if(arInfCnt > 1){
                                for(var i = 0; i < arInfCnt-1; i++){
                                    var arInf = arInfs[i].value;
                                    
                                    if(arInfsId != "ar" + arInf){
                                        if(el("ar"+arInfs[i].value) != null && el("ar"+arInfs[i].value).style.display == ""){
                                            arView("ar" + arInf);
                                        }
                                    }
                                }
                            }
                            
                		} else {
                            var arInfs = document.getElementsByName("arInf");
                            var arInfCnt = arInfs.length;
                            
                            if(arInfCnt > 1){
                                if(el("ar"+arInfs[0].value) != null && el("ar"+arInfs[0].value).style.display == ""){
                                    for(var i = 0; i < arInfCnt-1; i++){
                                        var arInf = arInfs[i].value;
                                        
                                        arView("ar" + arInf);
                                    }
                                }
                            }
                            
                            chkTmp1 = true;
                		}
                		
					} else {
					    if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
            			    || TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
            			    || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
            			    || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
            			   )
            			{
                		    
                		} else {
                            var arInfs = document.getElementsByName("arInf");
                            var arInfCnt = arInfs.length;
                            
                            if(arInfCnt > 1){
                                if(el("ar"+arInfs[0].value) != null && el("ar"+arInfs[0].value).style.display == ""){
                                    for(var i = 0; i < arInfCnt-1; i++){
                                        var arInf = arInfs[i].value;
                                        
                                        arView("ar" + arInf);
                                    }
                                }
                            }
                            
                            chkTmp1 = true;
                		}
					}
					
					if(hasInput) el(inputId).focus();
				}
				
			} catch(e) {
				alert ("문자열 '" + searchText + "' 을 찾지 못했습니다!");
    			isFirstSearch = true;
    			return;
			}
			
			if(strFound){
				TRange.select();
				setTRangeSelectOn();
				
				if(hasInput) el(inputId).focus();
			}
		}
		
		if(!strFound){
			alert ("문자열 '" + searchText + "' 을 찾지 못했습니다!");
			isFirstSearch = true;
			return;
		}
		
	} else {
		// NETSCAPE CODE - INCOMPLETION
		window.find(searchText)
	}
}

function addInputTextFocus(){
	if(!el('bdyFocus')){
		var inputEl = document.createElement("INPUT");
		inputEl.type = "text";
		inputEl.name = 'bdyFocus';
		inputEl.id = 'bdyFocus';
		inputEl.style.width="0px";
		el('naviId').appendChild(inputEl);
		setDisplay('bdyFocus','none');
	}
}


/*본문에서 질의어를 찾고 이동 기존 화면내 검색과 같고, alert, focus 이동을 주석처리 했음 */
var TRange = null;
var n = 0;
var preSearchText;
var preSearchType = "";
var isFirstSearch = true;
var clickElement = null;
var focusGubun = false;

var preTargetDiv;
var TRangeViewChk = false;

function bodySearch2(targetDiv, searchText, clear, inputId, iCnt, TRangeViewChk){
	if(clear != null && clear && preSearchType == "W"){
		bodySearchReset(targetDiv);
	}
	
	preSearchType = "T";
	
	if(searchText.trim() == ""){
		//alert("검색어를 입력해 주세요.");
		return;
	}
	
	var hasInput = false;
	
	if(inputId != null && typeof(el(inputId)) != "undefined"){
		hasInput = true;;
	}
	
	var strFound = "";
	
	if($.browser.isIE) {
		// EXPLORER-SPECIFIC CODE
		if(TRange != null) {
			if(!isFirstSearch){
				setTRangeSelectOff();
			}
			
			isFirstSearch = false;
			
			if(clickElement != null){
				try{
					TRange.moveToElementText(clickElement);
					
				} catch(e) {
					//잘못된 범위를 클릭했을 때
				}
				
				clickElement = null;
			}
			
		    TRange.collapse(false);
		    strFound = TRange.findText(searchText);
		    
			try {
				if(strFound){
					TRange.select();
					setTRangeSelectOn();
					return;
				}
				
			} catch(e) {
				TRange = null;
				bodySearch2(targetDiv, searchText, false, inputId, iCnt);
			}
		}
		
		if(TRange == null || !strFound) {
			TRange = document.body.createTextRange();
			TRange.moveToElementText(el(targetDiv));
			
			var iTCnt = 0;
			var bTChk = true;
			
			// 부칙텝일경우 검색어 맨밑에꺼 찾기 2010.11.04 홍석균
			if(    el("tab5") != null 
			    && el("tab5").className == "v8tab1on"
			    && document.getElementsByName("tab5x") != null
			    && searchText != ""
			    && searchText != "*?"
			    && searchText != "*.?"
			   )
			{
    			strFound = TRange.findText(searchText, -100000000,4);
    			
    			try {
					// 부칙텝에서 검색어로 최초검색시
					// 해당 검색어가 짧은 부칙에 있을경우(부칙 전체보기 버튼이 없는경우)
					// 열어놓앗던 부칙들을 닫지않던부분 수정 2013.03.14 홍석균
        			if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
        			    || TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
        			    || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
        			    || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
        			    || (   TRange.parentElement().parentNode.parentNode.parentNode.parentNode.parentNode.id == "arDivArea"
        			        && TRange.parentElement().parentNode.parentNode.parentNode.firstChild.firstChild != null
        			        && TRange.parentElement().parentNode.parentNode.parentNode.firstChild.firstChild.src.indexOf("btn_dot.gif") > -1)
        			    || (   TRange.parentElement().parentNode.parentNode.parentNode.parentNode.id == "arDivArea"
        			        && TRange.parentElement().parentNode.parentNode.parentNode.firstChild.firstChild.firstChild != null
        			        && TRange.parentElement().parentNode.parentNode.parentNode.firstChild.firstChild.firstChild.src.indexOf("btn_dot.gif") > -1)
        			   )
        			{
        			    TRange.select();
        			    
        			    setTRangeSelectOn();
					    TRange.execCommand("Unselect");
        			    
        			    var arInfsId = "";
                		
            		    if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
            		        || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
            		       )
            		    {
            		    	  arInfsId = TRange.parentElement().parentNode.parentNode.id;
            		    }
            		    
            		    if(    TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
            		        || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
            		       )
            		    {
            		    	  arInfsId = TRange.parentElement().parentNode.parentNode.parentNode.id;
            		    }
        			     
                        var arDiv = els("arInf");
                        var chkVal = "";
                        
                        if(arDiv.length > 0){
                            for(var i = 0; i < arDiv.length-1; i++){
                                if(arInfsId != "ar" + arDiv[i].value){
                                    
                                    if(el("ar"+arDiv[i].value) != null && el("ar"+arDiv[i].value).style.display == ""){
                                        arView("ar" + arDiv[i].value);
                                    }
                                }
                            }
                            
                            TRange.select();
        					setTRangeSelectOn();
        					TRange.execCommand("Unselect");
                        }
                        
        			} else if(    TRange.parentElement().parentNode.parentNode.parentNode.tagName == "LI"
                			   || TRange.parentElement().parentNode.parentNode.parentNode.tagName == "UL"
                			   )
                    {
                		TRange.select();
                		
                		setTRangeSelectOn();
					    TRange.execCommand("Unselect");
					    
                		bodySearch(targetDiv, searchText, false, inputId, "up", "ar");
                	}
    				
    			} catch(e) {
    				setShowArUp2("");
    				
    				if(chkTmp1){
    				    TRange = null;
    				    chkTmp1 = true;
    				}
    			}
    			
    			bTChk = false;
    			
			} else {
			    strFound = TRange.findText(searchText);
			}
			
			try {
				if(strFound && bTChk){
					TRange.select();
					
					setTRangeSelectOn();
					TRange.execCommand("Unselect");
					
					if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
        			    || TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
        			    || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
        			    || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
        			   )
        			{
        			    var arInfsId = "";
                		
            		    if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
            		        || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
            		       )
            		    {
            		    	  arInfsId = TRange.parentElement().parentNode.parentNode.id;
            		    }
            		    
            		    if(    TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
            		        || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
            		       )
            		    {
            		    	  arInfsId = TRange.parentElement().parentNode.parentNode.parentNode.id;
            		    }
        			    
                        var arDiv = els("arInf");
                        var chkVal = "";
                        
                        if(arDiv.length > 0){
                            for(var i = 0; i < arDiv.length-1; i++){
                                if(arDivsId != "ar" + arDiv[i].value){
                                    arView("ar" + arDiv[i].value);
                                }
                            }
                            
                            TRange.select();
                            
        					setTRangeSelectOn();
        					TRange.execCommand("Unselect");
                        }
                        
        			} else {
        			    var arDiv = els("arInf");
                        
                        if(arDiv.length > 0){
                            for(var i = 0; i < arDiv.length-1; i++){
                                arView("ar" + arDiv[i].value);
                            }
                        }
        			}
				}
				
			} catch(e) {
				TRange = null;
			}
		}
		
		if(!strFound){
			//alert ("문자열 '" + searchText + "' 을 찾지 못했습니다!");
			isFirstSearch = true;
			return;
		}
		
	} else {
		// NETSCAPE CODE - INCOMPLETION
		//window.find(searchText);
		/* 무한반복을 타는 문제가 있어서 주석처리 2010 / 03 / 15
		 * if(window.find(searchText))
			while(window.find(searchText, false, true)) n++;
		else n++;
		*/
	}
}

/**
 * <pre>
 * 	본문 검색 처리
 * </pre>
 * @author brKim
 * @since 2017. 6. 14.
 * @param targetDiv
 * @param searchKeyword
 * @param inputId
 * @param chkMode
 * @param mode
 * @param chkPass
 */
function bodySearchAll(targetDiv, searchKeyword, inputId, chkMode, mode, chkPass) {
	
	TRangeViewChk = false;
	
	searchKeyword = searchKeyword.replaceAll("\"","");
	
	if (el("preTargetDiv") != null) {
		preTargetDiv = el("preTargetDiv").value;
		
	} else {
		preTargetDiv = "";
	}
	
	if (el("preSearchText") != null) {
		preSearchText = el("preSearchText").value;
		
	} else {
		preSearchText = "";
	}
	
	if (mode != "1" && targetDiv == "bodyContent") {
		
	    if (isNumber(searchKeyword.trim())) {
    	    
    	    var TRangeTmp = null;
    	    TRangeTmp = document.body.createTextRange();
    	    
    	    if(    TRangeTmp.findText("제"+ searchKeyword.trim() +"조")
    	        && (    !TRangeTmp.findText("제"+ searchKeyword.trim() +"조 및")
    	             && !TRangeTmp.findText("제"+ searchKeyword.trim() +"조 각")
    	             && !TRangeTmp.findText("제"+ searchKeyword.trim() +"조 또는")
    	            )
    	       )
    	    {
    	        location.href = "#J"+ searchKeyword.trim() +":0";
    	        return;
    	    }
    	}
	}
	
	if(preTargetDiv != "" && preTargetDiv != targetDiv){
	    preSearchText = "";
	    TRangeViewChk = true;
	}
	
	if(chkPass == "pass"){
	    preSearchText = "";
	    TRangeViewChk = true;
	}
	
	if (preSearchText != searchKeyword) {
		
		if ($.browser.isIE) {

			if(targetDiv == "bodyContent" || targetDiv == "viewwrapCenter"){
				if(document.getElementById("conScroll") != null){
					targetDiv = "conScroll";
				}
			}
			bodySearchReset(targetDiv);
			
			TRange = document.body.createTextRange();
			TRange.moveToElementText(el(targetDiv));
			
			var i = 0;
			var iCnt = 0;
			
			if (searchKeyword != "") {
				
				while (TRange.findText(searchKeyword)) {
					setTRangeOn(TRange);
					TRange.collapse(false);
					
					iCnt += 1;
				}
			}
			
			var inputEl = document.createElement("INPUT");
			inputEl.type = "hidden";
			inputEl.name = 'preSearchText';
			inputEl.id = 'preSearchText';
			inputEl.value = searchKeyword;
			
			el(targetDiv).appendChild(inputEl);
			
			el(targetDiv).onclick = function(){
				if(    event.srcElement.parentElement.className == "pgroup"
					|| event.srcElement.parentElement.parentElement.className == "pgroup")
				{
					clickElement = event.srcElement;
				}
			}
			
			el('preSearchText').value = searchKeyword;
			
			preSearchText = searchKeyword;
			preSearchType = "W";
			
			//////////////////////////////////////////////////////////////////////////////////
			
			var inputEl = document.createElement("INPUT");
			inputEl.type = "hidden";
			inputEl.name = 'preTargetDiv';
			inputEl.id = 'preTargetDiv';
			inputEl.value = targetDiv;
			
			el(targetDiv).appendChild(inputEl);
			
			el('preTargetDiv').value = targetDiv;
			
			//////////////////////////////////////////////////////////////////////////////////
			
			TRange.moveToElementText(el(targetDiv));
			isFirstSearch = true;
			clickElement = null;
			
		} else {
			if(targetDiv == "bodyContent" || targetDiv == "viewwrapCenter" || targetDiv == "contentBody" || targetDiv == "sideCenter"){
				if(document.getElementById("conScroll") != null){
					targetDiv = "conScroll";
				}
			}
			
			$("#"+targetDiv).highlight(searchKeyword);
			
			$("hi").css('color','#ff0000');
			
		}
	}
	
	if (mode != "1") { // 화면내 검색 처리 되도록 mode : 1 검색어 검색 , 그외 : 화면내검색
		
		if (preSearchText != searchKeyword) {
			
			if ($.browser.isIE) {
				
				bodySearchReset(targetDiv);
				
				TRange = document.body.createTextRange();
				TRange.moveToElementText(el(targetDiv));
				
				var inputEl = document.createElement("INPUT");
				inputEl.type = "hidden";
				inputEl.name = 'preSearchText';
				inputEl.id = 'preSearchText';
				inputEl.value = searchKeyword;
				
				el(targetDiv).appendChild(inputEl);
				
				el(targetDiv).onclick = function(){
					if(    event.srcElement.parentElement.className == "pgroup"
					    || event.srcElement.parentElement.parentElement.className == "pgroup")
					{
						clickElement = event.srcElement;
					}
				}
				
				el('preSearchText').value = searchKeyword;
	
				preSearchText = searchKeyword;
				preSearchType = "W";
				
				//////////////////////////////////////////////////////////////////////////////////
				
				var inputEl = document.createElement("INPUT");
				inputEl.type = "hidden";
				inputEl.name = 'preTargetDiv';
				inputEl.id = 'preTargetDiv';
				inputEl.value = targetDiv;
				
				el(targetDiv).appendChild(inputEl);
				
				el('preTargetDiv').value = targetDiv;
				
				//////////////////////////////////////////////////////////////////////////////////
				
				TRange.moveToElementText(el(targetDiv));
				isFirstSearch = true;
				clickElement = null;
				
			} else {
				//TODO FF, Opera 체크
			}
		}
	}
	
	if (mode == "1") {
		
	} else {
		bodySearch(targetDiv, searchKeyword, false, inputId, chkMode);
	}
}

//화면내검색시 "|" 문자열을 활용해 검색어를 최대 5개까지 찾을수있도록 처리
function bodyAddSearch(targetDiv, searchKeyword){
	var AddValue = searchKeyword.indexOf("|");
	if(preSearchText != searchKeyword){
		if($.browser.isIE) {
			var i = 0;
			var iCnt = 0;
			
			if(AddValue > -1){
				var searchKeywordList = searchKeyword.split('|');	
				for(var a=0;a<searchKeywordList.length;a++){
					
					if(a==0){
						bodySearchReset(targetDiv);							
					}
					
					TRange = document.body.createTextRange();
					TRange.moveToElementText(el(targetDiv));
					
					if(searchKeyword != ""){
						while(TRange.findText(searchKeywordList[a])){
							setTRangeOnAddColor(TRange,a);
							TRange.collapse(false);
							iCnt += 1;
						}
					}
				}
			}
			el('preSearchText').value = searchKeyword;
			preSearchText = searchKeyword;
		} 
	}
}

function bodySearchReset(targetDiv) {	
	var arInfs = document.getElementsByName("arInf");
    var arInfCnt = arInfs.length;
	
	if(TRange != null 
			&& preSearchText != null
			&& preSearchText != ""){
		
		// 화면내검색은 닫혀있는(display none) 부칙의 내용검색이 안됨
		// 때문에 초기화할때도 전부열어놓고 처리 <2013.2.21 : 홍석균>
		if(arInfCnt > 0){
            for(var i = 0; i < arInfCnt-1; i++){
                var arInf = arInfs[i].value;
                
                if(el("ar"+arInf) != null && el("ar"+arInf).style.display != ""){
                    arView("ar" + arInf);
                }
            }
        }
		
		TRange = document.body.createTextRange();
		TRange.moveToElementText(document.getElementById(targetDiv));
		
		// "|"로 찾은 문자열 본문 리셋처리
		var preSearchaddText = preSearchText.split('|');
		if(preSearchaddText!=""){
			for(var i=0; i<preSearchaddText.length; i++){
				TRange = document.body.createTextRange();
				TRange.moveToElementText(document.getElementById(targetDiv));					
				for(j = 0; TRange.findText(preSearchaddText[i]); j++) {
					setTRangeOff();
					TRange.collapse(false);
				}
			}
		}else{
			for(i = 0; TRange.findText(preSearchText); i++) {
				setTRangeOff();
				TRange.collapse(false);
			}
		}
	}
}

function bodySearchReset2(targetDiv) {	
	TRange = document.body.createTextRange();
	TRange.moveToElementText(document.getElementById(targetDiv));
	
	var bChkTmp = true;
	
	for(i = 0; bChkTmp; i++) {
		if(i > 0){
		    setTRangeSelectOff();
		}
		
		if(TRange.findText(preSearchText)){
		    bChkTmp = true;
		    
		    TRange.collapse(false);
		    
		    TRange.select();
			setTRangeSelectOn();
		    
		} else {
		    bChkTmp = false;
		}
	}
}

/* 화면내 검색 글자 처리 11.08 - commonJs.jsp 로 옮겨서 주석처리
function setTRangeSelectOn(){
	TRange.execCommand("RemoveFormat");
	TRange.execCommand("Bold",false, "");
	TRange.execCommand("BackColor", false, "#FFFF00");
}

function setTRangeSelectOff(){
	TRange.execCommand("RemoveFormat");
	TRange.execCommand("Bold",false, "");
	TRange.execCommand("ForeColor", false, "#ff0000");
}

function setTRangeSelectOffUp(){
	TRangeCopy.execCommand("RemoveFormat");
	TRangeCopy.execCommand("Bold",false, "");
	TRangeCopy.execCommand("ForeColor", false, "#ff0000");
}

function setTRangeOn(){
	TRange.execCommand("Bold",false, "");
	TRange.execCommand("ForeColor",false, "#ff0000");
}

*/
function setTRangeOff(){
	TRange.execCommand("RemoveFormat");
	TRange.collapse(false);
}

// input-text 엔터 처리   eventObj, true시 실행 함수
function enterBdySearch(event,obj){
	if(event.keyCode == 13){
		bdySearch(obj);
		
	} else {
	    return ;
	}
}

// input-text 엔터 처리   eventObj, true시 실행 함수
function enterSub(event,trueProc){
	if(event.keyCode == 13){
		trueProc();
	}
	else{
	    return ;
	}
}


// input-text 엔터 처리
function searchEnter(event, proc){
	if(event.keyCode == 13){
		proc();
	}
	else{
	    return ;
	}
}

// input-text 엔터 처리   eventObj, , true시 실행 함수
function entsub(event,trueProc,keyWordSave){
	if(event.keyCode == 13)
	{
		fSearchKeySaveF();
		trueProc();
	}
	else
	{
	    return ;
	}
}

/* 내가찾은법력이력 조회  Start*/
var oldLawHistory="";
function lawGetHistory(){
	//if(rightLayout.mode == "1") return;
	var paramVal = {lawHistory:""};
	paramVal.lawHistory = getDetailSelectCookie("lawHistory");
	logger.def(oldLawHistory,1);
	logger.def(paramVal.lawHistory,1);
	if(oldLawHistory == paramVal.lawHistory && paramVal.lawHistory != "") return;
	updateDiv("historyList","lawHistoryR.do",paramVal);	
	oldLawHistory = paramVal.lawHistory;
}

function showLs(seq){	//법령 
	var popUrl = webRoot + "/lsInfoP.do?lsiSeq=" + seq;
	openPop(popUrl,1040,630);
}

function showOrdin(seq){	//자치법규
	var popUrl = "ordinInfoP.do?chrClsCd=010202&ordinSeq=" + seq;
	openPop(popUrl,950,630);
}

function showLsEmp(lsEmpSeq, mode){
	var popUrl = "";
	if(mode == "0"){	//판례 
		popUrl = "precInfoP.do?mode=" + mode + "&precSeq="  + lsEmpSeq; 
	}else if(mode == "1"){	//헌재
		popUrl = "detcInfoP.do?mode=" + mode + "&detcSeq="  + lsEmpSeq; 
	}else if(mode == "2"){	//해석례
		popUrl = "expcInfoP.do?mode=" + mode + "&expcSeq="  + lsEmpSeq; 
	}else if(mode == "3"){	//행정심판례 
		popUrl = "deccInfoP.do?mode=" + mode + "&deccSeq="  + lsEmpSeq; 
	}else if(mode == "6"){	//공정거래위원회
		popUrl = "ftcInfoP.do?mode=" + mode + "&ftcSeq="  + lsEmpSeq; 
	}else if(mode == "7"){	//국민권익위원회
		popUrl = "acrInfoP.do?mode=" + mode + "&acrSeq="  + lsEmpSeq; 
	}else if(mode == "8"){	//개인정보보호위원회
		popUrl = "ppcInfoP.do?mode=" + mode + "&ppcSeq="  + lsEmpSeq;
	}else if(mode == "9"){	//중앙부처 1차 해석
		var seq = lsEmpSeq.split(".")[0];
		var ofiClsCd = lsEmpSeq.split(".")[1];
		popUrl = "cgmExpcInfoP.do?mode=" + mode + "&cgmExpcDatSeq="  + seq + "&ofiClsCd=" + ofiClsCd;
	}else if(mode == "10"){	// 특별행정심판재결례
		var seq = lsEmpSeq.split(".")[0];
		var trbClsCd = lsEmpSeq.split(".")[1];
		popUrl = "specialDeccInfoP.do?mode=" + mode + "&specialDeccSeq="  + seq + "&trbClsCd=" + trbClsCd;
	} else if(mode == "22") {
		popUrl = "baiPvcsInfoP.do?mode=" + mode + "&baiPvcsDatSeq="  + lsEmpSeq;
	} else{
		var cmtModeNm = "";
		var seqNm =  "&decsnDocDatSeq=";
		 switch(mode){
		 case '460104' :
			 cmtModeNm =  "kcc";
			 break;
		 case '460105' :
			 cmtModeNm =  "fsc";
			 break;
		 case '460106' :
			 cmtModeNm =  "oclt";
			 break;
		 case '460107' :
			 cmtModeNm =  "eiac";
			 break;
		 case '460108' :
			 cmtModeNm =  "iaciac";
			 break;
		 case '460109' :
			 cmtModeNm =  "ecc";
			 break;
		 case '460110' :
			 cmtModeNm =  "nlrc";
			 seqNm =  "&nlrcSeq=";
			 break;
		 case '460111' :
			 cmtModeNm =  "nhrck";
			 seqNm =  "&nhrckSeq=";
			 break;
		 }
	
		popUrl = cmtModeNm + "InfoP.do?mode=" + mode + seqNm + lsEmpSeq; 
	}
	openPop(popUrl);
}
	
function showTrty(trtySeq,clsCd,chrClsCd){
	var popUrl = "";
	var chrClsType = '010202';//한글 
	if(chrClsCd != ""){
		chrClsType = chrClsCd;
	}
	if(clsCd == 'B'){	//양자조약
	openPop("trtyBInfoP.do?trtySeq="+trtySeq+"&chrClsCd="+chrClsType, 1000, 620);
	}else{				//다자조약
		openPop("trtyMInfoP.do?trtySeq="+trtySeq+"&chrClsCd="+chrClsType, 1000, 620);
	}
}	

function showAdmRul(admRulSeq, mode){		//행정규칙
	var popUrl = "";
	if(mode == 'Y'){
		popUrl = "admRulLsInfoP.do?chrClsCd=010202&admRulSeq=" + admRulSeq;
	}else{
		popUrl = "admRulInfoP.do?chrClsCd=010201&admRulSeq=" + admRulSeq;
	}
	openPop(popUrl);
}

function showByl(bylSeq, seq, mode){	//별표 상세조회 이동 
	var popUrl = "";

	if(mode == "0"){
		popUrl="lsBylInfoPLinkR.do?bylSeq=" + bylSeq 
					+ "&lsiSeq=" + seq;
	}else if(mode == "1"){
		var tmp = seq.split("^");
		popUrl="admRulBylInfoPLinkR.do?bylSeq=" + bylSeq 
					+ "&admRulSeq=" + tmp[0]
					+ "&admFlag=" + tmp[1]; 	
	}else if(mode == "2"){
		popUrl="ordinBylInfoPLinkR.do?bylSeq=" + bylSeq 
					+ "&ordinSeq=" + seq;	
	}
	openPop(popUrl);
}

function showSchlPubRul(schlPubRulSeq){
	var popUrl = "";
	popUrl = "schlPubRulInfoP.do?schlPubRulSeq=" + schlPubRulSeq +"&vSct=*";
	openPop(popUrl);
}


function getBylDownBtn(seq){
  var flSeq = "";
  logger.def(seq);
  if(seq == "not" || flSeq == 'undefined'){
  	flSeq = document.getElementById("hanFlSeq").value;
  }else{
  	flSeq = seq;
  }
  
  if(flSeq == 0 || flSeq == null || flSeq == 'undefined'){
    alert("파일이 없습니다"); 
    return false;
   }  
  location.href = "flDownload.do?flSeq=" + flSeq;
 }
 
function openLawHistory(obj,no){
	setDisplay("lawHisDiv","block");	
	var relEle = Ext.get(obj);
	var historyView = Ext.get("lawHisDiv");
	if(no == '2'){
		historyView.setX(relEle.getX() - 295);	
		historyView.setY(relEle.getY());
	}else{
		historyView.setX(relEle.getX());	
		historyView.setY(relEle.getY() + 65);
	}	
}
function lawHistoryClose(){
	setDisplay("lawHisDiv","none");	
}  



/**
 * <pre>
 * 	조회 이력 검색  
 * </pre>
 * @author brKim
 * @since 2018. 5. 23.
 * @param obj
 * @param no
 * @param val
 */
function fLsSeHstShow(obj, no, val) {
	
	SeHstPopLayer.hiddenLsSeHstLayer();

	var paramVal = {lawHistory:"", usrSeq:0};

	paramVal.lawHistory = getDetailSelectCookie("lawHistory");

	if ((oldLawHistory == paramVal.lawHistory) && paramVal.lawHistory) {

		return;
	}

	if (val != 0) {
		 paramVal.usrSeq = val;
    }

	fSlimUpdate("lsSeHstLayer", "lawHistoryR.do", paramVal);

	SeHstPopLayer.showLsSeHstLayer(obj, no);
}

/** 조회 이력 팝업 레이어 */
var SeHstPopLayer = (function() {
	
	var lsSeHstLayer = null;
	
	return {

		showLsSeHstLayer : function(obj, no) {
			
			if (lsSeHstLayer) {
				lsSeHstLayer.dialog("close");
			} else {
				
				lsSeHstLayer = $("#lsSeHstLayer").dialog({
					autoOpen : false
					,width : 401
					,height : 310
					,modal : false
					,resizable : false
					,position : {
						// 내 객체 위치
						my : 'center top',
						// 참조할 객체 위치
						at : 'center bottom',
						// 참조할 객체 지정
						of : $(obj)
					}
				}).css("top","5px");
				
				// 타이틀 바 숨김
				lsSeHstLayer.parent().find(".ui-dialog-titlebar").hide();
			}

	 		lsSeHstLayer.dialog("open");
		}
	   ,hiddenLsSeHstLayer : function() {
		   if (lsSeHstLayer) {
				lsSeHstLayer.dialog("close");
				lsSeHstLayer.css({width:'300px', height:'310px'}); // 로드마스크 중간으로 맞추기 위함
			}	
		}
	};
	
}());



var tmpShowHideLsSeHst = true;
var tmpChkLsSeHst = true;

/**
 * <pre>
 * 	조회 이력 조회 (마우스 오버)
 * </pre>
 * @author brKim
 * @since 2017. 6. 13.
 * @param obj
 * @param no
 * @param val
 */
function lsSeHstView(obj, no, val) {
	
	if (!obj) {
		obj = el("lsSeHstView");
	}
	
    tmpShowHideLsSeHst = false;
    if(tmpChkLsSeHst){

        fLsSeHstShow(obj, no, val);
        
        tmpChkLsSeHst = false;
    }
}

/**
 * <pre>
 * 	조회 이력 숨기기 (마우스 아웃)
 * </pre>
 * @author brKim
 * @since 2017. 6. 13.
 */
function lawSeHstClose() {
	
	tmpShowHideLsSeHst = true;
	
	var timer;
	
	var f = function() {
		
		if (tmpShowHideLsSeHst) {
	        clearInterval(timer);
	        SeHstPopLayer.hiddenLsSeHstLayer();
	        tmpChkLsSeHst = true;
	    }
	}
	
	timer = setInterval(f, 200);
}

/**
 * <pre>
 * 	조회 이력 숨기기 (키보드 포커스)
 * </pre>
 * @author kimsh900
 * @since 2024. 1. 11.
 */
function lawSeHstResFocus(obj) {
	if(event.keyCode == 13){
		obj.click();
	}else if(event.keyCode == 9){
		lawSeHstClose();
		parent.$("#openPopYn").focus();
	}
	return;
}

/* 내가 찾은 법령 이력 조회 END */


/**
 * <pre>
 *  body 리사이즈
 * </pre>
 * @author brKim
 * @since 2017. 5. 31.
 * @param bodyId
 * @param higLen
 */
function bodyHeightResize(bodyId, popYn) {
	
	bodyInfo.sideElWidth = $("#"+bodyId).width();
	bodyInfo.sideElHeight = $("#"+bodyId).height();
	
	if ($.browser.isIE) {
		bodyInfo.sideElHeight += 15;
	} else {
		bodyInfo.sideElHeight += 40;
	}
	
	layHeight(bodyInfo.sideElHeight, popYn);
}

/* font size */
var nowZoom = 100;
var maxZoom = 125;
var minZoom = 85;
function zoomInOut(how,Id) {
	if(how == 'in' && nowZoom < maxZoom) {
		nowZoom += 5;
	} else if(how == 'out' && nowZoom > minZoom) {
		nowZoom -= 5;
	} else if(how == 'init') {
		nowZoom = 100;
	}else {
		return;
	}
	el(Id).style.zoom = nowZoom + "%";
}

function zoomView(){
	setDisplay('fontSize','block');
}

function zoomExit(id){
	//if(el(id)) zoomInOut('init',id);
	setDisplay('fontSize','none');
}

/** 상세설정 윈도우 */
var DetailSearchLayer = function(){
	var layer;
	return {
		show : function(id){
			var detailSearchLayer = Ext.get(id);
			detailSearchLayer.dom.style.display = "block";
			if(!layer){
				layer = new Ext.Window({
					autoScroll:true
					, header : false
					, hideBorders : true
					, contentEl : detailSearchLayer
					, baseCls : 'x-window'
					, cls : 'owindow'
					, layout :'fit'
					, title: ''
					, resizable : false
					, width : Ext.select(".to").item(0).getWidth()
					, height : Ext.select(".to").item(0).getHeight() 
							+ Ext.select(".ct").item(0).getHeight() 
							+ Ext.select(".bo").item(0).getHeight() 
					, border : false
					, closeAction : 'close'
					, shadow : false
					, x : detailSearchLayer.getX() - 20
					, y : detailSearchLayer.getY() + 35 
				});
				 
				
			}
			layer.show();
		}
		, hide : function(){
			if(layer){
				layer.hide();			
			}
		}
		, back : function(){
			//layer.focus();
			if(layer){
				layer.toBack();
			}
		}
		,reSize : function(){
			var topLayer = Ext.get(id);
			var height = Ext.select(".to").item(0).getHeight() 
							+ Ext.select(".ct").item(0).getHeight() 
							+ Ext.select(".bo").item(0).getHeight(); 
			if(layer){
				layer.setHeight(height); 
			}
		}
	}
}();


function detailCtDivAddEvent(){
	DetailSearchLayer.back();
}


var LayerToLayer = function(){
	var layer;
	return {
		show : function(id, obj, xValue, yValue){ 
			var topLayer = Ext.get(id);
			//el(id).style.top = "0px";
			//el(id).style.left = "0px";
			var relEle = Ext.get(obj);
			var x, y;
			if(relEle != null){
				x = relEle.getX();
				y = relEle.getY() + 20;	
				if(x < 0) x = relEle.getX() 
				if(y < 0) y = relEle.getY()  
			}
			
			 if(!layer){
				layer = new Ext.Window({
					autoScroll:false
					, header : false
					, hideBorders : true
					, contentEl : topLayer
					, baseCls : 'c-window'
					, cls : 'cwindow'
					, layout :'fit'
					, title: ''
					, resizable : false
					, width : topLayer.getWidth()
					, height : topLayer.getHeight()
					, border : false
					, closeAction : 'close'
					, 'close':function(){
							//displayCalendar(el(calendarObjId),'yyyy-mm-dd',obj);
					}
					, shadow : false
					, x : x - xValue
					, y : y + yValue
				});
		 	}else{
		 		layer.x = x - xValue;
		 		layer.y = y + yValue;
		 	}
			layer.show();
		}
		, close : function(){
			if(layer){
				layer.hide();		
			}
		}
		, front :  function(){
			if(layer){
				layer.toFront();		
			}	
		}
		, focus : function(){
			layer.focus();
		}
		, hide : function(){
			if(layer){
				closeCalendar();			
			}
		}
		,reSize : function(size){
			var topLayer = Ext.get("calendarDiv");
			var height = topLayer.getHeight() + size;
			var setHeight = 0;
			if(layer){
				if(height < 192 && size > 0){
					height = (192 - height) + height;
				}
				layer.setHeight(height); 
			}
		}
	}
}();

/*즐겨찾기추가*/
function lawBookmark(title, url){
    //if(document.all){ // 익스
    if(window.external && ('AddFavorite' in window.external)){ //익스
        window.external.AddFavorite(url, title);
    }else if(window.sidebar){ // 파폭
        window.sidebar.addPanel(title, url, "");
    }else if(window.opera && window.print){ // 오페라
        var obj = document.createElement('a');
        obj.setAttribute('href',url);
        obj.setAttribute('title',title);
        obj.setAttribute('rel','sidebar');
        obj.click();
    }else if(window.chrome) {
        alert("\"Ctrl+D\"를 눌러 즐겨찾기를 추가해주세요.");
    }
}

/*시작페이지 설정*/
function StatMRoad(obj) { 
	obj.style.behavior='url(#default#homepage)'; 
	//obj.setHomePage('http://'+ location.host); 
	obj.setHomePage('http://'+ location.host + '/LSW/main.do'); 
}

var mask;
function LoadMaskShow(divLayId){
	//var mask = new Ext.LoadMask(Ext.get(divLayId), { msg: 'Loading data...' });	
	mask = new Ext.LoadMask(Ext.get(divLayId), { msg: 'Loading data...' });	
	mask.show();	
}

/* 리스트 onmouseover시 배경 */
function onBgChgOver(obj){  
    obj.style.background = "#f2f6f9";
}
/* 리스트 onmouseout시 배경 */
function onBgChgOut(obj){
    obj.style.background = "#ffffff";
}

/* 공배제거 */
function Space_All(str){
    var index,len;
    while(true){
        index = str.indexOf(" ");
        //공백이 없으면 종료 합니다.
        if(index == -1)break;
        //문자열 길이를 구합니다.
        len = str.length;
        //공백을 잘라 냅니다.
        str = str.substring(0,index) + str.substring((index+1),len);
    }
    return str;
} 

function Nethru_getCookieVal(offset)
{
	var endstr = document.cookie.indexOf (";", offset);
	if(endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function Nethru_SetCookie(name, value){
   var argv = Nethru_SetCookie.arguments;
   var argc = Nethru_SetCookie.arguments.length;
   var expires = (2 < argc) ? argv[2] : null;
   var path = (3 < argc) ? argv[3] : null;
   var domain = (4 < argc) ? argv[4] : null;
   var secure = (5 < argc) ? argv[5] : false;
	//alert(value);
   //alert("DOMAIN = " + domain);
   document.cookie = name + "=" + escape (value) +
        ((expires == null) ? "" : ("; expires="+expires.toGMTString())) +
     ((path == null) ? "" : ("; path=" + path)) +
     ((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure == true) ? "; secure" : "");

	//alert(document.cookie);
}

function Nethru_GetCookie(name){
   var arg = name + "=";
   var alen = arg.length;
   var clen = document.cookie.length;
   var i = 0;
   while (i < clen)
      {
      var j = i + alen;
      if(document.cookie.substring(i, j) == arg)
         return Nethru_getCookieVal (j);
      i = document.cookie.indexOf(" ", i) + 1;
      if(i == 0)
         break;
      }
  return null;
}

function Nethru_makePersistentCookie(name,length,path,domain)
{
//	alert(name+" -- "+length+"--"+path+"--"+domain);
    var today = new Date();
    var expiredDate = new Date(2100,1,1);
    var cookie;
	var value;

    cookie = Nethru_GetCookie(name);
    if( cookie ) {
//		alert(cookie);
        return 1;
	}

	var values = new Array();
	for ( i=0; i < length ; i++ ) {
		values[i] = "" + Math.random();
	}

	value = today.getTime();

	// use first decimal
	for ( i=0; i < length ; i++ ) {
		value += values[i].charAt(2);
	}

    Nethru_SetCookie(name,value,expiredDate,path,domain);
}

function Nethru_getDomain() {
	var _host   = document.domain;
	var so      = _host.split('.');
	var dm    = so[so.length-2] + '.' + so[so.length-1];
	return (so[so.length-1].length == 2) ? so[so.length-3] + '.' + dm : dm;
}

/**
 * 해당문자열을 maxlen만큼 잘라서 보여주기
 * 예) 대통령령으로 -> 대통령..
**/
function etcToDot(str, maxlen){
    var sNewStr;
    var sOldStr = new String(str);
    
    if(sOldStr == "") return;
    
    if(sOldStr.length > maxlen) {
        sNewStr = sOldStr.substr(0, maxlen) + "..";
        
    } else {
        sNewStr = sOldStr;
    }
    
    return sNewStr;
}

function clBdySearch(val){
    el('bdySearch').value = val;
}

function clBdySearchDel(val){
    var dataId = "BdySrchHistory";
    if(val != ""){
    	var datList = getBdySearchDatList(dataId);
    	var tempData = "";
    	var uName = "";
    	var isFirst = true;
    	
    	if(datList.length > 0){
    		//검색어 제거
    		for(var i = 0; i < datList.length; i++){
    			if ( datList[i] == val ) continue;
    			
    			if(tempData == ""){
    					uName = "";
    			}else{
    					uName = "---";	
    			}
    			
    			if (navigator.appName.charAt(0) == 'N') {
    				tempData += uName + toUtf8(datList[i]);
    				
    			} else if (navigator.appName.charAt(0) == 'M') {
    				tempData += uName + datList[i];
    			}
    		}
    		isFirst = false;
    	}
    	
    	if( isFirst == true ) {
    		uName = "";
    	} else {
    		uName = tempData;
    	}
    	
    	if (navigator.appName.charAt(0) == 'N') {
    		setCookie(dataId, uName);
    	} else if (navigator.appName.charAt(0) == 'M') {
    		setCookie(dataId, uName);
    	}
    	
    	el('bdyKeyVal').innerHTML = printBdySchKeywordList();
    }
}

function setShowArUp(){
    var arInfs = document.getElementsByName("arInf");
    var arInfCnt = arInfs.length;
    
	for(var i=arInfCnt -1;i >= 0;i--){
		var arInf = arInfs[i].value;
		
		if(el("ar"+arInf) != null && el("ar"+arInf).style.display != "") {
			el("ar"+arInf).style.display = "";
			el("ar"+arInf+"btn").src = "/LSW/images/button/btn_cocl.gif";
			
			try {
    			TRange.select();
    			setTRangeSelectOn();
    			
    			if(hasInput) el(inputId).focus();
	        
	            return;
    			
		    } catch(e) {
		        //setShowArUp();
		        chkTmp1 = false;
		        
		        return;
		    }
		}
	}
}

var tmpVal1 = "";

function setShowArUp2(val){
    var arInfs = document.getElementsByName("arInf");
    var arInfCnt = arInfs.length;
    var i;
    
    if(val == null || val == ""){
        i = arInfCnt -1;
        
    } else {
        i = val;
    }
    
	if(i >= 0){
		var arInf = arInfs[i].value;
		var arInfPre = "";
		
		if(i < arInfCnt -2){
		    arInfPre = arInfs[i+1].value;
		}
		
		if(el("ar"+arInf) != null && el("ar"+arInf).style.display != "") {  // 닫혀있을때
			el("ar"+arInf).style.display = "";
			el("ar"+arInf+"btn").src = "/LSW/images/button/btn_cocl.gif";
			
			if(el("ar"+arInfPre) != null && el("ar"+arInfPre).style.display == ""){
			    el("ar"+arInfPre).style.display = "none";
			    el("ar"+arInfPre+"btn").src = "/LSW/images/button/btn_coop.gif";
			}
			
			try {
    			TRange.select();
    			setTRangeSelectOn();
    			TRange.execCommand("Unselect");
	            return;
		    } catch(e) {
		        i--;
		        setShowArUp2(i);
		        chkTmp1 = false;
		        return;
		    }
		    
		} else {  // 열려있을때
			if(el("ar"+arInfPre) != null && el("ar"+arInfPre).style.display == ""){
			    el("ar"+arInfPre).style.display = "none";
			    el("ar"+arInfPre+"btn").src = "/LSW/images/button/btn_coop.gif";
			}
			
			try {
    			TRange.select();
    			setTRangeSelectOn();
    			TRange.execCommand("Unselect");
	            return;
    			
		    } catch(e) {
		        i--;
		        setShowArUp2(i);
		        chkTmp1 = false;
		        
		        return;
		    }
		}
	}
}

function setShowArDown(){
    var arInfs = document.getElementsByName("arInf");
    var arInfCnt = arInfs.length;
    
    for(var i=0;i < arInfCnt-1;i++){
		var arInf = arInfs[i].value;
		
		if(el("ar"+arInf) != null && el("ar"+arInf).style.display != "") {
			el("ar"+arInf).style.display = "";
			el("ar"+arInf+"btn").src = "/LSW/images/button/btn_cocl.gif";
		}
	}
	
	try {
		TRange.select();
        setTRangeSelectOn();
        
        if(hasInput) el(inputId).focus();
        
        return;
        
    } catch(e) {
        chkTmp1 = true;
    }
}

function setShowArDown2(hasInput, inputId){
    var arInfs = document.getElementsByName("arInf");
    var arInfCnt = arInfs.length;
    
    if(arInfCnt > 0){
        for(var i = 0; i < arInfCnt-1; i++){
            var arInf = arInfs[i].value;
            
            if(el("ar"+arInf) != null && el("ar"+arInf).style.display != ""){
                arView("ar" + arInf);
            }
        }
        
        try{
            TRange.select();
            setTRangeSelectOn();
            
    		if(hasInput) el(inputId).focus();
    		
    		if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
  			    || TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
  			    || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
  			    || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
  			   )
  			{
    		    var arInfsId = "";
    		    
    		    if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
    		        || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
    		       )
    		    {
    		    	  arInfsId = TRange.parentElement().parentNode.parentNode.id;
    		    }
    		    
    		    if(    TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
    		        || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
    		       )
    		    {
    		    	  arInfsId = TRange.parentElement().parentNode.parentNode.parentNode.id;
    		    }
    		    
                var chkVal = "";
                
                if(arInfCnt > 0){
                    for(var i = 0; i < arInfCnt-1; i++){
                        var arInf = arInfs[i].value;
                        
                        if(arInfsId != "ar" + arInf){
                            arView("ar" + arInf);
                        }
                    }
                }
                
                chkTmp1 = false;
    		    
    		} else {
                if(arInfCnt > 0){
                    for(var i = 0; i < arInfCnt-1; i++){
                        var arInf = arInfs[i].value;
                        arView("ar" + arInf);
                    }
                }
                
                chkTmp1 = true;
    		}
    		
    		TRange.select();
            setTRangeSelectOn();
            
            if(hasInput) el(inputId).focus();
    	
        } catch(e) {
            chkTmp1 = true;
        }
	}
	
	chkImVal = false;
}

function setShowArUp3(hasInput, inputId){
    var arInfs = document.getElementsByName("arInf");
    var arInfCnt = arInfs.length;
    
    if(arInfCnt > 0){
        for(var i = 0; i < arInfCnt-1; i++){
            var arInf = arInfs[i].value;
            
            if(el("ar"+arInf) != null && el("ar"+arInf).style.display != ""){
                arView("ar" + arInf);
            }
        }
        
        try{
            TRange.select();
            setTRangeSelectOn();
            
    		if(hasInput) el(inputId).focus();
    		
    		if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
  			    || TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
  			    || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
  			    || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
  			   )
  			{
    		    var arInfsId = "";
    		    
    		    if(    TRange.parentElement().parentNode.parentNode.name == "arDivs"
    		        || TRange.parentElement().parentNode.parentNode.id.indexOf("ar") > -1
    		       )
    		    {
    		    	  arInfsId = TRange.parentElement().parentNode.parentNode.id;
    		    }
    		    
    		    if(    TRange.parentElement().parentNode.parentNode.parentNode.name == "arDivs"
    		        || TRange.parentElement().parentNode.parentNode.parentNode.id.indexOf("ar") > -1
    		       )
    		    {
    		    	  arInfsId = TRange.parentElement().parentNode.parentNode.parentNode.id;
    		    }
                var chkVal = "";
                
                if(arInfCnt > 0){
                    for(var i = 0; i < arInfCnt-1; i++){
                        var arInf = arInfs[i].value;
                        
                        if(arInfsId != "ar" + arInf){
                            arView("ar" + arInf);
                        }
                    }
                }
                
                TRange.select();
    			setTRangeSelectOn();
                
                chkTmp1 = false;
    		    
    		} else {
                if(arInfCnt > 0){
                    for(var i = 0; i < arInfCnt-1; i++){
                        var arInf = arInfs[i].value;
                        
                        arView("ar" + arInf);
                    }
                }
                
                chkTmp1 = true;
    		}
    		
    		TRange.select();
            setTRangeSelectOn();
            
    		if(hasInput) el(inputId).focus();
    	
        } catch(e) {
            chkTmp1 = true;
        }
	}
	
	chkImVal = false;
}

// 팝업창 중앙으로 위치
var popCentX = 0;
var popCentY = 0;

function center(){
    var x,y;
    
    if (self.innerHeight) { // IE 외 모든 브라우저
        x = (screen.Width - self.innerWidth) / 2;
        y = (screen.Height - self.innerHeight) / 2;
        
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict 모드
        x = (screen.Width - document.documentElement.clientWidth) / 2;
        y = (screen.Height- document.documentElement.clientHeight) / 2;
        
    } else if (document.body) { // 다른 IE 브라우저( IE < 6)
        x = (screen.Width - document.body.clientWidth) / 2;
        y = (screen.Height - document.body.clientHeight) / 2;
    }
    
    popCentX = x;
    popCentY = y;
}

function opencenter(winNM, width, height){
    var sw = screen.availWidth;
    var sh = screen.availHeight;
    
    var px = (sw - width) / 2;
    var py = (sh - height) / 2;
    
    var set='top='+py+',left='+px+',width='+width+',height='+height+',toobar=0,resizable=0,status=0,scrollbars=0';
    
    window.open(winNM,'',set);
}            

function opencenterScroll(winNM, width, height){
    var sw = screen.availWidth;
    var sh = screen.availHeight;
    
    var px = (sw - width) / 2;
    var py = (sh - height) / 2;
    
    var set='top='+py+',left='+px+',width='+width+',height='+height+',toobar=0,resizable=1,status=0,scrollbars=1';
    
    window.open(winNM,'',set);
}      

var Nethru_domain  = Nethru_getDomain();
Nethru_makePersistentCookie("PCID",10,"/",Nethru_domain);

//검색결과 없을 경우 더 찾아보기 클릭시 
function moreSch(obj){
	var divLayId 	= "moreSchLayer";
	var urlName 	= "moreSc.do";
	var schValue 	= el('query').value;
	var parameter 	= "&query=" + schValue;
	
	if(schValue == ""){
		alert("검색어는 두자이상 입력해야 합니다.");
		return;
	}
	
	//초기화
	SaveWindow.hideMoreSchBdySearch();
	Ext.get(divLayId).dom.innerHTML = "";
	fSlimUpdateLoading("moreSchLayer","moreSc.do",parameter);
	
    Ext.Ajax.request({
       url: urlName,
       success: function(){
            // 초기화 실행 화면단
            Ext.get(divLayId).dom.innerHTML = arguments[0].responseText;
            bodyHeightResize('bodyId');
        },
        isLoding:true
        ,
        failure: function(){
        },
        params: parameter
    });

    SaveWindow.showMoreSchLayer(obj,0);
}
// 모바일 팝업
function mobilePopHtml(isForce){
	var today  = new Date();
	var startday = '20100916'; 	// 공지사항 시작일 셋팅
	var endday = '99999999';  	// 공지사항 종료일 셋팅
	var todayStr = today.getFullYear()+""+returnStr(today.getMonth()+1)+""+returnStr(today.getDate());
	
	if(endday > todayStr && startday <= todayStr){
		if(getCookie('mobileWeek') < todayStr || isForce == 'Y'){
			
			var url = "mobile_open1001.html";
			openPop(url, 369, 645);
		}
	}
}

// 사이트맵
function siteMapLayer(obj){
	var divLayId 	= "siteMapLayer";
	var urlName 	= "jsp/common/sitemap2.jsp";
	var parameter 	= "";
	
	//초기화
	SaveWindow.hideSiteMap();
	Ext.get(divLayId).dom.innerHTML = "";
	fSlimUpdateLoading(divLayId,urlName, parameter);
    Ext.Ajax.request({
       url: urlName,
       success: function(){
            // 초기화 실행 화면단
            Ext.get(divLayId).dom.innerHTML = arguments[0].responseText;
        },
        isLoding:true
        ,
        failure: function(){
        },
        params: parameter
    });

    if(obj.id != 'mainSiteMap' && obj.id != 'mainSiteMap1'){
    	SaveWindow.showSiteMapLayer(obj,0);
    }else{
    	SaveWindow.showSiteMapLayer(obj,-400);
    }
    
}

function fSlimUpdateLoading(divLayId,urlName,parameter){
	Ext.get(divLayId).load({
        url: urlName,
        scripts: true,
        params: parameter,
        text: "Loading...",
        callback: function(el, success, response) { // ff 에서만 가능, ie 왜 안되지? ㅠㅠ
    	}
	});
}

function specChar(qVal){
	/*qVal = qVal.replaceAll("<", "&lt;");
    qVal = qVal.replaceAll(">", "&gt;");
    // 쌍따옴표는 막으면 안됨 - 왜냐고 - 검색할때 사용함 
    qVal = qVal.replaceAll("#", "&#35;");*/
    
    return qVal;
}

function LoginCheck(){
    var urlName = "loginInfo.do";
    var parameter = "";
    var userNm = "";

    $.ajax({
        type : 'POST',
        url : urlName,
        block : true,
        data : parameter,
        success : function(data, st) {
            userNm = data.userId;

            alert(userNm);
        },error : function(xhr, st, err){
            alert("<spring:message code='errors.ajax'/>");
        }
    });
}

/**
 * 관심법령 저장을 위한 공통 메소드
 */
function interestLawSave(rDivision, rApplicationId, rListName, rTitle, rLsId, rAncNo, rLsiSeq, rEfYd, rKndClsCd, rGourl, rFolderName, chrClsCd, joNoLists, showAlert){
	if (showAlert === undefined) showAlert = true;
	var pGourl = "";
	var listEntryParentIdVal = "1";
	if('010101'== rKndClsCd){
		pGourl = "https://" + location.host + "/법령/" + rTitle + "/("+ rAncNo +")";
	} else if('010102'== rKndClsCd){
		pGourl = "https://" + location.host + "/행정규칙/" + rTitle + "/("+ rAncNo +")";
	} else if('010103'== rKndClsCd){
		pGourl = "https://" + location.host + "/자치법규/" + rTitle + "/("+ rAncNo +")";
	} else if('010104'== rKndClsCd){
		pGourl = "https://" + location.host + "/판례/" + rTitle + "/("+ rAncNo +")";
	} else if('010105'== rKndClsCd){
		pGourl = "https://" + location.host + "/헌재결정례/" + rTitle + "/("+ rAncNo +")";
	} else if('010106'== rKndClsCd){
		pGourl = "https://" + location.host + "/법령해석례/" + rTitle + "/("+ rAncNo +")";
	} else if('010107'== rKndClsCd){
		pGourl = "https://" + location.host + "/행정심판례/" + rTitle + "/("+ rAncNo +")";
	} else if('010108'== rKndClsCd){
		pGourl = "https://" + location.host + "/별표서식/" + rTitle + "/("+ rAncNo +")";
	} else if('010113'== rKndClsCd){
		pGourl = "https://" + location.host + "/학칙공단/" + rTitle + "/("+ rAncNo +")";
	} else if('010122'== rKndClsCd){
		pGourl = rGourl;
		listEntryParentIdVal = rLsiSeq;
	} else if('010132'== rKndClsCd || '010140'== rKndClsCd || '380126'== rKndClsCd){
		pGourl = rGourl;
	} else{
		pGourl = "https://" + location.host + "/" + rFolderName + "/" + rTitle + "/("+ rAncNo +")";
	}	
    
	if("" == rLsId) rLsId = rLsiSeq;

    //로그인 여부 확인
    $.ajax({
        type		: 'POST',
        url			: "loginInfo.do",
        block       : true,
        data        : "",
        success		: function(data, st) {
            if(data.userId == ""){ //세션이 끊겼을경우
                if(location.host.indexOf("law.go.kr") > -1 ){
                    location.replace("http://" + location.host + "/login.do?ReUrl=" + location.pathname+location.search.replace("?","&"));
                } else {
                    location.replace("http://" + location.host + "/LSW/login.do?ReUrl=" + location.pathname+location.search.replace("?","&"));
                }
            } else {
                $.ajax({
                    type		: 'POST',
                    url			: "myInterestLaw.do",
                    block       : true,
                    async		: false,
                    data        : {
                        division    		: rDivision,
                        listEntryParentId	: listEntryParentIdVal,
                        entryText			: rTitle,
                        entryTarget			: pGourl,
                        displaySequence		: rLsiSeq,
                        isLeaf				: 1,
                        theLevel			: 2,
                        leadLevel			: 2,
                        lsId				: rLsId,
                        efYd				: rEfYd,
                        mail_yn				: 'Y',  //기본적으로 메일링을 하도록 셋팅
                        kndClsCd			: rKndClsCd,
                        applicationId		: rApplicationId,
                        joNo				: joNo,
                        joBrNo				: joBrNo,
                        joSeq				: joSeq,
                        chrClsCd			: chrClsCd,
                        listName			: rListName,
                        children			: joNoLists
                    },
                    success : function(data, st) {
                        if(data['errMsg'] != 'undefiend'){
                            if(data['errMsg'] == 'isMatch'){
								if (showAlert) alert("이미 등록된 법령입니다.");
                            } else if(data['errMsg'] == 'isLawJoMatch') {
                            	if (showAlert) alert("이미 등록된 나만의 조문 입니다.");
                            } else {
								if (showAlert) {
									if('010122'== rKndClsCd){
										alert("나만의 조문으로 저장하였습니다.");
									} else {
										alert("관심법령으로 저장하였습니다.");
									}
								}
                            }
                        }
                    },error : function(xhr, st, err){
                        alert("<spring:message code='errors.ajax'/>");
                    }
                });
            }
        },error : function(xhr, st, err){
            alert("<spring:message code='errors.ajax'/>");
        }
    });
}


//폰트 사이즈 변경
var sizeIndex = 2;
function fontSizeChange(i){
	var size = new Array('0.5625em' , '0.645em' , '0.75em' , '0.88em' , '1em');
	
	if(i == 1){
		if(sizeIndex == 4){
			alert('최대 사이즈 입니다.');
		}else{
			document.body.style.fontSize = size[sizeIndex + 1];
			sizeIndex = sizeIndex + 1;			
		}
	}else if(i == 2){
		if(sizeIndex == 0){
			alert('최소 사이즈 입니다.');
		}else{
			document.body.style.fontSize = size[sizeIndex - 1];
			sizeIndex = sizeIndex - 1
		}
	}else if(i == 3){
		document.body.style.fontSize = size[2];
		sizeIndex = 2;
	}
}

//법령 한글 주소 링크 복사 _ 행망
function clipUrl(menu) {
	
	var address = "";
	
	switch( menu ) {
	case 1: // 법령
			address = "https://www.law.go.kr/법령/";
			address += $("#lsNm").val().replaceAll("&","%2526");
			// 현행법령일 경우 공포번호와 공포일자를 세팅하지 않는다.
			if($("#nwYnValue").val() == "N") {
				address += "/" + "(" + $("#ancNo").val() + "," + $("#ancYd").val() + ")"; 
			}
			break;
	case 2: // 행정규칙
			address = "https://www.law.go.kr/행정규칙/";
			// '/' 제거
			address += $("#addressNm").val().replaceAll("&","%2526").replaceAll("/", "").replaceAll("_", "\"") + "/";
			address += "(" + $("#prmlNo").val() + "," + $("#prmlYd").val() + ")";
			break;
	case 3: // 자치법규
			var ancNo = $("#ancNo").val();
			if($("#gubun").val() != "ELIS"){
				ancNo = ancNo.replace(/(^0+)/, "");
			}
			address = "https://www.law.go.kr/자치법규/";
			address += $("#ordinNm").val().replaceAll("&","%2526") +"/";
			address += "(" + ancNo + "," + $("#ancYd").val() + ")";
			break;
	case 4: // 학칙공단
			address = "https://www.law.go.kr/학칙공단/";
			address += $("#lsNm").val().replaceAll("&","%2526") + "/";
			address += "(" + $("#prmlNo").val().replace(" ","%20") + "," + $("#prmlYd").val() + ")";
			break;
	case 5: // 판례
			address = "https://www.law.go.kr/판례/";
			address += $("#precNm").val().replaceAll("&","%2526") + "/";
			address += "(" + $("#precNo").val().replace(" ","%20") + ")";
			break;
	case 6: // 결정례
			address = "https://www.law.go.kr/헌재결정례/";
			address += $("#detcNm").val().replaceAll("&","%2526") + "/";
			address += "(" + $("#detcNo").val().replace(" ","%20") + ")";
			break;
	case 7: //해석례
			address = "https://www.law.go.kr/법령해석례/";
			address += $("#expcNm").val().replaceAll("&","%2526") + "/";
			address += "(" + $("#expcNo").val().replace(" ","%20") + ")";
			break;
	case 8: //심판례
			address = "https://www.law.go.kr/행정심판례/";
			address += $("#deccNm").val().replaceAll("&","%2526") + "/";
			address += "(" + $("#deccNo").val().replace(" ","%20") + ")";
			break;
	case 9: {//위원회
			address = "https://www.law.go.kr/" + $("#cmtNmKor").val() + "/";
			address += $("#evtNm").val().replaceAll("&", "%2526") + "/";
			if ($("#cmtNmKor").val() === "국가인권위원회") {
				address = addDetailAddress(address, $("#evtNo").val(), $("#decsnYd").val());
			} else {
				if ($("#evtNo").val() != null && $("#evtNo").val() != "") {
					address = address + "(" + $("#evtNo").val().replace(" ", "%20") + ")";
				}
			}
			break;
		}
	case 10: // 영문법령
			address = "https://www.law.go.kr/영문법령/";
			address += $("#lsNm").val().replaceAll("&","%2526");
			// 현행법령일 경우 공포번호와 공포일자를 세팅하지 않는다.
			if($("#nwYnValue").val() == "N") {
				address += "/" + "(" + $("#ancNo").val() + "," + $("#ancYd").val() + ")";
			}
			break;
	case 11: // 조약
			address = "https://www.law.go.kr/조약/";
			address += $("#trtyNm").val().replaceAll("&","%2526");
			address += "/" + "(" + $("#trtyNo").val() + "," + $("#eftYd").val() + ")";
			break;
		case 12: {// 중앙부처 1차 해석
			address = "https://www.law.go.kr/중앙부처1차해석/";
			address += $("#cgmExpcNm").val().replaceAll("&", "%2526") + "/";
			address = addDetailAddress(address, $("#cgmExpcNo").val(), $("#cgmExpcYd").val());
			break;
		}
		case 13: { // 특별행정심판재결례
			address = "https://www.law.go.kr/";
			var trbClsCd = $("#trbClsCd").val();

			switch (trbClsCd) {
				case '360101':
					address += "조세심판재결례/";
					break;
				case '360102':
					address += "특허심판재결례/";
					break;
				case '360103':
					address += "해양안전심판재결례/";
					break;
				case '360105':
					address += "국민권익위원회심판재결례/";
					break;
				case '360106':
					address += "인사혁신처소청심사위원회심판재결례/";
					break;
			}

			address += $("#specialDeccNm").val() + "/";
			address = addDetailAddress(address, $("#specialDeccNo").val(), $("#rlsYd").val());
			break;
		}
		case 14: {// 전체!
			var trbClsCd = $("#trbClsCd").val();

			var urlPostfix = "행정심판례/";
			if (trbClsCd) {
				switch (trbClsCd) {
					case '360101':
						urlPostfix = "조세심판재결례/";
						break;
					case '360102':
						urlPostfix = "특허심판재결례/";
						break;
					case '360103':
						urlPostfix = "해양안전심판재결례/";
						break;
					case '360105':
						urlPostfix = "국민권익위원회심판재결례/";
						break;
					case '360106':
						urlPostfix = "인사혁신처소청심사위원회심판재결례/";
						break;
				}
			}
			if (trbClsCd) {
				urlPostfix += $("#specialDeccNm").val().replaceAll("&", "%2526") + "/";
				urlPostfix = addDetailAddress(urlPostfix, $("#specialDeccNo").val(), $("#rlsYd").val());
			} else {
				urlPostfix += $("#deccNm").val().replaceAll("&", "%2526") + "/";
				urlPostfix += "(" + $("#deccNo").val().replace(" ", "%20") + ")";
			}
			address = "https://www.law.go.kr/" + urlPostfix;
			break;
		}
		case 19:
			address = "https://www.law.go.kr/감사원사전컨설팅의견서/" + el('pvcsNm').value.replaceAll('&', "%2526");
			address = addDetailAddress(address, el('recNo').value, el('rplYd').value);
			break;
	}
	address = address.replaceAll(" ","");
	var textarea = document.createElement('textarea');
	document.body.appendChild(textarea);
	textarea.value=address;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("URL이 복사되었습니다.");
}

/**
 * <pre>
 * 	조문 주소 복사 (본문 내 조문 앞 체크박스 버튼 클릭)
 * </pre>
 * @author brKim
 * @since 2017. 12. 22.
 */
function clipJoUrl() {
	
	var address = "";
	
	if (el("admRulSeq")) {
		address = "https://www.law.go.kr/행정규칙/";
		address += $("#lsNm").val().replaceAll("&","%2526") + "/";
		if (joBrNo_selectValue != 0) {
			address += "(" + $("#prmlNo").val() + ","+ $("#prmlYd").val() + ")/" + "제" + joNo_selectValue.replace("-0","") +"조의" + joBrNo_selectValue;
		} else {
			address += "(" + $("#prmlNo").val() + "," + $("#prmlYd").val() + ")/" + "제" + joNo_selectValue.replace("-0","") +"조";
		}
	} else if (el("ordinSeq")) {
		address = "https://www.law.go.kr/자치법규/";
		address += $("#ordinNm").val().replaceAll("&","%2526") + "/";
		if (joBrNo_selectValue != 0) {
			address += "(" + $("#ancNo").val() + ","+ $("#ancYd").val() + ")/" + "제" + joNo_selectValue +"조의" + joBrNo_selectValue;
		} else {
			address += "(" + $("#ancNo").val() + "," + $("#ancYd").val() + ")/" + "제" + joNo_selectValue +"조";
		}
	} else if(el("schlPubRulSeq")) {
		address = "https://www.law.go.kr/학칙공단/";
		address += $("#lsNm").val().replaceAll("&","%2526") + "/";
		if (joBrNo_selectValue != 0) {
			address += "(" + $("#prmlNo").val().replace(" ","%20") + ","+ $("#prmlYd").val() + ")/" + "제" + joNo_selectValue +"조의" + joBrNo_selectValue;
		} else {
			address += "(" + $("#prmlNo").val().replace(" ","%20") + "," + $("#prmlYd").val() + ")/" + "제" + joNo_selectValue +"조";
		} 
	} else {
		address = "https://www.law.go.kr/법령/";
		address += $("#lsNm").val().replaceAll("&","%2526") + "/";
		if (joBrNo_selectValue != 0) {
			address += "(" + $("#efYd").val() + ","+ $("#ancNo").val() + "," + $("#ancYd").val() + ")/" + "제" + joNo_selectValue +"조의" + joBrNo_selectValue;
		} else {
			if(joNo_selectValue != 0){
				address += "(" + $("#efYd").val() + ","+ $("#ancNo").val() + "," + $("#ancYd").val() + ")/" + "제" + joNo_selectValue +"조";
			}else{
				// 0조가 선택되는 경우(대한민국 헌법 전문)
				address += "(" + $("#efYd").val() + ","+ $("#ancNo").val() + "," + $("#ancYd").val() + ")/" + "전문";
			}
		}
	}
	
	address = address.replaceAll(" ","");
	var textarea = document.createElement('textarea');
	document.body.appendChild(textarea);
	textarea.value=address;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("URL이 복사되었습니다.");
}

/**
 * <pre>
 * 	별표 주소 복사 (별표 뒤 주소복사 아이콘 클릭)
 * </pre>
 * @author brKim
 * @since 2017. 12. 22.
 */
function clipBylUrl(url) {
	// IE 체크
	if (document.all) {
		window.clipboardData.setData('Text', url);
		alert("주소가 복사되었습니다.");
	} else { // 그 외
		prompt("Ctrl+C 를 눌러 주소를 복사하세요", url);
	}
}



var num = 0; 
var elementHi = "";
var hiTop = new Array();

var firstSearchFlag = false;	// 최초 검색여부
var curSearchWord = "";  // 현재 검색어
var searchFlag = true;    //검색어가 변경 되면 false 로 변경

var radioChangFlag = false;
var checkBoxChangFlag = false;
var searchYnFlag = true;
var isBylSearch  = false;   // 2018.11.29. 2018 국가법령 - 화면내 검색 - 별표본문내용 검색 여부
var isBylChkChg = false;   // 2018.11.29. 2018 국가법령 - 화면내 검색 - 별표본문내용 CheckBox
$(document).ready(function() {
	$(':radio[name="srcBtn"]').change(function() {
		radioChangFlag = true;
	});
	
	$('#selectSearchJo').change(function() {
		checkBoxChangFlag = true;
	});
});

/**
 * 화면 내 검색
 * 2018.11.29. 2018 국가법령 - 별표본문내용 검색 기능 추가에 따른 수정
 * 2018.12.13. 2018 국가법령 - 별표본문내용 검색 비동기화로 변경 적용(async option deprecated)
 */
function bodyInfoRSearch(divId)
{
	if($("#bdySearch").val().trim() == ""){
		//alert("검색어를 입력해 주세요.");
		if(el("bdySearch")) el("bdySearch").focus();
		return;
	}

	if(curSearchWord != $("#bdySearch").val()){
		firtSearchFlg = true; // 20160128. 최초검색여부
	}
	else if(firstSearchFlag){ // 다른 목록을 클릭하면 첫검색으로 간주
		firtSearchFlg = true;
	}

	if($("#selectSearchJo").is(":checked") == false){
		$("input[name='joNoList']:checked").each(function(){	// 전체 체크박스 해제
			$(this).removeAttr("checked");
		});
		// 왼쪽 검색 목록 제거
		if (isBylSearch == false || $("input:checkbox[id=selectSearchByl]").is(":checked") == false) {
		    searchLayer.hiddenSearchLayer();
		}
	}

	// 20160128. 최초검색이면 ">"클릭해도 검색되게끔 처리
	if (firtSearchFlg) {
		num = 0;
		showSearchWord(divId);
	}
	else {
        if (isBylChkChg == true) {
    		num = 0;
    		showSearchWord(divId);
    	}
    	else if (checkBoxChangFlag == true) {
    		selectSearchJo();
    	}
    	else {
    	    postBodyInfoRSearch();
    	}
    }
}

/**
 * 화면 내 검색(bodyInfoRSearch(divId)) 후처리
 * 2018.12.13. 2018 국가법령 - 별표본문내용 검색 비동기화 적용에 따른 수정
 */
function postBodyInfoRSearch()
{
	if (!searchValidation()) {
		return;
	}

	// 여기서부터 위로 아래로 라디오 버튼 구하기(value = 1 위로 , value = 2 아래로)
	var searchGubun = $(':radio[name="srcBtn"]:checked').val();
	
	// 라디오 변경여부
	// 위 아래가 변경되었으면 값이 0이 될 수가 없음...
	if(radioChangFlag){
		if(searchGubun == 1){ // 아래에서 위로 변경되었을 경우...
			var caseNum = parseInt(num)-2;
			if(caseNum >= 0){
				num = caseNum;
			}else{
				num = 0;
			}
 		}else{ // 위에서 아래로 변경되었을 경우.....
 			var caseNum = parseInt(num)+2;
 			if(caseNum < elementHi.length){
 				num = caseNum;
 			}else{
 				num = elementHi.length-1
 			}
		}
	}
	
	radioChangFlag = false;

	if (searchYnFlag)
	{
		var isTagImg = ($("#searchId"+num).prop("tagName") == "IMG") ? true: false;
		var anchorId = "searchId" + num;
		
		if (isTagImg) {
            anchorId = "#J" + ($("#searchId"+num).next().attr("id")).replace(/[^0-9]/g, "");
		}

		if (searchGubun == 1)
		{	
			if (num == 0) {
				elementHi.eq(1).css({'background':'#ffffff','color':'#ff0000'});
				elementHi.eq(0).css({'background':'#ff0000','color':'#ffffff'});
				
				if (isTagImg) {
				    document.location.href = anchorId;
				} else {
				    document.location.hash = anchorId;
				}
				
				$("#bdySearch").focus();
				num = elementHi.length-1;
				
			}
			else {
				if (isTagImg) {
				    document.location.href = anchorId;
				} else {
				    document.location.hash = anchorId;
				}

				$("#bdySearch").focus();
				
				if (num == elementHi.length-1) {
					elementHi.eq(0).css({'background':'#ffffff','color':'#ff0000'});
				} else {
					elementHi.eq(num+1).css({'background':'#ffffff','color':'#ff0000'});
				}
				
				elementHi.eq(num).css({'background':'#ff0000','color':'#ffffff'});
				num--;
			}
		}
		else {
			if (num == elementHi.length-1) {
				elementHi.eq(num-1).css({'background':'#ffffff','color':'#ff0000'});
				if (isTagImg) {
				    document.location.href = anchorId;
				} else {
				    document.location.hash = anchorId;
				}
				$("#bdySearch").focus();
				
				elementHi.eq(num).css({'background':'#ff0000','color':'#ffffff'});
				num = 0;
			}
			else {
				elementHi.eq(num).css({'background':'#ff0000','color':'#ffffff'});
				if (isTagImg) {
				    document.location.href = anchorId;
				} else {
				    document.location.hash = anchorId;
				}
				$("#bdySearch").focus();
				
				if (num != 0) {
					elementHi.eq(num-1).css({'background':'#ffffff','color':'#ff0000'});
				}
				
				if (num == 0) {
					elementHi.eq(elementHi.length-1).css({'background':'#ffffff','color':'#ff0000'});
				}
				
				num++;
			}
		}
	}
}

/**
 * <pre>
 * 	화면 내 검색 후 맞는
 *  조문들을 레이어로 표현
 *  2018.11.29. 2018 국가법령 - 별표본문내용 검색 기능 추가에 따른 수정
 *  2018.12.13. 2018 국가법령 - 별표본문내용 검색 비동기화 적용에 따른 수정
 * </pre>
 * @author brKim
 * @since 2017. 10. 25.
 */
function selectSearchJo() {
    if ($("#selectSearchJo").is(":checked") || $("input:checkbox[id=selectSearchByl]").is(":checked"))
    {
        if ($("#selectSearchJo").is(":checked")) {
            // <hi> tag가 조문내용에 있으면 조문 체크박스를 체크 상태로 변경
            for (var i=0;i<elementHi.length;i++) { // 일치하는 값의 객체정보를 설정
                // 검색된 결과 앞에 CheckBox 선택
                var checkBoxParent = $(hiTop[i]).parents("div.pgroup");

                // 2018.11.29. 2018 국가법령 - 기존 오류 수정
                /*if (checkBoxParent.length > 0) {
                    $(checkBoxParent).find('input:checkbox[name="joNoList"]').attr("checked", true);
                }*/
                $(checkBoxParent).find('input:checkbox[name="joNoList"]').each(function() {
                    $(this).prop("checked", true);
                });
            }
        }

        var vHtml=[], i=-1, isBylFind=false;

        vHtml[++i] = "<table class=\"unOrdinJo_Dele\">";
        vHtml[++i] =   "<colgroup>";
        vHtml[++i] =     "<col width=\"215px\" />";
        vHtml[++i] =   "</colgroup>";
        vHtml[++i] =   "<tbody>";

        // 체크된 조문 제목을 뿌려준다.
        $('input:checkbox[name="joNoList"]:checked').each(function() {
            var checkBoxParent = $(this).parents("div.pgroup");
            var joNum = $(this).val();
            
            //#29953 법령,행정규칙,공공기관 규정  관련 조문이동 관련 추가
            var tmpJoNum = joNum.split(":");
            if( tmpJoNum != null && tmpJoNum.length > 2 ){
            	joNum = tmpJoNum[0]+":"+tmpJoNum[1];
            }
            if (checkBoxParent.length > 0) {
                vHtml[++i] =   "<tr>";
                vHtml[++i] =     "<td class=\"joTtl\"><a href=\"#J" + joNum + "\" onclick=\"focusMulti('J"+joNum+"');return false;\">" + $(checkBoxParent).find("span.bl").text() + "</a></td>";
                vHtml[++i] =   "</tr>";
            }
        });

        if ($("input:checkbox[id=selectSearchByl]").is(":checked")) {

            //별표/서식 제목을 화면내 검색 결과에 표시
            $("#sideCenter ul.pconfile.pb30 > li").each(function()
            {
                if ($(this).find("img[hi='Y']").length > 0)
                {
                    var $byl   = $(this).find("a[id^='J']:first");
                    var vBylNum= $byl.attr("id");
                    // 기존 법령 HTML : $(this).find("a").eq(2).text()
                    // 디자인 변경 법령 HTML : $(this).find("span a").eq(2).text()
                    var vText  = ($(this).find("span a").length == 0) ? $(this).find("a").eq(2).text(): $(this).find("span a").eq(2).text();

                    vHtml[++i] =   "<tr><td class=\"joTtl\"><a href=\"#" + vBylNum + "\" onclick=\"focusMulti('" + vBylNum + "');return false;\">" + vText + "</a></td></tr>";
                    isBylFind = true;
                }
            });
        }

        vHtml[++i] =   "</tbody>";
        vHtml[++i] = "</table>";

        $("#searchList").html(vHtml.join(''));


        // 검색결과가 존재할 경우에만 목록 출력
        if ($('input:checkbox[name="joNoList"]:checked').length > 0 || isBylFind) {
            searchLayer.showSearchLayer(0,"화면내 검색",0);
        } else {
            searchLayer.hiddenSearchLayer();
        }

    } else {
        $("input[name='joNoList']:checked").each(function() { // 전체 체크박스 해제
            $(this).removeAttr("checked");
        });
        // 왼쪽 검색 목록 제거
        searchLayer.hiddenSearchLayer();
    }

    checkBoxChangFlag = isBylChkChg = false;
    
    postBodyInfoRSearch();
}

/**
 * 2018.11.29. 2018 국가법령 - 별표본문내용 검색 기능 추가 
 *                         입력한 키워드가 동일한 단어를 포함 입력하는 경우 Highlight 안됨
 *                         (ex: 명예, 명예회복), ref에서 제공하는 removeHighlight로 수정
 * 2018.12.13. 2018 국가법령 - 별표본문내용 검색 비동기화로 변경 적용(async option deprecated)
 * 2019.04.22. IE환경에서 여러번 검색시 removeHighlight() 사용시 hi태그에 id와 class가 추가된 경우 본문내용까지 지워지는 문제가 있어서 변경처리.
 */ 
function showSearchWord(divId){
	
	searchYnFlag = true;
	var threeCmpDivNm = '';
    
    $("#"+divId).removeHighlight();
    
    // 별표 본문 내용 검색 결과 제거
	$("#" + divId + " img[hi^='Y']").each(function(index){
		//$(this).remove();
		$tmp = $(this).nextAll().clone(true).eq(0).css("margin-left", "-13px");
		$(this).parent().parent().append($tmp);
		$(this).parent().remove();		
	});
	
	$("input[name='joNoList']:checked").each(function(){	// 전체 체크박스 해제
		$(this).removeAttr("checked");
	});
	
	curSearchWord = $("#bdySearch").val();
	if(curSearchWord == ""){
		return;
	}
	
	if(typeof $("#query").val() != 'undefined'){
		//화면내검색 단어가 검색어에 포함될경우 font태그 삭제
		if($("#query").val().indexOf(curSearchWord) > -1 || curSearchWord.indexOf($("#query").val()) > -1) {
			$("#"+divId).html($("#"+divId).html().replace(/<font color="#ff0000">/g,"").replace(/<\/font>/g,""));
		}
		
		//화면내검색 단어가 검색어에 포함되지않을 경우 기존 검색어에 하이라이트 표시(제목에선 하이라이트 삭제)
		if(curSearchWord.indexOf($("#query").val()) == -1) {
			bodySearchAll(divId, $("#query").val(), "query", "down", "1", "pass");
			
			if(typeof schlPubRulVO == "undefined" && typeof $("#conTop").html() != "undefined"){
				$("#conTop").html($("#conTop").html().replace(/<font color="#ff0000">/g,"").replace(/<\/font>/g,""));
			}
		}
	}
	
	$("#"+divId).highlight(curSearchWord);			// 검색어 하이라이트 표시
	
	if(typeof lsVO != "undefined") {
		//3단비교 상단에 있는 text들은 highlight를 삭제한다.
		if(lsVO.bdyUpdValue.updateContentNm == "lumThdCmp"){
			$("#divThreeCmpHead").removeHighlight();
			threeCmpDivNm = "divThreeCmpHead"
		}else if(lsVO.bdyUpdValue.updateContentNm == "lsPtnThdCmp"){
			threeCmpDivNm = "thdCmpTab"
		}else if(lsVO.bdyUpdValue.updateContentNm == "lumThdCmpSc"){
			threeCmpDivNm = "jomun"
		}
		if(threeCmpDivNm != ''){
			if(threeCmpDivNm == 'jomun'){
				for(var i = 1 ; i <= 3 ; i++){
					$("#"+threeCmpDivNm+i+" hi").each(function(index){
						var text = $(this).text();
						$(this).after(text);
						$(this).remove();
					});
				}
			}else{
				$("#"+threeCmpDivNm+" hi").each(function(index){
					var text = $(this).text();
					$(this).after(text);
					$(this).remove();
				});
			}
		}
	}
	
	$("hi").css('color','#ff0000');
	
	if (isBylSearch && $("input:checkbox[id=selectSearchByl]").is(":checked")) {
        var vBylSeqStr=[], i=-1;

        //별표/서식 목록에서 BylSeq 추출
        $("#sideCenter ul.pconfile.pb30 > li").each(function()
        {
            if ($(this).find("a[id^='J']").length > 0)
            {
                vBylSeqStr[++i] = $(this).find("a[id^='J']:first").attr("id").replace(/[^0-9]/g, "");
            }
        });

        if (vBylSeqStr.length > 0)
        {
            var vReqParam = {keyword:curSearchWord.trim()
                         , bylSeqStr:vBylSeqStr.join("|")};

            // 별표 본문 내용 키워드 검색
            $.ajax({
                type        : "POST"
                ,url        : "lsBylCtsSearch.do"
                ,timeout    : 3000000   // 240 seconds
                ,data       : $.param(vReqParam, true)
                ,dataType   : "json"
                ,beforeSend : function(request) {
                    layoutLoadMask("bodyContent");
                }
                ,success: function(data, textStatus, jqXHR) {
                    callBackLsBylCtsSearch(divId, data.list);
                }
                ,error : function(jqXHR, textStatus, err) {
                    callBackLsBylCtsSearch(divId);
                }
                ,complete : function(jqXHR, textStatus) {
                    layoutUnMask("bodyContent");
                }
            });
        }
        else {
            postShowSearchWord(divId, "hi");
        }
	}
	else {
        postShowSearchWord(divId, "hi");
	}
}

/**
 * 2018.11.29. 2018 국가법령 - highlight tag에 id=searchId 속성 삽입
 */ 
function postShowSearchWord(divId, selector)
{
	if(!$.browser.isIE && typeof $("#query").val() != 'undefined'){// ie가 아닐때 법령검색어  화면내 검색대상에서 제외
		$("#"+divId).find(selector).each(function(){
			if($(this).text() == $("#query").val().trim()){
				var txt = $(this).text();
				if(txt.indexOf($("#bdySearch").val()) > -1){
					var startNum = txt.indexOf($("#bdySearch").val());
					txt = txt.substring(0,startNum) + '<hi style="color: rgb(255, 0, 0);">' + $("#bdySearch").val() + '</hi>' + txt.substring(startNum + $("#bdySearch").val().length);
				}
				$(this).after('<font color="#ff0000">' + txt + '</font>');
				$(this).remove();
			}
		});
	}
	
    elementHi = $("#"+divId).find(selector);        // <hi>태그로 감싸진 찾는 검색어를 저장

    // 검색된 결과가 없으면
	if(elementHi.length == 0){
		alert("검색어가 없습니다.");
		searchYnFlag = false;
		return;
	}

    for(var i=0;i<elementHi.length;i++){			// 일치하는 값의 객체정보를 설정
    	hiTop[i] = elementHi.eq(i);
    	$(hiTop[i]).attr("id", "searchId"+i);
    }
    
    firtSearchFlg = false; // 20160128. 최초검색여부
    firstSearchFlag = false;// lsViewAll (화면전환이 된 후)의 플래그
    selectSearchJo();
}

/**
 * 2018.11.29. 2018 국가법령 - 별표 본문 내용에서 키워드 검색 결과에 해당하는 별표에 img 삽입
 */
function callBackLsBylCtsSearch(divId, $resultList)
{
    var selector = "hi";
    
    if (typeof($resultList) != "undefined" && $resultList.length > 0)
    {
        selector = "hi, img[hi='Y']";
        
        //별표 본문 내용에서 키워드 검색 결과에 해당하는 별표에 img 삽입
        $("#sideCenter ul.pconfile.pb30 > li").each(function()
        {

            if ($(this).find("a[id^='J']").length > 0)
            {
                var $byl   = $(this).find("a[id^='J']:first");
                var vBylNum= $byl.attr("id");

                $.each($resultList, function(idx, bylSeq)
                {
                    if (bylSeq == vBylNum.replace(/[^0-9]/g, ""))
                    {
                        var $tmp = $byl.next().children().clone(true).eq(0).css("margin-left", "");//.removeAttr("style");
                        var $img = $("<span/>").addClass("bu_bx")
                    	    .prepend($tmp)
                    	    .prepend($("<img/>", {src:webRoot+"/images/bu_alert.png", alt:"별표/서식 본문내용 검색결과", hi:"Y"}));
                        $byl.next().children().remove();
                        $byl.next().prepend($img);

                        return false;
                    }
                });
            }
        });
    }
    postShowSearchWord(divId, selector);
}

function searchValidation(){
	if(elementHi == ""){
		$("#searchWord").focus();
		return false;
	} else {
		return true;
	}
}

jQuery.fn.highlight = function(pat) {
	jQuery.fn.highlight = function(pat) {
		function innerHighlight(node, pat) {
			var skip = 0;
			if (node.nodeType == 3) {
				var pos = node.data.toUpperCase().indexOf(pat);
				pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
				if (pos >= 0) {
					var spannode = document.createElement('hi');
					var middlebit = node.splitText(pos);
					var endbit = middlebit.splitText(pat.length);
					var middleclone = middlebit.cloneNode(true);
					spannode.appendChild(middleclone);
					middlebit.parentNode.replaceChild(spannode, middlebit);
					skip = 1;
				}
			} else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && !/(bylKoAddr)/i.test(node.className)) {
				for (var i = 0; i < node.childNodes.length; ++i) {
					i += innerHighlight(node.childNodes[i], pat);
				}
			}
			return skip;
		 }
		return this.length && pat && pat.length ? this.each(function() {
			innerHighlight(this, pat.toUpperCase());
		}) : this;
	};

	jQuery.fn.removeHighlight = function() {
		return this.find("hi").each(function() {
			this.parentNode.firstChild.nodeName;
			with (this.parentNode) {
				replaceChild(this.firstChild, this);
				normalize();
			}
		}).end();
	};
	function innerHighlight(node, pat) {
		var skip = 0;
		if (node.nodeType == 3) {
			var pos = node.data.toUpperCase().indexOf(pat);
			pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
			if (pos >= 0) {
				var spannode = document.createElement('hi');
				var middlebit = node.splitText(pos);
				var endbit = middlebit.splitText(pat.length);
				var middleclone = middlebit.cloneNode(true);
				spannode.appendChild(middleclone);
				middlebit.parentNode.replaceChild(spannode, middlebit);
				skip = 1;
			}
		} else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && !/(bylKoAddr)/i.test(node.className)) {
			for (var i = 0; i < node.childNodes.length; ++i) {
				i += innerHighlight(node.childNodes[i], pat);
			}
		}
		return skip;
	}
	return this.length && pat && pat.length ? this.each(function() {
		innerHighlight(this, pat.toUpperCase());
	}) : this;
};

jQuery.fn.removeHighlight = function() {
	return this.find("hi").each(function() {
		this.parentNode.firstChild.nodeName;
		with (this.parentNode) {
			replaceChild(this.firstChild, this);
			normalize();
		}
	}).end();
};

/* 화면 내 검색 좌측 레이어 시작 */
var searchLayer = function() {
	var searchLayer = null;
	
	return {
		
		showSearchLayer : function(size) {
			
			if (size == 0) {
				
				if (searchLayer) {
					searchLayer.dialog("close");
				}
				
				var lelis = $("#lelistwrapLeft").length > 0;
				
				if (lelis) {
					height = $("#lelistwrapLeft").height() -10;
				} else {
					height = 340;
				}
				
				if (lelis) {
					$("#vwrapSearchList").css("height", $("#lelistwrapLeft").height() - 10);
					$("#viewSearchList").css("height", $("#lelistwrapLeft").height() - 42);
					$("#searchList").css("height", $("#lelistwrapLeft").height() - 42);
				}
				
				if (!searchLayer) {
					
					var title =	'<div class="vwrap_tit">'
					    		+	'<h5 class="vw_s_tit"><span>화면 내 검색결과</span></h5>'
					    		+	'<a href="#" onclick="searchLayer.hiddenSearchLayer();" class="btn_vw_clse">닫기</a>'
					    		+'</div>';
					
					searchLayer = $("#divSearchLayer").dialog({
						autoOpen : false
					   ,modal : false
					   ,resizable: false
					   ,width: '250px'
					   ,title : title
					   ,position : {
							// 내 객체 위치
							my : 'left top',
							// 참조할 객체 위치
							at : 'left top',
							// 참조할 객체 지정
							of : $('#leftContent')
					   }
					});
					
				}
				
				searchLayer.dialog("open");
			}
		}
		,hiddenSearchLayer : function() {
			if(searchLayer){
				searchLayer.dialog("close");
			}
		}
		,isNotNull : function() {
			return searchLayer;
		}
	};
}();
/* 화면 내 검색 좌측 레이어 종료 */

/*******************************************************************************
 * 왼쪽 목록에서 본문 포커스 변경하기 (영문법령과 한글본문 구분하기)
 * 
 * @param target
 */
function focusMulti(target) {
	
   	// 신구법 비교 팝업창에서는 focus를 지원하지 않음
	var oanChk = $("#viewCls").val(); 

	var menuIdx = "";
	
	if(typeof menuInfoParam == "undefined"){
		menuIdx = "";
		tabMenuIdx = "";
		
	}else{
		var menuIdx = menuInfoParam.menuId;
	}
	
	
	// 최신법령 - 공포법령(제개정문), 팝업의 경우 bdychange
	if(tabMenuIdx == '1' && subMenuIdx =='5' && menuIdx == '1'|| tabMenuIdx == '0' && subMenuIdx =='0' && oanChk != 'lsOldAndNew' 
				|| tabMenuIdx == '6' && subMenuIdx =='1' || tabMenuIdx == '6' && subMenuIdx =='2' || tabMenuIdx == '6' && subMenuIdx =='3'){
		if(typeof target != 'undefined'){
			bdyChange(true, true);
			// 본문인 경우 조문 펼치기
			if ($("#west-toggler").attr('title') == 'Open') {
				$('#west-toggler').click();
			}
		}
	}
	
	if(el("bodyContentTOP") != null){
		if (el("bodyContentTOP").style.display != "none") {
			document.location.href = "#" + target;
			if(target !== undefined) {	
				var aHref = "#"+target;
				var aHrefText = $('.dep2 a[href="'+ aHref +'"]').text();
				var aHrefSize = aHrefText.length;
				var targetSub = target.substring(1);
				
				if(aHrefText.indexOf("삭제") > -1){
					// '[별지 제 nnnn호의nnnn서식] 삭제 ' 띄어쓰기 고려한 크기
					if(aHrefSize > 23){
						bylInfoDiv(targetSub);
					}									
				} else{
					bylInfoDiv(targetSub);
				}
			}			
		}else{
			document.location.href = "#E" + target;
		}
	}else{
		document.location.href = "#" + target;
	}
}

/**
 * 3단비교에서 왼쪽 목록 클릭시 해당 조문 포커스
 * @param target
 */
function focusLsThdCmpMulti(target) {
	
	var viewCheck = $("#viewCls").val();
	
	if($("#bodyContentTOP") != null && $("#bodyContentTOP").css("display") == "none" && viewCheck == "thdCmpNewScP") {
		document.location.href = "#" + target;
	}else if($("#bodyContentTOP") == null) {
		document.location.href = "#" + target;
	}else{
		document.location.href = "#E" + target;
	}
}

$(window).resize(function() {
	setTimeout(function() {
		// 검색결과 크기 조절
		var lelis = document.getElementById("lelistwrapLeft");
		if (searchLayer.isNotNull()) {
			if ($('#divSearchLayer').dialog('isOpen')) {
				if (lelis) {
					searchLayer.showSearchLayer(0, "화면내 검색", 0);
				}
			}
		}
	}, 100);
	
	// 공유하기 레이어 위치 조정(조문공유 제외)
	if($('.shareLayer:visible').prev().prev().attr("id") !=='shareJo'){
		$('.shareLayer').not('#share_jo').css('left', $(window).width()-130);
	}
});


/**내가 찾은 화면내 검색어 목록 셋팅**/
function printBdySchKeywordList() {
	var keywordList = getBdySearchDatList("BdySrchHistory");
	var resultVal = "";
	
	if( keywordList.length == 0 ) return "";
	
	var keywordCnt = keywordList.length;
	
	if(keywordCnt > 4) keywordCnt = 4;
	
	var tmpArray = new Array(keywordCnt);
	
	keywordList.reverse();
	
	for(var i = 0; i < keywordCnt; i ++) {
		tmpArray[i] = keywordList[i];
	}
	
	resultDataArray = keywordList;
	resultViewArray = tmpArray;
	
	for(var i = 0; i < resultViewArray.length ; i++){
	    var tmpVal = resultViewArray[i].trim();
        
	    if(tmpVal != ""){
	        if(i == 0){
    	        resultVal = "<a href=\"#\" onClick=\"clBdySearch('" + tmpVal + "')\" title='"+ tmpVal +"'>"+ etcToDot(tmpVal,4); +"</a>";
    	        //닫기 이미지 추가
    	        resultVal = resultVal + "</a><span style=\"cursor:pointer;\" title=\"검색어 삭제\" onclick=\"javascript:clBdySearchDel('" + tmpVal + "');return false;\"><img src=\"/LSW/images/button/btn_del2.gif\" style=\"margin-left: 2px;\" alt=\"검색내용 삭제\"></span>"; +"</span>";
    	    } else {
    	        resultVal = resultVal +", <a href=\"#\" onClick=\"clBdySearch('" + tmpVal + "')\" title='"+ tmpVal +"'>"+ etcToDot(tmpVal,4); +"</a>";
    	        //닫기 이미지 추가
    	        resultVal = resultVal + "</a><span style=\"cursor:pointer;\" title=\"검색어 삭제\" onclick=\"javascript:clBdySearchDel('" + tmpVal + "');return false;\"><img src=\"/LSW/images/button/btn_del2.gif\" style=\"margin-left: 2px;\" alt=\"검색내용 삭제\"></span>"; +"</span>";
    	    }
	    }
	}
	
	return resultVal;
}

/*
화면내 검색어를 쿠키에 저장한다.(중복제거, 4개까지)
*/
function setBdySchKeywordCookie(obj, obj2){
var keyword = obj.value;

var dataId = "BdySrchHistory";

if(keyword != ""){
	var datList = getBdySearchDatList(dataId);
	var tempData = "";
	var uName = "";
	var isFirst = true;
	
	if(datList.length > 0){
		//2. 중복자료 검사
		for(var i = 0; i < datList.length; i++){
			if ( datList[i] == keyword ) continue;
			
			if(tempData == ""){
					uName = "";
			}else{
					uName = "---";	
			}
			
			if (navigator.appName.charAt(0) == 'N') {
				tempData += uName + toUtf8(datList[i]);
				
			} else if (navigator.appName.charAt(0) == 'M') {
				tempData += uName + datList[i];
			}
		}
		
		isFirst = false;
	}
	
	if( isFirst == true ) {
		uName = "";
	} else {
		uName = tempData + "---";
	}
	
	if (navigator.appName.charAt(0) == 'N') {
		setCookie(dataId, uName + toUtf8(keyword));
	} else if (navigator.appName.charAt(0) == 'M') {
		setCookie(dataId, uName + keyword);
	}
	
	/* delDatList() : /WEB/LSW/js/common/CookieUtil.js */
	if(datList.length > 4){		// 저장 개수 설정 
		delBdySchKeywordCookie(dataId);
	}
	
	obj2.innerHTML = printBdySchKeywordList();
}
}

/**
 * <pre>
 * FAQ 리스트 클릭 이벤트
 * </pre>
 * @author yjSeo
 * @since 2019. 5. 3.
 */
$( document ).ready(function() {
	$(".bbsFaq > ul > li > div.question a").click(function(){
		if($(this).hasClass("on")){
			$(this).parent(".question").next().hide();
			$(this).removeClass("on");
			$(this).css({
			    "background":"url(/LSW/images/board/ico_open.png)", 
			    "background-repeat" : "no-repeat", 
			    "background-position":"right"
			});
		}else{
			$(this).parent(".question").next().show();
			$(this).addClass("on");
			$(this).css({
			    "background":"url(/LSW/images/board/ico_close.png)", 
			    "background-repeat" : "no-repeat", 
			    "background-position":"right"
			});
		}
	});
});

/**
 * <pre>
 * 근대법령 팝업
 * </pre>
 * @author swChoi
 * @since 2019. 4. 18.
 */
function modernLawPop_prd(key) {
	if (key == "1") {
		setCookie("modernLawPop", "prd_1", 1);
	}
	
	if (key == "7") {
		setCookie("modernLawPop", "prd_7", 7);
	}
	
	$(".modernLawPop").css("display","none");
}

/**
 * <pre>
 * 판례/해석례등 > 법령해석례에 중앙부처 법령 유권해석 팝업 추가
 * </pre>
 * @author swChoi
 * @since 2019. 6. 4.
 */
function expcLawPop_prd(key) {
	if(key == "1") {	//하루동안 보지 않기
		setCookie("expcLawPop", "prd1", 1);
	}
	if (key == "7") {	//일주일간 보지 않기
		setCookie("expcLawPop", "prd7", 7);
	}
	
	$(".expcLawPop").css("display","none");
}

/**
 * <pre>
 * 마우스 입력기
 * </pre>
 * @author hjyoun
 * @since 2019. 9. 9.
 */
function keyboardOpen(obj) {
	
	var makeChar = function(i, m, t) {
		var code = ((i * 21) + m) * 28 + t + 0xAC00;
		return String.fromCharCode(code);
	}

	var iChrIndex = function(chr) {
		var index = ((chr.charCodeAt(0) - 0xAC00) / 28) / 21;
		return parseInt(index);
	}

	var mChrIndex = function(chr) {
		var index = ((chr.charCodeAt(0) - 0xAC00) / 28) % 21;
		return parseInt(index);
	}

	var tChrIndex = function(chr) {
		var index = ((chr.charCodeAt(0) - 0xAC00) % 28);
		return parseInt(index);
	}

	// 초성 INDEX
	var indexI = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ];

	// 중성 Index
	var indexM = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];

	// 종성 Index
	var indexT = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ'
	      		, 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

	// 조합 INDEX
	var indexJComb1 = ['ㄳ', 'ㄵ', 'ㄶ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅄ'];
	var indexJComb2 = ['ㄱㅅ', 'ㄴㅈ', 'ㄴㅎ', 'ㄹㄱ', 'ㄹㅁ', 'ㄹㅂ', 'ㄹㅅ', 'ㄹㅌ', 'ㄹㅍ', 'ㄹㅎ', 'ㅂㅅ'];
	var indexMComb1 = ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ'];
	var indexMComb2 = ['ㅗㅏ', 'ㅗㅐ', 'ㅗㅣ', 'ㅜㅓ', 'ㅜㅔ', 'ㅜㅣ', 'ㅡㅣ'];

	// 호환용 한글 자음모음
	var jaCode = 'ㄱ'.charCodeAt(0);
	var jaCodeLast = 'ㅎ'.charCodeAt(0);
	var moCode = 'ㅏ'.charCodeAt(0);
	var moCodeLast = 'ㅣ'.charCodeAt(0);

	// 입력값 가져오기
	var chr = obj.value;
	
	var query = document.getElementById("query");
	var strValue = query.value;
	var startPos = query.selectionStart;
	var endPos = query.selectionEnd;
	var textStart = strValue.substring(0, startPos);
	var textEnd = strValue.substring(startPos, strValue.length);
	
	move_cursor(endPos);

	var chrCode = chr.charCodeAt(0);
	var isJa = jaCode <= chrCode && chrCode <= jaCodeLast;
	var isMo = moCode <= chrCode && chrCode <= moCodeLast;
	
	$('#query').focus();

	// 띄어쓰기
	if (chr == "space") {
		$('#query').val(textStart + " " + textEnd);
		move_cursor(startPos+1);
        if($("#query").val() != ""){
            $("#btn-textRemove").css("display","");
       }
		return;
	}
	
	// Backspace
	if (chr == "Bksp") {
		var selectText = strValue.substring(startPos, endPos);
		
		if (selectText != "")
		{
			if (startPos != 0)
				$('#query').val(textStart.substring(0, startPos) + textEnd.slice(endPos-startPos, textEnd.length));
			else
				$('#query').val(textStart.substring(0, startPos) + textEnd.slice(endPos, strValue.length));

			move_cursor(startPos);
			return;
		}
		else if (selectText == strValue) {
			$('#query').val("");
			move_cursor(startPos-1);
			return;
		}
		else if (startPos == 0) {
			move_cursor(startPos);
			return;
		}
		else {
			$('#query').val(textStart.slice(0, -1) + textEnd);
			move_cursor(startPos-1);
			if($("#query").val() == ""){
	         	$("#btn-textRemove").css("display","none");
	         }
			return;
		}
	}
		
	// 문자 입력
	if (textStart) {
		var lastChr = textStart.substring(textStart.length -1);
		var lastChrCode = lastChr.charCodeAt(0);
		if(jaCode <= lastChrCode && lastChrCode <= moCodeLast) {
			// 자음, 모음
			if (jaCode <= lastChrCode && lastChrCode <= jaCodeLast) {
				if (isMo) {
					var i = indexI.indexOf(lastChr);
					var m = indexM.indexOf(chr);
					var t = 0;
					var c = makeChar(i, m, t);
					$('#query').val(textStart.substring(0, textStart.length-1) + c + textEnd);
					move_cursor(startPos);
					return;
				}
			}
			else if (moCode <= lastChrCode && lastChrCode <= moCodeLast) {
			}
		}
		else if (lastChrCode >= 0xAC00 && lastChrCode <= 0xAC00 + 0x2BA4) {
			// 한글 
			var i = iChrIndex(lastChr);
			var m = mChrIndex(lastChr);
			var t = tChrIndex(lastChr);

			if (t == 0) {
				// 종성이 없는 경우
				if (isJa) {
					t = indexT.indexOf(chr);
					var c = makeChar(i, m, t);
					$('#query').val(textStart.substring(0, textStart.length-1) + c + textEnd);
					move_cursor(startPos);
					return;
				} 
				else if (isMo) {
					// 모음조합문자
					var chkChr = indexM[m] + chr;
					var combIndex = indexMComb2.indexOf(chkChr);
					if(combIndex!=-1) {
						var combChr = indexMComb1[combIndex];
						m = indexM.indexOf(combChr);
						var c = makeChar(i, m, t);
						$('#query').val(textStart.substring(0, textStart.length-1) + c + textEnd);
						move_cursor(startPos);
						return;
					}
				}
			}
			else {
				// 종성이 있는 경우
				if (isMo) {
					var tChr = indexT[t];

					// 조합문자일 경우 다시 쪼개기
					var combIndex = indexJComb1.indexOf(tChr);

					if (combIndex!=-1) {
						var partChr = indexJComb2[combIndex];
						t = indexT.indexOf(partChr[0]);
						tChr = partChr[1];
					}
					else {
						t = 0;
					}

					var c1 = makeChar(i, m, t);
					i = indexI.indexOf(tChr);
					if (i!=-1) {
						m = indexM.indexOf(chr);
						var c2 = makeChar(i, m, 0);
						$('#query').val(textStart.substring(0, textStart.length-1) + c1 + c2 + textEnd);
						move_cursor(startPos+1);
						return;
					}
				}
				else if (isJa) {
					// 자음조합문자
					var chkChr = indexT[t] + chr;
					var combIndex = indexJComb2.indexOf(chkChr);
					if (combIndex!=-1) {
						var combChr = indexJComb1[combIndex];
						t = indexT.indexOf(combChr);
						var c = makeChar(i, m, t);
						$('#query').val(textStart.substring(0, textStart.length-1) + c + textEnd);
						move_cursor(startPos);
						return;
					}
				}
			}
		}
	}
	
	if (searchFlag) {
		searchFlag = false;
		$('#query').val(chr);
	}
	else {
		$('#query').val(textStart + chr + textEnd);
		move_cursor(startPos+1);
	}
    if($("#query").val() != ""){
        $("#btn-textRemove").css("display","");
   }
}

/**
 * <pre>
 * 마우스 입력기 이용 시 커서 위치 설정
 * </pre>
 * @author hjyoun
 * @since 2019. 9. 9.
 */
function move_cursor(num) {
	var pos = num;
	var text = document.getElementById("query");
	
	if (text.setSelectionRange) {
		text.focus();
		text.setSelectionRange(pos, pos);
	}
	else if (text.createTextRange) {
		var range = text.createTextRange();
		range.move("character", pos);
		range.select();
	}
}

/**
 * <pre>
 * sns 공유하기 버튼 클릭시 _ 인망 (법령,자치법규,행정규칙,공공기관)
 * </pre>
 * @author hjsong
 * @since 2024. 2. 19.
 * @param gubun
 */
function snsShareLayer(gubun){
	var address = "";
	var $shareLayer = "";
	
	if(gubun == 15 || gubun == 16 || gubun == 17 || gubun == 18){//조문 공유일 경우
		$shareLayer = $('#shareJo').next().next();
	}else{//본문 공유일 경우
		if($('#schlPubRulOpBar').css('display')=='block'){
			$shareLayer = $('#share1').next().next();
		}else{
			$shareLayer = $('#share').next().next();
		}
	}
	
	if($(".shareLayer").css("display")=="none" || $("#share_popup").css("display")=="none" ){
		switch( gubun ) {
			case 1: // 법령
			case 15: //법령조문
				address = "https://www.law.go.kr/법령/";
				//제개정문,3단비교,신구법비교 
				address += $("#lsNm").val().replaceAll("&","%2526");
				if(gubun == 15){ //법령조문 공유일 경우 조문세팅
					address += "/(" + $("#efYd").val() + ","+ $("#ancNo").val() + "," + $("#ancYd").val() + ")/" ;
					if (joBrNo_selectValue != 0) {
						address +=  "제" + joNo_selectValue +"조의" + joBrNo_selectValue;
					} else {
						if(joNo_selectValue != 0){
							address += "제" + joNo_selectValue +"조";
						}else{
							// 0조가 선택되는 경우(대한민국 헌법 전문)
							address +=  "전문";
						}
					}
				}
				else{
					// 현행법령일 경우 공포번호와 공포일자를 세팅하지 않는다.
					if($("#nwYnValue").val() == "N") {
						address += "/" + "(" + $("#ancNo").val() + "," + $("#ancYd").val() + ")"; 
					}
				}
				break;
			case 10: // 영문법령
				address = "https://www.law.go.kr/영문법령/";
				address += $("#lsNm").val().replaceAll("&","%2526");
				// 현행법령일 경우 공포번호와 공포일자를 세팅하지 않는다.
				if($("#nwYnValue").val() == "N") {
					address += "/" + "(" + $("#ancNo").val() + "," + $("#ancYd").val() + ")"; 
				}
				break;
			case 11: // 조약
				address = "https://www.law.go.kr/조약/";
				address += $("#trtyNm").val().replaceAll("&","%2526");
				address += "/" + "(" + $("#trtyNo").val() + "," + $("#eftYd").val() + ")"; 
				break;
			case 2: // 행정규칙
			case 16: //행정규칙 조문
				address = "https://www.law.go.kr/행정규칙/";
				address += $("#addressNm").val().replaceAll("&","%2526").replaceAll("/", "").replaceAll("_","\"") + "/";
				address += "(" + $("#prmlNo").val() + "," + $("#prmlYd").val() + ")";
				if(gubun == 16){ //행정규칙조문 공유일 경우 조문세팅
					if (joBrNo_selectValue != 0) {
						address += "/제" + joNo_selectValue.replace("-0","") +"조의" + joBrNo_selectValue;
					} else {
						address +=  "/제" + joNo_selectValue.replace("-0","") +"조";
					}
				}
				break;
			case 3: // 자치법규
			case 17: //자치법규 조문
				var ancNo = $("#ancNo").val();
				if($("#gubun").val() != "ELIS"){
					ancNo = ancNo.replace(/(^0+)/, "");
				}
				address = "https://www.law.go.kr/자치법규/";
				address += $("#ordinNm").val().replaceAll("&","%2526") +"/";
				address += "(" + ancNo + "," + $("#ancYd").val() + ")";
				if(gubun == 17){ //자치법규 조문 공유일 경우 조문세팅
					if (joBrNo_selectValue != 0) {
						address += "/" + "제" + joNo_selectValue +"조의" + joBrNo_selectValue;
					} else {
						address += "/" + "제" + joNo_selectValue +"조";
					}
				}
				break;
			case 4: // 학칙공단
			case 18: //학칙공단 조문
				address = "https://www.law.go.kr/학칙공단/";
				address += $("#lsNm").val().replaceAll("&","%2526") + "/";
				address += "(" + $("#prmlNo").val().replace(" ","%20") + "," + $("#prmlYd").val() + ")";
				if(gubun ==18){ //학칙공단 조문 공유일 경우 조문세팅
					if (joBrNo_selectValue != 0) {
						address += "/제" + joNo_selectValue +"조의" + joBrNo_selectValue;
					} else {
						address +=  "/제" + joNo_selectValue +"조";
					} 
				}
				break;
			case 5: // 판례
				address = "https://www.law.go.kr/판례/";
				address += $("#precNm").val().replaceAll("&","%2526") + "/";
				address += "(" + $("#precNo").val().replace(" ","%20") + ")";
				break;
			case 6: // 결정례
				address = "https://www.law.go.kr/헌재결정례/";
				address += $("#detcNm").val().replaceAll("&","%2526") + "/";
				address += "(" + $("#detcNo").val().replace(" ","%20") + ")";
				break;
			case 7: //해석례
				address = "https://www.law.go.kr/법령해석례/";
				address += $("#expcNm").val().replaceAll("&","%2526") + "/";
				address += "(" + $("#expcNo").val().replace(" ","%20") + ")";
				break;
			case 8: //심판례
				address = "https://www.law.go.kr/행정심판례/";
				address += $("#deccNm").val().replaceAll("&","%2526") + "/";
				address += "(" + $("#deccNo").val().replace(" ","%20") + ")";
				break;
			case 9: {//위원회
				address = "https://www.law.go.kr/" + $("#cmtNmKor").val() + "/";
				address += $("#evtNm").val().replaceAll("&", "%2526") + "/";
				if ($("#cmtNmKor").val() === "국가인권위원회") {
					address = addDetailAddress(address, $("#evtNo").val(), $("#decsnYd").val());
				} else {
					if ($("#evtNo").val() != null && $("#evtNo").val() != "") {
						address = address + "(" + $("#evtNo").val().replace(" ", "%20") + ")";
					}
				}
				break;
			}
			case 12: {// 중앙부처 1차 해석
				address = "https://www.law.go.kr/중앙부처1차해석/";
				address += $("#cgmExpcNm").val().replaceAll("&", "%2526") + "/";
				address = addDetailAddress(address, $("#cgmExpcNo").val(), $("#cgmExpcYd").val());
				break;
			}
			case 13: { // 특별행정심판재결례
				address = "https://www.law.go.kr/";
				var trbClsCd = $("#trbClsCd").val();

				switch (trbClsCd) {
					case '360101':
						address += "조세심판재결례/";
						break;
					case '360102':
						address += "특허심판재결례/";
						break;
					case '360103':
						address += "해양안전심판재결례/";
						break;
					case '360105':
						address += "국민권익위원회심판재결례/";
						break;
					case '360106':
						address += "인사혁신처소청심사위원회심판재결례/";
						break;
				}

				address += $("#specialDeccNm").val() + "/";
				address = addDetailAddress(address, $("#specialDeccNo").val(), $("#rlsYd").val());
				break;
			}
			case 14: {// 전체!
				var trbClsCd = $("#trbClsCd").val();

				var urlPostfix = "행정심판례/";
				if (trbClsCd) {
					switch (trbClsCd) {
						case '360101':
							urlPostfix = "조세심판재결례/";
							break;
						case '360102':
							urlPostfix = "특허심판재결례/";
							break;
						case '360103':
							urlPostfix = "해양안전심판재결례/";
							break;
						case '360105':
							urlPostfix = "국민권익위원회심판재결례/";
							break;
						case '360106':
							urlPostfix = "인사혁신처소청심사위원회심판재결례/";
							break;
					}
				}
				if (trbClsCd) {
					urlPostfix += $("#specialDeccNm").val().replaceAll("&", "%2526") + "/";
					urlPostfix = addDetailAddress(urlPostfix, $("#specialDeccNo").val(), $("#rlsYd").val());
				} else {
					urlPostfix += $("#deccNm").val().replaceAll("&", "%2526") + "/";
					urlPostfix += "(" + $("#deccNo").val().replace(" ", "%20") + ")";
				}
				address = "https://www.law.go.kr/" + urlPostfix;
				break;
			}
			case 19:
				address = "https://www.law.go.kr/감사원사전컨설팅의견서/" + el('pvcsNm').value.replaceAll('&', "%2526");
				address = addDetailAddress(address, el('recNo').value, el('rplYd').value);
				break;
		}
		if( gubun == 16 || gubun == 17 ||gubun == 18){ //법령외 조문 공유일 경우
			$shareLayer.css('top', $('#joSelectLayer').offset().top);
			$shareLayer.css('left', $('#joSelectLayer').offset().left+ 150);
		}else if(gubun == 15){
			$shareLayer.css('top', $('#joSelectLayer').offset().top);
			
			if ($(csmLnkNbspBar).css("display") !== "none") {//생활법령 있는경우
				$shareLayer.css('left', $('#joSelectLayer').offset().left+ 240);
			}
			else{//생활법령 없는경우
				$shareLayer.css('left', $('#joSelectLayer').offset().left+ 170);
			}
		}else if(gubun == 4){ //공공기관 규정이 그밖의 정보로 빠지면서 top레이어 수정
			$shareLayer.css('left', $(window).width()-130);
			$shareLayer.css('top', 266);
		}else{
			$shareLayer.css('left', $(window).width()-130);
		}
		$shareLayer.show();
			
		var div = document.getElementById('shareLayer');
			
		$('.snsAddress').attr("value",address);
	}else{
		$shareLayer.hide();
	}
	$shareLayer.attr("tabindex",0).focus();
}

//sns공유하기 - 카카오
function shareOnKakao(){
	if(!Kakao.isInitialized()){
		Kakao.init('af1ea5a28990429acf91a94d3675b893');
	}

	var url = $('.snsAddress').val();
	var ttlSplit = url.split('/');
	
	var description = ttlSplit[3];
	var title = ttlSplit[4];
	
	if(title.length > 200){
		title.substr(0, 150);
	}
	
	var ttlText = "["+ description + "]\n" + title;
	if(ttlSplit.length >=7){
		ttlText += " "+ttlSplit[6];
	}
	Kakao.Share.sendDefault({
	    objectType: 'feed',
	    content: {
	      title: ttlText, 
	      imageUrl: 'https://www.law.go.kr/LSW/images/common/shareKakao.png', // 콘텐츠 URL
	      link: {
	         mobileWebUrl: url,
	         webUrl: url
	      }
	    },
	});
}

//sns공유하기 - 라인
function shareOnLine(){
	var sendUrl = $('.snsAddress').val();
	var snsSumamry = "국가법령정보센터 공유하기 서비스";

	// url 셋팅      -- 라인은 띄어쓰기가 있을때 링크가 짤리는 현상이 있어 띄어쓰기 제거  (2024-05-22)
	var params = "url=" + encodeURIComponent(sendUrl.replaceAll(" ", "")) +"&text=" + snsSumamry;
	var url = "https://social-plugins.line.me/lineit/share?"+ params;
	window.open(url, "_blank");
}

//sns공유하기 - 트위터 
function shareOnTwitter() {
	var sendUrl = $('.snsAddress').val();
	var sendText = "국가법령정보센터 공유하기 서비스\n"; 
	window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
}

//sns공유하기 - 페이스북
function shareOnFacebook() {
	var sendUrl = $('.snsAddress').val();
	window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
}

//공유 - url복사
function shareUrl(){
	var url = $('.snsAddress').val().replaceAll(" ","");
	var textarea = document.createElement('textarea');
	document.body.appendChild(textarea);
	textarea.value=url;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("URL이 복사되었습니다.");
}

function addDetailAddress(address, dataNo, dataYd) {
	function isNullOrEmpty(data) {
		if (data == null || data === "") {
			return true;
		}
		return false;
	}

	if (isNullOrEmpty(address) || isNullOrEmpty(dataNo)) {
		return address;
	}
	if (isNullOrEmpty(dataYd)) {
		return address + "(" + dataNo + ")";
	}
	return address + "/(" + dataNo+ ", " + dataYd + ")";
}

/**
 * <pre>
 * sns 조문 공유하기 버튼 클릭시 어떤 조문인지 체크 (법령,자치법규,행정규칙,공공기관)
 * </pre>
 * @author jhlee
 * @since 2025. 6. 27.
 * @param 
 */
function snsShareLayerCheck(){
	//조문 공유일 경우 어떤 조문 공유인지 체크
	if (el("admRulSeq")) {//행정규칙
		snsShareLayer(16);
	}else if (el("ordinSeq")) {//자치법규
		snsShareLayer(17);
	}else if(el("schlPubRulSeq")) {//학칙공단
		snsShareLayer(18);
	}else{ //법령
		snsShareLayer(15);
	}
}

//챗봇 버튼 클릭 시 챗봇 레이어 보여주기
function chatBotPop(){
	//챗봇 열기
	if($('#chatPopWrap').css('display')=='none' ){
		var now = new Date();
		var hours = now.getHours();
		var minutes = String(now.getMinutes()).padStart(2, '0');
		var times ="";
		if(hours >=13){
			times +="오후 "+(hours-12)+":"+minutes;
		}
		else if(hours == 12 ){
			times +="오후 "+(hours)+":"+minutes;
		}
		else{
			times +="오전 "+hours+":"+minutes;
		}
		
		$("#frstChatTime").html(times);
		document.getElementById('chatPopWrap').style.display = 'block';
	}
	else if($('#chatPopWrap').css('display')=='block'){
		var chatUl = $("#chatUl");
		var chatMsg = $(".chatMsg");
		chatMsg.not("#firstChat").remove();
		
		document.getElementById('chatPopWrap').style.display = 'none';
	}
}

// 챗봇 - 이미지 윈도우 팝업 열기
function openImagePopup(imageUrl) {
	var width = 800; // 팝업 창 너비
	var height = 600; // 팝업 창 높이
	var left = (window.screen.width - width) / 2;
	var top = (window.screen.height - height) / 2;
	window.open(imageUrl, '_blank', 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
}

// 챗봇 질문 카테고리 클릭 시 질문 리스트 조회
function getChatBotQuestions(gubun,obj){
	var addChatText = "";
	var objText = obj.innerText;
	var now = new Date();
	var hours = now.getHours();
	var minutes = String(now.getMinutes()).padStart(2, '0');
	var times ="";
	var chatInner = document.getElementById("chatInner");
	
	if(hours >=13){
		times +="오후 "+(hours-12)+":"+minutes;
	}
	else if(hours == 12){
		times += "오후 "+(hours)+":"+minutes;
	}
	else{
		times += "오전 "+hours+":"+minutes;
	}
	
    $.ajax({
        type : 'POST',
        url : "getChatBotQuestions.do",
        block : true,
        data : {gubun : gubun},
        success : function(data) {
        	addChatText ='<li class="chatMsg">';
        	addChatText +='<div class="chatThumb">';
        	addChatText +='<img src="images/main/img_chatbot_thumb.png" alt="AI 챗봇"></div>';
        	addChatText +='<div class="chatCont">';
        	addChatText +='<span class="info">'+objText+'에 관한 자주하는 질문 입니다.</span><br>';
        	addChatText +='<ul class="qnaList">';
        	data.forEach(function(item,i){
        		addChatText +='<li>';
        		addChatText +='<a href="javascript:void(0)"onclick="javascript:addChat(this,'+item.brdSeq+');">'+item.ttl+'</a>';
        		addChatText +='</li>';
        	});
        	addChatText +='</ul></div>';
        	
        	addChatText +='<span class="chatDate">'+times+'</span>';
        	addChatText +='</li>';
        	
        	$("#chatUl").append(addChatText);
        	
        	//스크롤 제일 하단으로 내리기
        	chatInner.scrollTo({
        		top: chatInner.scrollHeight,
        		behavior : 'smooth'
        	});

        },error : function(xhr, st, err){
            alert("오류");
        }
    });
}

//챗봇 질문 클릭 시 답변 조회
function addChat(obj, seq){
	var addChatText = "";
	var objText = obj.innerHTML;
	var now = new Date();
	var hours = now.getHours();
	var minutes = String(now.getMinutes()).padStart(2, '0');
	var times ="";
	var chatInner = document.getElementById("chatInner");
	if(hours >=13){
		times +="오후 "+(hours-12)+":"+minutes;
	}
	else if(hours == 12 ){
		times +="오후 "+(hours)+":"+minutes;
	}
	else{
		times +="오전 "+hours+":"+minutes;
	}
	
	addChatText ="<li class=\"chatMsg rt\">";
	addChatText +="<div class=\"chatCont\">"+objText+"</div>";
	addChatText +="<span class=\"chatDate\">"+times+"</span>";
	addChatText +="</li>";
	
	$("#chatUl").append(addChatText);
	
	//답변 가져오기
	$.ajax({
        type : 'POST',
        url : "getChatBoAnswer.do",
        block : true,
        data : {seq : seq},
        success : function(data) {
        	var cts = data.cts;
        	addChatText ='<li class="chatMsg">';
        	addChatText +='<div class="chatThumb">';
        	addChatText +='<img src="images/main/img_chatbot_thumb.png" alt="AI 챗봇"></div>';
        	addChatText +='<div class="chatCont" id="'+data.brdSeq+'">'+cts;
        	addChatText +='</div>';
        	
        	addChatText +='<span class="chatDate">'+times+'</span>';
        	addChatText +='</li>';
        	
        	$("#chatUl").append(addChatText);
        	
        	//스크롤 제일 하단으로 내리기
        	requestAnimationFrame(function(){
	        	chatInner.scrollTo({
	        		top: chatInner.scrollHeight,
	        		behavior : 'smooth'
	        	});
        	});
        },error : function(xhr, st, err){
            alert("오류");
        }
    });
}