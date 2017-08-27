export interface Proveedor {
  id?: number;
  nombre: string;
  descripcion: string;
  telefono: string;
  id_tipo_servicio: number;
  id_residente_recomienda: number;
  cantidad_votos: number;
  rating_total: number;
}
