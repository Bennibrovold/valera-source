import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { setScreen } from "../../../shared/config/router.ts";
import { FaUser, FaLock } from "react-icons/fa";
import style from "./Login.module.css";
import { $user, setUser } from "../../main/models/user.js";
import { useUnit } from "effector-react";
import { loginRequest } from "../../../shared/hooks/auth.js";

export function Register() {
  const user = useUnit($user);
  const [form, setForm] = useState({});

  const setInputValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form?.username?.length && form?.password?.length) {
      const res = await loginRequest(form);

      if (res) {
        setUser(res);
      }
    }
  };

  useLayoutEffect(() => {}, []);
  return (
    <Wrapper>
      <div className={style.container}>
        <div className={style.ssp}>
          <div className={style.pps}>
            <div className={style.wrapper}>
              <h1>Вход</h1>
              <form>
                <div className={style.inputbox}>
                  <input
                    name="username"
                    type="text"
                    placeholder="Логин"
                    required
                    onChange={setInputValue}
                  />
                  <FaUser className={style.icon} />
                </div>
                <div className={style.inputbox}>
                  <input
                    name="password"
                    type="Password"
                    placeholder="Пароль"
                    required
                    onChange={setInputValue}
                  />
                  <FaLock className={style.icon} />
                </div>
                <div className={style.rememberforgot}>
                  <a href="#">Забыли пароль?</a>
                </div>

                <button className={style.button} onClick={handleSubmit}>
                  <a className={style.loginB}>Войти</a>
                </button>
              </form>
              <div className={style.registerlink}>
                <div className={style.colorggg}>Нету аккаута? Создай!</div>

                <div onClick={() => setScreen("login")}>Регистация</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  place-items: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  overflow: hidden;
`;
