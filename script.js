// Interactive functionality for the Hello World website

function scrollToContent() {
    const content = document.querySelector('.container');
    content.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function showMessage() {
    const messages = [
        "Hello there! 👋",
        "Welcome to the website! 🌟",
        "Thanks for visiting! ✨",
        "Have a great day! 😊",
        "You're awesome! 🎉"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create a notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = randomMessage;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        font-weight: 600;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        animation: slideIn 0.5s ease forwards;
    `;
    
    // Add the notification to the page
    document.body.appendChild(notification);
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add some interactive effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    // Add click effect to cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add parallax effect to hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.6; // Increased parallax speed from -0.3 to -0.6
        
        if (hero) {
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    });
    
    // Add typing effect to title
    const title = document.querySelector('.hero-title');
    const firstMessage = "Ви хочете вивчити польську мову?";
    const secondMessage = "Chcę nauczyć się polskiego!";
    
    let i = 0;
    let isDeleting = false;
    let currentMessage = firstMessage;
    
    const typeWriter = () => {
        if (!isDeleting) {
            // Typing the message
            if (i < currentMessage.length) {
                title.textContent = currentMessage.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Wait 1 second, then start deleting
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, 1000);
            }
        } else {
            // Deleting letters one by one
            if (i > 0) {
                title.textContent = currentMessage.substring(0, i - 1);
                i--;
                setTimeout(typeWriter, 50);
            } else {
                // Switch to the other message and start typing again
                isDeleting = false;
                currentMessage = (currentMessage === firstMessage) ? secondMessage : firstMessage;
                typeWriter();
            }
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
    
    // Add video click functionality for fade-out effects
    const videoPlayers = document.querySelectorAll('.video-player');
    videoPlayers.forEach(video => {
        const videoItem = video.closest('.video-item');
        const textOverlay = videoItem.querySelector('.video-text-overlay');
        
        // Handle play event
        video.addEventListener('play', function() {
            // Add playing class to video
            this.classList.add('playing');
            // Fade out the text overlay
            if (textOverlay) {
                textOverlay.style.opacity = '0';
            }
            
            // Try to unmute the video after it starts playing (for mobile autoplay compliance)
            if (this.muted) {
                // Small delay to ensure play has started
                setTimeout(() => {
                    this.muted = false;
                }, 100);
            }
        });
        
        // Handle pause event
        video.addEventListener('pause', function() {
            // Remove playing class from video
            this.classList.remove('playing');
            // Fade in the text overlay
            if (textOverlay) {
                textOverlay.style.opacity = '1';
            }
        });
        
        // Handle ended event
        video.addEventListener('ended', function() {
            // Remove playing class from video
            this.classList.remove('playing');
            // Fade in the text overlay
            if (textOverlay) {
                textOverlay.style.opacity = '1';
            }
        });

        // Handle loadstart event to ensure proper initial state
        video.addEventListener('loadstart', function() {
            // Ensure video starts in paused state
            this.classList.remove('playing');
            if (textOverlay) {
                textOverlay.style.opacity = '1';
            }
        });

        // Handle canplay event to ensure video is ready
        video.addEventListener('canplay', function() {
            // Video is ready to play
            console.log('Video ready to play');
            
            // On mobile, ensure video is muted by default to comply with autoplay policies
            if (this.muted === false) {
                this.muted = true;
            }
        });

        // Handle mouse enter - prevent overlay from returning while playing
        video.addEventListener('mouseenter', function() {
            // If video is playing, ensure overlay stays hidden
            if (this.classList.contains('playing')) {
                this.classList.add('playing');
                if (textOverlay) {
                    textOverlay.style.opacity = '0';
                }
            }
        });

        // Handle mouse leave - restore overlay if video is paused
        video.addEventListener('mouseleave', function() {
            // If video is paused, ensure overlay is visible
            if (!this.classList.contains('playing')) {
                this.classList.remove('playing');
                if (textOverlay) {
                    textOverlay.style.opacity = '1';
                }
            }
        });

        // Add mousedown event for better desktop click handling
        video.addEventListener('mousedown', function(e) {
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Video mousedown detected');
        });

        // Add click functionality for mobile - click anywhere on video to play/pause
        video.addEventListener('click', function(e) {
            // Prevent any default behavior
            e.preventDefault();
            e.stopPropagation();
            
            // Check if click is on video controls - if so, don't interfere
            const rect = this.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const videoHeight = rect.height;
            
            // Debug info
            console.log('Video clicked!');
            console.log('Click Y position:', clickY, 'Video height:', videoHeight);
            console.log('Video paused state:', this.paused);
            console.log('Click event target:', e.target);
            
            // If click is in the bottom 20% of video (where controls usually are), don't interfere
            if (clickY > videoHeight * 0.8) {
                console.log('Click on controls area - not interfering');
                return;
            }
            
            // Toggle play/pause for clicks on the main video area
            if (this.paused) {
                console.log('Attempting to play video...');
                this.play().catch(error => {
                    console.log('Video play failed:', error);
                });
            } else {
                console.log('Attempting to pause video...');
                this.pause();
            }
        });

        // Add touch event handling for better mobile interaction
        video.addEventListener('touchstart', function(e) {
            // Prevent default touch behavior to avoid conflicts
            e.preventDefault();
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
        });

        video.addEventListener('touchend', function(e) {
            // Restore normal scale
            this.style.transform = 'scale(1)';
            
            // Get touch position
            const rect = this.getBoundingClientRect();
            const touch = e.changedTouches[0];
            const touchY = touch.clientY - rect.top;
            const videoHeight = rect.height;
            
            // If touch is in the bottom 20% of video (where controls usually are), don't interfere
            if (touchY > videoHeight * 0.8) {
                return;
            }
            
            // Toggle play/pause for touches on the main video area
            if (this.paused) {
                this.play().catch(error => {
                    console.log('Video play failed on touch:', error);
                });
            } else {
                this.pause();
            }
        });

        // Prevent context menu on long press for mobile
        video.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    });
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animation for the notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
        }
        to {
            transform: translateX(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .field-error {
        color: #dc3545;
        font-size: 12px;
        margin-top: 5px;
        font-weight: 500;
        animation: fadeIn 0.3s ease;
    }
    
    .error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .error:focus {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .form-field {
        position: relative;
        margin-bottom: 20px;
    }
    
    .form-field input {
        transition: all 0.3s ease;
    }
    
    .form-field input:focus {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }
    
    .form-field input.error:focus {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(220, 53, 69, 0.2);
    }
`;
document.head.appendChild(style);

// Custom Form Handling with Google Apps Script
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    enhanceFormFields();
    validateFormAccessibility();
});

// Form validation function
function validateFormData(firstName, email, phone) {
    // Check if fields are not empty
    if (!firstName || !firstName.trim()) {
        return { isValid: false, message: 'Будь ласка, введіть ваше ім\'я.' };
    }
    
    if (!email || !email.trim()) {
        return { isValid: false, message: 'Будь ласка, введіть ваш email.' };
    }
    
    if (!phone || !phone.trim()) {
        return { isValid: false, message: 'Будь ласка, введіть ваш номер телефону.' };
    }
    
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Будь ласка, введіть коректний email адрес.' };
    }
    
    // Check email length (reasonable limits)
    if (email.length > 254) {
        return { isValid: false, message: 'Email адрес занадто довгий.' };
    }
    
    // Check if email has reasonable domain
    const emailParts = email.split('@');
    if (emailParts[1].length < 3 || emailParts[1].length > 63) {
        return { isValid: false, message: 'Email адрес має некоректний формат.' };
    }
    
    // Additional email security checks
    if (email.includes('..') || email.includes('--') || email.includes('__')) {
        return { isValid: false, message: 'Email адрес містить недозволені символи.' };
    }
    
    // Check for disposable email domains (basic check)
    const disposableDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com'];
    const domain = emailParts[1].toLowerCase();
    if (disposableDomains.some(d => domain.includes(d))) {
        return { isValid: false, message: 'Будь ласка, використовуйте постійний email адрес.' };
    }
    
    // Validate phone number format
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if phone has reasonable length (7-15 digits is typical for international numbers)
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
        return { isValid: false, message: 'Номер телефону має бути від 7 до 15 цифр.' };
    }
    
    // Check if phone contains only digits and common separators
    const phoneRegex = /^[\+]?[0-9\s\-\(\)\.]+$/;
    if (!phoneRegex.test(phone)) {
        return { isValid: false, message: 'Номер телефону містить недозволені символи.' };
    }
    
    // All validations passed for phone
    
    // Validate first name
    if (firstName.length < 2 || firstName.length > 50) {
        return { isValid: false, message: 'Ім\'я має бути від 2 до 50 символів.' };
    }
    
    // Check if first name contains only letters, spaces, and common characters
    const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄ'\s\-\.]+$/;
    if (!nameRegex.test(firstName)) {
        return { isValid: false, message: 'Ім\'я містить недозволені символи.' };
    }
    
    // All validations passed
    return { isValid: true, message: '' };
}

