import * as React from 'react';

export default function LoginForm() {
	return (
		<div>
			<label>メールアドレス</label>
			<input type="text" />

			<label>パスワード</label>
			<input type="password" />

			<input type="submit" value="送信" />
		</div>
	)
}