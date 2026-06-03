// route.js
// 패키지별 여행 코스 데이터
const packageRoutes = {
    '프랑스-영국 메인 크루즈': {
        title: '프랑스-영국 메인 크루즈 코스',
        duration: 12,
        cities: [
            {
                name: '칸',
                description: '칸은 영화의 도시, 리비에라의 여신입니다! 세계적인 영화제의 보석 같은 도시에서 럭셔리한 해변과 알프 마르티옴 성의 고풍스러운 매력에 빠져보세요. 크루즈 출발 전 잊지 못할 황홀한 추억을 선사합니다.',
                duration: '체류 기간: 2일',
                isMajor: true
            },
            {
                name: '파리',
                description: '로맨스의 수도 파리에서 당신의 꿈을 실현하세요! 에펠탑, 루브르 박물관, 노트르담 대성당이 펼쳐내는 예술의 향연을 만끽하고, 센느강 크루즈로 파리의 낭만을 온전히 느껴보세요.',
                duration: '체류 기간: 3일',
                isMajor: false
            },
            {
                name: '르아브르',
                description: '노르망디의 관문, 르아브르에서 감성적인 여행의 순간을 포착하세요. 아름다운 센느강 하구의 풍경, 고대 대성당, 해양 박물관이 당신을 기다리고 있습니다.',
                duration: '체류 기간: 2일',
                isMajor: false
            },
            {
                name: '사우샘프턴',
                description: '타이타닉의 추억이 깃든 도시, 사우샘프턴에서 영국 해양 역사의 로망을 느껴보세요. 해양 박물관과 풍부한 역사 탐방이 여러분을 기다립니다.',
                duration: '체류 기간: 2일',
                isMajor: false
            },
            {
                name: '런던',
                description: '세계 최고의 도시 런던에서 여행의 하이라이트를 장식하세요! 빅벤, 런던 아이, 버킹엄 궁전이 펼치는 영국의 정통 매력에 푹 빠져보세요.',
                duration: '체류 기간: 3일',
                isMajor: true
            }
        ]
    },
    '프랑스-영국 클래식 크루즈': {
        title: '프랑스-영국 클래식 크루즈 코스',
        duration: 10,
        cities: [
            {
                name: '보르도',
                description: '프랑스 남서부의 보석 같은 도시, 보르도에서 고전적인 건축과 최고급 와인의 맛을 만끽하세요.',
                duration: '체류 기간: 1일',
                isMajor: true
            },
            {
                name: '낭트',
                description: '르네의 성과 에르미타주 박물관이 있는 낭트에서 고풍스러운 매력과 현대적 문화의 조화를 경험해보세요.',
                duration: '체류 기간: 2일',
                isMajor: false
            },
            {
                name: '셰르부르',
                description: '아름다운 해안선과 다채로운 해양 활동으로 가득한 셰르부르에서 바다의 숨결을 느껴보세요.',
                duration: '체류 기간: 1일',
                isMajor: false
            },
            {
                name: '플리머스',
                description: '영국 해양 역사의 숨결이 살아있는 플리머스에서 역사적 여정을 떠나보세요.',
                duration: '체류 기간: 2일',
                isMajor: false
            },
            {
                name: '브리스톨',
                description: '현대 예술과 고풍스러운 건축물이 공존하는 브리스톨에서 독특한 도시의 매력을 발견하세요.',
                duration: '체류 기간: 1일',
                isMajor: false
            },
            {
                name: '런던',
                description: '세계적인 도시 런던에서 여행의 꽃을 피우세요!',
                duration: '체류 기간: 2~3일',
                isMajor: true
            }
        ]
    },
    '지중해-영국 크루즈': {
        title: '지중해-영국 크루즈 코스',
        duration: 10,
        cities: [
            {
                name: '마르세유',
                description: '유네스코 세계유산 구항을 자랑하는 마르세유에서 지중해의 숨결을 느껴보세요.',
                duration: '체류 기간: 2일',
                isMajor: true
            },
            {
                name: '니스',
                description: '아쥬르 해변과 프롱프롱 거리에서 프랑스 리비에라의 황홀한 매력에 빠져보세요.',
                duration: '체류 기간: 2일',
                isMajor: false
            },
            {
                name: '도버',
                description: '고대 성벽과 도버 성이 펼치는 역사적 landscape를 감상하세요.',
                duration: '체류 기간: 1일',
                isMajor: false
            },
            {
                name: '헤리포드',
                description: '헤리포드 대성당과 성에서 전통적인 영국 시골의 여유를 만끽하세요.',
                duration: '체류 기간: 1일',
                isMajor: false
            },
            {
                name: '포츠머스',
                description: '세계적인 해상 교차점 포츠머스에서 영국 해양 역사의 생생한 현장을 탐방하세요.',
                duration: '체류 기간: 1일',
                isMajor: false
            },
            {
                name: '런던',
                description: '세계가 사랑하는 도시 런던에서 당신의 크루즈 여행을 잊지 못할 추억으로 장식하세요!',
                duration: '체류 기간: 2~3일',
                isMajor: true
            }
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initializeRouteDisplay();
    initializeCityBlocks();
});

function initializeRouteDisplay() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageName = urlParams.get('package');
    const routeData = packageRoutes[packageName];

    if (!routeData) {
        console.error('패키지 정보를 찾을 수 없습니다.');
        return;
    }

    // 타이틀 업데이트
    document.querySelector('.route-title h1').textContent = routeData.title;

    // 타임라인 컨테이너 가져오기
    const timelineContainer = document.querySelector('.route-timeline');
    timelineContainer.innerHTML = ''; // 기존 내용 초기화

    // 도시 블록 생성
    routeData.cities.forEach(city => {
        const cityElement = createCityElement(city);
        timelineContainer.appendChild(cityElement);
    });

    // 총 소요 기간 업데이트
    document.querySelector('.total-duration p').textContent = `${routeData.duration}일`;
}

function createCityElement(cityData) {
    const cityDiv = document.createElement('div');
    cityDiv.className = `route-city${cityData.isMajor ? ' major' : ''}`;
    
    cityDiv.innerHTML = `
        <div class="city-block">
            <div class="city-name">${cityData.name}</div>
            <div class="city-details">
                <div class="city-description">
                    ${cityData.description}
                </div>
                <div class="city-duration">${cityData.duration}</div>
            </div>
        </div>
    `;
    
    return cityDiv;
}

function initializeCityBlocks() {
    const cityBlocks = document.querySelectorAll('.city-block');
    
    cityBlocks.forEach(block => {
        block.addEventListener('click', function(e) {
            // 사이드바가 열려있으면 클릭 무시
            if (document.querySelector('.side-bar').classList.contains('open')) {
                return;
            }

            // 현재 활성화된 상태 확인
            const isActive = this.classList.contains('active');
            
            // 다른 모든 블록 닫기
            cityBlocks.forEach(otherBlock => {
                if (otherBlock !== this && otherBlock.classList.contains('active')) {
                    otherBlock.classList.remove('active');
                }
            });
            
            // 현재 블록 토글
            if (!isActive) {
                this.classList.add('active');
            } else {
                this.classList.remove('active');
            }
        });
    });
}

function proceedToNextStep() {
    const urlParams = new URLSearchParams(window.location.search);
    createTransition(`reservation-step1.html${urlParams ? '?' + urlParams : ''}`);
}