var csmJoNo = "";
var LsOneLookArray = [];
/**
 * <pre>
 * 	법령 UPDATE (검색 버튼으로 조회 & 법령 목록 클릭 후 본문 검색 & 팝업 조회)
 * 	history :
 * 				2017.12.27. 법령 팝업이면서 본문 호출이 아닐 경우 loadMask 해제 하지 않음
 *      		2019. 03. 06. [#13589] 법령 본문 제명 폰트 관련 개선요청 -> 본문 영역에만 처리 되도록 변경
 *				2019. 03. 28. [#13843] 대한민국헌법 3단비교 오류 확인
 *				2019. 04. 04. [#13908] 근대법령 상단 버튼 정리요청
 *				2019. 09. 05. [#16536] 법령명/본문 탭 키워드 강조표시 개선
 *				2020. 03. 12. [#18719] 시행예정조문 폰트색 강조표시 개선
 *				2020. 10. 15. [#21183] HTML 타이틀 법령명 표시 요청
 *				2021. 03. 18. [#23813] 생활법령 버튼 조문 앞으로 이동 요청    
 *				2021. 04. 22. [#24284] 예정 조문 표시 오류 확인
 *				2021. 06. 23. [#24853] 타이틀 순서 변경 요청
 *				2021. 09. 16. [#25453] 한눈에 보는 법령정보 테스트 서버에 적용 요청
 * 				2021. 12. 09. [#26278] 법령 전체 목록에서 표시 건수를 변경시 본문이 열리는 현상 개선
 * 				2022. 05. 26. [#29700] 법령 본문 조문선택 버튼 개선
 *			    2023. 10. 26. [#33596] 검색어가 입력된 상태에서 본문을 열면 화면내 검색 레이어가 열리도록 요청
 *			    2023. 11. 16. [#33775] 화면내 검색 기능 원복 처리
 *			    2023. 12. 22. [#33961] 띄어쓰기 없는 기본법 다운로드 서비스 추가
 * 				2024. 02. 15. [#34211] 대한민국헌법 전문앞에 체크박스 추가 요청
 * 				2024. 09. 26. [#35318] 법령 본문 TTS 기능 추가
 * 			    2025. 07. 23. [#37142] 웹 접근성 보완 요청
 * </pre>
 * @author brKim
 * @since 2017. 6. 1.
 * @param divLayId
 * @param urlName
 * @param parameter
 * @param mode
 */
