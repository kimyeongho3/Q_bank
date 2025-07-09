// 3D.txt 파일의 문제를 직접 JS 객체로 변환하여 사용합니다.
const questions = [
    {
        question: "운영체제의 구성 요소가 아닌 것은?",
        choices: [
            "유틸리티",
            "GUI",
            "드라이버",
            "커널"
        ],
        answer: 1,
        explanation: "GUI는 운영체제의 구성 요소가 아닙니다."
    },
    {
        question: "나머지 셋과 종류가 다른 것은?",
        choices: [
            "드라이버",
            "GUI",
            "셸",
            "명령 프롬프트"
        ],
        answer: 1,
        explanation: "GUI는 나머지와 달리 그래픽 환경입니다."
    },
    {
        question: "운영체제의 핵심 기능을 모아 놓은 것은?",
        choices: [
            "유틸리티",
            "사용자 인터페이스",
            "디바이스 드라이버",
            "커널"
        ],
        answer: 3,
        explanation: "커널이 운영체제의 핵심 기능을 담당합니다."
    },
    {
        question: "키보드와 모니터가 발명되면서 실현 가능하게 된 시스템은?",
        choices: [
            "대화형 시스템",
            "일괄 작업 시스템",
            "시분할 시스템",
            "실시간 시스템"
        ],
        answer: 0,
        explanation: "대화형 시스템은 키보드와 모니터의 등장으로 가능해졌습니다."
    },
    {
        question: "CPU 시간을 잘게 나누어 여러 프로그램이 동시에 실행되는 것처럼 보이는 시스템은?",
        choices: [
            "hard wiring system",
            "batch job system",
            "time sharing system",
            "real-time system"
        ],
        answer: 2,
        explanation: "시분할 시스템(time sharing system)은 CPU 시간을 분할하여 여러 작업을 동시에 처리합니다."
    },
    {
        question: "언제 어디서나 컴퓨팅 파워나 소프트웨어에 접근할 수 있는 유연한 컴퓨터 환경을 위해 고안된 시스템은?",
        choices: [
            "real-time system",
            "cloud computing",
            "P2P system",
            "Internet of Things"
        ],
        answer: 1,
        explanation: "클라우드 컴퓨팅은 유연한 컴퓨터 환경을 제공합니다."
    },
    {
        question: "사용자가 커널에 진입할 수 있는 유일한 수단은?",
        choices: [
            "시스템 호출",
            "사용자 정의 함수",
            "디바이스 드라이버",
            "사용자 인터페이스"
        ],
        answer: 0
    },
    {
        question: "응용 프로그램이 자신과 연관된 프로그램을 만들 수 있도록 제공하는 인터페이스는?",
        choices: [
            "interface",
            "API",
            "shell",
            "kernel"
        ],
        answer: 1
    },
    {
        question: "프로그램 개발자를 위해 API, 코드 편집기, 에뮬레이터 같은 각종 개발용 응용 프로그램까지 하나로 묶어서 배포하는 개발 툴은?",
        choices: [
            "SDK",
            "시스템 호출",
            "드라이버",
            "커널"
        ],
        answer: 0
    },
    {
        question: "커널과 하드웨어의 인터페이스를 가리키는 것은?",
        choices: [
            "SDK",
            "system call",
            "driver",
            "API"
        ],
        answer: 2
    },
    {
        question: "비슷한 기능을 가진 모듈을 묶어서 하나의 계층으로 만들고, 계층 간 통신을 통해 운영체제를 구현하는 방식의 커널은?",
        choices: [
            "micro architecture kernel",
            "wide architecture kernel",
            "layered architecture kernel",
            "monolithic architecture kernel"
        ],
        answer: 2
    },
    {
        question: "서로 다른 운영체제에서 동일한 작업 환경을 만들어 주는 것은?",
        choices: [
            "객체지향",
            "컴파일러",
            "가상머신",
            "인터프리터"
        ],
        answer: 2
    },
    // 3장 연습문제
    {
        question: "실행을 위해 메모리에 올라온 동적인 상태를 가리키는 것은?",
        choices: [
            "소스코드",
            "프로세스",
            "프로그램",
            "PCB"
        ],
        answer: 1
    },
    {
        question: "프로세스를 실행하는 데 필요한 정보를 보관하는 자료구조는?",
        choices: [
            "stack",
            "PC",
            "queue",
            "PCB"
        ],
        answer: 3
    },
    {
        question: "프로세스가 CPU를 할당받기 전에 기다리는 상태는?",
        choices: [
            "실행 상태",
            "준비 상태",
            "대기 상태",
            "생성 상태"
        ],
        answer: 1
    },
    {
        question: "실행 상태의 프로세스가 입출력을 요구하면 이동하는 상태는?",
        choices: [
            "완료 상태",
            "준비 상태",
            "대기 상태",
            "생성 상태"
        ],
        answer: 2
    },
    {
        question: "대기 상태의 프로세스가 입출력이 완료되면 이동하는 상태는?",
        choices: [
            "실행 상태",
            "준비 상태",
            "완료 상태",
            "생성 상태"
        ],
        answer: 1
    },
    {
        question: "실행 상태의 프로세스가 작업이 안 끝났음에도 타임 슬라이스 아웃이 걸려 이동하게 되는 상태는?",
        choices: [
            "완료 상태",
            "준비 상태",
            "대기 상태",
            "생성 상태"
        ],
        answer: 1
    },
    {
        question: "두 프로세스의 PCB를 교환하고 작업 환경을 바꾸는 작업은?",
        choices: [
            "활성 상태",
            "다단계 큐",
            "다중 인스턴스",
            "문맥 교환"
        ],
        answer: 3
    },
    {
        question: "타임 슬라이스의 크기를 정할 때 기준이 되는 것은?",
        choices: [
            "문맥 교환",
            "다단계 큐",
            "다중 인스턴스",
            "활성 상태"
        ],
        answer: 0
    },
    {
        question: "유닉스에서 프로세스 번호 1번이면서 모든 프로세스의 최고 조상에 해당하는 프로세스의 이름은?",
        choices: [
            "init",
            "login",
            "shell",
            "swapper"
        ],
        answer: 0
    },
    {
        question: "새로운 프로세스를 생성하는 함수는?",
        choices: [
            "wait()",
            "fork()",
            "exit()",
            "exec()"
        ],
        answer: 1
    },
    {
        question: "프로세스는 그대로 놔둔 채 코드를 바꾸는 함수는?",
        choices: [
            "wait()",
            "fork()",
            "exit()",
            "exec()"
        ],
        answer: 3
    },
    {
        question: "프로세스의 재사용과 가장 연관이 깊은 함수는?",
        choices: [
            "wait()",
            "fork()",
            "exit()",
            "exec()"
        ],
        answer: 3
    },
    {
        question: "자식 프로세스가 종료되기 전에 부모 프로세스가 먼저 종료되면 자식 프로세스는 어떤 프로세스가 되는가?",
        choices: [
            "init 프로세스",
            "zombi 프로세스",
            "orphan 프로세스",
            "swapper 프로세스"
        ],
        answer: 2
    },
    {
        question: "자식 프로세스가 종료되었는데도 부모가 뒤처리를 하지 않으면 자식 프로세스는 어떤 프로세스가 되는가?",
        choices: [
            "init 프로세스",
            "좀비 프로세스",
            "고아 프로세스",
            "swapper 프로세스"
        ],
        answer: 1
    },
    {
        question: "코드에 정의된 절차에 따라 CPU에 작업을 요청하는 실행 단위는?",
        choices: [
            "태스크",
            "작업",
            "프로세스",
            "스레드"
        ],
        answer: 3
    },
    {
        question: "멀티스레드의 장점이 아닌 것은?",
        choices: [
            "스레드끼리 독립적이라 영향을 받지 않는다.",
            "응답 속도가 빨라진다.",
            "프로세스에 비하여 통신 오버헤드가 적다.",
            "시스템 자원을 공유한다."
        ],
        answer: 0
    },
    // 4장 연습문제
    {
        question: "비선점형 스케줄링과 비교한 선점형 스케줄링에 대한 설명으로 옳지 않은 것은?",
        choices: [
            "비선점형에 비하여 우선순위가 낮다",
            "실행 상태에 있는 작업을 중단시키고 새로운 작업을 실행할 수 있다.",
            "문맥 교환의 오버헤드가 많다.",
            "시분할 방식 스케줄러에 사용된다."
        ],
        answer: 0
    },
    {
        question: "나머지 3개와 비교하여 우선순위가 높은 프로세스는?",
        choices: [
            "일괄 처리 프로세스",
            "사용자 프로세스",
            "커널 프로세스",
            "CPU 집중 프로세스"
        ],
        answer: 2
    },
    {
        question: "준비 큐에 도착한 순서대로 CPU를 할당하는 비선점형 방식의 스케줄링 알고리즘은?",
        choices: [
            "최고 응답률 우선(HRN)",
            "최단 작업 우선(SJF)",
            "최소 잔류 시간 우선(SRT)",
            "선입선출(FCFS)"
        ],
        answer: 3
    },
    {
        question: "준비 큐에 있는 프로세스 중에서 실행 시간이 가장 짧은 작업부터 CPU를 할당하는 비선점형 방식의 스케줄링 알고리즘은?",
        choices: [
            "최고 응답률 우선(HRN)",
            "최단 작업 우선(SJF)",
            "최소 잔류 시간 우선(SRT)",
            "선입선출(FCFS)"
        ],
        answer: 1
    },
    {
        question: "아사 현상이 발생할 수 있는 비선점형 방식의 스케줄링 알고리즘은?",
        choices: [
            "최고 응답률 우선(HRN)",
            "최단 작업 우선(SJF)",
            "최소 잔류 시간 우선(SRT)",
            "선입선출(FCFS)"
        ],
        answer: 1
    },
    {
        question: "서비스를 받기 위해 기다린 시간과 CPU 사용 시간을 고려하여 스케줄링하는 비선점형 알고리즘은?",
        choices: [
            "최고 응답률 우선(HRN)",
            "다단계 피드백 큐(MLFQ)",
            "최소 잔류 시간 우선(SRT)",
            "선입선출(FCFS)"
        ],
        answer: 0
    },
    {
        question: "선점형 알고리즘이 아닌 것은?",
        choices: [
            "다단계 큐(MLQ)",
            "다단계 피드백 큐(MLFQ)",
            "라운드 로빈(RR)",
            "최단 작업 우선(SJF)"
        ],
        answer: 3
    },
    {
        question: "아사 현상을 완화하는 방법은?",
        choices: [
            "사이클 훔치기",
            "에이징",
            "작업 훔치기",
            "우선순위"
        ],
        answer: 1
    },
    {
        question: "선입선출(FCFS) 스케줄링과 유사하지만, 각 프로세스마다 CPU를 사용할 수 있는 타임 슬라이스가 있으며 우선순위가 없는 알고리즘은?",
        choices: [
            "다단계 큐(MLQ)",
            "다단계 피드백 큐(MLFQ)",
            "라운드 로빈(RR)",
            "최단 작업 우선(SJF)"
        ],
        answer: 2
    },
    {
        question: "문맥 교환 시간을 소비하는 알고리즘은?",
        choices: [
            "최고 응답률 우선(HRN)",
            "최단 작업 우선(SJF)",
            "다단계 큐(MLQ)",
            "선입선출(FCFS)"
        ],
        answer: 2
    },
    {
        question: "기본적으로 라운드 로빈 스케줄링을 사용하지만, CPU를 할당받을 프로세스를 선택할 때 남은 작업 시간이 가장 적은 프로세스를 선택하는 알고리즘은?",
        choices: [
            "최고 응답률 우선(HRN)",
            "다단계 피드백 큐(MLFQ)",
            "최소 잔류 시간 우선(SRT)",
            "선입선출(FCFS)"
        ],
        answer: 2
    },
    {
        question: "우선순위에 따라 여러 개의 큐를 사용하는 알고리즘 중 고정 우선순위 방식은?",
        choices: [
            "선입선출(FCFS)",
            "다단계 피드백 큐(MLFQ)",
            "다단계 큐(MLQ)",
            "최고 응답률 우선(HRN)"
        ],
        answer: 2
    },
    {
        question: "우선순위에 따라 여러 개의 큐를 사용하고 각 큐의 타임 슬라이스 크기가 다른 변동 우선순위 알고리즘은?",
        choices: [
            "선입선출(FCFS)",
            "다단계 피드백 큐(MLFQ)",
            "다단계 큐(MLQ)",
            "최고 응답률 우선(HRN)"
        ],
        answer: 1
    }
];

