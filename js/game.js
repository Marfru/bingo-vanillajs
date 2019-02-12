function winner(result) {
    let bingoMssg = document.getElementById("container");
    let res = JSON.parse(result);
    const players = [1,2,3];
    if(res.guess === "Bingo!!!") {
        players.map((element) => {
            document.getElementById('button' + element).disabled = true;
        })
        bingoMssg.innerHTML += "<div id='gameOver'>"; 
    } else {
        console.log("Not over yet")
    }
}

function playerGuess(playerID) {
    return new Promise(function(resolve, reject) {
        let http = new XMLHttpRequest();
        let url = `https://cors.io?https://www.drukzo.nl.joao.hlop.nl/challenge.php`;
        let element = document.getElementById("inputPlayer" + playerID);
        let elementVal = element.value;
        http.open("GET", url + `?player=` + playerID + `&guess=` + elementVal, true);
        http.send();
        http.onreadystatechange = function(e) {
            if(http.readyState === 4 && http.status === 200) {
                let result = http.response;
                if(result) {
                    resolve(
                        document.querySelector(".message-" + playerID).innerHTML = "It's " + JSON.parse(result).guess + "!",
                        winner(result, playerID)
                    );
                }                
                else {
                    reject(document.querySelector(".message-" + playerID).innerHTML = "Error!");
                }
            }
        }
    })
}
