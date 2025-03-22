// 회원 데이터
const members = [
    { id: 1, name: '김철수' },
    { id: 2, name: '이영희' },
    { id: 3, name: '박민수' },
    { id: 4, name: '정지은' },
    { id: 5, name: '최동욱' },
    { id: 6, name: '한지민' },
    { id: 7, name: '송혜교' },
    { id: 8, name: '이병헌' },
    { id: 9, name: '전지현' },
    { id: 10, name: '배수지' },
    { id: 11, name: '이민호' },
    { id: 12, name: '김태희' },
    { id: 13, name: '원빈' },
    { id: 14, name: '김연아' },
    { id: 15, name: '손흥민' }
];

// 출석 데이터를 저장할 객체
let attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};

// 출석 데이터 저장 함수
function saveAttendanceData() {
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
}

// 출석부 초기화 함수
function resetAttendance() {
    if (confirm('정말로 출석부를 초기화하시겠습니까? 모든 출석 기록이 삭제됩니다.')) {
        attendanceData = {};
        localStorage.removeItem('attendanceData');
        displayMembers();
        updateAttendanceSummary();
    }
}

// 초기화 버튼 이벤트 리스너 설정
document.getElementById('resetButton').addEventListener('click', resetAttendance);

// 출석 현황을 업데이트하는 함수
function updateAttendanceSummary() {
    const attendedList = document.getElementById('attendedList');
    const absentList = document.getElementById('absentList');
    const attendedCount = document.getElementById('attendedCount');
    const absentCount = document.getElementById('absentCount');

    // 리스트 초기화
    attendedList.innerHTML = '';
    absentList.innerHTML = '';

    // 출석자와 미출석자 분류
    const attended = [];
    const absent = [];

    members.forEach(member => {
        if (attendanceData[member.id]) {
            attended.push({
                name: member.name,
                time: attendanceData[member.id]
            });
        } else {
            absent.push(member.name);
        }
    });

    // 출석자 목록 표시
    attended.forEach(person => {
        const li = document.createElement('li');
        li.textContent = `${person.name} (${person.time})`;
        attendedList.appendChild(li);
    });

    // 미출석자 목록 표시
    absent.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        absentList.appendChild(li);
    });

    // 카운트 업데이트
    attendedCount.textContent = attended.length;
    absentCount.textContent = absent.length;
}

// 회원 목록을 화면에 표시하는 함수
function displayMembers() {
    const memberList = document.getElementById('memberList');
    memberList.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        if (attendanceData[member.id]) {
            memberCard.classList.add('attended');
        }

        const memberName = document.createElement('div');
        memberName.className = 'member-name';
        memberName.textContent = member.name;

        const attendanceTime = document.createElement('div');
        attendanceTime.className = 'attendance-time';
        attendanceTime.textContent = attendanceData[member.id] || '미출석';

        memberCard.appendChild(memberName);
        memberCard.appendChild(attendanceTime);

        // 클릭 이벤트 리스너 추가
        memberCard.addEventListener('click', () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('ko-KR');
            attendanceData[member.id] = timeString;
            saveAttendanceData(); // 데이터 저장
            displayMembers(); // 화면 갱신
            updateAttendanceSummary(); // 출석 현황 업데이트
        });

        memberList.appendChild(memberCard);
    });
}

// 초기 화면 표시
displayMembers();
updateAttendanceSummary(); 