let loginId = '';
let loginPass = '';

//ログイン操作
$(function () {
    $("#loginButton").on("click", function () {
        //id/passが入力されているかどうか
        loginId = $("#id_data").val();
        loginPass = $("#password_data").val();

        if (loginId !== '' && loginPass !== '') {
            //for文で上部に記載のIDと合致するkeyを呼び出して、ローカルストレージを更新
            const localStorageLength = localStorage.length;
            let authenticated = false; // 認証フラグ
            let studentKey = ''; // 生徒の認証成功時に使用するキー
            let staffKey = ''; // スタッフの認証成功時に使用するキー

            for (let i = 0; i < localStorageLength; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const parsedValueId = parsedValue.newId;
                const parsedValuePass = parsedValue.newPassword;

                if (parsedValueId === loginId && parsedValuePass === loginPass) {
                    authenticated = true;
                    if (key.startsWith('staff_')) {
                        staffKey = key;
                    } else {
                        studentKey = key;
                    }
                    break; // 認証成功時にループを抜ける
                }
            }
            if (authenticated) {
                // ログイン成功時、スタッフか生徒かによってmypage.htmlかstaff.htmlに遷移
                if (staffKey !== '') {
                    window.location.href = 'staff.html?staffKey=' + staffKey;
                } else {
                    window.location.href = 'mypage.html?studentKey=' + studentKey;
                }
            } else {
                // 認証に失敗した場合、ポップアップを表示
                $("#alert").removeClass("hidden");
            }
        } else {
            // ポップアップを表示
            $("#alert").removeClass("hidden");
        }
    });
});

//アラート削除
$(function () {
    $("#returnButton").click(function () {
        // アラートメッセージを非表示にする
        $("#alert").addClass("hidden");
    });
});

$(document).ready(function () {
    $('.tab-link').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('.tab-link').removeClass('active');
        $('.tab-content').removeClass('active');

        $(this).addClass('active');
        $("#" + tab_id).addClass('active');
    });
});
