document.addEventListener('DOMContentLoaded', aggiorna);

const edit = document.getElementById("edit");
let cliccato;
const carouselCaptions = document.getElementsByClassName("carousel-caption");
const links = document.getElementById("navbarNavAltMarkup");
const btn = document.getElementById("navbar-toggler");
let btnPersonaggi = document.getElementsByClassName("figura")[0].children[3];
let btnSchermate = document.getElementsByClassName("carousel-caption")[0].children[3];
var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
const figure = document.getElementsByClassName("figura");
const body = document.getElementsByTagName("body")[0];
var lastScroll = 0;
const imgHeight = document.getElementsByClassName("carousel-item")[0].children[1].style.height;
const imgScurisci = document.getElementsByClassName("scurisci")[0].style.height;

document.addEventListener("scroll", () => {
    if (lastScroll < window.scrollY) {
        document.getElementsByClassName("navbar")[0].style = "top: -160px;"
        if (window.innerWidth > 768) {
            document.getElementsByClassName("scurisci")[0].style.height = "100vh";
            for (let i = 0; i < document.getElementsByClassName("carousel-item").length; i++) {
                document.getElementsByClassName("carousel-item")[i].children[1].style.height = "100vh";
            }
            document.getElementById("myCarousel").style = "display: fixed; top: 0";
        }
    } else {
        document.getElementsByClassName("navbar")[0].style = "top: 0px;"
        if (window.innerWidth > 768) {
            document.getElementsByClassName("scurisci")[0].style.height = imgScurisci;
            for (let j = 0; j < document.getElementsByClassName("carousel-item").length; j++) {
                document.getElementsByClassName("carousel-item")[j].children[1].style.height = imgHeight;
            }
            document.getElementById("myCarousel").style = "display: block; margin-top: 80px;";
        }
    }
    lastScroll = window.scrollY;
});

links.addEventListener("click", (e) => {
    if ((e.target.id == "generali" && window.innerWidth < 990) || (e.target.id == "edit" && window.innerWidth < 990) || (e.target.id != "edit" && e.target.id != "generali")) {
        btn.classList.add("collapsed");
        btn.ariaExpanded = false;
        links.classList.remove("show");
        document.getElementsByClassName("navbar")[0].style = "top: -160px";
    }
});

function setCookie(nome, valore) {
    document.cookie = nome + "=" + valore + ";path=/";
}

