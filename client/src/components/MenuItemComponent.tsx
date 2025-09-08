import { KeyboardArrowDown } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";

interface MenuItems {
  id: string;
  menuName: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function MenuItemComponent({
  menuName,
  options,
  value,
  onChange,
}: MenuItems) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = () => {
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
          sx={{ bgcolor: "background.paper" }}
          disablePadding
        >
          <ListItemButton
            id="lock-button"
            onClick={handleClickListItem}
            sx={{
              border: "1px solid black",
              borderRadius: "8px",
            }}
          >
            <ListItemText primary={value} />
            <KeyboardArrowDown></KeyboardArrowDown>
          </ListItemButton>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === value}
              onClick={() => {
                onChange(option);
                handleMenuItemClick();
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
}
