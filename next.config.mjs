import withPWAInit from "@ducanh2912/next-pwa";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      const WebpackObfuscator = require('webpack-obfuscator');
      config.plugins.push(
        new WebpackObfuscator({
          compact: true,
          controlFlowFlattening: true,
          deadCodeInjection: false,
          debugProtection: true,
          disableConsoleOutput: true,
        }, ['**/*.js'])
      );
    }
    return config;
  },
};

export default withPWA(nextConfig);
