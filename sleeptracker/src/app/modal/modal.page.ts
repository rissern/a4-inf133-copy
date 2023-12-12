import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SleepData } from '../data/sleep-data';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() sleepies:SleepData[] = [];

  sData:SleepData = new SleepData("NULL", 10);
  saveDate:string;

  constructor(private modalController:ModalController)
  {
    this.saveDate = new Date().toISOString();
  }

  ngOnInit() {
  }

  modalAssign(item:SleepData)
  {
    var check = this.saveDate.split('T')[0];
    this.sData = item;
  }
  
  showMod()
  {
    this.saveDate = this.saveDate.split('T')[0];
    console.log(this.saveDate);
  }

  goBack()
  {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}
