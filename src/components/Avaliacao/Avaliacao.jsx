import React, { useEffect, useState } from "react";
import { Box, Rating, Button } from "@mui/material";
import { toast } from "react-hot-toast";
import "./Avaliacao.css";
import { auth } from "../../firebase/config";
import { atualizarCurso, getCursoById, updateCurso } from "../../firebase/cursos";
import { useParams } from "react-router-dom";
import { getUsuario } from "../../firebase/usuarios";

export const Avaliacao = ({ curso }) => {
  const { idCurso } = useParams();

  const [valor, setValor] = useState(0);
  const [hover, setHover] = useState(-1);
  const [uidUsuario, setUidUsuario] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUidUsuario(user.uid);
        setNomeUsuario(user.displayName);
      } else {
        setUidUsuario("");
        setNomeUsuario("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
      getCursoById(idCurso).then(curso => {
        const { avaliacoes } = curso
        if (avaliacoes) {
          const avaliacaoDoUsuarioLogado = avaliacoes.filter(avaliacao => avaliacao.usuario.id === uidUsuario)
          if (avaliacaoDoUsuarioLogado) {
            setValor(avaliacaoDoUsuarioLogado[0].nota)
          }
        }
      })
  }, [uidUsuario])

  const handleRatingChange = (event, newValue) => {
    setValor(newValue);
  };

  const handleSubmit = () => {
    const dadosDoDocumento = {
      usuario: {
        id: uidUsuario,
        nome: nomeUsuario,
      },
      nota: valor,
    };

    getCursoById(curso.id).then((resultado) => {
      const avaliacoes = resultado.avaliacoes || [];
      let avaliacaoExistente = false;

      // Verificar se o usuário já possui uma avaliação
      avaliacoes.forEach((element, index) => {
        if (element.usuario.id === uidUsuario) {
          avaliacoes[index] = dadosDoDocumento; // Atualizar a avaliação existente
          avaliacaoExistente = true;
        }
      });

      // Se o usuário não possui uma avaliação, adicionar uma nova
      if (!avaliacaoExistente) {
        avaliacoes.push(dadosDoDocumento);
      }

      // Atualizar o documento do curso com as avaliações
      atualizarCurso(curso.id, { avaliacoes })
        .then(() => {
          toast.success("Uma avaliação foi adicionada", {
            position: "bottom-right",
            duration: 3000,
          });
        })
        .catch((erro) => {
          toast.error(`Um erro aconteceu: ${erro}`);
        });
    });
  };

  return (
    <div className="star">
      <Box
        sx={{
          width: "200px",
          display: "flex",
          alignItems: "center",
          position: "relative", // Adiciona a posição relativa
        }}
      >
        <Rating
          name="avaliacao"
          value={valor}
          precision={1}
          onChange={handleRatingChange}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {hover !== -1 && (
          <Box
            component="span"
            sx={{
              position: "absolute",
              left: "50%",
              bottom: "-25px",
              transform: "translateX(-50%)",
              bgcolor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "5px 8px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {hover}
          </Box>
        )}
        <br />
        <Button
          className="butAva"
          onClick={handleSubmit}
          style={{ backgroundColor: "#A68A56", color: "white" }}
        >
          Enviar
        </Button>
      </Box>
    </div>
  );
};