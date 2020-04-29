//set dice to visible

//log in function

//start game function

//player class - to handle player logic

//game class - to handle game logic




    

   
        
        var openBtn = document.getElementById('signInBtn');
        var closeBtn = document.getElementById('signInClose')
        var signinMcdal = document.getElementById('signInModal');

        openBtn.addEventListener('click', getSignIn);
        closeBtn.addEventListener('click', closeSignIn);

        function closeSignIn(){
            signinModal.style.display = "none";
        }
        
        
        function getSignIn(){
            var signinModal = document.getElementById('signInModal');
            
            signinModal.style.display = "block";

        }

