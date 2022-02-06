---
id: 405
title: 'Ratchet &#038; Clank &#8211; Power Harness'
date: '2014-01-24T02:14:08+00:00'
author: batts
layout: post
guid: '/?p=405'
permalink: /2014/01/24/ratchet-clank-kit-power-harness/
image: /wp-content/uploads/2014/01/Servo-Distrib-Bot1-1-1568x883.jpg
categories:
    - Robotics
    - Tutorials
tags:
    - '3D Printed Robots'
    - 'Power Harness'
    - Ratchet
    - Robot
    - Servo
    - 'Servo Bot'
    - Tutorial
---

Today my attention turned towards a means of providing power for my servo based 3D printed robots, Ratchet &amp; Clank. In order to achieve this I first off defined a list of requirements that any potential solution must fulfil:

1. Separate power sources for both the servos and Arduino.
2. Can be turned on via a single switch.
3. Can power at least six servos.

Luckily the circuit turned out to be dead easy. All I needed to do was tie together both of the ground wires coming from the battery and then wire them to the switch. The switch then provides the ground source for to two male servo plugs. Each plug is also connected to one of each of the positive lines.

As a picture is worth a thousand words check out the following image.

[![The Power Harness Circuit](/wp-content/uploads/2014/01/Rachet-Power-Harness.png)](/wp-content/uploads/2014/01/Rachet-Power-Harness.png)

<span class="caption">Fig 1: The Power harness circuit.</span>

In my case, one of the servo plugs is then connected to the (optional) power header pin ports provided on the Arduino Pro (see featured image). However if you want to use a standard Arduino all you would need to do is replace one of the plugs with a compatible jack. The other plug is then connected to a custom built servo distributor board made using a 3 by 8 header pin connector with the positive (middle row) and negative pins (bottom row) all soldered together respectively. This means that when the plug is connected to one of the 8 columns positive and negative power connection is provided along the row (see fig 2).

[![Servo distributor bottom](/wp-content/uploads/2014/01/Servo-Distrib-Bot-300x168.jpg)](/wp-content/uploads/2014/01/Servo-Distrib-Bot.jpg)

<span class="caption">Fig 2: Bottom view of the servo distributor</span>

The result is 7 available powered connections. All we need to do to operate/control the servo is utilise the final row on the distributor, to connect the signal line of each servo to the Arduino. In order to make each signal line as accessible as possible, I broke each one out to both a male and female header pin (see fig 3).

[![Servo Distrib Top](/wp-content/uploads/2014/01/Servo-Distrib-Top-300x168.jpg)](/wp-content/uploads/2014/01/Servo-Distrib-Top.jpg)

<span class="caption">Fig 3: Top view of the servo distributor</span>

In order to test the system I then wired both an led and mini servo up to the distributor (see featured image). Once I was happy that everything was working ok, I then attached the harness and batteries to Ratchets main body.

[![Attached Harness Top](/wp-content/uploads/2014/01/WP_20140123_019-300x168.jpg)](/wp-content/uploads/2014/01/WP_20140123_019.jpg)

<span class="caption">Fig 4: Mounted to body, top</span>

[![Attached Harness Bottom](/wp-content/uploads/2014/01/WP_20140123_024-300x168.jpg)](/wp-content/uploads/2014/01/WP_20140123_024.jpg)

<span class="caption">Fig 5: Mounted to body, bottom</span>

Finally in order to really test the harness I then created a simple script that sends oscillating servo movement commands from the Arduino. The script is simply a clone of the Sweep Servo example that comes with the Arduino IDE, however expanded to cater for 4 Servos.

```
<pre class="brush: plain; title: ; notranslate" title="">

#include <Servo.h>

// create servo object to control a servo
// a maximum of eight servo objects can be created

Servo myservo1;
Servo myservo2;
Servo myservo3;
Servo myservo4;

// variable to store the servo position

int pos = 0;

void setup()
{
// attaches the servo on pin 9 to the servo object

myservo1.attach(9);
myservo2.attach(10);
myservo3.attach(11);
myservo4.attach(6);
}

void loop()
{
// goes from 0 degrees to 180 degrees in steps of 1 degree
// tell servo to go to position in variable 'pos'waits 15ms
// for the servo to reach the position goes from 180 degrees
// to 0 degrees

for(pos = 0; pos < 180; pos += 1)
{
myservo1.write(pos);
myservo2.write(pos);
myservo3.write(pos);
myservo4.write(pos);
delay(15);
}

for(pos = 180; pos>=1; pos-=1)
{
// tell servo to go to position in variable 'pos' waits 15ms
// for the servo to reach the position

myservo1.write(pos);
myservo2.write(pos);
myservo3.write(pos);
myservo4.write(pos);
delay(15);
}
}

```

<span class="caption">Code 1: Simple servo test script</span>

The following video shows the servos in action.

<div class="video-container"><iframe allowfullscreen="" frameborder="0" src="//www.youtube.com/embed/Zg94NeE75C0?rel=0"></iframe></div><span class="caption">Video 1: Servo test run</span>

As you can see all that I need to do is adjust the initial starting position of the servos on the final build and jobs a good un 🙂