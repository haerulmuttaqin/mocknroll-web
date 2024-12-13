/** @type {import('next').NextConfig} */

const {i18n} = require('./next-i18next.config')
const nextConfig = {
    experimental: {
        scrollRestoration: true,
        forceSwcTransforms: true,
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
    swcMinify: true,
    pageExtensions: ['tsx'],
    i18n,
    images: {
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
        ],
    },
}
module.exports = nextConfig
