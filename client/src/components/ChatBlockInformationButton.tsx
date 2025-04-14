import { useState } from 'react';
import { ChatBlockInformationItemProps } from './ChatBlockInformation';
interface ChatBlockInformationButtonProps {
    item: ChatBlockInformationItemProps
}
function ChatBlockInformationButton({item}:ChatBlockInformationButtonProps) {
    const [isActive, SetIsActive] = useState(false)
    return(
        <div onClick={() => SetIsActive(!isActive)} >
            {item.name}
            {isActive 
            ? item.list.map((item) => {
                return(
                    <div key={item.item_name}>{item.icon} {item.item_name}</div>
                )  
            })
            : ""
            }
        </div>
    )

}

export default ChatBlockInformationButton