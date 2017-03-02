import * as React from 'react';

export default function Html({ children }) {
	return (
		<html>
			<head>
			</head>
			<body>
				<h1>hello world</h1>
				{children}
			</body>
		</html>
	)
}
