import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function CreateChat() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id"); // pega o id que veio de '/'
    if (user_id) {
      setUserId(user_id); // salva no state
    } else {
      console.log("Failed to grab user id.");
      navigate("/"); // redireciona de volta
    }
  }, [navigate]);

  const handleCreateChat = async () => {
    if (!userId) return;
    try {
      const response = await fetch("/api/chat/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host_id: Number(userId),
        }),
      });
      if (!response.ok) throw new Error("Error while creating chat.");

      const data = await response.json();

      sessionStorage.setItem("chat_id", data.id || data.chat_id);
      sessionStorage.setItem("chat_code", data.code);

      navigate(`/chat`);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleRedirect = () => {
    navigate("/join");
  };

  return (
    <>
      <Button text={"Create Chat"} onClick={handleCreateChat} />
      <Button text={"Join Chat"} onClick={handleRedirect} />
    </>
  );
}
