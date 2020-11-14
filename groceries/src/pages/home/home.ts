import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Groceries";

  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public dataService: GroceriesServiceProvider,
              public inputDialogService: InputDialogServiceProvider) {

  }

  loadItems(){
    return this.dataService.getItems();
  }

  removeItem(item, index){
    console.log("Removing Item -", item, index);
    const toast = this.toastCtrl.create({
      message: "Removing Item - " + index + "...",
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(index);
  }

  editItem(item, index){
    console.log("Editing Item -", item, index);
    const toast = this.toastCtrl.create({
      message: "Editing Item - " + index + "...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index)
  }

  addItem(){
    this.inputDialogService.showPrompt();
  }

}
