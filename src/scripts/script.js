const lista = ["rock", "paper", "scissors"];
let pos = -1;
let intervaloId;

document.getElementById("dificultad").addEventListener("change", ponerDificultad);
document.getElementById("reiniciar").addEventListener("click", () => {
    reiniciar();
    intervaloId = setInterval(cambiaImagen, 1000);
});
document.querySelectorAll("img").forEach((e) => {
    e.addEventListener("click", haGanado)
});


intervaloId = setInterval(cambiaImagen, 1000);

function cambiaImagen() {
    pos = (pos + 1) % 3;
    document.getElementById("ia").setAttribute("src", "src/images/" + lista[pos] + ".svg");
}

function reiniciar() {
    document.querySelectorAll("#eleccion img").forEach((e) => {
        e.style.opacity = 1;
    });
    document.getElementById("dificultad").value = "Fácil";
    document.getElementById("resultado").innerHTML = "";
    document.querySelector("button").style.visibility = "hidden";
}

function ponerDificultad() {
    clearInterval(intervaloId);
    const dificultad = document.getElementById("dificultad").value;
    reiniciar();
    document.getElementById("dificultad").value = dificultad;
    switch (dificultad) {
        case "Fácil":
            intervaloId = setInterval(cambiaImagen, 1000);
            break;
        case "Difícil":
            intervaloId = setInterval(cambiaImagen, 250);
            break;
        case "Extrema":
        case "Imposible":
            intervaloId = setInterval(cambiaImagen, 50);
            break;
    }
}

function haGanado(ele) {
    let ia;
    document.querySelectorAll("#eleccion img").forEach((e) => {
        e.style.opacity = 0.25;
        this.style.opacity = 1;
    })
    clearInterval(intervaloId);
    let eleccion = this.src.split("/").at(-1).split(".")[0];
    if (document.getElementById("dificultad").value === "Imposible") {
        switch (eleccion) {
            case "rock":
                ia = "paper";
                break;
            case "paper":
                ia = "scissors";
                break;
            case "scissors":
                ia = "rock";
                break;
        }
        document.getElementById("ia").setAttribute("src", "src/images/" + ia + ".svg");
    } else {
        ia = document.getElementById("ia").src.split("/").at(-1).split(".")[0];
    }

    if (eleccion === ia) {
        document.getElementById("resultado").innerHTML = "EMPATE";
    } else if ((eleccion === "rock" && ia === "scissors") || (eleccion === "paper" && ia === "rock") || (eleccion === "scissors" && ia === "paper")) {
        document.getElementById("resultado").innerHTML = "GANASTE";
        document.getElementById("resultado").style.color = "green";
    } else {
        document.getElementById("resultado").innerHTML = "PERDISTE";
        document.getElementById("resultado").style.color = "red";
    }

    document.querySelector("button").style.visibility = "visible";
}