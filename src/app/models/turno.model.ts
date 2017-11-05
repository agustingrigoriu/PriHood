export interface Turno {
  id: number;
  nombre: string;
  horaDesde: string;
  duracion: number;
  costo: number;
  id_amenity: number;
  id_dia_semana: number;
  start?: string;
  end?: string;
  horario_comienza?: any;
  horario_fin?: any;
}
