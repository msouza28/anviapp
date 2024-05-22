import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import { getPublicacoesByUserId } from "../service/PublicacaoService";
import { PublicacaoResponse } from "../models/PublicacaoResponse";
import { getStoredUsuario } from "../service/UsuarioService";
import ImageModal from "../components/modal/ImageModal";
import { FaSpinner } from "react-icons/fa";
import { MunicipioModel } from "../models/MunicipioModel";
import { getAllMunicipios } from "../service/MunicipioService";


export default function MinhasDenuncias(){

const navigate = useNavigate();
const isLoggedIn =  localStorage.getItem('isLoggedIn') === 'true';
const { userId } = useAuth();
const usuario = getStoredUsuario();
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState<string | null>(null);

if(usuario?.isAgentResolucao){
    navigate("/");
 }
//impede acessos irregulares estando logado
useEffect(() => {
  if (!isLoggedIn && !userId) {
    navigate("/");
  }
}, [isLoggedIn, userId]);
// 
const [cidades, setCidades] = useState<MunicipioModel[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [publicacoes, setPublicacoes] = useState<PublicacaoResponse[]>([]);
const usuarioId = parseInt(localStorage.getItem('usuarioId') || '0');

useEffect(() => {
  const fetchPublicacoes = async () => {
    try {
      setIsLoading(true); // Inicia o loading
      const data = await getPublicacoesByUserId(usuarioId);
      setPublicacoes(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false); // Termina o loading
    }
  };

  fetchPublicacoes();
}, [usuarioId]);

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

const getMunicipioNome = (municipioId: number) => {
  const municipio = cidades.find(cidade => cidade.id === municipioId);
  return municipio ? municipio.nome : 'Desconhecido';
};

const handleImageClick = (imageUrl: string) => {
  setSelectedImage(imageUrl);
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedImage(null);
};
return (
  <>
    <Navbar fixed={false} isCriadoresPage={false} />
    <div className="flex justify-center items-center mt-10 p-6">
      <div className="flex flex-col w-full max-w-2xl space-y-7">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-whiteCustom text-4xl" />
          </div>
        ) : publicacoes.length === 0 ? (
          <div className="flex justify-center items-center text-whitePholder text-2xl">
            <p>Você não realizou nenhuma denuncia. <Link
              to="/denunciar"
              className="text-whiteCustom self-start text-2xl hover:underline"
            >
              Denuncie!
            </Link></p>
          </div>
        ) : (
          publicacoes.map((publication) => (
            <div key={publication.id} className="flex flex-col text-whiteCustom border rounded border-whitePholder p-3 space-y-3">
              <div className="flex justify-between border-b-2 pb-1">
                <span>Data: {publication.dataPubli}</span>
                <span>{getMunicipioNome(publication.municipioId)} </span>
                <span className={`border rounded px-1 ${publication.status === 1 ? 'bg-red-200 text-black' : 'bg-green-200 text-black'}`}>
                  {publication.status === 1 ? 'Pendente' : 'Resolvido'}
                </span>
              </div>
              <h1 className="uppercase text-lg font-bold">{publication.titulo}</h1>
              <p>{publication.comentario}</p>
              <div className="flex flex-wrap border border-whiteCustom rounded">
                {publication.imagens?.map((imagem, index) => (
                  <img
                    key={index}
                    src={imagem.caminhoImg}
                    alt="imagem da denuncia"
                    className="w-28 h-28 object-cover m-1 cursor-pointer"
                    onClick={() => handleImageClick(imagem.caminhoImg)} />
                ))}
              </div>
              <span className="">{publication.rua}</span>
            </div>
          ))
        )}
      </div>
    </div>
    <ImageModal isOpen={isModalOpen} onClose={handleCloseModal} imageUrl={selectedImage || ''} />
  </>
);
}


