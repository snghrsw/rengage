import * as React from 'react';

interface IWaiting {
  locationHref: string;
}

export default function Waiting(props: IWaiting) {
  return (
    <div>
      <p>snghrymが確認するまでお待ちください</p>

      <label>専用URL</label>
      <input type="text" value={props.locationHref} />
    </div>
  );
}
