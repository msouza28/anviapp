import { MunicipioModel } from "../models/MunicipioModel";


const apiUrl = "https://anviapi.azurewebsites.net/v1/api/"

export const getAllMunicipios = async (): Promise<MunicipioModel[]> => {
    try {
        const response = await fetch(apiUrl + 'municipio', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            const errorResponse = await response.text();
            throw new Error(errorResponse || 'Erro ao buscar por municipios');
        }
        const municipios = await response.json();
        return municipios;
    } catch (error) {
        throw error; // Propaga o erro para ser tratado pelo componente que chamou a função
    }
}