function fUpdateFast(divLayId, urlName, parameter, mode) {
	
	// 목록 클릭 시 레이아웃 값 전달
	layoutLoadMask(divLayId);
    
    // 초기화 실행 화면단
    lsDpInitialize();
	
    if (parameter.indexOf("_") > 0) {
	    
       if (urlName == 'lsInfoR.do' && parameter.indexOf("_") > 0) {
            urlName = "lsEfInfoR.do";
            lsVO.openPopValue.lsJoEfYdSeq = parameter.split("_")[1];
            parameter = parameter.replace("_","&lsJoEfYdSeq=");
            parameter += "&nwJoYn=1";
            lsVO.openPopValue.lsEfYn = true;
            lsVO.openPopValue.lsEfSeq = parameter;
        } else if (urlName == 'lsOutPutLayer.do' && parameter.indexOf("_") > 0) {
            lsVO.openPopValue.lsJoEfYdSeq = parameter.split("_")[1];
            parameter = parameter.replace("_","&lsJoEfYdSeq=");
            parameter += "&nwJoYn=1";
            lsVO.openPopValue.lsEfYn = true;
            lsVO.openPopValue.lsEfSeq = parameter;
        } else {
            lsVO.openPopValue.lsEfYn = false;
            lsVO.openPopValue.lsEfSeq = "";
        }
    }
    
    $.ajax({
    	
    	url: 		urlName
 	   ,timeout:	240000 // 240 seconds
 	   ,data:		parameter
 	   ,dataType:	"html"
 	   ,method:		"POST"
 	   ,success: 	function(responseText) {
			 	   		
 		   lsVO.openPopValue.lsJoRltDpYn = ""; // 조문내용 컨텐츠 조회여부 초기화
 		   lsVO.bdyUpdValue.updateContentNm = mode;
 		   lsVO.bdyType = mode; // 법령 본문 컨텐츠 명 인쇄시 사용
 		   joTreeValueDel();
          
 		   try {
	            
 			   $("#bodyContentTOP").css('display', 'block');
 			   $("#bodySideContent").css('display', 'none'); 
              
 			   try {
 				   
 				   LsPopLayer.closeLsStpLayer();
                  
 			   }catch(e){}
               
 		   }catch(e){
 			   logger.error(e);
 		   }
 		   
 		   $('#' + divLayId).html(responseText);

			//IE 일때 음성지원 X IE가 아닐때는 버튼 보여주기
			var isIE = navigator.userAgent.indexOf("Trident") > -1 || navigator.userAgent.indexOf("MSIE") > -1;
			if(!isIE){
				$("#lsTtsBtn").show();
			}

            //한눈보기
            oneViewDispalYn();

            //원문다운로드(민법,상법,형법)
            oriTxtDispalYn();

 		  compareJotext(); // 시행예정 조문 내용비교
 		  
 		   // wide -> list 본문 보여줄 때
 		 if(typeof nonListGubun != 'undefined'){
 			 if (gIsWide == "wide" && !nonListGubun) {
 				 listChange("wide");
 			 }
 			 nonListGubun = false;
 		 }else{
 			 if (gIsWide == "wide") {
 				 listChange("wide");
 			 } 			 
 		 }
 		   
 		   if (publicLine) {
 			   if(el("wmvfile")) {
 				   el("wmvfile").style.display = "";
 			   }
 		   }
          
 		   // 부칙 클릭 시 부칙 위치로 그 외에는 최상단으로 이동
 		   if (tabMenuIdx == '5') {
 			   // goLsAr();
 		   } else {
 			   $("#viewwrapCenter").scrollTop(0);
 		   }
          
 		   if (lsVO.lsValue.lsiSeq != "") {
 			   lsVO.lsValue.ancYd = $("#ancYd").val();
 			   lsVO.lsValue.ancNo = $("#ancNo").val();
 			   lsVO.lsValue.lsNm = $("#lsNm").val();
 		   }
 		   
 		   // 본문일 경우에만 조문바로가기 버튼을 보여준다.
		   eventObj.topBtn.getViewBtn({
			   id: 'lsJoMoveDiv'
			   ,dpYnFunc: function() {
				   return mode == "lsBdy";
			   }
		   });
 		   
 		   // 목록 보여주기
 		   if (mode == 'lsBdy') {
 			   
 			   // 타이틀명에 법령명을 넣어줌
 			   if (subMenuIdx != '0') {
				   var titleName = "";
				   var lsTitle = $("#lsNm").val();	// 법령명

				   $('.sub_menu .sub_menu_inp > input').each(function() { // 서브 메뉴명 (라디오)
					   if($(this).is(':checked')) {
						   titleName += $("label[for='" + $(this).attr('id') + "']").find('a').html();
					   }
				   });

				   titleName += " > " + $('ul.sub_tab > li.on > a').html(); // 서브 탭명

				   if(lsTitle.length > 0){
					   titleName += " > " + lsTitle + " | 국가법령정보센터";
				   }else{
					   titleName += " | 국가법령정보센터";
				   }

				   $(document).attr('title',titleName);

 			   }
 			   
 			   setPopValue("lsInfoP");  // 새창 url저장
 			   
 			  if (isAsGubun == "IS") { //인터넷망에서만 생활법령 버튼 표시
 				  $(".csmLnkImg").show();
 			  }
 			   
 			   // 연혁 및 별표/서식이 없을 경우 숨기기
 			   eventObj.topBtn.getViewBtn({
 				   id: 'hstView'
 				  ,dpYnFunc: function() {
 					  return $('#hstLnkDpYn').val() == '0';
 				  }
 			   },{
 				   id: 'bylView'
 				  ,dpYnFunc: function() {
 					 return $('#bylLnkDpYn').val() == '0';
 				  }
 			   });
 			   
				// 대한민국헌법은 3단비교 버튼을 숨김
				if($('#lsId').val() == '001444') {
					$('#thdLsView').css('display', 'none');
				}
 			   // 생활법령정보 연계할 데이터 가지고옴 법령본문은 가능
 	 		   if (publicLine) {
 	 			   csmLnkWrite($('#lsiSeq').val());
 	 		   }
 			   
 	 		   // 근대법령은 법령체계도와 법령비교 버튼, 버튼설명을 숨김
				var lsIdSub = $('#lsId').val().substr(0, 1);
				var result = "0";
				
				if("1" == lsIdSub || "2" == lsIdSub){
					result = "1";
				}
				
				if("1" == result){
					$('#lsStmdBtn').css('display', 'none');
					$('#lawCompare').css('display', 'none');
					$('.cont_icon').css('display', 'none');
				}
 	 		   
 			   // 근대법령 보기 버튼 , 공포법령 보기 버튼
 			   setMdaDP();
 			   
 			   var lsSOYn = 0;
              
 			   try {
 				   
 				   lsSOYn = lsSearchObj.param.idxList;
 				   
 			   } catch(e) {
 				   lsSOYn = 0;
 			   }
 			   
 			   try {
 				   if (lsSearchObj.param.q) {
 					   bodySearchAll(divLayId, lsSearchObj.param.q, "query","down","1");
 				   }
 			   } catch(e) {
 				   logger.error("fUpdate.js 에서 오류 ----->" + e ,1);
 			   }
 			   
 			   onclickJoHref(csmJoNo);
             
 			   /* 법령명 고정, 본문 스크롤 START */
 			   if (subMenuIdx != '0') { // 팝업일 경우에는 호출하지 않는다.
 				   customResize();
 			   }
 			   /* 법령명 고정, 본문 스크롤 END */
          }
                      
          if (arGoView != "") {
        	  
              if (el("bodyContentTOP").style.display != "none") {
            	  document.location.href = "#"+arGoView;
              } else {
            	  document.location.href = "#E"+arGoView;
              }
          	
              if(el("ar"+arGoView.substring(1,arGoView.length)).style.display != "") {
            	  arView("ar"+arGoView.substring(1,arGoView.length));
              }
              
              arGoView = "";
          }
          
          // 부칙 더보기 버튼 이미지 접기로 변환 처리
          var arSeqs = document.getElementsByName("arInf");
          for (var i = 0; i < arSeqs.length - 1; i++) { // arSeqs.length
        	  var arSeq = arSeqs[i].value;
        	  if($("#ar" + arSeq) != null) {
        		  $("#ar" + arSeq + "MrBtn").attr("src", "/LSW/images/button/btn_more_bu.gif");
        	  }
          }
          
          // 조문 바로가기 SelectBox에 대한 조문 내용 추가
		  lsJoMoveContent();
          
          if (lsVO.openPopValue.popCls == "thdCmpScP") {
              thdLsView1('lawPop');
          } else if (lsVO.openPopValue.popCls == "thdCmpNewScP") {
              thdLsNewView('lawPop');
          } else if (lsVO.openPopValue.popCls == "lsOldAndNew") {
              sideInfo('lsOldAndNew');
          } else if (lsVO.openPopValue.popCls == "lsRvsDocInfoR") {
              sideInfo('lsRvsDocInfoR');
          } else if (lsVO.openPopValue.popCls == "engLsInfoR") {
              sideInfo('engLsInfoR', '', 'N');
          } else if (lsVO.openPopValue.popCls == "lsRvsOnlyDocInfoR") {	// 제개정문만
              sideInfo('lsRvsOnlyDocInfoR');
          } else if (lsVO.openPopValue.popCls == "lsRvsOnlyRsnInfoR") { // 제개정이유만
        	  sideInfo('lsRvsOnlyRsnInfoR');
          } else if (lsVO.openPopValue.popCls == "lsPtnThdCmp") {
        	  lsPtnThdCmpView('lawPop');
          }
          
          // 최신법령을 탭일때 최초에 데이터 넘어감 임의의 인자값 lsRvsDocInfoRe로 처리 (lsSc.jsp에서 정상적인 인자값으로 가공처리)
          if (lsVO.lsValue.nwLsIncRvs != "" && lsVO.lsValue.nwLsIncRvs != null) {
          	sideInfo('lsRvsDocInfoRe');
          }

          if (mode == "lsJoAllBdy"){ // 일단 조문 내용만 적용(화면내 검색어컬러 적용)
        	  
        	  try {
        		  if (lsSearchObj.param.q != "" || lsSearchObj.param.q != null) {
        			  bodySearchAll(divLayId, lsSearchObj.param.q, "query","down","1", "pass");
        		  }
        	  } catch(e) {
        		  logger.error(divLayId + "화면내검색에서 오류 ----->" + e ,1);
        	  }	   				
          }
          
          /* 위임자치법규 버튼 여부 조회 **/
          if ($("#nwYnValue").val() == "Y") { // 현행법령만적용
				
        	  // 위임자치법규
        	  try {
    			  eventObj.topBtn.getViewBtn({
    				  id: 'unOrdinLnkBtn'
       				 ,dpYnFunc: function() {
       					  return $("#lumIsConOrdin").val() == "Y";
       				  }
    			  },{
    				  id: 'unOrdinLsLnkBtn'
       				 ,dpYnFunc: function() {
       					  return $("#lumIsConOrdin").val() == "Y";
       				  }
    			  });
    			  
    			  var obj = document.getElementById("unOrdinLnkBtn");
    			  var ret = new Object();
    			  var rect = obj.getBoundingClientRect(); 
    			  var leftObj = leftListWidthGet();
				  ret.left = rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft);
        	  }catch(e){}
          } 
          /* LUM 위임자치법규 버튼 여부 조회 */
          
          if (!lsVO.openPopValue.popCls) { // 본문 조회 외에는 마스크를 후에 숨긴다.
        	  layoutUnMask(divLayId);
          }
          
          /* 자치법규 상위법령 조요청 */
          var target = $("#target").val();
          
          if (target == 'N') {
        	  return;
          } else {
        	  focusMulti(target);
          }
          
		  if (isAsGubun == "IS") { //인터넷망에서만 생활법령 버튼 표시
			  $(".csmLnkImg").show();
		  }
          compareJotext(); // 시행예정 조문 내용비교
 	   }
       ,error:	function() {
    	   if (divLayId == 'bodyContent') {
				$('#'+divLayId).html("");
				$("#bodyContentError").css('display', 'block');
			}
    	   layoutUnMask(divLayId);
       }
    });
}

