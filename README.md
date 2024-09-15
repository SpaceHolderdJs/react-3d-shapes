# `react-3d-shapes`

`react-3d-shapes` is a React library for creating 3D shapes using the Three.js library. It provides a simple way to integrate 3D scenes into your React applications with pre-built components.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Shapes Component](#shapes-component)
  - [Creating and Configuring Scenes](#creating-and-configuring-scenes)
- [Props](#props)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install the library using npm or yarn:

```sh
npm install react-3d-shapes
```

or

```sh
yarn add react-3d-shapes
```

## Usage

### Shapes Component

The `Shapes` component allows you to render various 3D scenes. It uses Three.js to create 3D shapes and integrates with React using hooks.

#### Example

Here's a basic example of how to use the `Shapes` component in your React application:

```jsx
import React from 'react';
import { Shapes } from 'react-3d-shapes';

const App = () => {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <Shapes
        scene="squares"
        width={800}
        height={600}
        backgroundColor="#ffffff">
        {/* Add additional children or components here if needed */}
      </Shapes>
    </div>
  );
};

export default App;
```

### Creating and Configuring Scenes

The `Shapes` component supports various 3D scenes through the `scene` prop. The current supported scene type is `"squares"`, which creates a 3D scene with cubes.

#### Props

- **`scene`**: The type of scene to create. Currently supports `"squares"`.
- **`rendererProps`**: Additional props to pass to the renderer’s container `<div>`. This allows you to customize the container's HTML attributes.
- **`width`**: Width of the 3D canvas.
- **`height`**: Height of the 3D canvas.
- **`backgroundColor`**: Background color of the 3D canvas.

#### Example with Additional Props

```jsx
import React from 'react';
import { Shapes } from 'react-3d-shapes';

const App = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Shapes
        scene="squares"
        width={1200}
        height={500}
        backgroundColor="#000000"
        rendererProps={{
          style: { border: '1px solid #ccc' },
        }}
        cubeSize={50} // Custom prop example (if supported)
      >
        {/* Additional content can be placed here */}
      </Shapes>
    </div>
  );
};

export default App;
```

## Props

The `Shapes` component accepts the following props:

- **`scene`** (`SceneTypes`): The type of scene to display. Currently, only `"squares"` is supported.
- **`rendererProps`** (`HTMLAttributes<HTMLDivElement>`): Additional attributes for the renderer’s container `<div>`.
- **`width`** (`number`): Width of the canvas.
- **`height`** (`number`): Height of the canvas.
- **`backgroundColor`** (`string`): Background color of the canvas.
- **`cubeSize`** (`number`, optional): Size of the cubes in the `"squares"` scene.

## Contributing

Contributions are welcome! Please follow these guidelines to contribute to the project:

1. **Fork the repository**: Create a copy of the repository on your own GitHub account.
2. **Clone the repository**: Clone your fork to your local machine.
3. **Create a new branch**: Make your changes in a new branch.
4. **Commit your changes**: Write clear and concise commit messages.
5. **Push your changes**: Push your branch to your forked repository.
6. **Submit a pull request**: Open a pull request from your branch to the main repository.

Please ensure your code adheres to the existing style and includes appropriate tests where applicable.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

This library is maintained by [spaceholderdjs](https://github.com/spaceholderdjs).
