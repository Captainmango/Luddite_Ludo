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
var deleteAccount = document.getElementById('deleteAccount');

// User.update page after log in elements
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
var user;

window.addEventListener('beforeunload', (event) => {
    sessionStorage.clear();
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = 'Clearing site data';
  });



class User {
    constructor(id, email){
        this.id = id;
        this.email = email;
    }

    static getSignIn() {
        signInModal.style.display = "block";
    }

    static getLogIn() {
        logInModal.style.display = "block";
    }

    static current_user() {
        if (isNaN(parseInt(sessionStorage.getItem('current_user'), 10))) {
            return false
        }
        else {

            return parseInt(sessionStorage.getItem('current_user'), 10)
        }
    }

    static current_game() {
        if (isNaN(parseInt(sessionStorage.getItem('game_id'), 10))) {
            return false
        }
        else {
            return parseInt(sessionStorage.getItem('game_id'), 10)
        }
    }

    static logout() {
        sessionStorage.removeItem('current_user');
        User.update_page();
        alert("Logged out successfully.");
    }


    static is_logged_in() {
        if (User.current_user()) {
            return true
        } else {
            return false
        }

    }



    static update_page() {
        if (User.is_logged_in()) {
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
            while(gamesTable.rows.length > 0) {
                gamesTable.deleteRow(0);
              }
            while(turnsTable.rows.length > 0) {
                turnsTable.deleteRow(0);
              }

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
            accBtns.style.visibility = '';
        }
    }

    static play_a_game() {
        User.update_page();
        if (User.current_user) {
            board.style.display = '';
            tokens.style.display = '';
            game_msg.style.display = '';
            diceBtns.style.visibility = '';
            dice.style.display = ''
            playGameBtn.classList.add('disabled');
            dropDownMenu.classList.add('disabled');
            title.style.visibility = "hidden";
            if (User.current_game()) {
                game = new Game(User.current_game(), User.current_user());
            } else {
                User.createGame();
            }

        }

    }

    static home() {
        User.update_page();
        title.style.visibility = '';
        welcome.style.display = '';
    }


    static signUp() {
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

        fetch(req_url, confObj).then((req) =>
            req.json()).then(response => {
                console.log(response);
                if (response.data.id === null) {
                    alert("Could not sign up. Check email and password.");
                    $("#signInModal").modal('hide');
                }
                else {
                    alert("Signed up successfuly.");
                    document.getElementById("signInClose").click();
                    user = new User(response.data.attributes.id, response.data.attributes.email);
                    sessionStorage.setItem('current_user', user.id);
                    document.getElementById("signInClose").click();
                    User.update_page();
                    
                }
                
            })
            
    }

    static logIn() {
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

        fetch(req_url, confObj).then((req) =>
            req.json()).then(response => {
                user = new User(response.data.attributes.id, response.data.attributes.email);
                if (user.id === undefined) {
                    alert("Could not log in. Check email and password.");
                    document.getElementById("logInClose").click();
                }
                else {
                    alert("Logged in successfuly.");
                    document.getElementById("logInClose").click();
                    sessionStorage.setItem('current_user', user.id);
                    User.update_page();
                }
            })
    }

    static createGame() {

        let formData = {};
        formData["user_id"] = User.current_user();
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

        fetch(req_url, confObj).then((req) =>
            req.json()).then(response => {console.log(response);
                if (User.current_game()) {
                    game = new Game(User.current_user, User.current_game);
                } else {
                    game = new Game(User.current_user, response.data.attributes.id);
                    sessionStorage["game_id"] = response.data.attributes.id;
                }

            })
    }

    static getAllGames() {
        User.update_page();
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

        fetch(req_url, confObj).then((req) =>
            req.json()).then(response => {
                response.data.forEach(game => {
                    if (game.attributes.user_id == User.current_user()) {
                        let row = gamesTable.insertRow(0);
                        row.setAttribute("id",`game${game.id}`);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        cell1.innerHTML = `<a class="btn text-white" id="game${game.id}" href ="#" onclick="User.getGameTurns(${game.id})">${game.id}</a>'`;
                        cell2.innerHTML = game.attributes.created_at.toString(); 
                        cell3.innerHTML = `'<a class="btn btn-danger text-white" id="game${game.id}" href ="#" onclick="User.deleteGame(${game.id})">Delete game</a>'`;
                    }
                })

            })
        alert("Your games have been found. If you don't see anything, then you haven't played a game yet.")
    }

    static getGameTurns(game_id) {
        User.update_page();
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

        fetch(req_url, confObj).then((req) =>
            req.json()).then(response => {
                response.data.forEach(turn => {
                    if (turn.attributes.game_id == game_id) {
                        let row = turnsTable.insertRow(0);
                        row.setAttribute("id", `turn${turn.id}`);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        let cell4 = row.insertCell(3);
                        cell1.innerHTML = turn.attributes.colour;
                        cell2.innerHTML = turn.attributes.pawn;
                        cell3.innerHTML = turn.attributes.roll;
                        cell4.innerHTML = `'<a class="btn btn-danger text-white" id="turn${turn.id}" href ="#" onclick="User.deleteGameTurn(${turn.id})">Delete turn</a>'`;
                    }
                })

            })
    }

    static deleteGameTurn(turn_id) {
        let formData = {};
        formData['turn_id'] = turn_id;
        let confObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }

        }

        let req_url = base_url + `turns/${formData['turn_id']}`;

        fetch(req_url, confObj).then(req => req.json()).then(response => {
            if(response.data.attributes.id){
                alert(`Turn ${response.data.attributes.id} deleted successfully`);
                let turnRow = document.getElementById(`turn${turn_id}`);
                turnRow.remove();}
            else {
                User.home();
                alert("Turn not deleted. Please search turns again");
            }
        
        })
    }

    static deleteGame(game_id) {
        let formData = {};
        formData['game_id'] = game_id;
        let confObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }

        }

        let req_url = base_url + `games/${formData['game_id']}`;

        fetch(req_url, confObj).then(req => req.json()).then(response => {
            if(response.data.attributes.id){
                alert(`Game ${response.data.attributes.id} deleted successfully`);
                let gameRow = document.getElementById(`game${game_id}`);
                gameRow.remove();
                }
            else{
                User.home();
                alert("Game not deleted. Please search games again");
            }
        
        })
    }
}






openBtn.addEventListener('click', User.getSignIn);
signInBtn.addEventListener('click', User.signUp);
logInBtn.addEventListener('click', User.getLogIn);
logInToAcc.addEventListener('click', User.logIn);
logOutBtn.addEventListener('click', User.logout);
playGameBtn.addEventListener('click', User.play_a_game);
allMyGames.addEventListener('click', User.getAllGames);