function onclickJoHref(csmJoNo){
    if(csmJoNo != ""){
        document.location.href = csmJoNo;
    }
    
    csmJoNo = "";
}
    
//좌측 목록 넓이 구해오기
function leftListWidthGet(){
	var rec = new Object();
	var leftObj = document.getElementById("lelistwrapLeft");
	if(leftObj != null){
		var rect = leftObj.getBoundingClientRect();
		rec.width = rect.right - rect.left
	}else{
		rec.width = 0;
	}
	
	return rec;
}

// 부칙 위치 이동 함수
function goLsAr() {
	var index = -1;
	var regExp = /제\d.{1,}&gt/i;
	var regExpYn = regExp.exec( arObj.html() );
	// 패턴이 있을 경우 if문 수행
	if(regExpYn) {
		
		regExpYn = new String( regExpYn.valueOf() );
		regExpYn = regExpYn.replace("&gt","");
		// 모든 부칙의 제 몇호를 체크하여 포함이 되는 경우 해당 인덱스 반환
		$("#arDivArea div span.sfon").each(function(idx){
			
			var temp = $(this).html();
			temp = temp.replaceAll("&nbsp;","");
			if( temp.indexOf(regExpYn) > -1 )
				index = idx;
		});
	}
	
	// 부칙 상세일 경우
	if( index > -1 ) {
		// 해당 부칙 명의 id를 부여하여 그 위치로 이동
		$("#arDivArea div span.sfon:eq("+index+")").attr("id","goId");
		focusMulti("goId");
	}else {
		// 부칙 상세가 아니라 법령 클릭할 경우
		focusMulti("arDivArea");
	}
}

