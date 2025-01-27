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
      <b>Regrinhas Gerais:</b>
      <div style={{ marginTop: '10px', lineHeight: '1.5', fontSize: '16px' }}>
        <p>
          <b>1. Escolheu, é de coração!</b> Ao marcar um presente na lista, estamos contando com você para trazer esse pedacinho de amor para nossa nova vida. Caso algo aconteça e você não consiga, avise a gente para que o item volte à lista, combinado?
        </p>
        <p>
          <b>2. Mantenha o charme!</b> Tentamos escolher cada presente com carinho, então, se possível, opte pelo modelo e especificações que marcamos. Não achou igualzinho? Não tem problema, fale com a gente! Vamos adorar decidir juntos outra opção.
        </p>
        <p>
          <b>3. Prefere nos presentear com PIX?</b> Use nossa chave PIX: 
          <span
            onClick={() => copiarTexto(chavePix)}
            style={{ textDecoration: "underline", cursor: "pointer", fontWeight: "bold" }}
          >
            {chavePix}
          </span> 
          (Nome: <b>Guilherme Felipe de Lima</b>). Assim, você nos ajuda de forma prática e direta a construir nosso lar doce lar!
        </p>
        <p>
          <b>4. Quer enviar o presente?</b> Ficaremos super felizes! Você pode mandar direto para o seguinte endereço:<br />
          <span
            onClick={() => copiarTexto(endereco)}
            style={{ textDecoration: "underline", cursor: "pointer", fontWeight: "bold" }}
          >
            {endereco}
          </span>.
        </p>
      </div>
      <p style={{ marginTop: '10px', fontSize: '16px' }}>
        Muito obrigada por fazer parte desse momento tão especial. Sua presença é o nosso maior presente! 💕
      </p>
    </div>
  );
};

export default RegrasGerais;
