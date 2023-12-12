## 🔦 Info for the error we're trying to solve:
- Start from the root folder: yarn install
  - This will install the packages from all 4 package.json files (root folder, packages/next, packages/expo, shared-codebase)
- Then check if the dev build of next.js is working, again from root foler: yarn run web
  - This will run the dev build of next.js where you can go to localhost:3000 and click Skia to see it working
- Then step into platforms/next from your terminal and run: yarn run build
  - This will build a production version of the next.js setup
- Step back to the root folder and run: yarn web-build
  - This will start the production build we just generated but when you go to localhost:3000 it shows the errors below on an endless loop:
<img width="1721" alt="Screenshot 2023-12-12 at 12 59 47 AM" src="https://github.com/frontendschmacktend/schmacktend-frontend/assets/153449693/09a544c4-9b8b-4955-8e70-2b77af07b07f">

## 🔦 About

While it's pretty barebones, it does a lot of the annoying config for you. The folder structure is opinionated, based on my long experience building for this stack.

## 📦 Included packages

- `solito` for cross-platform navigation
- `moti` for animations
- `tamagui` for theming/design (you can bring your own, too)
- Expo SDK 49
- Next.js 13
- React Navigation 6

## 🗂 Folder layout

- `platforms` entry points for each app

  - `expo`
  - `next`

- `shared` shared source code across platforms
  - `platforms` you'll be importing most files from `platforms/`
    - `screens` (don't use a `screens` folder. organize by feature.)
    - `router` (all the providers that wrap the app, and some no-ops for Web.)
    - `navigation/native` Next.js has a `pages/` folder. React Native doesn't. This folder contains navigation-related code for RN. You may use it for any navigation code, such as custom links.

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🏁 Start the app

- Install dependencies: `yarn`

- Next.js local dev: `yarn web`
  - Runs `yarn next`
- Expo local dev:
  - First, build a dev client onto your device or simulator
    - `cd platforms/expo`
    - `npx expo prebuild`
  - After building the local dev client, from the root of the monorepo...
    - `yarn native:ios/android` (This runs `expo start --dev-client` for specified mobile platform)

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `platforms/expo`:

```sh
cd platforms/expo
yarn add react-native-reanimated

cd ../..
yarn
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

## 🎙 About the creator

Follow Fernando Rojo on Twitter: [@FernandoTheRojo](https://twitter.com/fernandotherojo)

## 🧐 Why use Expo + Next.js?

<a href="https://www.youtube.com/watch?v=0lnbdRweJtA"><img width="1332" alt="image" src="https://user-images.githubusercontent.com/13172299/157299915-b633e083-f271-48c6-a262-7b7eef765be5.png">
</a>
