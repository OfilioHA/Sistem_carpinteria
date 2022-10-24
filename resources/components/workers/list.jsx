
import { Grid } from "@mui/material";
import DataTable from "../utils/Table/dataTable";

export function WorkersList() {
    const config = {
        title: "Trabajadores",
        route: "workers",
        headers: [ "Nombre", "INSS", "Cédula" ],
        visible: [ "fullname", "code", "identification" ]
    };

    return (
        <Grid container justifyContent={"center"}>
            <Grid item md={11}>
                <DataTable {...config} />
            </Grid>
        </Grid>
    );
}