//新規入学者の変数
let username = $("#username_data").val();
let id = $("#id_data").val();
let age = $("#age_data").val();
let email = $("#email_data").val();
let password = $("#password_data").val();
let progress = 0;

//新規入学者のオブジェクト
let newStudent = {
  newName: '',
  newId: '',
  newAge: '',
  newEmail: '',
  newPassword: '',
  newProgress: progress,
};

//確認ボタンを押したら
$(function () {
  $("#confirmButton").on("click", function () {
    // ポップアップを表示
    $("#confirm").removeClass("hidden");

    // フォームの内容を取得
    username = $("#username_data").val();
    id = $("#id_data").val();
    age = $("#age_data").val();
    email = $("#email_data").val();
    password = $("#password_data").val();

    // ポップアップの内容を更新
    $("#userConfirm").text(username);
    $("#idConfirm").text(id);
    $("#ageConfirm").text(age);
    $("#emailConfirm").text(email);
    $("#passwordConfirm").text(password);
  });
});

//入力に戻る
$(function () {
  $("#returnAccount").click(function() {
      // ポップアップを非表示
    $("#confirm").addClass("hidden");

    // フォームの内容を削除
    username = "";
    id = "";
    age = "";
    email = "";
    password = "";

    // ポップアップの内容を更新
    $("#userConfirm").text(username);
    $("#idConfirm").text(id);
    $("#ageConfirm").text(age);
    $("#emailConfirm").text(email);
    $("#passwordConfirm").text(password);
  });
});

//新規登録
$(function () {
  $("#createAccount").click(function() {
    //ポップアップを隠す
    $("#confirm").addClass("hidden");

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
            // 重複IDがなかった場合、新規登録を続行
            newStudent = {
                newName: username,
                newId: id,
                newAge: age,
                newEmail: email,
                newPassword: password,
                newProgress: progress,
            };

            function generateUniqueKey() {
                return 'student_' + Date.now();
            }

            let uniqueKey = generateUniqueKey();
            localStorage.setItem(
                uniqueKey, JSON.stringify(newStudent)
            );

            // mypage.htmlに遷移
            window.location.href = 'mypage.html?studentKey=' + uniqueKey;
        }
    });
});
