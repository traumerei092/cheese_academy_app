$(document).ready(function () {
    const studentTableBody = $("#studentTable tbody");

    // ローカルストレージから生徒情報を取得してテーブルに表示
    const localStorageLength = localStorage.length;
    for (let i = 0; i < localStorageLength; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('student_')) { // 'student_' で始まるキーのみを対象
            const value = localStorage.getItem(key);
            const parsedValue = JSON.parse(value);

            // 最終状況のプルダウンメニューを生成
            let options = `
                <option value="" ${!parsedValue.finalStatus ? 'selected' : ''}>選択してください</option>
                <option value="在学中" ${parsedValue.finalStatus === '在学中' ? 'selected' : ''}>在学中</option>
                <option value="中退" ${parsedValue.finalStatus === '中退' ? 'selected' : ''}>中退</option>
                <option value="休学" ${parsedValue.finalStatus === '休学' ? 'selected' : ''}>休学</option>
            `;

            // 履修進捗が5の生徒のみ「卒業」のオプションを追加
            if (parsedValue.newProgress == 5) {
                options += `<option value="卒業" ${parsedValue.finalStatus === '卒業' ? 'selected' : ''}>卒業</option>`;
            }

            // 卒業後進路のプルダウンメニューを生成
            let futureOptions = `
                <option value="" ${!parsedValue.futurePlan ? 'selected' : ''}>選択してください</option>
                <option value="起業" ${parsedValue.futurePlan === '起業' ? 'selected' : ''}>起業</option>
                <option value="転職" ${parsedValue.futurePlan === '転職' ? 'selected' : ''}>転職</option>
                <option value="フリーランス" ${parsedValue.futurePlan === 'フリーランス' ? 'selected' : ''}>フリーランス</option>
                <option value="現職でのスキル応用" ${parsedValue.futurePlan === '現職でのスキル応用' ? 'selected' : ''}>現職でのスキル応用</option>
            `;

            const finalStatusCell = `<td>
                <select class="finalStatusSelect" data-key="${key}">
                    ${options}
                </select>
            </td>`;

            const futurePlanCell = `<td>
                <select class="futurePlanSelect" data-key="${key}" ${parsedValue.finalStatus !== '卒業' ? 'style="display:none;"' : ''}>
                    ${futureOptions}
                </select>
            </td>`;

            const row = `<tr>
                <td>${parsedValue.newId}</td>
                <td>${parsedValue.newName}</td>
                <td>${parsedValue.newAge}</td>
                <td>${parsedValue.newEmail}</td>
                <td>${parsedValue.newPassword}</td>
                <td>${parsedValue.newProgress}</td>
                ${finalStatusCell}
                ${futurePlanCell}
            </tr>`;
            studentTableBody.append(row);
        }
    }

    statusUpdate();
    planUpdate();
});

// プルダウンメニューが変更されたときにローカルストレージを更新
function statusUpdate() {
    $(".finalStatusSelect").on("change", function () {
        const selectedKey = $(this).data("key");
        const newFinalStatus = $(this).val();

        // ローカルストレージのデータを更新
        const studentData = JSON.parse(localStorage.getItem(selectedKey));
        studentData.finalStatus = newFinalStatus;
        localStorage.setItem(selectedKey, JSON.stringify(studentData));

        // 卒業後進路のプルダウンメニューの表示/非表示を切り替える
        const futurePlanSelect = $(`.futurePlanSelect[data-key="${selectedKey}"]`);
        if (newFinalStatus === '卒業') {
            futurePlanSelect.show();
        } else {
            futurePlanSelect.hide();
        }
    });
}

// 卒業後進路プルダウンメニューが変更されたときにローカルストレージを更新
function planUpdate() {
    $(".futurePlanSelect").on("change", function () {
        const selectedKey = $(this).data("key");
        const newFuturePlan = $(this).val();

        // ローカルストレージのデータを更新
        const studentData = JSON.parse(localStorage.getItem(selectedKey));
        studentData.futurePlan = newFuturePlan;
        localStorage.setItem(selectedKey, JSON.stringify(studentData));
    });
}