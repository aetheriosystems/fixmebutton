import { CATEGORIES } from "./constants";
import type { Difficulty } from "./constants";

export interface GuideMeta {
  slug: string;
  category: string;
  title: string;
  devices?: string[];
  difficulty?: Difficulty;
  time_estimate?: string;
  last_verified?: string;
  search_volume?: number;
  steps?: number;
}

export interface GuideContent {
  meta: GuideMeta;
  content: string;
}

export const ALL_GUIDES: GuideContent[] = [
  {
    meta: {
      slug: "free-up-iphone-storage",
      category: "smartphones",
      title: "How to Free Up Storage Space on iPhone",
      devices: ["iPhone 14", "iPhone 15", "iPhone 16", "iPhone SE"],
      difficulty: "beginner",
      time_estimate: "10 minutes",
      last_verified: "2026-06-08",
      steps: 7,
    },
    content: `## Before You Start

Running out of iPhone storage? Photos, apps, and messages are usually the biggest culprits. This guide shows you how to free up space quickly — without deleting anything important.

To check your current storage: go to **Settings → General → iPhone Storage**. You'll see a color-coded bar showing what's taking up space.

## Step 1: Delete Unused Apps

Your iPhone can automatically remove apps you haven't used in a while — while keeping their data.

1. Go to **Settings → General → iPhone Storage**
2. Scroll down to see your apps listed by how much space they use
3. Look for "Offload Unused Apps" — tap **Enable**
4. Your iPhone will now automatically remove apps you rarely use (you can reinstall them anytime from the App Store)

To manually delete an app: tap it in the list, then tap **Delete App**.

## Step 2: Review and Delete Large Attachments

Text messages with photos and videos can take up surprising amounts of space.

1. Go to **Settings → General → iPhone Storage**
2. Find **Messages** in the app list and tap it
3. You'll see categories like "Top Conversations," "Photos," "Videos," and "GIFs"
4. Tap each category, then tap **Edit** in the top right corner
5. Select items you want to delete, then tap the trash icon
6. To automatically delete old messages: go to **Settings → Messages → Keep Messages** and change from "Forever" to "30 Days" or "1 Year"

## Step 3: Optimize Photos

Photos are usually the biggest space hog. Instead of deleting them, let your iPhone store smaller versions locally and full-resolution copies in iCloud.

1. Go to **Settings → [Your Name] → iCloud → Photos**
2. Turn on **iCloud Photos** if it's not already on
3. Below it, select **Optimize iPhone Storage** (not "Download and Keep Originals")
4. Your iPhone will now keep smaller versions of photos on your device.

> **Note:** You may need to buy iCloud storage if you have a lot of photos. 50 GB costs $0.99/month.

## Step 4: Clear Safari and App Caches

Apps store temporary files (caches) that can build up over time.

**Clear Safari:**
1. Go to **Settings → Safari**
2. Scroll down and tap **Clear History and Website Data**
3. Confirm by tapping **Clear History and Data**

## Step 5: Remove Downloaded Music and Podcasts

Streaming services often download content for offline listening.

**Apple Music:**
1. Go to **Settings → Music → Downloaded Music**
2. Swipe left on artists, albums, or songs to delete them

**Spotify:**
Open Spotify → Your Library → tap the Downloaded filter → remove downloads.

## Step 6: Empty the Recently Deleted Album

When you delete photos, they go to a "Recently Deleted" folder for 30 days — still taking up space.

1. Open the **Photos** app
2. Scroll down to **Recently Deleted** under Utilities
3. Tap **Select** → **Delete All**

## Step 7: Restart Your iPhone

Sometimes your iPhone miscounts available space. A restart forces it to recalculate.

1. Press and hold the **side button** and either **volume button** until the "slide to power off" slider appears
2. Slide to power off, wait 30 seconds, then press the side button to restart

Go back to **Settings → General → iPhone Storage** — you may see more free space than before.`,
  },
  {
    meta: {
      slug: "connect-bluetooth-headphones",
      category: "smartphones",
      title: "How to Connect Bluetooth Headphones to Your Phone",
      devices: ["iPhone", "Samsung Galaxy", "Google Pixel", "Any Android phone"],
      difficulty: "beginner",
      time_estimate: "3 minutes",
      last_verified: "2026-06-08",
      steps: 5,
    },
    content: `## Before You Start

Connecting Bluetooth headphones is the same basic process for almost all brands — AirPods, Beats, Sony, Bose, JBL, and generic brands all work the same way.

## Step 1: Put Your Headphones in Pairing Mode

**AirPods / Beats:**
1. Put both earbuds in the charging case
2. Open the lid (keep earbuds inside)
3. Press and hold the small button on the **back** of the case until the light flashes **white**

**Most other headphones (Sony, Bose, JBL, etc.):**
1. Turn the headphones off
2. Press and hold the **power button** for 5-10 seconds
3. You'll hear a voice say "pairing" and a light will flash blue and red alternately

## Step 2: Open Your Phone's Bluetooth Settings

**iPhone:**
1. Open **Settings** → **Bluetooth**
2. Make sure the switch at the top is **green** (on)

**Android:**
1. Go to **Settings → Connections → Bluetooth**
2. Turn Bluetooth on

## Step 3: Find Your Headphones in the List

Under "Other Devices" or "Available Devices," you should see your headphones appear by name.

If you don't see them: make sure the headphones are still in pairing mode, turn Bluetooth off and back on, and move the headphones closer to your phone.

## Step 4: Tap to Connect

1. Tap the name of your headphones in the list
2. Wait a few seconds for "Connecting..." then "Connected"

## Step 5: Test the Connection

1. Open any app with sound — YouTube, Spotify, or just play a video
2. The sound should come through your headphones now
3. Try adjusting the volume using your phone's volume buttons

## Still Stuck?

- **Headphones won't pair?** Make sure they're charged first.
- **Already connected to another device?** Bluetooth headphones connect to ONE device at a time. Turn off Bluetooth on other devices.
- **"Connection Failed"?** Tap the gear icon next to the headphones name → **Forget This Device**, then start from Step 1.`,
  },
  {
    meta: {
      slug: "transfer-iphone-data",
      category: "smartphones",
      title: "How to Transfer Data from Old iPhone to New iPhone",
      devices: ["iPhone 14", "iPhone 15", "iPhone 16"],
      difficulty: "beginner",
      time_estimate: "15 minutes",
      last_verified: "2026-06-08",
      steps: 12,
    },
    content: `## Before You Start

Make sure both iPhones are charged to at least 50%. The transfer can take up to 45 minutes.

**What you'll need:**
- Your old iPhone and your new iPhone
- A stable WiFi connection
- Your Apple ID and password

## Step 1: Turn On Your New iPhone

Press and hold the side button until the Apple logo appears.

## Step 2: Follow the Setup Screens

Select your language, country, and connect to your WiFi network.

## Step 3: Look for the Quick Start Screen

Bring your **old iPhone** close to your **new iPhone**. A popup will appear on your old iPhone. Tap **Continue**.

## Step 4: Wait for the Animation

A blue, swirling animation appears on your new iPhone. Hold your old iPhone over it so the animation is centered in the viewfinder.

## Step 5: Enter Your Old Passcode

Enter the passcode you used on your old device.

## Step 6: Set Up Face ID or Touch ID

Follow the on-screen instructions, or choose "Set Up Later."

## Step 7: Choose How to Transfer

Select **Transfer from iPhone** (recommended — fastest).

## Step 8: Wait for the Transfer

This can take 15-45 minutes. Do not move the phones apart during the transfer.

## Step 9: Complete Apple ID Settings

Enter your Apple ID password on the new iPhone to activate iMessage and iCloud.

## Step 10: Wait for Apps to Download

Apps will download automatically — grayed out with a progress circle. This can take 30+ minutes.

## Step 11: Check Your Data

Verify Photos, Contacts, Messages, Notes, and Passwords all transferred.

## Step 12: Erase Your Old iPhone (Optional)

Go to **Settings → General → Transfer or Reset iPhone → Erase All Content and Settings** on your old iPhone.

## Still Stuck?

If the transfer didn't work: restart both iPhones and try again, or use an iCloud backup instead.`,
  },
  {
    meta: {
      slug: "free-up-android-storage",
      category: "smartphones",
      title: "How to Free Up Storage Space on Android",
      devices: ["Samsung Galaxy", "Google Pixel", "OnePlus", "Motorola", "Any Android phone"],
      difficulty: "beginner",
      time_estimate: "10 minutes",
      last_verified: "2026-06-09",
      steps: 7,
    },
    content: `## Before You Start

Running out of storage on your Android phone? Photos, videos, and apps are usually the biggest space-hogs. This guide works for Samsung Galaxy, Google Pixel, OnePlus, Motorola, and most other Android phones.

To check how much space you have left: go to **Settings → Storage** (on Samsung, it's **Settings → Device Care → Storage**). You'll see a breakdown showing what's using your space.

## Step 1: Delete Apps You Don't Use

Android phones can pile up unused apps over time. Some of them can be surprisingly large — games especially can take up 1-5 GB each.

1. Go to **Settings → Storage → Apps** (or **Settings → Apps**)
2. You'll see your apps listed by how much space they use, biggest first
3. Tap an app you don't use anymore
4. Tap **Uninstall**
5. Repeat for any other apps you haven't opened in months

> **Common Mistake:** Don't uninstall system apps like "Google Play Services," "Android System WebView," or "SIM Toolkit." These are part of Android and removing them can cause problems. Only uninstall apps you downloaded yourself from the Play Store.

## Step 2: Clear App Caches

Apps store temporary files called "cache" to load faster. Over time, cache files can build up and eat several gigabytes of space — and clearing them is totally safe.

1. Go to **Settings → Storage**
2. Look for a button that says **Free Up Space** or **Clean Up** (most Android phones have this built in)
3. Tap it, and your phone will show temporary files you can delete
4. Check the boxes for cached data, then tap **Free Up** or **Delete**

If your phone doesn't have a built-in cleaner, clear cache for individual apps:
1. Go to **Settings → Apps**
2. Tap the app (start with Chrome, YouTube, Instagram, TikTok — these build up the most cache)
3. Tap **Storage & cache**
4. Tap **Clear Cache** (NOT "Clear Storage" — that would log you out)

> **Common Mistake:** Tapping "Clear Storage" instead of "Clear Cache" will erase your login info, saved settings, and downloaded content inside that app. Only tap the button that says "Clear Cache."

## Step 3: Delete Large Files with Files by Google

Most Android phones come with a file manager app called **Files** (or **Files by Google**). It can find large files, duplicate photos, and unused downloads.

1. Open the **Files** app (if you don't have it, download **Files by Google** from the Play Store — it's free)
2. Tap the **Clean** button at the bottom
3. You'll see suggestions like: delete old screenshots, duplicate photos, large files over 100 MB, and downloaded files from your Downloads folder
4. Tap each suggestion, review what it found, then tap **Delete**

## Step 4: Back Up and Remove Photos and Videos

Photos and videos are almost always the biggest storage consumer. Instead of deleting them forever, back them up to Google Photos first.

1. Open the **Google Photos** app (comes pre-installed on most Android phones)
2. Tap your profile picture in the top right corner
3. Tap **Photos settings → Backup**
4. Make sure **Backup** is turned on
5. Choose **Storage saver** quality (compresses photos slightly but looks great on a phone screen)
6. Wait for your photos to finish backing up
7. Once backed up, tap your profile picture again and select **Free up space**
8. Google Photos will find photos already backed up and offer to delete them from your phone

> **Note:** As of 2026, Google Photos no longer offers completely free unlimited storage. The storage saver option compresses your photos and counts toward your free 15 GB of Google account storage. If you need more, 100 GB costs $1.99/month.

## Step 5: Remove Downloaded Music, Podcasts, and Streaming Content

Streaming apps often download content for offline listening or watching. Those downloads eat up storage fast.

**Spotify:** Open Spotify → Your Library → tap Downloaded filter → tap the green download arrow to remove downloads.

**YouTube / YouTube Music:** Open YouTube → Library → Downloads → tap the three-dot menu → Delete from device.

**Netflix:** Open Netflix → Downloads tab → tap the download icon → Delete Download. Also turn off Smart Downloads to stop auto-downloading new episodes.

**Podcasts:** Open your podcast app → find Downloaded or Downloaded Episodes → delete episodes you've already listened to.

## Step 6: Empty the Trash in Photos and Files

When you delete photos or files on Android, they move to a Trash or Recycle Bin folder — and stay there for 30 days, still taking up space.

1. Open the **Google Photos** app → **Library** → **Trash**
2. Tap the three-dot menu → **Empty trash** → confirm

Also check the Files app:
1. Open the **Files** app → hamburger menu → **Trash** or **Recycle bin**
2. Tap **Empty trash**

> **Common Mistake:** Photos in the Trash still count against your storage until the trash is emptied or 30 days pass. If you're desperate for space now, empty the trash manually instead of waiting.

## Step 7: Restart Your Phone

Sometimes Android misreports how much storage is available. A restart forces it to recalculate.

1. Press and hold the **power button** until the power menu appears
2. Tap **Restart**
3. Wait 30-60 seconds for your phone to fully restart

Go back to **Settings → Storage** — you may see slightly more free space than before.

## Still Stuck?

If you're still running out of space after all seven steps:

- **Consider a microSD card:** Many Android phones (especially Samsung Galaxy and Motorola) have a microSD card slot. A 128 GB card costs around $15. Insert the card and go to **Settings → Storage → SD Card** to move files.
- **Use Google Photos auto-management:** In Google Photos settings, enable automatic "Free up device storage" so it regularly removes backed-up photos.
- **Factory reset as a last resort:** Go to **Settings → System → Reset options → Erase all data (factory reset)**. **Warning:** This erases everything. Back up photos, contacts, and messages first.
- **Your phone may just be too old:** If your phone has only 16 GB or 32 GB of storage and you've tried everything, it may be time for a phone with more storage. Modern Android phones start at 128 GB.`,
  },
  {
    meta: {
      slug: "speed-up-slow-computer",
      category: "computers",
      title: "How to Speed Up a Slow Computer",
      devices: ["Windows 10", "Windows 11", "macOS"],
      difficulty: "beginner",
      time_estimate: "20 minutes",
      last_verified: "2026-06-08",
      steps: 7,
    },
    content: `## Before You Start

A slow computer is frustrating, but most slowdowns are fixable without buying anything. This guide covers both Windows and Mac.

## Step 1: Restart Your Computer

The simplest fix that works surprisingly often. Restarting clears temporary files and refreshes memory.

- **Windows**: Start menu → Power → Restart
- **Mac**: Apple menu → Restart

## Step 2: Close Unnecessary Programs

Every open program uses memory. Close browser tabs and programs you're not actively using.

- **Windows**: Right-click taskbar icons → Close window
- **Mac**: Right-click Dock icons → Quit

## Step 3: Disable Startup Programs

Many programs launch automatically when you start your computer.

**Windows:**
1. Press **Ctrl + Shift + Esc** → click **Startup** tab
2. Right-click programs marked "High" impact → **Disable**

**Mac:**
1. Apple menu → **System Settings → General → Login Items**
2. Select programs you don't need → click **minus (-)**

## Step 4: Free Up Disk Space

When your drive is nearly full, your computer slows down significantly.

**Windows:** Settings → System → Storage → Temporary files → Remove files

**Mac:** Apple menu → System Settings → General → Storage

> **Aim for at least 20 GB of free space.**

## Step 5: Check for Malware (Windows)

1. Open **Windows Security** → **Virus & threat protection** → **Quick scan**
2. Also remove browser extensions you don't recognize

## Step 6: Update Your Operating System

**Windows:** Settings → Windows Update → Check for updates

**Mac:** Apple menu → System Settings → General → Software Update

## Step 7: Consider Hardware Upgrades

1. **Replace HDD with SSD** — single biggest speed upgrade. Cost: $30-60.
2. **Add more RAM** — helps if you run many programs. Cost: $25-50.
3. **Clean the fans** — dust buildup causes overheating which slows down performance.`,
  },
  {
    meta: {
      slug: "set-up-roku",
      category: "tvs-streaming",
      title: "How to Set Up a Roku Streaming Stick",
      devices: ["Roku Express", "Roku Streaming Stick 4K", "Roku Ultra"],
      difficulty: "beginner",
      time_estimate: "15 minutes",
      last_verified: "2026-06-08",
      steps: 8,
    },
    content: `## Before You Start

Setting up a Roku turns any TV into a smart TV with Netflix, Hulu, Disney+, YouTube, and more.

**What you'll need:**
- Your Roku device and remote (with batteries)
- Your TV's remote
- Your WiFi network name and password

## Step 1: Plug the Roku Into Your TV

Find an available HDMI port on your TV and plug in the Roku. If it's a streaming stick, it plugs directly in. If it's a box, use the included HDMI cable.

## Step 2: Connect the Power

Plug the USB power cable into the Roku, then into the included power adapter, then into a wall outlet.

> **Important:** Use the wall adapter — your TV's USB port may not provide enough power.

## Step 3: Switch Your TV to the Right Input

Use your **TV remote** and press **Input/Source**. Select the HDMI port where you plugged in the Roku. You should see the Roku logo on screen.

## Step 4: Pair the Roku Remote

Insert batteries into the remote. It should pair automatically. If not, press and hold the small button inside the battery compartment for 5 seconds.

## Step 5: Choose Language and Connect to WiFi

Use the arrow keys to select your language, then connect to your WiFi network and enter your password.

## Step 6: Create or Sign In to Your Roku Account

Your TV will show a code and the website **roku.com/link**. Go there on your phone or computer, enter the code, and sign in or create a free account.

## Step 7: Set Up Your Channels

Roku will suggest popular channels — Netflix, Hulu, Disney+, YouTube, Prime Video. Select the ones you use and they'll install automatically.

## Step 8: Complete Setup and Start Watching

You'll land on the Roku home screen. Open a channel, sign in with your account for that service, and start watching!

## Still Stuck?

- **Remote not working?** Try fresh batteries or download the Roku app on your phone.
- **WiFi disconnecting?** Move router closer to TV or use Ethernet (Roku Ultra).
- **No HDMI port?** You need an HDMI-to-composite adapter for older TVs.`,
  },
  {
    meta: {
      slug: "fix-slow-internet",
      category: "internet-wifi",
      title: "How to Fix Slow Internet",
      devices: ["Windows PC", "Mac", "iPhone", "Android", "Smart TV"],
      difficulty: "beginner",
      time_estimate: "10 minutes",
      last_verified: "2026-06-08",
      steps: 8,
    },
    content: `## Before You Start

Slow internet can be caused by router placement, too many connected devices, or your internet provider. This guide walks through the most common fixes.

## Step 1: Run a Speed Test

Go to **speedtest.net** and click "Go." Write down your download and upload speeds.

> **What's normal?** Streaming Netflix: 5-25 Mbps. Video calls: 3-10 Mbps. Browsing: 1-5 Mbps.

## Step 2: Restart Your Router and Modem

1. Unplug the power from both your router and modem
2. Wait **60 seconds**
3. Plug the modem in first, wait for lights to stabilize
4. Plug the router in, wait 2 minutes
5. Run the speed test again

## Step 3: Move Closer to Your Router

WiFi weakens with distance and through walls. Move your device to the same room as the router and test again. If it improves, router placement is the issue.

## Step 4: Disconnect Unused Devices

Every connected device takes a slice of your bandwidth. Disconnect devices you're not actively using.

## Step 5: Switch to 5 GHz WiFi

Most routers broadcast both 2.4 GHz (slower, longer range) and 5 GHz (faster, shorter range). Look for your network name with "5G" or "5GHz" and connect to that instead.

## Step 6: Check for Background Downloads

- **Windows**: Ctrl+Shift+Esc → Processes tab → sort by Network
- **Mac**: Activity Monitor → Network tab
- Pause or cancel large downloads

## Step 7: Update Your Router's Firmware

1. Open a browser and go to **192.168.0.1** or **192.168.1.1**
2. Log in (often admin/password — check the sticker on your router)
3. Find Firmware Update and follow the instructions

## Step 8: Contact Your Internet Provider

If nothing helped, call your provider. Ask them to run a line test and check for outages in your area.`,
  },
  {
    meta: {
      slug: "create-gmail-account",
      category: "email-accounts",
      title: "How to Create a Gmail Account",
      devices: ["iPhone", "Android", "Windows PC", "Mac"],
      difficulty: "beginner",
      time_estimate: "5 minutes",
      last_verified: "2026-06-08",
      steps: 6,
    },
    content: `## Before You Start

Gmail is Google's free email service. Creating an account also gives you access to YouTube, Google Drive, Google Photos, and the Google Play Store.

**What you'll need:**
- A phone or computer with internet access
- A phone number (for verification — one time only)

## Step 1: Go to the Gmail Sign-Up Page

Open your web browser and go to **gmail.com**. Click the blue **Create account** button. Choose **For my personal use**.

## Step 2: Enter Your Name

Type your **First name** and **Last name**, then click **Next**. This name appears on emails you send.

## Step 3: Choose Your Email Address

Type the email address you want (for example, \`yourname@gmail.com\`). If it's taken, Google will suggest alternatives. Click **Next**.

> **Tip:** Use \`firstname.lastname@gmail.com\` for something professional.

## Step 4: Create a Password

Type a password with at least 8 characters, confirm it, then click **Next**.

**Strong password tips:**
- At least 12 characters
- Mix of uppercase, lowercase, numbers, and symbols
- Avoid "password123" or your birthday

## Step 5: Verify Your Phone Number

1. Select your country and enter your phone number
2. Choose Text message or Phone call
3. Enter the 6-digit code you receive → click **Verify**

## Step 6: Complete Your Profile

Fill in your birthday and optional recovery email. Review and accept Google's Terms of Service. Click **I agree**.

You're done! You'll be taken to your new Gmail inbox.

## Still Stuck?

- **No verification code?** Wait 30 seconds and click "Resend."
- **"Phone number used too many times"?** Try a different number or wait a few days.
- **Want it on your phone?** Download the Gmail app and sign in.`,
  },
  {
    meta: {
      slug: "how-to-take-screenshot",
      category: "smartphones",
      title: "How to Take a Screenshot on Your Smartphone",
      devices: ["iPhone", "Samsung Galaxy", "Google Pixel", "Any Android phone"],
      difficulty: "beginner",
      time_estimate: "2 minutes",
      last_verified: "2026-06-09",
      steps: 5,
    },
    content: `## Before You Start

A screenshot is a picture of exactly what's on your phone screen. Use screenshots to save recipes, capture error messages, or share conversations.

> **Tip:** Screenshots save as photos — you can text, email, or post them like any other picture.

## Step 1: Identify Your Phone Type

The button combination is different for each phone.

| Phone type | Button combo |
|------------|-------------|
| iPhone with Face ID (X or newer) | Side button + Volume Up |
| iPhone with Home button (8 or older) | Top/Side button + Home button |
| Most Android (Pixel, Motorola) | Power + Volume Down |
| Samsung Galaxy | Power + Volume Down (or palm swipe) |

**Common mistake:** Pressing the buttons in the wrong order. You must press both at the exact same time.

## Step 2: iPhone with Face ID

1. Open what you want to capture
2. Press the **right side button** and the **volume up button** at the same time
3. Release both — the screen flashes white

**Common mistake:** Pressing volume DOWN instead of volume UP. iPhones with Face ID use volume UP.

## Step 3: iPhone with Home Button

1. Press the **top/side button** and the **home button** at the same time
2. Release both — the screen flashes

## Step 4: Most Android Phones

1. Press the **power button** and **volume down button** at the same time
2. Hold for about 1 second, then release
3. A preview appears at the bottom

> **Tip:** Tap "Capture more" for a scrolling screenshot of an entire webpage.

## Step 5: Samsung Galaxy Phones

- **Button method:** Power + Volume Down at the same time
- **Palm swipe:** Swipe the edge of your palm across the screen (enable in Settings → Advanced features → Motions and gestures)

## Where to Find Screenshots

**iPhone:** Photos app → Albums → Screenshots
**Android:** Photos or Gallery app → Screenshots folder

## Still Stuck?

- **Screen doesn't flash?** Press both buttons at the exact same time — like a quick pinch.
- **Volume changes instead?** You're pressing volume first — both must go down together.
- **Button broken?** iPhone: Settings → Accessibility → Touch → AssistiveTouch → Device → Screenshot. Android: Swipe down twice → Screenshot tile.
- **Screenshots are black?** Some apps (banking, Netflix) block screenshots for security.`,
  },
  {
    meta: {
      slug: "fix-alexa-not-responding",
      category: "smart-home",
      title: "How to Fix Alexa Not Responding",
      devices: ["Amazon Echo Dot", "Echo Show", "Echo Studio", "Echo Pop", "All Echo devices"],
      difficulty: "beginner",
      time_estimate: "10 minutes",
      last_verified: "2026-06-10",
      steps: 6,
    },
    content: `## Before You Start

You say "Alexa," and nothing happens — no blue light, no response. Or the blue light spins but she ignores you. It's one of the most common Echo problems, and it's usually fixable in a few minutes without calling Amazon.

**What you'll need:**
- Your Echo device
- The Alexa app on your phone (download it free from the App Store or Google Play if you don't have it)
- Your WiFi password (you might need to reconnect)
- A paperclip (just in case you need to reset)

> **Work through the steps in order.** The first two fix the problem for most people. Save the factory reset for last.

![An Amazon Echo Dot sitting on a desk with the blue light ring glowing](PLACEHOLDER)

## Step 1: Do the Quick Checks First

Before diving into deeper fixes, check these three things that people often overlook.

**Fix 1 — Is the microphone turned off?**
Look at the top of your Echo device. There's a button with a circle and a line through it — that's the **microphone mute button**. If it's glowing **red**, your Echo's microphone is off and it CANNOT hear you.
1. Press the microphone button once
2. The red ring should disappear
3. Try saying "Alexa" again

> **Common mistake:** People bump the microphone button while dusting or moving the Echo, then wonder why Alexa stopped working. Always check for the red ring first!

**Fix 2 — Is "Alexa" the right wake word?**
Your Echo responds to a wake word — and it might not be "Alexa."
1. Open the **Alexa app** on your phone
2. Tap **Devices** at the bottom
3. Select your Echo device from the list
4. Tap the gear icon in the top right
5. Look for **Wake Word**
6. Your options are: Alexa, Amazon, Computer, Echo, or Ziggy
7. Try saying whatever word is selected

> **Common mistake:** Someone in your household changed the wake word to "Computer" as a joke, or to "Echo" so it didn't go off during Alexa commercials on TV. Always check what the wake word is actually set to!

**Fix 3 — Is the volume turned all the way down?**
Alexa might be responding — you just can't hear her.
1. Say "Alexa, volume 5" to set the volume to a middle level
2. Or press the **volume up** button on top of the Echo
3. The light ring should show white to confirm the volume change

![Close-up of an Echo Dot top showing the microphone mute button, volume buttons, and action button](PLACEHOLDER)

## Step 2: Power Cycle Your Echo Device

A power cycle (unplugging and plugging back in) clears temporary glitches in the Echo's software. This fixes the problem for most people.

**Fix 1 — Unplug and wait**
1. Unplug the Echo from the wall outlet (not just from the back of the device — the power brick can hold a charge)
2. Wait **30 full seconds** — count slowly, don't rush
3. Plug it back into the wall outlet
4. The light ring will pulse blue, then spin orange or white while it boots up
5. Wait until the light stops spinning and the Echo announces it's ready (or just wait about 60 seconds)
6. Try saying "Alexa" again

**Fix 2 — If power cycling didn't work, restart your WiFi router too**
1. Unplug your **WiFi router** from power
2. Keep your Echo unplugged
3. Wait 30 seconds
4. Plug the router back in and wait 2 minutes for it to fully restart
5. Now plug the Echo back in
6. Wait for the Echo to reconnect to WiFi (the light ring goes through its startup sequence)

> **Common mistake:** People unplug the Echo from the back of the device but leave the power brick connected to the wall. The power brick can keep a small charge, so unplug from the WALL OUTLET. If you just pop the cable out of the back of the Echo and plug it right back in, you haven't really power cycled it.

![A hand unplugging an Echo Dot power adapter from a wall outlet](PLACEHOLDER)

## Step 3: Check the Microphone and Your Speaking

If the Echo lights up blue when you say "Alexa" but doesn't respond, it heard you — it just didn't understand you.

**Fix 1 — Clean around the microphones**
1. Look at the top of your Echo — you'll see tiny holes (pin-sized). These are the microphones
2. Dust, pet hair, and crumbs can block them
3. Wipe the top gently with a dry microfiber cloth or tissue
4. For stubborn gunk, use a dry, soft-bristled toothbrush and gently brush across the holes — don't push anything into them!
5. Never spray liquid cleaner directly on the Echo

**Fix 2 — Speak clearly and at a normal distance**
1. Stand 3 to 10 feet away — NOT across the room or right in its face
2. Speak in a normal, clear voice — don't yell and don't whisper
3. When you say the wake word, pause for a half-second before giving a command: "Alexa... what's the weather?"
4. If you mumble or speak too fast, Alexa may light up blue but not know what to do

**Fix 3 — Reduce background noise**
Alexa can struggle in noisy rooms.
1. Turn off music, TV, or fans that are running near the Echo
2. Move the Echo away from speakers, air vents, and kitchen appliances
3. If two people talk at once near the Echo, it gets confused — only one person should give a command at a time

> **Common mistake:** Placing an Echo directly next to a TV speaker, a fan, or a running air conditioner. The background noise overwhelms the microphones. The Echo should be at least 3 feet away from any speaker or noise source.

![A diagram showing ideal Echo placement: on a shelf away from speakers, TV, and air vents](PLACEHOLDER)

## Step 4: Fix Your WiFi Connection

Alexa needs an internet connection for almost everything — even setting a timer. If your WiFi is weak or the Echo disconnected, she won't respond.

**Fix 1 — Check if the Echo is actually connected**
1. Open the **Alexa app**
2. Tap **Devices** at the bottom
3. Find your Echo — if it says **"Offline"** in orange or red, it's not connected to WiFi
4. Also check: in the app, does the Echo respond to app commands? If you can control it from the app but not by voice, the WiFi is probably fine — the issue is with the microphone or wake word

**Fix 2 — Move the Echo closer to the router**
WiFi weakens through walls, floors, and distance.
1. Temporarily move the Echo to the same room as your WiFi router
2. Power cycle the Echo (unplug 30 seconds, plug back in)
3. If it works in that room, the original spot has a weak signal
4. For a permanent fix: move the Echo to a better location, move the router to a more central spot, or get a WiFi extender (about $20-30)

**Fix 3 — Reconnect to WiFi through the app**
If the Echo lost its WiFi settings (happens after router changes or power outages):
1. Open the **Alexa app** → **Devices** → select your Echo → tap **Wi-Fi Network**
2. If it shows no network or the wrong network, tap **Change**
3. The app will walk you through reconnecting — your Echo will enter setup mode (orange spinning light)
4. Select your WiFi network and enter the password
5. Important: make sure you're connecting to the **correct frequency** — if your router has both 2.4 GHz and 5 GHz networks, try the other one if one doesn't work. Older Echo Dots (1st and 2nd gen) only support 2.4 GHz

> **Common mistake:** If you recently changed your WiFi password or got a new router, your Echo is still trying to connect with the OLD settings. Every smart device in your house needs the new password. Go into the Alexa app and update the WiFi for each Echo individually.

![The Alexa app screen showing a device listed as "Offline" with a red status indicator](PLACEHOLDER)

## Step 5: Check for Software Updates and Deregister

Sometimes the Echo needs a software update, or it's registered to the wrong Amazon account.

**Fix 1 — Force a software update**
Echo devices update automatically overnight, but sometimes an update gets stuck.
1. Make sure your Echo is plugged in and connected to WiFi
2. Press the **mute button** (microphone button with the circle-slash). The ring should turn red
3. Wait 15-30 minutes with the Echo muted
4. The Echo should check for and install updates during this idle time
5. Unmute the Echo and test it

You can also ask: "Alexa, check for software updates."

**Fix 2 — Check which Amazon account the Echo is registered to**
If you got a used Echo, or share an Amazon household, the Echo might be on the wrong account.
1. Open the **Alexa app** → **Devices** → select your Echo
2. Scroll down to **About** and look for **Registered to:**
3. Make sure it's registered to YOUR Amazon account
4. If it's registered to someone else's account, they need to deregister it, or you need to factory reset it (Step 6)

> **Common mistake:** Buying a used Echo from a thrift store, friend, or online marketplace and not checking if it's still registered to the previous owner's account. A used Echo that's still registered to someone else will not respond to your voice or your commands. You MUST factory reset it and set it up fresh on your own account.

![The Alexa app device settings screen showing "Registered to" with an Amazon account email](PLACEHOLDER)

## Step 6: Factory Reset the Echo Device

If nothing above worked, a factory reset wipes the Echo completely and lets you set it up from scratch — like when it was brand new. This is also required for used devices.

**For most Echo devices (Echo Dot, Echo, Echo Studio, Echo Pop):**
1. Find the **Action button** — it's the button with a dot on the top of the Echo
2. Press and **hold** the Action button for about **20-25 seconds**
3. The light ring will turn off, then pulse **orange**. KEEP HOLDING
4. After about 25 seconds, the light ring will turn **off and back on**, and the Echo will announce it's entering setup mode
5. Let go of the button
6. The light ring will now spin orange — this means it's ready to be set up
7. Open the Alexa app → **Devices** → **+ icon** → **Add Device** → **Amazon Echo** and follow the instructions

**For Echo Show (devices with screens):**
1. Swipe down from the top of the screen
2. Tap **Settings** → **Device Options** → **Reset to Factory Defaults**
3. Confirm by tapping **Reset**
4. Follow the on-screen setup instructions

**For 1st generation Echo:**
1. Find the tiny **reset hole** on the bottom of the device
2. Straighten a paperclip and gently insert it into the hole
3. Press and hold for about 5 seconds until the light ring turns orange
4. Set up through the Alexa app

> **Important:** A factory reset removes ALL your settings — WiFi, linked accounts, smart home connections, routines, alarms, everything. You'll have to set it all up again. Only do this as a last resort!

> **Common mistake:** Letting go of the Action button too early. People press it for 5-10 seconds, see the orange ring, and think the reset is done. But the orange ring at 5 seconds is just the Echo entering setup mode for WiFi pairing — NOT a full factory reset. You must hold for the full 25 seconds until the light turns off and back on again.

![A finger pressing and holding the Action button on top of an Echo Dot](PLACEHOLDER)

## Still Stuck?

- **Echo works right after a restart but stops responding again later?** Your Echo may be on the edge of your WiFi range. Even if it connects initially, a weak signal causes it to drop off later. Try moving it closer to the router or get a WiFi extender.

- **Other Echo devices in the house work fine, just this one?** Try swapping locations between the broken Echo and a working one. If the broken Echo still doesn't work in the new spot, the Echo device itself may be failing. If the working Echo now has problems in the old spot, the location has a WiFi dead zone.

- **Alexa responds but gives wrong answers or says "I'm not sure"?** This is usually a WiFi speed issue — Alexa's voice processing happens in the cloud and needs a stable connection. Run a speed test near the Echo (on your phone, go to speedtest.net). You need at least 1 Mbps for basic commands.

- **Echo is still under warranty?** Amazon Echo devices come with a 1-year limited warranty. Go to **amazon.com/help** and search "return or replace an Echo device" to check your warranty status.

- **Still nothing after a factory reset?** The device may be physically broken — most commonly the power port, microphones, or internal WiFi chip. If it's more than 3-4 years old, it might be time for a replacement. A new Echo Dot costs around $25-30 when on sale.`,
  },
  {
    meta: {
      slug: "fix-bluetooth-not-working",
      category: "smartphones",
      title: "How to Fix Bluetooth Not Working / Won't Turn On or Pair",
      devices: ["iPhone", "Samsung Galaxy", "Google Pixel", "Any Android phone", "Windows PC", "Mac"],
      difficulty: "beginner",
      time_estimate: "10 minutes",
      last_verified: "2026-06-10",
      steps: 7,
    },
    content: `## Before You Start

Bluetooth won't turn on. Or it's on, but your headphones, speaker, car, or other device won't connect. Maybe it was working yesterday and suddenly stopped. Bluetooth problems are one of the most common tech frustrations — and they affect iPhones, Android phones, Windows PCs, and Macs alike.

The fixes are the same across almost all devices. This guide walks you through them in order, from quick checks to deeper resets.

**What you'll need:**
- Your phone or computer
- The Bluetooth device you're trying to connect (charged!)
- A few minutes of patience

> **Work through the steps in order.** The first two fix the problem for most people. Save the network reset for last.

## Step 1: Do the Quick Checks First

Before diving into deeper fixes, check these three things that people overlook all the time.

**Fix 1 — Is Bluetooth actually turned on?**
It sounds obvious, but it's the #1 reason Bluetooth "doesn't work."

**iPhone:** Swipe down from the top-right corner to open Control Center. Look for the Bluetooth icon (looks like a jagged "B"). If it's gray, tap it to turn it blue. Note: tapping the Bluetooth icon in Control Center only disconnects current devices for 24 hours — it does NOT fully turn Bluetooth off. To fully toggle Bluetooth on/off, go to **Settings → Bluetooth** and flip the switch.

**Android:** Swipe down twice from the top of the screen. Find the Bluetooth icon. If it's grayed out, tap it so it's highlighted. Or go to **Settings → Connections → Bluetooth** and flip the switch on.

**Windows:** Click the network/sound/battery icon on the taskbar (bottom-right). Look for the Bluetooth tile. If it's not blue, click it to turn on. Or go to **Settings → Bluetooth & devices** and flip the Bluetooth switch.

**Mac:** Click the Bluetooth icon in the menu bar (top-right). If the icon has a diagonal line through it, click **Turn Bluetooth On**. Or go to **System Settings → Bluetooth** and click the toggle.

**Fix 2 — Is Airplane Mode on?**
Airplane Mode turns off Bluetooth along with WiFi and cellular. On most phones, you can re-enable Bluetooth while Airplane Mode is on — but sometimes it glitches and stays off.

1. Swipe into Control Center (iPhone) or Quick Settings (Android)
2. If the airplane icon is highlighted orange/blue, tap it to turn Airplane Mode **off**
3. Wait 5 seconds, then try Bluetooth again

**Fix 3 — Is the device charged and in pairing mode?**
Your headphones, speaker, or other Bluetooth device won't connect if the battery is dead — or if it's not in pairing mode.

1. Charge the device for at least 10 minutes before troubleshooting
2. Check the device's manual: most enter pairing mode by holding the power button for 5-10 seconds until a light flashes blue (or blue and red alternately)
3. If the device was previously paired with another phone or computer nearby, turn Bluetooth OFF on those other devices — Bluetooth devices can only connect to one thing at a time

> **Common mistake:** People try to pair Bluetooth headphones while the headphones are still connected to their laptop in the next room. Your headphones can't connect to your phone if they're already talking to your computer. Turn off Bluetooth on every device except the one you're trying to connect.

## Step 2: Turn Bluetooth Off and On, Then Restart

A surprising number of Bluetooth problems are caused by temporary software glitches. Toggling Bluetooth and restarting clears them.

**Fix 1 — Toggle Bluetooth off and on**
1. Go to your Bluetooth settings (Settings → Bluetooth on iPhone; Settings → Connections → Bluetooth on Android; Settings → Bluetooth & devices on Windows)
2. Turn Bluetooth **completely off**
3. Wait **10 full seconds** — don't rush this
4. Turn Bluetooth back on
5. Wait another 10 seconds for it to fully initialize
6. Try connecting again

**Fix 2 — Restart your phone or computer**
If toggling didn't help, a full restart clears deeper glitches.

**iPhone (Face ID models):**
1. Press and hold the **side button** and **volume up button** until the "slide to power off" slider appears
2. Slide to power off, wait 30 seconds
3. Press and hold the side button until the Apple logo appears

**Android:**
1. Press and hold the **power button** until the power menu appears
2. Tap **Restart**
3. Wait 60 seconds for the phone to fully restart

**Windows:**
1. Click **Start → Power → Restart**

**Mac:**
1. Click **Apple menu → Restart**

**Fix 3 — Restart the Bluetooth device too**
1. Turn the Bluetooth device completely off (not just disconnected)
2. Wait 30 seconds
3. Turn it back on and put it in pairing mode
4. Try connecting again

> **Common mistake:** People "restart" by just locking and unlocking their phone screen. That doesn't count. You need to fully power the phone off and back on. If your phone hasn't been restarted in weeks, Bluetooth glitches are almost guaranteed.

## Step 3: Forget the Device and Pair Again

Sometimes the saved pairing information gets corrupted. Your phone thinks it knows how to connect to the device, but the connection data is wrong. "Forgetting" the device wipes that stale data so you can start fresh.

**iPhone:**
1. Go to **Settings → Bluetooth**
2. Find the problematic device in the list (under "My Devices")
3. Tap the blue ⓘ icon next to its name
4. Tap **Forget This Device → Forget Device**
5. Turn Bluetooth off and back on (Step 2)
6. Put your device in pairing mode and look for it under "Other Devices"
7. Tap it to pair fresh

**Android:**
1. Go to **Settings → Connections → Bluetooth**
2. Find the problematic device in the "Paired devices" list
3. Tap the gear icon ⚙️ next to its name
4. Tap **Forget** or **Unpair**
5. Tap **Pair new device** and reconnect

**Windows:**
1. Go to **Settings → Bluetooth & devices → Devices**
2. Find the device, click the three dots (…) next to it
3. Click **Remove device → Yes**
4. Click **Add device → Bluetooth** and re-pair

**Mac:**
1. Go to **System Settings → Bluetooth**
2. Hover over the device and click the ⓘ icon
3. Click **Forget This Device → Forget Device**
4. Re-pair by putting the device in pairing mode and clicking **Connect**

> **Common mistake:** People tap the device name to reconnect without forgetting it first. If the pairing data is corrupted, reconnecting without forgetting will just fail again. Always forget first, then pair fresh.

## Step 4: Check for Interference and Range

Bluetooth has a limited range — about 30 feet (10 meters) in open air. Walls, furniture, and even your own body can cut that range significantly. Other electronics can also interfere with the signal.

**Fix 1 — Move closer**
1. Bring your phone and the Bluetooth device within 3-5 feet of each other (no walls between them)
2. Try connecting again
3. If it works at close range but not from across the room, range was the problem

**Fix 2 — Remove sources of interference**
Bluetooth uses the same 2.4 GHz frequency as many other devices. Common culprits that interfere:
- WiFi routers (especially 2.4 GHz networks)
- Microwave ovens (when running)
- USB 3.0 devices (hard drives, hubs — they emit radio noise)
- Wireless game controllers
- Baby monitors
- Thick walls, metal furniture, or large mirrors between devices

Try moving away from these sources, or turn them off temporarily to test.

**Fix 3 — Check for too many connected Bluetooth devices**
Most phones can only connect to a limited number of Bluetooth devices at once (usually 3-7 depending on the phone).

1. Go to Bluetooth settings and look at how many devices are currently connected
2. Disconnect any you're not actively using
3. Try pairing the new device again

> **Common mistake:** People put their phone in their back pocket while wearing Bluetooth earbuds. The human body is mostly water, which absorbs the 2.4 GHz Bluetooth signal. If your earbuds cut out when you put your phone in your back pocket, that's why — your body is blocking the signal. Keep your phone in a front pocket or hold it in your hand.

## Step 5: Check for Too Many Saved Bluetooth Devices

Phones remember every Bluetooth device you've ever paired with. Over time, a long list of old devices can confuse the Bluetooth system — especially if you've paired with rental cars, friend's speakers, or hotel room gadgets.

**Fix 1 — Clear out old Bluetooth devices**
1. Go to Bluetooth settings
2. Look through the list of saved/paired devices
3. For any device you no longer use (old cars, speakers you sold, hotel TVs, printers you don't own), tap **Forget** or **Unpair**
4. Clear out everything you don't actively use

**Fix 2 — If Bluetooth won't turn on at all (stuck off)**
On Android, sometimes a buggy app or a full Bluetooth cache prevents Bluetooth from turning on.

1. Go to **Settings → Apps → See all apps**
2. Tap the three-dot menu → **Show system apps**
3. Find **Bluetooth** (or **Bluetooth Share** / **Bluetooth MIDI Service**) in the list
4. Tap **Storage & cache → Clear cache**
5. Go back and also find **Settings**, clear its cache too
6. Restart your phone and try turning Bluetooth on

**iPhone — if the Bluetooth toggle is grayed out:**
A grayed-out Bluetooth toggle usually means a hardware problem, but try these first:
1. Force restart your iPhone:
   - Quickly press and release **Volume Up**, then **Volume Down**, then press and hold the **side button** until the Apple logo appears (don't slide to power off — keep holding)
2. If Bluetooth is still grayed out after a force restart, the Bluetooth chip inside the phone may have failed and needs repair

> **Common mistake:** Some people accumulate 30+ saved Bluetooth devices over the years. Each saved device takes a small slot in the Bluetooth controller's memory. While modern phones handle this better than older ones, a huge list of saved devices can still cause pairing glitches. Clean house once a year.

## Step 6: Update Your Phone or Computer

Bluetooth problems are often caused by bugs in the operating system — bugs that updates fix. If your phone is running an old version, or your computer has outdated Bluetooth drivers, updating can solve persistent Bluetooth issues.

**iPhone — Update iOS:**
1. Go to **Settings → General → Software Update**
2. If an update is available, tap **Update Now**
3. Your phone will restart during the update

**Android — Check for system updates:**
1. Go to **Settings → System → System update** (on Samsung: **Settings → Software update**)
2. Tap **Check for updates**
3. Install any available updates

**Windows — Update Bluetooth drivers:**
1. Right-click the **Start button → Device Manager**
2. Expand the **Bluetooth** category
3. Right-click your Bluetooth adapter (it may say "Intel Wireless Bluetooth" or similar)
4. Click **Update driver → Search automatically for drivers**
5. If Windows doesn't find any, go to your PC manufacturer's website (Dell, HP, Lenovo, etc.), search for your model, and download the latest Bluetooth driver from their support page

**Windows — Also run Windows Update:**
1. Go to **Settings → Windows Update**
2. Click **Check for updates** and install everything available (especially optional driver updates)

**Mac — Update macOS:**
1. Click **Apple menu → System Settings → General → Software Update**
2. Install any available updates

> **Common mistake:** People update their phone but ignore optional driver updates on Windows. Bluetooth and WiFi drivers are often listed under "Optional updates" in Windows Update. Go to **Settings → Windows Update → Advanced options → Optional updates** and check for any driver updates there — installing them fixes many Bluetooth problems.

## Step 7: Reset Network Settings (Last Resort)

If nothing above has worked, resetting your phone's network settings clears ALL Bluetooth, WiFi, and cellular settings — giving Bluetooth a completely clean slate. This is the nuclear option, but it works.

> **⚠️ Warning:** Resetting network settings will erase ALL saved WiFi networks and passwords, ALL Bluetooth pairings, and your cellular settings (APN, VPN). You'll have to re-enter your WiFi password and re-pair every Bluetooth device. Only do this as a last resort.

**iPhone — Reset Network Settings:**
1. Go to **Settings → General → Transfer or Reset iPhone → Reset**
2. Tap **Reset Network Settings**
3. Enter your passcode to confirm
4. Your iPhone will restart
5. After it restarts, go to Settings → Bluetooth, turn it on, and try pairing again

**Android — Reset Network Settings:**
1. Go to **Settings → System → Reset options** (on Samsung: **Settings → General management → Reset**)
2. Tap **Reset Wi-Fi, mobile & Bluetooth** (or **Reset network settings**)
3. Tap **Reset settings** and confirm with your PIN/password
4. Your phone will restart
5. Set up Bluetooth again from scratch

**Windows — Full Bluetooth Reset:**
1. Open **Device Manager** (right-click Start → Device Manager)
2. Expand **Bluetooth**
3. Right-click your Bluetooth adapter → **Uninstall device → Uninstall**
4. Restart your computer — Windows will automatically reinstall the Bluetooth driver
5. If Bluetooth still doesn't work after restart, download the latest driver from your PC manufacturer's website

**Mac — Reset Bluetooth Module (hidden debug menu):**
1. Hold **Shift + Option** and click the Bluetooth icon in the menu bar
2. You'll see a hidden debug menu appear
3. Click **Reset the Bluetooth module**
4. Your Mac will disconnect all Bluetooth devices and restart the Bluetooth service
5. Wait 30 seconds, then try connecting again

> **Common mistake:** On iPhone, people confuse "Reset Network Settings" with "Erase All Content and Settings." The second one wipes your entire phone — don't choose that! "Reset Network Settings" only clears network-related data (WiFi, Bluetooth, cellular). Your photos, apps, and accounts are safe.

## Still Stuck?

- **Bluetooth turns on but turns itself off immediately?** On Android, this is often caused by a buggy app. Boot into **Safe Mode** (press and hold the power button, then long-press "Power off" → "Safe Mode") and see if Bluetooth stays on. If it does, a third-party app is the cause — uninstall recently downloaded apps one by one until you find the culprit.

- **Bluetooth works but audio quality is terrible / keeps cutting out?** Make sure your Bluetooth device supports the right audio codec. In Android Developer Options (Settings → About phone → tap "Build number" 7 times), you can change Bluetooth audio codec settings. Also, some devices struggle with simultaneous WiFi and Bluetooth — try turning off WiFi to see if audio improves (this confirms interference).

- **Can't pair with your car?** Cars are notorious for having limited Bluetooth memory. Your car may have a maximum number of saved phones (often 5-10). Delete old phones from the car's Bluetooth menu (check your car's manual — usually under Settings → Phone → Bluetooth → Delete/Forget), then try pairing again.

- **Bluetooth disappeared completely from Settings?** On Windows, this usually means the Bluetooth driver crashed or was disabled. Open Device Manager, expand Bluetooth — if the adapter has a yellow triangle or red X, right-click it and select **Enable device** or **Update driver**. If it's not listed at all, Bluetooth may be disabled in the BIOS — restart and enter BIOS setup (usually F2 or Del during startup), find Bluetooth settings, and enable it.

- **iPhone Bluetooth still grayed out after force restart?** This is almost certainly a hardware failure of the Bluetooth/WiFi chip. On iPhones, the Bluetooth and WiFi chips are on the same physical component — so if both are acting up, the chip may need replacement. Contact Apple Support or visit an Apple Store. If your iPhone is under warranty (1 year) or you have AppleCare+, the repair may be free.

- **Android phone is more than 4 years old?** Older Bluetooth versions (4.2 and earlier) have more limited range and struggle with modern Bluetooth 5.0+ accessories. Check your phone's Bluetooth version in Settings → About phone. If your phone has Bluetooth 4.2 or older, compatibility issues with newer devices are common. A Bluetooth 5.0 USB adapter (for computers) or upgrading your phone may be the only fix.

- **Still nothing after resetting network settings?** The Bluetooth radio inside your phone or computer may have physically failed. For computers, a USB Bluetooth adapter costs $10-15 and bypasses the internal Bluetooth entirely. For phones, contact the manufacturer or a repair shop.`,
  },
  {
    meta: {
      slug: "fix-mouse-not-working",
      category: "computers",
      title: "How to Fix a Computer Mouse That's Not Working or Cursor Not Moving",
      devices: ["Windows 10", "Windows 11", "macOS"],
      difficulty: "beginner",
      time_estimate: "15 minutes",
      last_verified: "2026-06-10",
      steps: 6,
    },
    content: `## Before You Start

You move your mouse, but the cursor stays frozen on the screen. Or maybe the cursor vanished completely. Or the buttons click but the pointer won't budge an inch. A dead mouse brings your entire computer to a halt — and it always seems to happen at the worst possible time.

The good news: a mouse that "stopped working" is rarely actually broken. Most of the time it's a dead battery, a loose connection, a Bluetooth glitch, or a driver that needs a quick reset. This guide walks you through every fix — from the 30-second checks to the deeper solutions — for wired mice, wireless mice with USB receivers, Bluetooth mice, and laptop touchpads.

**What you'll need:**
- Your computer and the mouse that's not working
- For wireless mice: fresh batteries or a charging cable
- A second mouse if you have one (helpful for testing)
- Access to your computer's settings

> **Work through the steps in order.** Each fix builds on the last. The first two fixes solve the problem for about 70% of people — you probably won't need all six.

> **Can't use your mouse at all?** You can navigate Windows without a mouse using your keyboard. Press the **Tab key** to move between buttons and fields, **arrow keys** to move within menus, and **Enter** to click. On Mac, press **Cmd+Space** to open Spotlight and type the name of any setting. See the tip at the end of each fix for keyboard-only shortcuts.

## Fix 1: Check the Obvious Physical Stuff (Batteries, Power Switch, Cable)

Before you touch a single setting, rule out the physical causes. A huge percentage of "broken mouse" calls turn out to be a dead battery or a cable that's half-unplugged.

**Fix 1a — For wireless mice: check the batteries and power switch**

1. Pick up your mouse and turn it over. Look for a small **On/Off switch** on the bottom. Make sure it's switched to **On**. This sounds silly, but mice get switched off in bags and drawers all the time.
2. Open the battery compartment (usually a sliding panel on the bottom or top). If your mouse uses AA or AAA batteries, take them out and put in fresh ones. Even if the old ones "worked yesterday," wireless mice drain batteries unpredictably.
3. If your mouse has a built-in rechargeable battery, connect it to a charging cable and let it charge for at least 15 minutes before testing. A completely dead rechargeable mouse may need 30+ minutes before it has enough power to turn on.
4. Look for an **LED light** on the bottom of the mouse (the optical sensor). Most mice have a red or invisible infrared light that glows when the mouse has power. If there's no light, the mouse isn't getting power — the batteries are dead, the switch is off, or the mouse has failed.

**Fix 1b — For wired mice: check the cable and USB connection**

1. Unplug the mouse's USB cable from your computer and plug it back in firmly. Try a **different USB port** — ports can fail individually while others on the same computer work fine.
2. If you're using a USB hub (those little boxes that split one USB port into several), unplug the mouse from the hub and plug it **directly into your computer**. USB hubs — especially unpowered ones — are a very common failure point.
3. Look at the mouse cable. Is it frayed, kinked, or chewed? A damaged cable can work intermittently — the cursor moves sometimes and freezes at others. If the cable looks damaged anywhere along its length, the mouse needs to be replaced.
4. If you have a different USB cable (some gaming mice use detachable micro-USB or USB-C cables), try swapping it.

**Fix 1c — For laptop touchpads: check the touchpad isn't disabled**

1. Many laptops have a keyboard shortcut that accidentally disables the touchpad. Look at your keyboard's top row (the F1–F12 keys) for a key with an icon that looks like a touchpad with a line through it.
2. Press that key. On most laptops, you need to hold the **Fn key** (bottom-left of the keyboard) while pressing the touchpad key.
3. Try pressing it twice — the first press may disable it, the second re-enables it. You're aiming for the setting where the touchpad works again.

> **Keyboard-only tip (Windows):** Press the **Windows key**, type "touchpad," and press Enter to open Touchpad settings. Press **Tab** until you reach the on/off toggle, then press **Spacebar** to toggle it.

> **Common mistake:** People replace the batteries in a wireless mouse, see the cursor still doesn't move, and assume the mouse is dead. But many wireless mice need to be turned off and back on after a battery change — the power cycle forces the mouse to re-establish its connection. After fresh batteries, flip the power switch to **Off**, wait 5 seconds, then switch it back to **On**.

## Fix 2: Reconnect Your Wireless Mouse (USB Receiver or Bluetooth)

If your mouse has power but still won't move the cursor, the wireless connection between the mouse and your computer has dropped. This is especially common after a system update or if the mouse was used with a different computer.

**Fix 2a — For mice with a USB receiver (the little nub that plugs into a USB port)**

1. Look at the USB receiver plugged into your computer. Some receivers have a small **button** on them — press and hold it for 3–5 seconds to force a re-pair.
2. If the receiver doesn't have a button: unplug the USB receiver, wait 10 seconds, then plug it back in. Windows/macOS will reload the driver and the mouse should reconnect automatically.
3. Still not working? Look for a small **Connect** or **Pair** button on the bottom of your mouse. Press and hold it for 3–5 seconds until an LED starts flashing. The mouse is now searching for the receiver.
4. If your mouse came with a **unifying receiver** (Logitech devices especially), you may need Logitech's free Unifying Software or Logi Options+ app to re-pair it. Download it from logitech.com.

**Fix 2b — For Bluetooth mice**

**Windows:**

1. Press **Windows key + I** to open Settings (or use the keyboard to navigate: Windows key → type "bluetooth" → Enter).
2. Click **Bluetooth & devices**. Make sure Bluetooth is turned **On**.
3. Scroll down and look for your mouse under the list of paired devices. If it says "Paired" but isn't working, click the three dots (**...**) next to it and select **Remove device**. Then re-pair it.
4. To re-pair: put your mouse into pairing mode (usually hold the Connect/Pair button on the bottom until an LED flashes blue). Then in Bluetooth settings, click **Add device → Bluetooth** and select your mouse from the list.

**Mac:**

1. Click the **Apple menu** (top-left) → **System Settings** → **Bluetooth**.
2. Make sure Bluetooth is **On**. Find your mouse in the device list.
3. If it says "Connected" but the cursor won't move, click the small **info (i)** icon next to the mouse name and select **Forget This Device** → **Forget Device**.
4. To re-pair: put your mouse into pairing mode (hold the button on the bottom until an LED flashes). In Bluetooth settings, find your mouse under "Nearby Devices" and click **Connect**.

**Fix 2c — Reduce wireless interference**

Wireless mice (both USB receiver and Bluetooth) operate on the 2.4 GHz frequency — the same as WiFi routers, microwaves, and cordless phones. Interference can make the cursor stutter or freeze.

1. Move your mouse closer to your computer — within 1–2 feet if possible.
2. If the USB receiver is plugged into the back of a desktop tower under a metal desk, move it to a front USB port. Metal and thick wood can block the signal.
3. If you're using a USB 3.0 port, try a USB 2.0 port instead. USB 3.0 ports can generate radio interference at the 2.4 GHz frequency that disrupts wireless mice. This is a known issue — if your computer has both blue (USB 3.0) and black (USB 2.0) ports, try the black one.
4. Temporarily move WiFi routers, cordless phone bases, and other wireless devices at least 3 feet away from your mouse and receiver.

> **Common mistake:** People unpair their Bluetooth mouse and then can't figure out how to re-pair it — because they can't use the mouse to click "Add device"! Remember: you can navigate Bluetooth settings entirely with the keyboard. Use **Tab** to move between buttons, **arrow keys** for lists, and **Enter** to click. On Mac, press **Cmd+Space**, type "Bluetooth," and press Enter to jump there instantly.

## Fix 3: Restart Your Computer and Test with a Different Mouse

Sometimes the mouse driver gets stuck in a bad state. A restart clears it — and testing with a different mouse tells you instantly whether the problem is the mouse or the computer.

**Fix 3a — Restart your computer**

1. Save any open work using keyboard shortcuts: **Ctrl+S** (Windows) or **Cmd+S** (Mac).
2. **Windows:** Press **Ctrl+Alt+Delete**, then press **Tab** until the power icon in the bottom-right is highlighted, press **Enter**, then use arrow keys to select **Restart** and press Enter again.
3. **Mac:** Press **Control+Command+Power button** (or **Control+Command+Eject** on older Macs) to force a restart. Or press **Control+Power** to bring up the shutdown dialog, then press **R** for Restart.
4. After the computer restarts, test the mouse on the login screen. If the mouse works on the login screen but stops working after you sign in, something in your user account is causing the problem — skip to Fix 5.

**Fix 3b — Test with a different mouse**

This is the single most important test in the entire guide. It instantly tells you whether to keep troubleshooting the computer or replace the mouse.

1. Borrow any working mouse — from another computer in your house, a family member, or even an old one from a drawer.
2. Plug it in (or connect via Bluetooth). If the borrowed mouse works immediately, your original mouse is defective — replace it.
3. If the borrowed mouse also doesn't work, the problem is with your computer's USB port, Bluetooth, or drivers. Continue to Fix 4.

**Fix 3c — For laptop users: test the built-in touchpad**

If you're troubleshooting an external mouse on a laptop, use the built-in touchpad to navigate while you fix the external mouse. If the touchpad also isn't working, the problem is deeper than a mouse issue — your computer may have a system-wide input driver problem.

> **Common mistake:** People skip the "test with a different mouse" step because they don't have a spare mouse handy. But this single test saves more time than any other troubleshooting step. Borrow a mouse from another family member's computer, a neighbor, or even a cheap spare from a drawer. It takes 30 seconds and instantly answers the most important question: is the mouse broken, or is the computer the problem?

## Fix 4: Update or Reinstall the Mouse Driver (Windows)

A corrupted, outdated, or missing mouse driver can cause the cursor to freeze, stutter, or disappear entirely. This is especially likely if the problem started right after a Windows update.

**Check the driver first:**

1. Right-click the **Start button** (Windows logo) — or press **Windows key + X** on your keyboard.
2. Select **Device Manager**.
3. Find **Mice and other pointing devices** and click the small arrow to expand it.
4. Look for your mouse in the list. Common names: "HID-compliant mouse," "Logitech," "Microsoft," or your mouse brand.

What you see tells you a lot:
- **Mouse listed, no warning icon:** The driver is loaded. Proceed to update it.
- **Mouse listed with a yellow triangle:** The driver has a problem. Right-click → **Properties** to see the error code.
- **Mouse not listed at all:** The driver may be missing entirely. Skip to the "Show hidden devices" step.

**Fix 4a — Update the driver automatically**

1. Right-click your mouse in Device Manager and select **Update driver**.
2. Choose **Search automatically for drivers**. Windows will check online for a newer version.
3. If Windows finds and installs a new driver, restart your computer and test.

**Fix 4b — Update the driver manually (more reliable)**

1. In Device Manager, double-click your mouse to open its properties. Go to the **Driver** tab and write down the driver version and date.
2. Go to your mouse manufacturer's website:
   - **Logitech:** logitech.com → Support → Downloads
   - **Microsoft:** microsoft.com/accessories → Downloads
   - **Razer:** razer.com → Support → Download
   - **Generic mice:** The standard Windows HID driver handles these — no manual download needed
3. Download the latest driver for your exact mouse model. Install it and restart your computer.

**Fix 4c — Uninstall and reinstall the driver**

If updating doesn't help, a clean reinstall often fixes stubborn driver issues.

1. In Device Manager, right-click your mouse and select **Uninstall device**.
2. If a checkbox appears that says **Attempt to remove the driver for this device**, leave it UNCHECKED (you want Windows to be able to reinstall it automatically).
3. Click **Uninstall**. Your mouse will stop working immediately — this is expected.
4. **Restart your computer** using the keyboard: press **Ctrl+Alt+Delete**, Tab to the power icon, and select Restart.
5. Windows will automatically detect the mouse and reinstall a clean driver on startup.

**Fix 4d — Show hidden devices (if your mouse isn't listed)**

1. In Device Manager, click the **View** menu at the top.
2. Select **Show hidden devices**.
3. Expand **Mice and other pointing devices** again. You may now see your mouse grayed out — this means the driver was installed but isn't currently active.
4. Right-click the grayed-out mouse and select **Uninstall device**. Then restart your computer.

> **Warning:** When you uninstall the mouse driver in Fix 4c, your mouse will stop working completely. You MUST use your keyboard to restart the computer. If you're uncomfortable with keyboard-only navigation, plug in a second mouse before uninstalling, or skip to Fix 6 and try a system restore instead.

> **Common mistake:** People download "driver updater" software from random websites instead of getting drivers from the manufacturer's official site. These tools often install wrong or outdated drivers, bundle adware, and cause more problems than they solve. Always get your mouse driver from the manufacturer's website — Logitech, Microsoft, Razer, etc. If your mouse is a generic no-brand model, the standard Windows driver handles it fine; no third-party tool is needed.

## Fix 5: Check for Software Conflicts and Settings That Disable the Mouse

Some programs and settings can interfere with mouse input — especially screen recording software, remote desktop tools, gaming overlay apps, and accessibility features.

**Fix 5a — Boot into Safe Mode to test**

Safe Mode loads Windows with only the bare-minimum drivers. If your mouse works in Safe Mode but not in normal mode, a third-party program is the culprit.

1. **Windows 10/11:** Press **Windows key + R**, type \`msconfig\`, and press Enter. Go to the **Boot** tab, check **Safe boot**, select **Minimal**, and click **OK**. Restart your computer.
2. On the login screen, test your mouse. If it works, the problem is being caused by a program that loads on startup.
3. To exit Safe Mode: open \`msconfig\` again, go to the **Boot** tab, uncheck **Safe boot**, and restart.

**Fix 5b — Close conflicting programs**

These types of programs commonly interfere with mouse input:

- **Screen recording/streaming software** (OBS Studio, Streamlabs, Xbox Game Bar)
- **Remote desktop software** (TeamViewer, AnyDesk, Chrome Remote Desktop, Parsec)
- **Gaming overlay apps** (Discord overlay, NVIDIA GeForce Experience overlay, Steam overlay)
- **Mouse configuration software** (Logitech G Hub, Razer Synapse, Corsair iCUE) — these can glitch and disable your mouse instead of enhancing it
- **Virtual machine software** (VMware, VirtualBox) — they can "capture" the mouse and not release it back to your main desktop

Close these programs one at a time and test the mouse after each. Press **Ctrl+Shift+Esc** to open Task Manager, find the program in the list, select it with the arrow keys, and press **Delete** key to end the task.

**Fix 5c — Check accessibility settings (Mac)**

Mac's Mouse Keys feature lets you control the cursor with keyboard keys — but if accidentally turned on, it can make the mouse behave unpredictably.

1. Open **System Settings → Accessibility → Pointer Control**.
2. Click **Alternate Control Methods**. Make sure **Mouse Keys** is turned **Off**.
3. While you're there, check that **Double-click speed** isn't set too fast (try the middle setting).

**Fix 5d — Check for a disabled touchpad (laptops)**

Some laptops automatically disable the touchpad when a USB or Bluetooth mouse is connected. This is a feature, not a bug — but it can be confusing if you unplug the mouse and the touchpad stays dead.

1. **Windows:** Go to **Settings → Bluetooth & devices → Touchpad**. Make sure "Leave touchpad on when a mouse is connected" is checked.
2. **Mac:** Go to **System Settings → Trackpad**. Look for "Ignore built-in trackpad when mouse or wireless trackpad is present" and uncheck it if you want the trackpad to always work.

> **Common mistake:** People install mouse software (Logitech G Hub, Razer Synapse, etc.) to customize buttons and DPI, then the mouse stops working and they forget the software is even running. These mouse utilities run in the background and can crash or conflict with Windows updates. If your mouse stopped working right after installing or updating mouse software, uninstall that software through **Settings → Apps → Installed apps**, then restart your computer.

## Fix 6: Run System Restore or Check for macOS Updates

If your mouse was working yesterday and stopped today — and nothing you've tried has helped — a recent system change may be the cause.

**Windows — Use System Restore:**

System Restore rolls your computer back to a previous state without affecting your personal files (documents, photos, etc.).

1. Press **Windows key**, type "recovery," and select **Recovery** from the results.
2. Click **Open System Restore**.
3. Click **Next**. You'll see a list of restore points with dates. Look for a date before the mouse problem started.
4. Select a restore point, click **Next**, then **Finish**. Your computer will restart and begin the restore process (this can take 15–45 minutes).
5. After the restore completes, test your mouse.

> **What gets affected:** System Restore uninstalls programs, drivers, and Windows updates installed AFTER the restore point date. Your documents, photos, and personal files are NOT affected. But any programs installed after the restore point will need to be reinstalled.

**Mac — Check for macOS updates:**

On a Mac, mouse drivers are part of the operating system. A macOS update can fix or break mouse support.

1. Click the **Apple menu** → **System Settings** → **General** → **Software Update**.
2. If an update is available, install it and restart.
3. If your mouse problem started right AFTER a macOS update, you may need to wait for a bug-fix update from Apple. In the meantime, try a wired mouse — wired mice rarely have compatibility issues with macOS updates.

**Mac — Reset NVRAM (Intel Macs only):**

NVRAM stores hardware settings including mouse and trackpad preferences.

1. Shut down your Mac completely.
2. Press the power button, then immediately press and hold **Option + Command + P + R**.
3. Keep holding all four keys for about 20 seconds (on older Macs, you'll hear the startup chime twice).
4. Release the keys and let your Mac start normally.

**Mac — Reset the Bluetooth module (for Bluetooth mice):**

1. Hold **Shift + Option** and click the **Bluetooth icon** in the menu bar (top-right).
2. In the expanded menu, click **Reset the Bluetooth module**.
3. Click **OK** to confirm. All Bluetooth devices will disconnect and reconnect.
4. Your Bluetooth mouse should reconnect automatically. You may need to click it in the Bluetooth settings to reconnect.

> **Common mistake:** People run System Restore and panic when they see programs are missing afterward. System Restore ONLY affects system files, drivers, and programs — your personal documents, photos, music, and files are untouched. However, any program installed after the restore point date will need to be reinstalled. Before running System Restore, make a mental note of any programs you installed recently so you can reinstall them afterward.

## Still Stuck?

- **Mouse works on another computer but not yours?** The problem is your computer's USB port, Bluetooth adapter, or driver. Try every USB port on your computer — front, back, and sides. On a desktop, the front USB ports are connected to the motherboard by a thin internal cable that can come loose. Try the back ports instead.

- **Cursor moves erratically (jumps across the screen, moves on its own)?** This is different from a frozen cursor. If you're using an optical mouse, the sensor on the bottom may be dirty — clean it with a dry cotton swab. Also, try using a mouse pad — some desk surfaces (glass, glossy wood, reflective metal) confuse optical sensors.

- **Cursor moves but clicks don't work?** This suggests the mouse's buttons have failed, not the sensor or connection. Try a different mouse to confirm. If a different mouse works normally, your original mouse needs to be replaced.

- **Touchpad works but external mouse doesn't?** On laptops, go to **Settings → Bluetooth & devices → Touchpad** and make sure your touchpad isn't set to disable when a mouse is connected. Also try the mouse on a different computer to rule out a hardware fault.

- **Mouse and keyboard both stopped working?** This usually means a system-level USB driver failure. On Windows, unplug both devices, force a hard shutdown by holding the power button for 10 seconds, wait 30 seconds, then restart. On Mac, reset the SMC (System Management Controller) — search Apple's support site for your specific Mac model's SMC reset procedure.

- **Wireless mouse works for a few minutes then stops?** This is classic wireless interference or a dying battery. Fresh batteries and moving the receiver closer to the mouse (use a USB extension cable to bring the receiver onto your desk instead of behind the computer) fixes this in most cases.

- **Nothing has worked — should you replace the mouse?** If you've tested the mouse on a different computer (and it doesn't work), tested a different mouse on your computer (and it does work), and gone through every software fix in this guide, yes — your mouse has a hardware fault. The good news: a basic wired mouse costs $10–15, and a decent wireless mouse costs $20–30. But make sure you've done the "different mouse" test in Fix 3b before spending money — replacing a mouse won't help if your computer's USB port is the real problem.`,
  },
];

export function getAllGuides(): GuideMeta[] {
  return ALL_GUIDES.map((g) => g.meta);
}

export function getGuideBySlug(category: string, slug: string): GuideContent | null {
  return ALL_GUIDES.find((g) => g.meta.category === category && g.meta.slug === slug) ?? null;
}

export function getGuidesByCategory(category: string): GuideMeta[] {
  return ALL_GUIDES.filter((g) => g.meta.category === category).map((g) => g.meta);
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}
