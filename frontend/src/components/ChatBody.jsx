import { useState, useEffect, useRef } from "react";
import { TopBar } from "../components/TopBar";
import { TextInput } from "./Input";
import { useNavigate } from "react-router-dom";

export function ChatBody() {
  const navigate = useNavigate();
  const [chatId, setChatId] = useState(null);
  const [chatCode, setChatCode] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [hasGuest, setHasGuest] = useState(false);
  const [isGuest, setIsguest] = useState(false);

  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const chat_id = sessionStorage.getItem("chat_id");
    const chat_code = sessionStorage.getItem("chat_code");
    const user_id = sessionStorage.getItem("user_id");
    const guest_id = sessionStorage.getItem("guest_id");

    if (!chat_id || !user_id) {
      navigate("/");
      return;
    }

    setChatId(chat_id);
    setUserId(user_id);
    getName(user_id);

    if (guest_id == user_id) {
      setIsguest(true);
    }

    if (chat_code) {
      setChatCode(chat_code);
      setMessages([
        {
          senderId: "system",
          senderName: "System",
          text: `This is your code: ${chat_code}`,
          isSystem: true,
        },
      ]);
    }

    if (
      !socketRef.current ||
      socketRef.current.readyState === WebSocket.CLOSED
    ) {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

      const wsHost = `${window.location.hostname}:8000`;

      const ws = new WebSocket(
        `${protocol}//${wsHost}/ws/chat/${chat_id}?userId=${user_id}`,
      );

      ws.onopen = () => {
        setConnected(true);
      };

      ws.onmessage = (event) => {
        const incomingMessage = JSON.parse(event.data);
        setMessages((prev) => [...prev, incomingMessage]);
        checkChatStatus(chat_id);
      };

      ws.onclose = (event) => {
        setConnected(false);

        if (event.code !== 1005 && event.code !== 1006) {
          sessionStorage.clear();
          navigate("/");
        }
      };

      socketRef.current = ws;
    }

    async function getName(currentUserId) {
      try {
        const response = await fetch(`/api/user/${currentUserId}`);
        if (!response.ok) return;
        const data = await response.json();
        setUserName(data.user_name || data.name);
      } catch (err) {
        // Erro omitido intencionalmente
      }
    }

    async function checkChatStatus(currentChatId) {
      if (!currentChatId) return;
      try {
        const response = await fetch(`/api/chat/${chat_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          clearInterval(intervalId); 
          if (socketRef.current) socketRef.current.close(); 
          sessionStorage.clear();
          navigate("/");
          return;
        }

        const chat = await response.json();
        if (chat.guest_id !== null) {
          setHasGuest(true);
        }
      } catch (err) {
        // Erro omitido intencionalmente
      }
    }

    checkChatStatus(chat_id);
    const intervalId = setInterval(() => checkChatStatus(chat_id), 3000);

    return () => {
      clearInterval(intervalId);
      if (
        socketRef.current &&
        (socketRef.current.readyState === WebSocket.OPEN ||
          socketRef.current.readyState === WebSocket.CONNECTING)
      ) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [navigate]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleChatDelete = async () => {
    try {
      const response = await fetch(`/api/chat/${chatId}?user_id=${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        sessionStorage.clear();
        navigate("/");
      } else {
        await response.json().catch(() => ({}));
      }
    } catch (err) {
      // Erro omitido intencionalmente
    }
  };

  const handleMessage = () => {
    if (message.trim() === "" || !connected) return;

    const payload = {
      senderId: userId,
      senderName: userName || "User",
      text: message,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.send(JSON.stringify(payload));
    setMessage("");
  };

  return (
    <div className="bg-primary h-screen overflow-hidden">
      <TopBar
        connected={connected}
        userName={hasGuest ? "Connected" : "Waiting for guest."}
        onDelete={handleChatDelete}
        isGuest={isGuest}
      />
      <div className="flex justify-center px-4">
        <div className="w-full max-w-2xl h-[calc(100vh-40px)] flex flex-col justify-between">
          <div className="h-full flex flex-col justify-end overflow-y-auto py-4 gap-2">
            {messages.map((msg, index) => {
              if (msg.isSystem) {
                return (
                  <div
                    key={index}
                    className="my-2 p-3 rounded-md bg-tertiary max-w-[90%] sm:max-w-fit"
                  >
                    <span className="block text-xs text-slate-200/60 font-semibold mb-1">
                      {msg.senderName}
                    </span>
                    <p className="text-sm font-mono font-bold tracking-wider text-slate-200/80 select-all">
                      {msg.text}
                    </p>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className={`p-2 rounded-lg max-w-[85%] sm:max-w-[70%] ${
                    String(msg.senderId) === String(userId)
                      ? "bg-tertiary text-white align-self-end ml-auto"
                      : "bg-slate-200/90 text-slate-800 mr-auto"
                  }`}
                >
                  <span className="block text-xs opacity-70">
                    {msg.senderName || "User"}
                  </span>
                  <p className="break-words">{msg.text}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between py-2 gap-2 pb-4">
            <TextInput
              placeholder={"Type your message"}
              func={handleChange}
              value={message}
            />
            <button
              className="w-10 h-10 rounded-full focus:outline-none bg-tertiary cursor-pointer text-slate-200/80 flex items-center justify-center shrink-0"
              onClick={handleMessage}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
