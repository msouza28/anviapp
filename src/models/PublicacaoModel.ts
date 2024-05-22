export interface ImagemDto {
    caminhoImg: string;
  }
export interface PublicacaoModel {
    usuarioId: number;
    municipioId: number;
    titulo: string;
    rua: string;
    comentario: string;
    imagensDto: ImagemDto[];
}