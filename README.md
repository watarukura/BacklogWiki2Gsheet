# BacklogWiki2Gsheet
BacklogのWiki一覧をGsheetで作成します。

## 使い方
1. BacklogのAPIキーを取得してください
2. コード.gsをGoogle Apps Scriptのエディタに転記し、space_id / domain / projedt_idsの箇所を修正してください。
3. プロジェクトのプロパティを開き、スクリプトのプロパティにbacklog_api_key / gsheet_url を設定してください。
4. 実行すると、gsheet_urlで指定したGoogle Spreadsheetに指定したBacklog ProjectのWikiの一覧が書き出されます。
