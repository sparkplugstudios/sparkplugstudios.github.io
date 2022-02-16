---
title: 'A Circuit-python Library for the PAA5100JE'
date: '2022-02-15'
author: batts
layout: post
excerpt: "I've recently been playing around with the Feather RP2040 board for a new project. In order to use a PAA5100JE sensor with the board I needed to port"

image: /wp-content/uploads/2022/02/16/PA5100EJ_Breadboard_3.jpg
thumb: '/wp-content/uploads/2022/02/16/PA5100EJ_Breadboard_3.jpg'

categories: 
    - Microcontrollers
    - Tutorials
tags:
    - RP2040
    - Tutorial
---

I've recently been playing around with several [RP2040 boards](https://www.tomshardware.com/uk/best-picks/best-rp2040-boards) as a means of investigating the [RP2040](https://www.raspberrypi.com/documentation/microcontrollers/rp2040.html) as a potential platform for a new project. However as the RP2040 itself is still fairly new, there is not a great amount of compatible libraries for existing sensors and breakouts yet. 

[![](/wp-content/uploads/2022/02/16/PA5100EJ_Breadboard_1.jpg)](wp-content\uploads\2022\02\16\PA5100EJ_Breadboard_1.jpg)
<span class="caption">Figure 1: The PAA5100EJ connected to a Feather RP2040</span>

