import { Drawer, List } from "@mui/material";
import { Box } from "@mui/system";
import MenuItem from "./MenuItem";
import { useRecoilState } from "recoil";
import { userState } from "../../stores/user";

export default function Menu(props) {
    const [user] = useRecoilState(userState);
    const { open, toogle } = props;

    const menu = [
        {
            text: 'Inicio',
            route: '/'
        },
        {
            text: 'Compras',
            route: '/purchases'
        },
        {
            text: 'Proveedores',
            route: '/suppliers'
        },
        {
            text: 'Trabajadores',
            route: '/workers'
        },
        {
            text: 'Maderas',
            route: '/woods'
        }
    ];

    if(user.role_id === 1){
        menu.push({
            text: 'Usuarios',
            route: '/users'
        })
    }

    return (
        <Drawer 
            anchor="left" 
            open={open}
            onClose={toogle}
            className="sidebar"
        >
            <Box
                sx={{width: 250}}
                role="presentation"
                onClick={toogle}
            >
                <List>
                    {menu.map((item, key) =>(
                        <MenuItem {...item} key={key}/>
                    ))}                
                </List>
            </Box>
        </Drawer>
    );
}
