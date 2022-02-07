---
id: 256
title: 'Netduino Accelerometer Input Sample'
date: '2010-09-21T23:50:04+00:00'
author: batts
layout: post
guid: 'http://sandbox.dyadica.co.uk/?p=256'
#permalink: /2010/09/21/netduino-accelerometer-input-sample/
categories:
    - Microcontrollers
    - Tutorials
tags:
    - Accelerometer
    - Netduino
---

The following is a simple example detailing how to interface of a [Sparkfun ADXL 335](http://www.sparkfun.com/commerce/product_info.php?products_id=9269 "Sparkfun ADXL335") breakout board with a [Netduino](http://netduino.com/ "netduino.com"). Before you start, please ensure that your Netduino is running [firmware patch](http://forums.netduino.com/index.php?/topic/480-netduino-firmware-v410-patch-4/ "Netduino firmware patch") 2 or above. Without this you will not be able to obtain multiple analog inputs.

**About the ADXL335 Breakout**

The ADXL335 is a triple axis accelerometer with extremely low noise and power consumption – only 320uA! The sensor has a full sensing range of +/-3g. More information regarding the ADXL335 can be located via the following [data sheet](http://www.sparkfun.com/datasheets/Components/SMD/adxl335.pdf "ADXL335 Data Sheet - Sparkfun").

The Sparkfun Board comes fully assembled and tested with external components installed. The included 0.1uF capacitors set the bandwidth of each axis to 50Hz. Please note there is no on-board regulation, provided power should be between 1.8 and 3.6VDC.

**Wiring the ADXL335 to the Netduino**

The following table details how to wire up the ADXL335 to the Netduino. As you can see for this example I have decided to leave out the breakouts self test pin ST as it is not needed.

| **Netduino** | **Sparkfun ADXL335** |
|---|---|
|  |  |
| A0 | X |
| A1 | Y |
| A2 | Z |
| Gnd | GND |
| 3v3 | VCC |
| Aref | VCC |
|  | ST |

**On to the code.**

As you may expect as indicated from the above table, complex code is not needed to obtain acceleration values from the breakout. So lets take a look at it:

```
using System;
using System.Threading;
using Microsoft.SPOT;
using Microsoft.SPOT.Hardware;
using SecretLabs.NETMF.Hardware;
using SecretLabs.NETMF.Hardware.Netduino;

namespace Netduino_Accelerometer
{
public class Program
{

// Define our accelerometer inputs
static AnalogInput accX;
static AnalogInput accY;
static AnalogInput accZ;

public static void Main()
{
// Create the Inputs
accX = new AnalogInput(Pins.GPIO_PIN_A0);
accY = new AnalogInput(Pins.GPIO_PIN_A1);
accZ = new AnalogInput(Pins.GPIO_PIN_A2);

// Keep application alive via loop
while (true)
{
// Read data from the sensor
double x = (double)(accX.Read());
double y = (double)(accY.Read());
double z = (double)(accZ.Read());

// Output data to screen
Debug.Print("X: " + x + " Y: " + y + " Z: " + z);
}
}
}
}
```

As you can see there is not really much to explain. We use the default Netduino using statements, initialise the analog ports and then read from them. Simple eh!

Please remember that you need to set the deployment to USB and select the Netduino.

A download of the code is avaliable from [here](http://www.dyadica.net/wp-content/uploads/2010/10/Netduino_Accelerometer.zip "Netduino Accelerometer Sample"). Click [here](http://www.dyadica.net/forums/forum.php?id=7 "Forum for this posting") to visit the forum for this example.