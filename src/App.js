import axios from "axios";
import React, { useEffect, useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";

const usuariosLocal = [
  {
    id: 1,
    name: "Muri"
  },
  {
    id: 2,
    name: "Paulinha"
  },
  {
    id: 3,
    name: "Marcelo"
  },
  {
    id: 4,
    name: "Rodrigo"
  },
]

function App() {

 const pegarUsuarios = () => {
  axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", { //buscando dados da API
  headers:{
  Authorization: "thamiris-dorville-conway" //para acessar a API
}
}).then((response)=>{
  console.log("deu certo")
  console.log(response.data)
  setUsuarios(response.data)
})
.catch((error)=> {
  console.log("deu erro!")
  console.log(error)
})} //eu falo para o método .then() o que quero que aconteça quando os dados voltarem

//useeffect vai evitar o looping dos dados no console.log
useEffect(()=> {
  pegarUsuarios()        
}, [])

//Exercício 3: Criar um novo usuário



  const [usuarios, setUsuarios] = useState(usuariosLocal)
  const [novoEmail, setNovoEmail] = useState("")
const adicionarUsuario = (novoUsuario) => {
  setUsuarios([...usuarios, novoUsuario])
}

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario adicionarUsuario={adicionarUsuario}/>
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} usuario={usuario} novoEmail={novoEmail}/>
      })}
    </>
  )
}

export default App;

//exercícios
//mudar a origem dos dados: 

//1 - Modifique o APP.js para que ele <<receba o array de usuários da API>>

//Receber novos dados

//2 - Agora que estamos acessando os dados da API, vamos criar uma função que receba um parâmetro
//e com isso, retorne o email do usuário.
//* para isso, veja os endpoints e escolha o endpoint que retorne esse dado

//3- Adicionar Usuário
//Neste passo iremos adicionar um novo usuário

//* Veja, na documentação, quais os dados são solicitados para que seja feito 
//o cadastro de um novo usuário;

//* Crie os elementos necessários e uma função para adicionar o novo usuário