import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  position: relative; 
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: orange; 

  &:hover {
    color: black; 
  }
`;
interface InventoryGridProps {
    columns: number;
  }
  
  export const InventoryGrid = styled.div<InventoryGridProps>`
    display: grid;
    grid-template-columns: repeat(${props => props.columns}, 1fr);
    grid-gap: 2px;
    background-color: #fff;
    
    width: 100%;
    height: auto;
    overflow: auto;
  `;
export const InventoryCell = styled.div`
  background-color: #ccc; 
  border: 1px solid #fff; 
  height: 45px; 
`;