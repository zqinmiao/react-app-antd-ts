# react-app-antd-ts
Based on create-react-app-typescript. Create React apps using antd+typescript.


## vscode config
* vscode extension： Prettier、tslint
* open settings.json edit

```
"tslint.autoFixOnSave": true,
  "[scss]": {
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.formatOnSave": true
  }
```

## file alias
tsconfig.json，For Example：

```
"paths": {
      "src/*": ["src/*"],
      "components/*":["src/components/*"],
      "pages/*":["src/pages/*"],
      "utils/*":["src/utils/*"],
      "redux/*":["src/redux/*"],
      "services/*":["src/services/*"]
    },
```

## router config

router config file```src/router/routes.tsx```，Routing address does not end with "/"


## Build Setup

```
# install dependencies
yarn install

# serve with hot reload
yarn start

# build for production with minification
yarn build
```