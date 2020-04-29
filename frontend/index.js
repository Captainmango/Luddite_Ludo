//set dice to visible

//log in function

//start game function

//player class - to handle player logic

//game class - to handle game logic

const base_url = "http//localhost:3000";

       
var openBtn = document.getElementById('signInBtn');
var closeBtn = document.getElementById('signInClose')
var signInModal = document.getElementById('signInModal');
var signInBtn = document.getElementById('newUserAccount');


openBtn.addEventListener('click', getSignIn);
closeBtn.addEventListener('click', closeSignIn);
signInBtn.addEventListener('click', signUp);

function closeSignIn() {
    signInModal.style.display = "none";
}

function getSignIn() {
    signInModal.style.display = "block";
}

function signUp(email, password){
    let formData = {}
    formData["email"] = email;
    formData["password"] = password;

    let confObj = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: formData
        }
    let req_url = base_url + "/users";

    fetch(req_url, confObj).then((response)=>{
        if(response.ok){
            signInModal.style.display = "none";
        } else {
            signInModal.style.display = "none";
            alert("Account not created. Check your email and password");
        }

    })

}

