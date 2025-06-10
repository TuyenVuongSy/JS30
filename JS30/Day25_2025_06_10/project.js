document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('searchBox');
    const categoryFilter = document.getElementById('categoryFilter');
    const areaFilter = document.getElementById('areaFilter');
    const searchButton = document.querySelector('.search-bar button');
    const places = document.querySelectorAll('.place');
    const listSection = document.getElementById('list');

    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitButton = document.querySelector('.contact-form button');

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Xóa Bộ Lọc';
    resetButton.style.marginLeft = '10px';
    resetButton.style.padding = '0.8rem 1.5rem';
    resetButton.style.background = '#ff7043';
    resetButton.style.color = 'white';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '5px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.fontSize = '1rem';
    resetButton.addEventListener('click', () => {
        searchBox.value = '';
        categoryFilter.value = '';
        areaFilter.value = '';
        filterPlaces();
    });
    document.querySelector('.search-bar').appendChild(resetButton);

    const noResults = document.createElement('p');
    noResults.id = 'no-results';
    noResults.textContent = 'Không tìm thấy quán ăn nào.';
    noResults.style.display = 'none';
    noResults.style.textAlign = 'center';
    noResults.style.color = '#e6a19';
    noResults.style.marginTop = '1rem';
    listSection.appendChild(noResults);

    const formMessage = document.createElement('p');
    formMessage.id = 'form-message';
    formMessage.style.display = 'none';
    formMessage.style.textAlign = 'center';
    formMessage.style.marginTop = '1rem';
    contactForm.appendChild(formMessage);

    function debounce(func, wait) {
        let timeout;
        return function excutedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});