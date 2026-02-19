import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CardEvento({ evento, onRemover }) {
  const navigate = useNavigate();

  // Navega para /cadastrar para editar o evento
  const handleEditar = () => {
    navigate("/cadastrar", { state: { evento } });
  };

  // Estilo da badge de status
  const badgeStyle = {
    padding: "0.2rem 0.6rem",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: evento.status === "Aberto" ? "#5cb85c" : "#d9534f",
    marginLeft: "0.5rem",
  };

  return (
    <article
      className="card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "1rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#",
        fontFamily: "Bookman, URW Bookman L, serif"

      }}
    >
      <div>
        {/* Título e status */}
        <h3>
          {evento.titulo}
          {evento.status && <span style={badgeStyle}>{evento.status}</span>}
        </h3>

        {/* Data e local */}
        <p className="muted">
          {evento.data} • {evento.local}
        </p>

        {/* Link para página de detalhe */}
        <Link
          to={`/evento/${evento.id}`}
          className="btn info"
          style={{
            marginTop: "0.5rem",
            display: "inline-block",
            textDecoration: "none",
            padding: "0.4rem 0.8rem",
            backgroundColor: "#0275d8",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          Ver Detalhes
        </Link>
      </div>

      {/* Botões Editar e Remover */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          type="button"
          className="btn warning"
          onClick={handleEditar}
          style={{
            padding: "0.4rem 0.8rem",
            backgroundColor: "#f0ad4e",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          Editar
        </button>

        <button
          type="button"
          className="btn danger"
          onClick={() => onRemover(evento.id)}
          style={{
            padding: "0.4rem 0.8rem",
            backgroundColor: "#d9534f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          Remover
        </button>
      </div>
    </article>
  );
}