function reset() {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        const cookieName = cookie.split('=')[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
    location.reload();
}

function getCookie(nome) {
    let name = nome + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

edit.addEventListener("click", () => {
    if (edit.style.background == "green") {
        showButtons();
        edit.style.background = "none";
        //Carousel
        for (let i = 0; i < carouselCaptions.length; i++) {
            carouselCaptions[i].classList.remove("animazioneTratteggio");
            for (let j = 0; j < carouselCaptions[i].children.length; j++) {
                carouselCaptions[i].children[j].removeEventListener("click", listenEditElements);
            }
        }
        //Marketing
        for (let i = 0; i < figure.length; i++) {
            figure[i].classList.remove("animazioneTratteggio");
            for (let j = 0; j < figure[i].children.length; j++) {
                figure[i].children[j].removeEventListener("click", listenEditElements);
            }
        }
    } else {
        hideButtons();
        edit.style.background = "green";
        for (let i = 0; i < carouselCaptions.length; i++) {
            carouselCaptions[i].classList.add("animazioneTratteggio");
            for (let j = 0; j < carouselCaptions[i].children.length; j++) {
                carouselCaptions[i].children[j].addEventListener("click", listenEditElements);
            }
        }
        for (let i = 0; i < figure.length; i++) {
            figure[i].classList.add("animazioneTratteggio");
            for (let j = 0; j < figure[i].children.length; j++) {
                figure[i].children[j].addEventListener("click", listenEditElements);
            }
        }
    }
});

// MODALE
function listenEditElements(event) {
    cliccato = event.target;
    console.log(cliccato);
    if (event.target.tagName == "H1" || event.target.tagName == "H2" || event.target.tagName == "H3" || event.target.tagName == "H4") {
        document.getElementById("staticBackdropLabel").innerHTML = "Modifica titolo";
        // <input type="text" class="form-control" id="input" aria-describedby="inputEdit">
        const input = document.createElement("input");
        input.type = "text";
        if (cliccato && cliccato.parentElement.parentElement.classList.contains("personaggi")) {
            input.maxLength = 25;
        }
        input.className = "form-control";
        input.id = "input";
        input.ariaDescribedby = "inputEdit";
        input.value = cliccato.innerHTML;
        document.getElementsByClassName("modal-body")[0].innerHTML = "";
        document.getElementsByClassName("modal-body")[0].appendChild(input);
    } else if (event.target.tagName == "P") {
        document.getElementById("staticBackdropLabel").innerHTML = "Modifica descrizione";
        // <textarea class="form-control" placeholder="Inserisci la descrizione qui" id="input" style="height: 100px"></textarea>
        const input = document.createElement("textarea");
        input.className = "form-control";
        if (cliccato && cliccato.parentElement.parentElement.classList.contains("personaggi")) {
            input.maxLength = 136;
        }
        input.placeholder = "Inserisci la descrizione qui";
        input.id = "input";
        input.value = cliccato.innerHTML;
        document.getElementsByClassName("modal-body")[0].innerHTML = "";
        document.getElementsByClassName("modal-body")[0].appendChild(input);
    } else if (event.target.tagName == "IMG") {
        const input = document.createElement("input");
        document.getElementById("staticBackdropLabel").innerHTML = "Modifica immagine";
        input.setAttribute('data-bs-toggle', 'tooltip');
        input.setAttribute('data-bs-placement', 'right');
        input.setAttribute('title', "L'immagine caricata non verrà salvata per motivi di sicurezza.");
        input.className = "form-control";
        input.type = "file";
        input.accept = ".jpg, .jpeg, .png";
        input.id = "input";
        document.getElementsByClassName("modal-body")[0].innerHTML = "";
        document.getElementsByClassName("modal-body")[0].appendChild(input);
    }
    myModal.show();
}

function salvaModifica() {
    //MODIFICA GENERALI
    if (document.getElementsByClassName("modal-title")[0].innerHTML == "Generali") {
        switch (document.getElementById("bgColor").value) {
            case "1":
                body.className = "bg-light";
                if (document.getElementsByClassName("marketing")[0].classList.contains("text-light"))
                    document.getElementsByClassName("marketing")[0].classList.remove("text-light");
                for (let i = 0; i < document.getElementsByClassName("marketing")[0].children[0].children.length; i++) {
                    let elemento = document.getElementsByClassName("marketing")[0].children[0].children[i];
                    if (elemento.children[5].classList.contains("bg-purple")) {
                        elemento.children[5].classList.remove("bg-purple");
                    }
                    if (document.getElementById("liveToast").classList.contains("bg-secondary")) {
                        document.getElementById("liveToast").classList.remove("bg-secondary");
                    }
                }
                break;
            case "2":
                body.className = "bg-secondary";
                if (document.getElementsByClassName("marketing")[0].classList.contains("text-light"))
                    document.getElementsByClassName("marketing")[0].classList.remove("text-light");
                for (let i = 0; i < document.getElementsByClassName("marketing")[0].children[0].children.length; i++) {
                    let elemento = document.getElementsByClassName("marketing")[0].children[0].children[i];
                    if (elemento.children[5].classList.contains("bg-purple")) {
                        elemento.children[5].classList.remove("bg-purple");
                    }
                    if (document.getElementById("liveToast").classList.contains("bg-secondary")) {
                        document.getElementById("liveToast").classList.remove("bg-secondary");
                    }
                }
                break;
            case "3":
                body.className = "bg-dark";
                document.getElementsByClassName("marketing")[0].classList.add("text-light");
                for (let i = 0; i < document.getElementsByClassName("marketing")[0].children[0].children.length; i++) {
                    let elemento = document.getElementsByClassName("marketing")[0].children[0].children[i];
                    elemento.children[5].classList.add("bg-purple");
                }
                document.getElementById("liveToast").classList.add("bg-secondary");
                break;
        }
        body.style.fontFamily = document.getElementById("fontSelect").value;
        setCookie("font", document.getElementById("fontSelect").value);
        setCookie("bgColor", document.getElementById("bgColor").value);
        creaToast("Modifica avvenuta", "ora", "Modifica generali avvenuta con successo.");
        myModal.hide();
    } else if (document.getElementsByClassName("modal-title")[0].innerHTML == "Modifica schermata") {
        const file = document.getElementById("input").files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                btnSchermate.parentElement.parentElement.parentElement.children[0].src = e.target.result;
                setCookie(btnSchermate.parentElement.parentElement.parentElement.children[0].id, e.target.result);
            }
            reader.readAsDataURL(file);
        }
        document.getElementById("input").value = "";
        btnSchermate.parentElement.children[0].innerHTML = document.getElementById("titoloSchermata").value;
        btnSchermate.parentElement.children[1].innerHTML = document.getElementById("descrizioneSchermata").value;
        setCookie(btnSchermate.parentElement.children[0].id, document.getElementById("titoloSchermata").value);
        setCookie(btnSchermate.parentElement.children[1].id, document.getElementById("descrizioneSchermata").value);
        creaToast("Modifica avvenuta", "ora", "Modifica schermata avvenuta con successo.");
        myModal.hide();
    } else if (document.getElementsByClassName("modal-title")[0].innerHTML == "Modifica personaggio") {
        const file = document.getElementById("input").files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                btnPersonaggi.parentElement.children[0].src = e.target.result;
                setCookie(btnPersonaggi.parentElement.children[0].id, e.target.result);
            }
            reader.readAsDataURL(file);
        }
        document.getElementById("input").value = "";
        btnPersonaggi.parentElement.children[1].innerHTML = document.getElementById("titoloPersonaggio").value;
        btnPersonaggi.parentElement.children[2].innerHTML = document.getElementById("descrizionePersonaggio").value;
        setCookie(btnPersonaggi.parentElement.children[1].id, document.getElementById("titoloPersonaggio").value);
        setCookie(btnPersonaggi.parentElement.children[2].id, document.getElementById("descrizionePersonaggio").value);
        creaToast("Modifica avvenuta", "ora", "Modifica personaggio avvenuta con successo.");
        myModal.hide();
    } else if (cliccato.tagName == "IMG") {
        //MODIFICA CON CLICK IMMAGINI
        const file = document.getElementById("input").files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                cliccato.src = e.target.result;
                setCookie(cliccato.id, e.target.result);
                console.log(e.target.result);
            }
            reader.readAsDataURL(file);
        }
        document.getElementById("input").value = "";
        creaToast("Modifica avvenuta", "ora", "Modifica immagine avvenuta con successo.");
        myModal.hide();
    }
    else {
        //MODIFICA CON CLICK titoli e descrizioni
        setCookie(cliccato.id, document.getElementById("input").value);
        cliccato.innerHTML = document.getElementById("input").value;
        document.getElementById("input").value = "";
        if (cliccato.tagName == "H1" || cliccato.tagName == "H2" || cliccato.tagName == "H3" || cliccato.tagName == "H4") {
            creaToast("Modifica avvenuta", "ora", "Modifica titolo avvenuta con successo.");
        } else if (cliccato.tagName == "P") {
            creaToast("Modifica avvenuta", "ora", "Modifica descrizione avvenuta con successo.");
        }
        myModal.hide();
    }
}


