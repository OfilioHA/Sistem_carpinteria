import { Grid } from "@mui/material";
import DataTable from "../utils/Table/dataTable";

export function FurnitureList() {
    const config = {
        title: 'Muebles',
        route: 'furnitures',
        headers: ["Nombre", "Categoria", "Piezas"],
        visible: ["name", "category_name", 'varieties_count'],
    };

    return (
        <Grid container justifyContent="center">
            <Grid item md={11}>
                <DataTable {...config} />
            </Grid>
        </Grid>
    );
}
