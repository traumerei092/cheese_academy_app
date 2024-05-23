let urlParams = '';
let studentName = '';
let studentId = '';
let studentAge = 0;
let studentEmail = '';
let studentPass = '';
let studentProgress = 0;


//新規入学者情報
$(document).ready(function () {
    // URLからキーを取得
    function getQueryParam(param) {
        urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const studentKey = getQueryParam('studentKey');
    if (!studentKey) {
        // キーが存在しない場合のエラーハンドリング
        alert('学生のキーが見つかりません。ログインしてください。');
        window.location.href = 'login.html'; // ログインページにリダイレクト
        return;
    }

    const helloStudentJSON = localStorage.getItem(studentKey);
    if (!helloStudentJSON) {
        // データが存在しない場合のエラーハンドリング
        alert('学生情報が見つかりません。ログインしてください。');
        window.location.href = 'login.html'; // ログインページにリダイレクト
        return;
    }

    const helloStudent = JSON.parse(helloStudentJSON);

    studentName = helloStudent.newName;
    studentId = helloStudent.newId;
    studentAge = helloStudent.newAge;
    studentEmail = helloStudent.newEmail;
    studentPass = helloStudent.newPassword;
    studentProgress = helloStudent.newProgress;

    //helloコメント
    $('#hello').text(`こんにちは  ${studentName}  さん！`);

    //生徒情報
    $('#studentId').text(`ID： ${studentId}`);
    $('#studentName').text(`氏名： ${studentName}`);
    $('#studentAge').text(`年齢： ${studentAge}`);
    $('#studentEmail').text(`連絡先： ${studentEmail}`);
    $('#studentPass').text(`パスワード： ${studentPass}`);
    $('#studentProgress').text(`履修進捗：  ${studentProgress}`);

    if (studentProgress === 1) {
        $("#switch1").prop("checked", true);
        $("#toggle2").removeClass("toggle2");
    } else if (studentProgress === 2) {
        $("#switch1").prop("checked", true);
        $("#toggle2").removeClass("toggle2");
        $("#switch2").prop("checked", true);
        $("#toggle3").removeClass("toggle3");
    } else if (studentProgress === 3) {
        $("#switch1").prop("checked", true);
        $("#toggle2").removeClass("toggle2");
        $("#switch2").prop("checked", true);
        $("#toggle3").removeClass("toggle3");
        $("#switch3").prop("checked", true);
        $("#toggle4").removeClass("toggle4");
    } else if (studentProgress === 4) {
        $("#switch1").prop("checked", true);
        $("#toggle2").removeClass("toggle2");
        $("#switch2").prop("checked", true);
        $("#toggle3").removeClass("toggle3");
        $("#switch3").prop("checked", true);
        $("#toggle4").removeClass("toggle4");
        $("#switch4").prop("checked", true);
        $("#toggle5").removeClass("toggle5");
    } else if (studentProgress === 5) {
        $("#switch1").prop("checked", true);
        $("#toggle2").removeClass("toggle2");
        $("#switch2").prop("checked", true);
        $("#toggle3").removeClass("toggle3");
        $("#switch3").prop("checked", true);
        $("#toggle4").removeClass("toggle4");
        $("#switch4").prop("checked", true);
        $("#toggle5").removeClass("toggle5");
        $("#switch5").prop("checked", true);
        $("#graduate").removeClass("graduateTrigger");
    }

});

//履修進捗0↔︎1
$(function () {
    $("#switch1").change(function () {
        if ($(this).is(":checked")) {
            // チェックがオンになった場合の処理
            studentProgress = 1;
            $('#studentProgress').text(`履修進捗：  ${studentProgress}`);
            //for文で上部に記載のIDと合致するkeyを呼び出して、ローカルストレージを更新
            const localStorageLength = localStorage.length;
            for(let i=0; i < localStorageLength; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const parsedValueId = parsedValue.newId;
                if (parsedValueId === studentId) {
                    const updateStudent = {
                        newName: studentName,
                        newId: studentId,
                        newAge: studentAge,
                        newEmail: studentEmail,
                        newPassword: studentPass,
                        newProgress: studentProgress,
                    };
                    localStorage.setItem(
                        key, JSON.stringify(updateStudent)
                    );
                    $("#toggle2").removeClass("toggle2");
                }
            }
        } else {
            // チェックがオフになった場合の処理
            // オフになった時の処理をここに記述
            studentProgress = 0;
            $('#studentProgress').text(`履修進捗：  ${studentProgress}`);
            //for文で上部に記載のIDと合致するkeyを呼び出して、ローカルストレージを更新
            const localStorageLength = localStorage.length;
            for(let i=0; i < localStorageLength; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const parsedValueId = parsedValue.newId;
                if (parsedValueId === studentId) {
                    const updateStudent = {
                        newName: studentName,
                        newId: studentId,
                        newAge: studentAge,
                        newEmail: studentEmail,
                        newPassword: studentPass,
                        newProgress: studentProgress,
                    };
                    localStorage.setItem(
                        key, JSON.stringify(updateStudent)
                    );
                    $("#toggle2").addClass("toggle2");
                    $("#switch2").prop("checked", false);
                    $("#toggle3").addClass("toggle3");
                    $("#switch3").prop("checked", false);
                    $("#toggle4").addClass("toggle4");
                    $("#switch4").prop("checked", false);
                    $("#toggle5").addClass("toggle5");
                    $("#switch5").prop("checked", false);
                }
            }
            $("#graduate").addClass("graduateTrigger");
        }
    });
});

//履修進捗1↔︎2
$(function () {
    $("#switch2").change(function () {
        if ($(this).is(":checked")) {
            // チェックがオンになった場合の処理
            studentProgress = 2;
            $('#studentProgress').text(`履修進捗：  ${studentProgress}`);
            //for文で上部に記載のIDと合致するkeyを呼び出して、ローカルストレージを更新
            const localStorageLength = localStorage.length;
            for(let i=0; i < localStorageLength; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const parsedValueId = parsedValue.newId;
                if (parsedValueId === studentId) {
                    const updateStudent = {
                        newName: studentName,
                        newId: studentId,
                        newAge: studentAge,
                        newEmail: studentEmail,
                        newPassword: studentPass,
                        newProgress: studentProgress,
                    };
                    localStorage.setItem(
                        key, JSON.stringify(updateStudent)
                    );
                    $("#toggle3").removeClass("toggle3");
                }
            }
        } else {
            // チェックがオフになった場合の処理
            // オフになった時の処理をここに記述
            studentProgress = 1;
            $('#studentProgress').text(`履修進捗：  ${studentProgress}`);
            //for文で上部に記載のIDと合致するkeyを呼び出して、ローカルストレージを更新
            const localStorageLength = localStorage.length;
            for(let i=0; i < localStorageLength; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const parsedValueId = parsedValue.newId;
                if (parsedValueId === studentId) {
                    const updateStudent = {
                        newName: studentName,
                        newId: studentId,
                        newAge: studentAge,
                        newEmail: studentEmail,
                        newPassword: studentPass,
                        newProgress: studentProgress,
                    };
                    localStorage.setItem(
                        key, JSON.stringify(updateStudent)
                    );
                    $("#toggle3").addClass("toggle3");
                    $("#switch3").prop("checked", false);
                    $("#toggle4").addClass("toggle4");
                    $("#switch4").prop("checked", false);
                    $("#toggle5").addClass("toggle5");
                    $("#switch5").prop("checked", false);
                }
            }
            $("#graduate").addClass("graduateTrigger");
        }
    });
});

//履修進捗2↔︎3
$(function () {
    $("#switch3").change(function () {
        if ($(this).is(":checked")) {
            // チェックがオンになった場合の処理
            studentProgress = 3;
            $('#studentProgress').text(`履修進捗：  ${studentProgress}`);
            //for文で上部に記載のIDと合致するkeyを呼び出して、ローカルストレージを更新
            const localStorageLength = localStorage.length;
            for(let i=0; i < localStorageLength; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const parsedValueId = parsedValue.newId;
                if (parsedValueId === studentId) {
                    const updateStudent = {
                        newName: studentName,
                        newId: studentId,
                        newAge: studentAge,
                        newEmail: studentEmail,
                        newPassword: studentPass,
                        newProgress: studentProgress,
                    };
                    localStorage.setItem(
                        key, JSON.stringify(updateStudent)
                    );
                    $("#toggle4").removeClass("toggle4");
                }
            }
        } else {
            // チェックがオフになった場合の処理
            // オフになった時の処理をここに記述
            studentProgress = 2;
            $('#studentProgress').text(`履修進捗：  ${studentProgress}`);
            //for文で上部に記載のIDと合致するkeyを呼び出して、ローカルストレージを更新
            const localStorageLength = localStorage.length;
            for(let i=0; i < localStorageLength; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const parsedValueId = parsedValue.newId;
                if (parsedValueId === studentId) {
                    const updateStudent = {
                        newName: studentName,
                        newId: studentId,
                        newAge: studentAge,
                        newEmail: studentEmail,
                        newPassword: studentPass,
                        newProgress: studentProgress,
                    };
                    localStorage.setItem(
                        key, JSON.stringify(updateStudent)
                    );
                    $("#toggle4").addClass("toggle4");
                    $("#switch4").prop("checked", false);
                    $("#toggle5").addClass("toggle5");
                    $("#switch5").prop("checked", false);
                }
            }
            $("#graduate").addClass("graduateTrigger");
        }
    });
});

//履修進捗3↔︎4
$(function () {
    $("#switch4").change(function () {
        if ($(this).is(":checked")) {
            // チェックがオンになった場合の処理
            studentProgress = 4;
            $('#studentProgress').text(`履修進捗：  ${studentProgress}`);
            //for文で上部に記載のIDと合致するkeyを呼び出して、ローカルストレージを更新
            const localStorageLength = localStorage.length;
            for(let i=0; i < localStorageLength; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const parsedValueId = parsedValue.newId;
                if (parsedValueId === studentId) {
                    const updateStudent = {
                        newName: studentName,
                        newId: studentId,
                        newAge: studentAge,
                        newEmail: studentEmail,
                        newPassword: studentPass,
                        newProgress: studentProgress,
                    };
                    localStorage.setItem(
                        key, JSON.stringify(updateStudent)
                    );
                    $("#toggle5").removeClass("toggle5");
                }
            }
        } else {
            // チェックがオフになった場合の処理
            // オフになった時の処理をここに記述
            studentProgress = 3;
            $('#studentProgress').text(`履修進捗：  ${studentProgress}`);
            //for文で上部に記載のIDと合致するkeyを呼び出して、ローカルストレージを更新
            const localStorageLength = localStorage.length;
            for(let i=0; i < localStorageLength; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const parsedValueId = parsedValue.newId;
                if (parsedValueId === studentId) {
                    const updateStudent = {
                        newName: studentName,
                        newId: studentId,
                        newAge: studentAge,
                        newEmail: studentEmail,
                        newPassword: studentPass,
                        newProgress: studentProgress,
                    };
                    localStorage.setItem(
                        key, JSON.stringify(updateStudent)
                    );
                    $("#toggle5").addClass("toggle5");
                    $("#switch5").prop("checked", false);
                }
            }
            $("#graduate").addClass("graduateTrigger");
        }
    });
});

//履修進捗4↔︎5
$(function () {
    $("#switch5").change(function () {
        if ($(this).is(":checked")) {
            // チェックがオンになった場合の処理
            studentProgress = 5;
            $('#studentProgress').text(`履修進捗：  ${studentProgress}`);
            //for文で上部に記載のIDと合致するkeyを呼び出して、ローカルストレージを更新
            const localStorageLength = localStorage.length;
            for(let i=0; i < localStorageLength; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const parsedValueId = parsedValue.newId;
                if (parsedValueId === studentId) {
                    const updateStudent = {
                        newName: studentName,
                        newId: studentId,
                        newAge: studentAge,
                        newEmail: studentEmail,
                        newPassword: studentPass,
                        newProgress: studentProgress,
                    };
                    localStorage.setItem(
                        key, JSON.stringify(updateStudent)
                    );
                }
            }
            $("#graduate").removeClass("graduateTrigger");
        } else {
            // チェックがオフになった場合の処理
            // オフになった時の処理をここに記述
            studentProgress = 4;
            $('#studentProgress').text(`履修進捗：  ${studentProgress}`);
            //for文で上部に記載のIDと合致するkeyを呼び出して、ローカルストレージを更新
            const localStorageLength = localStorage.length;
            for(let i=0; i < localStorageLength; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                const parsedValueId = parsedValue.newId;
                if (parsedValueId === studentId) {
                    const updateStudent = {
                        newName: studentName,
                        newId: studentId,
                        newAge: studentAge,
                        newEmail: studentEmail,
                        newPassword: studentPass,
                        newProgress: studentProgress,
                    };
                    localStorage.setItem(
                        key, JSON.stringify(updateStudent)
                    );
                }
            }
            $("#graduate").addClass("graduateTrigger");
        }
    });
});