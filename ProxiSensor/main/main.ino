#define echoPin 7 // Echo Pin
#define trigPin 6 // Trigger Pin
 
long duration, distance, result; // Duration used to calculate distance
 
void setup()
{
Serial.begin (9600);

pinMode(trigPin, OUTPUT);
pinMode(echoPin, INPUT);
}
 
void loop()
{

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.0340 / 2;
  delay(500);

if (distance < 100) {
  Serial.println("some one in front of");
} 

  Serial.println(distance);

//Delay 500ms before next reading.
delay(50);
}
