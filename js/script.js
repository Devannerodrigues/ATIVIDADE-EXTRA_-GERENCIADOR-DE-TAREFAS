let tarefas = [], idTarefa = 0;

const cores = {
    baixa: '#4caf50',
    media: '#ffc107',
    alta: '#f44336'
};

function renderizar() {
    ['aberto', 'em-andamento', 'finalizada'].forEach(s => document.getElementById(s).innerHTML = '');
    
    tarefas.forEach(t => {
        const card = document.createElement('div');
        card.className = `card ${t.prioridade}`;
        
        card.innerHTML = `
            <span class="badge-prioridade">${t.prioridade}</span>
            <h3>${t.tarefa}</h3>
            <div class="card-info">
                <h2>Responsável:</h2>
                <p>${t.responsavel}</p>
                <h2>Descrição:</h2>
                <p>${t.descricao}</p>
                <h2>Data:</h2>
                <p>${new Date(t.data).toLocaleDateString('pt-BR')}</p>
            </div>
            <div class="card-actions">
                ${t.status !== 'em-andamento' ? `<button class="card-btn btn-andamento" onclick="mudar(${t.id}, 'em-andamento')">Em Andamento</button>` : ''}
                ${t.status !== 'finalizada' ? `<button class="card-btn btn-finalizar" onclick="mudar(${t.id}, 'finalizada')">Finalizar</button>` : ''}
                ${t.status !== 'aberto' ? `<button class="card-btn btn-reabrir" onclick="mudar(${t.id}, 'aberto')">Reabrir</button>` : ''}
                <button class="card-btn btn-deletar" onclick="deletar(${t.id})">Deletar</button>
            </div>
        `;
         
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
    
    document.getElementById('form-tarefa').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const tarefa = {
            id: idTarefa++,
            tarefa: document.getElementById('tarefa').value,
            responsavel: document.getElementById('responsavel').value,
            descricao: document.getElementById('descricao').value,
            prioridade: document.getElementById('prioridade').value,
            data: document.getElementById('data-tarefa').value,
            status: 'aberto'
        };
        
        tarefas.push(tarefa);
        renderizar();
        document.getElementById('form-tarefa').reset();
    });
});
