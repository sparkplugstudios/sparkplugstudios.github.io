---
title: 'Official Arduino Robot Compatible Servo Plugs'
date: '2015-03-30T20:20:06+00:00'
author: batts
layout: post
excerpt: In a previous post I demonstrated how to prepare sensors and components such as Sharp IR’s to be compatible with the servo plugs and the servo wiring convention

image: /wp-content/uploads/2017/11/Arduino-Robot-With-2-Sharp-IR-1024x576-1.jpg
thumb: /wp-content/uploads/2017/11/Arduino-Robot-With-2-Sharp-IR-1024x576-1-300x169.jpg

categories:
    - Microcontrollers
    - Robotics
    - Tutorials
tags:
    - 'Arduino Robot'
    - Tip
    - Tutorial
---

In a previous [post](/blog/sharp-ir-servo-plug-tip/ "Sharp IR Servo Plug Tip") I demonstrated how to prepare sensors and components such as Sharp IR’s to be compatible with the servo plugs and the servo wiring convention. This next step repeats that process, however amends the wiring order so that it is compatible with the Arduino Robot. This means that not only I will be able to use servo plugs to connect to the headers I previously added to the robot but also the white plastic ones included with the robot by default (without the need to source the required plugs).

Rather than repeat the process of describing how to put the connector together here, I will just describe the modified wiring convention. For more information regarding assembly etc, check out my [Sharp IR Servo Plug Tip](/blog/sharp-ir-servo-plug-tip/ "Sharp IR Servo Plug Tip") post.

[![TinkerKit Servo Plug](/wp-content/uploads/2014/02/TinkerKit-Servo-Plug-1024x576.jpg)](/wp-content/uploads/2014/02/TinkerKit-Servo-Plug.jpg)

<span class="caption">Figure 1: The Completed TinkerKit Cable</span>

**The TinkerKit Wiring Convention**

The [Arduino Robot](/blog/the-servobot-shield/ "The Arduino Robot") comes fitted with several headers that utilise the same wiring convention as Arduino [TinkerKit](http://www.tinkerkit.com/ "TinkerKit") connectors. The TinkerKit convention can be detailed as: the Positive line, the Signal line and then finally the Ground line. When looking at the plug from the underside (as shown in fig 1) this can be seen as Red, White and Black.

For those of you not in the know; the TinkerKit is essentially plug and play beginners Arduino and breakout set. It takes the concept of breakout boards one step further by turning the breakout or an equivalent component set into a module that can be simply plugged into a compatible main-board.

[![Arduino Robot With 2 Sharp IR](/wp-content/uploads/2014/02/Arduino-Robot-With-2-Sharp-IR-1024x576.jpg)](/wp-content/uploads/2014/02/Arduino-Robot-With-2-Sharp-IR.jpg)

<span class="caption">Figure 2: The Arduino Robot With Two Connected Sharp IR’s</span>

Figure 2 shows the finished IR sensors connected up to the robot. If you have followed the TinkerKit wiring convention as detailed above then you will need to plug in the connector in with the underside facing inwards. You will also need to make sure that you plug into one of the Robots Analog connections. For ref these are those labelled without the letter “D” in their naming i.e. TK0 to TK7