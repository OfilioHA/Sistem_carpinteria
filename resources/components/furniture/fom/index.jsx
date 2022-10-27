import {
    Grid, Divider, Typography
} from "@mui/material";

export function FurnitureForm() {
    return (
        <Grid container justifyContent="center">
            <Grid item md={10}>
                <Typography variant="h4">Datos Generales</Typography>
                <Divider style={{ margin: "16px 0px 16px 0px" }} />
                <div></div>
            </Grid>
        </Grid>
    );
}