function aggiorna() {
    //TITOLI
    for (let i = 0; i < carouselCaptions.length; i++) {
        for (let j = 0; j < carouselCaptions[i].children.length; j++) {
            if (carouselCaptions[i].children[j].id) {
                if (getCookie(carouselCaptions[i].children[j].id)) {
                    document.getElementById(carouselCaptions[i].children[j].id).innerHTML = getCookie(carouselCaptions[i].children[j].id);
                }
            }
        }
    }

    //Titoli FIGURE
    for (let i = 0; i < figure.length; i++) {
        for (let j = 0; j < figure[i].children.length; j++) {
            if (figure[i].children[j].id) {
                if (getCookie(figure[i].children[j].id)) {
                    document.getElementById(figure[i].children[j].id).innerHTML = getCookie(figure[i].children[j].id);
                }
            }
        }
    }

    //Titoli Seconda Parte Marketing
    for (let i = 0; i < figure.length; i++) {
        for (let j = 0; j < figure[i].children.length; j++) {
            if (figure[i].children[j].children.length > 1) {
                for (let k = 0; k < figure[i].children[j].children.length; k++) {
                    if (getCookie(figure[i].children[j].children[k].id)) {
                        document.getElementById(figure[i].children[j].children[k].id).innerHTML = getCookie(figure[i].children[j].children[k].id);
                    }
                }
            }
        }
    }

    //Generali
    if (getCookie("bgColor")) {
        switch (getCookie("bgColor")) {
            case "1":
                body.className = "bg-light";
                if (document.getElementsByClassName("marketing")[0].classList.contains("text-light"))
                    document.getElementsByClassName("marketing")[0].classList.remove("text-light");
                for (let i = 0; i < document.getElementsByClassName("marketing")[0].children[0].children.length; i++) {
                    let elemento = document.getElementsByClassName("marketing")[0].children[0].children[i];
                    if (elemento.children[5].classList.contains("bg-purple")) {
                        elemento.children[5].classList.remove("bg-purple");
                    }
                    if (document.getElementById("liveToast").classList.contains("bg-secondary")) {
                        document.getElementById("liveToast").classList.remove("bg-secondary");
                    }
                }
                break;
            case "2":
                body.className = "bg-secondary";
                if (document.getElementsByClassName("marketing")[0].classList.contains("text-light"))
                    document.getElementsByClassName("marketing")[0].classList.remove("text-light");
                for (let i = 0; i < document.getElementsByClassName("marketing")[0].children[0].children.length; i++) {
                    let elemento = document.getElementsByClassName("marketing")[0].children[0].children[i];
                    if (elemento.children[5].classList.contains("bg-purple")) {
                        elemento.children[5].classList.remove("bg-purple");
                    }
                    if (document.getElementById("liveToast").classList.contains("bg-secondary")) {
                        document.getElementById("liveToast").classList.remove("bg-secondary");
                    }
                }
                break;
            case "3":
                body.className = "bg-dark";
                document.getElementsByClassName("marketing")[0].classList.add("text-light");
                for (let i = 0; i < document.getElementsByClassName("marketing")[0].children[0].children.length; i++) {
                    let elemento = document.getElementsByClassName("marketing")[0].children[0].children[i];
                    elemento.children[5].classList.add("bg-purple");
                }
                document.getElementById("liveToast").classList.add("bg-secondary");
                break;
        }
    }
    if (getCookie("font")) {
        body.style.fontFamily = getCookie("font");
    }
}


