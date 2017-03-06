import * as React from "react";

export default function LoginForm() {
  return (
    <div id="login-form">
      <form action="auth" method="POST">
        <label>メールアドレス</label>
        <input type="text" name="username" />

        <label>パスワード</label>
        <input type="password" name="password" />

        <input type="submit" value="送信" />
      </form>
    </div>
  );
}
