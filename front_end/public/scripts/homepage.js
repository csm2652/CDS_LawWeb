/**
 * Created by rlawk on 2017-08-31.
 */
function home_block1(){
    var allData = { "page": 1, "kind": 1 };//page: 클릭한 페이지, kind:(부동산1, 형법2, 민법3)
    $.ajax({
        url:"/board",//url 넣으셍s
        type:'GET',
        data: allData,
        success:function(data){
            alert("완료!");
            window.location.href='/board?page=1&kind=1';
            self.close();
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert("에러 발생~~ \n" + textStatus + " : " + errorThrown);
            self.close();
        }
    });
}

    //window.location.href = '/board?page=1&kind=1';

function home_block2(){
var allData = { "page": 1, "kind": 2 };//page: 클릭한 페이지, kind:(부동산1, 형법2, 민법3)
    $.ajax({
        url:"/board",//url 넣으셍
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

function home_block3(){
var allData = { "page": 1, "kind": 3 };//page: 클릭한 페이지, kind:(부동산1, 형법2, 민법3)
    $.ajax({
        url:"/board",//url 넣으셍
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
