import React from "react";
import "../localgames/games.css";

export const ThemeSelector = ({ items, onItemSelect }) => {
  return (
    <div className="theme-selector">
      {items.map((item, index) => (
        <button key={index} onClick={() => onItemSelect(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};
