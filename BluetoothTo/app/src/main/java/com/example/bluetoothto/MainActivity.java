package com.example.bluetoothto;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.UUID;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

//http://solderer.tv/data-transfer-between-android-and-arduino-via-bluetooth/
public class MainActivity extends Activity {
    private static final String TAG = "bluetooth2";

    Handler h;

    final int RECIEVE_MESSAGE = 1;        // Status  for Handler
    private BluetoothAdapter btAdapter = null;
    private BluetoothSocket btSocket = null;
    private StringBuilder sb = new StringBuilder();

    private ConnectedThread mConnectedThread;

    private WebView webView;
    private String lastRecieved;

    //private String localIP = "192.168.87.166";
    //private String mainURL = "http://" + localIP+ ":3000"; // SKAL MÅSKE ÆNDRES TIL LOCALHOST
    private String mainURL = "http://localhost:3000";

    // SPP UUID service. Fixed to HC-06 module
    private static final UUID MY_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");

    // MAC-address of Bluetooth module (Must be changed to match module) can på found when connecting to HC-06 module via bluetooth
    private static String address = "98:D3:31:F7:47:2A";

    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        lastRecieved = "0"; // Arduino sends "0" and "1" based on proximity
        webView = (WebView) findViewById(R.id.webView);

        setUpWebView(webView);

        // Handle received data from Arduino
        h = new Handler() {
            public void handleMessage(android.os.Message msg) {
                switch (msg.what) {
                    case RECIEVE_MESSAGE:
                        byte[] readBuf = (byte[]) msg.obj;
                        String strIncom = new String(readBuf, 0, msg.arg1); // create string from bytes array
                        sb.append(strIncom);                                                // append string
                        int endOfLineIndex = sb.indexOf("\r\n");                            // determine the end-of-line
                        if (endOfLineIndex > 0) {                                            // if end-of-line,
                            String sbprint = sb.substring(0, endOfLineIndex);               // extract string
                            sb.delete(0, sb.length());                                      // and clear
                            Log.d(TAG, "RECIEVED: "+sbprint);

                            String webURL = webView.getUrl(); // Get the current URL in the webview
                            Log.d(TAG, "webURL: "+webURL);

                            int index =webURL.lastIndexOf('/'); // Get the URL without the last dash (officeID)
                            String webURLWithoutOfficeID = webURL.substring(0,index);
                            Log.d(TAG, "webURLWithoutOfficeID: "+webURLWithoutOfficeID);

                            String officeID = webURL.substring(webURL.lastIndexOf("/")); // Get the URL from the last dash
                            Log.d(TAG, "officeID: "+officeID);

                            // If the webview is showing a users officesign start reacting to proxemity sensor
                            if(webURLWithoutOfficeID.equals(mainURL+"/office") || webURLWithoutOfficeID.equals(mainURL+"/office/details")) {
                                // If proxemity is close and it was far before
                                if (sbprint.equals("1") && lastRecieved.equals("0")) {
                                    webView.loadUrl(mainURL+"/office/details"+officeID); // load URL for officesign but in close mode
                                    Log.d(TAG, "DETAILEDOFFICE :" + mainURL+"/office/details"+officeID);
                                    lastRecieved = "1";
                                }
                                // ... opposite
                                if (sbprint.equals("0") && lastRecieved.equals("1")) {
                                    webView.loadUrl(mainURL+"/office"+officeID);
                                    Log.d(TAG, "OFFICE");
                                    lastRecieved = "0";
                                }
                            }
                        }
                        break;
                }
            };
        };

