import { ViroAnimations, ViroMaterials } from '@viro-community/react-viro';

enum Materials {
  Logo = 'logo',
  Gold = 'gold',
  Plate = 'plate',
  PlateLogo = 'plateLogo',
  LanternGold = 'lanternGold',
  LanternMetal = 'lanternMetal',
  BluePlane = 'blue_plane',
  RedPlane = 'red_plane',
  GreenPlane = 'green_plane',
}

ViroMaterials.createMaterials({
  [Materials.Logo]: {
    lightingModel: 'PBR',
    diffuseTexture: require('./3D/SS-AR-Marker.png'),
  },
  [Materials.Gold]: {
    lightingModel: 'PBR',
    metalness: 0.8,
    diffuseTexture: require('./3D/models/plate/gold.jpg'),
  },
  [Materials.Plate]: {
    lightingModel: 'PBR',
    diffuseTexture: require('./3D/models/plate/trunk.jpg'),
  },
  [Materials.PlateLogo]: {
    lightingModel: 'PBR',
    diffuseTexture: require('./3D/models/plate/logo.jpg'),
  },
  [Materials.BluePlane]: {
    lightingModel: 'Constant',
    diffuseColor: 'rgba(0,0,255,0.11)',
  },
  [Materials.RedPlane]: {
    lightingModel: 'Constant',
    diffuseColor: '#ff000050',
  },
  [Materials.GreenPlane]: {
    lightingModel: 'Constant',
    diffuseColor: '#00ff0050',
  },
});

enum Animations {
  ScaleTree = 'ScaleTree',
  ScaleLogo = 'ScaleLogo',
  ButterflyIn = 'ButterflyIn',
  ButterflyOut = 'ButterflyOut',
}

ViroAnimations.registerAnimations({
  [Animations.ScaleTree]: {
    // properties: {scaleX: 0.0025, scaleY: 0.0025, scaleZ: 0.0025},
    properties: { scaleX: 1, scaleY: 1, scaleZ: 1 },
    duration: 1500,
    easing: 'easeineaseout',
  },
  [Animations.ScaleLogo]: {
    properties: { scaleX: 0.4, scaleY: 0.0001, scaleZ: 0.4 },
    duration: 500,
    easing: 'easeineaseout',
  },
  [Animations.ButterflyIn]: {
    properties: { positionX: 0.2, positionY: 0.025, positionZ: -0.1, rotateX: 0.2 },
    duration: 6000,
  },
  [Animations.ButterflyOut]: {
    properties: { positionX: 0, positionY: 0, positionZ: 0, rotateX: 0 },
    duration: 6000,
  },
});

export const ViroStatics = { Materials, Animations };
