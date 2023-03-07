import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
const User = styled.div`
  border: black 1px solid;
  margin-top: 10px;
  width: 350px
`
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

//exercício 2 -  criar uma função que receba um parâmetro
//e com isso, retorne o email do usuário.
  useEffect(()=>{
    const pegarUsuarioPorId = () => {
      axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.usuario.id}`, {
        headers: {
          Authorization:"thamiris-dorville-conway"
        }
      })
      .then((response) => {
        setEmail(response.data.email)
        console.log(response.data.email)
      })
      .catch((error)=> {
    console.log(error)
      })
    }
    pegarUsuarioPorId()
  }, [props.usuario.id]) //a função pegarUsuarioPorId só precisa ser executada novamente quando o props.usuario.id mudar. 
  //Se essa array fosse vazia, a função seria executada apenas uma vez, quando o componente for montado.

  //exercício PARA GUARDAR NA CABEÇA
//modificar os dados do usuário
//crie o input e função necessária para pegar este valor dado pelo usuário
//crie a função que faz esta requisição com o axios
const editarUsuario = () => {
   
  axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
  
  {name: nome,
    email: email


  },
  {
    headers: {
      Authorization: "thamiris-dorville-conway"
    }

  } 
  )
  .then((response)=> {
    setUsuario(response.data) //atualiza o estado usuario com as informações do usuário recebidas na resposta da API.
    setEditar(false) //atualiza o estado editar para false, indicando que o modo de edição deve ser desativado.
  })
  .catch((error)=> {
    console.log(error)
  })
}


// exercício: DELETAR USUÁRIO

// A. veja na documentação como funciona o endpoint para apagar um usuário
//quais dados são necessários? como este endpoint recebe eles?

// B. Crie uma função que receba estes dados (e os elementos necessários) e faça a requisição:

const excluirUsuario = () => {
axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, {
  headers: {
Authorization: "thamiris-dorville-conway"

}
})
.then((response)=> {
 alert("Usuário foi excluído!")
 props.pegarUsuarios()
})
.catch((error)=>{
  console.log(error)
})
}
  return (
    <User>
      {editar ? (
        <div>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={editarUsuario}>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>Nome:{usuario.name}</p>
          {/* o email retornado pela API será armazenado no estado email, 
          e a tag <p>E-mail:{email}</p> será atualizada para renderizar o email na tela. */}
          <p>E-mail:{props.novoEmail === email ? props.novoEmail : email}</p> 
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={excluirUsuario}>Excluir</button>
    </User>
  );
        }

export default Usuario;


