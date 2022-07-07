	const signupBtn = document.querySelector('.js-signup-Btn')
	const signinBtn = document.querySelector('.js-signin-Btn')
	const modal = document.querySelector('.modal')
	const modalSignIn = document.querySelector('.modal-Signin')
	const modalClose = document.querySelector('.modal-close')
	const modalClose1 = document.querySelector('.modal-close1')
	const modalContainers = document.querySelectorAll('.modal-container')
			
function showSignup() {
	modalSignIn.classList.remove('open') 
	modal.classList.add('open')   
}
function showSignin() {
	modal.classList.remove('open')  
	modalSignIn.classList.add('open')   
}
function hidenSignup() {
	modal.classList.remove('open')   
}
function hidenSignin() {
	modalSignIn.classList.remove('open')   
}
function clearSearch() {
	searchInput.value = ''
}
function stop(event) {
	event.stopPropagation()
}

for(modalContainer of modalContainers) {
	modalContainer.addEventListener('click', stop)
}

var API = 'https://localhost:5001'

function sendDataLog(data, callback) {
	var options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
	fetch(API + '/login' , options)			
	.then(response => response.json())
	.then(callback)
	.catch(error => {
		console.error('There has been a problem with your fetch operation:', error);
	})
}

function sendDataSignup(data, callback) {
	var options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
	fetch(API + '/register', options)			
	.then(response => response.json())
	.then(callback)
	.catch(error => {
		console.error('There has been a problem with your fetch operation:', error);
	})
}

function reset() {
	document.getElementById('email-login').value = ''
	document.getElementById('pass-login').value = ''
	document.getElementById('email-signup').value = ''
	document.getElementById('pass-signup').value = ''
	document.getElementById('re-pass-signup').value = ''
}

function checkLog(response) {
	var userInput = document.getElementById('email-login').value
	var passInput = document.getElementById('pass-login').value
	if(userInput.trim().length === 0) {
		document.querySelector('.email-err').innerHTML = 'Bắt buộc nhập'
	}
	else if(passInput.trim().length === 0) {
		document.querySelector('.pass-err').innerHTML = 'Bắt buộc nhập'
	}
	else if(response.Message === "") {											//sửa
		document.querySelector('.pass-err').innerHTML = 'Tài khoản hoặc mật khẩu không đúng'
		reset()
	}
	else {
		reset()
		document.querySelector('.header__log-block').innerHTML = '<button class="js-log-Btn">${userInput}</button><button class="js-log-Btn">Logout</button><div class="search-btn js-search"><input id="search" type="text" name="search" class="search-input" placeholder="Tìm kiếm"><div class="search-icon-block" onclick="clearSearch()"><i class="search-icon ti-search"></i></div></div>'
	}
}

function checkSignup(response) {
	var emailSignupInput = document.getElementById('email-signup').value
	var passSignupInput = document.getElementById('pass-signup').value
	var repPassSignupInput = document.getElementById('re-pass-signup').value
	if(emailSignupInput.trim().length === 0) {
		document.querySelector('.email-signup-err').innerHTML = 'Bắt buộc nhập'
	}
	else if(passSignupInput.trim().length === 0) {
		document.querySelector('.email-signup-err').innerHTML = ''
		document.querySelector('.pass-signup-err').innerHTML = 'Bắt buộc nhập'
	}
	else if(repPassSignupInput.trim().length === 0) {
		document.querySelector('.email-signup-err').innerHTML = ''
		document.querySelector('.pass-signup-err').innerHTML = ''
		document.querySelector('.repass-signup-err').innerHTML = 'Bắt buộc nhập'
	}
	else {
		document.querySelector('.email-signup-err').innerHTML = ''
		document.querySelector('.pass-signup-err').innerHTML = ''
		document.querySelector('.repass-signup-err').innerHTML = ''		
		reset()
		hidenSignup()
		alert('Đăng ký thành công')
	}
}

var logBtn = document.getElementById('signin-button')
logBtn.onclick = function dataLog() {
	var emailLogInput = document.getElementById('email-login').value
	var passLogInput = document.getElementById('pass-login').value
	var formData = {
		"email": emailLogInput,
		"password": passLogInput
	}
	sendDataLog(formData, checkLog)
}

var signupButton = document.querySelector('#signup-button')
signupButton.onclick = function dataSignup() {
	var emailSignupInput = document.getElementById('email-signup').value
	var passSignupInput = document.getElementById('pass-signup').value
	var repPassSignupInput = document.getElementById('re-pass-signup').value
	var formData = {
		"email": emailSignupInput,
		"password": passSignupInput,
		"confirmPassword": repPassSignupInput,
		"firstName": "hung",
		"lastName": "hung",
		"roles": [
			"Admin"
		]
	}
	sendDataSignup(formData, checkSignup)
}
