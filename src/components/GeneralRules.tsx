import React from 'react';
import { toast } from 'react-hot-toast';

const RegrasGerais: React.FC = () => {
  const chavePix = "05782096160";
  const endereco = "72631211, Quadra 406 conjunto K casa 01, Recanto das Emas, Brasilia-DF";

  const copiarTexto = (texto: string): void => {
    navigator.clipboard.writeText(texto);
    toast.success(`${texto} copiado para a área de transferência!`);
  };

  return (
    <div className="bg-white rounded mt-3 mb-3 w-100 p-3">
      <b>Regras Gerais:</b>
      <div style={{ marginTop: '10px', lineHeight: '1.5', fontSize: '16px' }}>
        <p>
          <b>1. Se escolher, é seu compromisso:</b> Ao marcar que vai presentear, contamos com você para adquirir o item. Caso não possa, avise os noivos para que o item volte à lista.
        </p>
        <p>
          <b>2. Seja fiel ao escolhido:</b> Tente comprar o modelo e especificações do presente selecionado. Se não encontrar, fale com os noivos para decidir outra opção.
        </p>
        <p>
          <b>3. Quer dar PIX?</b> Use nossa chave PIX (CPF):{" "}
          <span
            onClick={() => copiarTexto(chavePix)}
            style={{ textDecoration: "underline", cursor: "pointer", fontWeight: "bold" }}
          >
            {chavePix}
          </span>
          . Nome: <b>Guilherme Felipe de Lima</b>.
        </p>
        <p>
          <b>4. Envio dos presentes:</b> Se quiser enviar direto para nós, use o endereço abaixo:<br />
          <span
            onClick={() => copiarTexto(endereco)}
            style={{ textDecoration: "underline", cursor: "pointer", fontWeight: "bold" }}
          >
            {endereco}
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default RegrasGerais;
