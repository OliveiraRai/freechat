import { useState } from "react";
import { Button } from "../components/Button";
import { TextInput } from "../components/Input";
import { useNavigate } from "react-router-dom";

export function CreateUser() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  async function handleCreateUser() {
    if (!nickname.trim()) return;

    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nickname,
        }),
      });

      const user = await response.json(); 

      if (!response.ok) {
        alert(user.detail || "Erro ao criar usuário");
        return;
      }

      sessionStorage.setItem("user_id", user.id);
      navigate("/create");
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  return (
    <>
      <TextInput
        placeholder={"Choose a nickname"}
        value={nickname}
        func={handleChange}
      />
      <Button text={"Next"} onClick={handleCreateUser} />
    </>
  );
}
