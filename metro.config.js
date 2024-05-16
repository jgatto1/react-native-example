/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const { getDefaultConfig } = require('metro-config');

const ARExtension = ['obj', 'mtl', 'JPG', 'vrx', 'hdr', 'gltf', 'glb', 'bin', 'fbx', 'arobject', 'gif'];

const withoutSVG = (assetExts) => {
  return assetExts.filter((ext) => ext !== 'svg');
};

const withoutARExtensions = (sourceExts) => {
  return sourceExts.filter((ext) => !ARExtension.includes(ext))
}

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: [...withoutSVG(assetExts), ...ARExtension],
      sourceExts: [...withoutARExtensions(sourceExts), 'svg'],
    },
  };
})();
