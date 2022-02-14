---
title: "Privacy & Cookies"
modified: 14-02-2022
---

<script>

document.addEventListener('DOMContentLoaded', function() {
document.getElementById('cookie-notice-decline').addEventListener("click",function() {
eraseCookie('cookie-notice-dismissed');
location.reload();
});
});

document.addEventListener('DOMContentLoaded', function() {
document.getElementById('cookie-notice-accept').addEventListener("click",function() {
createCookie('cookie-notice-dismissed','true',31);
document.getElementById('cookie-notice').style.display = 'none';
location.reload();
});
});

</script>

<style>

h2
{
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;	
	font-size: 22px;
	line-height: 30px;
	background-color:#f8f8f8;  
  color: #3a3a3a;
	padding:0px;
  margin-top:20px;
  margin-bottom:20px;
}

h3
{
    background-color: #f8f8f8;

    border-left: 1px solid #68c9e8;

    padding-left: 5px;
    padding-right: 5px;

    font-size:14px;
    font-weight:300;

    width: fit-content;

    font-size: 14px;
	  line-height: 22px;
    
}

</style>

The privacy of our visitors is extremely important. This Privacy & Cookies Policy outlines the types of personal information that is received and collected and how it is used by our site(s). 

<!-- With all this in mind; as an entity we really don't care about who you are and/or your personal data! Our site(s) is/are authored for fun; and as a means of archiving personal projects/works. Of course if a site takes off this may change, but we highly doubt it! -->

## Designation of the responsible authority

The person(s) responsible for data processing on this website is the site author(s) which can be contacted [here](mailto:{{ site.privacy }}). The aforementioned responsible party decides alone or jointly with others on the purposes and means of processing personal data(s).

## Log Files

As is true of most websites, we and/or third party service providers may gather certain information automatically through your use of our website(s). This information may include Internet protocol (IP) addresses, browser type, Internet service provider (ISP), referring or exit pages, the files viewed on the Site (e.g., HTML pages, graphics, etc.), operating system, date/time stamp, and "clickstream data" to analyze trends in the aggregate and administer the website(s). 

All of this information is not linked to anything that is personally identifiable. However third party service providers may use analytical software to understand this information. This software sends information to its licensor. Other sites and companies may also use this software. As a result, the licensor may collect information that, when aggregated by them, allows them to identify you individually. We have no responsibility for this collection and use.

### Third Parties

