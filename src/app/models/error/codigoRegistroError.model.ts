export class CodigoRegistroError {
  title: string;
  message: string;

  constructor() {
    this.title = 'Código invalido';
    this.message = 'El código introducido no existe, inténtalo nuevamente o comunicate con el administrador de tu barrio.';
  }

}
