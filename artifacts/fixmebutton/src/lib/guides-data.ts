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
