import React from "react";
import { useParams, Link } from "react-router-dom";

export default function DetalheEvento({ eventos }) {
  const { id } = useParams();

  const evento = eventos.find((e) => e.id === Number(id));

  if (!evento) {
    return <h2>Evento não encontrado</h2>;
  }

  return (
    <div>
      <h1>{evento.titulo}</h1>
      <p><strong>Data: </strong> {evento.data}</p>
      <p><strong>Local: </strong> {evento.local}</p>
      <p><strong>Descrição: </strong> {evento.descricao}</p>
       <p><strong> Status: </strong> {evento.status}</p>
       <p><strong> Capacidade: </strong> {evento.capacidade} </p>
        <p><strong> Vagas Restantes: </strong></p>
       <p><strong> Mapa: </strong> {evento.mapa} </p>
       <p><strong> Foto Evento: </strong>{evento.fotosTexto} </p>
      
      <br />
      <Link to="/Evento">Voltar</Link>
    </div>
  );
}