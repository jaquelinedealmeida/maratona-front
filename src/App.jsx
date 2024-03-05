import { useState, useEffect } from 'react' //importo o hook
import './app.css'
import Axios from 'axios'

function App() {
  const [cards, setCards] = useState([]) //declara o estado da lista que vai receber por api
  const [searchTerm, setSearchTerm] = useState('') //declaro o hook
  const [titulo, setTitulo] = useState('')// criando estado de titulo
  const [descricao, setDescricao] = useState('')// criando estado de descricao
  const [link, setLink] = useState('')// criando estado de link
  const baseURL = 'https://projeto-demo-back.onrender.com/cards'

  const cardsFiltrados = cards.filter(card => {
    return card.title.toLowerCase().includes(searchTerm.toLowerCase()) //filtrar
  })

  const handleSubmit = (e) => { //liga o clique do botão no formulário
    e.preventDefault()
    //enviando dados para API
    async function sendData(){
      await Axios.post(baseURL, {
        title: titulo,
        description: descricao,
        link: link
      })
    }
    sendData() //chamando a funcao
    setTitulo('')
    setDescricao('')
    setLink('')
  }

  useEffect(()=> {
    async function getData() {
      const response = await Axios.get(baseURL)
      setCards(response.data)//coloca na tela os dados que vieram da API
    }
    getData()
  }, [cards]) //estado que modifica os dados na tela
  //useEffect espera dois parametros - arrow function e array

  return (
    <>
      <header>
        <h1>Meus FlashCards de Programação</h1>
        <input
          type="text"
          placeholder="Busque um conteúdo..."
          value={searchTerm} // valor inicial da busca
          onChange={(e) => setSearchTerm(e.target.value)} //captura input
        />
      </header>

      <div className="gallery">
        {cardsFiltrados.map(item => { //mapeia lista a partir do filtro do estado
          return (
            <>
              <div className="card">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <a href={item.link} target="_blank">
                  Saiba mais
                </a>
              </div>
            </>
          )
        })}
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Cadastre um novo conteúdo:</h1>
        <input
          placeholder="Título:"
          type="text"
          value={titulo} //atrelando valor do estado titulo a este elemento
          onChange={(e) => setTitulo(e.target.value)} //criando o evento de captura de input do titulo
        />
        <textarea
          placeholder="Descrição:"
          value={descricao} //atrelando valor do estado descricao a este elemento
          onChange={(e) => setDescricao(e.target.value)} //criando o evento de captura de input do descricao
        />
        <input
          placeholder="Link:"
          type="text"
          value={link} //atrelando valor do estado link a este elemento
          onChange={(e) => setLink(e.target.value)} //criando o evento de captura de link do descricao
        />
        <button type="submit">Criar FlashCard</button>
      </form>
      <footer>
        <p className="read-the-docs">
          Criado com amor por Jaqueline de Almeida
        </p>
      </footer>
    </>
  );
}

export default App;