---
id: 1853
title: 'Capacitive Sensor Development Board'
date: '2015-07-20T22:36:45+00:00'
author: batts
layout: post
excerpt: "This tutorial details how to make a simple breakout for the Arduino CapacitiveSensor library. The library turns two or more pins of an Arduino pins into a capacitive"
#permalink: /2015/07/20/capacitive-sensor-development-board/
image: /wp-content/uploads/2017/10/019-1-1568x882.jpg
thumb: /wp-content/uploads/2017/10/019-1-1568x882.jpg
categories:
    - Microcontrollers
    - Tutorials
tags:
    - Arduino
    - 'Capacitive Touch'
    - Sensors
---

This tutorial details how to make a simple breakout for the [Arduino CapacitiveSensor library](http://playground.arduino.cc/Main/CapacitiveSensor?from=Main.CapSense). The library turns two or more pins of an Arduino pins into a capacitive sensor which can then be used to sense the electrical capacitance of the human body.

[![019](/wp-content/uploads/2017/10/019-1024x576.jpg)](/wp-content/uploads/2017/10/019-1.jpg)

The above image shows the final product; a sensor breakout capable of handling up-to six soft textile contacts.

**Bill of Materials**

In order to build the above breakout you will need the following components:

1. Six 1000 kohm resistors
2. Some wire
3. Male and Female header strips each 11 pins in length
4. A single header pin
5. Adafruit Perma-Proto (Quater size)

 **Putting it Together**

First; remove every other header from each of the header strips using a pair of pliers. This will result in a strip with six pins remaining as shown in figure 2. Make sure you start removing at pin 2. Once complete, repeat the process with the other strip. Again make sure you start at pin 2.

[![005](/wp-content/uploads/2017/10/005-1-1024x576.jpg)](/wp-content/uploads/2017/10/005-1-1.jpg)

Next, layout each of the resistors on the breadboard so that there is a gap of 1 row between each and so that all of them connect to one of the boards negative lines. Use some blue-tack to hold them in place and then solder to the board.

[![006](/wp-content/uploads/2017/10/006-1024x576.jpg)](/wp-content/uploads/2017/10/006-1.jpg)

At the same time also add a strip of wire to the final row instead of a resistor as shown in the above image (figure 3).

Once the resistors and wires are soldered in place; next add both the header rows so that each pin lines up with one of the resistors. Make sure that the male row is situated between both the resistors and the female row. Once soldered into place you should have something that looks like the following image (figure 4).

[![017](/wp-content/uploads/2017/10/017-1024x576.jpg)](/wp-content/uploads/2017/10/017-1.jpg)

Finally add the single header pin to the column with the wire attached as shown above (figure 4). Once soldered into place this pin will become the shared connection line for all of our attached sensor contacts. This is possible because we are using the negative line of the proto-board to share the connection, not supply negative power!

That’s it for the build process; next lets have a look at the Arduino code needed to utilise the sensor breakout.

**The Capacitive Sensing Library**

The Arduino environment can be extended through the use of libraries, just like most programming platforms. Libraries provide extra functionality for use in sketches, e.g. working with hardware or manipulating data. A number of libraries come installed with the IDE, but you can also download or create your own.

To make use of this breakout we need to download a library from the Arduino web site called the [Capacitive Sensing Library](http://playground.arduino.cc/Main/CapacitiveSensor?from=Main.CapSense). Once downloaded the library can be installed by following the standard library installation instructions which can be found [here](https://www.arduino.cc/en/guide/libraries).

For this tutorial I am just going to skip directly to the code, however Information on how the library works and its features can also be found via the [download page](http://playground.arduino.cc/Main/CapacitiveSensor?from=Main.CapSense). So if you want some more information I highly recommend that you check it out.

**The Arduino Code**

Thanks to the Capacitive Sensing Library the code for the breakout is dead simple. Therefore, rather than giving an in depth description on how everything works I have commented the code so that you can follow along. All you need to do to get the sensor up and running is to upload the following sketch to your Arduino and then connect the following pins (one to each female header slot) 2,3,4,5,6,7 and finally pin 12 to the single header.

<script src="https://gist.github.com/dyadica/0195fc01473347b58390.js"></script>

Once uploaded the sketch will output six values to the serial monitor. When you touch any of the male header pins the value of the pin will change to show the capacitance of the touch. You can change the value of the threshold to make the sensor more sensitive. Finally; each time the threshold is exceeded the LED on board the Arduino will light up to show that a touch has been detected. A copy of this post published via the [IoST](http://aninternetofsoftthings.com) Project can be found [here](http://aninternetofsoftthings.com/blog/capacitive-sensor-development-board//).