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
<img src="http://p.pne.jp/d/590/201211272340.png">


利用方法
----------

このソフトウエアのテストサイトが、
http://salty-plains-5925.herokuapp.com
にある。

でバイスIDのうち1,8,9は自由に使っていい。


**Github**
<img src="http://p.pne.jp/d/590/201211272347.png">

この図のように、フック用URLを入力する（deviceidは1,8,9のどれかを使う）

**Travis**
<img src="http://p.pne.jp/d/590/201211272349.png">
.travis.ymlのWebHookのパートを記述する

**Manual**

http://salty-plains-5925.herokuapp.com/hook_manual.json?deviceid=8&message=TEJIMAS_COMMIT&theme=committed&status=success
 * deviceid 端末ID デモでは1,8,9を利用者で共有する
 * message 端末に表示したいコミット時のメッセージを表示する
 * theme committed failed succeed のいずれかが使える
 * status 今のところ常に successとしておく