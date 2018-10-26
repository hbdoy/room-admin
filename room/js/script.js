$(document).ready(function () {
    M.AutoInit();
    $(document).change(function(){
        var all = $("#test").serializeArray();
        console.log(all);
    });
});