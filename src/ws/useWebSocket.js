import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const useWebSocket = (dogId) => {
  const [connection, setConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!dogId) return;

    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7121/NotificationHub", {
        // accessTokenFactory: () => getTokenFromLocalStorage(),
        accessTokenFactory: () =>
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJJc0FkbWluIjoiRmFsc2UiLCJEb2dJZCI6IjEiLCJleHAiOjE3NzQwMjcyNzEsImlzcyI6IlRhaWxCdWRkeXNTZXJ2ZXIiLCJhdWQiOiJUYWlsQnVkZHlzQXBwIn0.TBnYUDH3JH5MolgHOJ24hlFzjjZV60uzJAIseXWFtTk",
      }) // Update with your backend URL
      .withAutomaticReconnect()
      .build();

    setConnection(hubConnection);

    const startConnection = async () => {
      try {
        await hubConnection.start();
        console.log("Connected to SignalR Hub");

        // Call the JoinDogGroup function in the hub
        hubConnection
          .invoke("JoinDogGroup", dogId)
          .then(() => console.log(`JoinDogGroup invoked with dogId: ${dogId}`))
          .catch((err) => console.error("JoinDogGroup error:", err));

        // Listen for incoming match notifications
        hubConnection.on("ReceiveNewMatch", (matchId) => {
          console.log("New Match Notification:", matchId);
          setNotifications((prev) => [...prev, matchId]);
        });

        // Listen for errors from the server
        hubConnection.on("Error", (message) => {
          console.error("Server Error:", message);
        });
      } catch (error) {
        console.error("SignalR Connection Error:", error);
      }
    };

    startConnection();

    return () => {
      if (hubConnection) {
        hubConnection.stop();
        console.log("Disconnected from SignalR Hub");
      }
    };
  }, [dogId]);

  return { notifications, connection };
};

export default useWebSocket;

//--------------------------------------------------------------------------------------------------------------------------------//
