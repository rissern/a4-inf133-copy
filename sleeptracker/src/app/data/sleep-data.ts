import { nanoid } from 'nanoid';

export class SleepData {
	date:string;
	sleeps:number[] = [0,0,0,0,0,0,0];
	time:number;

	constructor(date:string, num:number) {
		this.date = date;
		this.time = 0;
		if (num != 10)
		{
			this.sleeps[num] = 1;
		}
	}

	summaryString():string {
		return 'Unknown sleep data';
	}
}
