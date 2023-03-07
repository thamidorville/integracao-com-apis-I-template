import React, { useState } from "react";
import axios from "axios";

function AddUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const novoUsuario = () => {

    const body = {
      name: nome,
      email: email
    }
    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users`, 
    body, {headers: {
      Authorization: "thamiris-dorville-conway"
    }
    })
    .then((res)=> {
      props.adicionarUsuario(res.data)
  console.log(res)
    })
    .catch((er)=> {
  console.log(er)
    })
  }
  

  return (
    <>
      <p>Adicionar novo usuario</p>
      <input
        placeholder={"nome"}
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder={"email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={novoUsuario}>Enviar</button>
    </>
  );
}

export default AddUsuario;
