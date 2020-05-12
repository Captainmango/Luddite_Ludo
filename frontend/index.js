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
var diceBtns = document.getElementById('dice_btns');
var tokens = document.getElementById('tokens');
var board = document.getElementById('main');
var game_msg = document.getElementById('game_msg');
var dice = document.getElementById('dice');
var welcome = document.getElementById('welcome_msg');
var title = document.getElementById('title');
var searchBox = document.getElementById('myInput1');
var gamesTable = document.getElementById('gamesTable');
var turnsTable = document.getElementById('resultsTable');
var allMyGames = document.getElementById('getGames');
var gamesTableContainer = document.getElementById('gamesContainer');
var turnsTableContainer = document.getElementById('turnsContainer');


openBtn.addEventListener('click', getSignIn);
signInBtn.addEventListener('click', signUp);
logInBtn.addEventListener('click', getLogIn);
logInToAcc.addEventListener('click', logIn);
logOutBtn.addEventListener('click', logout);
playGameBtn.addEventListener('click', play_a_game);
searchBox.addEventListener('keyup', search);
allMyGames.addEventListener('click', getAllGames);



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
        accBtns.style.visibility = "hidden";
        welcome.style.display = "none";
        main.style.display = "none"
        tokens.style.display = "none";
        turnsTableContainer.style.display = "none";
        gamesTableContainer.style.display = "none";
        diceBtns.style.visibility = "hidden";
        dice.style.display = "none";
        game_msg.style.display = "none";
        $("#resultsTable tr").remove();
        $("#gamesTable tr").remove();

    } else {
        dropDownMenu.classList.add('disabled')
        playGameBtn.classList.add('disabled');
        accBtns.style.visibility = "";
        welcome.style.display = "";
        diceBtns.style.visibility = "hidden";
        title.style.visibility = "";
        main.style.display = "none"
        tokens.style.display = "none";
        turnsTableContainer.style.display = "none";
        gamesTableContainer.style.display = "none";
        diceBtns.style.visibility = "hidden";
        dice.style.display = "none";
        game_msg.style.display = "none";
    }
}

function play_a_game(){
    if(current_user){
        board.style.display = '';
        tokens.style.display = '';
        game_msg.style.display = '';
        diceBtns.style.visibility ='';
        dice.style.display = ''
        playGameBtn.classList.add('disabled');
        dropDownMenu.classList.add('disabled');
        title.style.visibility = "hidden";
        if(!sessionStorage.game_id){
            createGame();
        }
        
    }

}

function home(){
    update_page();
    title.style.visibility = '';
    welcome.style.display = '';
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

function createGame(){
    
    let formData = {};
    formData["user_id"] = current_user();
    let confObj = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
        }
    let req_url = base_url + "games";

    fetch(req_url, confObj).then((req)=>
        req.json()).then(response => { 
            if(response.game_id){
            sessionStorage["game_id"] = response.game_id;
            } else {
                sessionStorage.removeItem("game");
            }
            
        })}
    
function search(){
    $(document).ready(function(){
        $("#myInput1").on("keyup", function() {
            let value = $(this).val().toLowerCase();
            $("#resultsTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
        });
    }

function getAllGames(){
    update_page();
    gamesTableContainer.style.display = '';
    let confObj = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
        
    }

    let req_url = base_url + "games";
    
    fetch(req_url, confObj).then((req)=>
        req.json()).then(response => { 
            response.forEach(game =>{
                if(game.user_id == current_user()){
                    let row = gamesTable.insertRow(0);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    cell1.innerHTML = `<a class="btn text-white" id="game${game.id}" href ="#" onclick="getGameTurns(${game.id})">${game.id}</a>'`;
                    cell2.innerHTML = game.created_at;                    
                }
            })
            
        })
    alert("Your games have been found. If you don't see anything, then you haven't played a game yet.")}

        function getGameTurns(game_id){
            update_page();
            turnsTableContainer.style.display = '';
            let confObj = {
                method: "GET",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                }
                
            }
        
            let req_url = base_url + `games/${game_id}/turns`;
            
            fetch(req_url, confObj).then((req)=>
                req.json()).then(response => { 
                    response.forEach(turn =>{
                        if(turn.game_id == game_id){
                            let row = turnsTable.insertRow(0);
                            let cell1 = row.insertCell(0);
                            let cell2 = row.insertCell(1);
                            let cell3 = row.insertCell(2);
                            cell1.innerHTML = turn.colour;
                            cell2.innerHTML = turn.pawn;
                            cell3.innerHTML = turn.roll;           
                        }
                    })
                    
                })}





    

