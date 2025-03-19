import { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useUser } from "../users/providers/UserProvider";
import {
  //   getTokenFromLocalStorage,
  getUser,
} from "../services/localStorageService";

const API_URL = "https://localhost:7121"; // Replace with your backend URL

const useWebSocket = () => {
  const [connection, setConnection] = useState(null);
  const { token } = useUser();
  useEffect(() => {
    const user = getUser();

    if (!user || !user.DogId || user.DogId.length === 0) {
      console.error("No dogs found in token.");
      return;
    }

    // Build the SignalR connection
    const connectionBuilder = new HubConnectionBuilder()
      .withUrl(`${API_URL}/NotificationHub`, {
        // accessTokenFactory: () => getTokenFromLocalStorage(),
        accessTokenFactory: () => token,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    connectionBuilder
      .start()
      .then(() => {
        const dogIds = Array.isArray(user.DogId) ? user.DogId : [user.DogId];
        dogIds.forEach((dogId) => {
          console.log("haraBatahat");
          connectionBuilder
            .invoke("JoinDogGroup", dogId)
            .catch((err) =>
              console.error(`Failed to join group for dog ${dogId}:`, err)
            );
        });
        // Join groups for all dogs
        // user.DogId.forEach((DogId) => {
        //   console.log("haraBatahat");
        //   connectionBuilder
        //     .invoke("JoinDogGroup", DogId)
        //     .catch((err) =>
        //       console.error(`Failed to join group for dog ${DogId}:`, err)
        //     );
        // });
        console.log("SignalR Connected for dogs:", user.DogId);
      })
      .catch((err) => console.error("SignalR connection failed:", err));

    // Set the connection
    setConnection(connectionBuilder);

    return () => {
      connectionBuilder
        .stop()
        .then(() => console.log("SignalR connection closed"));
    };
  }, [token]);

  return connection;
};

export default useWebSocket;

// import * as signalR from "@microsoft/signalr";
// import { useEffect, useState } from "react";

// const useWebSocket = (dogId, currentChatId, isMatchesTabOpen) => {
//   const [notifications, setNotifications] = useState({
//     totalUnreadMessages: 0,
//     chatUnread: {},
//     matchUnread: 0,
//   });

//   useEffect(() => {
//     const connection = new signalR.HubConnectionBuilder()
//       .withUrl("http://localhost:7121/notificationHub")
//       .withAutomaticReconnect()
//       .build();

//     connection.start().then(() => {
//       connection.invoke("JoinDogGroup", dogId);
//     });

//     connection.on("ReceiveMessage", (message) => {
//       console.log("New message received:", message);
//     });

//     connection.on("ReceiveNewMatch", () => {
//       console.log("New match received, refreshing matches list...");
//     });

//     connection.on("NotificationRead", (chatId) => {
//       setNotifications((prev) => {
//         const newChatUnread = { ...prev.chatUnread };
//         delete newChatUnread[chatId];

//         return {
//           ...prev,
//           chatUnread: newChatUnread,
//           totalUnreadMessages: Object.values(newChatUnread).reduce(
//             (sum, count) => sum + count,
//             0
//           ),
//         };
//       });
//     });

//     connection.on("MatchesNotificationRead", () => {
//       setNotifications((prev) => ({ ...prev, matchUnread: 0 }));
//     });

//     if (currentChatId) {
//       connection.invoke("MarkChatAsRead", dogId, currentChatId);
//     }

//     if (isMatchesTabOpen) {
//       connection.invoke("MarkMatchesAsRead", dogId);
//     }

//     return () => {
//       connection.stop();
//     };
//   }, [dogId, currentChatId, isMatchesTabOpen]);

//   return notifications;
// };

// export default useWebSocket;
