/**
 * login check
 * @return login:セッションがある場合true、ない場合はfalse
 *         user:指定ユーザーのセッションがない場合false、それ以外はtrue
 *         userid:セッションがあるユーザー名、セッションがない場合は空文字
 */
exports.login_check = function (req, userid) {
  var result = {};
  if (!req.session.user) {
    // セッションなし
    result = {
      login: false,
      user: false,
      userid: ''
    };
  } else if (!userid) {
    // ユーザー指定なし
    result = {
      login: true,
      user: true,
      userid: req.session.user.userid
    };
  } else if (req.session.user.userid !== userid) {
    // 指定ユーザーとセッションユーザーが異なる
    result = {
      login: true,
      user: false,
      userid: req.session.user.userid
    };
  } else {
    // 指定ユーザーとセッションユーザーが一致
    result = {
      login: true,
      user: true,
      userid: req.session.user.userid
    };
  }

  return result;
}