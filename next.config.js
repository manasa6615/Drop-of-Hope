const withPWA = require('next-pwa')({
    dest: 'public',
    disable: true, // Disable PWA in development to avoid Turbopack conflicts
    register: true,
    skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    turbopack: {}, // Clear turbopack config to silence warnings
};

module.exports = withPWA(nextConfig);
