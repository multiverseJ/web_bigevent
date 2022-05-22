$(function (){
    getUserInfo()
})
const layer = layui.layer;
function getUserInfo(){
    $.ajax({
        type: "GET",
        url:'/my/userinfo',
        // headers:{
        //     Authorization: localStorage.getItem("token"),
        // },
        success:(res)=>{
            console.log(res);
            if(res.status !== 0) return layer.msg('获取用户信息失败')
            layer.msg('获取用户信息成功')
            render(res.data)
        }
    })
}

$('#btnout').on('click',()=>{
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
})
const render = function(user){
    const name=user.nickname||user.username
    $('#welcome').html(`欢迎 ${name}`)
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic)
        $('.text-avatar').hide()
    } else {
        const firstname=name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(firstname).show()
    }
}
function change(){
    $('#art_list').addClass('layui-this').next().removeClass('layui-this')
  }