// about.js

function toggleSideBar() {
    const sideBar = document.querySelector('.side-bar');
    sideBar.classList.toggle('open');
}

document.addEventListener('click', function(event) {
    const sideBar = document.querySelector('.side-bar');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (!sideBar.contains(event.target) && 
        !menuIcon.contains(event.target) && 
        sideBar.classList.contains('open')) {
        sideBar.classList.remove('open');
    }
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

document.addEventListener('DOMContentLoaded', function() {
    // 페이지 선택 버튼 기능
    const selectorBtns = document.querySelectorAll('.selector-btn');
    const contentSections = document.querySelectorAll('.content-section');

    selectorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetPage = this.dataset.page;
            
            // 버튼 활성화 상태 변경
            selectorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 콘텐츠 섹션 표시
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetPage) {
                    section.classList.add('active');
                }
            });
        });
    });

    // 층별 안내 기능
    const floorData = {
        '3F': {
            image: 'images/3f.png',
            facilities: [
                '잠수리움',
                '화장실',
                '계단/엘레베이터'
            ]
        },

        '4F': {
            image: 'images/4f.png',
            facilities: [
                '객실 (창문 X)',
                '카페테리아',
                '계단/엘레베이터'
            ]
        },
        
        '5F': {
            image: 'images/5f.png',
            facilities: [
                '센터 (고객,의료,상담,안전관리)',
                '로비',
                '계단/엘레베이터'
            ]
        },

        '6F': {
            image: 'images/6f.png',
            facilities: [
                '플라스틱 제로 워크숍',
                '클럽 (에코 키즈, 패밀리)',
                '상점',
                '로컬 &  제철 식재료 활용 요리 클래스',
                '세미나 룸',
                '화장실',
                '계단/엘레베이터'
            ]
        },

        '7F': {
            image: 'images/7f.png',
            facilities: [
                '크루즈 주변 해양 생물 관찰',
                '해양 쓰레기에 대한 교육',
                '친환경 제품 만들기',
                '상점',
                '화장실',
                '계단/엘레베이터'
            ]
        },

        '8F': {
            image: 'images/8f.png',
            facilities: [
                '객실 (창문O)',
                '카페테리아',
                '화장실',
                '계단/엘레베이터'
            ]
        },

        '9F': {
            image: 'images/9f.png',
            facilities: [
                '오락시설',
                '카지노',
                '헬스장',
                '화장실',
                '계단/엘레베이터'
            ]
        },

        '10F': {
            image: 'images/10f.png',
            facilities: [
                '쇼핑센터',
                '극장',
                '레스토랑',
                '화장실',
                '계단/엘레베이터'
            ]
        },

        '11F': {
            image: 'images/11f.png',
            facilities: [
                '야외 수영장',
                '매점',
                '수면실',
                '와인바',
                '스파',
                '화장실',
                '계단/엘레베이터'
            ]
        },

        '12F': {
            image: 'images/12f.png',
            facilities: [
                '스위트룸',
                '로비',
                '스카이라운지',
                '화장실',
                '계단/엘레베이터'
            ]
        },

        '13F': {
            image: 'images/13f.png',
            facilities: [
                '전용 쇼핑 센터',
                '전용 고객 센터',
                '스카이라운지',
                '계단/엘레베이터'
            ]
        },

    };

    // 층별 버튼 생성
    const floorSelector = document.querySelector('.floor-selector');
    if (floorSelector) {
        for (let i = 3; i <= 13; i++) {
            const btn = document.createElement('button');
            btn.className = 'floor-btn';
            btn.textContent = `${i}F`;
            btn.dataset.floor = `${i}F`;
            floorSelector.appendChild(btn);
        }

        // 첫 번째 층 버튼 활성화
        const firstFloorBtn = floorSelector.querySelector('.floor-btn');
        if (firstFloorBtn) {
            firstFloorBtn.classList.add('active');
            updateFloorContent(firstFloorBtn.dataset.floor);
        }

        // 층별 버튼 클릭 이벤트
        const floorBtns = document.querySelectorAll('.floor-btn');
        floorBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                floorBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                updateFloorContent(this.dataset.floor);
            });
        });
    }

    function updateFloorContent(floor) {
        const data = floorData[floor];
        if (!data) return;
    
        const floorImage = document.getElementById('floorImage');
        const facilityList = document.getElementById('facilityList');
    
        floorImage.src = data.image;
        floorImage.alt = `${floor} 층 이미지`;
    
        facilityList.innerHTML = data.facilities
            .map(facility => `<li>${facility}</li>`)
            .join('');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const crewCards = document.querySelectorAll('.crew-card');
    
    crewCards.forEach(card => {
        card.addEventListener('click', function() {
            // 현재 클릭된 카드의 활성화 상태 확인
            const isActive = this.classList.contains('active');
            
            // 모든 카드 비활성화
            crewCards.forEach(otherCard => {
                otherCard.classList.remove('active');
            });
            
            // 현재 카드가 비활성화 상태였다면 활성화
            if (!isActive) {
                this.classList.add('active');
            }
        });
    });
});