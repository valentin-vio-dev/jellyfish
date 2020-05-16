import { SignalPacket } from './SignalPacket';

export class Record {
    id: string;
    name: string;
    notes: string;
    dateStart: string;
    dateEnd: string;
    length: number;
    sampleCount: number;
    deviceName: string;
    deviceAddress: string;
    signals: SignalPacket[];
    user: any;
    isPrivate: boolean;

    constructor() {

    }

    setFromObj(packet: any, id: string, signals: SignalPacket[], user: any) {
        this.id = id;
        this.name = packet.name;
        this.notes = packet.notes;
        this.dateStart = packet.dateStart;
        this.dateEnd = packet.dateEnd;
        this.deviceName = packet.deviceName;
        this.deviceAddress = packet.deviceAddress;
        this.signals = signals;
        this.isPrivate = packet.isPrivate;
        this.user = user;
    }

    calculateLength(): void {
        let timeStart: Date = new Date(parseInt(this.signals[0].time));
        let timeEnd: Date = new Date(parseInt(this.signals[this.signals.length-1].time));
        let timeDiff = (timeEnd.getTime() - timeStart.getTime()) / 1000;
        this.length = timeDiff;
    }

    getDiffSecondsFromStart(time: number) {
        let timeStart: Date = new Date(parseInt(this.signals[0].time));
        let timeEnd: Date = new Date(time);
        let timeDiff = Math.abs(timeEnd.getTime() - timeStart.getTime()) / 1000;
        return timeDiff;
    }

    calculateSampleCount(): void {
        this.sampleCount = this.signals.length;
    }

    getFormatedTime() {
        let h = Math.floor(Math.abs(this.length / 60 / 60));
        let m = Math.floor(Math.abs(this.length / 60 % 60));
        let s = Math.floor(Math.abs(this.length % 60));
        let res = '';
        res += (h == 0 ? '' : h+'h ');
        res += (m == 0 ? '' : m+'m ');
        res += (s == 0 ? '' : s+'s ')
        return res === '' ? '0s' : res;
    }

    static formatTime(seconds: number) {
        let h = Math.floor(Math.abs(seconds / 60 / 60));
        let m = Math.floor(Math.abs(seconds / 60 % 60));
        let s = Math.floor(Math.abs(seconds % 60));
        let res = '';
        res += (h < 10 ? '0'+h+':' : h+':');
        res += (m < 10 ? '0'+m+':' : m+':');
        res += (s < 10 ? '0'+s : s);
        return res;
    }

    getRangeSignals(from: number, to: number): SignalPacket[] {
        return this.signals.slice(from, to + 1);
    }

    getSignalByPos(pos: number): SignalPacket {
        let cnt = 0;
        let ret = null;
        this.signals.forEach((signal: SignalPacket) => {
            if(cnt === pos) {
                ret = signal;
            }
            cnt += 1;
        });
        return ret;
    }

    static getSignalsByChannel(channel: number, signals) {
        let channelDatas = [];
        signals.forEach((packet: SignalPacket) => {
          let value = parseFloat(packet.deconstructToSignals()[channel]) + (channel * 1000) + 100;
          channelDatas.push(value);
        });
        return channelDatas;
    }

    getChannel(channel: number) {
        return this.signals.map((signal: SignalPacket) => {
            return signal.deconstructToSignals()[channel]
        });
    }

    static mapOffset(channelValues: string[], channel: number) {
        return channelValues.map((value: string) => {
            return parseInt(value) + (channel * 1000);
        });
    }

    static getElapsedTime(record: Record, sampleCount: any) {
        let timeStart: Date = new Date(parseInt(record.signals[0].time));
        let timeEnd: Date = new Date(parseInt(sampleCount > record.signals.length - 1 ? record.signals[record.signals.length-1].time : record.signals[sampleCount].time));
        let timeDiff = Math.abs(timeEnd.getTime() - timeStart.getTime()) / 1000;
        //console.log(timeStart, timeEnd, timeDiff)
        return timeDiff;
    }  

    static getSampleCpuntFromTime(record: Record, time: number) {
        let timeStart: Date = new Date(parseInt(record.signals[0].time));
        let ret = 0;
        let got: boolean = false;
        let index = 0
        record.signals.forEach((signal: SignalPacket) => {
            let timeEnd: Date = new Date(parseInt(signal.time));
            let timeDiff = (timeEnd.getTime() - timeStart.getTime()) / 1000;
            if(timeDiff >= time && !got) {
                ret = index
                got = true;
            }
            index += 1;

            //console.log(timeDiff, time)
        });
        //console.log('ret', ret)
        return ret;
    }


}