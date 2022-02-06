---
id: 224
title: 'Arduino Xbee Shield mod for Netduino'
date: '2011-05-29T21:51:38+00:00'
author: batts
layout: post
guid: 'http://sandbox.dyadica.co.uk/?p=224'
permalink: /2011/05/29/arduino-xbee-shield-mod-for-netduino/
image: /wp-content/uploads/2011/06/WP_000600-1-1568x1176.jpg
categories:
    - Easy
    - Microcontrollers
    - Tutorials
tags:
    - Arduino
    - Netduino
    - 'Shield Mod'
    - Xbee
---

**Update:** For an alternative method check out the following post: [/blog/xbee-explorer-regulated-netduino](/blog/xbee-explorer-regulated-netduino "Xbee Explorer Regulated – Netduino")

This is a very quick post detailing how I modded my netduino to be compatible with the [arduino xbee shield](http://www.coolcomponents.co.uk/catalog/product_info.php?products_id=116 "arduino xbee shield"). I utilize this shield in conjunction with a Sparkfun [Xbee Explorer USB](http://www.coolcomponents.co.uk/catalog/product_info.php?products_id=243 "Xbee Explorer USB") to provide wireless serial communication between netduino and PC. To find out more about that check out my [SerialPortHelper to WinForm](http://www.dyadica.net/journal/netduino-serialporthelper-to-winform-and-xna "SerialPortHelper to WinForm and XNA") post.

The following image shows the completed mod in action.

The good news is that there is not much to this one, however some might find the thought off using a soldering iron on there netduino a bit scary. If this is you then there are always other [options](http://www.coolcomponents.co.uk/catalog/product_info.php?products_id=297 "Xbee Explorer Regulated").

In order to get the two boards to communicate you need to add six header pins to the square block situated at the end of the netduino (the 6 gold circles in two rows of three). I did this by attaching two strips of three cut from a [40 pin header row](http://www.coolcomponents.co.uk/catalog/product_info.php?cPath=48_49&products_id=241 "Header Row"). To see this in situe check out the following images.

![](/wp-content/uploads/2011/05/WP_000576-300x225.jpg "Header Pins")

<span class="caption">Fig 1: Header Pins</span>

![](/wp-content/uploads/2011/05/WP_000579-300x225.jpg "The Attached Pins")

<span class="caption">Fig 2: The Attached Pins</span>

Finally you need to ensure that both of the jumpers on the shield are set to XBee rather than USB. In order to do this set the jumpers so that they the two pins towards the interior of the board. To see this in situe check out the following image.

![](/wp-content/uploads/2011/05/WP_000592-300x225.jpg "Jumper Pin Positions")

<span class="caption">Fig 3: Jumper Pin Positions</span>

One slight disadvantage of the shield is that it covers the netduinos stack-able header power block. To rectify this I also fabricated two additional header (male/female) sets which can be interchanged depending upon my needs. Both are shown in the following images.

![](/wp-content/uploads/2011/05/WP_000585-300x225.jpg "Header Block Mod Male")

<span class="caption">Fig 4: Header Block Mod Male</span>

![](/wp-content/uploads/2011/05/WP_000588-300x225.jpg "Header Block Mod Female")

<span class="caption">Fig 5: Header Block Mod Female</span>

These headers enable me to still have access to those covered by the shield. For more information on the shield check out the ArduinoXbeeShield page [here](http://www.arduino.cc/en/Main/ArduinoXbeeShield "ArduinoXbeeShield").