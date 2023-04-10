FrostUI is a component library built upon tailwindcss (Utility first CSS framework)

## Getting Started

### Install using NPM / Yarn

Make sure you have installed <a href="https://nodejs.org/en/" rel="nofollow" >Node.js</a>
and <a href="https://tailwindcss.com/" rel="nofollow" >Tailwind CSS</a> and properly setup it

1. Install frostui dependency as the following command.

    ```bash
    npm install @frostui/tailwindcss
    ``` 
    ```bash
    yarn add @frostui/tailwindcss
    ```

2. Require frostui js and plugin added to the `tailwind.config.js` file

    ```javascript
    module.exports = {
    
      content: [
        "./node_modules/@frostui/tailwindcss/**/*.js"
      ]
    
    }
    ````

    ```javascript
    module.exports = {
    
      plugins: [
        require('@frostui/tailwindcss/plugin')
      ]
    
    }
    ```

3. Include the main js file to work all components

    ```html
    <script src="./node_modules/@frostui/tailwindcss/frostui.js"></script>
    ```

FrostUI is Open Source project and licensed under MIT.

Thanks to <a href="https://tailwindcss.com/" rel="nofollow" >Tailwind CSS</a>
