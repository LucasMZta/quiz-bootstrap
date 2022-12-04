let questions = [
    { id: 1, question: 'Como devemos chamar um script JS?', options: ['&lt;script src="link script"&gt;', '&lt;link rel="script" href="link"&gt;', '&lt;script src="link script"&gt; &lt;/script>', '&lt;script src="link script" /&gt;'], answer: 2 },
    { id: 2, question: 'Qual a forma correta de se criar um link?', options: ['&lt;a href="link">link aqui&lt;/a&gt;', '&lt;span href="link"&gt;Link aqui&lt;/span&gt;', '&lt;link rel="Link" value="Link aqui"&gt;', '&lt;a src="link"&gt;link aqui&lt;/a&gt;' ], answer: 0 },
    { id: 3, question: 'Qual atributo devemos utilizar para inserir propriedades CSS?', options: ['style=""', 'css-style=""', 'css=""', 'background=""'], answer: 0 },
    { id: 4, question: 'Qual a forma correta de se criar uma imagem?', options: ['&lt;image src="link imagem"&gt;', '&lt;figure src="link imagem"&gt;&lt;/figure&gt;', '&lt;img&gt;link imagem&lt;/img&gt;', '&lt;img src="link imagem"&gt;'], answer: 3 },
    { id: 5, question: 'Qual é o numero?', options: [1, 2, 3, 4], answer: 3 },
]
let currentQuest = 0;
let correctAswers = 0;
const bar = document.querySelector('.progress-bar');


function showQuestions() {
    let quest = questions[currentQuest];

    if(quest) {

        //estilizando a barra de progresso
        let progress = (currentQuest /questions.length)*100;
        bar.style.width = `${progress}%`;
        bar.innerText = `${progress}%`;

        let title = document.querySelector('.modal-title');
        title.innerHTML = `${quest.id}- ${quest.question}`;

        //Alternativas
        let opt = ''
        for(let i in quest.options) {
            opt += `<div class="list-group-item list-group-item-action" role="alert" data-bs-option="${i}" >${quest.options[i]}</div>`
        }
        let body = document.querySelector('.list-group');
        body.innerHTML = opt;

        document.querySelectorAll('.modal-body .list-group-item').forEach(item => {
            item.addEventListener('click', verifyAnswer);
        })
    } else {
       //QUANDO AS RESPOSTAS ACABAREM
        let progress = (currentQuest / questions.length) * 100;
        bar.style.width = `${progress}%`;
        bar.innerText = `${progress}%`;
        endQuestions();  
    }
}
function verifyAnswer(e){
    let quest = questions[currentQuest];
    let optClick = e.target.getAttribute('data-bs-option');

    if(optClick == quest.answer) {
        //se a resposta for correta
        // e.target.classList.add('alert');
        e.target.classList.add('bg-success');
        // e.target.classList.remove('list-group-item');
        setTimeout(next, 1000);
        correctAswers++;
        currentQuest++;
    } else {
        // e.target.classList.add('alert');
        e.target.classList.add('bg-danger');
        // e.target.classList.remove('list-group-item');
        setTimeout(next, 1000);
        currentQuest++;
    }
    
    
}
function closeQuestions() {
    alert('Voce tem certeza que deseja encerrar? Todo o seu progresso será perdido');
    endQuestions();
}
function endQuestions() {
    let myModalEl = document.querySelector('.modal');
    let modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();

    bar.style.width = `0%`;
    bar.innerText = `0%`;

    document.querySelector('.finish').innerHTML= `<h1> O seu progresso foi de ${(correctAswers/questions.length)*100}% </h1>`;
}
function next() {
    showQuestions();
}

//Iniciar o quiz apertando no INICIAR
const btn = document.querySelector('.container-fluid .btn');
const btnClose = document.querySelector('.btn.btn-danger');
btn.addEventListener('click',showQuestions);
btnClose.addEventListener('click',closeQuestions);
