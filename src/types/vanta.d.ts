declare module "vanta/dist/vanta.waves.min" {
  type VantaEffect = {
    destroy?: () => void;
  };

  type VantaOptions = {
    el: HTMLElement;
    THREE: typeof import("three");
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    shininess?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
  };

  const waves: (options: VantaOptions) => VantaEffect;
  export default waves;
}
