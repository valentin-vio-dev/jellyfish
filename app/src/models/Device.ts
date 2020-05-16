export class Device {
    name: string;
    address: string;
    rssi: number;
    status: string;

    static CONNECTED: string = 'CONNECTED';
    static DISCONNECTED: string = 'DISCONNECTED';

    constructor(name?: string, address?: string, rssi?: number, status: string = Device.DISCONNECTED) {
        this.name = name;
        this.address = address;
        this.rssi = rssi;
        this.status = status;
    }
}