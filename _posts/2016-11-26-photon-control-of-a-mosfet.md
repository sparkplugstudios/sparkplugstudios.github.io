---
id: 1844
title: 'Photon Control of a MOSFET'
date: '2016-11-26T22:40:33+00:00'
author: batts
layout: post
guid: '/?p=1844'
permalink: /2016/11/26/photon-control-of-a-mosfet/
image: /wp-content/uploads/2017/03/019-1-1568x882.jpg
categories:
    - Microcontrollers
    - particle.io
    - Tutorials
tags:
    - IOT
    - MOSFET
    - 'Motor Control'
    - Photon
    - Tutorial
---

This tutorial builds upon both the code base and circuitry as developed with the Particle.publish() and Particle.subscribe() [example](/blog/photon-publish-and-subscription-events/). This time around instead of registering a subscription that can be used to turn on or off an led we set one up to control a MOSFET.

[![](/wp-content/uploads/2017/03/017-1024x576.jpg)](http://localhost:81/wordpress/wp-content/uploads/2017/03/017-1.jpg)

<span class="caption">Figure 1: The completed system</span>

The result is a circuit which can be used to control high power devices such as motors and solenoids via an independent power source.

**What is a MOSFET**

A MOSFET or metal–oxide–semiconductor [field-effect transistor](https://en.wikipedia.org/wiki/Field-effect_transistor); is as the name suggests a special type of transistor that requires very little current to activate. This feature means that they are perfect for use with micro-controllers. A transistor itself is a 3 lead component that generally has 2 basic functions, to switch or to amplify. In this example we will be using one as a switch.

**How a MOSFET Works**

As stated a MOSFET has three leads. The Source lead is basically an input whilst the Drain lead is effectively an output. The Gate is a control pin that when activated switches the transistor and allows current to flow from the Source (in) to the Drain (out).

**An Overview of the Circuit**

The MOSFET is connected so that by default the high powered device is connected to V+ but not to ground (V-). The ground however is connected to the transistor’s drain. When the micro-controller sends a HIGH signal to the transistor’s gate; the transistor switches, (connecting the drain and source) and thus completes the circuit for the high powered device.

[![](/wp-content/uploads/2017/03/019-1024x576.jpg)](http://localhost:81/wordpress/wp-content/uploads/2017/03/019-1.jpg)

<span class="caption">Figure 2: The MOSFET circuit</span>

In addition to the aforementioned connections to the MOSFET the circuit also has a resistor (10K) that acts to hold the Gate low when the micro-controller does not send a HIGH signal. This is to prevent false readings caused by floating values on the pin.

**The Code**

The code for this example is almost exactly the same as that developed for the Particle.publish() and Particle.subscribe() example. The only real difference is the name of the event which has been changed to “mosToggle” rather than that of “ledToggle”.

Additionally all the property names such as those used for the pin references have also been updated. The actual functionality of the code however, remains the same.

**The Event Subscription Code**

The following code block outlines the setup of the program and the registration of the “mosToggle” event subscription.

\[gist id=”c5040c6a5f6cac533be6ab8936b29d0d” file=”MosfetSetup.ino”\]

<span class="caption">Code 1: The event subscription code</span>

The next block of code shows the subscription handlers construction. The handler is instantiated as part of the registration of the “mosToggle” event subscription.

\[gist id=”c5040c6a5f6cac533be6ab8936b29d0d” file=”MosfetHandler.ino”\]

<span class="caption">Code 2: The event subscription handler</span>

All this code does is set the mosfet pin (D3) to either HIGH or LOW depending upon the data received via the subscription.

**The Event Publish Code**

The next code block shows the main loop for the button input program. On each iteration of the loop; the value of the button input pin is read and the flag pressed is updated accordingly.

\[gist id=”c5040c6a5f6cac533be6ab8936b29d0d” file=”MosfetLoop.ino”\]

<span class="caption">Code 3: The event publish code</span>

The flag pressed is used so that only a single activation of either press or release is used to trigger the event call. What this means is that if a reading of LOW or HIGH is made and the value of pressed has already been set to reflect this state; nothing happens as the code just returns.

The full source code for this example can be found [here](https://gist.github.com/dyadica/c5040c6a5f6cac533be6ab8936b29d0d). A copy of this post published via the [IoST](http://aninternetofsoftthings.com) Project can be found [here](http://aninternetofsoftthings.com/blog/photon-control-of-a-mosfet/).