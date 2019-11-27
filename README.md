# react-app-antd-ts
Based on create-react-app-typescript. Create React apps using antd+typescript.

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