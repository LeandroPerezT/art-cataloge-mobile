# Art Catalog

Discover and explore the captivating collection of artworks from the Art Institute of Chicago. Browse through the extensive catalog and bookmark your favorite masterpieces for easy access.

## Prerequisites

- Node.js and npm/yarn
- Xcode (for iOS development)

## Installation & Setup

Clone the repository:

\`bash
git clone [Repository URL]
cd ArtCatalog
\`

Install dependencies:

\`bash
npm install
\`

or if you're using yarn:

\`bash
yarn install
\`

### iOS Setup

📣 Please note: This MVP currently supports only iOS. Android coverage will be addressed in future updates.

1. **Install Pods**

   Navigate to the `ios` directory and install the necessary pods:

   \`bash
   cd ios && pod install
   \`

2. **Running on a Simulator**

   Start the app on the iOS simulator with:

   \`bash
   react-native run-ios
   \`

   Specify a particular simulator by adding the `--simulator` flag followed by the simulator's name, e.g., `--simulator="iPhone 11"`.

3. **Running on a Physical Device**

   To launch on a physical device:
   - Open the `.xcworkspace` file within the `ios` directory using Xcode.
   - Connect your iOS device and select it as the target.
   - Hit the play button or `Cmd + R` to build and run the app on your device.

## Features

- 🎨 Seamlessly integrated with the **Art Institute of Chicago API** to fetch intricate details of artworks.
- ⚙️ Employs **RTK Query** for streamlined API calls, reducing redundancy and enhancing performance.
- 📌 Leverages **MMKV storage** for efficient bookmark management, allowing you to save and revisit your cherished artworks.
- 🖼️ Enhanced **progressive image rendering** for a fluid and visually pleasing user experience.
- 💀 Engaging **skeleton loading** indicators during data fetches, assuring users of background activity.
- 📖 A dedicated **bookmarks screen** to help you manage and view your saved pieces effortlessly.
- 🌌 Experience the magic of **shared element transition** using Reanimated, making transitions between the gallery list and Artwork detail screen seamless and engaging.
- 🌐 Comprehensive navigation and routing powered by **React Navigation** for an intuitive user journey.
