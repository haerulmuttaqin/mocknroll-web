#!/bin/bash
# build.sh - Robust build script for Vercel

set -e

echo "🔧 Installing dependencies..."
npm install --legacy-peer-deps --silent

echo "📦 Ensuring TypeScript is installed..."
npm install typescript@^5.9.2 --save-dev --silent

echo "🗑️ Removing Sharp..."
npm uninstall sharp --silent || true

echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!"
