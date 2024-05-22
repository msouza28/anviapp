import { useEffect, useState } from "react";
import { cadastrarUsuario } from "../service/UsuarioService";
import { useNavigate } from "react-router-dom";
import { UsuarioCadastro } from "../models/UsuarioCadastro";
import Navbar from "../components/Navbar";
import { useAuth } from "@clerk/clerk-react";
import InputMask from 'react-input-mask'

export default function Cadastro(){
    
    const navigate = useNavigate();

    const { userId } = useAuth();
    const isLoggedIn =  localStorage.getItem('isLoggedIn') === 'true';
//impede acessos irregulares estando logado
    useEffect(() => {
      if (isLoggedIn || userId) {
        navigate("/denunciar");
      }
    }, [isLoggedIn, userId]);
// 

//Implementacao do cadastro com a base de dados
    const [formData, setFormData] = useState<UsuarioCadastro>({
        idGoogle: '',
        nomeCompleto: '',
        cpf: '',
        cnpj: '',
        email: '',
        senha: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            await cadastrarUsuario(formData);
            alert('Usuário cadastrado com sucesso!');
            navigate("/login")
        } catch (error) {
            alert(error);
        }
    };
//
    const [isEmpresa, setIsEmpresa] = useState(false);
    const handleEmpresaClick = () => {
        setIsEmpresa(!isEmpresa);
        setFormData(prevState => ({
            ...prevState,
            cpf: '',
            cnpj: ''
        }));
    };
    return (
      <>
        <Navbar fixed={false} />
        <div className="flex justify-center items-center mt-20">
          <form
            className="flex flex-col w-11/12 text-base sm:max-w-2xl sm:text-base space-y-10 "
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <label
                htmlFor="nomeCompleto"
                className="text-whiteCustom text-lg"
              >
               {isEmpresa ? "Nome Fantasia" : "Nome Completo"}
              </label>
              <input
                required
                type="text"
                name="nomeCompleto"
                placeholder={
                  isEmpresa ? "Prefeitura de São Paulo" : "José de Souza"
                }
                className="bg-bgCustom text-center w-full text-whiteCustom  placeholder-whitePholder::placeholder focus:border-transparent focus:outline-none"
                value={formData.nomeCompleto}
                onChange={handleChange}
              />
              <span className="absolute left-0 bottom-0 w-full h-0.5 mt-1 -mb-2 bg-whiteCustom"></span>
            </div>
            <div className="relative">
              <label
                htmlFor={isEmpresa ? "cnpj" : "cpf"}
                className="text-whiteCustom text-lg"
              >
                {isEmpresa ? "CNPJ" : "CPF"}
              </label>
              <InputMask
                required
                mask={isEmpresa ? "99.999.999/9999-99" : "999.999.999-99"}
                maskChar={null}
                name={isEmpresa ? "cnpj" : "cpf"}
                placeholder={
                  isEmpresa ? "00.000.000/0000-00" : "000.000.000-00"
                }
                className="bg-bgCustom text-center w-full text-whiteCustom placeholder-whitePholder::placeholder focus:border-transparent focus:outline-none"
                value={isEmpresa ? formData.cnpj : formData.cpf}
                onChange={handleChange}
              />
              <span className="absolute left-0 bottom-0 w-full h-0.5 mt-1 -mb-2 bg-whiteCustom"></span>
            </div>
            <div className="relative">
              <label htmlFor="email" className="text-whiteCustom text-lg">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="exemplo@gmail.com"
                className="bg-bgCustom text-center w-full text-whiteCustom placeholder-whitePholder::placeholder focus:border-transparent focus:outline-none"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="absolute left-0 bottom-0 w-full h-0.5 mt-1 -mb-2 bg-whiteCustom"></span>
            </div>
            <div className="relative">
              <label htmlFor="senha" className="text-whiteCustom text-lg">
                Senha
              </label>
              <input
                required
                type="password"
                name="senha"
                placeholder="Digite uma senha"
                className="bg-bgCustom text-center w-full text-whiteCustom placeholder-whitePholder::placeholder focus:border-transparent focus:outline-none"
                value={formData.senha}
                onChange={handleChange}
              />
              <span className="absolute left-0 bottom-0 w-full h-0.5 mt-1 -mb-2 bg-whiteCustom"></span>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleEmpresaClick}
                className="underline text-start text-whiteCustom text-sm font-light w-1/2 sm:text-base sm:w-full"
              >
                {!isEmpresa
                  ? " Sou empresa responsável pela resolução!"
                  : "Criar conta apenas para denúncias."}
              </button>
              <button
                type="submit"
                className="self-end py-1 px-3 border rounded text-whiteCustom text-2xl hover:underline hover:bg-slate-700"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </>
    );
}