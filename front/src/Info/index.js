import { useEffect } from 'react'
import { Container, Divider } from '@mui/material'

import { Header } from './../Header.js'

export const Info = () => {
  useEffect(() => {
    document.title = 'お知らせ | searchsearch'
  }, [])

  return (
    <>
      <Header
        title="お知らせ"
      />
      <Container>
        <h2 style={{
          color: '#555'
        }}>
          searchsearchとは
        </h2>
        <p>
          検索サイトのクエリストリングを検索できるサービスです。
          こんな機能があります
        </p>
        <ul>
          <li>URLの検索</li>
          <li>URLの登録</li>
          <li>クエリストリングの登録</li>
          <li>クエリストリングへのコメント</li>
          <li>クリップボードのURLのパース</li>
          <li>クエリストリングから検索用URLの構築</li>
          <li>ログイン機能</li>
        </ul>
        <h2 style={{
          color: '#555'
        }}>
          クエリストリングとは
        </h2>
        <p>このURLでいうと下線の部分。</p>
        <code>https://searchsearch.net/search?<span style={{ textDecoration: 'underline' }}>q=searchsearch</span></code>
        <p>
          <code>q</code>というキーに<code>searchsearch</code>という値を指定しています。<br />
          ほとんどの検索サイトでは、このクエリストリングの部分を使って検索文字列や並び替えやフィルタリングの指定をしています。
        </p>
        <h2 style={{
          color: '#555'
        }}>
          リンク
        </h2>
        <ul>
          <li>公式Twitter : <a href='https://twitter.com/searchsearchnet'>@searchsearchnet</a></li>
          <li>Qiitaの記事 : <a href='https://qiita.com/tetetratra/items/63ca355a91e285cc5cab'>【個人開発】検索サイトのクエリストリングを検索できるwebサービス「searchsearch」をリリースしました！</a></li>
          <li>GitHubリポジトリ : <a href='https://github.com/tetetratra/searchsearch'>tetetratra/searchsearch</a></li>
          <li>作者サイト : <a href='https://tetetratra.net'>tetetratra.net</a></li>
        </ul>
        <p>お問い合わせ・バグ報告・機能要望・感想等は、公式TwitterのDM, 公式Twitterのマシュマロ, リポジトリのissue に投稿いただけるとありがたいです。</p>
        <Divider />
        <h2 style={{
          color: '#555'
        }}>
          更新情報
        </h2>
        <ul>
          <li>2021/09/26 サービスを開始しました!</li>
        </ul>
      </Container>
    </>
  )
}

