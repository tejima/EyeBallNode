タブレットサイネージ
==================

概要
----------
GithubのコミットやTravisのテスト結果を、タブレットで派手に表示する。
オフィスや研究室の壁にかけておくことで、チームみんなで成果を共有するために使います。

 * コミットが、「ばーーん」って形で出るので気持ちがいい
 * テストの結果もばーーんとでる、失敗すると恥ずかしいから良いコードを書こうという気になる
 * コミットが動いていないときは、時計を出したりニュースを流したりなど、普段からチームの役に立つ

全体イメージ
----------
<img src="http://p.pne.jp/d/201211272340.png">


タブレット利用方法
-------------------

このソフトウエアのテストサイトが、
http://salty-plains-5925.herokuapp.com
にある。デバイスIDのうち1,8,9は自由に利用可能。

http://salty-plains-5925.herokuapp.com/?deviceid=1
 
http://salty-plains-5925.herokuapp.com/?deviceid=8
 
http://salty-plains-5925.herokuapp.com/?deviceid=9

アクセスしてしばらく待って、以下の様なディスプレイが出てくれば準備完了。
ソースコードマネジメントツール側からデータ通知をすれば、表示をコントロールできる。
 
<img src="http://p.pne.jp/d/500/201211280004.png">

 
データ通知方法（Github）
-------------------
 

<img src="http://p.pne.jp/d/700/201211272347.png">

この図のように、フック用URLを入力する（deviceidは1,8,9のどれかを使う）


データ通知方法（Travis）
------------------

<img src="http://p.pne.jp/d/700/201211272349.png">

.travis.ymlのWebHookのパートを記述する

データ通知方法（手動登録）
-------------------

例えばこんなURLでキックすれば登録できる。今のところ認証などは一切ない。

http://salty-plains-5925.herokuapp.com/hook_manual.json?deviceid=8&message=TEJIMAS_COMMIT&theme=committed&status=success

 * deviceid 端末ID デモでは1,8,9を利用者で共有する
 * message 端末に表示したいコミット時のメッセージを表示する
 * theme committed failed succeed のいずれかが使える
 * status 今のところ常に successとしておく
