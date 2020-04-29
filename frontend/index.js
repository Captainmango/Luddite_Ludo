//set dice to visible

//log in function

//start game function

//player class - to handle player logic

//game class - to handle game logic



       
var openBtn = document.getElementById('signInBtn');
var closeBtn = document.getElementById('signInClose')
var signInModal = document.getElementById('signInModal');

openBtn.addEventListener('click', getSignIn);
closeBtn.addEventListener('click', closeSignIn);

function closeSignIn(){
    signInModal.style.display = "none";
}


function getSignIn(){
    
    signInModal.style.display = "block";

}