// 조문 바로가기 Content 설정
function lsJoMoveContent(){
	// option 값 초기화
	$("#lsJoMove").empty();
	$("#lsJoMove").append("<option class='btn' value =''>조문선택</option>");
	var lsJoMaxLength = 15;
	// 조문 앞 SelectBox를 이용한 조번호설정
	$("input[name='joNoList']").each(function(index){
		
		// value -> 1조 : 1:0, 13조의2 : 13:2 형식
		var joText = $(this).val();
		var joArr = joText.split(":");
		
		var joNo = joArr[0];
		var joBrNo = joArr[1];
		var joIdFull = joArr[2];
		var joSeq = joArr[3];
		
		//1. 조문의 편장절관 존재여부 확인 후 먼저 append(20자 이내)
		var pjukLength = document.querySelectorAll("[data-joIdFull='"+joIdFull+"']").length;
		if( pjukLength  > 0 ){
			for(var i=0; i<pjukLength; i++){
				var pjukText = document.querySelectorAll("[data-joIdFull='"+joIdFull+"']")[i].textContent;
				var pjukSeq = document.querySelectorAll("[data-joIdFull='"+joIdFull+"']")[i].dataset.joseq;
				if( pjukText != null && pjukText != "" ){
					pjukText = pjukText.trim();
					if( pjukText.length > lsJoMaxLength ){
						pjukText = pjukText.substring(0, lsJoMaxLength)+"...";
					}
					var pjukTargetValue = "pjuk:"+pjukSeq
					$("#lsJoMove").append("<option class='btn' value ='"+ pjukTargetValue +"'>&nbsp;"+pjukText+"</option>");
				}
			}
		}
		
		//2. 조문 append
		var joStr = "제"+joArr[0]+"조";
		
		if(joBrNo != '0'){
			joStr += "의"+joArr[1];
		}		
				
		var lsJoIdFull = this.id;
		var joTitle = $("label[for='"+lsJoIdFull+"']").text();
		if( joTitle != undefined && joTitle != null ){
			if(joTitle.length > lsJoMaxLength){
				joTitle = joTitle.substring(0, lsJoMaxLength)+"...";
			}else if(joTitle == "" && lsJoIdFull == "Y000000"){
				joTitle = "전문"
			}
			joStr = joTitle;
		}
		
		//3. 삭제 된 조문의 경우 텍스트 비교 후 진행
		var delYnJoTitle = $("#delJo"+joSeq).val();
		if( delYnJoTitle != null && delYnJoTitle != "" ){
			delYnJoTitle = delYnJoTitle.replaceAll("\n", "").trim();
			if( delYnJoTitle == "삭제" ){
				joStr = $("label[for='"+lsJoIdFull+"']").parent().parent().text();
				if(joStr.length > lsJoMaxLength){
					joStr = joStr.substring(0, joStr.indexOf("<") ).trim();
				}
			}
		}
		
		// 내용 선택시 조문 이동 처리 value
		var targetValue = "J"+joText;
		if(joTitle == "전문"){
			targetValue = "JP"+joText;
		}
		
		$("#lsJoMove").append("<option class='btn' value ='"+ targetValue +"'>"+joStr+"</option>");
	});
	
	// 동적으로 생성된 Option에 대한 이벤트 처리
	$(document).delegate("#lsJoMove","change",function(event){
		var obj = new Object();
		obj.value = this.value.split(":")[0]+":"+this.value.split(":")[1];
		lsJoMove(obj);
	});
}

