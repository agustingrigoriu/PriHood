import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { ComentarioEvento } from '../../../app/models/comentarioEvento.model';
import { EventosService } from '../eventos.service';

@Component({
  selector: 'detalleEvento',
  templateUrl: 'detalleEvento.html'
})

export class DetalleEventoPage {
  @ViewChild(Content) content: Content;

  public evento;
  public comentarios: ComentarioEvento[];
  private comentario: ComentarioEvento = {
    texto: '',
    fecha: new Date()
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public EventosService: EventosService,
    public loadingController: LoadingController) {
    this.evento = navParams.get("evento");
  }

  volver() {
    this.navCtrl.pop();
  }

  actualizar() {
    const loading = this.loadingController.create();
    loading.present();
    this.EventosService.getComentarios(this.evento.id_evento).then(response => {
      if (response.error) {
        this.alertaError();
      } else {
        this.comentarios = response.data;
      }
      loading.dismiss();
    });
  }

  alertaError() {
    const alertMessage = this.alertCtrl.create({
      title: 'Error',
      message: 'Problemas de conexión. Intente nuevamente',
      buttons: ['Ok']
    });
    alertMessage.present();
  }

  async comentar(comentario: ComentarioEvento) {
    try {
      const response = await this.EventosService.comentar(this.evento.id_evento, comentario);
      if (response.error) throw 'error';

      this.limpiarComentario();
      this.presentToast('Su comentario ha sido registrado.');
      await this.actualizar();
      this.scrollBottom();
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Comentario no registrado',
        message: 'No es posible registrar su comentario',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

  scrollBottom() {
    setTimeout(() => this.content.scrollToBottom(300), 300);
  }

  limpiarComentario() {
    this.comentario.texto = '';
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }


  ionViewWillEnter() {
    this.actualizar();
  }

}