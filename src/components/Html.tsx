import * as React from 'react';

export default function Html(props) {
	return (
		<html>
			<head>
			</head>
			<body>
				<h1>hello world</h1>
				<div id="root">
					{props.children}
				</div>
				<script src="vendor.js"></script>
				<script src="bundle.js"></script>
			</body>
		</html>
	)
}
