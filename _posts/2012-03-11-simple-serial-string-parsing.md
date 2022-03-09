---

title: 'Simple Serial String Parsing'
date: '2012-03-11T23:19:53+00:00'
author: batts
layout: post

#permalink: /2012/03/11/simple-serial-string-parsing/
image: /wp-content/uploads/2012/03/code_image1-1.png
thumb: /wp-content/uploads/2012/03/code_image1-1.png

excerpt: 'One of the requirements I came across whilst developing with the Arduino, as with the Netduino, was the need for effective 2 way serial communication between both the Arduino(s) and my desktop'

categories:
    - Microcontrollers
tags:
    - Serialport
    - Serial
    - Serial Port
    - Arduino
    - atoi()
    - serial
    - serialEvent()
    - strtok_r()
    - Tutorial
---

One of the initial requirements I came across whilst developing with the Arduino platform, as with the Netduino platform, was the need for effective 2 way serial communication between both the Arduino(s) and my desktop. Luckily, the Arduino software provides several examples that can get you up and running with serial communication in no time.

These examples can be found dotted around the File&gt;Examples&gt; within the Arduino IDE. However, the example primarily used for basis of this tutorial (also available online [here](http://www.arduino.cc/en/Tutorial/SerialEvent "Arduino serial event tutorial")) can be located via File&gt;Examples&gt;Communication&gt;SerialEvent. SerialEvent() is a function which is called after loop() whenever new data has been recieved over serial RX.

With minimal expansion to this example code its quite an easy task to add methods for data parsing via use of delimiters, thus affording functional instructions and/or commands to be sent between devices.

The following tutorial demonstrates the use of the [strtok\_r()](http://www.mkssoftware.com/docs/man3/strtok_r.3.asp "a breakdown of strtok_r()") function to parse an incoming string, so that it can be used to call independent functions and set property values. At the heart of the presented code is a function called ParseSerialData() which utilises strtok\_r() to separate the received string each time there is a comma “,” present. Then depending upon how many chunks of data have been identified the function calls one of two (but not limited to) switch statements that are used to determine what we want to do with the received data.

In order to effectively demonstrate this, the use of an analog output on pin 9 is used to control the brightness of a LED. This in turn is reflective of the Arduino fading [tutorial](http://arduino.cc/en/Tutorial/Fading "Arduino fading tutorial") also available via the IDE, File&gt;Examples&gt;Analog&gt;Fading.

If you don’t have an LED to hand (???) then don’t worry you will still be able to run the code and see its functionality via the Arduino Serial Monitor (Tools&gt;Serial Monitor or Ctrl+Shift+M) or you could even use a dc motor etc

**Onto The Code**

Lets start by looking at the SerialEvent code itself. This function is called whenever incoming data present over serial RX. It is important to remember that as the data is streamed over the connection, as such it won’t necessarily all arrive at once. In order to cater for this a while loop is used to capture the data if it is available and/or until we tell it to stop.

This is so we can determine a complete message and is achieved by evaluating whether each of the received characters is a designated termination character ‘n’ , or in English, we read the data until we detect a new line call.

As we receive data we add it to a pre-defined char array called inData. The location of the data within the array is controlled via an index value, conveniently called index 🙂 Each time we add to the array we also increment index so that we are ready for the next char etc.

Once all the data is received we reset index to zero ready for the next event and set a flag stringComplete to indicate that the data is ready to be parsed.

```
void serialEvent()
{
// Read while we have data
while (Serial.available() && stringComplete == false)
{
// Read a character
char inChar = Serial.read();
// Store it in char array
inData[index] = inChar;
// Increment where to write next
index++;
// Also add it to string storage just
// in case, not used yet!
inString += inChar;

// Check for termination character
if (inChar == 'n')
{
// Reset the index
index = 0;
// Set completion of read to true
stringComplete = true;
}
}
}
```

Each iteration of the main loop looks at the status of the stringComplete flag and if it is set to true we then calls the function ParseSerialData(). Upon completion of data parsing the flag is reset to false so that the system can continue listening for new data. Synchronisation is handled via the fact that the SerialEvent() call is only available after the completion of each loop.

```
void loop()
{
if (stringComplete)
{
// Parse the recieved data
ParseSerialData();
// Reset inString to empty
inString = "";
// Reset the system for further
// input of data
stringComplete = false;
}
}
```

As indicated the ParseSerialData() function is the place where we do all our evaluation and filtering of the received data.As previously stated, by using the strtok\_r() function we split our received char array up into chunks each time we find a designated delimiter, which can be anything but in this case is is assigned as a comma “,”. Each time a chunk is identified it is then added to another pre-defined array called inParse. As with the SerialEvent() inString array the position of the data within the array is handled via the increment of an index value, this time called count.

Count is also used to determine how many chunks of data our received string contains. This is then used as a rudimentary filter for determining what we want to do with the received data via simple if statements e.g. if we have two chunks of data do this or if we have three then do that.

This example uses this to determine which out of two switch statements to apply to the data. This can be rationalised down and the cases could be used to populate additional properties dependant upon count, however this system keeps things simple and gifts provision for population of pre-defined properties if the application requires them to be globally available instead of dynamically (ref, char \*func = inParse\[0\];) etc.

Finally the determined switch statement is used to call and pass data to a function depending upon an identifier “func”, the first chunk of our data. The code demonstrate the use of two switches and three independent function calls.

```
void ParseSerialData()
{
// The data to be parsed
char *p = inData;
// Temp store for each data chunk
char *str;
// Id ref for each chunk
int count = 0;

// Loop through the data and seperate it into
// chunks at each "," delimeter
while ((str = strtok_r(p, ",", &p)) != NULL)
{
// Add chunk to array
inParse[count] = str;
// Increment data count
count++;
}

// If the data has two values then..
if(count == 2)
{
// Define value 1 as a function identifier
char *func = inParse[0];
// Define value 2 as a property value
char *prop = inParse[1];

// Call the relevant identified function
switch(*func)
{
case 'A': FunctionA(prop); break;
case 'B': FunctionB(prop); break;
}
}

if(count == 3)
{
// Define value 1 as a function identifier
char *func = inParse[0];
// Define value 2 as a property value
char *prop = inParse[1];
// Define value 3 as a period
char *prod = inParse[2];

// Call the relevant identified function
switch(*func)
{
case 'A': FunctionA1(prop,prod); break;
}
}
}
```

Ok our data is now parsed, so lets have a look at the example functions to see how it can be used. If we were to send the command A,100 this would be separated into two chunks “A” and “100” the “two chunk switch” would then use the first chunk “A” to determine to send the “prop” value of “100” to FunctionA.

```
void FunctionA(char *prop)
{
// Output the data
Serial.print("FunctionA: ");
Serial.print(prop);
// Output new line
Serial.println();
}
```

FunctionA() then simply returns the value so that we can see it has been triggered via use of Serial.print(). Ok so we have the ability to call a designated function lets go a little further and use the property value to do something. If we now were to send the command B,100 this would also be separated into two chunks “B” and “100” the “two chunk switch” would then use the first chunk “B” to determine to send the “prop” value of “100” to FunctionB().

```
void FunctionB(char *prop)
{
// Convert prop to int
int val = atoi(prop);
Serial.print("FunctionB: ");
Serial.print(val);
// Output new line
Serial.println();
// Set value of pin 9 to val
analogWrite(9, val);
}
```

FunctionB however also contains some additional code that converts the property sent to an integer via use of [atoi()](http://pubs.opengroup.org/onlinepubs/007904875/functions/atoi.html "a look at the atoi function") which can then be used to set the [Pulse Width Modulation PWM](http://arduino.cc/en/Tutorial/PWM "Arduino PWM Tutorial") value of pin 9 and by way of result we can now use serial commands to control the brightness of the LED.

In order for this to be utilised effectively please remember to use values between 0-255 only, however for this sample it is deemed that this factor is a responsibility of the desktop app (ok cop-out) :). For more information on this please refer to the [Arduino PWM tutoria](http://arduino.cc/en/Tutorial/PWM "Arduino PWM Tutorial")l and the [Arduino Fading](http://arduino.cc/en/Tutorial/Fading "Arduino fading tutorial") examples.

Now lets have a look at sending data that consists of 3 chunks such as command A,100,1000. In this scenario the ParseSerialString() function would determine a count of 3 chunks “A”,”100″ and “1000” aby way of result this time around the “three chunk switch” would be called and as our first chunk is “A” it then calls FunctionA1() passing it a prop value of “100” and a prod value of “1000”.

In this case, as with functionA() all we do is return this via Serial.print(), however as with example FunctionB() we could use this data to operate an output. The additional value of prod could then be also used to determine extended functionality such as a period to apply this setting and/or a number of iterations to apply etc.

A good example of this could be for motor control e.g. turn the motor at half speed for 1 second, the possibilities are endless 🙂

Finally in order to use the code we need to initialise the serial link on setup() this is simply achieved via use of the Serial.begin() command as shown in the following code:

```
void setup()
{
// Delay to facilitate start up of Xbee usually about
// 5 seconds. Comment out if using wired serial etc.
delay(6000);

// Initialise the serial port
Serial.begin(9600);
}
```

I have also added a delay to the start-up to allow for start-up time when using an Xbee for wireless communication. This can be removed without effect if you are using a standard cable link. You also might want to change the baurdrate from 9600 to reflect your requirements etc.

That’s it for this time, I hope you find this tutorial a useful introduction to Arduino serial string parsing. The full sketch for this tutorial can be downloaded from [here](http://dl.dropbox.com/u/31617455/SerialStringParse.zip "Tutorial download SerialStringParse.zip"). Any comments and/or suggestions for improvements are welcome.