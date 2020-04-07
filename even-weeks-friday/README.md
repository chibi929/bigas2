# Even weeks Friday

GAS で偶数週(第2, 第4)の金曜日にごにょごにょ

## Prerequred

- @google/clasp

## Development

### New GAS project

1. clasp create
    ```bash
    # .clasp.json を削除
    $ rm .clasp.json

    # 新規作成
    $ clasp create --title ${PROJECT_TITLE} --rootDir src
    ? Create which script? standalone
    Created new standalone script: xxxxx
    ```
1. module install
    ```bash
    $ yarn (or npm install)
    ```
1. push
    ```bash
    $ clasp push
    ```

### Exists GAS project

1. clasp clone
    ```bash
    $ clasp clone ${SCRIPT_ID}
    ```
1. module install
    ```bash
    $ yarn (or npm install)
    ```
1. push
    ```bash
    $ clasp push
    ```

## 設定(src/const.ts)

| 定数名 | 説明 |
|:----|:----|
| TEMPLATE_FILE_ID | GoogleDrive にあるコピー元ファイルID |
| FILE_PREFIX | コピー先の prefix |
| POST_URL | Slack 通知のための Webhook URL |
| POST_MESSAGE | 任意のメッセージ |

## Other

- メール投げたり
- Slack 通知したり
- LINE 通知したり

も、やろうとすればいくらでもできる。
