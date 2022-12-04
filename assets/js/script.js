let questions = [
    { id: 1, question: 'Como devemos chamar um script JS?', options: ['&lt;script src="link script"&gt;', '&lt;link rel="script" href="link"&gt;', '&lt;script src="link script"&gt; &lt;/script>', '&lt;script src="link script" /&gt;'], answer: 2 },
    { id: 2, question: 'Qual a forma correta de se criar um link?', options: ['&lt;a href="link">link aqui&lt;/a&gt;', '&lt;span href="link"&gt;Link aqui&lt;/span&gt;', '&lt;link rel="Link" value="Link aqui"&gt;', '&lt;a src="link"&gt;link aqui&lt;/a&gt;' ], answer: 0 },
    { id: 3, question: 'Qual atributo devemos utilizar para inserir propriedades CSS?', options: ['style=""', 'css-style=""', 'css=""', 'background=""'], answer: 0 },
    { id: 4, question: 'Qual a forma correta de se criar uma imagem?', options: ['&lt;image src="link imagem"&gt;', '&lt;figure src="link imagem"&gt;&lt;/figure&gt;', '&lt;img&gt;link imagem&lt;/img&gt;', '&lt;img src="link imagem"&gt;'], answer: 3 },
    { id: 5, question: 'Como é criado uma função no Javascript?', options: ['function:minhaFuncao(){ }', 'function = minhaFuncao{ }', 'function minhaFuncao() { }', 'function = minhaFuncao() { }'], answer: 3 },
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

    btn.classList.add('d-none');

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
    const finish = document.querySelector('.finish');
    finish.classList.remove('d-none');

    const correct = document.querySelector('#correctAswers');
    const totalQuests = document.querySelector('#totalQuests')
    const correctPerc = document.querySelector('#correctPerc');
    const frase = document.querySelector('.frase');
    let text = '';
    console.log(correct);
    console.log(totalQuests);
    console.log(finish);
    modal.hide(); 

    if (((correctAswers / questions.length) * 100) <= 30) {
        //menor ou igual a 30% de acerto
        text = 'Você pode melhorar, hein?!';
    } else if (((correctAswers / questions.length) * 100) >= 80) {
        //maior ou igual a 80% de acerto
        text = 'Parabéns! Você ja pode iniciar na programação! :)';
    } else {
        //entre 31 e 79% de acerto
        text = 'Nada mal! Você mandou bem.'
    }
    // document.querySelector('.finish').innerHTML= `<h1> O seu progresso foi de ${(correctAswers/questions.length)*100}% </h1>`;
    correctPerc.innerText = `${((correctAswers/questions.length) * 100)}%`
    correct.innerText = correctAswers;
    totalQuests.innerText = questions.length;
    frase.innerText = text;

    // bar.style.width = `0%`;
    // bar.innerText = `0%`;
    currentQuest = 0;
    correctAswers = 0;
    
}
function next() {
    showQuestions();
}

//Iniciar o quiz apertando no INICIAR
const btn = document.querySelector('.container-fluid .btn');
const btnRefazer = document.querySelector('.container-fluid .refazer');
const btnClose = document.querySelector('.btn.btn-danger');
btn.addEventListener('click',showQuestions);
btnRefazer.addEventListener('click', showQuestions);
btnClose.addEventListener('click',closeQuestions);