// Enhanced real-time validation function
function validateFieldInRealTime(field, fieldType) {
    const value = field.value.trim();
    const errorElement = field.parentNode.querySelector('.field-error');
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Clear existing error message
    if (errorElement) {
        errorElement.remove();
    }
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldType) {
        case 'firstName':
            if (!value) {
                isValid = false;
                errorMessage = 'Будь ласка, введіть ваше ім\'я.';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Ім\'я має бути не менше 2 символів.';
            } else if (value.length > 50) {
                isValid = false;
                errorMessage = 'Ім\'я має бути не більше 50 символів.';
            } else if (!/^[a-zA-Zа-яА-ЯіІїЇєЄ'\s\-\.]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Ім\'я містить недозволені символи.';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'Будь ласка, введіть ваш email.';
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                isValid = false;
                errorMessage = 'Будь ласка, введіть коректний email адрес.';
            } else if (value.length > 254) {
                isValid = false;
                errorMessage = 'Email адрес занадто довгий.';
            }
            break;
            
        case 'phone':
            if (!value) {
                isValid = false;
                errorMessage = 'Будь ласка, введіть ваш номер телефону.';
            } else {
                const cleanPhone = value.replace(/\D/g, '');
                if (cleanPhone.length < 7 || cleanPhone.length > 15) {
                    isValid = false;
                    errorMessage = 'Номер телефону має бути від 7 до 15 цифр.';
                } else if (!/^[\+]?[0-9\s\-\(\)\.]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Номер телефону містить недозволені символи.';
                }
            }
            break;
    }
    
    // Apply validation styling and show error message
    if (!isValid) {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Function to show field-specific error messages
function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 12px;
        margin-top: 5px;
        font-weight: 500;
        animation: fadeIn 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorElement);
}

