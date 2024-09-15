import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useId,
  useRef,
} from 'react';
import { createCubeScene, CubeSceneSettings } from '../scenes/squares';
import { SceneTypes } from '../types';
import { createSphereScene, SphereSceneSettings } from '../scenes/sphere';

type Props = PropsWithChildren & CubeSceneSettings & SphereSceneSettings;

export const Shapes: FC<
  Props & { scene: SceneTypes } & {
    rendererProps?: HTMLAttributes<HTMLDivElement>;
  }
> = ({ scene, rendererProps = {}, children, ...sceneProps }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const container =
      sceneRef.current || (document.getElementById(id) as HTMLDivElement);

    if (!container) return;

    // Clear existing scene content if needed
    container.innerHTML = '';

    switch (scene) {
      case 'sphere': {
        createSphereScene(container, sceneProps as SphereSceneSettings);
        break;
      }
      case 'squares':
      default: {
        createCubeScene(container, sceneProps as CubeSceneSettings);
        break;
      }
    }

    // Cleanup function
    return () => {
      container.innerHTML = ''; // Clear the container
      // Additional cleanup can be added if needed
    };
  }, [scene, sceneProps, id]); // Include scene and sceneProps in the dependency array

  return (
    <div
      id={id}
      ref={sceneRef}
      style={{ width: '100%', height: '100%' }}
      {...rendererProps}>
      {children}
    </div>
  );
};