There may be server logs held by the domain provider [ipage.com](https://www.ipage.com) containing such information in order to comply with legal obligations. Furthermore our hosting provider [Github](https://www.github.com) may also collect User Personal Information from visitors to this site in order to also comply with legal obligations, and/or to maintain the security and integrity of their Website and their Service(s). 

Further information for both of of these third party services/providers and their respective privacy policies can be found within the [Where we send your data](#where-we-send-your-data) section of this document.

## Where we send your data

 Our sites are hosted via third party providers. As such our services and website(s) may be hosted outside of your country of residence. Your data may be transferred inside or outside of the EU. By using our website(s) or the services we provide, you acknowledge your consent to such data transfer. 
 
 For more information on how our third party domain provider [ipage.com](https://www.ipage.com) ensure the protection of your data please see their privacy [information](https://newfold.com/privacy-center). For more information on how our third party hosting provider [Github](https://www.github.com) ensure the protection of your data please see their privacy [information](https://docs.github.com/en/github/site-policy/github-privacy-statement)

### Embedded links to other websites

This website may contain links to other websites provided by third parties not under our control. When following a link and providing information to a 3rd-party website, please be aware that we are not responsible for the data provided to that third party. 

This policy only applies to the website(s) we author and provide for public consumption, so when you visit other websites, even when you click on a link posted on the website(s), you should read their own privacy policies.

### Google Web Fonts

This website uses Web Fonts from Google. The provider is Google Inc, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.

The use of Google Fonts allows me to present this website using my choice of fonts, regardless of the fonts that are installed locally. This is done by retrieving the Google Web Fonts from a Google server in the USA and the associated transfer of your data to Google. This data is your IP address and which page you have visited on this website. The use of Google Web Fonts is based on Art. 6 para. 1 lit. f DSGVO. As the operator of this website, I have a legitimate interest in the optimal display and transmission of my web presence.

The company Google is certified for the US-European data protection convention "Privacy Shield". This data protection agreement is intended to ensure compliance with the level of data protection applicable in the EU.

Details about Google Web Fonts can be found here: [https://www.google.com/fonts#AboutPlace:about](https://www.google.com/fonts#AboutPlace:about) and further information in the Google Privacy Policy: [https://policies.google.com/privacy/partners?hl=de](https://policies.google.com/privacy/partners?hl=de).

## Cookies and Web Beacons

Cookies are text files containing small amounts of information which are downloaded to your personal computer, mobile or other devices when you visit a website. Cookies are then sent back to the originating website on each subsequent visit, or to another website that recognises that cookie. 

Cookies are useful because they allow a website to recognise a user’s device. Cookies do lots of different jobs, like letting you navigate between pages efficiently, remembering your preferences, and generally improve the user experience. You can find more information about cookies at [www.allaboutcookies.org](www.allaboutcookies.org)and [www.youronlinechoices.eu](www.youronlinechoices.eu).

Visitors who do not wish to have cookies placed on their devices should set their browsers to refuse cookies before using our websites. Instructions on how this may be achieved are featured within the [Managing Cookies section of this policy](#managing-cookies).

### Our Cookie(s)

We don't want to store any first party cookies when you visit our websites. Our site(s) are built using Jekyll and hosted via Github Pages in order to try and avoid such a situation. This being said third party cookies may be set either by some of the site(s) embedded content and/or by our third party service providers. 

Because of this; GDPR compliance means we have to store a cookie on your device to control the visibility of a banner that informs you that other sites may store a cookie on your device. 

This cookie we determine as a strictly necessary cookie! <!-- ...although we believe that metaphorically speaking its totally unnecessary and total madness :D -->

The following block details the cookie we store to log your acceptance of the policies outlined within this document. As you can see the cookie will expire after 31 days.

```
cookie-notice-dismissed - * Expires after 31 days
```
<span class="caption">Code 1: The Cookies, Cookie</span>

You can approve the use of this cookie by clicking <a id="cookie-notice-accept" class="btn btn-primary btn-sm">here</a>. You can also change your mind and delete this cookie from your browser by clicking <a id="cookie-notice-decline" class="btn btn-primary btn-sm">here</a>. The approve option (if not already accepted) can also be found via a cookie banner at the base of each of the site(s) pages. Before you make your decision please ensure that you have fully read this document.

### Github Cookies
Github indicate within their [privacy statement](https://docs.github.com/en/github/site-policy/github-privacy-statement) that:

"GitHub only uses strictly necessary cookies." and "We use cookies solely to provide, secure, and improve our service. For example, we use them to keep you logged in, remember your preferences, identify your device for security purposes, analyze your use of our service, compile statistical reports, and provide information for future development of GitHub. We use our own cookies for analytics purposes, but do not use any third-party analytics service providers". 
 
 More information can be found via their [privacy statement](https://docs.github.com/en/github/site-policy/github-privacy-statement)

### YouTube Cookies

We often feature product videos on our website that are hosted on YouTube. Although the videos are made by us and displayed on this site, the content actually comes from YouTube, which is a third-party domain; therefore you may receive a YouTube cookie. We don't control the setting of these cookies, so it’s worth checking the third-party website for more information about their cookies and how to manage them.

The videos we embed are done so using YouTube’s privacy-enhanced mode. This mode may set cookies on your computer once you click on the YouTube video player, but YouTube will not store personally-identifiable cookie information for playbacks of embedded videos using the privacy-enhanced mode.

Read more at YouTube’s embedding videos information [page](https://support.google.com/youtube/answer/171780?hl=en-GB).

```
PREF - * Expires after eight months
VSC - * expires at the end of your session
VISITOR_INFO1_LIVE - *expires after eight months
remote_sid - * expires at the end of your session
```
<span class="caption">Code 2: The Youtube Cookies</span>

For more information on how youtube protect your privacy and personal information; please check out their [privacy policy](https://www.google.com/aclk?sa=L&ai=DChcSEwi3uuPT7Pf1AhWBnu0KHQa5DGkYABAAGgJkZw&ae=2&sig=AOD64_2yffkenlSOCvtbC7Sj_2MNRA6eYg&q&adurl&ved=2ahUKEwi64tvT7Pf1AhUMJ8AKHf2xCsIQ0Qx6BAgCEAE)

<!-- Not yet implemented so just a placeholder!

We use cookies on this site to store limited information about how you interact with the site. In line with [EU legislation](https://gdpr.eu/cookies/), we have identified several different types of cookies:

- **Strictly necessary cookies**. 
  - I set a cookie to store your acceptance of my cookie policy. This expires after 31 days.
- **Preferences cookies** to remember your preferences. These are not used on this website.
- **Statistics cookies** that allow me to see how my audience uses the website. I use:
  - Google Analytics
- **Marketing cookies** to help advertisers deliver relevant content are not used on this website.
-->

### Managing Cookies

Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may however prevent you from taking full advantage of the website.

Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser to browser, and from version to version. You can however obtain up-to-date information about blocking and deleting cookies via these links:

* [Google Chrome](https://support.google.com/chrome/answer/95647?hl=en) (https://support.google.com/chrome/answer/95647?hl=en)
* [FireFox](https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences) (https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences)
* [Opera](http://www.opera.com/help/tutorials/security/cookies/) (http://www.opera.com/help/tutorials/security/cookies/)
* [Safari](https://support.apple.com/kb/PH21411) (https://support.apple.com/kb/PH21411)
* [Edge](https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy) (https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy)
* [Internet Explorer](https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies) (https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies)

Blocking all cookies will have a negative impact upon the usability of many websites. If you block cookies, you may not be able to use all the features on our websites; the functionality and performance of the websites may also be impaired.

<!-- Not yet implemented so just a placeholder!

### Google Analytics

Google Analytics is a web analytics tool I use to help understand how visitors engage with this website. It reports website trends using cookies and web beacons without identifying individual visitors. Individual IP addresses are anonymized. You can read [Google Analytics Privacy Policy](http://www.google.com/analytics/learn/privacy.html).

#### Objection to data collection

You can prevent the collection of your data by Google Analytics by clicking on the following link [https://tools.google.com/dlpage/gaoptout?hl=en](https://tools.google.com/dlpage/gaoptout?hl=en). An opt-out cookie is set to prevent the collection of your information on future visits to our site: Disable Google Analytics.

Details on how Google Analytics handles user data can be found in the Google privacy policy: [https://support.google.com/analytics/answer/6004245?hl=de](https://support.google.com/analytics/answer/6004245?hl=de).

#### Demographic characteristics at Google Analytics

This website uses the function "demographic characteristics" of Google Analytics. It can be used to generate reports that contain information about the age, gender and interests of visitors to the site. This data comes from interest-based advertising by Google as well as from visitor data from third parties. It is not possible to assign the data to a specific person. You can deactivate this function at any time. You can do this through the ad settings in your Google Account or by generally prohibiting the collection of your data by Google Analytics, as explained in the section "Opting out of data collection". 

-->

## Acknowledgement

By using the website(s) or the services we provide you acknowledge your consent to the practices described herein. You also acknowledge your consent to the practices described within our [Disclaimer](/disclaimer).

### Policy Changes

Although most changes are likely to be minor, we may change our policies from time to time, and at our sole discretion. To this end we encourage visitors to frequently check this page for any changes to these policies. Your continued use of this site after any change in our policies will constitute your acceptance of such change.

### Current Status

These Privacy & Cookies Policies were last updated {{page.modified}}