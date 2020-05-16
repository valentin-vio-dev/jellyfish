package io.ionic.starter;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCallback;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattDescriptor;
import android.bluetooth.BluetoothGattService;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.support.annotation.RequiresApi;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@NativePlugin()
public class EEGPlugin extends Plugin {

    BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    private final static int REQUEST_ENABLE_BT = 1;

    private static final UUID UUID_DEVICE =        UUID.fromString("81072F40-9F3D-11E3-A9DC-0002A5D5C51B");
    private static final UUID UUID_TRANSFER_DATA = UUID.fromString("81072F41-9F3D-11E3-A9DC-0002A5D5C51B");
    private static final UUID UUID_TRANSFER_MEMS = UUID.fromString("81072F42-9F3D-11E3-A9DC-0002A5D5C51B");

    private BTLEScanner scanner;
    private BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    private List<BTLEDevice> scannedDevices = new ArrayList<>();
    private BluetoothGatt bluetoothGatt;
    private Decryptor decryptor;
    private DataPacket dataPacket;
    private boolean recording = false;
    private int packetCounter = 1;
    private int frequency = 128;

    @PluginMethod()
    public void scanStart(PluginCall call) {
        Utils.debug("Scanning...");
        int scanTime = call.getInt("time");
        scanner = new BTLEScanner(bluetoothAdapter, scanTime, this);
        scanner.start();
        call.resolve();
    }

    @PluginMethod()
    public void scanStop(PluginCall call) {
        Utils.debug("Stop scan...");
        scanner.stop();
        call.resolve();
    }

    public void notifyScannedDevices(BTLEDevice btleDevice) {
        scannedDevices.add(btleDevice);
        JSObject deviceObject = new JSObject();
        deviceObject.put("name", btleDevice.getBluetoothDevice().getName());
        deviceObject.put("address", btleDevice.getBluetoothDevice().getAddress());
        Utils.debug("DEVICE: " + btleDevice.getName());
        notifyListeners("scanResult", deviceObject);
    }

    @PluginMethod()
    public void connect(PluginCall call) {
        String selectedDeviceName = call.getString("device");

        BTLEDevice selectedDevice = null;
        for(int i=0;i<scannedDevices.size();i++) {
            if(scannedDevices.get(i).getName().equals(selectedDeviceName) && selectedDevice == null) {
                selectedDevice = scannedDevices.get(i);
                break;
            }
        }

        if(selectedDevice == null) {
            Utils.debug("Can't find selected device!");
            call.reject("Can't find selected device!");
            return;
        }

        decryptor = new Decryptor(selectedDevice.getName());

        try {
            bluetoothGatt = selectedDevice.getBluetoothDevice().connectGatt(null, false, bluetoothGattCallback);
            call.resolve();
        }catch (Exception e) {
            Utils.debug("Can't connect to device!");
            Utils.debug(e.getMessage());
            call.reject("Can't connect to device!");
        }
    }

    @PluginMethod()
    public void disconnect(PluginCall call) {
        bluetoothGatt = null;
        call.resolve();
    }

    @PluginMethod()
    public void startRecord(PluginCall call) {
        recording = true;
        dataPacket = new DataPacket();
        bluetoothGatt.discoverServices();
        call.resolve();
    }

    @PluginMethod()
    public void stopRecord(PluginCall call) {
        recording = false;
        call.resolve();
    }

    @PluginMethod()
    public void enableBluetooth(PluginCall call) {
        if (!mBluetoothAdapter.isEnabled()) {
            Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(call, enableBtIntent, REQUEST_ENABLE_BT);
        }
    }

    @PluginMethod()
    public void bluetoothIsEnabled(PluginCall call) {
        JSObject res = new JSObject();
        if (mBluetoothAdapter.isEnabled()) {
            res.put("btResult", true);
            call.resolve(res);
        }else{
            res.put("btResult", false);
            call.resolve(res);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @PluginMethod()
    public void exportFile(PluginCall call) {
        String data = call.getString("data");
        String[] splitted = data.split(";");
        String filename = splitted[0].split("=")[1] + ".txt";
        Context con = this.getPluginHandle().getInstance().getActivity().getApplicationContext();

        FileOutputStream fos = null;
        try {
            fos = con.openFileOutput(filename, Context.MODE_PRIVATE);
            fos.write(String.join("\n", splitted).getBytes());
            JSObject res = new JSObject();
            res.put("file", con.getFilesDir() + "/" + filename);
            call.resolve(res);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
















    /* -------------------------------------------------------------------------------------------------------------------------------------------------------*/

    private BluetoothGattCallback bluetoothGattCallback = new BluetoothGattCallback() {
        @Override
        public void onConnectionStateChange(BluetoothGatt gatt, int status, int newState) {
            Utils.debug("STATUS    = " + status);
            Utils.debug("NEW STATE = " + newState);
        }

        @Override
        public void onServicesDiscovered(BluetoothGatt gatt, int status) {
            Utils.debug("GATT // Discover servicies");
            BluetoothGattCharacteristic characteristic = gatt.getService(UUID_DEVICE).getCharacteristic(UUID_TRANSFER_DATA);
            gatt.setCharacteristicNotification(characteristic, true);

            for(BluetoothGattService s: gatt.getServices()) {
                Utils.debug("SERV : "+s.getUuid());
                for(BluetoothGattCharacteristic c: s.getCharacteristics()) {
                    Utils.debug("\t\t\tCHAR : "+c.getUuid());
                    for(BluetoothGattDescriptor d: c.getDescriptors()) {
                        Utils.debug("\t\t\t\t\t\tDESC : "+d.getUuid());
                    }
                }
            }

            // NEED TO FIND OTHER WAY
            BluetoothGattDescriptor descriptor = characteristic.getDescriptors().get(0);
            descriptor.setValue(BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE);
            gatt.writeDescriptor(descriptor);
        }

        @Override
        public void onDescriptorWrite(BluetoothGatt gatt, BluetoothGattDescriptor descriptor, int status) {
            BluetoothGattCharacteristic characteristic = gatt.getService(UUID_DEVICE).getCharacteristic(UUID_TRANSFER_DATA);
            characteristic.setValue(new byte[]{(byte) 0x100});
            gatt.writeCharacteristic(characteristic);
        }

        @RequiresApi(api = Build.VERSION_CODES.O)
        @Override
        public void onCharacteristicChanged(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic) {
            byte[] byteValues = characteristic.getValue();
            byte[] decrypted = decryptor.decrypt(decryptor.trimBytesToBlockSize(byteValues));

            long[] unsignedDecrypted = Utils.byteArrayToUnsigned(decrypted);

            dataPacket.addPacket(unsignedDecrypted);

            if(byteValues[1] == 0) {
                packetCounter = 1;
            }else{
                packetCounter = 2;
            }

            if(dataPacket.allArrived()) {
                double[] concatedConverted = Utils.cutOffQuality(dataPacket.getConcatedAndConverted());
                String dataStringPacket = Utils.concatArray(concatedConverted);
                Utils.debug("data | " + dataStringPacket);
                JSObject packet = new JSObject();
                packet.put("packet", dataStringPacket);
                notifyListeners("dataStream", packet);
            }
        }

    };
}
