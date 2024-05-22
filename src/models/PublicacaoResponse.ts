export interface ImagemDto {
    id:number
    caminhoImg: string;
  }

export interface PublicacaoResponse{
    id:number;
    usuarioId: number;
    municipioId: number;
    titulo: string;
    rua: string;
    comentario: string;
    status:number;
    dataPubli:string;
    imagens: ImagemDto[];
}