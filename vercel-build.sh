# Vercel build configuration
# This file ensures Sharp is properly handled during Vercel deployment

# Set environment variables for Sharp
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
export NEXT_SHARP_PATH=/tmp/node_modules/sharp

# Install Sharp for Linux x64 platform
npm install sharp --platform=linux --arch=x64 --target=18.17.0
