import * as React from 'react';

export default function Waiting() {
  return (
    <div>
      <p>snghrymが確認するまでお待ちください</p>

      <label>専用URL</label>
      <input type="text" value={location.href} />
    </div>
  );
}