function compareJotext() {

    $("#conScroll div.pgroup.babl").each(function () {

        var afterObj = $(this); 		// 예정조문
        var nwObj = afterObj.prev(); 	// 현행조문

        if (typeof nwObj != 'undefined') {

            var afterP = afterObj.find('p');
            var nwP = nwObj.find('p');

            var after_hangNo = '';
            var after_hoNo = '';
            var after_mokNo = '';
            var after_semokNo = '';

            $(afterP).each(function (index) {

                var afterObjP = $(this);
                var afterText = $.trim(afterObjP.text());

                var hangPat = /^([①-⑮]|<([0-9]+)>)+/;
                var hoPat = /^(([0-9]+)*[의| ]*[ ]?([0-9]+)\.)/;
                var mokPat = /^([가-힝].)/;
                var semokPat = /^(([0-9]|[가-힝])+\))+/;

                var changeFlag = true;

                // 최초는 1항이 생략이므로 default 설정
                if (index == 0) {
                    after_hangNo = '①';
                }

                // 예정조문
                if (hangPat.test(afterText)) {
                    after_hangNo = RegExp.$1;
                    after_hoNo = '';
                    after_mokNo = '';
                    after_semokNo = '';
                } else if (hoPat.test(afterText)) {
                    after_hoNo = RegExp.$1;
                    after_mokNo = '';
                    after_semokNo = '';
                } else if (mokPat.test(afterText)) {
                    after_mokNo = RegExp.$1;
                    after_semokNo = '';
                } else if (semokPat.test(afterText)) {
                    after_semokNo = RegExp.$1;
                } else { // 기타이면서 index 가 0 이 아닐 경우 항 정보 초기화 [시행일], [본조신설]등
                    if (index != 0) {
                        return false;
                    }
                }

                afterText = afterText.replace(/<(개정|신설|본조신설)? ?([0-9]{4}. [0-9]{1,2}. [0-9]{1,2}.?,? ?)+>/g, '');
                afterText = afterText.replace(/ /g, '');
                afterText = afterText.replace(/·/g, 'ㆍ');
                afterText = afterText.replace(/(\[시행일:[0-9]{4}.[0-9]{1,2}.[0-9]{1,2}.\](제(\d{1,})조)?(([가-힣]+)|(\d+)|(\<.)).*)/, '');

                var nw_hangNo = '';
                var nw_hoNo = '';
                var nw_mokNo = '';
                var nw_semokNo = '';

                // 예정에는 존재하지만 현행에는 없는 것
                var afterExist = true;

                $(nwP).each(function (index) {

                    changeFlag = false;

                    if (index == 0) {
                        nw_hangNo = '①';
                    }

                    var nwText = $.trim($(this).text()); // 현행조문내용

                    // 현행 조문
                    if (hangPat.test(nwText)) {
                        nw_hangNo = RegExp.$1;
                        nw_hoNo = '';
                        nw_mokNo = '';
                        nw_semokNo = '';
                    } else if (hoPat.test(nwText)) {
                        nw_hoNo = RegExp.$1;
                        nw_mokNo = '';
                        nw_semokNo = '';
                    } else if (mokPat.test(nwText)) {
                        nw_mokNo = RegExp.$1;
                        nw_semokNo = '';
                    } else if (semokPat.test(nwText)) {
                        nw_semokNo = RegExp.$1;
                    } else {
                        if (index != 0) {
                            return true;
                        }
                    }

                    nwText = nwText.replace(/<(개정|신설|본조신설)? ?([0-9]{4}. [0-9]{1,2}. [0-9]{1,2}.?,? ?)+>/g, '');
                    nwText = nwText.replace(/ /g, '');
                    nwText = nwText.replace(/·/g, 'ㆍ');
                    nwText = nwText.replace(/(\[시행일:[0-9]{4}.[0-9]{1,2}.[0-9]{1,2}.\](제(\d{1,})조)?(([가-힣]+)|(\d+)|(\<.)).*)/, '');

                    if (after_hangNo == nw_hangNo && after_hoNo == nw_hoNo && after_mokNo == nw_mokNo && after_semokNo == nw_semokNo) {

                        afterExist = false;

                        if (nwText != afterText) {
                            changeFlag = true;
                            return false;
                        }
                    }
                });

                // 예정만 존재하거나 변경된 정보가 있을 경우
                if (afterExist || changeFlag) {
                    afterObjP.css('color', 'red');
                }
            });
        }
    });
}

    //한눈보기
    function oneViewDispalYn(){
        var urlName = "oneVIewDisplayYn.do";
        $.ajax({
            type		: 'POST',
            url			: urlName,
            block       : true,
            data		: {lsiSeq :$("#lsiSeq").val(), efYd :$("#efYd").val(), nwYn : $("#nwYnValue").val()},
            success		: function(data, st) {
            	if(data.historyOvYn == "" || data.historyOvYn == 'Y'){
            		//현행인 경우 또는 연혁일 시 property가 Y인 경우 한눈보기 버튼 생성 
                if(data.oneViewYn == 'Y'){
                    $("#oneViewBtn").show();
            			$(".oneView").each(function(){
            				$(this).css('text-decoration-line', 'none');
            				$(this).css('pointer-events', 'none');
            				$(this).css('cursor', 'default');
            				$(this).css("background-color", ""); 
            			});
            			if($("#oneviewChk").val() == 'on'){
            				showOneView($("#oneViewBtn"));
            			}
            		}else{
            			$("#oneViewBtn").hide();
            		}
                }else{
                    $("#oneViewBtn").hide();
                }
            },
            error : function(xhr, st, err){
            }
        });
    }

    //원문다운로드(민법,상법,형법)
    function oriTxtDispalYn(){
    	//var lsiSeq = $("#lsiSeq").val();
    	//var efYd = $("#efYd").val();
    	var lsId = $("#lsId").val(); //법령ID
    	var nwYn = $("#nwYnValue").val(); //현행여부

    	if((lsId == '001706' || lsId == '001702' || lsId == '001692') && nwYn == 'Y'){
    		//원문다운로드 경로 설정
    		if(lsId == '001706'){ //민법
    			$("#oriTxtBtn").prop("href", "flDownload.do?flSeq=135649163");
    		}else if(lsId == '001702'){ //상법
    			$("#oriTxtBtn").prop("href", "flDownload.do?flSeq=135649165");
    		}else if(lsId == '001692'){ //형법
    			$("#oriTxtBtn").prop("href", "flDownload.do?flSeq=135649167");
    		}
    		$("#oriTxtBtn").show();
    	}else{
            $("#oriTxtBtn").hide();
        }
    }
