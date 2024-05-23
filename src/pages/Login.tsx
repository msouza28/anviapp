import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useUser, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { authUsuario, cadastrarUsuario, getStoredUsuario, getUsuarioById, hasEmailAndIdGoogle, hasGoogleId, storeUsuario } from "../service/UsuarioService";
import Navbar from "../components/Navbar";
import ForgotPassModal from "../components/modal/ForgotPassModal";
import { UsuarioCadastro } from "../models/UsuarioCadastro";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const fetchAndStoreUsuario = async (usuarioId: string) => {
    try {
      const usuario = await getUsuarioById(Number(usuarioId));
      storeUsuario(usuario);
      return usuario;
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      return null;
    }
  };

  const { userId, isLoaded } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUsuario = getStoredUsuario();
      if (isLoggedIn || userId) {
        if (storedUsuario?.isAgentResolucao) {
          navigate("/ocorrencias");
        } else {
          navigate("/denunciar");
        }
      }
    };
    checkLoginStatus();
  }, [isLoggedIn, userId, navigate]);

  useEffect(() => {
    const cadastrarUsuarioGoogle = async () => {
      if (isLoaded) {
        if (user && userId) {
          if (!user.fullName || !user.emailAddresses[0].emailAddress) {
            console.error('Nome completo ou endereço de email não encontrados.');
            navigate("/login");
            return;
          }
          try {
            const idUsuarioGoogle = await hasGoogleId(userId);
            if (idUsuarioGoogle === 'False') {
              const usuarioGoogle: UsuarioCadastro = {
                idGoogle: userId,
                nomeCompleto: user.fullName ?? 'noName',
                email: user.emailAddresses[0].emailAddress,
                cpf: "",
                cnpj: "",
                senha: ""
              };
              await cadastrarUsuario(usuarioGoogle);
              const idUsuarioGoogleCadastrado = await hasGoogleId(userId);
              localStorage.setItem("usuarioId", idUsuarioGoogleCadastrado ?? '')
              navigate("/denunciar");
            } else {
              localStorage.setItem("usuarioId", idUsuarioGoogle ?? '')
              localStorage.setItem("isLoggedIn", "false");
              throw new Error;
            }
          } catch (error) {
            console.error("Erro ao cadastrar usuário do Google:", error);
          }
        }
      }
    };

    cadastrarUsuarioGoogle();
  }, [isLoaded, user, userId, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido.').required('Email é obrigatório.'),
    senha: Yup.string().min(5, 'Senha deve ter no mínimo 5 caracteres.').required('Senha é obrigatória.')
  });

  const handleSubmit = async (values: { email: string, senha: string }, { resetForm }: { resetForm: () => void }) => {
    try {
      const emailExists = await hasEmailAndIdGoogle(values.email);
      if (emailExists === true) {
        alert("Esse email já foi cadastrado como uma conta Google.");
        resetForm();
        return;
      }
      const usuarioId = await authUsuario(values.email, values.senha);
      const usuario = await fetchAndStoreUsuario(usuarioId);
      if (!usuario) {
        alert("Erro ao buscar informações do usuário.");
        return;
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("usuarioId", usuarioId);

      if (usuario.isAgentResolucao) {
        navigate("/ocorrencias");
      } else {
        navigate("/denunciar");
      }
    } catch (error) {
      alert("Não há usuário com esse email ou senha.");
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <header>
      <Navbar fixed={false} isCriadoresPage={false} />
      <div className="flex justify-center items-center mt-20 sm:mt-20 px-4">
        <div className="flex flex-col w-full max-w-lg sm:max-w-2xl space-y-6 sm:space-y-10">
          <SignedOut>
            <SignInButton>
              <span className="text-whiteCustom text-lg text-center border rounded-2xl hover:bg-gray-700 cursor-pointer">
                Entrar com a conta Google
              </span>
            </SignInButton>
          </SignedOut>
          <span className="text-whiteCustom text-lg text-center">OU</span>
          <Formik
            initialValues={{ email: '', senha: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6 sm:space-y-10">
                <div className="relative">
                  <label htmlFor="email" className="text-whiteCustom text-lg">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="exemplo@gmail.com"
                    className="bg-bgCustom text-center w-full text-whiteCustom placeholder-whitePholder::placeholder focus:border-transparent focus:outline-none py-2 px-4"
                  />
                  <span className="absolute left-0 bottom-0 w-full h-0.5 mt-1 bg-whiteCustom"></span>
                </div>
                <ErrorMessage name="email" component="span" className="text-red-500 text-sm" />
                <div className="relative">
                  <label htmlFor="senha" className="text-whiteCustom text-lg">Senha</label>
                  <Field
                    type="password"
                    name="senha"
                    placeholder="Digite uma senha"
                    className="bg-bgCustom text-center w-full text-whiteCustom placeholder-whitePholder::placeholder focus:border-transparent focus:outline-none py-2 px-4"
                  />
                  <span className="absolute left-0 bottom-0 w-full h-0.5 mt-1 bg-whiteCustom"></span>
                </div>
                <ErrorMessage name="senha" component="span" className="text-red-500 text-sm text-end" />
                <div className="flex justify-between flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0">
                  <div className="flex flex-col space-y-1">
                    <div
                      onClick={() => setOpen(true)}
                      className="text-whiteCustom text-sm self-start hover:underline cursor-pointer">
                      Esqueceu a senha?
                    </div>
                    <Link
                      to="/cadastro"
                      className="text-whiteCustom text-sm self-start hover:underline"
                    >
                      Crie uma conta.
                    </Link>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="self-end py-1 px-3 border rounded text-whiteCustom text-2xl hover:underline hover:bg-slate-700"
                  >
                   {isSubmitting ? <FaSpinner className="animate-spin mr-2" /> : 'Entrar'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ForgotPassModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
};

export default Login;
