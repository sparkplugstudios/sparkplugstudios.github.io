---
id: 258
title: 'Netduino &#8211; Serial Communication'
date: '2010-08-24T23:51:45+00:00'
author: batts
layout: post
guid: 'http://sandbox.dyadica.co.uk/?p=258'
permalink: /2010/08/24/netduino-serial-communication/
categories:
    - Microcontrollers
    - Tutorials
tags:
    - Netduino
    - serial
    - 'Serial Communication'
---

**Update:** *check out my [netduino-serialporthelper-to-winform-and-xna](http://www.dyadica.net/journal/netduino-serialporthelper-to-winform-and-xna "netduino-serialporthelper-to-winform-and-xna") post – based on code provided by hari over at the Netduino forums its a much better way to do it!*

The following details simple 2 way Communication with a Windows Forms App – Rudimentary packet handling has been implemented via inclusion of an additional byte to the beginning of the packet which details the length of the string to be sent to the Netduino.

Once received the device filters the incoming data and recreates the string. A simple switch statement is then used to trigger functionality. To see it in action, check out the featured video.

The source is available via the following thread over at [netduino.com](http://forums.netduino.com/index.php?/topic/198-computer-netduino-integration/ "netduino.com"). As you will be able to see from the thread I plan to integrate some form of wireless communication soon (after next pay day). I was originally thinking of a Bluetooth solution but am slowly being swayed towards that of the XBee as suggested by PaulS.

Whilst I am awaiting on some needed funds my next task is going to be …. Wiimote Vision!!! check back soon for more info. Click [here](http://www.dyadica.net/forums/forum.php?id=2 "Forum for this posting") to visit the forum for this example.