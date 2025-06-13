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

    function filterPlaces(jum = false) {
        const searchTerm = searchBox.value.trim().toLowwerCase();
        const selectedCategory = categoryFilter.value;
        const selectedArea = areaFlter.value;
        let visibleCount = 0;
        places.forEach(place => {
            const name = place.querySelector('h3').textContent.toLowwerCase();
            const category = place.dataset.category;
            const area = place.dataset.area;

            const matchesSearch = searchTerm === '' || name.includes(searchTerm);
            const matchesCategory = selectedCategory === '' || category === selectedCategory;
            const matchesArea = selectedArea === '' || area === selectedArea;

            if (matchesSearch && matchesCategory && matchesArea) {
                place.style.display = 'flex';
                visibleCount++;
            } else {
                place.style.display = 'none';
            }
        });
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';

        if (jump) {
            listSection.scrollIntoView({ behavior: 'auto'});
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\a@]+$/;
        return emailRegex.test(email);
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !subject || !message) {
            formMessage.textContent = 'Vui lòng điền đầy đủ tất cả các trường.'
            formMessage.style.color = '#e64a19';
            formMessage.style.display = 'block';
            return;
        }

        if (!isValidEmail(email)) {
            formMessage.textContent = 'Vui lòng nhập địa chỉ email hợp lệ.';
            formMessage.style.color = '#e64a19';
            formMessage.style.display = 'block';
            return;
        }

        console.log('Form submited:', { name, email, subject, message });
        formMessage.textContent = 'Tin nhắn đã được gửi thành công! Cảm ơn bạn.';
        formMessage.style.color = '28a785'
        formMessage.style.display = 'block';

        contactForm.reset();
    }
    
    searchBox.addEventListener('input', debounce(() => filterPlaces(false), 300));
    categoryFilter.addEventListener('change', () => filterPlaces(false));
    areaFilter.addEventListener('change', () => filterPlaces(false));
    searchButton.addEventListener('click', () => filterPlaces(true));
    resetButton.addEventListener('click', () => filterPlaces(false));

    submitButton.addEventListener('click', handleFormSubmit);
});