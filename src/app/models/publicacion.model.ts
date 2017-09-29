export interface Publicacion {
  id?: number;
  titulo?: string,
  texto: string,
  fecha: Date,
  perfil?: string
  set_by_me?: boolean
}