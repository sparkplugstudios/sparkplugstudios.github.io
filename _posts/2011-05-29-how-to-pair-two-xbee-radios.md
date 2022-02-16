---

title: 'How to pair two XBee Radios'
date: '2011-05-29T23:08:35+00:00'
author: batts
layout: post

image: /wp-content/uploads/2011/05/xbee-pair-1.png
thumb: '/wp-content/uploads/2011/05/xbee-pair-1.png'

excerpt: 'Recently a resulting factor of a new hobby project was the need to revisit the pairing of Xbee radios. The last time I had to undertake such a task'

categories:
    - Microcontrollers
    - Tutorials
tags:
    - Xbee
---

Recently a resulting factor of a new hobby project was the need to revisit the pairing of Xbee radios. The last time I had to undertake such a task was ages ago and due to my existing set of Xbee’s becoming a permanent fixture within my robot “Sheldon” I had not kept up on all things Xbee and for the life of me could not remember how.

{% include youtube-video.html video_id="VzgUtZyiHhE" %}
<span class="caption">Video 1: xbeeadapters: how to pair xbee's</span>

Luckily I managed to re-track down a great YouTube video (above) produced by [xbeeadapters](http://www.youtube.com/user/xbeeadapters) that I originally used to complete the task. The following list is a summary of all the steps needed to pair your Xbees as taken from the video.

In reality you wont need to Read/Write to the radios as much as I do, however I like to be thorough and find that for me this works best:

1. Download and install X-CTU from Digi.com
2. Read from the device to check it’s recognized
3. Set first xbee as Coordinator Device
4. Write to and then Read Device.
5. Set Pan ID for and note it down.
6. Write to and then Read (now a Coordinator) Device.
7. Note Down the Serial High and Serial Low values of the Coordinator.
8. Swap over the xBee’s
9. Read from the device to check it’s recognised
10. Set this xBee as a Router/End Device
11. Write to and then Read the (now a Router/End) Device.
12. Set Pan ID to the same as the Coordinator Device.
13. Write to and then Read Device.
14. Copy Serial High and Serial Low of Coordinator Device to Destination Addresses Router/End Device

Destination High Router/End Device – Serial High Coordinator Device  
Destination Low Router/End Device – Serial Low Coordinator Device

1. Write to and then Read Device.
2. Note Down the Serial High and Serial Low values of the Router/End Device.
3. Swap over the xBee’s
4. Copy SH and SL of Router/End Device to Destination Addresses of Coordinator Device

Destination High Coordinator Device – Serial High Router/End Device  
Destination Low Coordinator Device – Serial Low Router/End Device

1. Step 17: Write to and then Read Device.
2. Step 18: Cross Fingers and test 🙂

There may be an occasion when something goes wrong during the write. The result of this is that your Xbee radio becomes for want of a better word “Bricked”. I have only had this happen to me once, however don’t fear all is not lost. As it turns out its quite easy to unblock an Xbee.

If you are unfortunate enough for this to happen to you check out the [this post](http://diydrones.com/profiles/blog/show?id=705844%3ABlogPost%3A88961&commentId=705844%3AComment%3A89003 "Diy Drones") over at Diy Drones.