// Function to clear all field errors
function clearAllFieldErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// Function to enhance form fields with better UX
function enhanceFormFields() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    
    inputs.forEach(input => {
        // Add floating label effect
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    label.classList.remove('active');
                }
            });
            
            // Check initial state
            if (input.value.trim()) {
                label.classList.add('active');
            }
        }
        
        // Add character counter for name field
        if (input.name === 'firstName') {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = `
                font-size: 11px;
                color: #6c757d;
                text-align: right;
                margin-top: 2px;
                transition: color 0.3s ease;
            `;
            input.parentNode.appendChild(counter);
            
            const updateCounter = () => {
                const count = input.value.length;
                const max = 50;
                counter.textContent = `${count}/${max}`;
                
                if (count > max * 0.8) {
                    counter.style.color = count > max ? '#dc3545' : '#ffc107';
                } else {
                    counter.style.color = '#6c757d';
                }
            };
            
            input.addEventListener('input', updateCounter);
            updateCounter(); // Initial count
        }
        
        // Add phone formatting
        if (input.name === 'phone') {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                // Format international phone numbers
                if (value.startsWith('1') && value.length === 11) {
                    // US/Canada format: +1 (555) 123-4567
                    value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
                } else if (value.startsWith('44') && value.length >= 10) {
                    // UK format: +44 20 7946 0958
                    value = value.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1 $2 $3 $4');
                } else if (value.startsWith('49') && value.length >= 10) {
                    // Germany format: +49 30 12345678
                    value = value.replace(/(\d{2})(\d{2})(\d{6,})/, '+$1 $2 $3');
                } else if (value.startsWith('33') && value.length >= 9) {
                    // France format: +33 1 23 45 67 89
                    value = value.replace(/(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5 $6');
                } else if (value.startsWith('380') && value.length === 12) {
                    // Ukraine format: +380 50 123 45 67
                    value = value.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
                } else if (value.startsWith('0') && value.length >= 10) {
                    // Local format (various countries): 050 123 45 67
                    if (value.length === 11) {
                        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
                    } else {
                        value = value.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
                    }
                } else if (value.length >= 10) {
                    // Generic international format: +123 456 789 012
                    if (value.startsWith('+')) {
                        value = value.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d{3,4})/, '$1 $2 $3 $4');
                    } else {
                        value = value.replace(/(\d{1,3})(\d{3})(\d{3})(\d{3,4})/, '+$1 $2 $3 $4');
                    }
                }
                
                e.target.value = value;
            });
        }
    });
}

// Function to validate form accessibility
function validateFormAccessibility() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    
    inputs.forEach(input => {
        // Ensure proper labeling
        if (!input.id || !input.getAttribute('aria-label')) {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                if (!input.id) {
                    input.id = `field-${input.name}`;
                }
                label.setAttribute('for', input.id);
            }
        }
        
        // Add proper ARIA attributes
        if (!input.getAttribute('aria-describedby')) {
            input.setAttribute('aria-describedby', `error-${input.name}`);
        }
        
        // Add required attribute for screen readers
        if (!input.hasAttribute('required')) {
            input.setAttribute('required', 'true');
        }
    });
}

