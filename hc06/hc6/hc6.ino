#include <SoftwareSerial.h>
int i = 0;
SoftwareSerial BTserial(2, 3); // RX | TX
// Connect the HC-06 TX to the Arduino RX on pin 2. 
// Connect the HC-06 RX to the Arduino TX on pin 3 through a voltage divider.
// 
 
 
void setup() 
{
    Serial.begin(9600);
}
 
void loop()
{ 
    // Keep reading from Arduino Serial Monitor and send to HC-06
    if (Serial.available())
    {
      
      //Serial.println("LED ON. Press 0 to LED OFF!");
      //delay(2000);


      //Serial.println("2");
      //BTserial.write(Serial.read());
     delay(1000);
    Serial.println("foo");
     delay(1000);
     Serial.println("bar");
     delay(1000);
     Serial.println("bas");

      //Serial.write("hello");
           // delay(2000);

            //BTserial.print("hello");

 

        
    }
  //  Serial.print("2");
    //delay(2000);
 
}
