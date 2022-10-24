import { Grid, Rating } from "@mui/material";
import DataTable from "../utils/Table/dataTable";

export default function list() {
    const config = {
        title: "Proveedores",
        route: "suppliers",
        headers: ["Nombre", "Valoración"],
        visible: ["name"],
        CustomCells: [
            function(item){
                return (
                    <Rating
                        value={item["rating"]}
                        readOnly
                    />
                )
            }
        ]
    };

    return (
        <Grid container justifyContent={"center"}>
            <Grid item md={11}>
                <DataTable {...config} />
            </Grid>
        </Grid>
    );
}
