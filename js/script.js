function toggleSideBar() {
    const sideBar = document.querySelector('.side-bar');
    sideBar.classList.toggle('open');
    
    // 사이드바가 열릴 때 body 스크롤 방지
    if (sideBar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// 사이드바 외부 클릭 시 닫기
document.addEventListener('click', function(event) {
    const sideBar = document.querySelector('.side-bar');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (sideBar.classList.contains('open') && 
        !sideBar.contains(event.target) && 
        !menuIcon.contains(event.target)) {
        toggleSideBar();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero');
    const images = ['main1.jpg', 'main2.jpg', 'main3.jfif'];
    let currentIndex = 0;

    // 오버레이 두 개 생성
    const overlay1 = document.createElement('div');
    const overlay2 = document.createElement('div');

    overlay1.className = 'background-overlay';
    overlay2.className = 'background-overlay';

    heroSection.appendChild(overlay1);
    heroSection.appendChild(overlay2);

    // 초기 배경 이미지 설정
    overlay1.style.backgroundImage = `url('../images/${images[currentIndex]}')`;
    overlay1.style.opacity = '1';

    function setBackground() {
        const nextIndex = (currentIndex + 1) % images.length;
        const activeOverlay = currentIndex % 2 === 0 ? overlay1 : overlay2;
        const nextOverlay = currentIndex % 2 === 0 ? overlay2 : overlay1;

        nextOverlay.style.backgroundImage = `url('../images/${images[nextIndex]}')`;
        nextOverlay.classList.add('fade-in');
        activeOverlay.classList.remove('fade-in');

        currentIndex = nextIndex;
    }

    setInterval(setBackground, 5000);
});


document.querySelector('.side-bar').addEventListener('click', function(event) {
    event.stopPropagation();
});

// 로그인 상태 체크 및 UI 업데이트
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginMenuItem = document.getElementById('loginMenuItem');
    const userInfo = document.getElementById('userInfo');
    const usernameSpan = document.getElementById('username');

    if (isLoggedIn === 'true') {
        loginMenuItem.style.display = 'none';
        userInfo.style.display = 'flex';
        usernameSpan.textContent = 'admin';
    } else {
        loginMenuItem.style.display = 'block';
        userInfo.style.display = 'none';
        usernameSpan.textContent = '';
    }
}

function showToast(message, redirect = null) {
    const toast = document.getElementById('toast') || document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-message';
    
    if (!document.body.contains(toast)) {
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    // 3초 후 토스트 메시지 숨기기
    setTimeout(() => {
        toast.classList.remove('show');
        // redirect가 있는 경우에만 페이지 이동
        if (redirect) {
            setTimeout(() => {
                window.location.href = redirect;
            }, 500);
        }
    }, 2000);
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username === 'admin' && password === 'pass1234') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        showToast('로그인 성공! 메인 페이지로 이동합니다.', 'index.html');
    } else {
        const toast = document.getElementById('toast') || document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast-message';
        toast.style.background = 'linear-gradient(135deg, #ff5252 0%, #f44336 100%)';
        showToast('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;

    if (!username || !password || !confirmPassword || !email) {
        showToast('모든 항목을 입력해주세요.');
        return false;
    }

    if (password !== confirmPassword) {
        showToast('비밀번호가 일치하지 않습니다.');
        return false;
    }

    showToast('회원가입 성공! 로그인 페이지로 이동합니다.', 'login.html');
    return false;
}

// 로그아웃 처리
function logout() {
    localStorage.removeItem('isLoggedIn');
    checkLoginStatus();
    if (window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    }
}

// 페이지 로드 시 로그인 상태 체크
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// 카테고리 콘텐츠 데이터
const categoryContents = {
    '고객편의': `
        <h2>고객편의</h2>
        <p>고객의 편의를 우선으로 생각하는:</p>
        <ul>
            <li>고객 지원</li>
            <li>수하물 운송 서비스</li>
            <li>편안한 좌석 배치</li>
            <li>기내 엔터테인먼트</li>
        </ul>
    `,
    '환경지속': `
        <h2>환경지속</h2>
        <p>환경 보호를 위한 우리의 노력:</p>
        <ul>
            <li>친환경 연료 사용</li>
            <li>탄소 배출량 감소 프로그램</li>
            <li>재활용 캠페인</li>
            <li>에너지 효율 향상</li>
        </ul>
    `,
    '지역사회': `
        <h2>지역사회 기여</h2>
        <p>지역사회와 함께 성장하는:</p>
        <ul>
            <li>지역 일자리 창출</li>
            <li>문화 교류 프로그램</li>
            <li>지역 경제 활성화</li>
            <li>사회공헌 활동</li>
        </ul>
    `,
    '교육적 경험': `
        <h2>교육적 경험</h2>
        <p>여행을 통한 배움의 기회:</p>
        <ul>
            <li>현지 문화 체험</li>
            <li>교육 프로그램</li>
            <li>역사 탐방</li>
            <li>환경 교육</li>
        </ul>
    `
};

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    const categoryItems = document.querySelectorAll('.categories li');
    const contentArea = document.querySelector('.content-area');

    // 첫 번째 카테고리를 기본으로 선택
    if (categoryItems.length > 0) {
        categoryItems[0].classList.add('active');
        contentArea.innerHTML = categoryContents[categoryItems[0].textContent.trim()] || '콘텐츠를 찾을 수 없습니다.';
    }

    // 각 카테고리 항목에 클릭 이벤트 추가
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 현재 활성화된 카테고리의 active 클래스 제거
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // 클릭된 카테고리에 active 클래스 추가
            this.classList.add('active');
            
            // 콘텐츠 영역 업데이트
            const categoryName = this.textContent.trim();
            const content = categoryContents[categoryName] || '콘텐츠를 찾을 수 없습니다.';
            
            // 페이드 효과를 위한 클래스 조작
            contentArea.style.opacity = '0';
            setTimeout(() => {
                contentArea.innerHTML = content;
                contentArea.style.opacity = '1';
            }, 200);
        });
    });
});

function createTransition(targetUrl) {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    requestAnimationFrame(() => {
        setTimeout(() => {
            transition.classList.add('active');
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600);
        }, 50);
    });
}