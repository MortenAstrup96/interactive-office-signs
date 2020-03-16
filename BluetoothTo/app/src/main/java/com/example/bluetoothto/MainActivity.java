package com.example.bluetoothto;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.Set;



public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MyActivity";

    BluetoothAdapter bluetoothAdapter;
    ArrayList<BluetoothDevice> BTal = new ArrayList<>();
    DeviceList deviceList;
    ListView lvNewDevice;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        lvNewDevice = (ListView) findViewById(R.id.lv);
        BTal = new ArrayList<>();
        Log.d(TAG, "START: ");

        connect();

        Button cnnctBtn = (Button)findViewById(R.id.connect);

        cnnctBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(bluetoothAdapter.isDiscovering()) {
                    bluetoothAdapter.cancelDiscovery();

                    // mangler muligvis permission check her?

                    bluetoothAdapter.startDiscovery();
                    IntentFilter discoverIntent = new IntentFilter(BluetoothDevice.ACTION_FOUND);
                    registerReceiver(receiver, discoverIntent);
                }
                if(!bluetoothAdapter.isDiscovering()) {
                    bluetoothAdapter.cancelDiscovery();

                    // Permission check. Skal alle nyere end lollipop have
                    checkBTPermissions();


                    bluetoothAdapter.startDiscovery();
                    IntentFilter discoverIntent = new IntentFilter(BluetoothDevice.ACTION_FOUND);
                    registerReceiver(receiver, discoverIntent);
                }


                //nothing yet
            }
        });

        // Register for broadcasts when a device is discovered.
        IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_BOND_STATE_CHANGED);
        registerReceiver(receiver, filter);

    }

    // Create a BroadcastReceiver for ACTION_FOUND.
    private final BroadcastReceiver receiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();

            if (BluetoothDevice.ACTION_FOUND.equals(action)) {
                BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                BTal.add(device);

                Log.d(TAG, "onReceive: " + device.getName() + " ADDR: "+device.getAddress());

                deviceList = new DeviceList(context, R.layout.device_list,BTal);

                lvNewDevice.setAdapter(deviceList);

            }
        }
    };

    @Override
    protected void onDestroy() {
        super.onDestroy();


        // Don't forget to unregister the ACTION_FOUND receiver.
        unregisterReceiver(receiver);
    }


    void connect() {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

        // spørg om at tænde bluetooth hvis det ikke er tændt
        if (!bluetoothAdapter.isEnabled()) {
            Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(enableBtIntent, 0);

        }


    }

    private void checkBTPermissions() {
        if(Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP){
            int permissionCheck = this.checkSelfPermission("Manifest.permission.ACCESS_FINE_LOCATION");
            permissionCheck += this.checkSelfPermission("Manifest.permission.ACCESS_COARSE_LOCATION");
            if (permissionCheck != 0) {

                this.requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, 1001); //Any number
            }
        }else{
            Log.d(TAG, "checkBTPermissions: No need to check permissions. SDK version < LOLLIPOP.");
        }
    }
}
