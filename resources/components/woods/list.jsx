import { Grid } from "@mui/material";
import DataTable from "../utils/Table/dataTable";

export default function list() {
    const config = {
        title: "Maderas",
        route: "woods",
        headers: ["Nombre", "Variedades"],
        visible: ["name", "varieties_count"],
    };

    return (
        <Grid container justifyContent={"center"}>
            <Grid item md={11}>
                <DataTable {...config} />
            </Grid>
        </Grid>
    );
}
