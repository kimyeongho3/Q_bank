// 3D.txt 파일의 문제를 직접 JS 객체로 변환하여 사용합니다.
const questions = [
    {
        question: "3D프린터에 사용되는 제조 기술은?",
        choices: [
            "절상 가공",
            "적층 가공",
            "방전 가공",
            "3D 디자인"
        ],
        answer: 1, // 0부터 시작, 2번(적층 가공)이 정답
        explanation: "FDM방식은 적층방식이다."
    }
    // 추가 문제는 여기에 계속 배열로 넣어주세요.
];

let current = 0;

function showQuestion() {
    const q = questions[current];
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <p><b>Q${current + 1}.</b> ${q.question}</p>
        ${q.choices.map((c, i) => `
            <button onclick="checkAnswer(${i})">${c}</button>
        `).join('')}
        <div id="result"></div>
        <div id="explanation" style="display:none; margin-top:1rem; color:#64748b;"></div>
    `;
    document.getElementById('next-btn').style.display = 'none';
}

window.checkAnswer = function(choice) {
    const q = questions[current];
    const result = document.getElementById('result');
    const explanation = document.getElementById('explanation');
    if (choice === q.answer) {
        result.textContent = "정답입니다!";
        result.style.color = "#10b981";
    } else {
        result.textContent = "오답입니다.";
        result.style.color = "#ef4444";
    }
    // 해설 표시
    explanation.textContent = q.explanation || "";
    explanation.style.display = "block";
    // 모든 선택 버튼 비활성화
    Array.from(document.querySelectorAll('#quiz-container button')).forEach(btn => btn.disabled = true);
    document.getElementById('next-btn').style.display = 'inline-block';
};

document.getElementById('next-btn').onclick = function() {
    current++;
    if (current < questions.length) {
        showQuestion();
    } else {
        document.getElementById('quiz-container').innerHTML = "<p>모든 문제를 풀었습니다!</p>";
        this.style.display = 'none';
    }
};

window.onload = showQuestion;