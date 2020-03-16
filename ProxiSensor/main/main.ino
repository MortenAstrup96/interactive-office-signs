#define echoPin D7 // Echo Pin
#define trigPin D6 // Trigger Pin
 
long duration, distance, result; // Duration used to calculate distance
 
void setup()
{
Serial.begin (9600);
Serial.println("Fuck thor1");

pinMode(trigPin, OUTPUT);
pinMode(echoPin, INPUT);
}
 
void loop()
{

result = getDistance();
delay(50);

if (result < 100) {
  Serial.println("some one in front of");
}

Serial.println(result);
//Delay 500ms before next reading.
delay(500);
}

long getDistance() {
    /* The following trigPin/echoPin cycle is used to determine the
  distance of the nearest object by bouncing soundwaves off of it. */
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  //Calculate the distance (in cm) based on the speed of sound.
  distance = duration/58.2;
  return distance;
  }
