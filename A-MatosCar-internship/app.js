/*--------------------jQuery--------------------*/
$(document).ready(() =>{
    $("#endBtn").click(() => {
        $("#startForm").hide(100);
        $("#infoStartForm").hide(100);
        $(".sf").fadeIn("fast");
    });
    $("#startBtn").click(() =>{
        $("#startForm").fadeIn("fast");
        $("#infoStartForm").fadeIn("fast");
        $(".sf").fadeOut("fast");
    });
    $("#inputSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
});

/*--------------------JavaScript--------------------*/
let sub = new Boolean;
sub = false;

function convertToUpper(){
    var input = document.getElementById("startPlate");
    input.value = input.value.toUpperCase();
}

function checkInput(){
    var input = document.getElementById("startPlate"); 
    startPlate = input.value;
    if(startPlate.length == 0) {
      input.classList.remove("error");
      sub = false;
    }
    if(startPlate.length > 8){
        input.classList.add("error");
        sub = false;
    }else{
        input.classList.remove("error");
        sub = true;
        if(startPlate.length == 8){ //[00-AA-00]
            for(let i = 0; i < 8; i++){
                if((i < 2 || i > 5) && sub){ //check first 2 chars if number and last 2 chars if number
                    if(parseInt(startPlate[i]) === parseInt(startPlate[i])){
                        sub = true;
                        input.classList.remove("error");
                    }else{
                        sub = false;
                        input.classList.add("error");
                    }
                }else if((i == 2 || i == 5)&& sub){ //check "-"
                    if(startPlate[i] == '-' && startPlate[i] == '-'){
                        sub = true;
                        input.classList.remove("error");
                    }else{
                        sub = false;
                        input.classList.add("error");
                    }
                }else{ //letters check
                    if((!(parseInt(startPlate[i]) === parseInt(startPlate[i]))) && sub){
                        sub = true;
                        input.classList.remove("error");
                    }else{
                        sub = false;
                        input.classList.add("error");
                    }
                }
            }
        }else if(startPlate.length == 6){ //[AA00AA]
            for(let i = 0; i < 6; i++){
                if((i < 2 || i > 3) && sub){ //letters check
                    if((!(parseInt(startPlate[i]) === parseInt(startPlate[i]))) && sub){
                        sub = true;
                        input.classList.remove("error");
                    }else{
                        sub = false;
                        input.classList.add("error");
                    }
                }
                else{
                    if((parseInt(startPlate[i]) === parseInt(startPlate[i])) && sub){
                        sub = true;
                        input.classList.remove("error");
                    }else{
                        sub = false;
                        input.classList.add("error");
                    }
                }
            }
        }else{
            sub = false;
            input.classList.remove("error");
        }
    }
    if(sub){
        document.getElementById("submit").classList.remove("disabled");
    }else{
        document.getElementById("submit").classList.add("disabled");
    }
}

function convertToUpper1(){
    var input = document.getElementById("endPlate");
    input.value = input.value.toUpperCase();
}

function checkInput1(){
    var input = document.getElementById("endPlate"); 
    startPlate = input.value;
    if(startPlate.length == 0) {
      input.classList.remove("error");
      sub = false;
    }
    if(startPlate.length > 8){
        input.classList.add("error");
        sub = false;
    }else{
        input.classList.remove("error");
        sub = true;
        if(startPlate.length == 8){ //[00-AA-00]
            for(let i = 0; i < 8; i++){
                if((i < 2 || i > 5) && sub){ //check first 2 chars if number and last 2 chars if number
                    if(parseInt(startPlate[i]) === parseInt(startPlate[i])){
                        sub = true;
                        input.classList.remove("error");
                    }else{
                        sub = false;
                        input.classList.add("error");
                    }
                }else if((i == 2 || i == 5)&& sub){ //check "-"
                    if(startPlate[i] == '-' && startPlate[i] == '-'){
                        sub = true;
                        input.classList.remove("error");
                    }else{
                        sub = false;
                        input.classList.add("error");
                    }
                }else{ //letters check
                    if((!(parseInt(startPlate[i]) === parseInt(startPlate[i]))) && sub){
                        sub = true;
                        input.classList.remove("error");
                    }else{
                        sub = false;
                        input.classList.add("error");
                    }
                }
            }
        }else if(startPlate.length == 6){ //[AA00AA]
            for(let i = 0; i < 6; i++){
                if((i < 2 || i > 3) && sub){ //letters check
                    if((!(parseInt(startPlate[i]) === parseInt(startPlate[i]))) && sub){
                        sub = true;
                        input.classList.remove("error");
                    }else{
                        sub = false;
                        input.classList.add("error");
                    }
                }
                else{
                    if((parseInt(startPlate[i]) === parseInt(startPlate[i])) && sub){
                        sub = true;
                        input.classList.remove("error");
                    }else{
                        sub = false;
                        input.classList.add("error");
                    }
                }
            }
        }else{
            sub = false;
            input.classList.remove("error");
        }
    }
    if(sub){
        document.getElementById("endSubmit").classList.remove("disabled");
    }else{
        document.getElementById("endSubmit").classList.add("disabled");
    }
}