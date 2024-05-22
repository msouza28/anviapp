import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { ImagemDto, PublicacaoModel } from "../models/PublicacaoModel";
import { addPublicacao } from "../service/PublicacaoService";
import { CiCamera } from "react-icons/ci";
import { getAllMunicipios } from "../service/MunicipioService";
import { MunicipioModel } from "../models/MunicipioModel";
import { getStoredUsuario } from "../service/UsuarioService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";

export default function Publicacao() {
  const usuarioId = localStorage.getItem("usuarioId");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const { userId } = useAuth();
  const usuario = getStoredUsuario();

  if (usuario?.isAgentResolucao) {
    navigate("/");
  }

  // Impede acessos irregulares estando logado
  useEffect(() => {
    if (!isLoggedIn && !userId) {
      navigate("/");
    }
  }, [isLoggedIn, userId]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Busca pelos municípios no backend
  const [cidades, setCidades] = useState<MunicipioModel[]>([]);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const municipios = await getAllMunicipios();
        setCidades(municipios);
      } catch (error) {
        console.error("Erro ao buscar municípios:", error);
      }
    };
    fetchMunicipios();
  }, []);

  // Controle do estado do select de cidades
  const [cidadeSelecionada, setCidadeSelecionada] = useState(""); // Estado para armazenar a cidade selecionada

  const handleCidadeChange = (event: React.ChangeEvent<HTMLSelectElement>, setFieldValue: any) => {
    const cidadeSelecionada = event.target.value;
    const municipioId = cidades.find((cidade) => cidade.nome === cidadeSelecionada)?.id || 0; // Encontra o município pelo nome e obtém o ID
    setCidadeSelecionada(cidadeSelecionada);
    setFieldValue("municipioId", municipioId);
  };

  // Função para converter arquivos em base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Schema de validação
  const validationSchema = Yup.object().shape({
    municipioId: Yup.number().required("Selecione uma cidade."),
    titulo: Yup.string().required("Digite um título para a publicação."),
    rua: Yup.string().required("Digite o endereço."),
    comentario: Yup.string().required("Digite um comentário."),
    imagensDto: Yup.array().min(1, "Adicione pelo menos uma imagem").max(3, "É permitido no máximo 3 fotos."),
  });

  // Função para lidar com o submit do formulário
  const handleSubmit = async (values: PublicacaoModel, { setSubmitting, resetForm }: any) => {
    try {
      values.usuarioId = Number(usuarioId);
      await addPublicacao(values);

      alert("Publicação da denúncia realizada com sucesso!");
      resetForm();
      setCidadeSelecionada("");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Resetar o input de arquivos
      }
      navigate("/minhasDenuncias");
    } catch (error) {
      alert(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar fixed={false} isCriadoresPage={false} />
      <div className="flex justify-center items-center mt-6 px-4 md:px-0">
        <Formik
          initialValues={{
            usuarioId: Number(usuarioId),
            municipioId: 0,
            titulo: "",
            rua: "",
            comentario: "",
            imagensDto: [] as ImagemDto[],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className=" w-full max-w-2xl space-y-5 mb-5">
              <div className="relative">
                <Field
                  as="select"
                  id="cidade"
                  name="municipioId"
                  value={cidadeSelecionada}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    handleCidadeChange(event, setFieldValue)
                  }
                  className="bg-bgCustom text-center w-full text-whiteCustom border rounded p-2"
                >
                  <option value="">Escolha a cidade</option>
                  {cidades.map((cidade, index) => (
                    <option key={index} value={cidade.nome}>
                      {cidade.nome}
                    </option>
                  ))}
                </Field>
              </div>
              <ErrorMessage name="municipioId" component="div" className="text-red-500 text-xs mt-1" />
              <div className="relative">
                <div className="flex flex-col md:flex-row">
                  <label htmlFor="titulo" className="text-whiteCustom text-start text-lg md:mr-2">
                    Título:
                  </label>
                  <Field
                    type="text"
                    name="titulo"
                    placeholder="Dê um título para sua denúncia."
                    className="bg-bgCustom w-full text-whiteCustom placeholder-whitePholder::placeholder focus:border-transparent focus:outline-none"
                  />
                </div>
                <span className="absolute left-0 bottom-0 w-full h-0.5 mt-1 bg-whiteCustom"></span>
              </div>
              <ErrorMessage name="titulo" component="span" className="text-red-500 text-xs" />
              <div className="relative">
                <div className="flex flex-col text-start md:flex-row">
                  <label htmlFor="rua" className="text-whiteCustom text-lg md:mr-2">
                    Endereço:
                  </label>
                  <Field
                    type="text"
                    name="rua"
                    placeholder="Rua Azevedo de Carvalho, 110"
                    className="bg-bgCustom w-full text-whiteCustom placeholder-whitePholder::placeholder focus:border-transparent focus:outline-none"
                  />
                </div>
                <span className="absolute left-0 bottom-0 w-full h-0.5 mt-1  bg-whiteCustom"></span>
              </div>
              <ErrorMessage name="rua" component="span" className="text-red-500 text-xs" />
              <div className="relative">
                <label htmlFor="comentario" className="text-whiteCustom text-lg">
                  Comentário:
                </label>
                <Field
                  as="textarea"
                  name="comentario"
                  placeholder="Escreva o que está acontecendo..."
                  className="bg-bgCustom border rounded px-2 border-whiteCustom w-full text-whiteCustom focus:outline-none"
                />
                <ErrorMessage name="comentario" component="span" className="text-red-500 text-xs " />
              </div>
              <div className="relative">
                <label htmlFor="imagens" className="text-whiteCustom text-lg">
                  Imagens do ocorrido:
                </label>
                <div className="flex flex-wrap border border-whiteCustom rounded p-2">
                  {values.imagensDto.length > 0 ? (
                    values.imagensDto.map((imagemDto, index) => (
                      <img
                        key={index}
                        src={imagemDto.caminhoImg}
                        alt={`Imagem ${index}`}
                        className="w-28 h-28 object-cover m-1"
                      />
                    ))
                  ) : (
                    <CiCamera className="w-28 h-28 m-1 text-whiteCustom" />
                  )}
                </div>
                <input
                  type="file"
                  id="imagens"
                  ref={fileInputRef}
                  onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                    const files = Array.from(event.target.files || []);
                    const imagensDtoPromises = files.map((file) => fileToBase64(file).then((base64) => ({ caminhoImg: base64 })));
                    const imagensDto = await Promise.all(imagensDtoPromises);
                    setFieldValue("imagensDto", imagensDto);
                  }}
                  multiple
                  className="bg-bgCustom text-center w-full text-whiteCustom placeholder-whitePholder::placeholder focus:border-transparent focus:outline-none"
                />
                <ErrorMessage name="imagensDto" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="flex justify-end">
              <button
                type="submit"
                className="py-1 px-3 border rounded text-whiteCustom text-2xl hover:underline hover:bg-slate-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? <FaSpinner className="animate-spin mr-2" /> : 'Denunciar'}
              </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
