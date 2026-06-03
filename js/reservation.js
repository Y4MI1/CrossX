// 페이지 전환 애니메이션을 위한 함수
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

// 패키지 페이지로 이동 함수
function goToReservation(packageName, basePrice, duration) {
    const params = new URLSearchParams({
        package: packageName,
        price: basePrice,
        duration: duration
    });
    
    createTransition(`reservation-rules.html?${params.toString()}`);
}

// 날짜 정보 업데이트 함수
function updateDateInfo(startDate, duration) {
    if (!startDate) return;

    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + duration - 1);

    const formatDate = (date) => {
        return date.toLocaleDateString('ko-KR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
    };

    document.getElementById('travelPeriod').textContent = 
        `${formatDate(start)} ~ ${formatDate(end)} (${duration}일)`;
    document.getElementById('endDate').textContent = formatDate(end);
}

// 가격 업데이트 함수
function updatePrice(basePrice) {
    const selectedPeople = document.querySelector('.people-btn.active');
    const selectedFloor = document.querySelector('.floor-btn.active');
    const date = document.getElementById('travelDate').value;
    
    if (selectedPeople && date && selectedFloor) {
        const people = parseInt(selectedPeople.dataset.people);
        const floorMultiplier = parseFloat(selectedFloor.dataset.priceMultiplier);
        const totalPrice = basePrice * people * floorMultiplier;
        document.getElementById('totalPrice').textContent = 
            `₩${totalPrice.toLocaleString()}원`;
    }
}

// 다음 단계로 이동하는 함수
function goToNextStep() {
    const selectedPeople = document.querySelector('.people-btn.active');
    const selectedFloor = document.querySelector('.floor-btn.active');
    const date = document.getElementById('travelDate').value;
    
    if (!selectedPeople || !date || !selectedFloor) {
        showModal('인원, 날짜, 층수를 모두 선택해주세요.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const params = new URLSearchParams({
        package: urlParams.get('package'),
        price: urlParams.get('price'),
        duration: urlParams.get('duration'),
        people: selectedPeople.dataset.people,
        startDate: date,
        endDate: document.getElementById('endDate').textContent,
        totalPrice: document.getElementById('totalPrice').textContent,
        floorType: selectedFloor.dataset.floor
    });

    createTransition(`reservation-step2.html?${params.toString()}`);
}

// 모달 표시 함수
function showModal(message, callback = null) {
    const modal = document.getElementById('customModal');
    const modalText = modal.querySelector('.modal-text');
    const modalButton = modal.querySelector('.modal-button');
    
    modalText.textContent = message;
    modal.classList.add('show');
    
    modalButton.onclick = () => {
        modal.classList.remove('show');
        if (callback) {
            setTimeout(callback, 300);
        }
    };
}

