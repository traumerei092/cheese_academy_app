//画像ファイル登録時
$(document).ready(function () {
    $('#staffImage_data').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.file-label').text(fileName);
    });
});

//確認ボタンを押したら
$(function () {
    $("#confirmButton").on("click", function () {
        // フォームの内容を取得
        const username = $("#staffname_data").val();
        const id = $("#staffId_data").val();
        const age = $("#staffAge_data").val();
        const language = $("#staffLanguage_data").val();
        const password = $("#staffPass_data").val();

        // ポップアップの内容を更新
        $("#userConfirm").text(username);
        $("#idConfirm").text(id);
        $("#ageConfirm").text(age);
        $("#languageConfirm").text(language);
        $("#passwordConfirm").text(password);

        // ポップアップを表示
        $("#confirm").removeClass("hidden");
    });
});

//入力に戻る
$(function () {
    $("#returnAccount").click(function () {
        // ポップアップを非表示
        $("#confirm").addClass("hidden");
    });
});

//新規登録
$(function () {
    $("#createAccount").click(function() {
        // ポップアップを隠す
        $("#confirm").addClass("hidden");

        // フォームの内容を取得
        const username = $("#staffname_data").val();
        const id = $("#staffId_data").val();
        const age = $("#staffAge_data").val();
        const language = $("#staffLanguage_data").val();
        const password = $("#staffPass_data").val();
        const imageFile = $('#staffImage_data')[0].files[0];
        let imageUrl = "";

        // ローカルストレージをチェックして重複IDがないか確認
        let idExists = false;
        const localStorageLength = localStorage.length;
        for(let i = 0; i < localStorageLength; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            const parsedValue = JSON.parse(value);
            if(parsedValue.newId === id) {
                idExists = true;
                break;
            }
        }

        if (idExists) {
            // 重複IDがあった場合、エラーメッセージを表示
            alert("このIDは既に登録されています。別のIDを使用してください。");
            $("#confirm").addClass("hidden");
        } else {
            // 画像ファイルを読み込む
            if (imageFile) {
                const reader = new FileReader();
                reader.onloadend = function() {
                    imageUrl = reader.result;

                    // スタッフ情報のオブジェクト
                    const newStaff = {
                        newName: username,
                        newId: id,
                        newAge: age,
                        newLanguage: language,
                        newPassword: password,
                        newImage: imageUrl,
                    };

                    // ユニークキーを生成してローカルストレージに保存
                    function generateUniqueKey() {
                        return 'staff_' + Date.now();
                    }

                    let uniqueKey = generateUniqueKey();
                    localStorage.setItem(uniqueKey, JSON.stringify(newStaff));

                    // mypage.htmlに遷移
                    window.location.href = 'staff.html?staffKey=' + uniqueKey;
                };
                reader.readAsDataURL(imageFile);
            } else {
                // 画像が選択されていない場合
                const newStaff = {
                    newName: username,
                    newId: id,
                    newAge: age,
                    newLanguage: language,
                    newPassword: password,
                    newImage: imageUrl,
                };

                // ユニークキーを生成してローカルストレージに保存
                function generateUniqueKey() {
                    return 'staff_' + Date.now();
                }

                let uniqueKey = generateUniqueKey();
                localStorage.setItem(uniqueKey, JSON.stringify(newStaff));

                // staff.htmlに遷移
                window.location.href = 'staff.html?staffKey=' + uniqueKey;
            }
        }
    });
});