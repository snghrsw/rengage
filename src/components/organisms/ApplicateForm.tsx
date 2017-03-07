import * as React from 'react';

export default function ApplicateForm() {
  return (
    <div>
      <form action="applicate" method="POST">
        <label>社名</label>
        <input type="text" name="companyName" />

        <input type="submit" value="レジュメをもらう" />
      </form>
    </div>
  );
}