function hideButtons() {
    const btnModifica = document.getElementsByClassName("modifica");
    const generali = document.getElementById("generali");
    generali.style = "display: block";
    document.getElementById("edit").classList.add("me-3");
    for (let i = 0; i < btnModifica.length; i++) {
        btnModifica[i].style = "display: none;";
    }
}

function showButtons() {
    const btnModifica = document.getElementsByClassName("modifica");
    const generali = document.getElementById("generali");
    generali.style = "display: none";
    document.getElementById("edit").classList.remove("me-3");
    for (let i = 0; i < btnModifica.length; i++) {
        btnModifica[i].style = "display: inline-block;";
    }
}

// TOAST
function creaToast(title, time, desc) {
    var toastEl = document.getElementById('liveToast');
    var toast = new bootstrap.Toast(toastEl);
    document.getElementById("toastTitle").innerHTML = title;
    document.getElementById("toastTime").innerHTML = time;
    document.getElementById("toastDescription").innerHTML = desc;
    toast.show();
}


//GENERALI
function settings() {
    document.getElementById("staticBackdropLabel").innerHTML = "Generali";
    document.getElementsByClassName("modal-body")[0].innerHTML = "";
    const modalBody = document.createElement("div");
    const bgLabel = document.createElement("label");
    const fontLabel = document.createElement("label");
    const bgPicker = document.createElement("input");
    const select = document.createElement("select");
    const fontSelect = document.createElement("select");
    const lightOpt = document.createElement("option");
    const secondaryOpt = document.createElement("option");
    const darkOpt = document.createElement("option");
    const btnReset = document.createElement("button");
    const courierNew = document.createElement("option");
    const franklinGothicMedium = document.createElement("option");
    const gillSans = document.createElement("option");
    const lucidaSans = document.createElement("option");
    const segoeUI = document.createElement("option");
    const timesNewRoman = document.createElement("option");
    const trebuchetMS = document.createElement("option");
    const arial = document.createElement("option");
    const cambria = document.createElement("option");
    const georgia = document.createElement("option");
    const impact = document.createElement("option");
    const verdana = document.createElement("option");
    const cursive = document.createElement("option");
    const fantasy = document.createElement("option");
    const sansSerif = document.createElement("option");
    const serif = document.createElement("option");
    const monospace = document.createElement("option");

    bgLabel.for = "bgColor";
    bgLabel.classList.add("form-label");
    bgLabel.innerHTML = "Colore sfondo";
    // bgPicker.type = "color";
    // bgPicker.classList.add("form-control", "form-control-color");
    // bgPicker.id = "bgColor";
    // bgPicker.value = "#FFFFFF";
    // bgPicker.title = "Scegli il colore dello sfondo";
    select.classList.add("form-select");
    select.ariaLabel = "Select colore sfondo";
    select.id = "bgColor";
    lightOpt.value = "1";
    lightOpt.selected = body.className == "bg-light";
    lightOpt.innerHTML = "Light";
    secondaryOpt.value = "2";
    secondaryOpt.selected = body.className == "bg-secondary"
    secondaryOpt.innerHTML = "Secondary";
    darkOpt.value = "3";
    darkOpt.selected = body.className == "bg-dark"
    darkOpt.innerHTML = "Dark";
    select.appendChild(lightOpt);
    select.appendChild(secondaryOpt);
    select.appendChild(darkOpt);
    btnReset.id = "reset";
    btnReset.type = "button";
    btnReset.classList.add("btn", "btn-danger", "mt-3");
    btnReset.innerHTML = "Reset";

    modalBody.appendChild(bgLabel);
    // modalBody.appendChild(bgPicker);

    fontLabel.for = "fontSelect";
    fontLabel.classList.add("form-label", "mt-3");
    fontLabel.innerHTML = "Font";
    fontSelect.classList.add("form-select");
    fontSelect.ariaLabel = "Select font family";
    fontSelect.id = "fontSelect";

    courierNew.value = "'Courier New', Courier, monospace";
    courierNew.selected = body.style.fontFamily == "" || body.style.fontFamily == '"Courier New", Courier, monospace';
    courierNew.innerHTML = "Courier New";
    fontSelect.appendChild(courierNew);

    franklinGothicMedium.value = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
    franklinGothicMedium.selected = body.style.fontFamily == '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif';
    franklinGothicMedium.innerHTML = "Franklin Gothic Medium";
    fontSelect.appendChild(franklinGothicMedium);

    gillSans.value = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
    gillSans.selected = body.style.fontFamily == '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
    gillSans.innerHTML = "Gill Sans";
    fontSelect.appendChild(gillSans);

    lucidaSans.value = "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif";
    lucidaSans.selected = body.style.fontFamily == '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif';
    lucidaSans.innerHTML = "Lucida Sans";
    fontSelect.appendChild(lucidaSans);

    segoeUI.value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    segoeUI.selected = body.style.fontFamily == '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
    segoeUI.innerHTML = "Segoe UI";
    fontSelect.appendChild(segoeUI);

    timesNewRoman.value = "'Times New Roman', Times, serif";
    timesNewRoman.selected = body.style.fontFamily == '"Times New Roman", Times, serif';
    timesNewRoman.innerHTML = "Times New Roman";
    fontSelect.appendChild(timesNewRoman);

    trebuchetMS.value = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
    trebuchetMS.selected = body.style.fontFamily == '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif';
    trebuchetMS.innerHTML = "Trebuchet MS";
    fontSelect.appendChild(trebuchetMS);

    arial.value = "Arial, Helvetica, sans-serif";
    arial.selected = body.style.fontFamily == 'Arial, Helvetica, sans-serif';
    arial.innerHTML = "Arial";
    fontSelect.appendChild(arial);

    cambria.value = "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif";
    cambria.selected = body.style.fontFamily == 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif';
    cambria.innerHTML = "Cambria";
    fontSelect.appendChild(cambria);

    georgia.value = "Georgia, 'Times New Roman', Times, serif";
    georgia.selected = body.style.fontFamily == 'Georgia, "Times New Roman", Times, serif';
    georgia.innerHTML = "Georgia";
    fontSelect.appendChild(georgia);

    impact.value = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
    impact.selected = body.style.fontFamily == 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif';
    impact.innerHTML = "Impact";
    fontSelect.appendChild(impact);

    verdana.value = "Verdana, Geneva, Tahoma, sans-serif";
    verdana.selected = body.style.fontFamily == 'Verdana, Geneva, Tahoma, sans-serif';
    verdana.innerHTML = "Verdana";
    fontSelect.appendChild(verdana);

    cursive.value = "cursive";
    cursive.selected = body.style.fontFamily == 'cursive';
    cursive.innerHTML = "Cursive";
    fontSelect.appendChild(cursive);

    fantasy.value = "fantasy";
    fantasy.selected = body.style.fontFamily == 'fantasy';
    fantasy.innerHTML = "Fantasy";
    fontSelect.appendChild(fantasy);

    monospace.value = "monospace";
    monospace.selected = body.style.fontFamily == 'monospace';
    monospace.innerHTML = "Monospace";
    fontSelect.appendChild(monospace);

    sansSerif.value = "sans-serif";
    sansSerif.selected = body.style.fontFamily == 'sans-serif';
    sansSerif.innerHTML = "Sans-Serif";
    fontSelect.appendChild(sansSerif);

    serif.value = "serif";
    serif.innerHTML = "Serif";
    fontSelect.appendChild(serif);
    modalBody.appendChild(select);
    modalBody.appendChild(fontLabel);
    modalBody.appendChild(fontSelect);
    modalBody.appendChild(btnReset);
    document.getElementsByClassName("modal-body")[0].appendChild(modalBody);
    btnReset.addEventListener("click", reset);
    myModal.show();
}

