import { PublicacaoModel } from "../models/PublicacaoModel";
import { PublicacaoResponse } from "../models/PublicacaoResponse";

const apiUrl = "https://anviapi.azurewebsites.net/v1/api/"

export const addPublicacao = async (publicacao: PublicacaoModel)=> {
    try {
        const response = await fetch(apiUrl + 'publicacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(publicacao)
        });
        if (!response.ok) {
            const errorResponse = await response.text();
            throw new Error(errorResponse || 'Erro ao publicar denuncia');
        }
        return true;
    } catch (error) {
        throw error; // Propaga o erro para ser tratado pelo componente que chamou a função
    }
}

export const getPublicacoesByUserId = async (userId: number): Promise<PublicacaoResponse[]> => {
    try {
        const response = await fetch(`${apiUrl}publicacao/usuario/${userId}`);
        if (!response.ok) {
            const errorResponse = await response.text();
            throw new Error(errorResponse || 'Erro ao buscar publicações');
        }
        const data: PublicacaoResponse[] = await response.json();
        return data;
    } catch (error) {
        console.error('Erro no fetching de publicacao by userId:', error);
        throw error;
    }
};

export const getPublicacoesByMunicipioId = async (municipioId: number): Promise<PublicacaoResponse[]> => {
    try {
        const response = await fetch(`${apiUrl}publicacao/municipio/${municipioId}`);
        if (!response.ok) {
            const errorResponse = await response.text();
            throw new Error(errorResponse || 'Erro ao buscar publicações');
        }
        const data: PublicacaoResponse[] = await response.json();
        return data;
    } catch (error) {
        console.error('Erro no fetching de publicacao by munipioId:', error);
        throw error;
    }
};

export const alterarStatus = async (publicacaoId: number, status: number) => {
    try {
        const response = await fetch(apiUrl + 'publicacao/alterarStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: publicacaoId, status: status})
        });
        if (!response.ok) {
            throw new Error("Erro ao alterar status da publicação.");
        }
        return true;
    } catch (error) {
        throw error;
    }
}
