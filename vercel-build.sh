#!/bin/bash
# vercel-build.sh - Build script for Vercel deployment

# Set environment variables to prevent Sharp issues
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
export NEXT_DISABLE_SHARP=1
export NODE_ENV=production

# Remove Sharp if it exists
npm uninstall sharp --silent || true

# Install dependencies
npm install --production --platform=linux --arch=x64

# Build the application
npm run build
