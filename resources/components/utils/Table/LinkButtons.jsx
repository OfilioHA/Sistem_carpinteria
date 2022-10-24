import { TableCell, IconButton, Stack } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";

export function LinkButtons(props) {
    const { id, route } = props;

    return (
        <>
            <IconButton color="error">
                <Delete />
            </IconButton>
            <IconButton>
                <Edit />
            </IconButton>
            <IconButton color="primary">
                <Visibility />
            </IconButton>
        </>
    );
}
