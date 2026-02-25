import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CadastroEvento({ onAdd, onUpdate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const evento = location.state?.evento;

  const [titulo, setTitulo] = useState(evento?.titulo || "");
  const [data, setData] = useState(evento?.data || "");
  const [local, setLocal] = useState(evento?.local || "");
  const [descricao, setDescricao] = useState(evento?.descricao || "");
  const [status, setStatus] = useState(evento?.status || "");
  const [capacidade, setCapacidade] = useState(evento?.capacidade || "");

  const limparFormulario = (e) => {
    e.preventDefault();
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("");
    setCapacidade("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !data || !local || !descricao || !status || !capacidade) {
      alert("Preencha todos os campos.");
      return;
    }

    // Gera automaticamente o link do mapa a partir do endereço
    const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local)}`;

    const novoEvento = {
      titulo,
      data,
      local,
      descricao,
      status,
      capacidade: Number(capacidade),
      mapa: linkMapa, // <- link do Google Maps automático
      vagasRestantes: Number(capacidade),
    };

    if (evento) {
      // Atualiza evento existente
      onUpdate(evento.id, { ...novoEvento });
    } else {
      // Adiciona novo evento
      onAdd(novoEvento);
    }

    navigate("/evento"); // volta para a lista de eventos
  };

  return (
    <section className="stack">
      <h2>{evento ? "Editar Evento" : "Cadastrar Evento"}</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Título
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Demo do sistema"
          />
        </label>

        <label>
          Data
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </label>

        <label>
          Local
          <input
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Ex: Av. Fernando Machado"
          />
        </label>

        <label>
          Descrição
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Descrição do Evento"
          />
        </label>

        <label>
          Status
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Ex: Aberto"
          />
        </label>

        <label>
          Capacidade
          <input
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            placeholder="Ex: 50 pessoas"
          />
        </label>

        <div className="row">
          <button className="btn" type="submit">
            Salvar
          </button>
          <button className="btn" type="button" onClick={limparFormulario}>
            Limpar
          </button>
          <button
            className="btn ghost"
            type="button"
            onClick={() => navigate("/evento")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}