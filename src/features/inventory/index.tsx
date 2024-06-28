import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

export const Inventory = () => {
  const [columns, setColumns] = useState(10);
  useEffect(() => {
    const updateColumns = () => {
      const el = document.getElementById("inventory-modal");
      const modalWidth = el?.offsetWidth || 500;
      const newColumns = Math.floor(modalWidth / 100);
      setColumns(newColumns);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const colsLength = useMemo(() => 44 + columns - (44 % columns), [columns]);

  return (
    <InventoryGrid columns={columns}>
      {Array.from({ length: colsLength }, (_, index) => (
        <InventoryCell key={index} />
      ))}
    </InventoryGrid>
  );
};

interface InventoryGridProps {
  columns: number;
}

export const InventoryGrid = styled.div<InventoryGridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-gap: 2px;
  background-color: #fff;

  width: 100%;
  height: auto;
  overflow: auto;
`;
export const InventoryCell = styled.div`
  background-color: #ccc;
  border: 1px solid #fff;
  height: 60px;
`;
