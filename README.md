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

### webpack.config.js作成

もし、webpack既定の設定を変更したい場合は`webpack.config.js`ファイルを作成します。
このサンプルは既定の設定と同一の内容です。

`webpack.config.js`ファイルの例

```
module.exports = {
	entry:'./src/index.js',
	output:{
		path:`${__dirname}/dist`,
		filename:'main.js'
	},
}
```

`webpack.config.js`ファイルに従ってwebpackを起動するには次のコマンドを入力します。なお、----watchオプションは編集を行って保存すると再コンパイルされます。

```
npx webpack --watch --config webpack.config.js
```

これでは面倒なので、package.jsonに次の記述を追加します。

```
"scripts":{
	"build":"webpack --watch --config webpack.config.js"	
},
```

以後は`npm run build`で起動します。



## devサーバーの導入

### devサーバーのインストール

```
 npm install --save-dev webpack-dev-server
```

webpack.config.jsに以下を追加
```
devServer:{
		contentBase:'./dist'
},
```

起動を簡単にするためにpackage.jsonに`"start":"webpack-dev-server --open",`を追加

```
"scripts": {
    "start":"webpack-dev-server --open",
    "build": "webpack --watch --config webpack.config.js"
  },
```

これで`npm start`でdevサーバーが開きます。  
終了は`control+c`

## スタイルシートのバンドル
スタイルシートをjavascript化してバンドルするものです。
そのためには、`css-loader/style-loader`という仕組みを使います。css-loaderはスタイルシートを読み込むためのものです。
また、style-loaderはstyle要素としてHTMLに反映するものです。

簡単なスタイルシートをsrcフォルダに追加しておきます。

```
h1{
	color:blue;
}
```

`css-loader/style-loader`の導入

```
npm install --save-dev css-loader style-loader
```

次に、webpack.config.jsに`module:{}`部分を追記します。

```
module.exports = {
	entry:'./src/index.js',
	output:{
		path:`${__dirname}/dist`,
		filename:'main.js'
	},
	devServer:{
		contentBase:'./dist'
	},
	module:{
		rules:[
			{
				test: /\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			}
		]
	}
}
```

あとはindex.jsに`import './style.css'`を追加します。
`npm start`でブラウザが開きCSSが効いていれば成功です。

index.htmlをブラウザの検証でコードを確認するとheadタグ内にstyleタグが生成されてその中にCSSが記述されているのが確認できます。

## スタイルシートを別ファイルにしたい
通常はembedタイプのスタイル設定ではなく別ファイルにする場合が多いです。

この場合はExtractTextPluginを使用します。
ExtractTextPluginの導入は次のようにします。
```
npm install --save-dev extract-text-webpack-plugin@next
```

webpack.config.js
```
module.exports = {
	entry:'./src/index.js',
	output:{
		path:`${__dirname}/dist`,
		filename:'main.js'
	},
	devServer:{
		contentBase:'./dist'
	},
	module:{
		rules:[
			{
				test: /\.css$/,
				use:ExtractTextPlugin.extract({
					use:'css-loader'
				})
			}
		]
	},
	plugins:[
		new ExtractTextPlugin('style.css'),
		]
}

```
ここで再度ビルドします。

```
npm run build
```

distフォルダにstyle.cssが生成されます。
index.htmlファイルにlink要素でstyle.cssとリンクさせて正しく表示されればOKです。

## 画像のバンドル

画像をバンドルするには`url-loader`をインストールする必要があります。
これは画像をjavascript化することです。

```
npm install --save-dev url-loader
```

webpack.config.js
```
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry:'./src/index.js',
	output:{
		path:`${__dirname}/dist`,
		filename:'main.js'
	},
	devServer:{
		contentBase:'./dist'
	},
	module:{
		rules:[
			{
				test: /\.css$/,
				use:ExtractTextPlugin.extract({
					use:'css-loader'
				})
			},
			{
		        test: /\.(gif|png|jpg)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 51200,
		              name: './images/[name].[ext]'
		            }
		          }
		        ]
		    }
		]
	},
	plugins:[
		new ExtractTextPlugin('style.css'),
		]
}

```

index.js
```
import {NAME} from './myval.js';
import './style.css'
import pic from './images/logo.gif';
console.log(NAME);
window.addEventListener('DOMContentLoaded',
	function(){
		let img = new Image();
		img.src = pic;
		document.body.appendChild(img);
	},false);
```

これで画像が表示されます。


## SASSの導入

SASSの環境を構築するには以下インストールします。
index.htmlへのcss書き出しはhead内のstyle要素内となります。

```
 npm install --save-dev sass-loader node-sass
```

webpack.config.jsには以下の記述

```
module.exports = {
	entry:'./src/index.js',
	output:{
		path:`${__dirname}/dist`,
		filename:'main.js'
	},
	devServer:{
		contentBase:'./dist'
	},
	module:{
		rules:[
			{
		        test: /\.(gif|png|jpg)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 51200,
		              name: './images/[name].[ext]'
		            }
		          }
		        ]
		    },
		    {
		    	test: /\.scss$/,
		    	use:['style-loader','css-loader','sass-loader']
		    },
		]
	}
}
```

index.jsのcssインポートの記述をscssに変更します。

```
import {NAME} from './myval.js';
import './style.scss'
import pic from './images/logo.gif';
console.log(NAME);
window.addEventListener('DOMContentLoaded',
	function(){
		let img = new Image();
		img.src = pic;
		document.body.appendChild(img);
	},false);
```