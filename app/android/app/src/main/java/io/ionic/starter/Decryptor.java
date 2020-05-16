package io.ionic.starter;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class Decryptor {

    private byte[] AESKey;
    private String deviceName;
    private String serial;

    public Decryptor(String deviceName) {
        this.deviceName = deviceName;
        this.serial = generateSerial(this.deviceName);
        this.AESKey = generateKey(this.serial);
    }

    private String generateSerial(String deviceName) {
        return deviceName.split(" ")[1].replace("(", "").replace(")", "");
    }

    private byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4) + Character.digit(s.charAt(i+1), 16));
        }
        return data;
    }

    private byte[] generateKey(String serial) {
        int len = 16;
        String ser = ""+serial.charAt(6)+serial.charAt(7)+serial.charAt(4)+serial.charAt(5)+serial.charAt(2)+serial.charAt(3)+serial.charAt(0)+serial.charAt(1);

        byte[] serByte = hexStringToByteArray(ser);

        byte[] zeros = new byte[]{
                (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x00,
                (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x00,
                (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x00
        };

        byte[] serialTmp = new byte[zeros.length + serByte.length];

        System.arraycopy(zeros, 0, serialTmp, 0, zeros.length);
        System.arraycopy(serByte, 0, serialTmp, zeros.length, serByte.length);

        byte[] serialNumber = serialTmp;
        int[] order = new int[]{-1, -2, -2, -3, -3, -3, -2, -4, -1, -4, -2, -2, -4, -4, -2, -1};
        byte[] key = new byte[len];

        for(int i=0;i<len;i++) {
            key[i] = serialNumber[serialNumber.length+order[i]];
        }

        return key;
    }

    private byte[] decryptPacket(byte[] key, byte[] encrypted) throws Exception {
        SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
        cipher.init(Cipher.DECRYPT_MODE, skeySpec);
        byte[] decrypted = cipher.doFinal(encrypted);

        return decrypted;
    }

    public byte[] decrypt(byte[] encrypted) {
        try {
            return decryptPacket(this.AESKey, encrypted);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public byte[] trimBytesToBlockSize(byte[] byteValues) {
        byte[] ret = new byte[16];
        int c = 0;
        for(int i=2;i<18;i++) {
            ret[c] = byteValues[i];
            c++;
        }
        return ret;
    }

    public double[] convertEPOCPlus(long[] decrypted) {
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


}
