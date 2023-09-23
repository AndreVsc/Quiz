const questions = [
    {
        question:"Qual é o Pokémon inicial da região de Kanto, que é um tipo de planta?",
        choices:["Charmander","Bulbasaur","Squirtle","Magnamite"],
        answer:"Bulbasaur",
    }
    ,
    {
        question:"Qual é o Pokémon aquático que evolui de Squirtle?",
        choices:["Eevee","Wartortle","Lapras","Ponita"],
        answer:"Wartortle",
    }
    ,
    {
        question:"Qual é o Pokémon lendário que é conhecido por controlar o tempo?",
        choices:["Lugia","Dialga","Ho ho ho","Celebi"],
        answer:"Dialga",
    }
    ,
    {
        question:"Qual é o Pokémon amarelo e elétrico que é o mascote da franquia?",
        choices:["Haunter","Jolteon","Magmar","Golem"],
        answer:"Pikachu",
    }
    ,
    {
        question:"Qual é o nome do Pokémon que é um dos iniciais da região de Alola e é do tipo água/fantasma?",
        choices:["Snorlax","Ditto","Popplio","Metapode"],
        answer:"Popplio",
    }
    ,
    {
        question:"Qual é o Pokémon que se assemelha a um dragão e tem três evoluções?",
        choices:["Caterpi","Mew","Gengar","Dratini"],
        answer:"Dratini",
    }
    ,
    {
        question:"Que Pokémon é conhecido por ser um gato com uma moeda na testa?",
        choices:["Mew","Meowth (versão de Alola)","Meowth","Ratata"],
        answer:"Meowth (versão de Alola)",
    }
    ,
    {
        question:"Qual é o Pokémon que se disfarça de objetos comuns?",
        choices:["Vulpix","Diglet","Ditto","Mankey"],
        answer:"Ditto",
    }
    ,
    {
        question:"Qual é o Pokémon que tem a habilidade de 'cortar' árvores no jogo?",
        choices:["Cut (Habilidade HM01)","Ice Beam(Ataque TM11)","fly(habilidade HM02)","Strength (habilidade HM04)"],
        answer:"Cut (Habilidade HM01)",
    }
    ,
    {
        question:"Que Pokémon é conhecido por representar o oceano?",
        choices:["Staryu","Kyogre","Psyduck","Seel"],
        answer:"Kyogre",
    }
    ,
    {
        question:"Que Pokémon é conhecido por seu poder psíquico e por ser o mais forte de todos?",
        choices:["Gengar","Golduck","Mewtwo","PoliWag"],
        answer:"Mewtwo",
    }
    ,
    {
        question:"Qual é o nome do Pokémon voador que tem três evoluções e é conhecido por ser um mensageiro?",
        choices:["Sperow","Articuno","Schyter","Pidgey"],
        answer:"Pidgey",
    }
]

const questionElement = document.querySelector("#question");
const choiceElement = document.querySelectorAll(".choice");
const nextElement = document.querySelector("#next");
const scoreElement = document.querySelector("#score");
const wrongElement = document.querySelector("#wrong");
const alertElement = document.querySelector("#alert");
const tituloElement = document.querySelector("#titulo");

let currentQuestion = 0;
let score = 0;
let wrong = 0;
let answerChosen = false;
let atualQuestion = 0;



function loadQuestion(){
    const currentQuestionData = questions[currentQuestion];
    questionElement.innerHTML = currentQuestionData.question;

    choiceElement.forEach((btn) => {
        btn.innerHTML = "";
        btn.classList.remove('selected');
      });

    const choices = shuffleArray(currentQuestionData.choices);

    for(let i=0;i<choiceElement.length;i++){
        choiceElement[i].innerHTML = choices[i];
    }

    answerChosen=false;
}

function shuffleArray(array){
     let currentIndex = array.length;
     let temporaryValue;
     let randomIndex;

     while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array [randomIndex];
        array[randomIndex] = temporaryValue;
     }

    return array;
}

function checkAnswer(e){
    if(answerChosen) return;

    answerChosen = true;

    e.target.classList.add('selected');
    
    if(e.target.innerHTML === questions[currentQuestion].answer){
        score++;
    }else{
        wrong++;    
    }

}

function nextEvent(){
    if(!answerChosen){
        alertElement.innerHTML= `Responda a questão`;
        return;
    }

    currentQuestion++;

    if(currentQuestion<questions.length) {
        alertElement.innerHTML = "";
        loadQuestion();
    }else if(currentQuestion=questions.length){
        loadBoard();
    }
}


choiceElement.forEach((btn)=>{
    btn.addEventListener("click",checkAnswer);
});

nextElement.addEventListener("click", nextEvent);



function loadBoard(){
    nextElement.innerHTML = "Restart";
    tituloElement.innerHTML = " Fim de jogo !";
    scoreElement.style.display = "flex";
    wrongElement.style.display = "flex";
    alertElement.style.display = "none";
    choiceElement.forEach((bnt)=>{bnt.style.display = "none";})
    questionElement.style.display = "none";
    scoreElement.innerHTML = `Pontuação : ${score}`; 
    wrongElement.innerHTML = `Erros : ${wrong}`;
    nextElement.removeEventListener("click", nextEvent);
    nextElement.addEventListener("click",restartQuiz);
}

function restartQuiz(){
    currentQuestion = 0;
    score = 0;
    wrong =0;
    nextElement.innerHTML = "Próximo";
    tituloElement.innerHTML = "Quiz interativo";
    scoreElement.style.display = "none";
    wrongElement.style.display = "none";
    alertElement.style.display = "flex";
    choiceElement.forEach((bnt)=>{bnt.style.display = "flex";})
    questionElement.style.display = "block";
    nextElement.removeEventListener("click",restartQuiz);
    nextElement.addEventListener("click", nextEvent);
    loadQuestion();
}

loadQuestion();