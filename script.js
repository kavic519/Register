const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    confirmPasswordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

    
    
// 表单验证
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const isRequiredVail =checkRequired([username, email, passwordInput, confirmPasswordInput]);
    let isFormValid = isRequiredVail;

    if (isRequiredVail) {
        const isUsernameVail = checkLength(username, 3, 15);
        const isEmailVail = checkEmail(email);
        const isPasswordVail = checkLength(passwordInput, 6, 25);
        const isConfirmPasswordMatch = checkConfirmPasswordMatch(passwordInput, confirmPasswordInput);

        isFormValid = isUsernameVail && isEmailVail && isPasswordVail && isConfirmPasswordMatch;
    }

    if (isFormValid){
        alert('注册成功！');
        form.reset();
        document.querySelectorAll('.form-group').forEach((formGroup) => {
            formGroup.className = 'form-group';
        });
    }

    
});

function checkRequired(inputArr) {
    let isValid = true;
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${formatFieldName(input)}不能为空`)
            isValid = false;
        } else {
            showSuccess(input);
        }
    });
    return isValid;
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${formatFieldName(input)}至少需要${min}个字符`)
        return false;
    } else if (input.value.length > max) {
        showError(input, `${formatFieldName(input)}最多允许${max}个字符`)
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(email.value.trim())) {
        showSuccess(email);
        return true;
    } else {
        showError(email, '邮箱格式错误');
        return false;
    }
}

function checkConfirmPasswordMatch(passwordInput, confirmPasswordInput) {
    if (passwordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, '密码不匹配');
        return false;
    } else {
        showSuccess(confirmPasswordInput);
        return true;
    }
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    const error = formGroup.querySelector('small');
    error.innerText = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
}

function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}