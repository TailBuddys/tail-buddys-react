import { useCallback, useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { getTokenFromLocalStorage } from "../services/localStorageService";

const useWebSocket = (dogId) => {
  const [notificationConnection, setNotificationConnection] = useState(null);
  const [chatConnection, setChatConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [chatNotifications, setChatNotifications] = useState([]);
  const activeChats = useRef(new Set()); // Track active chats using ref

  // Main connections setup
  useEffect(() => {
    if (!dogId) return;

    // --- Notification Hub ---
    const setupNotificationConnection = async () => {
      const notifConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7121/NotificationHub", {
          accessTokenFactory: () => getTokenFromLocalStorage(),
        })
        .withAutomaticReconnect()
        .build();

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

        setNotificationConnection(notifConnection);
      } catch (error) {
        console.error("NotificationHub Connection Error:", error);
      }
    };

    // --- Chat Hub ---
    const setupChatConnection = async () => {
      const chatConn = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7121/ChatHub", {
          accessTokenFactory: () => getTokenFromLocalStorage(),
        })
        .withAutomaticReconnect()
        .build();

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

        setChatConnection(chatConn);
      } catch (error) {
        console.error("ChatHub Connection Error:", error);
      }
    };

    setupNotificationConnection();
    setupChatConnection();

    return () => {
      if (notificationConnection) {
        notificationConnection
          .stop()
          .catch((err) =>
            console.error("Error stopping notification connection:", err)
          );
      }
      if (chatConnection) {
        chatConnection
          .stop()
          .catch((err) =>
            console.error("Error stopping chat connection:", err)
          );
      }
      console.log("Disconnected from both hubs");
    };
  }, [dogId]);

  // --- Public API: Join specific chat group ---
  const joinChat = useCallback(
    async (chatId) => {
      if (!chatId || !chatConnection || activeChats.current.has(chatId)) return;

      try {
        await chatConnection.invoke("JoinSpecificChatGroup", chatId, dogId);
        console.log(`📥 Joined specific chat ${chatId}`);

        // Add to active chats
        activeChats.current.add(chatId);
      } catch (err) {
        console.error("❌ Failed to join specific chat:", err);
      }
    },
    [dogId, chatConnection]
  );

  // --- Public API: Leave specific chat ---
  const leaveChat = useCallback(
    async (chatId) => {
      if (!chatId || !chatConnection || !activeChats.current.has(chatId))
        return;

      try {
        await chatConnection.invoke("LeaveSpecificChatGroup", chatId, dogId);
        console.log(`📤 Left chat ${chatId}`);

        // Remove from active chats
        activeChats.current.delete(chatId);
      } catch (err) {
        console.error("❌ Failed to leave specific chat:", err);
      }
    },
    [dogId, chatConnection]
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
