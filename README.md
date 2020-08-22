# kanban

カンバン方式のタスク管理アプリ **kanban** のクライアントサイドのリポジトリです。

- アプリURL: https://k4nban.com
- アプリ概要: ?
- バックエンドのリポジトリ: https://github.com/jo-tbhac/kanban-api

## 必要条件

以下導入手順はMacOS専用です。

Nodeのインストールに`nodebrew`を使用していますが、`nvm`などの他のツールを使用してインストールしても問題ありません。

### Node

```
# nodebrewのインストール
brew install nodebrew

# パスを通す
echo "export PATH=$HOME/.nodebrew/current/bin:$PATH" >> ~/.bash_profile
source ~/.bash_profile

# Nodeのインストール
nodebrew install-binary stable

# Nodeの有効化
nodebrew use <インストールしたNodeのバージョン>  # 例: nodebrew use v12.0.0
```

### npm

上記手順でNodeをインストールした場合はnpmも同時にインストールされます。


## プロジェクトのセットアップ

以下のコマンドでリポジトリをクローンします。

```
https://github.com/jo-tbhac/kanban.git
```

プロジェクトのルートディレクトリに移動し、パッケージをインストールします。

```
cd kanban

npm install
```

その後、以下のコマンドでアプリケーションを実行できます。

```
npm start
```

### デバッガーのインストール

※ 以下の手順は必須ではありません。必要な場合はインストールしてください。

[redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)を使用しています。

インストール手順は上記リンクから参照してください。
