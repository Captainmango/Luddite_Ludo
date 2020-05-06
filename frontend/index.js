//set dice to visible

//log in function

//start game function

//player class - to handle player logic

//game class - to handle game logic

//for issue with sign up form, get element by id for the fields needed for email and password

const base_url = "http://localhost:3000/";

// log in and sign in buttons   
var openBtn = document.getElementById('signInBtn');
var signInModal = document.getElementById('signInModal');
var signInBtn = document.getElementById('newUserAccount');
var logInBtn = document.getElementById('logInBtn');
var logInModal = document.getElementById('logInModal');
var logInToAcc = document.getElementById('getUserAccount');
var logOutBtn = document.getElementById('logoutBtn');

// update page after log in elements
var dropDownMenu = document.getElementById('navbarDropdown');
var playGameBtn = document.getElementById('playGameBtn');
var accBtns = document.getElementById('acc_btns');


openBtn.addEventListener('click', getSignIn);
signInBtn.addEventListener('click', signUp);
logInBtn.addEventListener('click', getLogIn);
logInToAcc.addEventListener('click', logIn);
logOutBtn.addEventListener('click', logout);



function getSignIn() {
    signInModal.style.display = "block";
}

function getLogIn() {
    logInModal.style.display = "block";
}

function current_user(){
    if(isNaN(parseInt(sessionStorage.getItem('current_user'),10))){
            return false}
        else{
            
            return parseInt(sessionStorage.getItem('current_user'),10)
        }
    }

function logout(){
    sessionStorage.removeItem('current_user');
    update_page();
    alert("Logged out successfully.");
}

function is_logged_in(){
    if(current_user()){
        return true
    } else {
        return false
    }

}

function update_page(){
    if(is_logged_in()){
        dropDownMenu.classList.remove('disabled');
        playGameBtn.classList.remove('disabled');
        accBtns.style.display = "none";
    } else {
        dropDownMenu.classList.add('disabled')
        playGameBtn.classList.add('disabled');
        accBtns.style.display = "";

    }
}


function signUp(){
    let formData = {};
    let email = document.getElementById("email_address").value;
    let password = document.getElementById("user_password").value;
    formData["email"] = email;
    formData["password"] = password;

    let confObj = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
        }
    let req_url = base_url + "users";

    fetch(req_url, confObj).then((req)=>
        req.json()).then(response => { 
            if (response.nu_user_id === null){
                alert("Could not sign up. Check email and password.");
                $("#signInModal").modal('hide');
            }
            else {
                alert("Signed up successfuly.")
                $("#signInModal").modal('hide');
                sessionStorage.setItem('current_user', response.nu_user_id);
                $("#signInModal").on('hidden.bs.modal' , update_page());
            }  
        })}

function logIn(){
    let formData = {};
    let email = document.getElementById("acc_email_address").value;
    let password = document.getElementById("acc_user_password").value;
    formData["email"] = email;
    formData["password"] = password;

    let confObj = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
        }
    let req_url = base_url + "users/sign_in";

    fetch(req_url, confObj).then((req)=>
        req.json()).then(response => { 
            if (response.user_id === null){
                alert("Could not log in. Check email and password.");
                $("#logInModal").modal('hide');
            }
            else {
                alert("Logged in successfuly.")
                $("#logInModal").modal('hide');
                sessionStorage.setItem('current_user', response.user_id);
                $("#logInModal").on('hidden.bs.modal' , update_page());}  
        })}



    

