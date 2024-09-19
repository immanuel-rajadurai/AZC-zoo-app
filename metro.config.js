// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.resolver = {
    ...resolver,
    assetExts: [...resolver.assetExts, 'json', 'bin'].filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = config;
