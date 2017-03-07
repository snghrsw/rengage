import * as React from 'react';

export default function Html(content: string) {
  return (
    <html>
      <body>
        <h1>hello world</h1>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script src="vendor.js" />
        <script src="bundle.js" />
      </body>
    </html>
  );
}
