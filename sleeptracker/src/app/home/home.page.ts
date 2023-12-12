import { Component } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	startDate:string;
	endDate:string;
	sleepyDate:string;
	getSleep:number;
	sleepies:SleepData[] = [];
	
  constructor(private alertController:AlertController, private modalController:ModalController, private storage: Storage) {
	this.startDate = new Date().toISOString();
	this.endDate = new Date().toISOString();
	this.sleepyDate = new Date().toISOString();
	this.getSleep = 0;
	}

	async ngOnInit() {
		//console.log(this.allSleepData);
		await this.storage.create();
		this.getData();
	}

	async getData()
	{
		var storageResult = await this.storage.get('test');
		this.sleepies = (storageResult) ? JSON.parse(storageResult) : [];
	}

	async setData()
	{
		await this.storage.set('test', JSON.stringify(this.sleepies));
	}

	showDate()
	{
		console.log(this.startDate);
		console.log(this.endDate);
		console.log(this.sleepyDate);
		console.log(this.getSleep);
		console.log("");
	}

	sleepyData(num:number)
	{
		this.getSleep = num;
	}

	logInfo()
	{
		var check = this.endDate.split('T')[0];
		var sTime = this.startDate.split('T')[1];
		sTime = sTime.split(':')[0];
		var eTime = this.endDate.split('T')[1];
		eTime = eTime.split(':')[0];

		var ch1: number = +sTime;
		var ch2: number = +eTime;

		sTime = this.startDate.split('T')[1];
		sTime = sTime.split(':')[1];
		eTime = this.endDate.split('T')[1];
		eTime = eTime.split(':')[1];

		var hm1: number = +sTime;
		var hm2: number = +eTime;

		if (hm1 > hm2)
		{
			ch2--;
		}

		if (this.startDate.split('T')[0] != check)
		{
			ch2 += 24;
		}
		ch1 = ch2 - ch1;
		if (ch1 < 0)
		{
			this.alertController.create({
				header: 'ERROR',
				message: 'Cannot have a negative amount of sleep',
				buttons: ['OK']
				}).then((alert) => {
				alert.present();
				});
			return;
		}
		var num = 0;
		for (let i of this.sleepies)
		{
			if (i.date == check)
			{
				this.sleepies[num].time = ch1;
				this.setData();
				num = -1;
				break;
			}
			num++;
		}
		if (num != -1)
		{
			this.sleepies.push(new SleepData(check, 10));
			this.sleepies[this.sleepies.length - 1].time = ch1;
			this.setData();
		}
		this.alertController.create({
			header: 'Sleep Info Recorded',
			message: 'Press OK to continue',
			buttons: ['OK']
			}).then((alert) => {
			alert.present();
			});
		console.log(this.sleepies);
	}

	logSleepy()
	{
		var check = this.sleepyDate.split('T')[0];
		var num = 0;
		for (let i of this.sleepies)
		{
			if (i.date == check)
			{
				this.sleepies[num].sleeps[this.getSleep]++;
				this.setData();
				num = -1;
				break;
			}
			num++;
		}
		if (num != -1)
		{
			this.sleepies.push(new SleepData(check, this.getSleep));
			this.setData();
		}
		this.alertController.create({
			header: 'Sleepiness Level Recorded',
			message: 'Press OK to continue',
			buttons: ['OK']
			}).then((alert) => {
			alert.present();
			});
		console.log(this.sleepies);
		//this.sleepies[this.getSleep]++;
		//this.sleepies.push({'item':this.sleepyDate, 'one': 1});
	}

	async viewInfo()
	{
		  const modal = await this.modalController.create({
		  component: ModalPage,
		  componentProps: {
			  'sleepies': this.sleepies,
			}
		  });
		  await modal.present();
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	//get allSleepData() {
		//return SleepService.AllSleepData;
	//}

}
