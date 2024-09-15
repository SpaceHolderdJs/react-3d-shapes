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

type Props = PropsWithChildren & CubeSceneSettings;
export const Shapes: FC<
  Props & { scene: SceneTypes } & {
    rendererProps?: HTMLAttributes<HTMLDivElement>;
  }
> = ({ scene, rendererProps = {}, children, ...sceneProps }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    switch (scene) {
      case 'squares':
      default: {
        createCubeScene(
          sceneRef?.current || (document.getElementById(id) as HTMLDivElement),
          sceneProps
        );
      }
    }
  }, [sceneRef.current, id]);

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
