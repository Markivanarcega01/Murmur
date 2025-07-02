import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, List, ListItemButton, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";

interface MenuItems {
    id: string,
    menuName: string,
    options: string[]
}

export default function MenuItemComponent({menuName,options}: MenuItems) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
    ) => {
        setSelectedIndex(index)
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <div>
                <List
                    component="nav"
                    aria-label="options"
                    sx={{ bgcolor: 'background.paper'}}
                    disablePadding
                >
                    <ListItemButton
                        id="lock-button"
                        onClick={handleClickListItem}
                        sx={{
                            border: "1px solid black",
                            borderRadius:"8px"
                        }}
                    >
                        <ListItemText
                            primary={options[selectedIndex]}
                        />
                        <KeyboardArrowDown></KeyboardArrowDown>
                    </ListItemButton>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </>
    )
}