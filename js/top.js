$(document).ready(function() {
    const staffDataDiv = $(".staffData");

    // ローカルストレージの全データを取得
    const localStorageLength = localStorage.length;

    for (let i = 0; i < localStorageLength; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const parsedValue = JSON.parse(value);

        // スタッフデータを判定（例: keyが"staff_"で始まるものをスタッフデータとする）
        if (key.startsWith("staff_")) {
            const staffImage = parsedValue.newImage ? parsedValue.newImage : 'img/top/default_staff.png'; // 画像がない場合のデフォルト画像
            const staffName = parsedValue.newName ? parsedValue.newName : '名前不明';
            const staffAge = parsedValue.newAge ? parsedValue.newAge : '年齢不明';
            const staffLanguage = parsedValue.newLanguage ? parsedValue.newLanguage : '不明';

            const staffHtml = `
                <div>
                    <img src="${staffImage}" alt="${staffName}">
                    <p>${staffName}</p>
                    <p>${staffAge}歳</p>
                    <p>得意な言語：${staffLanguage}</p>
                </div>
            `;

            staffDataDiv.append(staffHtml);
        }
    }

    // Slickスライダーの初期化
    $('.staffData').slick({
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>',
        centerMode: true,
        variableWidth: true,
        dots: true,
    });

    // スムーズスクロールの初期化
    $('a[href^="#"]').click(function () {
        var adjust = 0;
        var speed = 400;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top + adjust;
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });
    // 生徒データを取得
    const studentsData = [];

    // ローカルストレージから生徒データを取得
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("student_")) {
            const student = JSON.parse(localStorage.getItem(key));
            studentsData.push(student);
        }
    }

    // 最終状況と卒業後の進路のデータをカウント
    let finalStatusCount = {
        '卒業': 0,
        '中退': 0,
        '休学': 0,
        '在学中': 0
    };
    let futurePlanCount = {
        '起業': 0,
        '転職': 0,
      'フリーランス': 0,
        '現職でのスキル応用': 0
    };

    for (const student of studentsData) {
        finalStatusCount[student.finalStatus]++;
        if (student.futurePlan) {
            futurePlanCount[student.futurePlan]++;
        }
    }

    // 生徒の総数
    const totalStudents = studentsData.length;

    // 最終状況と卒業後の進路の割合を計算
    const finalStatusPercentages = {};
    const futurePlanPercentages = {};

    for (const status in finalStatusCount) {
        finalStatusPercentages[status] = (finalStatusCount[status] / totalStudents) * 100;
    }

    for (const plan in futurePlanCount) {
        futurePlanPercentages[plan] = (futurePlanCount[plan] / totalStudents) * 100;
    }

    // 最終状況のチャート用のデータ
    const finalStatusData = {
        labels: Object.keys(finalStatusPercentages),
        datasets: [{
            data: Object.values(finalStatusPercentages),
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)', // 卒業
                'rgba(54, 162, 235, 0.8)', // 中退
                'rgba(255, 206, 86, 0.8)', // 休学
                'rgba(200, 156, 136, 0.8)', // 在学中
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(200, 156, 136, 1)',
            ],
            borderWidth: 1
        }]
    };

    // 卒業後の進路のチャート用のデータ
    const futurePlanData = {
        labels: Object.keys(futurePlanPercentages),
        datasets: [{
            data: Object.values(futurePlanPercentages),
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)', // 起業
                'rgba(54, 162, 235, 0.8)', // 転職
                'rgba(255, 206, 86, 0.8)', // フリーランス
                'rgba(200, 156, 136, 0.8)', // 現職でのスキル応用
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(200, 156, 136, 1)',
            ],
            borderWidth: 1
        }]
    };

    // チャートのオプション
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'bottom',
        },
    };

    // 最終状況の円グラフを描画
    const finalStatusCtx = document.getElementById('finalStatusChart').getContext('2d');
    const finalStatusChart = new Chart(finalStatusCtx, {
        type: 'doughnut',
        data: finalStatusData,
        options: options
    });

    // 卒業後の進路の円グラフを描画
    const futurePlanCtx = document.getElementById('futurePlanChart').getContext('2d');
    const futurePlanChart = new Chart(futurePlanCtx, {
        type: 'doughnut',
        data: futurePlanData,
        options: options
    });
});
