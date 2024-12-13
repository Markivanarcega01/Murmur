import { useState } from "react"


function ChatBlock(){
    const [isUser, SetIsUser] = useState(false)
    const dummyData = [
        {
            time: "2:30PM",
            name: "Ivan",
            image: "/src/assets/image.png",
            message: "Punta tayo anos",
            isUser: true,
        },
        {
            time: "3:00PM",
            name: "Dae",
            image: "/src/assets/image.png",
            message: "pass ako boi",
            isUser: false,
        },
        {
            time: "2:30AM",
            name: "Ernesto",
            image: "/src/assets/image.png",
            message: "tra",
            isUser: false,
        },
        {
            time: "3:00AM",
            name: "Tristan",
            image: "/src/assets/image.png",
            message: "tra",
            isUser: false,
        },
        {
            time: "2:30PM",
            name: "Ivan",
            image: "/src/assets/image.png",
            message: "Punta tayo anos",
            isUser: true,
        },
        {
            time: "3:00PM",
            name: "Dae",
            image: "/src/assets/image.png",
            message: "pass ako boi",
            isUser: false,
        },
        {
            time: "2:30AM",
            name: "Ernesto",
            image: "/src/assets/image.png",
            message: "tra",
            isUser: false,
        },
        {
            time: "3:00AM",
            name: "Tristan",
            image: "/src/assets/image.png",
            message: "tra",
            isUser: false,
        },
        {
            time: "2:30PM",
            name: "Ivan",
            image: "/src/assets/image.png",
            message: "Punta tayo anos",
            isUser: true,
        },
        {
            time: "3:00PM",
            name: "Dae",
            image: "/src/assets/image.png",
            message: "pass ako boi",
            isUser: false,
        },
        {
            time: "2:30AM",
            name: "Ernesto",
            image: "/src/assets/image.png",
            message: "tra",
            isUser: false,
        },
        {
            time: "3:00AM",
            name: "Tristan",
            image: "/src/assets/image.png",
            message: "tra",
            isUser: false,
        },
        {
            time: "2:30PM",
            name: "Ivan",
            image: "/src/assets/image.png",
            message: "Punta tayo anos",
            isUser: true,
        },
    ]

    return (
        <>
            <div className="w-full flex flex-col gap-y-1 ">
            {dummyData.map((data)=>{
                return (
                    <>
                        <p className="text-xs text-center text-gray-500">{data.time}</p>
                        {!data.isUser 
                        ? 
                        <>
                            <p className="text-xs pl-12 text-gray-500">{data.name}</p>
                            <div className="flex flex-row gap-x-2 items-center">
                                <img src={data.image} alt="" height={30} width={30}/>
                                <p className="rounded-full bg-gray-200 py-2 px-4 text-sm">{data.message}</p>
                            </div>
                            <div className="flex justify-end gap-x-1 mr-3">
                                <img src={data.image} alt="" height={12} width={12}/>
                                <img src={data.image} alt="" height={12} width={12}/>
                                <img src={data.image} alt="" height={12} width={12}/>
                            </div>
                        </>
                        :
                        <>
                            <div className="flex items-center justify-end">
                                <p className="rounded-full bg-blue-500 py-2 px-4 text-sm text-white">{data.message}</p>
                            </div>
                            <p className="text-xs text-right text-gray-500 mr-3">Sent 2 hours ago</p>
                        </>
                        }
                    </>
                )
                })
            }
            </div>
        </>
    )
}


export default ChatBlock