let current = 0;
let correctCount = 0;
let wrongCount = 0;

function showQuestion() {
    const q = questions[current];
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <p><b>Q${current + 1}.</b> ${q.question}</p>
        ${q.choices.map((c, i) => `
            <button class="choice-btn" data-idx="${i}">${c}</button>
        `).join('')}
        <div id="result"></div>
        <div id="explanation" style="display:none; margin-top:1rem; color:#64748b;"></div>
    `;
    document.getElementById('next-btn').style.display = 'none';

    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            checkAnswer(Number(this.getAttribute('data-idx')));
        });
    });
}

function checkAnswer(choice) {
    const q = questions[current];
    const result = document.getElementById('result');
    const explanation = document.getElementById('explanation');
    if (choice === q.answer) {
        result.textContent = "정답입니다!";
        result.style.color = "#10b981";
        correctCount++;
    } else {
        result.innerHTML = `오답입니다.<br>정답: <b>${q.choices[q.answer]}</b>`;
        result.style.color = "#ef4444";
        wrongCount++;
    }
    explanation.style.display = "block";
    explanation.innerText = q.explanation || "";
    document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);
    document.getElementById('next-btn').style.display = 'inline-block';
}

document.getElementById('next-btn').onclick = function() {
    current++;
    if (current < questions.length) {
        showQuestion();
    } else {
        const total = questions.length;
        const percent = Math.round((correctCount / total) * 100);
        document.getElementById('quiz-container').innerHTML = `
            <p>모든 문제를 풀었습니다!</p>
            <p>정답: <b style="color:#10b981">${correctCount}</b>개 / 오답: <b style="color:#ef4444">${wrongCount}</b>개</p>
            <p>정답률: <b>${percent}%</b></p>
        `;
        this.style.display = 'none';
    }
};

window.onload = showQuestion;