# examples

Sample files for checking how each theme in [`themes/`](../themes/) looks.
テーマの配色を確認するためのサンプルファイルです。

## Files / ファイル一覧

| File | Language | What to check / 確認ポイント |
| --- | --- | --- |
| [sample.ts](./sample.ts) | TypeScript | Types, interfaces, enums, generics, decorators, template literals |
| [sample.js](./sample.js) | JavaScript | Classes, private fields, async/await, generators, regex |
| [sample.py](./sample.py) | Python | Dataclasses, type hints, decorators, f-strings, comprehensions |
| [sample.go](./sample.go) | Go | Structs, interfaces, methods, goroutines, struct tags |
| [sample.html](./sample.html) | HTML | Tags, attributes, entities, embedded CSS/JS |
| [sample.css](./sample.css) | CSS | Selectors, custom properties, at-rules, color values |
| [sample.json](./sample.json) | JSON | Keys, strings, numbers, booleans, null, nesting |
| [sample.yaml](./sample.yaml) | YAML | Keys, scalars, anchors/aliases, block scalars |
| [sample.md](./sample.md) | Markdown | Headings, emphasis, links, lists, code blocks, tables |
| [sample.sh](./sample.sh) | Shell (Bash) | Variables, expansions, functions, heredocs, `case` |
| [sample.sql](./sample.sql) | SQL | DDL, DML, CTEs, window functions |
| [Dockerfile](./Dockerfile) | Dockerfile | Instructions, multi-stage builds, arguments |
| [sample.txt](./sample.txt) | Plain text | Base colors, selection, find matches, Japanese text / 基本色・選択・検索・日本語表示 |

## How to use / 使い方

1. Open `themes/<theme-name>/<theme-name>.code-workspace` in VS Code.
   VS Code で `themes/<theme-name>/<theme-name>.code-workspace` を開きます。
2. Open the files here with **File > Open File...**.
   **ファイル > ファイルを開く...** でこのディレクトリのファイルを開きます。

Run **Developer: Inspect Editor Tokens and Scopes** from the Command Palette to see which TextMate scope a token has. This helps when you tune `editor.tokenColorCustomizations`.
コマンドパレットの **Developer: Inspect Editor Tokens and Scopes** を使うと、カーソル位置のトークンの TextMate スコープを確認できます。`editor.tokenColorCustomizations` を調整するときに便利です。

## Adding a sample / サンプルを追加する

Name new files `sample.<ext>` (or the language's conventional file name, such as `Dockerfile`), and add them to the table above. Include as many token types as you can: comments, strings, numbers, constants, keywords, operators, functions, types, and so on.
新しいファイルは `sample.<拡張子>`（`Dockerfile` のように慣習的なファイル名がある言語はその名前）とし、上の表に追記してください。コメント・文字列・数値・定数・キーワード・演算子・関数・型など、できるだけ多くの種類のトークンを含めてください。
