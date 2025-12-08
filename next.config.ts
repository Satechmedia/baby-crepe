import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty turbopack config to silence the warning in dev mode
  turbopack: {},
  webpack: (config, { isServer }) => {
    // Fix for @web3modal/wagmi and related packages
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        encoding: false,
      };
    }

    // Ignore optional peer dependencies for wagmi connectors
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@base-org/account': false,
      '@gemini-wallet/core': false,
      'porto': false,
      '@safe-global/safe-apps-provider': false,
      '@react-native-async-storage/async-storage': false,
    };

    // Ignore pino and thread-stream to avoid SSR issues
    config.externals = config.externals || [];
    if (isServer && Array.isArray(config.externals)) {
      config.externals.push('pino', 'thread-stream', 'pino-pretty');
    }

    return config;
  },
  // Transpile these packages
  transpilePackages: ['@web3modal/wagmi', '@web3modal/base'],
  // Server external packages
  serverExternalPackages: ['pino', 'thread-stream', 'pino-pretty'],
};

export default nextConfig;
