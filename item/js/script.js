$(document).ready(function () {
    M.AutoInit();

    function getData() {
        $(`#table-content`).html(`<h4 class="grey-text text-darken-2">載入中...</h4>`);
        $.ajax({
            url: `https://xn--pss23c41retm.tw/api/item`,
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
                        <td>${final_key}</td>
                        <td>${final_element.type}</td>
                        <td>${final_element.itemName}</td>
                        <td class="${itemStatus(final_element.state)}">${final_element.state}</td>
                        <td>hahaha</td>
                        <td>hahaha</td>
                        <td>
                            <a href="#" class="btn-text-blue">修改</a>
                            <a href="#" class="btn-text-red">刪除</a>
                        </td>
                    </tr>
                    `;
                }
            }
        }
        $(`#table-content`).html(str);
    }

    function itemStatus(state){
        return state == "已借出"? "status-text-black":"status-text-green";
    }
});