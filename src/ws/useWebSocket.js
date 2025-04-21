import { useCallback, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { getTokenFromLocalStorage } from "../services/localStorageService";

const useWebSocket = (dogId) => {
  const [notificationConnection, setNotificationConnection] = useState(null);
  const [chatConnection, setChatConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [chatNotifications, setChatNotifications] = useState([]);
  const [chatConnections, setChatConnections] = useState(new Map()); // לשאול

  useEffect(() => {
    if (!dogId) return;

    // --- Notification Hub ---
    const notifConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7121/NotificationHub", {
        accessTokenFactory: () => getTokenFromLocalStorage(),
      })
      .withAutomaticReconnect()
      .build();

    setNotificationConnection(notifConnection);

    const startNotificationConnection = async () => {
      try {
        await notifConnection.start();
        console.log("Connected to NotificationHub");

        await notifConnection.invoke("JoinDogGroup", parseInt(dogId));
        console.log(`Joined Notification Group for dogId: ${dogId}`);

        notifConnection.on("ReceiveNewMatch", (matchId) => {
          console.log("New Match Notification:", matchId);
          setNotifications((prev) => [...prev, matchId]);
        });

        notifConnection.on("Error", (message) => {
          console.error("NotificationHub Error:", message);
        });
      } catch (error) {
        console.error("NotificationHub Connection Error:", error);
      }
    };

    // --- Chat Hub ---
    const chatConn = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7121/ChatHub", {
        accessTokenFactory: () => getTokenFromLocalStorage(),
      })
      .withAutomaticReconnect()
      .build();

    setChatConnection(chatConn);

    const startChatConnection = async () => {
      try {
        await chatConn.start();
        console.log("Connected to ChatHub");

        await chatConn.invoke("JoinDogChatsGroup", parseInt(dogId));
        console.log(`Joined Chat Group for dogId: ${dogId}`);

        chatConn.on("ReceiveChatNotification", ({ chatId }) => {
          console.log("New Chat Notification:", chatId);
          setChatNotifications((prev) => [...prev, chatId]);
        });

        chatConn.on("Error", (message) => {
          console.error("ChatHub Error:", message);
        });
      } catch (error) {
        console.error("ChatHub Connection Error:", error);
      }
    };

    startNotificationConnection();
    startChatConnection();

    return () => {
      notifConnection.stop();
      chatConn.stop();
      console.log("Disconnected from both hubs");

      chatConnections.forEach((conn, chatId) => {
        conn
          .stop()
          .then(() => console.log(`🛑 Disconnected from chat ${chatId}`));
      });
      // setChatConnections(new Map());
    };
  }, [dogId, chatConnections]);

  // --- Public API: Join specific chat group ---
  const joinChat = useCallback(
    async (chatId) => {
      if (!chatId || chatConnections.has(chatId)) return;
      const newConn = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7121/ChatHub", {
          accessTokenFactory: () => getTokenFromLocalStorage(),
        })
        .withAutomaticReconnect()
        .build();
      try {
        await newConn.start();
        await newConn.invoke("JoinSpecificChatGroup", chatId, dogId);
        console.log(`📥 Joined specific chat ${chatId}`);
        // Optional: Listen to messages here if needed
        newConn.on("ReceiveMessage", (message) => {
          console.log(`💬 Message in chat ${chatId}:`, message);
        });
        setChatConnections((prev) => new Map(prev).set(chatId, newConn));
      } catch (err) {
        console.error("❌ Failed to join specific chat:", err);
      }
    },
    [dogId, chatConnections]
  );

  // --- Public API: Leave specific chat (stops its connection) ---
  const leaveChat = useCallback(
    async (chatId) => {
      const conn = chatConnections.get(chatId);
      if (!conn) return;
      try {
        await conn.invoke("LeaveSpecificChatGroup", chatId, dogId);
        await conn.stop();
        console.log(`📤 Left and disconnected from chat ${chatId}`);
        const updated = new Map(chatConnections);
        updated.delete(chatId);
        setChatConnections(updated);
      } catch (err) {
        console.error("❌ Failed to leave specific chat:", err);
      }
    },
    [dogId, chatConnections]
  );

  return {
    notifications,
    chatNotifications,
    notificationConnection,
    chatConnection,
    joinChat,
    leaveChat,
  };
};

export default useWebSocket;

//--------------------------------------------------------------------------------------------------------------------------------//
