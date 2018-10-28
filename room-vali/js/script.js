$(document).ready(function () {
    M.AutoInit();

    function eventBind() {
        $(document).change(function () {
            var all = $("#myForm").serializeArray();
            console.log(all);
        });
        $(".checkAll1").click(function () {
            if ($(".checkAll1").prop("checked")) { //如果全選按鈕有被選擇的話（被選擇是true）
                $("input[name='room-checkbox[]']").prop("checked", true); //把所有的核取方框的property都變成勾選
                $(".checkAll2").prop("checked", true);
            } else {
                $("input[name='room-checkbox[]']").prop("checked", false); //把所有的核取方框的property都取消勾選
                $(".checkAll2").prop("checked", false);
            }
        })
        $(".checkAll2").click(function () {
            if ($(".checkAll2").prop("checked")) { //如果全選按鈕有被選擇的話（被選擇是true）
                $("input[name='room-checkbox[]']").prop("checked", true); //把所有的核取方框的property都變成勾選
                $(".checkAll1").prop("checked", true);
            } else {
                $("input[name='room-checkbox[]']").prop("checked", false); //把所有的核取方框的property都取消勾選
                $(".checkAll1").prop("checked", false);
            }
        })
    }
    eventBind();

    function getData() {
        $(`#table-content`).html(`<h4 class="grey-text text-darken-2">載入中...</h4>`);
        $.ajax({
            url: `https://xn--pss23c41retm.tw/api/reservation/book/管理學院`,
            type: "GET",
            success: function (result) {
                console.log(result);
                render(result);
            },
            error: function (error) {
                console.log("error:", error);
                $(`#table-content`).html(`<h4 class="red-text text-darken-2">伺服器發生錯誤，請稍後再試</h4>`);
            }
        });
    }
    getData();

    function render(result) {
        var str = "";
        for (const key in result) {
            const element = result[key]; // 11-30
            for (const inner_key in element) {
                const inner_element = element[inner_key];
                for (const final_key in inner_element) {
                    var final_element = inner_element[final_key];
                    console.log(final_element);
                    str += `
                    <tr>
                        <td>
                            <label>
                                <input type="checkbox" name="room-checkbox[]" value="${final_key}" />
                                <span>　</span>
                            </label>
                        </td>
                        <td>${key}</td>
                        <td>${final_element.start.slice(0, 10)}</td>
                        <td>${final_element.start.slice(11, 16)}</td>
                        <td>${final_element.end.slice(11, 16)}</td>
                        <td>${final_element.name}</td>
                        <td>${final_element.type == "inside"? "校內用途: " + final_element.title:"校外用途: " + final_element.title}</td>
                        <td>${final_element.repeat_type != ""? final_element.repeat_type:"無"}</td>
                    </tr>
                    `;
                }
            }
        }
        $(`#table-content`).html(str);
    }
});