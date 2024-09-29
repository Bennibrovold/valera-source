import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Infoheader } from "../info/infoheader.tsx";
import clickSound from "../../../assets/custom5.mp3";

export const Infogames = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [previousModal, setPreviousModal] = useState(null);
  const questions = [
    {
      title: "Как играть",
      subQuestions: [
        {
          title: "Правила игры",
          answer:
            "Суть игры заключается в прокачке ващего персоонажа и в его содеражнии в покупке предметов и их дальнейшей прокачки",
          extraQuestions: [
            {
              title: "Как начать игру?",
              answer:
                "Для начала вам нужно зарегестрировать игровой аккаунт. Оно в себе содержит Логин, Email, парроль, и войти. В дальнейшем вас встретит подсказка к игре.",
            },
            {
              title: "Какие цели в игре?",
              answer:
                "Основные цели игры - Прокачка и содержание ващего персоонажа, покупка  имущейства и разных вещей, мини игры и многое другое",
            },
            {
              title: "Примечание",
              answer:
                "Никому не сообщайте свою персоональные данные от аккаута, не передавайте его и не пытайтесь насольно вмешаться в игровой процесс игры ( читы и стронние программы )",
            },
          ],
        },
        {
          title: "Возможности",
          answer: "",
          extraQuestions: [
            {
              title: "Если ли у игры кросс платформенность?",
              answer: "Для передвижения используйте ...",
            },
            {
              title: "Как проиходит геймплей?",
              answer:
                "Игра не счиатется линейной, все что представленно в игре не обазателльно делать по очередно ( покупка улучшений, имущество, локаций) игра не ограничевает вас",
            },
            {
              title: "Как взаимодействовать с объектами?",
              answer:
                "Все взаимодействие с обьектами проиходит при нажатие на опереденые обьекты которые отображаются у вас на экране компьютера/телефона",
            },
          ],
        },
      ],
    },
    {
      title: "О проекте",
      subQuestions: [
        {
          title: "История создания",
          answer:
            "Проект был создан случайно, его исторю создание не описать даже на бумаге, а тем более рассказать на словах.",
        },
        {
          title: "Важно",
          answer:
            "Данные проект создан в развелкательных целях, весь сюжет игры выдуман, все схожее с реальностью совпадения",
        },
      ],
    },
    {
      title: "Создатели",
      subQuestions: [
        {
          title: "Команда разработчиков",
          answer: "2 алкоголика с Угольной",
        },
        {
          title: "Контакты",
          answer: "По вопросам разработки обращайтесь по адресу г.Владивосток",
        },
      ],
    },
    {
      title: "Техподдержка",
      subQuestions: [
        {
          title: "Проблема с запуском игры",
          answer:
            "Если у вас возникли проблемы с запуском игры, проверьте следующее:\n1. Убедитесь, что у вас стабильное подключения к интернету.\n2. Попробуйте перезагрузить устройство.\n3. Если ошибка сохраняется, обратитесь в службу поддержки.",
        },
        {
          title: "Ошибки в игровом процессе",
          answer:
            "Если вы столкнулись с ошибками в игровом процессе, попробуйте следующее:\n1. Перезапустить игру.\n2. Проверьте, что у вас не конфликтуют другие программы.\n3. Если ошибка не устраняется, свяжитесь с нами.",
        },
        {
          title: "Нет подходящего ответа",
          answer:
            "Извините, мы не смогли найти подходящий ответ на ваш вопрос. Пожалуйста, обратитесь в службу поддержки, и мы постараемся помочь вам.  ",
          text: <a href="https://t.me/hellmorphin">@Hellmorphin</a>,
        },
      ],
    },
  ];

  const handleQuestionClick = (index) => {
    playClickSound();
    setCurrentQuestion(index);
  };

  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const openModal = (modalData) => {
    playClickSound();
    setPreviousModal(null);
    setCurrentModal(modalData);
    setIsModalOpen(true);
  };

  const openExtraModal = (extraQuestion) => {
    playClickSound();
    setPreviousModal(currentModal);
    setCurrentModal(extraQuestion);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentModal(null);
    setPreviousModal(null);
  };

  const goBackToPreviousModal = () => {
    playClickSound();
    setCurrentModal(previousModal);
    setPreviousModal(null);
  };

  return (
    <>
      <Infoheader />
      <Container>
        <NavigationListContainer>
          <NavigationList>
            {questions.map((question, index) => (
              <NavigationItem
                key={index}
                onClick={() => handleQuestionClick(index)}
                active={currentQuestion === index}
              >
                {question.title}
              </NavigationItem>
            ))}
          </NavigationList>
        </NavigationListContainer>

        <QuestionContainer>
          {currentQuestion !== null && (
            <>
              <QuestionTitle>{questions[currentQuestion].title}</QuestionTitle>
              <SubNavigationList>
                {questions[currentQuestion].subQuestions.map(
                  (subQuestion, index) => (
                    <SubNavigationItem
                      key={index}
                      onClick={() =>
                        openModal({
                          question: questions[currentQuestion].title,
                          subQuestion: subQuestion.title,
                          answer: subQuestion.answer,
                          text: subQuestion.text,
                          extraQuestions: subQuestion.extraQuestions,
                        })
                      }
                    >
                      {subQuestion.title}
                    </SubNavigationItem>
                  )
                )}
              </SubNavigationList>
            </>
          )}
        </QuestionContainer>
      </Container>

      {isModalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={closeModal} />
          <ModalContent>
            <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
            {currentModal && (
              <>
                {previousModal && (
                  <BackButton onClick={goBackToPreviousModal}>Назад</BackButton>
                )}

                <ModalQuestionTitle>{currentModal.question}</ModalQuestionTitle>
                <ModalSubQuestionTitle>
                  {currentModal.subQuestion}
                </ModalSubQuestionTitle>
                <ModalAnswerText>{currentModal.answer}</ModalAnswerText>

                {currentModal.extraQuestions && (
                  <>
                    <ExtraQuestionsTitle>
                      Дополнительные вопросы:
                    </ExtraQuestionsTitle>
                    <ExtraQuestionsList>
                      {currentModal.extraQuestions.map(
                        (extraQuestion, index) => (
                          <ExtraQuestionItem key={index}>
                            <ExtraQuestionButton
                              onClick={() => openExtraModal(extraQuestion)}
                            >
                              {extraQuestion.title}
                            </ExtraQuestionButton>
                          </ExtraQuestionItem>
                        )
                      )}
                    </ExtraQuestionsList>
                  </>
                )}
              </>
            )}
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

const BackButton = styled.button`
  background-color: #b1adad;
  border: none;
  padding: 10px 20px;
  margin-bottom: 15px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  color: #000000;
`;

const ExtraQuestionButton = styled.button`
  background-color: #007bff;
  border: none;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ExtraQuestionsTitle = styled.h4`
  font-size: 1.3rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ExtraQuestionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ExtraQuestionItem = styled.li`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgb(119, 118, 118) 0%,
    rgb(189, 187, 187) 100%
  );
  padding: 20px;
  border-radius: 15px;
`;

const NavigationListContainer = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
`;

const NavigationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavigationItem = styled.li`
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  margin: 0;

  cursor: pointer;
  border-radius: 16px;
  background: ${({ active }) =>
    active ? "linear-gradient(90deg, #415ba3, #26afd1)" : "transparent"};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  box-shadow: ${({ active }) =>
    active ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none"};

  &:hover {
    background: linear-gradient(90deg, #415ba3, #26afd1);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.8rem 1.2rem;
  }
`;

const QuestionContainer = styled.div`
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
`;

const QuestionTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const SubNavigationList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  justify-content: center;
`;

const SubNavigationItem = styled.li`
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  border-radius: 16px;
  background-color: #f2f2f2;
  color: #333;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.2s, transform 0.2s;
  margin: 0.5rem;

  &:hover {
    background-color: #415ba3;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.6rem 1rem;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 500px;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: red;
  }
`;

const ModalQuestionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ModalSubQuestionTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #666;
`;

const ModalAnswerText = styled.p`
  font-size: 1rem;
  color: #333;
`;
