# webpackの導入方法
Macでの導入の説明です。
Node.jsとHomebrewがインストールされていることが前提です。

## 新規プロジェクトの作成
新規でプロジェクトフォルダを作成して、コマンド「cd」でカレントディレクトリを作成したプロジェクトフォルダに移動します。

```
npm init
```
色々聞かれますが、全て「return」でOKです。  
package.jsonができます。

## 必要なパッケージをインストール

最新のwebpackと,webpack-cliのインストールをまとめて行います。
```
npm install --save-dev webpack webpack-cli
```

package.jsonに以下の記述が追加される。バージョン番号はインストール時の最新バージョン（4.16.1）
```
"devDependencies": {
    "webpack": "^4.16.1",
    "webpack-cli": "^3.1.0"
  }
```

これでプロジェクトフォルダ内にnode_modulesフォルダができます。

## プロジェクトで使用するフォルダとファイルを作成

「distフォルダ」と「srcフォルダ」を作成します。`src`が原料置き場で`dist`が完成品置き場のようなイメージです。

1. 「distフォルダ」にはデプロイするファイルが生成されて入ります。事前にindex.htmlを用意しておきます。
index.htmlにはwebpackで自動生成されるmain.jsファイルを読み込む記述をしておきます。

index.htmlコード

```
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>webpack sample</title>
</head>
<body>
	<h1>webpack sample</h1>
	<script src="main.js"></script>
</body>
</html>
```
2. 「srcフォルダ」にはwebpackでバンドルするためのファイルを用意します。
今回は`myval.js`で定数を宣言しておいて`index.js`で読み込でconsole.log表示させるだけのシンプルな内容のものを用意します。

myval.js
```
export const NAME = "Tahara";
```

index.js
```
import {NAME} from './myval.js';
console.log(NAME);
```

webpackの既定では「srcフォルダ」の`index.js`がエントリーポイントであり、バンドル結果は「distフォルダ」に`main.js`ファイルとして生成されます。

### webpackの実行

webpackの実行は次のコマンドです。
```
 npx webpack
```

WARNING（警告）がでます。
`WARNING in configurationThe 'mode' option has not been set,〜`
オプションとしてmodeを指定しろというものですが、この警告は気にしないでも良いです。どうしても気になる場合は次のようにします。

```
npx webpack --mode=development
```

main.jsがdistフォルダに生成されたらindex.htmlをブラウザの検証からconsole.logの確認をします。名前が表示されたらうまくいきました。
