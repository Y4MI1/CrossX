function handleContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !category || !message) {
        showModal('모든 항목을 입력해주세요.');
        return false;
    }

    showModal('문의가 접수되었습니다. 감사합니다.', () => {
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    });
    
    return false;
}

function showModal(message, callback = null) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="modal-text">${message}</div>
            <button class="modal-button">확인</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    const button = modal.querySelector('.modal-button');
    button.onclick = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            if (callback) callback();
        }, 300);
    };
}