The libraries do exist; just for other platforms such as [Arduino](https://www.arduino.cc/) and [Raspberry PI](https://www.raspberrypi.com/). The [PAA5100JE optical flow sensor](https://shop.pimoroni.com/products/paa5100je-optical-tracking-spi-breakout) is one such sensor; more importantly, its also a sensor I want to use for the aforementioned project. With all this in mind; the only thing for it, was to have a go a porting the existing python library for the PAA5100EJ developed by [Pimoroni](https://github.com/pimoroni/pmw3901-python). The way I look at it is this; hey as I'm a complete noob when it comes to all things python, what better way to get my feet wet! 

Luckily the port was successful and the following post outlines how you can use the code in your own projects. It also highlights some of the discoveries and decisions that I made along the way.

## Prerequisites

Before you can use the port I came up with you will need to ensure you have several prerequisites. Assuming you already have a CircuitPython installation; you will also need to install the [Adafruit_Circuit_BusDevice library](https://github.com/adafruit/Adafruit_CircuitPython_BusDevice). This library can be located via the previous link or installed via the following pip command:

```
pip3 install adafruit-circuitpython-busdevice
```

## Installing the code

The repo contains two circuit-python files: code.py and pa55100ej.py. For those familiar with Arduino; the code.py file is the equivalent to an arduino sketch file in that it is where you put your main code that you want to run. Similarly pa55100ej.py is like an Arduino library called by the main code.py file. 

[![](/wp-content/uploads/2022/02/16/file_structure_paa5100je.png)](wp-content\uploads\2022\02\16\file_structure_paa5100je.png)
<span class="caption">Figure 2: Installation setup and file structure</span>

All you need to do is place the file paa5100ej.py in your designated library location and the file code.py in its required location; usually the root of the circuit-python [drive](https://learn.adafruit.com/welcome-to-circuitpython/the-circuitpy-drive). Figure: 2 shows my installation setup and file structure within the [Thonny](https://thonny.org/) IDE. The lib directory contains the  [Adafruit_Circuit_BusDevice library](https://github.com/adafruit/Adafruit_CircuitPython_BusDevice) library detailed in [prerequisites](#prerequisites). 

Additionally I have also two neopixel libs in there because I am using a [Feather RP2040](https://learn.adafruit.com/adafruit-feather-rp2040-pico) board which has an on-board neopixel which annoyingly I need to turn off at every boot. If you don't have such a board i.e. you are using a pi [pico](https://shop.pimoroni.com/products/raspberry-pi-pico?variant=32402092294227) then you wont need these libraries. 

## Using the code

With the installation/setup complete; lets move on to setting up the circuit and also having a look at the code itself.

### A look at the circuit

First up we connect the sensor to the micro-controller. As I am using the Feather RP2040 I use the connections shown in Code: 0. These will be similar for whichever RP2040 board you use. Just make sure to check your boards corresponding pin diagram. 

```
3-5V - 3.3V
CS - D4
SCK - SCK
MOSI - MO
MISO - MI
INT - 
GND - GND
```
<span class="caption">Code 0: The sensor to Feather RP2040 connections</span>

With the connections made lets move onto having a look at the code.

### A breakdown of code.py

The only code you really need to worry about in order to get things working in your own application is that found within code.py. To this end this section takes a look at the file in detail. 

First off we import all the libraries/modules that we will need. These are:

The [board](https://circuitpython.readthedocs.io/en/latest/shared-bindings/board/index.html#module-board) module; which contains constants for the pins on the specific board we are using. The [busio](https://circuitpython.readthedocs.io/en/latest/shared-bindings/busio/) module which contains classes to support a variety of serial protocols such as SPI and I2C. The [digitalio](https://circuitpython.readthedocs.io/en/latest/shared-bindings/digitalio/index.html#module-digitalio) module to provide access to the boards pins. The [time](https://circuitpython.readthedocs.io/en/latest/shared-bindings/time/index.html) module to allow for use of time and timing related functions. Finally we include the pa55100ej library to allow us to interface with the pa55100ej sensor using [SPI](https://learn.adafruit.com/circuitpython-basics-i2c-and-spi/spi-devices).

```
import board
import busio
import digitalio
import time
import paa5100ej
```
<span class="caption">Code 1: code.py module/library imports</span>

Once we have imported all the required modules/libraries we then create a reference to the boards SPI hardware bus. This is then passed to the paa5100ej library where it is used to create a new SPIDevice using the [SPIDevice Library](https://github.com/adafruit/Adafruit_CircuitPython_BusDevice). 

```
spi = board.SPI()
cs = digitalio.DigitalInOut(board.D4)
cs.direction = digitalio.Direction.OUTPUT
```
<span class="caption">Code 2: the SPI and CS definitions</span>

In addition to the boards SPI configuration a custom chip select pin is also passed to the class. The CS pin is one which can be toggled to tell the chip that it should listen and/or respond to requests on the SPI bus. This toggle can be [controlled manually](https://learn.adafruit.com/circuitpython-basics-i2c-and-spi/spi-devices#max31855-spi-thermocouple-temperature-sensor-2837737-1) by code; however by using the [SPIDevice Library](https://github.com/adafruit/Adafruit_CircuitPython_BusDevice) this is handled for us automatically. More Information on the library can be found [here](https://circuitpython.readthedocs.io/projects/busdevice/en/latest/_modules/adafruit_bus_device/spi_device.html) and [here](https://learn.adafruit.com/circuitpython-basics-i2c-and-spi/spi-devices#spidevice-library-2837757-21.)

```
oflow = paa5100ej.PAA5100EJ(spi, cs)
oflow.set_led_state(True)
oflow.set_rotation(0)
```
<span class="caption">Code 3: Initialising the PAA5100EJ</span>

Next we initialise and make a reference to the paa5100ej class. As we do so we pass to it both the aforementioned references to the SPI and CS pins. The class then utilises this information to create a new SPIDevice that handles the SPI interface and allows us to communicate with the sensor.

Finally we create two properties to store any movement outputted from sensor in both the x and y direction. These properties are updated each loop of the main class as a means of storing the cumulative movement detected by the sensor. With our setup complete lets move onto the main loop.

```
tx = 0
ty = 0
```
<span class="caption">Code 4: The tx, ty properties</span>

 Here we can see that our program is kept alive via the use of a while true statement. On each iteration of the loop a call is made to the pa55100ej class via the oflow.get_motion() function. Any iteration where no data is available is accounted for via wrapping the call in a try. A caught exception causes the loop to continue. If data is received this is assigned to the x and y variables which are in turn used to update the values of tx and ty.

```
while True:
    
    try:
        x, y = oflow.get_motion()
    except RuntimeError:
        continue
        
    tx += x
    ty += y
    
    print("Motion: {:03d} {:03d} x: {:03d} y {:03d}".format(x, y, tx, ty))
    time.sleep(0.01)
```
<span class="caption">Code 5: The update loop</span>

A print command is then used to output the data to the console and/or serial. The command applies simple formatting so that each value is shown to 3 decimal places. Finally we then use a [time.sleep()](https://circuitpython.readthedocs.io/en/latest/shared-bindings/time/) command to provide a pause and to slow things down for brevity.

### A look pa55100ej.py

The pa55100ej.py is almost a direct port of the [Pimoroni](https://github.com/pimoroni/pmw3901-python) PMW3901/PAA5100EJ sensor library. The main changes are around the structure of both the data read and write commands. Within each of these I had to convert the [spi_dev.xfer2()](https://pypi.org/project/spidev/) method to one that is available within circuit-python. 

```
def _write(self, register, value):
    GPIO.output(self.spi_cs_gpio, 0)
    self.spi_dev.xfer2([register | 0x80, value])
    GPIO.output(self.spi_cs_gpio, 1)
```
<span class="caption">Code 6: The original write method</span>

For the write this was easily achieved by wrapping the register and value to be called correctly within a bytearray and passing it via [spi.write()](https://pypi.org/project/spidev/). The other key thing to note here when comparing the two code blocks (6,7) is the lack of commands required to toggle the CS pin within block 7. As indicated this is thanks to the [SPIDevice](https://github.com/adafruit/Adafruit_CircuitPython_BusDevice) library which is handling this for us.

```
def _write_to_reg(self, reg, val):
    with self.spi_device as spi:
        spi.write(bytearray([reg | 0x80, val]))
```
<span class="caption">Code 6: The circuit-python write method</span>

The read command was a little more difficult; my investigations resulted in two methods based around [spi.readinto()](https://circuitpython.readthedocs.io/en/1.0.0/docs/library/machine.SPI.html#machine.SPI.readinto) and [spi.write_readinto()](https://circuitpython.readthedocs.io/en/1.0.0/docs/library/machine.SPI.html#machine.SPI.write_readinto). 

```
 def _read(self, register, length=1):
    result = []
    for x in range(length):
        GPIO.output(self.spi_cs_gpio, 0)
        value = self.spi_dev.xfer2([register + x, 0])
        GPIO.output(self.spi_cs_gpio, 1)
        result.append(value[1])
```
<span class="caption">Code 7: The original read method</span>

The latter is the one needed within the script to replace the original spi_dev.xfer2() call within the _read() method of Pimoroni code (7).

```
def _read(self, register, length=1):
    result = []
    with self.spi_device as spi:
        for x in range(length):
            val = bytearray(2)
            cmd = bytearray(2)
            cmd[0] = register+x
            cmd[1] = 0
            spi.write_readinto(cmd, val)
            result.append(val[1])

        if length == 1:
            return result[0]
        else:
            return result
```
<span class="caption">Code 7: circuit-python read method</span>

In order to get the code to function properly I had to break it down into parts. There is probably a more efficient means of doing this; but hey I'm new to the language. I must note that my inspiration/motivation for this came from [this post](https://forum.micropython.org/viewtopic.php?t=6720) over on the [micropython.org](https://forum.micropython.org/) forums. This little nuget of information was the glue that brought everything together.

```
def _register_read(self, register, length=1):
    with self.spi_device as spi:
        spi.write(bytearray([register]))
        result = bytearray(length)
        spi.readinto(result)
        return result
```
<span class="caption">Code 8: circuit-python readinto() method</span>

For completeness code: 8 shows the spi.readinto() method. This may be useful in the future when I once again attempt a similar undertaking. The method first performs a write to a specific register (register) and then reads into a bytearry (result) of a set length (length). 

A quick look at the [documentation](https://circuitpython.readthedocs.io/en/1.0.0/docs/library/machine.SPI.html#machine.SPI.readinto) suggests there is no need for a separate write command and this could be amended as shown in Code 9; however I haven't tested this yet! TBH I missed it when I wrote the code (hey im a python and circuit-python noob remember!).

```
def _register_read(self, register, length=1):
    with self.spi_device as spi:
        result = bytearray(length)
        spi.readinto(result, register)
```      
<span class="caption">Code 9: circuit-python readinto() amended</span>

The final differences between my code and its Pimoroni python counterpart are around the register initialisation code. Firstly I removed the register code required to use the library with a PMW3901 sensor. This however can easily be added back in. Thanks to my having separated each of the initialisation calls into chunks:

```
self._init_registers_secret()
self._init_registers()
self._init_registers_led()
```
<span class="caption">Code 10: Initialisation of registers</span>

All you would need to do is swap out the register values defined within the _init_registers() method with those that can be found within the Pimoroni [pmw3901 class](https://github.com/pimoroni/pmw3901-python/blob/master/library/pmw3901/__init__.py).

Secondarily is the inclusion of a method to toggle the state of the sensors onboard led's (Code: 11). All this method does is to write a differing value to register 0x6f in order to toggle the lights on or off. I also broke out the led initialisation into its own method (see Code: 10) so that functionality can be controlled upon initialisation. The register and values and code for the led toggle call were located via [this](https://github.com/pimoroni/pmw3901-python/issues/4) issues post.

```
def set_led_state(self, state=False):
    if state == True:
        self._bulk_write([
        "WAIT", 0xF0,
        0x7f, 0x14,
        0x6f, 0x1c,
        0x7f, 0x00
        ])
    else:
        self._bulk_write([
        "WAIT", 0xF0,
        0x7f, 0x14,
        0x6f, 0x00,
        0x7f, 0x00
        ])  
```
<span class="caption">Code 11: The set_led_state() method</span>

And thats it. Hopefully there is enough there to enable you to use the library with your own PA55100JE and Circuit-python implementations. If all goes well when you play the code you should end up with some glaring lights like those shown in Figure: 3. Additionally a stream of data will be present via serial!

[![](/wp-content/uploads/2022/02/16/PA5100EJ_Breadboard_3.jpg)](wp-content\uploads\2022\02\16\PA5100EJ_Breadboard_3.jpg)
<span class="caption">Figure 3: The working circuit</span>

As always if you need any more info I can be contacted by the socials. Your best option would be to open an issue [here](https://github.com/dyadica/CircuitPython_PAA5100EJ/issues). As I progress with the building of this Github Pages site I aim to implement comments via use of [utterances](https://github.com/utterance/utterances) so eventually your comments/questions may also show up here.

As a final note; i don't think i will ever get used to not having to terminate statements :)

## Updates 

NB: Since completing the library I discoverd an official Pico one for Micropython by Pimoroni so that may be a better option for you? This can be found [here](https://github.com/pimoroni/pimoroni-pico) Although it looks like there may be a few more hoops that will need to be jumped through to get things up and going etc (see their readme for more details).

I have also updated the github repository to include the capability for the initialisation of the registers for a [PWM3901](https://shop.pimoroni.com/products/pmw3901-optical-flow-sensor-breakout?gclid=Cj0KCQiA3rKQBhCNARIsACUEW_aDZc6ulsw7lHFtcrIbFqpdlcpFvTXiSOc_mqWW9tgec9aBjIiicsYaAsAOEALw_wcB) sensor. To swap between the PMW3901 and the PAA5100EJ; just un-comment/comment the corresponding init_registers method. See Code: 12 for more details.

```
"""Initialize the device registers. You don't seem to need
the secret ones for the PAA5100EJ!?"""

self._init_registers_secret()

""" You can now chose between either the the PAA5100EJ or the PMW3901.
    Just un-comment/comment the corresponding init_registers method"""

self._init_registers_PAA5100EJ()        
# self._init_registers_PMW3901()
```
<span class="caption">Code 12: Initialize either device registers</span>

Finally I have also added the code as outlined in Code: 9 to the script in a method called _register_readinto(). I've not tested this yet but it compiles etc.