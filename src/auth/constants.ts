// NOTE: これは公開情報にすべきではない
// 本来は環境変数や secret vault などから読み込ませるべき
// NOTE: 最低でも256bit = 32byte = 32文字を入れないとブルートフォース攻撃で簡単に secret が漏れてしまう
export const jwtConstants = {
  secret: 'secretKey',
};
