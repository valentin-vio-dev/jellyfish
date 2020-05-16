export class SignalPacket {
    packet: string;
    time: string;

    constructor(packet?: string, time?: string) {
        this.packet = packet;
        this.time = time;
    }

    deconstructToSignals(): string[] {
        return this.packet.split('|');
    }

    static generateRandomPacket() {
        let tmp = [];
        for(let i=0;i<14;i++) {
            tmp.push(Math.random() * 500);
        }
        let packet = new SignalPacket(tmp.join('|'), Date.now().toString());
        return packet;
    }
}