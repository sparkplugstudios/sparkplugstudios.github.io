---
id: 51
title: 'The 3DR Power Distribution Board &#038; Assembly'
date: '2013-07-22T22:27:05+00:00'
author: batts
layout: post
guid: 'http://sandbox.dyadica.co.uk/?p=51'
#permalink: /2013/07/22/the-3dr-power-distribution-board-assembly/
image: /wp-content/uploads/2013/07/WP_20130327_0281-1.jpg
categories:
    - 'RC &amp; Drones'
tags:
    - Quad
    - Quadcopter
    - Tutorial
---

A Power Distribution Board (PDB) is a simple circuit board who’s function is to distribute the power from a battery to the four Electronic Speed Controllers (ESC’s) that are used to power each of a quadcopter’s motors. For my quad build Penny, I opted for a PDB made by 3DR.

My rationale for this decision is that unlike other PDB’s the 3DR board design includes connection heads for each of the ESC’s servo headers ultimately resulting in a single plug connection that can be used to connect the ESC’s to the main control board (in my case an Ardupilot Mega 2.5) and also one which can be used to power it too.

[![Drilled Board](/wp-content/uploads/2013/03/WP_20130327_010-1024x614.jpg)](/wp-content/uploads/2013/03/WP_20130327_010.jpg)

<span class="caption">Fig 1: Drilled board and carbon fiber template</span>

In order to make the PDB compatible with my frame, I first had to drill four holes so that it was compatible with the frames mountings. To do this I used the carbon fiber square electronics mount which came with the kit as a template.

When modifying a circuit board in this manner it is important to ensure that the modification will not damage the board i.e. cut any of the tracings etc. Fortunately the board layout and schematics are  
freely available for [download](http://stuff.storediydrones.com/Power_Distribution_Board.rar "Power Distribution Board") allowing me to check that my planned modification was good to go. With this done I then started to put the board together via following the official 9 step guide which can be found [here](http://stuff.storediydrones.com/ArduCopter3DRAssemblyInstructions "Assembly Instructions") and shown below.

**Power Distribution Board Assembly**

First solder the thin gauge red &amp; black wire to “GND” and “5V OUT” on the bottom side of the PDB labeled “This Side Down”. Next solder the four wire connector to the motor signals starting with the green wire on the edge of the connector to M1 on the PDB. Work your way down the connector soldering the wires in order. Orange to M2, White to M3, and Yellow to M4.

[![Step 1](/wp-content/uploads/2013/03/WP_20130327_014-1024x614.jpg)](/wp-content/uploads/2013/03/WP_20130327_014.jpg)

<span class="caption">Fig 2: Step 1</span>

Flip the PDB over and slide the motor 4 pin cable and the power 2 pin cable through the hole in the center of the board. Solder the 3 pin headers to the outermost through-hole pads along the perimeter of the PDB. Whenever I’m soldering parts like this I always hold them in place using bluetack. This makes things a whole lot easier!

[![Step 2](/wp-content/uploads/2013/03/WP_20130327_023-1024x614.jpg)](/wp-content/uploads/2013/03/WP_20130327_023.jpg)

<span class="caption">Fig 3: Step 2</span>

Next, strip Both ends of the 10AWG wire about 0.2in/5mm. Solder the wires to the positive and negative female leads of a male Deans connector or a male XT-60 connector (Both supplied in the kit). Then slide a piece of heat shrink over the exposed connector leads and apply heat to shrink. Solder the stripped ends of the 10AWG cable to the large holes in the center of the PDB labeled “+” and “–”. Remember red is positive and black is negative.

[![Close up of Holes](/wp-content/uploads/2013/03/WP_20130327_018-1024x614.jpg)](/wp-content/uploads/2013/03/WP_20130327_018.jpg)

<span class="caption">Fig 4: Close up of Holes</span>

Solder female Deans or your preferred connector to the +/– pads along the perimeter of the PDB. This is where the black and red wires of your ESC will plug-in. A nice tip here is to hold the connector in place with blue-tack and then hold your soldering iron against the underside of the Dean’s tag you are connecting.

[![Deans Connectors Added](/wp-content/uploads/2013/03/WP_20130327_025-1024x614.jpg)](/wp-content/uploads/2013/03/WP_20130327_025.jpg)

<span class="caption">Fig 5: Deans Connectors Added</span>

Let it heat up a little and then apply solder via to the top corner of the tag where it touches the board. This causes the solder to flow around the tag and results in a good bond. It took me a couple of attempts to get that right!

[![Mounting to frame](/wp-content/uploads/2013/03/WP_20130327_033-1024x614.jpg)](/wp-content/uploads/2013/03/WP_20130327_033.jpg)

<span class="caption">Fig 6: Mounting to frame</span>

That’s it your board should now be completed and ready to mount to your frame, however its a good idea to test your connections before you do this.