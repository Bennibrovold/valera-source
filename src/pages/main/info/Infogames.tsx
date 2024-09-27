import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Infoheader } from "../info/infoheader.tsx";
export const Infogames = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState({});

  const questions = [
    {
      title: "Как играть",
      subQuestions: [
        {
          title: "Правила игры",
          answer: "Суть игры заключается в ...",
        },
        {
          title: "Управление",
          answer: "Для управления в игре используются ...",
        },
      ],
    },
    {
      title: "О проекте",
      subQuestions: [
        {
          title: "История создания",
          answer: "Проект был разработан ...",
        },
        {
          title: "Особенности",
          answer: "Игра отличается такими особенностями, как ...",
        },
      ],
    },
    {
      title: "Создатели",
      subQuestions: [
        {
          title: "Команда разработчиков",
          answer: "Игру создавала команда из ...",
        },
        {
          title: "Контакты",
          answer: "По вопросам разработки обращайтесь по адресу ...",
        },
      ],
    },
  ];

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  const handleAnswerClick = (index) => {
    setShowAnswer((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      <Infoheader />
      <Container>
        <NavigationList>
          {questions.map((question, index) => (
            <NavigationItem
              key={index}
              onClick={() => handleQuestionClick(index)}
            >
              {question.title}
            </NavigationItem>
          ))}
        </NavigationList>

        {currentQuestion !== null && (
          <QuestionContainer>
            <QuestionTitle>{questions[currentQuestion].title}</QuestionTitle>
            {questions[currentQuestion].subQuestions.map(
              (subQuestion, index) => (
                <SubQuestionContainer key={index}>
                  <SubQuestionTitle>{subQuestion.title}</SubQuestionTitle>
                  <AnswerButton onClick={() => handleAnswerClick(index)}>
                    {showAnswer[index] ? "Скрыть " : "Показать "}
                  </AnswerButton>
                  {showAnswer[index] && (
                    <AnswerText>{subQuestion.answer}</AnswerText>
                  )}
                </SubQuestionContainer>
              )
            )}
          </QuestionContainer>
        )}
      </Container>
    </>
  );
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;

  @media (max-width: 768px) {
    height: auto;
    padding: 2rem 0;
  }
`;

const NavigationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.7s ease-out;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const NavigationItem = styled.li`
  font-size: 1.5rem;
  margin-top: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
  animation: ${fadeIn} 0.7s ease-out;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const QuestionContainer = styled.div`
  background-color: rgba(83, 81, 81, 0.8);
  border-radius: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 80%;
  max-width: 800px;
  animation: ${fadeIn} 0.7s ease-out;

  @media (max-width: 768px) {
    width: 90%;
    padding: 2rem;
  }
`;

const QuestionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 00;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const SubQuestionContainer = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SubQuestionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
  }
`;

const AnswerButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }

  &:hover {
    background-color: #45a049;
  }
`;

const AnswerText = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
