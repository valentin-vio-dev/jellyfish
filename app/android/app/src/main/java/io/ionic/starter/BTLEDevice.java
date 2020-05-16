package io.ionic.starter;

import android.bluetooth.BluetoothDevice;

public class BTLEDevice {

    private BluetoothDevice bluetoothDevice;
    private int rssi;

    public BTLEDevice(BluetoothDevice bluetoothDevice) {
        this.bluetoothDevice = bluetoothDevice;
    }

    public BTLEDevice() {

    }

    public String getAddress() {
        return bluetoothDevice == null ? "Make sure the device's bluetooth is turned on." : bluetoothDevice.getAddress();
    }

    public String getName() {
        return bluetoothDevice == null ? "No device found" : bluetoothDevice.getName();
    }

    public void setRSSI(int rssi) {
        this.rssi = rssi;
    }

    public int getRSSI() {
        return rssi;
    }

    public BluetoothDevice getBluetoothDevice() {
        return bluetoothDevice;
    }
}
