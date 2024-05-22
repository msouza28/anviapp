import { UsuarioCadastro } from "../models/UsuarioCadastro";
import { UsuarioRequest } from "../models/UsuarioRequest";


const apiUrl = "https://anviapi.azurewebsites.net/v1/api/"

export const authUsuario = async(email: string, senha: string) => {
    try{
        const response = await fetch(apiUrl + 'usuario/autenticacaoUsuario',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });
        if (!response.ok) {
            throw new Error("Não há usuário com esse email ou senha.");
        }
        const usuarioId = await response.text();
        return usuarioId;
    } catch (error) {
        throw error; // Propaga o erro para ser tratado pelo componente que chamou a função
    }
}

export const cadastrarUsuario = async (usuario: UsuarioCadastro)=> {
    try {
        const response = await fetch(apiUrl + 'usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        if (!response.ok) {
            const errorResponse = await response.text();
            throw new Error(errorResponse || 'Erro ao cadastrar usuário');
        }
        return true;
    } catch (error) {
        throw error; // Propaga o erro para ser tratado pelo componente que chamou a função
    }
}

export const alterarSenha = async(email: string, senha: string) => {
    try{
        const response = await fetch(apiUrl + 'usuario/alterarSenha',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, senha: senha })
        });
        if (!response.ok) {
            throw new Error("Erro ao redefinir senha. Não há usuário com esse email.");
        }
        return true;
    } catch (error) {
        throw error; // Propaga o erro para ser tratado pelo componente que chamou a função
    }
}

export const hasGoogleId = async(idGoogle: string) => {
    try{
        const response = await fetch(apiUrl + 'usuario/hasIdGoogle',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(idGoogle)
        });
        if (!response.ok) {
            throw new Error("Erro ao verificar o ID do Google.");
        }
        const result = await response.text();
        return result;
    } catch (error) {
        return null; // Propaga o erro para ser tratado pelo componente que chamou a função
    }
}

export const hasEmailAndIdGoogle = async(email: string) => {
    try{
        const response = await fetch(apiUrl + 'usuario/hasEmailAndIdgoogle',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        return error; // Propaga o erro para ser tratado pelo componente que chamou a função
    }
}

export const getUsuarioById = async (id: number): Promise<UsuarioRequest> => {
    try {
        const response = await fetch(apiUrl + `usuario/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorResponse = await response.text();
            throw new Error(errorResponse || 'Erro ao obter usuário');
        }
        const usuario: UsuarioRequest = await response.json();
        return usuario;
    } catch (error) {
        throw error; // Propaga o erro para ser tratado pelo componente que chamou a função
    }
};

export const storeUsuario = (usuario: UsuarioRequest) => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
};

// Função para recuperar dados do usuário do localStorage
export const getStoredUsuario = (): UsuarioRequest | null => {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
        return JSON.parse(usuarioString);
    }
    return null;
};