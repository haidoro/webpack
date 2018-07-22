# webpackの導入方法
Macでの導入の説明です。
Homebrewがインストールされている前提です。

## 新規プロジェクトの作成
新規でプロジェクトフォルダを作成して、コマンド「cd」でカレントディレクトリを作成したプロジェクトフォルダに移動します。

```
npm init
```

## 必要なパッケージをインストール

webpack4のインストール,webpack-cliのインストール
```
npm install --save-dev webpack webpack-cli
```

package.jsonに以下の記述が追加される。バージョン番号はインストール時の最新バージョン
```
"devDependencies": {
    "webpack": "^4.16.1",
    "webpack-cli": "^3.1.0"
  }
```


minimizeのインストール
```
yarn build --optimize-minimize
```
CSS loaderインストール
```
yarn add css-loader style-loader --dev
```
webpack-dev-serverインストール
```
yarn add webpack-dev-server --dev
```


## webpack起動

```
yarn build
```
