---
id: 517
title: 'Sharp IR Servo Plug Tip'
date: '2014-02-11T00:17:37+00:00'
author: batts
layout: post
guid: '/?p=517'
#permalink: /2014/02/11/sharp-ir-servo-plug-tip/
image: /wp-content/uploads/2014/02/Sharp-IR-with-Servo-Plug1-1-1568x883.jpg
categories:
    - Tutorials
tags:
    - 'Proximity Sensor'
    - Servo
    - 'Sharp IR'
    - Tip
    - Tutorial
---

This post is really a tip rather than a tutorial. Within it I will demonstrate how I prepare sensors and components such as Sharp IR’s to be compatible with the [ServoBot Shield](/journal/the-servobot-shield/ "The ServoBot Shield"). Essentially all that’s really going on here is the fitting of servo plugs so that whatever component can easily be plugged into the shield, and then removed again if necessary.

I think that this is a really useful way of being able to connect sensors so that they can be changed as I see fit whilst also ensuring that the connections are secure.

[![Sharp IR Servo Wiring](/wp-content/uploads/2014/02/Sharp-IR-Servo-Wiring-1024x576.jpg)](/wp-content/uploads/2014/02/Sharp-IR-Servo-Wiring.jpg)

<span class="caption">Figure 1: Servo Connector Parts</span>

**Required Parts**

Figure 1 and bellow details all the parts needed to fit servo plugs to a Sharp IR.

1. A three pin JST connection cable
2. A servo plug and connection pin set.

I got my Servo Plugs from [Amazon](http://www.amazon.co.uk/BSP-Male-Servo-Connector-Plated/dp/B009NREFGG/ref=lh_ni_t?ie=UTF8&psc=1&smid=A1C3PBWHR7SYHW "Servo Plugs"), and my JST connection cables from [Cool Components](http://www.coolcomponents.co.uk/ir-range-sensor-connector-cable-5-inch.html "3 Pin JST at Cool Components").

[![Wire Connectors Attached](/wp-content/uploads/2014/02/Wire-Connectors-Attached-1024x576.jpg)](/wp-content/uploads/2014/02/Wire-Connectors-Attached.jpg)

<span class="caption">Figure 2: Cables with Crimped Connections</span>

The first thing you need to do is crimp the connectors that come with the servo plug onto each of the JST’s cables.

**Crimping the Connector Wires**

This is dead easy to do and simply consists of crimping down each connector with a standard pair of pliers. Once this has been done you then just slip each connector into the plugs casing.

[![Finished Servo Connector](/wp-content/uploads/2014/02/Finished-Servo-Connector-1024x576.jpg)](/wp-content/uploads/2014/02/Finished-Servo-Connector.jpg)

<span class="caption">Figure 3: The Completed Servo Plug  
</span>

**The Servo Wiring Convention**

All servo plugs are wired in a standard order so that they are compatible with each other.

This convention is: the Signal line, the Positive line and finally the Ground line when looking at the plug from the underside.

This can be seen in Figure 3 as White, Red and Black.

For those of you not in the know, a Sharp IR Sensor is a great little pre packaged distance sensor that can be used for basic obstacle avoidance and determining the distance to an object. If you would like to know more about these sensors and their theory of operation, check out my [Arduino and the Sharp IR Proximity Sensor ](/journal/arduino-and-sharp-ir-proximity-sensor "The Arduino and Sharp IR Proximity Sensor")post.