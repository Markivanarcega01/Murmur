import { useEffect, useState } from 'react'
import './App.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import UserChatInformation from './components/UserChatInformation';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import InfoIcon from '@mui/icons-material/Info';     
import AddCircleIcon from '@mui/icons-material/AddCircle';  
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GifIcon from '@mui/icons-material/Gif';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBlock from './components/ChatBlock';

function App() {
  const [data,setData] = useState()
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = (e:React.UIEvent<HTMLElement>) => {
    const { scrollTop } = e.target as HTMLElement;
    setIsScrolled(scrollTop > 0);
  };
  const dummyData = [
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Ivan Arcega",
      lastConvo: "This is a sample convo",
      isActive: true
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Stephen Arcega",
      lastConvo: "This is a sample1 convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Ivan Arcega",
      lastConvo: "This is a sample convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Stephen Arcega",
      lastConvo: "This is a sample1 convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Ivan Arcega",
      lastConvo: "This is a sample convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Stephen Arcega",
      lastConvo: "This is a sample1 convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Ivan Arcega",
      lastConvo: "This is a sample convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Stephen Arcega",
      lastConvo: "This is a sample1 convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Ivan Arcega",
      lastConvo: "This is a sample convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Stephen Arcega",
      lastConvo: "This is a sample1 convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Ivan Arcega",
      lastConvo: "This is a sample convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Stephen Arcega",
      lastConvo: "This is a sample1 convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Ivan Arcega",
      lastConvo: "This is a sample convo"
    },
    {
      profile:"/src/assets/UPOULogo.png",
      name:"Mark Stephen Arcega",
      lastConvo: "This is a sample1 convo"
    },
  ]
  useEffect(()=>{
    fetch("http://localhost:3000/")
    .then(response=>{
      return response.json()
    })
    .then(data=>{
      console.log(data)
      setData(data.message)
    })
  },[])
  return (
    <>
      <div className='flex flex-row h-screen'>
        {/* Component 1*/}
        <div className='basis-1/4 p-4 flex flex-col h-full'>

          <div className='flex flex-row h-fit space-x-3'>
            <div className='text-2xl font-semibold basis-10/12 self-center'>Chats</div>
            <button className='rounded-full p-1 bg-gray-200 w-9'><MoreHorizIcon/></button>
            <button className='rounded-full p-1 bg-gray-200 w-9'><CreateOutlinedIcon/></button>
          </div>

          <form className="max-w-md mt-4 mb-4">   
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" id="default-search" className="block w-full h-10 p-4 ps-10 text-sm rounded-full bg-gray-200" placeholder="Search Messenger" required />
              </div>
          </form>

          <div 
              className={`flex-1 overflow-auto ${isScrolled ? 'border-y border-slate-200':""}`}
              onScroll={handleScroll}>
              {dummyData.map((data)=>
                <UserChatInformation profile={data.profile} information={{name:`${data.name}`, lastConvo: `${data.lastConvo}`}} isActive={true}/>
              )}
          </div>

        </div>

        {/* Component 2 */}
        <div className='basis-3/4 border-x flex flex-col'>

              <div className='border-b flex justify-between items-center'>
                <div className='w-fit'>
                  <UserChatInformation profile={dummyData[0].profile} information={{name: `${dummyData[0].name}`, lastConvo:``}} isActive={false}/>
                </div>
                <div className='flex flex-row gap-x-5 mr-5'>
                  <button><CallIcon color='primary'/></button>
                  <button><VideocamIcon color='primary'/></button>
                  <button><InfoIcon color='primary'/></button>
                </div>
              </div>

              <div className='flex-1 overflow-auto px-2'>
                <ChatBlock/>
              </div>

              <div className='p-2 flex flex-row gap-x-3 items-center'>
                <button><AddCircleIcon color='primary'/></button>
                <button><ImageIcon color='primary'/></button>
                <button><EmojiEmotionsIcon color='primary'/></button>
                <button><GifIcon color='primary'/></button>
                <div className="relative flex-1">
                  {/* this absolute child can only move within the scope of the relative parent */}
                    <button className="absolute inset-y-0 end-0 flex items-center pe-3 "><EmojiEmotionsIcon color='primary'/></button>
                    <form action="">
                      <input className="block w-full h-8 px-4 pe-10 text-sm rounded-full bg-gray-200" placeholder="Search Messenger" required />
                    </form>
                </div>
                <button><ThumbUpIcon color='primary'/></button>
              </div>
        </div>

        {/** Component 3*/}
        <div className='bg-red-300 basis-1/4'>Component 3: Info about Conversation</div>
      </div>
    </>
  )
}

export default App
