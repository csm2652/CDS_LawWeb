/**
 * Created by rlawk on 2017-08-31.
 */
function signIn(){
    var id=$('#uid').val();
    var pw=$('#pw').val();

    alert(id);
    var allData = { "uid": id, "pw": pw };

    $.ajax({
        url:"",//url 넣으셍
        type:'POST',
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