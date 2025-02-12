import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import { logout } from "../../libs/auth";
import { useRecoilState } from "recoil";
import { userState } from "../../stores/user";

export default function ConfigMenu() {
    const [user] = useRecoilState(userState);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

    const handleCloseUserMenu = () => setAnchorElUser(null);

    const settings = [
        {
            title: "Cerrar Sesión",
            action: () => {
                logout();
            },
        },
    ];

    return (
        <>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt={user.name}
                        src="/static/images/avatar/2.jpg"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem >
                    <Typography>
                        {user.name}
                        <br />- {user.role.name}
                    </Typography>
                </MenuItem>
                <Divider />
                {settings.map(({ title, action }, index) => (
                    <MenuItem key={index} onClick={action}>
                        <Typography textAlign="center">{title}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
