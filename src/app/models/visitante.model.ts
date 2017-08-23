export interface Visitante {
  id?: number;
  id_tipo_visita?: number;
  nombre: string;
  apellido: string;
  id_tipo_documento?: number;
  numero_documento?: number;
  patente: string;
  observaciones: string;
  fecha_visita?: Date;
  avatar?: string;
}