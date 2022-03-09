---

title: 'Netduino SerialPortHelper to WinForm and XNA'
date: '2011-05-22T23:18:36+00:00'
author: batts
layout: post

excerpt: 'A few weeks ago, I was contacted via YouTube in reference to the Netduino Serial Communication example I posted a while back'

categories:
    - Microcontrollers
    - Tutorials
tags:
    - Netduino
    - 'Serial Communication'
    - 'Serial Port'
---

A few weeks ago, I was contacted via YouTube in reference to the Netduino Serial Communication example I posted a while back. In my reply I promised that I would make a posting detailing how I have since updated the system. Before we start, check out the featured video to see the current system in action.

A while back I decided to adopt the methods as described by [Hari](http://forums.netduino.com/index.php?/topic/366-netduino-serial-port-code-review/ "Netduino Forums") over at the netduino forums to facilitate ReadLine functionality. The rationale for this was that by utilizing Hari’s code we no longer have to detail the length data being sent, thus simplifying the code greatly.

The resulting amalgamation of code enables simple filtering of data via separating the “inBound” data to a string array via a “,” delimiter. The first entry of the array then acts as an identifier for functionality, achieved via use of a switch statement. The following code block details the heart of this method:

```
/// <summary>
        /// Filter and do something with read data
        /// </summary>
        /// <param name="inBound"></param>
        private static void DoSomethingWithData(string inBound)
        {
            string[] data = inBound.Split(',');

            if (data.Length == 0) { return; }

            switch (data[0])
            {
                case "Open": netduinoSPH.PrintLine("Open");
                    break;
                case "A": netduinoSPH.PrintLine("Automatic");
                    break;
                case "T": DoTriggerUpdate(data);
                    break;
                case "M": DoMotorUpdate(data);
                    break;

                default: netduinoSPH.PrintLine(inBound); break;
            }

            Debug.Print(inBound);
        }
```

In order to get things working via a windows form and even xna all that was needed was to clone Hari’s class and swap it over to the windows System.IO.Ports namespace, simple 🙂

{% include youtube-video.html video_id="fJEjDibe-Q8?rel=0" %}

The full source for both the forms and xna examples can be downloaded [here](/wp-content/uploads/2011/05/Netduino-to-Form-via-SPH.zip).