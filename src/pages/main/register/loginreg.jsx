import React, { useState } from "react";
import style from "./Register.module.css";
import { MdEmail } from "react-icons/md";
import { FaUser, FaLock } from "react-icons/fa";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useUnit } from "effector-react";
import { $user, setUser } from "../../main/models/user.js";
import { registerRequest } from "../../../shared/hooks/auth.js";

export function Registermain() {
  const user = useUnit($user);
  const [form, setForm] = useState({});
  const errorSwal = (msg) =>
    Swal.fire({
      icon: "error",
      title: "Произошла ошибка",
      text: msg || "Пароли не совпадают",
    });

  const setInputValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.re_password) {
      errorSwal();

      return null;
    }
    if (form?.username?.length && form?.password?.length) {
      const res = await registerRequest(form);

      if (res) {
        setUser(res);
      }
    }
  };

  return (
    <Wrapper>
      <div className={style.container}>
        <div className={style.ssp}>
          <div className={style.pps}>
            <form>
              <div className={style.wrapper}>
                <h1>Регистация</h1>
                <div className={style.inputbox}>
                  <input
                    name="username"
                    type="text"
                    onChange={setInputValue}
                    placeholder="Username"
                    required
                  />

                  <FaUser className={style.icon} />
                </div>
                <div className={style.inputbox}>
                  <input
                    name="Email"
                    onChange={setInputValue}
                    type="text"
                    placeholder="Email"
                    required
                  />
                  <MdEmail className={style.icon} />
                </div>
                <div className={style.inputbox}>
                  <input
                    name="password"
                    onChange={setInputValue}
                    type="Password"
                    placeholder="Password"
                    required
                  />
                  <FaLock className={style.icon} />
                </div>
                <div className={style.inputbox}>
                  <input
                    name="re_password"
                    onChange={setInputValue}
                    type="Password"
                    placeholder="Repeat the password"
                    required
                  />

                  <FaLock className={style.icon} />
                </div>
                <div className={style.rememberforgot}></div>
                <button
                  className={style.but}
                  disabled={Object.values(form).filter(Boolean).length !== 4}
                  onClick={handleSubmit}
                >
                  Создать аккаут
                </button>

                <div className={style.registerlink}></div>
              </div>
            </form>
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
