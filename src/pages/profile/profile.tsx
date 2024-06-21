import styled from "styled-components";
import { setScreen } from "../../shared/config/router";
import { ValeraUI } from "../main/valera.tsx";

export const ProfilePage = () => {
  return (
    <div>
      <H1>Личный кабинет</H1>
      <Content>Здесь вся информация о вашем Валере</Content>
      <Valera>
        <ValeraUI />
        <Table>
          <Item>Локация: Помойка</Item>
          <Item>Работа: СМ</Item>
          <Item>Заработок в час: 500</Item>
        </Table>
      </Valera>
    </div>
  );
};

const Table = styled.div`
  border-left: 4px solid #ffffff;
  padding: 4px;
`;
const Item = styled.div``;

const H1 = styled.div`
  display: flex;
  border-bottom: 4px solid #ffffff;
  padding-bottom: 10px;
  width: 100%;
  justify-content: center;
  font-weight: bold;
  font-size: 25px;
`;

const Content = styled.div`
  font-weight: bold;
  font-size: 15px;
  display: Flex;
  padding-top: 10px;
  justify-content: center;
  padding: 0px 16px;
  text-align: center;
  border-bottom: 4px solid #ffffff;
`;
const Valera = styled.div`
  display: grid;
  font-weight: bold;

  justify-content: center;
  border-bottom: 4px solid #ffffff;
  grid-template-columns: 0.25fr 1fr;
  grid-template-rows: 1fr;

  img {
    scale: 0.75;
  }
`;
