---
id: 1173
title: 'Adding Events to the Serialport Script'
date: '2014-03-06T00:37:44+00:00'
author: batts
layout: post
guid: '/?p=1173'
#permalink: /2014/03/06/adding-events-to-the-serialport-script/
image: /wp-content/uploads/2014/03/Updated-Serial-Script1-1.jpg
thumb: '/wp-content/uploads/2014/03/Updated-Serial-Script1-1.jpg'

excerpt: In this post I present an update to the Unity3D Serialport Script so that it includes an event trigger that can notify any other Mono-Behaviours that serial data has been received and then parsed.

categories:
    - Microcontrollers
    - Tutorials
    - Unity3D
tags:
    - Serialport
    - serial
    - Serial Communication
    - Unity Serialport
    - Unity3D
---

In this post I present an update to [Unity3D Serialport Script](/blog/unity3d-serialport-script/ "Unity3D Serialport Script") so that it includes an [event](http://msdn.microsoft.com/en-us/library/aa645739%28v=vs.71%29.aspx "MSDN - Events Tutorial") trigger that can notify any other [Unity3D MonoBehaviour](https://docs.unity3d.com/Documentation/ScriptReference/MonoBehaviour.html "Unity3D - MonoBehaviour") that serial data has been received and then parsed. Included within the event is both the parsed data and the raw data so that the notified behaviour can respond accordingly.

Furthermore, in addition to the inclusion of event triggers I have also removed all traces of the threading update method. This is a major change to the script and is reflective of the Unity way of doing things. In reality as the Unity API isn’t thread-safe I have come to believe that there is no point in utilizing a threaded approach.

The new version of the script is available for download from [here](https://github.com/dyadica/Unity_SerialPort "GitHub: Adding-Events-to-the-Serialport-Script.zip"). I have also left the [old one](/wp-content/uploads/2014/02/Unity3D-SerialPort.zip "Unity3D-SerialPort.zip") available just in case others would like to further develop it and or utilize the code in other .net based applications.

**Updating the Serialport Script**

Up until now the serialport script has mainly been utilized to send commands from the desktop to an attached robot such as [Ratchet.](/blog/tag/ratchet/ "Ratchet Related Posts") Because of this I have managed to get away with a few bespoke calls for serial input such as those located within the scripts ParseSerialData function.

The following code block (1) shows the existing ParseSerialData method with provided example functionality.

```
///
/// Function used to filter and act upon the data received. You can add
/// bespoke functionality here.
///
///string[] of raw data separated into chunks via ','
///string of raw data
private void ParseSerialData(string[] data, string rawData)
{
    // Examples of reading a value from the received data
    // for use if required - remove or replace with bespoke
    // functionality etc

    if (data.Length == 2)
    { int ReceviedValue = int.Parse(data[1]); }
    else { print(rawData); }

    //if (data == null || data.Length != 2)
    //{ print(rawData); }
}
```

<span class="caption">Code 1: The existing ParseSerialData method</span>

What is really needed however, is a method that is a little more flexible, and one that can inform other behaviours that we have some new data; meaning that we don’t have to contain our properties within the script and or repeatedly point at the script to find out whats going on etc.

By way of result, our other MonoBehaviours can act independently and in a more object orientated way, and thus most important of all, our code can be used in a variety of different applications and settings (as code should be!).

Fortunately there is a method included within C# for just this type of scenario, the[ event method.](http://msdn.microsoft.com/en-us/library/aa645739%28v=vs.71%29.aspx "MSDN - Events Tutorial") Microsoft details the event as: a method for objects to signal state changes that may be useful to clients of that object, and also; an important building block for creating classes that can be reused in a large number of different programs.

Just what we wanted eh!

**Adding the SerialDataParseEvent**

Fortunately adding provision for event notifications to the script is an easy task. All we need to do is define within the existing properties both a delegate and an event itself which utilizes that delegate. The following code (2) block shows the code needed to define both the delegate and event.

```
// Define a delegate for our event to use. Delegates
// encapsulate both an object instance and a method
// and are similar to c++ pointers.
public delegate void SerialDataParseEventHandler(string[] data, string rawData);

// Define the event that utilizes the delegate to
// fire off a notification to all registered objs
public static event SerialDataParseEventHandler SerialDataParseEvent;
```

<span class="caption">Code 2: Defining the delegate and event</span>

With these in place all we now need to do is update the SerialDataParseEvent method so that it fires off a notification each time that it is called. This is achieved by simply calling the event. At the same time we also pass it both the rawData and data properties so that these are also available to any notified object. Code block three shows this in practice.

```
///
/// Function used to filter and act upon the data received. You can add
/// bespoke functionality here.
///
///string[] of raw data separated into chunks via ','
///string of raw data
private void ParseSerialData(string[] data, string rawData)
{
    // Place bespoke functionality etc. here!

    // Fire a notification to all registered objects. Before we do
    // this however, first double check that we have some valid
    // data here so this only has to be performed once and not on
    // each object notified.

    if (data != null && rawData != string.Empty)
    {
        if (SerialDataParseEvent != null)
            SerialDataParseEvent(data, rawData);
    }
}
```

<span class="caption">Code 3: The updated ParseSerialData event.</span>

That’s all there is too it really, we can now register the event in any of our other MonoBehaviours. So how is this achieved? Well the more astute of you and who are familiar with the existing serialport script may have noticed a miscellaneous function called GameObjectSerialPort\_DataRecievedEvent. This method was put in a while ago as a placeholder for such an event notification.

We are going to use this placeholder as a method that will be triggered within the UnitySerialPort script as we call the notification. Lets begin by removing that method (see just a placeholder) and replacing it with the following (code 4) one. All we are really doing here is updating the naming conventions used to reflect the new ones implemented as the script developed.

```
void UnitySerialPort_SerialDataParseEvent(string[] Data, string RawData)
{
    // print("Data Received via port: " + RawData);
}
```

<span class="caption">Code 4: The event notification within UnitySerialPort</span>

Next, at the end of the start method add the following code (5). This code registers the event for notification. Please note that if this code is not called then there are no notifications registered and thus the event wont be fired. To ensure this I added a null check to the call as can be seen within Code 3.

```
SerialDataParseEvent += new SerialDataParseEventHandler(UnitySerialPort_SerialDataParseEvent);
```

<span class="caption">Code 5: Registering for a notification within SerialPortScript</span>

The final thing we need to do before moving onto the implementation of the event within another behaviour is ensure that we clean up after ourselves.

```
///
/// This function is called when the MonoBehaviour will be destroyed.
/// OnDestroy will only be called on game objects that have previously
/// been active.
///
void OnDestroy()
{
    // If we are registered for a notification of the
    // SerialDataParseEvent then remove the registration

    if (SerialDataParseEvent != null)
        SerialDataParseEvent -= UnitySerialPort_SerialDataParseEvent;
}
```

<span class="caption">Code 6: The OnDestroy() cleanup code</span>

This is simply achieved by utilizing the MonoBehaviour [OnDestroy()](https://docs.unity3d.com/Documentation/ScriptReference/MonoBehaviour.OnDestroy.html "Unity3D - OnDestroy()") method to remove the registered notification as shown in Code 6.

**Adding event calls to external behaviours**

As indicated at the beginning of this post, the whole point of implementing events is so that they can be utilized as a method to notify other behaviours when a registered activity occurs. As with events themselves, fortunately this is also easy to implement, check out the following code block (7).

```
UnitySerialPort.SerialDataParseEvent +=
    new UnitySerialPort.SerialDataParseEventHandler(UnitySerialPort_SerialDataParseEvent);
```

<span class="caption">Code 7: Initialisation code for the SerialDataParseEvent</span>

This code (7) is the initialisation code for the SerialDataParseEvent when called from another function. All that we need to do differently from the previous initialisation example (code 5) is to add a static UnitySerialPort class reference before the method calls e.g. SerialDataParseEvent becomes UnitySerialPort.SerialDataParseEvent. As with Code 5, this example (7) also registers a call to a method UnitySerialPort\_SerialDataParseEvent, but this is not the same method, but one which is contained within the external behaviour.

**The download and test scripts**

To demonstrate this practically, I have extended the GUIManager script contained within the [download](/wp-content/uploads/2014/03/Adding-Events-to-the-Serialport-Script.zip "Adding-Events-to-the-Serialport-Script.zip") to include registration of all the events. I have also included an example serial script which can be run on an Arduino in order to test the script.

The Arduino script contains two functions. Function a called by sending “A,N” where N is a numeric value will bounce the sent data back to the Unity3D application. Whilst Function B, called by sending “B,N” toggles a bool that controls a stream of dummy data sent from the Arduino to the Unity3D application.

That’s it we have covered all the code we need in order to implement events within the serialport class. As a final note, in addition to the presented SerialDataParseEvent I have also included within the download four additional events. These are:

- SerialPortOpenEvent
- SerialPortCloseEvent
- SerialPortSentDataEvent
- SerialPortSentLineDataEvent

Initialization and definition of these events is performed in exactly the same way as with the SerialDataParseEvent.