// Enhanced form submission with real-time validation
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Rate limiting and spam protection
    let submissionAttempts = 0;
    let lastSubmissionTime = 0;
    const MAX_ATTEMPTS = 3;
    const RATE_LIMIT_WINDOW = 60000; // 1 minute
    
    const fields = {
        firstName: contactForm.querySelector('input[name="firstName"]'),
        email: contactForm.querySelector('input[name="email"]'),
        phone: contactForm.querySelector('input[name="phone"]')
    };
    
    // Add real-time validation to each field
    Object.entries(fields).forEach(([fieldType, field]) => {
        if (field) {
            // Validate on blur (when user leaves the field)
            field.addEventListener('blur', () => {
                validateFieldInRealTime(field, fieldType);
            });
            
            // Validate on input (as user types)
            field.addEventListener('input', () => {
                // Clear error styling while typing
                field.classList.remove('error');
                const errorElement = field.parentNode.querySelector('.field-error');
                if (errorElement) {
                    errorElement.remove();
                }
            });
            
            // Validate on keyup (for immediate feedback)
            field.addEventListener('keyup', () => {
                if (field.value.trim().length > 0) {
                    validateFieldInRealTime(field, fieldType);
                }
            });
        }
    });
    
    // Enhanced form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Rate limiting check
        const now = Date.now();
        if (now - lastSubmissionTime < RATE_LIMIT_WINDOW) {
            submissionAttempts++;
            if (submissionAttempts >= MAX_ATTEMPTS) {
                showFormNotification('Занадто багато спроб. Спробуйте через хвилину.', 'error');
                return;
            }
        } else {
            // Reset rate limiting if outside the window
            submissionAttempts = 1;
        }
        lastSubmissionTime = now;
        
        // Clear any existing errors
        clearAllFieldErrors();
        
        // Get form data
        const formData = new FormData(this);
        const firstName = formData.get('firstName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        
        // Validate all fields
        const firstNameValid = validateFieldInRealTime(fields.firstName, 'firstName');
        const emailValid = validateFieldInRealTime(fields.email, 'email');
        const phoneValid = validateFieldInRealTime(fields.phone, 'phone');
        
        // If any field is invalid, stop submission
        if (!firstNameValid || !emailValid || !phoneValid) {
            showFormNotification('Будь ласка, виправте помилки в формі перед відправкою.', 'error');
            return;
        }
        
        // Additional comprehensive validation
        const validationResult = validateFormData(firstName, email, phone);
        if (!validationResult.isValid) {
            showFormNotification(validationResult.message, 'error');
            return;
        }
        
        // Spam protection - check for suspicious patterns
        if (isSpamSubmission(firstName, email, phone)) {
            showFormNotification('Повідомлення виглядає підозріло. Спробуйте ще раз.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.contact-submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Надсилаю...';
        submitBtn.disabled = true;
        
        // Prepare data for Google Apps Script
        const data = {
            firstName: firstName,
            email: email,
            phone: `'${phone}`, // Add apostrophe to force text mode, prevents formula parsing
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        // Replace this URL with your Google Apps Script web app URL
        const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbywW7baAhfdTNQxjggkEyjP8zoo-MbfGZjz6cEcy97K0qrAw9gALjQG8_ay441SKqka/exec';
        
        // Submit to Google Apps Script
        fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data)
        })
        .then(response => {
            // Show success message
            showFormNotification('Дякуємо! Ваше повідомлення надіслано успішно.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Clear any remaining error styling
            clearAllFieldErrors();
            
            // Reset rate limiting on successful submission
            submissionAttempts = 0;
        })
        .catch(error => {
            console.error('Error:', error);
            showFormNotification('Помилка при надсиланні. Спробуйте ще раз.', 'error');
        })
        .finally(() => {
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Spam detection function
function isSpamSubmission(firstName, email, phone) {
    // Check for excessive repetition
    const repeatedChars = /(.)\1{4,}/;
    if (repeatedChars.test(firstName) || repeatedChars.test(email)) {
        return true;
    }
    
    // Check for suspicious patterns in names
    const suspiciousNames = ['test', 'admin', 'user', 'guest', 'anonymous', 'spam', 'bot'];
    if (suspiciousNames.some(name => firstName.toLowerCase().includes(name))) {
        return true;
    }
    
    // Check for excessive numbers in name
    const numberCount = (firstName.match(/\d/g) || []).length;
    if (numberCount > firstName.length * 0.3) {
        return true;
    }
    
    // Check for suspicious email patterns
    if (email.includes('test@') || email.includes('admin@') || email.includes('spam@')) {
        return true;
    }
    
    return false;
}

// Function to show form submission notifications
function showFormNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)'};
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        font-weight: 600;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        animation: slideIn 0.5s ease forwards;
    `;
    
    // Add the notification to the page
    document.body.appendChild(notification);
    
    // Remove the notification after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}
