import * as React from 'react';

function Test() {
  return <div>test</div>;
}

export default function AdminBoard() {
  return (
    <div>
      <h2>管理画面</h2>
      {[1, 2, 3].map((num, index) => <Test key={index} />)}
    </div>
  );
}