// 이메일 유효성 검사 함수
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 예약 완료 처리 함수
function completeReservation() {
    const email = document.getElementById('emailInput').value;
    
    if (!email) {
        showModal('이메일 주소를 입력해주세요.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showModal('올바른 이메일 주소가 아닙니다.');
        return;
    }

    // 예약 코드 생성
    const reservationCode = generateReservationCode();

    // URL 파라미터에서 기본 가격 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const basePrice = parseFloat(urlParams.get('price'));

    // 예약 정보 수집
    const packageName = document.getElementById('packageName').textContent;
    const travelDates = document.getElementById('travelDates').textContent;
    const [startDate, endDate] = travelDates.split(' ~ ');
    const peopleCount = document.getElementById('peopleCount').textContent;
    const floorType = document.getElementById('floorType').textContent;
    const totalPrice = document.getElementById('totalPrice').textContent;
    const duration = urlParams.get('duration');

    // EmailJS 템플릿 파라미터
    const templateParams = {
        reservation_code: reservationCode,
        user_email: email,
        package_name: packageName,
        travel_duration: duration,
        start_date: startDate,
        end_date: endDate,
        people_count: peopleCount,
        floor_type: floorType,
        base_price: basePrice.toLocaleString(),
        total_price: totalPrice
    };

    // 이메일 전송
    emailjs.send('service_pth587o', 'template_i0vn5r8', templateParams)
        .then(function(response) {
            showModal('예약이 완료되었습니다! 예약 확인 메일이 발송되었습니다.', () => {
                setTimeout(() => {
                    window.location.href = 'reservation.html';
                }, 500);
            });
        }, function(error) {
            showModal('메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
            console.error('이메일 전송 실패:', error);
        });
}

function generateReservationCode() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `CX${year}${month}${day}-${random}`;
}

// 규칙 동의 진행 함수
function proceedToNextStep() {
    const urlParams = window.location.search;
    createTransition(`route.html${urlParams}`); // course 페이지로 이동
}

// 페이지별 초기화 로직
document.addEventListener('DOMContentLoaded', function() {
    // 예약 규칙 페이지 초기화
    if (window.location.pathname.includes('reservation-rules.html')) {
        const checkbox = document.getElementById('rulesAgreement');
        const nextButton = document.querySelector('.next-btn');
        
        checkbox.addEventListener('change', function() {
            nextButton.disabled = !this.checked;
        });
    }
    
    // 예약 스텝1 페이지 초기화
    if (window.location.pathname.includes('reservation-step1.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const packageName = urlParams.get('package');
        const basePrice = parseInt(urlParams.get('price'));
        const duration = parseInt(urlParams.get('duration'));

        document.getElementById('packageTitle').textContent = packageName;

        const dateInput = document.getElementById('travelDate');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;

        dateInput.addEventListener('change', function() {
            updateDateInfo(this.value, duration);
            updatePrice(basePrice);
        });

        const peopleButtons = document.querySelectorAll('.people-btn');
        peopleButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                peopleButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                updatePrice(basePrice);
            });
        });

        const floorButtons = document.querySelectorAll('.floor-btn');
        floorButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                floorButtons.forEach(b => {
                    b.classList.remove('active');
                    document.getElementById(`${b.dataset.floor}Services`).style.display = 'none';
                });
                
                this.classList.add('active');
                document.getElementById(`${this.dataset.floor}Services`).style.display = 'block';
                updatePrice(basePrice);
            });
        });

        // 기본값으로 스탠다드 선택
        document.querySelector('.floor-btn[data-floor="standard"]').click();
    }
    
    // 예약 스텝2 페이지 초기화
    if (window.location.pathname.includes('reservation-step2.html')) {
        const urlParams = new URLSearchParams(window.location.search);
    
        // 예약 정보 표시
        document.getElementById('packageName').textContent = urlParams.get('package');
        document.getElementById('travelDates').textContent = 
            `${urlParams.get('startDate')} ~ ${urlParams.get('endDate')}`;
        document.getElementById('peopleCount').textContent = 
            `${urlParams.get('people')}인`;
    
        // 층 정보 표시 개선
        const floorType = urlParams.get('floorType');
        let floorTypeText;
        switch(floorType) {
            case 'standard':
                floorTypeText = '스탠다드';
                break;
            case 'standard-plus':
                floorTypeText = '스탠다드 플러스';
                break;
            case 'vip':
                floorTypeText = 'VIP';
                break;
            default:
                floorTypeText = '선택되지 않음';
        }
        document.getElementById('floorType').textContent = floorTypeText;
    
        document.getElementById('totalPrice').textContent = 
            urlParams.get('totalPrice');
        document.getElementById('finalPrice').textContent = 
            urlParams.get('totalPrice');
    }
});

function toggleRules(section) {
    let targetId;
    switch(section) {
        case 'prohibited':
            targetId = 'prohibited-items';
            break;
        case 'safety':
            targetId = 'safety-precautions';
            break;
        case 'general':
            targetId = 'general-rules';
            break;
    }
    
    const clickedSection = document.getElementById(targetId).closest('.rules-section');
    clickedSection.classList.toggle('active');
}

// 페이지 로드 시 모든 섹션 닫힌 상태로 시작
document.addEventListener('DOMContentLoaded', function() {
    const allSections = document.querySelectorAll('.rules-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
});