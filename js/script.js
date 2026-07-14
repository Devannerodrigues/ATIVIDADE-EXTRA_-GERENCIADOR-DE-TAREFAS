let tarefas = [], idTarefa = 0;

function renderizar() {
    ['aberto', 'em-andamento', 'finalizada'].forEach(s => document.getElementById(s).innerHTML = '');
    
    tarefas.forEach(t => {
        const card = document.createElement('div');
        card.style.cssText = `border-left: 5px solid ${cores[t.prioridade]}; background: #f7f6f5; padding: 15px; margin-bottom: 10px; border-radius: 5px;`;
         
        document.getElementById(t.status).appendChild(card);
    });
    
    document.getElementById('cont-baixa').textContent = tarefas.filter(t => t.prioridade === 'baixa').length;
    document.getElementById('cont-media').textContent = tarefas.filter(t => t.prioridade === 'media').length;
    document.getElementById('cont-alta').textContent = tarefas.filter(t => t.prioridade === 'alta').length;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function mudar(id, status) {
    tarefas.find(t => t.id === id).status = status;
    renderizar();
}

function deletar(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    renderizar();
}

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('tarefas');
    if (saved) {
        tarefas = JSON.parse(saved);
        idTarefa = Math.max(...tarefas.map(t => t.id), -1) + 1;
        renderizar();
    }
});
