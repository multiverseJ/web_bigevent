$(function () {
  const layer = layui.layer;
  const form= layui.form;
  const initArtCateList = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取文章列表失败");
        layer.msg("获取文章列表成功");
        const htmlstr = template("tpl-table", res);
        $("tbody").html(htmlstr);
      },
    });
  };
  initArtCateList();

  let index= null;
  $("#btnAddCate").click(() => {
     index=layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#dialog-add').html()
    })
  
  });
  // 通过代理监听 submit 事件
$("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/my/article/addcates",
        data: $(this).serialize(),
        success: (res) => {
            if (res.status !== 0) return layer.msg("新增分类失败！");
            initArtCateList();
            layer.msg("新增分类成功！");
            layer.close(index);
        },
    });
});

let index1=null
$('tbody').on('click','.btn-edit',function(){
    index1=layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "修改文章分类",
        content: $("#dialog-edit").html(),
    });
    let id=$(this).attr('data-id');
    $.ajax({
        type: "GET",
        url:'/my/article/cates/'+id,
        success: (res) => {
            form.val("form-edit", res.data)
        }
    })
})

$('body').on('submit','#form-edit',function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url:'/my/article/updatecate',
        data:$(this).serialize(),
        success: (res) => {
            if (res.status !== 0) {
                return layer.msg("更新分类数据失败！");
            }
            layer.msg("更新分类数据成功！");
            layer.close(index1);
            initArtCateList();
        }
    })
})

// 删除文章分类
$("tbody").on("click", ".btn-delete", function () {
    const id = $(this).attr("data-id");
    // 提示用户是否删除
    layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
        $.ajax({
            method: "GET",
            url: "/my/article/deletecate/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("删除分类失败！");
                }
                layer.msg("删除分类成功！");
                layer.close(index);
                initArtCateList();
            },
        });
    });
});
});
