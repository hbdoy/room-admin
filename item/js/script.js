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
                            <a href="#" class="btn-text-blue" data-key="${final_key}">修改</a>
                            <a href="#" class="btn-text-red" data-key="${final_key}">刪除</a>
                        </td>
                    </tr>
                    `;
                }
            }
        }
        $(`#table-content`).html(str);
    }

    function itemStatus(state) {
        return state == "已借出" ? "status-text-black" : "status-text-green";
    }

    $("#addBtn").click(createItem);

    function createItem(e) {
        e.preventDefault();
        var formData = $("#myForm").serializeArray();
        console.log(formData);
        var bool = false;
        var formObj = {};
        for (const val of formData) {
            if (!valdateFormValue(val)) {
                bool = false;
                break;
            }
            formObj[val.name] = val.value;
            bool = true;
        }
        if (!bool) {
            alert("所有欄位皆須填寫");
        } else {
            console.log(formObj);
            $.ajax({
                url: `https://xn--pss23c41retm.tw/api/item/${formObj.itemDepart}/${formObj.itemRoom}`,
                type: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache"
                },
                data: JSON.stringify({
                    itemID: formObj.itemId,
                    itemName: formObj.itemName,
                    imgSrc: "https://imgur.com",
                    itemRule: formObj.itemRule,
                    type: formObj.itemType
                }),
                success: function (result) {
                    console.log(result);
                    alert("新增成功");
                },
                error: function (error) {
                    console.log("error:", error);
                    $(`#table-content`).html(`<h4 class="red-text text-darken-2">伺服器發生錯誤，請稍後再試</h4>`);
                }
            });
        }
    }

    function valdateFormValue(data) {
        var bool = false;
        switch (data.name) {
            case 'itemId':
            case 'itemRule':
            case 'itemName':
            case 'itemType':
            case 'itemDepart':
            case 'itemRoom':
                bool = data.value != "";
                return bool;
            default:
                return bool;
        }
    }
});