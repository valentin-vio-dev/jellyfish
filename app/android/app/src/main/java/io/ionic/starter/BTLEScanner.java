package io.ionic.starter;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanFilter;
import android.bluetooth.le.ScanResult;
import android.bluetooth.le.ScanSettings;
import android.os.Build;
import android.os.Handler;
import android.os.ParcelUuid;
import android.support.annotation.RequiresApi;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

public class BTLEScanner extends Plugin {

    private static final UUID UUID_DEVICE = UUID.fromString("81072F40-9F3D-11E3-A9DC-0002A5D5C51B");
    private static final UUID[] UUID_ARRAY = new UUID[]{UUID_DEVICE};

    private BluetoothAdapter bluetoothAdapter;
    private BluetoothLeScanner bluetoothLeScanner;
    private boolean scanning;
    private Handler handler;

    private long scanPeriod;

    private EEGPlugin eegPlugin;

    private List<String> addedDevies;

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public BTLEScanner(BluetoothAdapter bluetoothAdapter, long scanPeriod, EEGPlugin eegPlugin) {
        this.bluetoothAdapter = bluetoothAdapter;
        this.scanPeriod = scanPeriod;
        this.scanning = false;
        this.bluetoothLeScanner = bluetoothAdapter.getBluetoothLeScanner();
        this.handler = new Handler();
        this.eegPlugin = eegPlugin;
        this.addedDevies = new ArrayList<>();
    }

    public boolean isScanning() {
        return scanning;
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void start() {
        addedDevies.clear();
        scan(true);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void stop() {
        scan(false);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    private void scan(boolean enable) {
        Utils.debug("BTLEScanner scan");
        // FILTERS FOR DEVICES
        List<ScanFilter> filters = new ArrayList<ScanFilter>();
        if (UUID_ARRAY != null && UUID_ARRAY.length > 0) {
            for (UUID uuid : UUID_ARRAY) {
                ScanFilter filter = new ScanFilter.Builder().setServiceUuid(new ParcelUuid(uuid)).build();
                filters.add(filter);
            }
        }

        ScanSettings settings = new ScanSettings.Builder().build();

        if(enable && !scanning) {

            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    scanning = false;
                    bluetoothLeScanner.stopScan(scanCallback);
                }
            }, scanPeriod);

            scanning = true;
            Utils.debug("eher");
            bluetoothLeScanner.startScan(filters, settings, scanCallback);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    private ScanCallback scanCallback = new ScanCallback() {
        @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
        @Override
        public void onScanResult(int callbackType, ScanResult result) {
            Utils.debug("Found device...");
            BTLEDevice btleDevice = new BTLEDevice(result.getDevice());
            btleDevice.setRSSI(result.getRssi());
            if(!addedDevies.contains(btleDevice.getName())) {
                eegPlugin.notifyScannedDevices(btleDevice);
                addedDevies.add(btleDevice.getName());
            }

        }

        @Override
        public void onBatchScanResults(List<ScanResult> results) {
            Utils.debug("BLEScanner // onBatchScanResults");
            for (ScanResult sr : results) {
                Utils.debug("SCAN RESULT - RESULTS - " + sr.toString());
            }
        }

        @Override
        public void onScanFailed(int errorCode) {
            //Utils.debug("BLEScanner // onScanFailed");
            //Utils.debug("SCAN FAILED - ERROR CODE: " + errorCode);
        }

    };
}
