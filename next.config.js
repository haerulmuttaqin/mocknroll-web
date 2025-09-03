/** @type {import('next').NextConfig} */

const {i18n} = require('./next-i18next.config')
const nextConfig = {
    env: {
        SHARP_IGNORE_GLOBAL_LIBVIPS: '1',
        NEXT_DISABLE_SHARP: '1'
    },
    experimental: {
        scrollRestoration: true,
        forceSwcTransforms: true,
    },
    webpack: (config, { isServer }) => {
        // Completely disable Sharp for both client and server
        config.resolve.fallback = {
            ...config.resolve.fallback,
            sharp: false,
        };
        
        // Exclude Sharp from the bundle
        config.externals = config.externals || [];
        if (isServer) {
            config.externals.push('sharp');
        }
        
        // Add alias to prevent Sharp imports
        config.resolve.alias = {
            ...config.resolve.alias,
            sharp: false,
        };
        
        // Ignore Sharp in module resolution
        config.resolve.modules = [
            ...config.resolve.modules,
            'node_modules'
        ];
        
        // Add plugin to ignore Sharp
        config.plugins.push(
            new (require('webpack')).IgnorePlugin({
                resourceRegExp: /^sharp$/,
                contextRegExp: /.*/
            })
        );
        
        return config;
    },
    async headers() {
        return [{
            //cache all images, fonts, etc. in the public folder
            //Note: Next.js default is 'public, max-age=0' which cases many reloads on Safari!
            //Note: we use version hashes and therefore can use immutable
            source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|mp4|ttf|otf|woff|woff2)',

            headers: [{
                key: 'cache-control',
                value: 'public, max-age=31536000, immutable'
            }]
        }];
    },
    reactStrictMode: false,
    pageExtensions: ['tsx'],
    i18n,
    poweredByHeader: false,
    generateEtags: false,
    trailingSlash: false,
    images: {
        unoptimized: true,
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                port: '',
                pathname: '/api/**',
            },
            {
                protocol: 'https',
                hostname: 'wac-cdn-bfldr.atlassian.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'wac-cdn.atlassian.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
            },
            {
                protocol: 'https',
                hostname: 'vid-thumb-api.hae.my.id',
                port: '',
                pathname: '/thumbnail/**',
            },
            {
                protocol: 'https',
                hostname: 'hls-thumbnail-api.pasbe.id',
                port: '',
                pathname: '/thumbnail/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3033',
                pathname: '/thumbnail/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8111',
                pathname: '/generate-thumbnail/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8111',
                pathname: '/thumbnail/**',
            },
            {
                protocol: 'https',
                hostname: 'api.producthunt.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    transpilePackages: [
        // Atlaskit packages using Compiled directly or transitively
        // will need to be added here in order for Next to pick up the internal
        // CSS imports
        "@atlaskit/header",
        "@atlaskit/modal-dialog",
        "@atlaskit/dropdown-menu",
        "@atlaskit/datetime-picker",
        "@atlaskit/calendar",
        "@atlaskit/tooltip",
        "echarts",
        "zrender",
    ],
}
module.exports = nextConfig
