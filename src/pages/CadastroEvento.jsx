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
  const [vagasRestantes, setVagasRestantes] = useState(evento?.vagasRestantes || "");
  const [fotosTexto, setFotosTexto] = useState(
  evento?.fotos?.join("\n") || "");
  

  const limparFormulario = (e) => {
    e.preventDefault();
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("");
    setCapacidade("");
    setFotosTexto("");
    setVagasRestantes("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !data || !local || !descricao || !status || !capacidade || !vagasRestantes) {
      alert("Preencha todos os campos.");
      return;
    }

    const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      local
    )}`;

    const fotosLista = fotosTexto
      .split("\n")
      .map((linha) => linha.trim())
      .filter((linha) => linha !== "");

    const novoEvento = {
      titulo,
      data,
      local,
      descricao,
      status,
      capacidade: Number(capacidade),
      mapa: linkMapa,
      vagasRestantes,
      fotos: fotosLista,
    };

    if (evento) {
      onUpdate(evento.id, { ...novoEvento });
    } else {
      onAdd(novoEvento);
    }

    navigate("/evento");
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
            type="number"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            placeholder="Ex: 50"
          />
        </label>

        <label>
          Vagas restantes
          <input
            type="number"
            value={vagasRestantes}
            onChange={(e) => setVagasRestantes(e.target.value)}
            placeholder="Ex: 30"
          />
        </label>

        <label>
          Fotos (uma URL por linha)
          <textarea
            value={fotosTexto}
            onChange={(e) => setFotosTexto(e.target.value)}
            placeholder="Cole aqui as URLs das fotos, uma por linha"
          />
        </label>

        {/* Pré-visualização das fotos */}
        {fotosTexto && (
          <div>
            <h4>Pré-visualização:</h4>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              {fotosTexto.split("\n").map(
                (foto, idx) =>
                  foto.trim() !== "" && (
                    <a
                      key={idx}
                      href={foto}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={foto}
                        alt={`Foto ${idx + 1}`}
                        style={{
                          maxWidth: "120px",
                          borderRadius: "5px",
                        }}
                      />
                    </a>
                  )
              )}
            </div>
          </div>
        )}

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