export interface Expensa {
  id_expensas?: number,
  fecha_transaccion: Date,
  fecha_vencimiento: Date,
  id_residencia: number,
  monto: number,
  observaciones: string,
  pagado: boolean,
  url_expensa: string,
}
