---
id: 158
title: 'Koothrappali and the Arduino Motor Shield'
date: '2012-03-18T23:07:48+00:00'
author: batts
layout: post
guid: 'http://sandbox.dyadica.co.uk/?p=158'
permalink: /2012/03/18/koothrappali-and-the-arduino-motor-shield/
image: /wp-content/uploads/2012/03/Koothrapalli13-1.jpg
categories:
    - Microcontrollers
    - Robotics
---

In today’s post I am going to kill two birds with one stone as so to speak. Primarily I plan to introduce the [Arduino Motor Shield R3](http://arduino.cc/en/Main/ArduinoMotorShieldR3 "The Arduino Motor Shield R3") and provide an accompanying tutorial, in turn also allowing opportunity to introduce you to my latest robot build, Koothrappali. After all, what better way to get to grips with a little code than with a practical example.

This post demonstrates the control of a Rover 5 Robot Platform via the use of an Arduino Pro and the Arduino Motor Shield R3. If you don’t have a Rover 5 or an Arduino Pro specifically, don’t worry as in theory the code can be used to control the shield with any variance of equivalents e.g. 2 DC motors and an Arduino Uno etc.

**The Arduino Motor Shield R3**

The Arduino Motor Shield lets you drive two DC motors with your Arduino board, controlling the speed and direction of each one independently. It also allows you to measure the motor current absorption of each motor.

The shield has two separate channels, called A and B, each or which can use up to 4 of the Arduino pins to drive and/or sense the motor. In total 8 of the Arduino’s pins are used by this shield. If steppers are more your thing, you can also combine A and B to drive one unipolar stepper motor.

One final thing to note about this shield is the addition of the SCL, SDA, IOREF and one other pin, reflective of the Arduino R3.

\[column span=”2″\]

![](/wp-content/uploads/2012/03/WP_000476-300x225.jpg "The Arduino Motor Shield R3")

<span class="caption">Fig 1: The Arduino Motor Shield R3</span>

\[/column\]

\[column span=”2″\]

![](/wp-content/uploads/2012/03/Motor-Shield-R3-Extra-Pins-300x225.jpg "Motor Shield R3 - Extra Pins")

<span class="caption">Fig 2: Motor Shield R3 – Extra Pins</span>

\[/column\]

You wont find these sockets on the Pro and/or older variants of the Arduino, however, don’t worry this doesn’t affect the boards functionality. The only potential issue you might have is a little physical obstruction but this can easily be resolved by either not pushing the shield fully onto the board or by trimming the pins.

**The Rover 5 Robot Platform**

The The Rover 5 is a great platform for tank based robots. The variant of the platform used in this tutorial (available [here](http://www.coolcomponents.co.uk/catalog/rover-robot-platform-p-653.html "Rover 5 from Cool Components")) uses 4 independent motors, each with an optical quadrature encoder and gearbox. The entire gearbox assembly can be rotated at 5 degree increments for different clearance configurations.

For more information check out the platforms manual [here.](http://www.sparkfun.com/datasheets/Robotics/Rover%205%20Introduction.pdf "The Rover 5 Platform")

The setting shown in the photos is that of the lowest clearance however as Koothrappali progress, I expect this to change. The base is very robust and is documented at weighing in at over 2.5 pounds without batteries.

The main features of the platform can be summarised as follows:

- Adjustable gear box angles
- 4 independent motors
- 4 independent optical encoders
- Thick rubber tank treads
- 6x AA battery holder
- 10Kg/cm stall torque per motor

**Wiring Rover 5 with the Arduino Motor Shield**

Wiring up the shield for rudimentary motor control is dead easy. All you need to do is attach an external power source to the +/- inputs of the shield (check your data sheets to ensure that you are using the required voltage for your motors) and then connect your motors, one to channel A and the other to channel B.

\[column span=”2″\]

![](/wp-content/uploads/2012/03/WP_000475-300x225.jpg "The Arduino Motor Shield - Wiring")

<span class="caption">Fig 3: The Arduino Motor Shield – Wiring</span>

\[/column\]

\[column span=”2″\]

![](/wp-content/uploads/2012/03/WP_000474-300x225.jpg "Arduino Motor Shield - Wiring 2")

<span class="caption">Fig 4: Arduino Motor Shield – Wiring 2</span>

\[/column\]

Polarity is shown on the board, however I had to reverse the positive and negative on one channel to ensure that the motors run in the same direction when the direction control pins are both set to HIGH (more on this when we get to the code). As the Rover 5 has 4 motors, you will need to wire two in parallel to each channel, ensuring that they are paired by side.

One anoying thing about the Rover 5 is that it comes with its own custom connectors attatched to each of the motors (which I hav’nt managed to track down a male for) Rather than cut off the connectors I decided to fashon my own. This was achieved by taking a 4pin header strip and removing the middle two pins.

\[column span=”2″\]

![](/wp-content/uploads/2012/03/WP_000457-300x225.jpg "WP_000457")

<span class="caption">Fig 5: Prep of 4pin header strip</span>

\[/column\]

\[column span=”2″\]

![](/wp-content/uploads/2012/03/WP_000465-300x225.jpg "WP_000465")

<span class="caption">Fig 6: The final connectors</span>

\[/column\]

All in all 2 pairs of 2 connectors were created and soldered together so that the motors could be attached to the shield in parallel. To see how this was achieved check out the photos above.

\[column span=”2″\]

[![](/wp-content/uploads/2012/03/MotorShield_R3_Back-300x234.jpg "MotorShield_R3_Back")](/wp-content/uploads/2012/03/MotorShield_R3_Back.jpg)

<span class="caption">Fig 7: The MotorShield R3 – Back</span>

\[/column\]

\[column span=”2″\]

One final item to mention in respect to wiring is that if you don’t need the shields brake and the current sensing abilities and/or you need more pins for your application. You can disable these features by cutting the respective jumpers on the back of the shield.

I haven’t done this in my setup, I have however cut the Vin jumper, thus removing capability for the Arduino to be powered via voltage from the shield.

\[/column\]

This results in all the power applied to the shield being used solely for the turning the motors.

**The Arduino Code**

As with the wiring, the basic code needed in order to run the motors is dead easy. Direction is simply handled by setting combinations of 2 pins to HIGH or LOW. Speed is controlled by using PWM on two further pins. The following table (as detailed at [Arduino.cc](http://arduino.cc/en/Main/ArduinoMotorShieldR3 "Arduino Moto rShield R3 At Arduino")) details the full pin assignment for the shield in terms of its interface with the Arduino.

| **Function** | **pins per Ch. A** | **pins per Ch. B** |
|:--|:-:|:-:|
| *Direction* | D12 | D13 |
| *PWM* | D3 | D11 |
| *Brake* | D9 | D8 |
| *Current Sensing* | A0 | A1 |

Drawing from this deffinition we can easily draw up a simple script to get things running. Using the above table lets start with the properties:

```
//PWM control for motor outputs 1 and 2 is on digital pin 3
int pwm_a = 3;
//PWM control for motor outputs 3 and 4 is on digital pin 11
int pwm_b = 11;

//direction control for motor outputs 1 and 2 is on digital pin 12
int dir_a = 12;
//direction control for motor outputs 3 and 4 is on digital pin 13
int dir_b = 13;

// break control for motor output 1 and 2 is on digital pin 9
int brk_a = 9;
// break control for motor output 3 and 4 is on digital pin 8
int brk_b = 8;
```

As you will be able to see, currently I have left out the current sensing definitions this time around, however I plan to detail their implementation in another post along with the wheel encoders etc, for now were just concentrating on getting things moving.

Next we need to set up the pins, this is done within the scripts setup function:

```
void setup()
{
  pinMode(pwm_a, OUTPUT);
  pinMode(pwm_b, OUTPUT);
  pinMode(dir_a, OUTPUT);
  pinMode(dir_b, OUTPUT);

  pinMode(brk_a, OUTPUT);
  pinMode(brk_b, OUTPUT);

  Serial.begin(9600);
}
```

I have also included initialisation for the serial for debug purposes. You may need to change the baud-rate here to reflect your setup. Next we are onto the loop. The following loop example demonstrates simple forward and backward motion and use of the breaks:

```
void loop()
{
  // First set the direction (in my setup FWD is LOW and BCK is HIGH)
  digitalWrite(dir_a, LOW);  //Set motor direction, 1 low, 2 high
  digitalWrite(dir_b, LOW);  //Set motor direction, 3 high, 4 low

  Serial.println("Direction Fwd");

  //set both motors to run at 100% duty cycle (fast)
  analogWrite(pwm_a, 255);
  analogWrite(pwm_b, 255);

  Serial.println("Full Speed");

  // We use a delay to define a period for the motors to run
  delay(2000);

  // Apply the breaks
  digitalWrite(brk_a, HIGH);
  digitalWrite(brk_b, HIGH);

  Serial.println("Break On");

  // Change the direction (in my setup FWD is LOW and BCK is HIGH)
  digitalWrite(dir_a, HIGH);  //Reverse motor direction, 1 high, 2 low
  digitalWrite(dir_b, HIGH);  //Reverse motor direction, 3 low, 4 high

  // Remove the breaks
  digitalWrite(brk_a, LOW);
  digitalWrite(brk_b, LOW);

  Serial.println("Break Off");
  Serial.println("Direction Bck");

  // Again use a delay to define a period for the motors to run
  delay(2000);
}
```

The above code will make the Rover 5 move forward of a period of 2000 then reverse for another 2000 period. Please not that we don’t have to use the breaks. If we want to stop the platform this can be achieved by setting the duty cycle to zero, however the break works instantly. By varying the value of duty cycle (0-255) we can vary the speed of the motors (0-100%).

In order to make the Rover 5 turn all we need to do is set each of the motors in opposing directions:

```
  digitalWrite(dir_a, HIGH);
  digitalWrite(dir_b, LOW);
```

That’s it really. In a future post I will expand upon this example to show you how to control your bot via use of a XBox360 Pad. Additionally I also plan to expand upon the example by detailing use of both current sensing and the wheel encoders.

But until then check out the following video to see the code in operation:

<iframe allowfullscreen="" class="youtube" frameborder="0" src="//www.youtube.com/embed/9O-PUO-3Gsg"></iframe>

The code for this post can be downloaded from [here](http://dl.dropbox.com/u/31617455/Motor_Shield_R3.zip "The Arduino Motor Shield R3 - Code").