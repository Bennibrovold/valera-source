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
      <Content2>Достижения</Content2>
      <Histiry>
        <Li>
          <span>Провести 10 минут в игре</span>
          <Strong>Награда: 1000 монет</Strong>
        </Li>
        <Li>
          <span>Прокачать первый клик</span>
          <Strong>Награда: 500 монет</Strong>
        </Li>
        <Li>
          <span>Накормить Валеру</span> - <Strong>Награда: 200 монет</Strong>
        </Li>
        <Li>
          <span>Купить первый автомобиль</span>
          <Strong>Награда: 5000 монет</Strong>
        </Li>
        <Li>
          <span>Улучшить Валеру</span> - <Strong>Награда: 300 монет</Strong>
        </Li>
        <Li>
          <span>Провести 30 минут в игре</span>
          <Strong>Награда: 10000 монет</Strong>
        </Li>
        <Li>
          <span>Обменять машину на айфон</span>
          <Strong>Награда: 1 айфон</Strong>
        </Li>
        <Li>
          <span>Провести 1 час в игре</span>
          <Strong>Награда: 100000 монет</Strong>
        </Li>
      </Histiry>
    </div>
  );
};

const Table = styled.div`
  border-left: 4px solid #ffffff;
  padding: 4px;
`;
const Item = styled.div``;

const Li = styled.div`
  color: #3d3c39;
  border-bottom: 2px solid #ffffff;
  padding-bottom: 10px;
`;

const Histiry = styled.div`
  font-size: 11px;
`;

const Strong = styled.div`
  float: right;
  padding-right: 10px;
  color: #ceb66f;
`;

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

const Content2 = styled.div`
  font-weight: bold;
  font-size: 15px;
  display: Flex;
  padding-top: 10px;
  justify-content: center;
  padding: 0px 16px;
  text-align: center;
  border-bottom: 4px solid #ffffff;
`;
