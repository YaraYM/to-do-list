// Selecionar tags html no JS
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

// Criar um item 'li' na lista de tarefas
function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return; 
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

// Adicionar botão 'apagar' na frente de cada tarefa
function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.classList.add('apagar');
    botaoApagar.innerHTML = `<i class='bx bx-trash'></i>`;
    botaoApagar.setAttribute('class', 'apagar');
    // botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

// Adiciona li (tarefa) à ul .tarefas
function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

// Capturar evento de clique no botão btn-tarefa
// Ao clicar no botão .btn-tarefa, captura o texto digitado no inputTarefa e o 'joga' para a função criaTarefa
btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return; // ?
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    } else if (el.classList.contains('bx-trash')) {
        (el.parentElement).parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {

    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];


    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '');
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
  
    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();

