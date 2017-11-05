import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FotosService } from '../../services/fotos.service';

@Component({
  selector: 'cargar-foto',
  templateUrl: 'cargar-foto.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CargarPerfil),
      multi: true
    }]
})

export class CargarPerfil implements ControlValueAccessor {
  private propagateChange;

  @Input()
  public url = '';

  @Input()
  public size = 150;

  @Input()
  public defaultUrl = 'assets/img/user_avatar.png';

  @Output()
  urlChange: EventEmitter<any> = new EventEmitter();;

  constructor(public fotosApi: FotosService, public loadingController: LoadingController) { }

  getUrl() {
    if (!this.url) return this.defaultUrl;
    return this.url;
  }

  modificarUrl(foto) {
    this.url = foto;
    this.urlChange.emit(this.url);

    if (this.propagateChange) {
      this.propagateChange(this.url);
    }
  }

  async onChangeFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;

    const loading = this.loadingController.create({ content: 'Cargando foto...' });
    loading.present();

    try {
      const response = await this.fotosApi.cargar(files.item(0));

      if (response.error) throw 'error';

      this.modificarUrl(response.data);
    } catch (error) {
      this.modificarUrl(null);
      alert('error');
      console.log(error);
    } finally {
      loading.dismiss();
    }
  }

  writeValue(obj: any): void {
    this.url = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}