export interface UsuarioRequest {
    id: string;
    nomeCompleto: string;
    email: string;
    dataCadastro:string;
    isAgentResolucao: boolean,
    isAdm: boolean
}