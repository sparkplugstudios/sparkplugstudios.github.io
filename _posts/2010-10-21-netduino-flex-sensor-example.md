---
id: 254
title: 'Netduino Flex Sensor Example'
date: '2010-10-21T23:47:47+00:00'
author: batts
layout: post
guid: 'http://sandbox.dyadica.co.uk/?p=254'
#permalink: /2010/10/21/netduino-flex-sensor-example/
categories:
    - Microcontrollers
    - Tutorials
tags:
    - 'Flex Sensor'
    - Netduino
    - Tutorial
---

Here we have another Netduino Sensor example. This time I am going to show you how to wire up a Spectra Symbol flex sensor as retailed by Sparkfun Electronics.

**About The Sensor**

As the sensor is flexed, the resistance across the sensor increases. Patented technology by Spectra Symbol – they claim these sensors were used in the original [Nintendo Power Glove](http://en.wikipedia.org/wiki/Power_Glove "The Nintendo Power Glove"). The resistance of the flex sensor changes when the metal pads are on the outside of the bend (text on inside of bend). For more information on the Flex Sensor used, check out the following [data sheet](http://www.active-robots.com/products/sensors/sparkfun/datasheets/forceflex/FlexSensor.pdf "Flex Sensor Datasheet").

**Wiring The Sensor To The Netduino**

Lets start by taking a look at the circuit. The circuit used is a plain [voltage divider](http://en.wikipedia.org/wiki/Voltage_divider "Voltage Divider"). It is used since we need to present a voltage to one of the Netduinos Analog In ports and the bend sensor merely changes resistance.

```
#region Netduino Flex Sensor Wiring
        /*
Flex Sensor
| |
__ 10k__| |_____
|        |       |
|        |       |
Gnd       A0  Vcc + Aref

       Swap the resistor value
to change scale. This can
then be range adjusted
*/
#endregion Netduino Flex Sensor Wiring
```

As the resistance of the bend sensor reduces (as a result of bending it into a convex shape) the voltage on A0 will go up towards 3v3. If the resistance of the bend sensor decreases (as a result of bending it in the opposite direction) the voltage on A0 will fall towards Gnd (0V).

I have also included the above ASCII art representation of the circuit in the [source](http://www.dyadica.net/wp-content/uploads/2010/10/Netduino_FlexSensor.zip "Netduino Flex Sensor Download") file.

**The Source Code**

As with the [Accelerometer](http://www.dyadica.net/journal/netduino-accelerometer-input-sample "Netduino Accelerometer Example") example there is not much to explain as far as the code goes. We use the default Netduino using statements, initialise the analog port and then read from it. Simple eh!

```
using System;
using System.Threading;
using Microsoft.SPOT;
using Microsoft.SPOT.Hardware;
using SecretLabs.NETMF.Hardware;
using SecretLabs.NETMF.Hardware.Netduino;

namespace Netduino_FlexSensor
{
public class Program
{
// Define our flex sensor input
static AnalogInput flex;

public static void Main()
{
// Create our input
flex = new AnalogInput(Pins.GPIO_PIN_A0);

// Set the input range
flex.SetRange(180, -180);

// Keep application alive via loop
while (true)
{
// Read data from the sensor
double f = (double)(flex.Read());
// Output data to screen
Debug.Print("Flex: " + f);
}
}
}
}
```

One major difference between the two examples is the inclusion of the SetRange(180,-180) function call. This is used to configure the range of the port so that the data more accurately reflects the physical bend of the sensor.

Please remember that you need to set the deployment to USB and select the Netduino.

The source code for this example is available for download from [here](http://www.dyadica.net/wp-content/uploads/2010/10/Netduino_FlexSensor.zip "Netduino Flex Sensor Download"). Click [here](http://www.dyadica.net/forums/forum.php?id=18 "Forum for this posting") to visit the forum for this example.