import React from "react";
import EditNew from "../EditNew/EditNew";

export default function AdminNews() {
  return (
    <div>
      <div>
        <button onClick={EditNew}>Додати новину</button>
      </div>
    </div>
  );
}
