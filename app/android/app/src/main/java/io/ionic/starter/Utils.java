package io.ionic.starter;

import android.os.Build;
import android.support.annotation.RequiresApi;

public class Utils {

    public static void debug(String message) {
        System.out.println("\t\t\t\t=== EPOC_PLUGIN | " + message);
    }

    public static String concatArray(double[] arr) {
        String ret = arr[0] + "";
        for(int i=1;i<arr.length;i++) {
            ret += "|" + arr[i];
        }
        return ret;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public static long[] byteArrayToUnsigned(byte[] arr) {
        long[] unsignedDecrypted = new long[16];
        for(int i=0;i<16;i++) {
            unsignedDecrypted[i] = Byte.toUnsignedLong(arr[i]);
        }
        return  unsignedDecrypted;
    }

    public static double[] cutOffQuality(double[] packet) {
        double[] ret = new double[14];
        for(int i=0;i<14;i++) {
            ret[i] = packet[i];
        }
        return ret;
    }

}