function modificaPersonaggi(button) {
    // console.log(button.parentElement.children[1].innerHTML);

    document.getElementById("staticBackdropLabel").innerHTML = "Modifica personaggio";
    //Visualizzazione immagine corrente
    const imgPersonaggio = document.createElement("img");
    const divImg = document.createElement("div");
    divImg.classList.add("text-center");
    imgPersonaggio.className = "shadow mb-2";
    imgPersonaggio.src = button.parentElement.children[0].src;
    imgPersonaggio.height = 140;
    imgPersonaggio.width = 140;
    imgPersonaggio.alt = "immagine da modificare";
    imgPersonaggio.style = "border-radius: 50%; border: 2.5px solid rgba(0, 0, 0, 0.8)";
    divImg.appendChild(imgPersonaggio);

    //Creazione input nuova immagine (eventuale)
    const input = document.createElement("input");
    input.setAttribute('data-bs-toggle', 'tooltip');
    input.setAttribute('data-bs-placement', 'right');
    input.setAttribute('title', "L'immagine caricata non verrà salvata per motivi di sicurezza.");
    input.className = "form-control mt-3";
    input.type = "file";
    input.accept = ".jpg, .jpeg, .png";
    input.id = "input";
    input.addEventListener("change", () => {
        const file = document.getElementById("input").files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imgPersonaggio.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    //Label titolo
    const labelTitolo = document.createElement("label");
    labelTitolo.setAttribute('for', 'titoloPersonaggio');
    labelTitolo.style.fontSize = "1.5rem";
    labelTitolo.className = "form-labe mt-3 mb-2";
    labelTitolo.innerHTML = "Titolo personaggio";

    //Titolo
    const inputTitolo = document.createElement("input");
    inputTitolo.id = "titoloPersonaggio";
    inputTitolo.type = "text";
    inputTitolo.className = "form-control";
    inputTitolo.maxLength = 25;
    inputTitolo.value = button.parentElement.children[1].innerHTML;

    //Label descrizione
    const labelDescrizione = document.createElement("label");
    labelDescrizione.setAttribute('for', 'descrizionePersonaggio');
    labelDescrizione.style.fontSize = "1.5rem";
    labelDescrizione.className = "form-labe mt-3 mb-2";
    labelDescrizione.innerHTML = "Descrizione";

    //Descrizione
    const inputDescrizione = document.createElement("textarea");
    inputDescrizione.id = "descrizionePersonaggio";
    inputDescrizione.type = "text";
    inputDescrizione.className = "form-control";
    inputDescrizione.maxLength = 136;
    inputDescrizione.placeholder = "Inserisci la descrizione qui";
    inputDescrizione.value = button.parentElement.children[2].innerHTML;

    document.getElementsByClassName("modal-body")[0].innerHTML = "";
    document.getElementsByClassName("modal-body")[0].appendChild(divImg);
    document.getElementsByClassName("modal-body")[0].appendChild(input);
    document.getElementsByClassName("modal-body")[0].appendChild(labelTitolo);
    document.getElementsByClassName("modal-body")[0].appendChild(inputTitolo);
    document.getElementsByClassName("modal-body")[0].appendChild(labelDescrizione);
    document.getElementsByClassName("modal-body")[0].appendChild(inputDescrizione);
    btnPersonaggi = button;
    myModal.show();
}

function modificaSchermate(button) {
    document.getElementById("staticBackdropLabel").innerHTML = "Modifica schermata";
    //Visualizzazione immagine corrente
    const imgCarousel = document.createElement("img");
    const divImg = document.createElement("div");
    divImg.classList.add("text-center");
    imgCarousel.className = "shadow mb-2";
    imgCarousel.src = button.parentElement.parentElement.parentElement.children[0].src;
    imgCarousel.height = 140;
    imgCarousel.width = 240;
    imgCarousel.alt = "immagine da modificare";
    imgCarousel.style = "border: 2.5px solid rgba(0, 0, 0, 0.8); object-fit: cover;";
    divImg.appendChild(imgCarousel);

    //Creazione input nuova immagine (eventuale)
    const input = document.createElement("input");
    input.setAttribute('data-bs-toggle', 'tooltip');
    input.setAttribute('data-bs-placement', 'right');
    input.setAttribute('title', "L'immagine caricata non verrà salvata per motivi di sicurezza.");
    input.className = "form-control mt-3";
    input.type = "file";
    input.accept = ".jpg, .jpeg, .png";
    input.id = "input";
    input.addEventListener("change", () => {
        const file = document.getElementById("input").files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imgCarousel.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    //Label titolo
    const labelTitolo = document.createElement("label");
    labelTitolo.setAttribute('for', 'titoloSchermata');
    labelTitolo.style.fontSize = "1.5rem";
    labelTitolo.className = "form-labe mt-3 mb-2";
    labelTitolo.innerHTML = "Titolo schermata";

    //Titolo
    const inputTitolo = document.createElement("input");
    inputTitolo.id = "titoloSchermata";
    inputTitolo.type = "text";
    inputTitolo.className = "form-control";
    inputTitolo.maxLength = 25;
    inputTitolo.value = button.parentElement.children[0].innerHTML;

    //Label descrizione
    const labelDescrizione = document.createElement("label");
    labelDescrizione.setAttribute('for', 'descrizioneSchermata');
    labelDescrizione.style.fontSize = "1.5rem";
    labelDescrizione.className = "form-labe mt-3 mb-2";
    labelDescrizione.innerHTML = "Descrizione";

    //Descrizione
    const inputDescrizione = document.createElement("textarea");
    inputDescrizione.id = "descrizioneSchermata";
    inputDescrizione.type = "text";
    inputDescrizione.className = "form-control";
    inputDescrizione.maxLength = 136;
    inputDescrizione.placeholder = "Inserisci la descrizione qui";
    inputDescrizione.value = button.parentElement.children[1].innerHTML;

    document.getElementsByClassName("modal-body")[0].innerHTML = "";
    document.getElementsByClassName("modal-body")[0].appendChild(divImg);
    document.getElementsByClassName("modal-body")[0].appendChild(input);
    document.getElementsByClassName("modal-body")[0].appendChild(labelTitolo);
    document.getElementsByClassName("modal-body")[0].appendChild(inputTitolo);
    document.getElementsByClassName("modal-body")[0].appendChild(labelDescrizione);
    document.getElementsByClassName("modal-body")[0].appendChild(inputDescrizione);
    btnSchermate = button;
    myModal.show();

    // <div class="carousel-caption text-end">
    //   <h1 id="terzoTitolo">Terzo titolo</h1>
    //   <p id="terzaDescrizione">Contenuti placeholder rappresentativi per la terza diapositiva del carosello.</p>
    //   <button class="btn btn-lg text-light bg-purple modifica">
    //     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //       class="bi bi-pencil-fill mb-1" viewBox="0 0 16 16">
    //       <path
    //         d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
    //     </svg> Modifica</button>
    // </div>
}

//Caricamento immagini
for (let i = 0; i < document.getElementsByClassName("imgCarousel").length; i++) {
    document.getElementsByClassName("imgCarousel")[i].onload = () => {
        document.getElementsByClassName('segnaposto')[i].style.display = 'none';
        document.getElementsByClassName("imgCarousel")[i].style.display = 'block';
    };
}

for (let i = 0; i < document.getElementsByClassName("immagineFigura").length; i++) {
    document.getElementsByClassName("immagineFigura")[i].onload = () => {
        document.getElementsByClassName('segnaposto')[i + 3].style.display = 'none';
        document.getElementsByClassName("immagineFigura")[i].style.display = 'inline-block';
    };
}

for (let i = 0; i < document.getElementsByClassName("featuretteImg").length; i++) {
    document.getElementsByClassName("featuretteImg")[i].onload = () => {
        document.getElementsByClassName('segnaposto')[i + 6].style.display = 'none';
        document.getElementsByClassName("featuretteImg")[i].style.display = 'inline-block';
    };
}

