import { Button } from "../components/Button";
import { TextInput } from "../components/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function JoinChat() {
  const navigate = useNavigate();
  const [chatCode, setChatCode] = useState("");

  const handleChange = (e) => {
    setChatCode(e.target.value);
  };

  const handleJoinChat = async () => {
    if (!chatCode.trim()) return;

    try {
      const response = await fetch(`/api/chat/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: chatCode,
          guest_id: Number(sessionStorage.getItem("user_id")),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          "Erro do servidor:",
          errorData.detail || response.statusText,
        );
        return;
      }

      const data = await response.json();

      const chatId = data.chat_id || data.id;
      sessionStorage.setItem("chat_id", chatId);

      navigate("/chat");
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <TextInput
        placeholder={"Enter room code"}
        value={chatCode}
        func={handleChange}
      />
      <Button text={"Join"} onClick={handleJoinChat} />
    </>
  );
}
