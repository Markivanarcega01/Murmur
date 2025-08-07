import { useState } from "react";
import { ConversationMessagesDataProps } from "../interface/conversations.interface";
import { UsersDataProps } from "../interface/users.interface";

function ChatBlock({
  conversationMessages,
  loggedUser,
}: {
  conversationMessages: ConversationMessagesDataProps[];
  loggedUser: UsersDataProps;
}) {
  //const [isUser, SetIsUser] = useState(false);
  const dummyData = [
    {
      id: 1,
      time: "2:30PM",
      name: "Ivan",
      image: "/src/assets/image.png",
      message: "Punta tayo anos",
      isUser: true,
    },
    {
      id: 2,
      time: "3:00PM",
      name: "Dae",
      image: "/src/assets/image.png",
      message: "pass ako boi",
      isUser: false,
    },
    {
      id: 3,
      time: "2:30AM",
      name: "Ernesto",
      image: "/src/assets/image.png",
      message: "tra",
      isUser: false,
    },
    {
      id: 4,
      time: "3:00AM",
      name: "Tristan",
      image: "/src/assets/image.png",
      message: "tra",
      isUser: false,
    },
    {
      id: 5,
      time: "2:30PM",
      name: "Ivan",
      image: "/src/assets/image.png",
      message: "Punta tayo anos",
      isUser: true,
    },
    {
      id: 6,
      time: "3:00PM",
      name: "Dae",
      image: "/src/assets/image.png",
      message: "pass ako boi",
      isUser: false,
    },
    {
      id: 7,
      time: "2:30AM",
      name: "Ernesto",
      image: "/src/assets/image.png",
      message: "tra",
      isUser: false,
    },
    {
      id: 8,
      time: "3:00AM",
      name: "Tristan",
      image: "/src/assets/image.png",
      message: "tra",
      isUser: false,
    },
    {
      id: 9,
      time: "2:30PM",
      name: "Ivan",
      image: "/src/assets/image.png",
      message: "Punta tayo anos",
      isUser: true,
    },
    {
      id: 10,
      time: "3:00PM",
      name: "Dae",
      image: "/src/assets/image.png",
      message: "pass ako boi",
      isUser: false,
    },
    {
      id: 11,
      time: "2:30AM",
      name: "Ernesto",
      image: "/src/assets/image.png",
      message: "tra",
      isUser: false,
    },
    {
      id: 12,
      time: "3:00AM",
      name: "Tristan",
      image: "/src/assets/image.png",
      message: "tra",
      isUser: false,
    },
    {
      id: 13,
      time: "2:30PM",
      name: "Ivan",
      image: "/src/assets/image.png",
      message: "Punta tayo anos",
      isUser: true,
    },
  ];
  //console.log(conversationMessages);
  return (
    <>
      <div className="w-full flex flex-col gap-y-1 ">
        {conversationMessages.map((data) => {
          let isUser = data.User.username == loggedUser.username;
          return (
            <div key={data.id}>
              <p className="text-xs text-center text-gray-500">
                {data.User.firstname}
              </p>
              {!isUser ? (
                <>
                  <p className="text-xs pl-12 text-gray-500">
                    {data.User.firstname}
                  </p>
                  <div className="flex flex-row gap-x-2 items-center">
                    {/* <img src={data.image} alt="" height={30} width={30}/> */}
                    <p className="rounded-full bg-gray-200 py-2 px-4 text-sm">
                      {data.text}
                    </p>
                  </div>
                  <div className="flex justify-end gap-x-1 mr-3">
                    {/* <img src={data.image} alt="" height={12} width={12}/>
                        <img src={data.image} alt="" height={12} width={12}/>
                        <img src={data.image} alt="" height={12} width={12}/> */}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-end">
                    <p className="rounded-full bg-blue-500 py-2 px-4 text-sm text-white">
                      {data.text}
                    </p>
                  </div>
                  <p className="text-xs text-right text-gray-500 mr-3">
                    Sent 2 hours ago
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ChatBlock;
