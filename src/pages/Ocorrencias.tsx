import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import { alterarStatus, getPublicacoesByMunicipioId } from "../service/PublicacaoService";
import { PublicacaoResponse } from "../models/PublicacaoResponse";
import { getStoredUsuario } from "../service/UsuarioService";
import { MunicipioModel } from "../models/MunicipioModel";
import { getAllMunicipios } from "../service/MunicipioService";



export default function Ocorrencias(){

const navigate = useNavigate();
const isLoggedIn =  localStorage.getItem('isLoggedIn') === 'true';
const { userId } = useAuth();
const usuario = getStoredUsuario();

if(!usuario?.isAgentResolucao){
    navigate("/");
 }
//impede acessos irregulares estando logado
useEffect(() => {
  if (!isLoggedIn && !userId) {
    navigate("/");
  }
}, [isLoggedIn, userId]);
// 

// Controle do estado do select de cidades
const [cidadeSelecionada, setCidadeSelecionada] = useState<number | null>(null); // Estado para armazenar a cidade selecionada
const handleCidadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const municipioId = event.target.value ? parseInt(event.target.value) : null;
  setCidadeSelecionada(municipioId);
};

// busca pelos municipios no backend
const [cidades, setCidades] = useState<MunicipioModel[]>([]);

useEffect(() => {
  const fetchMunicipios = async () => {
      try {
          const municipios = await getAllMunicipios();
          setCidades(municipios);
      } catch (error) {
          console.error('Erro ao buscar municípios:', error);
      }
  };
  fetchMunicipios();
}, []);
//

const [publicacoes, setPublicacoes] = useState<PublicacaoResponse[]>([]);

  const fetchPublicacoes = async () => {
    try {
      if (cidadeSelecionada !== null) {
        const data = await getPublicacoesByMunicipioId(cidadeSelecionada);
        setPublicacoes(data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchPublicacoes();
  }, [cidadeSelecionada]);

  // Manipulador de clique para o botão "Solucionar"
  const handleSolucionarClick = async (publicacaoId: number) => {
    try {
      await alterarStatus(publicacaoId, 0); // Altera o status para 0 (Resolvido)
      // Recarrega a lista de publicações
      fetchPublicacoes();
    } catch (error) {
      alert("Erro ao alterar status da publicação.");
    }
  };

return (
  <>
    <Navbar fixed={false} />
    <div className="flex flex-col justify-center items-center mt-3 p-6 space-y-6">
      <div className="relative">
        <select
          id="cidade"
          value={cidadeSelecionada || ""}
          onChange={handleCidadeChange}
          className="bg-bgCustom text-center w-full text-whiteCustom border rounded p-2"
        >
          <option value="">Escolha a cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.id}>
              {cidade.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full max-w-2xl space-y-7">
        {publicacoes.length === 0 ? (
          <div className="flex justify-center items-center text-whitePholder text-2xl">
            <p>
             Não há ocorrencias para essa cidade.
            </p>
          </div>
        ) : (
          publicacoes.map((publication) => (
            <div
              key={publication.id}
              className="flex flex-col text-whiteCustom border rounded border-whitePholder p-3 space-y-3"
            >
              <div className="flex justify-between">
                <span>Data: {publication.dataPubli}</span>
                <span
                  className={`border rounded px-1 ${
                    publication.status === 1
                      ? "bg-red-200 text-black"
                      : "bg-green-200 text-black"
                  }`}
                >
                  {publication.status === 1 ? "Pendente" : "Resolvido"}
                </span>
              </div>
              <h1 className="uppercase text-lg font-bold">
                {publication.titulo}
              </h1>
              <p>{publication.comentario}</p>
              <div className="flex flex-wrap border border-whiteCustom rounded">
                {publication.imagens?.map((imagem, index) => (
                  <img
                    key={index}
                    src={imagem.caminhoImg}
                    alt="imagem da denuncia"
                    className="w-28 h-28 object-cover m-1"
                  />
                ))}
              </div>
              {publication.status === 1 && (
              <button type="button" 
              className="self-end py-1 px-3 border rounded text-whiteCustom text-base hover:underline hover:bg-green-700 " 
              onClick={() => handleSolucionarClick(publication.id)}
              >
                Solucionar
              </button>
            )}
            </div>
          ))
        )}
      </div>
    </div>
  </>
);
}



