import { Grid } from "@mui/material";
import DataTable from "../utils/Table/dataTable";

export default function list() {
    const config = {
        title: "Usuarios",
        route: "users",
        headers: ["Nombre", "Rol"],
        visible: ["name", "role_name"],
    };

    return (
        <Grid container justifyContent={"center"}>
            <Grid item md={11}>
                <DataTable {...config} />
            </Grid>
        </Grid>
    );
}
