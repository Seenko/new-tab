# Custom New Tab Page

A New Tab page extension for Chrome made with Vue 3 + Vite + Tailwind. Fully modular with a variety of widgets to drag and drop around.

This is a *personal project* and it has not been published to the Chrome Web Store for use, if you want to though, feel free to download, build and load as an unpacked extension. If it isn't obvious, use this application at _your own risk_, if things don't work quite right you may open an issue on this repository, but there's no guarantee that it will be looked over.

API Endpoints need to be set in the environment variables.

API Keys can be defined on the Settings panel (for easy hot-swap) or through environment variables (check .env.example) as a null fallback.

The code here won't be pretty, as this is just a for fun personal project. There is also no Component Stories nor Unit Tests.

## Installation

Just install the node_modules using [pNpM](https://pnpm.io/) and run the `build` script.

The `build` script will also run the `lint` script.

Once the build completes, it will output the final extension in the `dist` folder which then can be loaded as an unpacked extension through Chrome's extension page (make sure you have extension developer mode turned on in chrome)

### Here's an example video of how the application looks like in case you're just curious:

https://user-images.githubusercontent.com/24597695/168669409-59c6b64f-b1e9-4012-8c66-a70c396e12c6.mp4
