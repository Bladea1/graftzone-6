document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверяем заполнение полей
        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const subject = contactForm.querySelector('#subject').value.trim();
        const message = contactForm.querySelector('#message').value.trim();
        
        if (!name || !email || !subject || !message) {
            alert('Пожалуйста, заполните все поля формы');
            return;
        }
        
        // Проверяем формат email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Пожалуйста, введите корректный email адрес');
            return;
        }
        
        // Блокируем кнопку и меняем текст
        submitButton.disabled = true;
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Отправка...';
        
        // Собираем данные формы
        const formData = new FormData(contactForm);
        
        // Отправляем запрос
        fetch('send_mail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Показываем уведомление
            alert(data.message);
            
            // Если успешно, очищаем форму
            if (data.success) {
                contactForm.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
        })
        .finally(() => {
            // Возвращаем кнопку в исходное состояние
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        });
    });
}); 