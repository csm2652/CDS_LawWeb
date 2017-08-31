/**
 * Created by rlawk on 2017-08-10.
 */
/**
 * Created by rlawk on 2017-07-29.
 */
var kinds;//어떤 법인지
var estateSize;
var crimSize;
var civilSize;
var db_nodes;//그법에 node 갯수

function init(a, b, c){
    kinds=1;//각각에 맞는 번호로 우선 넣기 (부동산1, 형법2, 민법3)

    estateSize = a;
    crimSize = b;
    civilSize = c;

    //배열 생성(node수)(6)
    if(kinds==1)
        db_nodes = new Array(estateSize);
    else if(kinds==2)
        db_nodes = new Array(crimSize);
    else
        db_nodes = new Array(civilSize);

    //Paging(전체데이타수,페이지당 보여줄 데이타수,페이지 그룹 범위,현재페이지 번호,token명)
    var page_viewList = Paging(127, 10, 10 ,1, "PagingView");
    $("#pageShow").empty().html(page_viewList);

}
// $(document).ready(function(){
//     var a = 123;//부동산 사건
//     var b = 32;//형법 사건
//     var c = 21;//민법 사건
//
//     kinds=1;//각각에 맞는 번호로 우선 넣기 (부동산1, 형법2, 민법3)
//
//     estateSize = a;
//     crimSize = b;
//     civilSize = c;
//
//     //배열 생성(node수)(6)
//     if(kinds==1)
//         db_nodes = new Array(estateSize);
//     else if(kinds==2)
//         db_nodes = new Array(crimSize);
//     else
//         db_nodes = new Array(civilSize);
//
//     //Paging(전체데이타수,페이지당 보여줄 데이타수,페이지 그룹 범위,현재페이지 번호,token명)
//     var page_viewList = Paging(127, 10, 10 ,1, "PagingView");
//     $("#pageShow").empty().html(page_viewList);
// });


// ==================================================================================================


Paging = function(totalCnt, dataSize, pageSize, pageNo, token){
    totalCnt = parseInt(totalCnt);// 전체레코드수
    dataSize = parseInt(dataSize); // 페이지당 보여줄 데이타수
    pageSize = parseInt(pageSize); // 페이지 그룹 범위 1 2 3 5 6 7 8 9 10
    pageNo = parseInt(pageNo); // 현재페이지
    var html = new Array();
    if(totalCnt == 0){ return ""; } // 페이지 카운트
    var pageCnt = totalCnt % dataSize;
    if(pageCnt == 0){
        pageCnt = parseInt(totalCnt / dataSize);
    }else{
        pageCnt = parseInt(totalCnt / dataSize) + 1;
    }
    var pRCnt = parseInt(pageNo / pageSize);
    if(pageNo % pageSize == 0){
        pRCnt = parseInt(pageNo / pageSize) - 1;
    }


    //이전 화살표
    if(pageNo > pageSize){
        var s2;
        if(pageNo % pageSize == 0){
            s2 = pageNo - pageSize;
        }else{
            s2 = pageNo - pageNo % pageSize;
        }
        html.push('<li class="paging_block text-center"><a class="paging_a text-center" href=javascript:goPaging_' + token + '("');
        html.push(s2);
        html.push('");>');
        html.push('◀');
        html.push("</a></li>");
    }else{
        html.push('<li class="paging_block text-center"><a class="paging_a text-center" href="#">\n');
        html.push('◀');
        html.push('</a></li>');
    }



    //paging Bar
    for(var index=pRCnt * pageSize + 1;index<(pRCnt + 1)*pageSize + 1;index++){
        if(index == pageNo){
            html.push('<li class="paging_block text-center"><a class="paging_a text-center"><strong>');
            html.push(index);
            html.push('</a></strong></li>');
        }else{
            html.push('<li class="paging_block text-center"><a class="paging_a text-center" href=javascript:goPaging_' + token + '("');
            html.push(index);
            html.push('");>');
            html.push(index);
            html.push('</a></li>');
        }
        if(index == pageCnt){
            break;
            }
        }


    //다음 화살표
    if(pageCnt > (pRCnt + 1) * pageSize){
        html.push('<li class="paging_block text-center"><a class="paging_a text-center" href=javascript:goPaging_' + token + '("');
        html.push((pRCnt + 1)*pageSize+1);
        html.push('");>');
        html.push('▶');
        html.push('</a></li>');
    }else{
        html.push('<li class="paging_block text-center"><a class="paging_a text-center" href="#">');
        html.push('▶');
        html.push('</a></li>');
    }
    return html.join("");
}
var goPaging_PagingView = function(cPage){
    var numberNode = 0;

    if(kinds == 1){
        numberNode = estateSize;
        alert(estateSize);
        alert(numberNode);
    } else if (kinds==2){
        numberNode = crimSize;
        alert(numberNode);
    } else {
        numberNode = civilSize;
        alert(numberNode);
    }
    var page_viewList = Paging(numberNode, 10, 10 ,cPage, "PagingView");
    $("#pageShow").empty().html(page_viewList);
//            *****************************엿다가 목록 박는 거임*********************************



    var allData = { "page": cPage, "kind": kinds };//page: 클릭한 페이지, kind:(부동산1, 형법2, 민법3)
    $.ajax({
        url:"",//url 넣으셍
        type:'GET',
        data: allData,
        success:function(data){
            alert("완료!");
            window.opener.location.reload();
            self.close();
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert("에러 발생~~ \n" + textStatus + " : " + errorThrown);
            self.close();
        }
    });

};
// ============================================================================================================================================

var slideIndex = 1;

showSlides(slideIndex);



function plusSlides(n){
    showSlides(slideIndex +=n);
    kinds+=n;
    if(kinds>3){kinds = 1;}
    if(kinds==0){kinds=3;}
    alert(kinds);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}





function showSlides(n) {
    var numberNode = 0;
     var i;
    var slides = document.getElementsByClassName("board_title");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";

    if(slideIndex == 1){
        numberNode = estateSize;
        alert(estateSize);
        alert(numberNode);
    } else if (slideIndex==2){
        numberNode = crimSize;
        alert(numberNode);
    } else {
        numberNode = civilSize;
        alert(numberNode);
    }

    var page_viewList = Paging(numberNode, 10, 10, 1, "PagingView");
    $("#pageShow").empty().html(page_viewList);

}


function go_read(object){
    var num = $(object).find("td").first().text();
    alert(num);
    var allData = { "number": num, "kind": kinds };//page: 클릭한 페이지, kind:(부동산1, 형법2, 민법3)
    $.ajax({
        url:"",//url 넣으셍
        type:'GET',
        data: allData,
        success:function(data){
            alert("완료!");
            window.opener.location.reload();
            self.close();
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert("에러 발생~~ \n" + textStatus + " : " + errorThrown);
            self.close();
        }
    });
}

