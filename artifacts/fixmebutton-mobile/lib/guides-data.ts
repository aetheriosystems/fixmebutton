export interface GuideMeta {
  slug: string;
  category: string;
  title: string;
  devices?: string[];
  difficulty?: string;
  time_estimate?: string;
  last_verified?: string;
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

## Step 3: Optimize Photos

Photos are usually the biggest space hog. Instead of deleting them, let your iPhone store smaller versions locally and full-resolution copies in iCloud.

1. Go to **Settings → [Your Name] → iCloud → Photos**
2. Turn on **iCloud Photos** if it's not already on
3. Below it, select **Optimize iPhone Storage**

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

## Step 6: Empty the Recently Deleted Album

When you delete photos, they go to a "Recently Deleted" folder for 30 days — still taking up space.

1. Open the **Photos** app
2. Scroll down to **Recently Deleted** under Utilities
3. Tap **Select** → **Delete All**

## Step 7: Restart Your iPhone

Sometimes your iPhone miscounts available space. A restart forces it to recalculate.

1. Press and hold the **side button** and either **volume button** until the "slide to power off" slider appears
2. Slide to power off, wait 30 seconds, then press the side button to restart`,
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

## Step 4: Tap to Connect

1. Tap the name of your headphones in the list
2. Wait a few seconds for "Connecting..." then "Connected"

## Step 5: Test the Connection

1. Open any app with sound — YouTube, Spotify, or just play a video
2. The sound should come through your headphones now`,
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

Go to **Settings → General → Transfer or Reset iPhone → Erase All Content and Settings** on your old iPhone.`,
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

Aim for at least 20 GB of free space.

## Step 5: Check for Malware (Windows)

1. Open **Windows Security** → **Virus & threat protection** → **Quick scan**
2. Also remove browser extensions you don't recognize

## Step 6: Update Your Operating System

**Windows:** Settings → Windows Update → Check for updates

**Mac:** Apple menu → System Settings → General → Software Update

## Step 7: Consider Hardware Upgrades

1. **Replace HDD with SSD** — single biggest speed upgrade. Cost: $30-60.
2. **Add more RAM** — helps if you run many programs. Cost: $25-50.`,
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

Find an available HDMI port on your TV and plug in the Roku. If it's a streaming stick, it plugs directly in.

## Step 2: Connect the Power

Plug the USB power cable into the Roku, then into the included power adapter, then into a wall outlet.

Important: Use the wall adapter — your TV's USB port may not provide enough power.

## Step 3: Switch Your TV to the Right Input

Use your **TV remote** and press **Input/Source**. Select the HDMI port where you plugged in the Roku.

## Step 4: Pair the Roku Remote

Insert batteries into the remote. It should pair automatically. If not, press and hold the small button inside the battery compartment for 5 seconds.

## Step 5: Choose Language and Connect to WiFi

Use the arrow keys to select your language, then connect to your WiFi network and enter your password.

## Step 6: Create or Sign In to Your Roku Account

Your TV will show a code and the website **roku.com/link**. Go there on your phone or computer, enter the code, and sign in or create a free account.

## Step 7: Set Up Your Channels

Roku will suggest popular channels — Netflix, Hulu, Disney+, YouTube, Prime Video. Select the ones you use and they'll install automatically.

## Step 8: Complete Setup and Start Watching

You'll land on the Roku home screen. Open a channel, sign in with your account for that service, and start watching!`,
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

What's normal? Streaming Netflix: 5-25 Mbps. Video calls: 3-10 Mbps. Browsing: 1-5 Mbps.

## Step 2: Restart Your Router and Modem

1. Unplug the power from both your router and modem
2. Wait **60 seconds**
3. Plug the modem in first, wait for lights to stabilize
4. Plug the router in, wait 2 minutes
5. Run the speed test again

## Step 3: Move Closer to Your Router

WiFi weakens with distance and through walls. Move your device to the same room as the router and test again.

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

Type the email address you want. If it's taken, Google will suggest alternatives. Click **Next**.

Tip: Use firstname.lastname@gmail.com for something professional.

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

You're done! You'll be taken to your new Gmail inbox.`,
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

export function searchGuides(query: string): GuideMeta[] {
  const q = query.toLowerCase();
  return ALL_GUIDES
    .filter((g) =>
      g.meta.title.toLowerCase().includes(q) ||
      (g.meta.devices || []).some((d) => d.toLowerCase().includes(q)) ||
      g.meta.category.toLowerCase().includes(q)
    )
    .map((g) => g.meta);
}
