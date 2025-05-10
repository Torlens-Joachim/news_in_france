"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { Modal } from "antd";
import { user } from "@/app/types/types";
import {login} from "@/reducers/user";
import { useDispatch } from "react-redux";

const Header = () => {
  const [date, setDate] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false); // Pour s'assurer que le DOM est prêt
  const [userRegister, setUserRegister] = useState<user>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [userLogin, setUserLogin] = useState<user>({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState<string>();
  const [isGood, setIsGood] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleChangeRegisterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUserRegister((prevUser: user) => ({ ...prevUser, [name]: value }));
  };

  const handleChangeLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    setUserLogin((prevUser) => ({...prevUser, [name]: value}));
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response: Response = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userRegister),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Erreur inconnue.");
        setIsGood(false);
        return;
      }

      // Succès
      setMessage(data.message);
      setIsGood(true);
    } catch (error) {
      console.log("Erreur serveur", error);
      setMessage("Une erreur s'est produite");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const response: Response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userLogin),
      });
      const data = await response.json();

      if(!response.ok) {
        setMessage("Une erreur s'est produite");
        setIsGood(false);
        return;
      }

      dispatch(login(userLogin));
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const now = new Date();
    const formattedDate = capitalizeFirstLetter(
      now.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    );
    setDate(formattedDate);
    setMounted(true); // Important pour que getElementById fonctionne
  }, []);

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const modalContent = (
    <>
      <div className="w-[200px] border-2 p-4 mr-4">
        <form onSubmit={handleRegister}>
          <p className="mb-2 text-center font-semibold">Inscription</p>
          <input
            className="border rounded-sm px-1 py-1 outline-none w-full mb-2"
            type="text"
            placeholder="Pseudo"
            name="username"
            onChange={handleChangeRegisterForm}
          />
          <input
            className="border rounded-sm px-1 py-1 outline-none w-full mb-2"
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={handleChangeRegisterForm}
          />
          <input
            className="border rounded-sm px-1 py-1 outline-none w-full mb-2"
            type="password"
            placeholder="Retaper le mot de passe"
            name="confirmPassword"
            onChange={handleChangeRegisterForm}
          />
          <button
            type="submit"
            className="mt-3 bg-blue-500 text-white py-1 rounded w-full cursor-pointer"
          >
            M&apos;inscrire
          </button>
        </form>
        {message && (
          <p
            className={`text-center mt-2 ${
              isGood ? "text-green-700" : "text-red-700"
            }`}
          >
            {message}
          </p>
        )}
      </div>
      <div className="w-[200px] border-2 p-4">
        <form onSubmit={handleLogin}>
          <p className="mb-2 text-center font-semibold">Connexion</p>
          <input
            onChange={handleChangeLoginForm}
            className="border rounded-sm px-1 py-1 outline-none w-full mb-4"
            type="text"
            placeholder="Pseudo"
            name="username"
          />
          <input
            onChange={handleChangeLoginForm}
            className="border rounded-sm px-1 py-1 outline-none w-full"
            type="password"
            placeholder="Mot de passe"
            name="password"
          />
          <button type="submit" className="mt-3 bg-green-500 text-white py-1 rounded w-full cursor-pointer">
            Me connecter
          </button>
        </form>
      </div>
    </>
  );

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <header>
      <nav className="my-4">
        <ul className="relative flex justify-between items-center">
          {date && <li>{date}</li>}
          <li className="absolute left-1/2 transform -translate-x-1/2 text-4xl italic">
            News In France
          </li>

          <li className="w-[150px] text-end">
            <IoPersonSharp
              className="inline-block cursor-pointer text-2xl"
              onClick={showModal}
            />
          </li>
        </ul>

        <div className="mt-5">
          <ul className="flex justify-center items-center">
            <li className="me-10">
              <Link href={"/"}>News</Link>
            </li>
            <li>
              <Link href={"/saved-news"}>Articles sauvegardés</Link>
            </li>
          </ul>
        </div>

        {/* Container cible pour le modal */}
        <div id="react-modals" className="flex justify-center mt-4" />

        {/* Affichage conditionnel du Modal uniquement après montage */}
        {mounted && (
          <Modal
            getContainer={() => document.getElementById("react-modals")!}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            closable={false}
            footer={null}
            centered
          >
            <div className="flex justify-between">{modalContent}</div>
          </Modal>
        )}

        <hr className="text-red-500" />
      </nav>
    </header>
  );
};

export default Header;
