document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscribe-form');
    
    if (!form) return;
    
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const ageInput = document.getElementById('age');
    const termsCheckbox = document.getElementById('terms');
    
    const fullNameError = document.getElementById('fullName-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirmPassword-error');
    const ageError = document.getElementById('age-error');
    const termsError = document.getElementById('terms-error');
    
    const submissionMessage = document.getElementById('submission-message');
    
    // Helper function to show error message
    const showError = (input, errorElement, message) => {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.style.borderColor = '#e74c3c';
        return false;
    };
    
    // Helper function to hide error message
    const hideError = (input, errorElement) => {
        errorElement.style.display = 'none';
        input.style.borderColor = '#ddd';
        return true;
    };
    
    // Validation functions
    
    // 1. Full Name validation - must be at least 2 words and 5 characters long
    const validateFullName = () => {
        const value = fullNameInput.value.trim();
        
        if (value === '') {
            return showError(fullNameInput, fullNameError, 'Please enter your full name');
        }
        
        const nameParts = value.split(' ').filter(part => part.length > 0);
        
        if (nameParts.length < 2) {
            return showError(fullNameInput, fullNameError, 'Please enter both first and last name');
        }
        
        if (value.length < 5) {
            return showError(fullNameInput, fullNameError, 'Full name must be at least 5 characters long');
        }
        
        return hideError(fullNameInput, fullNameError);
    };
    
    // 2. Email validation - must have @ symbol and a domain
    const validateEmail = () => {
        const value = emailInput.value.trim();
        
        if (value === '') {
            return showError(emailInput, emailError, 'Please enter your email address');
        }
        
        // Check for @ symbol
        if (!value.includes('@')) {
            return showError(emailInput, emailError, 'Email must contain an @ symbol');
        }
        
        // Check for domain after @
        const parts = value.split('@');
        if (parts.length !== 2 || parts[1] === '' || !parts[1].includes('.')) {
            return showError(emailInput, emailError, 'Please enter a valid domain (e.g., example.com)');
        }
        
        // Check for domain extension
        const domainParts = parts[1].split('.');
        if (domainParts[domainParts.length - 1].length < 2) {
            return showError(emailInput, emailError, 'Domain extension must be at least 2 characters');
        }
        
        return hideError(emailInput, emailError);
    };
    
    // 3. Password validation - must be at least 8 characters with letters and numbers
    const validatePassword = () => {
        const value = passwordInput.value;
        
        if (value === '') {
            return showError(passwordInput, passwordError, 'Please enter a password');
        }
        
        if (value.length < 8) {
            return showError(passwordInput, passwordError, 'Password must be at least 8 characters long');
        }
        
        // Check for at least one letter
        let hasLetter = false;
        for (let i = 0; i < value.length; i++) {
            const char = value.charAt(i);
            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
                hasLetter = true;
                break;
            }
        }
        
        if (!hasLetter) {
            return showError(passwordInput, passwordError, 'Password must contain at least one letter');
        }
        
        // Check for at least one number
        let hasNumber = false;
        for (let i = 0; i < value.length; i++) {
            const char = value.charAt(i);
            if (char >= '0' && char <= '9') {
                hasNumber = true;
                break;
            }
        }
        
        if (!hasNumber) {
            return showError(passwordInput, passwordError, 'Password must contain at least one number');
        }
        
        return hideError(passwordInput, passwordError);
    };
    
    // 4. Confirm Password validation - must match password
    const validateConfirmPassword = () => {
        const passwordValue = passwordInput.value;
        const confirmValue = confirmPasswordInput.value;
        
        if (confirmValue === '') {
            return showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
        }
        
        if (confirmValue !== passwordValue) {
            return showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
        }
        
        return hideError(confirmPasswordInput, confirmPasswordError);
    };
    
    // 5. Age validation - must be a number between 18 and 120
    const validateAge = () => {
        const value = ageInput.value.trim();
        
        if (value === '') {
            return showError(ageInput, ageError, 'Please enter your age');
        }
        
        const age = parseInt(value, 10);
        
        if (isNaN(age)) {
            return showError(ageInput, ageError, 'Please enter a valid number');
        }
        
        if (age < 18) {
            return showError(ageInput, ageError, 'You must be at least 18 years old');
        }
        
        if (age > 120) {
            return showError(ageInput, ageError, 'Please enter a valid age');
        }
        
        return hideError(ageInput, ageError);
    };
    
    // 6. Terms validation - must be checked
    const validateTerms = () => {
        if (!termsCheckbox.checked) {
            return showError(termsCheckbox, termsError, 'You must agree to the terms and conditions');
        }
        
        return hideError(termsCheckbox, termsError);
    };
    
    // Add input event listeners for real-time validation
    if (fullNameInput) fullNameInput.addEventListener('input', validateFullName);
    if (emailInput) emailInput.addEventListener('input', validateEmail);
    if (passwordInput) passwordInput.addEventListener('input', validatePassword);
    if (confirmPasswordInput) confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    if (ageInput) ageInput.addEventListener('input', validateAge);
    if (termsCheckbox) termsCheckbox.addEventListener('change', validateTerms);
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isAgeValid = validateAge();
        const isTermsValid = validateTerms();
        
        // If all validations pass, show success message
        if (isFullNameValid && isEmailValid && isPasswordValid && 
            isConfirmPasswordValid && isAgeValid && isTermsValid) {
            
            // Hide form and show success message
            form.style.display = 'none';
            submissionMessage.classList.remove('hidden');
            
            // You would typically send the form data to a server here
            console.log('Form submitted successfully!');
            console.log({
                fullName: fullNameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                age: ageInput.value,
                interests: Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                    .map(checkbox => checkbox.value),
                referral: document.getElementById('referral').value,
                message: document.getElementById('message').value
            });
        } else {
            // Scroll to the first error
            const firstError = document.querySelector('.error-message[style="display: block"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Reset button functionality
    document.querySelector('button[type="reset"]').addEventListener('click', () => {
        // Hide all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.style.display = 'none';
        });
        
        // Reset input styles
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '#ddd';
        });
    });
});