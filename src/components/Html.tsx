import * as React from 'react';

export default function Html(content: string) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script src="vendor.js" type="text/babel" />
        <script src="bundle.js" type="text/babel" />
      </body>
    </html>
  );
}
