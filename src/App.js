import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      //console.log(response.data);
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: "https://github.com/brennoclins/gostack-desafio-conceitos-nodejs",
      techs: "nodejs",
    });

    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    //criando uma nova lista e apagando o repsitorio com ID igual
    const deletedRepository = repositories.filter(repository => repository.id !== id);
    //apagando via api o repositório
    await api.delete(`repositories/${id}`);
    //atualizando estado da minha lista de repositórios
    setRepositories(deletedRepository);    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => 
          <li key={repository.id}>
            
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
