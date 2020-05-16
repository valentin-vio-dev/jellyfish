package io.ionic.starter;

import java.util.ArrayList;
import java.util.List;

public class DataPacket {

    private long[] firstPacket;
    private long[] secondPacket;

    private boolean firstArrived;
    private boolean secondArrived;

    public DataPacket() {
        this.firstArrived = false;
        this.secondArrived = false;
    }

    public void setFirstPacket(long[] packet) {
        this.firstPacket = packet;
        firstArrived = true;
    }

    public void setSecondPacket(long[] packet) {
        this.secondPacket = packet;
        secondArrived = true;
    }

    public boolean allArrived() {
        return firstArrived && secondArrived;
    }

    private long[] concatPackets(long[] packet1, long[] packet2) {
        long[] concated = new long[packet1.length + packet2.length];
        int c = 0;
        for(int i=0;i<packet1.length;i++) {
            concated[c] = packet1[i];
            c++;
        }

        for(int i=0;i<packet2.length;i++) {
            concated[c] = packet2[i];
            c++;
        }
        return concated;
    }

    public void addPacket(long[] packet) {
        if(!(packet[0] == 0 && packet[1] == 0)) {
            // PACKET - 1(16)
            setFirstPacket(packet);
        }else{
            // PACKET - 2(32)
            if(secondArrived && !firstArrived) {
                secondArrived = false;
                secondPacket = null;
            }else{
                setSecondPacket(packet);
            }
        }
    }

    private double[] convertEPOCPlus(long[] decrypted) {
        double[] converted = new double[16];
        int index = 0;

        for(int i=2;i<16;i+=2) {
            converted[index] = convertData(decrypted[i], decrypted[i+1]);
            index++;
        }

        for(int i=18;i<decrypted.length;i+=2) {
            converted[index] = convertData(decrypted[i], decrypted[i+1]);
            index++;
        }

        return converted;
    }

    private double convertData(long val_1, long val_2) {
        return (((val_1 * .128205128205129) + 4201.02564096001) + ((val_2 - 128) * 32.82051289));
    }

    public double[] getConcatedAndConverted() {
        long[] concated = concatPackets(this.firstPacket, this.secondPacket);
        firstArrived = false;
        secondArrived = false;
        return convertEPOCPlus(concated);
    }
}
