---
id: 1283
title: 'Simple Bluetooth Joystick'
date: '2014-03-13T00:08:20+00:00'
author: batts
layout: post
guid: '/?p=1283'
permalink: /2014/03/13/simple-bluetooth-joystick/
image: /wp-content/uploads/2014/03/SBTJ1-1.jpg
categories:
    - Microcontrollers
    - Tutorials
tags:
    - Bluetooth
    - 'Bluetooth Mate'
    - Hardware
    - Joystick
    - serial
    - 'Serial Communication'
    - Tutorial
---

In this post I will introduce a couple of Arduino scripts and the accompanying circuitry needed to make a very simple Bluetooth joystick. The first script simply provides you with all the basic code needed to read from a simple PS2 style joystick. This script is then expanded to include the capability for joystick calibration. Calculated calibration values are saved to the micro-controllers EEPROM so that they can be automatically retrieved next time the hardware is connected.

**The Joystick Circuit**

Lets start by taking a look at the circuit (fig 1). All we really have going on here is the connection of the two joystick axes to two analog inputs. Additionally there is also a digital input tied to a momentary switch which is also tied to the positive power line. This means that the switch will read HIGH when it is not pressed and drop LOW when it is.

In terms of pin’s, the Bluetooth Mate connects directly to the Pro Mini thanks to the fact that they have been specifically [designed](https://www.sparkfun.com/products/12576 "Sparkfun - Bluetooth Mate") to do so.

[![Thumbstick Circuit](/wp-content/uploads/2014/03/Sharp-IR-Circuit.jpg)](/wp-content/uploads/2014/03/Sharp-IR-Circuit.jpg)

<span class="caption">Figure 1: The joystick circuit</span>

Finally we also have a Bluetooth Mate connected to the Arduino in order to provide serial communication. The joystick used can be found [here](http://www.coolcomponents.co.uk/thumb-joystick.html "Cool Components - Thumb Joystick"), and its accompanying breakout [here](http://www.coolcomponents.co.uk/breakout-board-for-thumb-joystick.html "Cool Components - Thumb Stick Breakout"). For more information on setting up your Bluetooth mate, be sure to check out my previous posting on [here](/journal/setting-up-a-bluesmirf-or-bluetooth-mate/ "Setting up a Bluetooth Mate").

**The Simple Joystick Script**

Ok now that’s out of the way lets move onto looking at the script needed for simple interface. First up we have the Arduino setup() function (code 1). In this case the setup function is used to pause the initialisation of the Arduino to afford enough time for the BluetoothMate to boot, and then open the serial port and set its data rate to 115200 bps. This rate was selected to reflect the default rate of the BluetoothMate, however can be customised to reflect your needs (see this post for more information).

```
void setup()
{
  // Delay to facilitate start up of Xbee usually about
  // 5 seconds. Comment out if using wired serial etc.
  delay(6000);
  // Initialise the serial port. 115200 is the default
  // baudrate of both the BluetoothMate & BlueSmirf
  Serial.begin(115200);
}
```

<span class="caption">Code 1: The setup() function</span>

Next we have the loop() method (code 2). This method simply polls both the analog ports (A0 and A1) which are connected to the joysticks potentiometers (axis x and y). Following this read, each of the values are then mapped to the a range of -100 to 100 using the Arduino [map](http://arduino.cc/en/reference/map#.Ux4HDIWaiVo "Arduino - Map Function") function.

In addition to the joystick axis the joystick also has a button that is actuated when the joystick is pressed down. to read this input we use a digitalRead. Note that as the button is wired high we need to invert the value using a “!” symbol.

```
void loop()
{
  // Read in the joystick x
  float x = analogRead(A0);
  // Read in the joystick y
  float y = analogRead(A1);
  // Read in the button press
  boolean p = !digitalRead(11);
  // Map the read in values to the
  // desired joystick range.
  x = map(x, 0, 1023, -100.0, 100.0);
  y = map(y, 0, 1023, -100.0, 100.0);
  // Output the data via serial
  outputSerialData();
}
```

<span class="caption">Code 2: The loop() function</span>

Finally we have the outputSerialData() method (code 3). All this method does is to print each mapped value (code 2) to the serial port separated by commas so that they can easily be parsed via a read script such as my [Unity3D Serialport Script](/journal/unity3d-serialport-script/ "Unity3D Serialport Script"). To this end I have also included a data identifier at the beginning of the output.

```
void outputSerialData()
{
  // Data identifier
  Serial.print("J"); Serial.print(",");
  // Joystick x
  Serial.print(x); Serial.print(",");
  // Joystick y
  Serial.print(y); Serial.print(",");
  // Button press and line return
  Serial.print(p); Serial.println();
}
```

<span class="caption">Code 3: The outputSerialData() function</span>

The full Simple Bluetooth Joystick script can be downloaded from [here](/wp-content/uploads/2014/03/Simple_Bluetooth_Joystick.zip "Simple_Bluetooth_Joystick.zip").

**Adding a calibration routine**

Adding calibration to script is done in a similar manner to that used within my [Calibrated LSM303 Tutorial](/journal/building-a-calibrated-tilt-compensated-compass-with-the-lsm303/ "Building a Calibrated Tilt Compensated Compass with the LSM303") In that we utilise the Arduinos to store and recall our calibration data. As with that tutorial we once again make use of the Arduino [EEPROM Write Anything](http://playground.arduino.cc/Code/EEPROMWriteAnything#.UyCzzoWaiVo "Arduino - EEPROM Write Anything") code base.

```
// Struct used to store our
// settings on the EEPROM
struct config_t
{
  float minX;
  float minY;
  float maxX;
  float maxY;
  boolean Calibrated;
  float cX;
  float cY;
}configuration;
```

<span class="caption">Code 4: The configuration struct</span>

First up we define a struct to contain our calibration data (code 4). The four floats (min and max) are used to store off the joystick’s limits, whilst the other two floats cX and cY are used to store the centre value of each axis. The remaining boolean value Calibrated is used to determine if the system is already calibrated or not.

```
// Read in data from the EEPROM
EEPROM_readAnything(0, configuration);
```

<span class="caption">Code 5: Reading from the EEPROM</span>

The struct is populated during the setup() method via loading data from the EEPROM by utilising the EEPROM\_readAnything method as shown in Code 5. More information on this method can be found via my aforementioned LSM303 tutorial. Everything else in the setup() method is essentially the same as within the simple joystick example.

```
void loop()
{
  if (stringComplete)
  {
    // Reset the system for further data
    stringComplete = false;  

    // If we are already calibrated then
    // restart the process. Otherwise
    // continue calibration process.
    if(configuration.Calibrated)
    {
      // Set the calibrated status to false
      configuration.Calibrated = false;
      Calibrating = 0;
    }
    else
    {
      // Inc the calibration to next step
      Calibrating = Calibrating + 1;
    }
  }

  // If we are not calibrated then calibrate
  // otherwise perform the calibration routine
  if(configuration.Calibrated) { playbackLoop(); }
  else { calibrationLoop(); }

  // Add a pause to make things easier to read
  delay(100);
}
```

<span class="caption">Code 6: The Update Loop, loop()</span>

The update loop() first checks if we have a serial signal and if so then increments the calibration process to the next step. If we are not already calibrating, this action instead begins the calibration process. Finally if no signal is received and we are not calibrating then the loop() calls the playbackLoop() (code 13) to output the calibrated joystick data. If we are calibrating then the calibrationLoop() function is called instead (code 7).

```
void calibrationLoop()
{
  switch(Calibrating)
    {
      case 0: clearEEPROM(); break;
      case 1: calibOneLoop(); break;
      case 2: calibTwoLoop(); break;
      case 3: saveEEPROM(); break;
    }
}
```

<span class="caption">Code 7: The Calibration Loop, calibrationLoop()</span>

The Calibration Loop (calibrationLoop()) simply consists of a switch statement that calls the specific method needed for the current stage of calibration as identified via the “Calibrating” property. This property is individually incremented at the completion of each step i.e calibOneLoop() sets Calibrating to 2 and so on (see code 8).

```
void calibOneLoop()
{
  // Tell the user what they need to do. First
  // we need to log the centeral x/y values of
  // the stationary joystick.
  Serial.println("Leave the stick centred");
  // Get the stationary values N (20) times and
  // then work out the average values.
  if(calibCountOne < 20)
  {
    // Get the x/y values
    configuration.cX = configuration.cX + analogRead(A0);
    configuration.cY = configuration.cY + analogRead(A1);
    // Update the iteration count
    calibCountOne = calibCountOne + 1;
  }
  else
  {
    configuration.cX = configuration.cX / 20;
    configuration.cY = configuration.cY / 20;

    Calibrating = 2;
    calibCountOne = 0;
  }
}
```

<span class="caption">Code 8: Calibration Step 1, Centring the Joystick</span>

The first calibration step is used to determine the central (x/y) positions of the joystick. In a perfect world these would both be 512, however unfortunately this is rarely if never the case. All this code does is take an average of 20 readings and then logs this to the configuration struct. Once done it then increments the calibration routine to the next step, calibTwoLoop(), Calculating the Joysticks Maximum and Minimum Limits (code 9).

```
void calibTwoLoop()
{
  Serial.println("Move the stick to the extremes");

  // Read in the joystick x
  float x = analogRead(A0);
  // Read in the joystick y
  float y = analogRead(A1);

  // Apply the x center offset
  x -= abs(512-configuration.cX);
  // Apply the y center offset
  y -= abs(512-configuration.cY);

  // map the read in values to the calibrated
  // joystick range
  x = map(x, 0, 1023, -100.0, 100.0);
  y = map(y, 0, 1023, -100.0, 100.0);

  configuration.minX = min(configuration.minX, x);
  configuration.minY = min(configuration.minY, y);

  configuration.maxX = max(configuration.maxX, x);
  configuration.maxY = max(configuration.maxY, y);

  Serial.print("MinX: ");
  Serial.print(configuration.minX);
  Serial.println();
  Serial.print("MaxX: ");
  Serial.print(configuration.maxX);
  Serial.println();
  Serial.print("MinY: ");
  Serial.print(configuration.minY);
  Serial.println();
  Serial.print("MaxY: ");
  Serial.print(configuration.maxY);
  Serial.println();
}
```

<span class="caption">Code 9: Calibration Step 2, Calculating the Joysticks Maximum and Minimum Limits</span>

The calculation of the limits is achieved by first using the stored centre values to determine the offset from the desired centre value of 512. It then maps the offset value onto a range of -100 to 100. Then using the Arduino [min](http://arduino.cc/en/Reference/min#.UyDp6oWaiVo "Arduino - Min Function") and [max](http://arduino.cc/en/Reference/Max#.UyDqYYWaiVo "Arduino - Max Function") functions calculates the minimum and maximum of against the last stored minimum and maximum values. If the current calculated value is smaller or larger than then the corresponding value is updated to reflect.

Whilst this is being done the function also prints to serial the current minimum and maximum values for both axies. This is so that you can tell when the limits have been reached. At this stage calibration can then be incremented via sending a print value to the micro-controller.

```
void saveEEPROM()
{
  Serial.println("Saving calibration data!");
  // Set calibration to calibrated
  configuration.Calibrated = true;
  // Save data to the EEPROM
  EEPROM_writeAnything(0, configuration);
  // Pause to ensure that the save has completed
  delay(500);
// Show some status
  Serial.println("Calibration data saved!");
  //Pause a little to make things easyer to read.
  delay(500);

  Calibrating = -1;
}
```

<span class="caption">Code 10: Calibration Step 3, Saving Data to the EEPROM</span>

The final stage of the calibration routine is to save the calculated data to the Arduinos EEPROM. This is achieved by again utilising the Arduino provided [Write Anything to EEPROM](http://playground.arduino.cc/Code/EEPROMWriteAnything#.UyDr4YWaiVp "Arduino - EEPROM Write Anything") code. If you compare the saveEEPROM() method with that found in my Calibrated [LSM303 Tutorial](/journal/building-a-calibrated-tilt-compensated-compass-with-the-lsm303/ "Building a Calibrated Tilt Compensated Compass with the LSM303"), you will find that both functions are exactly the same apart from the last line of code:

```
Calibrating = -1;
```

<span class="caption">Code 11: Update the current calibration step</span>

All this line of code does (11) is to reset the calibration process to before it began. In addition to the saveEEPROM() method the provided script also contains another method to clear any existing data from the EEPROM (code 12). Again the only difference between the functionality of the code and that of the LSM303 tutorial is the inclusion of a line to increment the the calibration routine (yes the properties are also different too). This time around however it tells the script to increment onto step 1 of the calibration process, calibOneLoop() (code 8).

```
void clearEEPROM()
{
   // Set the configuration store calibration to false.
   configuration.Calibrated = false;
   // Show some status
   Serial.println("Clearing calibration data!");
   // write a 0 to all 512 bytes of the EEPROM
   for (int i = 0; i < 512; i++) { EEPROM.write(i, 0); }
   // Show some status
   Serial.println("Calibration data cleared!");
   // Pause a little to make things easyer to read.
   delay(500);
   // Reset the center x and y values
   configuration.cX = 0;
   configuration.cY = 0;
   // Reset the maximum and minimum x/y
   // joystick values.
   configuration.minX = 0;
   configuration.minY = 0;
   configuration.maxX = 0;
   configuration.maxY = 0;
   // Inc calibration to the next step.
   Calibrating = 1;
}
```

<span class="caption">Code 12: The Clear Data from EEPROM Method, clearEEPROM()</span>

Finally, if the system boots and is seen as calibrated we have the aforementioned playbackLoop().

```
void playbackLoop()
{
  // Read in the joystick x
  float x = analogRead(A0);
  // Read in the joystick y
  float y = analogRead(A1);

  // Apply the x offset
  x -= abs(512-configuration.cX);
  // Apply the y offset
  y -= abs(512-configuration.cY);

  // Map the read in values to the calibrated
  // joystick range
  x = map(x, 0, 1023, -100.0, 100.0);
  y = map(y, 0, 1023, -100.0, 100.0);

  // Remap using the maximum and minimum x values
  if( x < 0) { x = map(x, configuration.minX, 0, -100, 0); }
  if( x > 0) { x = map(x, 0, configuration.maxX, 0, 100); }

  // Remap using the maximum and minimum y values
  if( y < 0) { y = map(y, configuration.minY, 0, -100, 0); }
  if( y > 0) { y = map(y, 0, configuration.maxY, 0, 100); }

  // Output the joystick data
  Serial.print("J,");
  Serial.print(x);
  Serial.print(",");
  Serial.print(y);
  // Send a line return
  Serial.println();
}
```

<span class="caption">Code 13: The playbackLoop()</span>

This method works exactly the same as the aforementioned calibTwoLoop() method, however with the application of two additional mappings (x/y). Essentially what this function does is take the -100 to 100 mapped value and then depending on weather it is above or below 0 remaps the value (0 to 100, above 0 or 0 to -100, below 0) utilising the calculated minimum and maximum values (code 9).

Both of the examples are available for download [here](/wp-content/uploads/2014/03/Simple_Bluetooth_Joystick.zip "Simple_Bluetooth_Joystick.zip") (simple) and [here](/wp-content/uploads/2014/03/Calibrated_Bluetooth_Joystick.zip "Calibrated_Bluetooth_Joystick.zip") (calibrated), and with that, that’s it for this post, enjoy 🙂