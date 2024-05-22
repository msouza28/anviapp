import { useState } from "react";
import { alterarSenha } from "../../service/UsuarioService";

interface ForgotPassModalProps {
    open: boolean;
    onClose: () => void;
  }

  export default function ForgotPassModal({ open, onClose }: ForgotPassModalProps) {

    const [nSenha, setNSenha] = useState({
        email: "",
        senha: ""
      });

      const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setNSenha((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleClose = () => {
        setNSenha((prevState) => ({
            ...prevState,
            email: "",
            senha: ""
          })); // Redefinir o estado da senha para vazio ao fechar o modal
        onClose();
      };
      
      const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
    
        try {

            await alterarSenha(nSenha.email, nSenha.senha);
            alert("Senha redefinida com sucesso!");
            handleClose();
        } catch (error) {
          alert(error);
          // caso de erro pega o estado do setFormLogin mantem tudos os estados e altera o email e senha
          setNSenha((prevState) => ({
            ...prevState,
            senha: "",
          }));
          //
        }
      };

      
   
    return (
      <div onClick={handleClose} 
      className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
      >
        <div onClick={(e) => e.stopPropagation()} 
        className={`bg-bgCustom rounded-xl shadow p-6 transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        >
          <button onClick={handleClose} className="absolute top-2 right-2 p-1 rounded-lg text-whiteCustom hover:underline">Fechar</button>
          <p className="text-whiteCustom ml-7 text-lg uppercase">Redefinição de senha</p>
          <div className="w-50 my-8 mx-5 sm:w-96 sm:m-8">
          <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative ">
              <label htmlFor="email" className="text-whiteCustom text-lg">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="exemplo@gmail.com"
                value={nSenha.email}
                onChange={handleChange}
                className="bg-bgCustom text-center w-full text-whiteCustom placeholder-whitePholder::placeholder focus:border-transparent focus:outline-none"
              />
              <span className="absolute left-0 bottom-0 w-full h-0.5 mt-1 -mb-2 bg-whiteCustom"></span>
            </div>
            <div className="relative">
              <label htmlFor="senha" className="text-whiteCustom text-lg">Digite a nova senha</label>
              <input
                type="password"
                name="senha"
                placeholder="nova senha"
                value={nSenha.senha}
                onChange={handleChange}
                className="bg-bgCustom text-center w-full text-whiteCustom placeholder-whitePholder::placeholder focus:border-transparent focus:outline-none"
              />
              <span className="absolute left-0 bottom-0 w-full h-0.5 mt-1 -mb-2 bg-whiteCustom"></span>
            </div>
            <button type="submit"className="absolute bottom-1 right-2 left-2 p-1 rounded-lg text-whiteCustom hover:underline">Redefinir</button>
          </form>
          </div>
        </div>
      </div>
    );
  }
  