"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { Modal } from "antd";
import { user } from "@/app/types/types";

const Header = () => {
  const [date, setDate] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false); // Pour s'assurer que le DOM est prêt
  const [user, setUser] = useState<user>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<string>();
  const [status, setStatus] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUser((prevUser: user) => ({ ...prevUser, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Erreur inconnue.");
        setStatus(false);
        return;
      }

      // Succès
      setMessage(data.message);
      setStatus(true);
    } catch (error) {
      console.log("Erreur serveur", error);
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
            onChange={handleChange}
          />
          <input
            className="border rounded-sm px-1 py-1 outline-none w-full mb-2"
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={handleChange}
          />
          <input
            className="border rounded-sm px-1 py-1 outline-none w-full mb-2"
            type="password"
            placeholder="Retaper le mot de passe"
            name="confirmPassword"
            onChange={handleChange}
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
              status
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {message}
          </p>
        )}
      </div>
      <div className="w-[200px] border-2 p-4">
        <form>
          <p className="mb-2 text-center font-semibold">Connexion</p>
          <input
            className="border rounded-sm px-1 py-1 outline-none w-full mb-4"
            type="text"
            placeholder="Pseudo"
            name="username"
          />
          <input
            className="border rounded-sm px-1 py-1 outline-none w-full"
            type="password"
            placeholder="Mot de passe"
            name="password"
          />
          <button className="mt-3 bg-green-500 text-white py-1 rounded w-full cursor-pointer">
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