        btAdapter = BluetoothAdapter.getDefaultAdapter();       // Get Bluetooth adapter
        checkBTState();

    }
    // Set up webview security setting and load URL
    private void setUpWebView(WebView webView) {
        webView.setWebViewClient(new WebViewClient());
        WebSettings webSettings = webView.getSettings();
        webView.getSettings().setRenderPriority(WebSettings.RenderPriority.HIGH); // Performance
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true); // Needs to be enabled to run our website in webview. Possible something with React

        webView.loadUrl(mainURL);
    }

    // Overwrite backpress so app does not close when pressing back key
    @Override
    public void onBackPressed() {

        if(webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    // Create socket
    private BluetoothSocket createBluetoothSocket(BluetoothDevice device) throws IOException {
        try {
            final Method  m = device.getClass().getMethod("createInsecureRfcommSocketToServiceRecord", new Class[] { UUID.class });
            return (BluetoothSocket) m.invoke(device, MY_UUID);
        } catch (Exception e) {
            Log.e(TAG, "Could not create Insecure RFComm Connection",e);
        }
        return  device.createRfcommSocketToServiceRecord(MY_UUID);
    }

    @Override
    public void onResume() {
        super.onResume();

        Log.d(TAG, "...onResume - try connect...");

        // Set up a pointer to the remote node using it's address.
        BluetoothDevice device = btAdapter.getRemoteDevice(address);

        // Two things are needed to make a connection:
        //   A MAC address, which we got above.
        //   A Service ID or UUID.  In this case we are using the
        //     UUID for SPP.

        try {
            btSocket = createBluetoothSocket(device);
        } catch (IOException e) {
            errorExit("Fatal Error", "In onResume() and socket create failed: " + e.getMessage() + ".");
        }

        // Discovery is resource intensive.  Make sure it isn't going on
        // when you attempt to connect and pass your message.
        btAdapter.cancelDiscovery();

        // Establish the connection.  This will block until it connects.
        Log.d(TAG, "...Connecting...");
        try {
            btSocket.connect();
            Log.d(TAG, "....Connection ok...");
        } catch (IOException e) {
            try {
                btSocket.close();
            } catch (IOException e2) {
                errorExit("Fatal Error", "In onResume() and unable to close socket during connection failure" + e2.getMessage() + ".");
            }
        }

        // Create a data stream so we can talk to server.
        Log.d(TAG, "...Create Socket...");

        mConnectedThread = new ConnectedThread(btSocket);
        mConnectedThread.start();
    }

    @Override
    public void onPause() {
        super.onPause();

        Log.d(TAG, "...In onPause()...");

        try     {
            btSocket.close();
        } catch (IOException e2) {
            errorExit("Fatal Error", "In onPause() and failed to close socket." + e2.getMessage() + ".");
        }
    }

    private void checkBTState() {
        // Check for Bluetooth support and then check to make sure it is turned on
        // Emulator doesn't support Bluetooth and will return null
        if(btAdapter==null) {
            errorExit("Fatal Error", "Bluetooth not support");
        } else {
            if (btAdapter.isEnabled()) {
                Log.d(TAG, "...Bluetooth ON...");
            } else {
                //Prompt user to turn on Bluetooth
                Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                startActivityForResult(enableBtIntent, 1);
            }
        }
    }

    private void errorExit(String title, String message){
        Toast.makeText(getBaseContext(), title + " - " + message, Toast.LENGTH_LONG).show();
        finish();
    }

    private class ConnectedThread extends Thread {
        private final InputStream mmInStream;

        public ConnectedThread(BluetoothSocket socket) {
            InputStream tmpIn = null;

            // Get the input and output streams, using temp objects because
            // member streams are final
            try {
                tmpIn = socket.getInputStream();
            } catch (IOException e) { }

            mmInStream = tmpIn;
        }

        public void run() {
            byte[] buffer = new byte[256];  // buffer store for the stream
            int bytes; // bytes returned from read()

            // Keep listening to the InputStream until an exception occurs
            while (true) {
                try {
                    // Read from the InputStream
                    bytes = mmInStream.read(buffer);        // Get number of bytes and message in "buffer"
                    h.obtainMessage(RECIEVE_MESSAGE, bytes, -1, buffer).sendToTarget();     // Send to message queue Handler
                } catch (IOException e) {
                    break;
                }
            }
        }

    }
}