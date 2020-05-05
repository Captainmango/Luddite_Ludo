//set dice to visible

//log in function

//start game function

//player class - to handle player logic

//game class - to handle game logic

//for issue with sign up form, get element by id for the fields needed for email and password

const base_url = "http://localhost:3000/";

       
var openBtn = document.getElementById('signInBtn');
var signInModal = document.getElementById('signInModal');
var signInBtn = document.getElementById('newUserAccount');


openBtn.addEventListener('click', getSignIn);
signInBtn.addEventListener('click', signUp);

function getSignIn() {
    signInModal.style.display = "block";
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
    console.log(formData);
    console.log(confObj);

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
                console.log(sessionStorage);
            console.log(response);}  
        })}

    

