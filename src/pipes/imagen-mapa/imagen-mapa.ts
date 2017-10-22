import { Pipe, PipeTransform } from '@angular/core';

import { Trayecto } from '../../app/models/trayecto.model';

@Pipe({
  name: 'imagenMapa',
})
export class ImagenMapaPipe implements PipeTransform {
  transform(trayectos: Trayecto[], ...args) {
    const mapa = 'https://maps.googleapis.com/maps/api/staticmap';
    const params = ['size=400x250', 'sensor=false', 'key=AIzaSyAAMmwIYbNte2GOoB1vYoAK5Sz5oPpZ6JA'];
    const path = [];

    const origen = trayectos[0];
    const destino = trayectos[trayectos.length - 1];

    for (let trayecto of trayectos) {
      path.push(`${trayecto.latitud},${trayecto.longitud}`);
    }

    params.push(`path=${encodeURIComponent(path.join('|'))}`);

    params.push(`markers=label:A|color:red|${origen.latitud},${origen.longitud}`);
    params.push(`markers=label:B|color:green|${destino.latitud},${destino.longitud}`);

    return `${mapa}?${params.join('&')}`;
  }
}
