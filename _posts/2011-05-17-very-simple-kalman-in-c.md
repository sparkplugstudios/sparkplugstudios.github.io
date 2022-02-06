---
id: 1462
title: 'Very Simple Kalman in C#'
date: '2011-05-17T23:42:57+00:00'
author: batts
layout: post
guid: 'http://sandbox.dyadica.co.uk/?p=249'
#permalink: /2011/05/17/very-simple-kalman-in-c/
image: /wp-content/uploads/2011/05/kal-1.png
categories:
    - Medium
    - Tutorials
tags:
    - 'C#'
    - Code
    - Kalman
    - Sourcecode
    - Tip
    - Tutorial
---

I have decided to take a break from all things Kinect after the disappointment of a none SDK release yesterday. To ease my pain I thought I would peruse the world of Quad Copters I love these things, If you have not come across them you should check them out. Anyway I digress 🙂

During my search I came across a posting for a [simplified Kalman filter](http://trandi.wordpress.com/2011/05/16/kalman-filter-simplified-version/) written in Java by Trandi. This is the most simple an compact Kalman implementation I have come across to date.

Immediately I set about doing a quick conversion to C# and here it is:

```
<pre class="brush: csharp; title: ; notranslate" title="">
namespace VerySimpleKalman
{
 public class SimpleKalman
 {
 private static double Q = 0.000001;
 private static double R = 0.01;
 private static double P = 1, X = 0, K;

 private static void measurementUpdate()
 {
 K = (P + Q) / (P + Q + R);
 P = R * (P + Q) / (R + P + Q);
 }

 public static double update(double measurement)
 {
 measurementUpdate();
 double result = X + (measurement - X) * K;
 X = result;
 return result;
 }
 }
}
```

To call the filter all you need to do is as follows:

```
<pre class="brush: csharp; title: ; notranslate" title="">
private void PerfomKalmanTest()
        {
            DATA = new int[16] { 0, 0, 0, 0, 1, 1, 2, 2, 2, 100, 10, 2, 3, 3, 1, 0 };

            for (int i = 0; i < DATA.Length; i++)
            {
                Debug.Print(Math.Round(SimpleKalman.update(DATA[i])) + ",");
            }
        }
```

As Trandi states the filter is kept simple because there is no control input and the state is measured directly etc but still it is an impressive little filter 🙂