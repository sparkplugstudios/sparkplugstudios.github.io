---

title: 'OpenNI in WPF via EmguCV'
date: '2011-07-01T23:55:06+00:00'
author: batts
layout: post

#permalink: /2011/07/01/openni-in-wpf-via-emgucv/
image: /wp-content/uploads/2011/07/KinectSDK-1.png
thumb: /wp-content/uploads/2011/07/KinectSDK-1.png

excerpt: 'Another quick demo showing the Kinect’s IR stream running in a WPF app. This time the image is created as an EmguCV (OpenCV-C#) Image Gray, ushort.'

categories:
    - Tutorials
tags:
    - EmguCV
    - Kinect
    - OpenCV
    - OpenNI
---

Another quick demo showing the Kinect’s IR stream running in a WPF app. This time the image is created as an EmguCV (OpenCV-C#) Image Gray, ushort. As you can see the quality is greatly enhanced in comparison to the last attempt. If you look closely you can make out the IR dot markers and also the grid pattern.

As a bonus it’s ready for some Image manipulation via EmguCV too.

<div class="video-container"><iframe allowfullscreen="" frameborder="0" src="https://www.youtube.com/embed/rwNMWQ4Cme4?rel=0"></iframe></div>Sourcecode is available [here](http://dl.dropbox.com/u/31617455/OpenNI%20Kinect%20IR%20WPF.zip "Open NI IR Demo").

By default the example is running the standard WPF code to get is to show the EmguCV image as shown above in MainWindow.xmal.cs comment out:

```
imgVideo.Source = _kinect.IrImageSource;
```

and replace with:

```
imgVideo.Source = ToBitmapSource(irGrayCVImage);
```

Kudos must go to [Vangos Pterneas](http://www.studentguru.gr/blogs/vangos/archive/2011/01/28/kinect-and-wpf-getting-the-raw-and-depth-image-using-openni.aspx) who’s excelent work provided most of the groundwork for this demo.

Enjoy 🙂