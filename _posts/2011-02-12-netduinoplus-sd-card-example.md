---
id: 251
title: 'NetduinoPlus SD Card Example'
date: '2011-02-12T23:45:21+00:00'
author: batts
layout: post
guid: 'http://sandbox.dyadica.co.uk/?p=251'
##permalink: /2011/02/12/netduinoplus-sd-card-example/
categories:
    - Microcontrollers
    - Tutorials
tags:
    - Netduino
    - 'SD Card'
---

I was contacted the other day with a request for some help with code needed for use of the NetduinoPlus SD Card.

So by way of response here we have a quick example, enjoy:

```
<pre class="brush: csharp; title: ; notranslate" title="">
using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using Microsoft.SPOT;
using Microsoft.SPOT.IO;
using Microsoft.SPOT.Hardware;
using SecretLabs.NETMF.Hardware;
using SecretLabs.NETMF.Hardware.NetduinoPlus;

namespace NetduinoSDOne
{
    public class Program
    {
        public static void Main()
        {
            string[] fs = VolumeInfo.GetFileSystems();
            VolumeInfo[] vols = VolumeInfo.GetVolumes();
            int i = 0;

            Debug.Print("Volume Count: " + vols.Length.ToString());

            foreach (VolumeInfo vi in vols)
            {
                Debug.Print("Root Directory: " + vi.RootDirectory.ToString());
                Debug.Print("Total Volume: " + vi.TotalSize.ToString());
                Debug.Print("Free Space: " + vi.TotalFreeSpace.ToString());
                Debug.Print("Formatted: " + vi.IsFormatted.ToString());
                Debug.Print("Volume ID: " + vi.VolumeID.ToString());
            }

            OutputPort SdPower = new OutputPort((Cpu.Pin)25, false); // ensure that the SD card is powered
            InputPort sdDetected = new InputPort((Cpu.Pin)57, false, Port.ResistorMode.PullUp);

            Debug.Print("SD Detected: " + (!sdDetected.Read()).ToString());
            sdDetected.Dispose();

            while (true)
            {
                Debug.Print("n");
                Debug.Print("Loop " + i.ToString());
                Debug.Print("n");

                string[] dirs = Directory.GetDirectories(@"SD");

                foreach (string s in dirs)
                {
                    Debug.Print(s);
                }

                switch (i)
                {
                    case 0:

                        #region Create Directory

                        try
                        {
                            Directory.SetCurrentDirectory(@"SD");
                            Directory.CreateDirectory("Netduino");
                        }
                        catch (Exception ex)
                        {
                            Debug.Print("Error: " + ex.Message.ToString());
                        }

                        i = 1;

                        #endregion Create Directory

                        break;

                    case 1:

                        #region Delete Directory

                        try
                        {
                            if (Directory.Exists("Netduino"))
                            {
                                Debug.Print("n");
                                Debug.Print("Netduino Directory Found");
                                Directory.Delete("Netduino");
                            }
                        }
                        catch (Exception ex)
                        {
                            Debug.Print("Error: " + ex.Message.ToString());
                        }

                        i = 0;

                        #endregion Delete Directory

                        break;
                }

                Thread.Sleep(5000);
            }
        }
    }
}
```