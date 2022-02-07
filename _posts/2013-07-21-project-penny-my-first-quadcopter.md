---
id: 74
title: 'Project Penny &#8211; My First Quadcopter'
date: '2013-07-21T21:46:22+00:00'
author: batts
layout: post
guid: 'http://sandbox.dyadica.co.uk/?p=74'
#permalink: /2013/07/21/project-penny-my-first-quadcopter/
image: /wp-content/uploads/2013/07/My-Quad1-1-1568x883.jpg
categories:
    - 'RC &amp; Drones'
tags:
    - Quad
    - Quadcopter
    - Quadrotor
---

Ever since I first saw a quadcopter a few years ago I wanted to have a go at building one. So slowly over the last year I have been collecting all the parts, with the idea that following the completion of my PhD, I would treat myself to putting one together.This week (with some much appreciated [help](http://diydrones.com/forum/topics/take-off-issues "DiyDrones - Take Off Issues")) I finally got around to getting my first quad build aka Project Penny finished and off the ground.

**What is a QuadCopter**

For those not in the know, a Quadcopter is in essence a rotary wing aircraft just like a helicopter; however unlike a helicopter, they use four propellers instead of one to provide lift and flight control. By varying the amount of power applied to each of the rotors you are able to control both speed and direction of flight.

[![Quad_1_3](/wp-content/uploads/2013/07/Quad_1_3.jpg)](/wp-content/uploads/2013/07/Quad_1_3.jpg)

Typically the configuration of the rotors is arranged with two turning clockwise and two counter-clockwise. This design provides an inherent level of stability as each motor pair counteracts the torque produced by the other in the same way a tail rotor does on a normal helicopter.

At the same time on-board electronics such as an Inertial Measurement Unit (IMU) works to keep the copter level and turn your input commands into the motions needed to fly. Additionally electronics afford some quads, like mine with the capability for pre-programmed and autonomous control.

**Putting One Together**

The good news is that QuadCopters are quick easy to build and there are lots of resources and communities (e.g. [Diy Drones](http://diydrones.com/ "DiyDrones")) out there to help you out in terms of both hardware assembly and software. Furthermore, all there is to a quads design is four motors each with a speed controller attached to both a control board and a power distribution board.

**Bill of Materials**

I made my quad with parts primarily bought from a supplyer here in the UK called [Cool Components](http://coolcomponents.co.uk "Cool Components"). The following shows an example bill of materials:

- [Quadcopter Power Distribution Board \* 1](http://www.coolcomponents.co.uk/catalog/quadcopter-power-distribution-board-assembled-p-978.html)
- [Electronic Speed Controller (20A) \* 4](http://www.coolcomponents.co.uk/catalog/electronic-speed-controller-p-716.html)
- [Brushless Motor 1000kV \* 4](http://www.coolcomponents.co.uk/catalog/brushless-motor-1000kv-p-669.html)
- [ArduPilot Mega 2.5+ Assembled (Cables enter from top) \* 1](http://www.coolcomponents.co.uk/catalog/ardupilot-mega-assembled-cables-enter-from-p-1160.html)
- [X650-V4 Quadcopter Frame-Kit \* 1](http://www.coolcomponents.co.uk/catalog/x650-quadcopter-frame-p-1125.html)
- [Propeller Set 12×4.5 \* 2](http://www.coolcomponents.co.uk/catalog/propeller-12x45-p-832.html)
- [Planet T5 2.4GHz – Radio Control Transmitter/Receiver (Mode II)](http://www.coolcomponents.co.uk/catalog/planet-24ghz-radio-control-transmitterreceiver-mode-p-910.html) \* 1

A Power Distribution Board (PDB) is a simple circuit board whose function is to distribute the power from a battery to the four Electronic Speed Controllers (ESC’s) that are used to power each of a quadcopter’s motors. I have also put together an assemble guide [here](/journal/the-3dr-power-distribution-board-assembly "Power Distribution Board Assembly").

An Electronic Speed Controller (ESC) is simply a brushless motor controller board with battery input and a three phase output for the motors. Additionaly ESC’s of this type also have a connection so that they can be connected to RC equipment and thus controlled via a PPM signal.

Brushless motors are similar to normal DC motors, however they can reach much higher speeds with less power usage. Brushless motors are more efficient as there is no power loss as with the brush-transition on the DC motors.

The ArduPilot Mega 2.5 is a complete open source autopilot system. It allows you to turn any fixed, rotary wing or multirotor vehicle (even cars and boats) into a fully autonomous vehicle; capable of performing programmed GPS missions with waypoints.

**Project Penny In Action**

The following playlist shows my first real day of flying (lots of take off and landing practice).

<div class="video-container"><iframe allowfullscreen="" frameborder="0" src="//www.youtube.com/embed/M9YGZkzLrwM?list=PL7uNkdkvLF2vkCDc11FhfGnGIbO_-j_OP"></iframe></div>With Penny now completed and up and flying I plan to start adding a few enhancements such as a First Person Video (FPV) system and a few additional sensors to aid with landing and obstical avoidance. I also plan to start on a new build, this time with a custom frame.

For more information and videos check out my facebook page [here](https://www.facebook.com/ADropInTheDigitalOcean "dyadica.co.uk on facebook").