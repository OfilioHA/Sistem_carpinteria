import Layout from "../../layouts/Layout";
import { Grid } from "@mui/material";
import DataTable from "../../components/utils/dataTable";

export default function list() {
    const config = {
        title: "Maderas",
        route: "woods",
        headers: ["Nombre", 'Variedades'],
        visible: ["name", 'varieties_count'],
    };

    return (
        <Layout>
            <Grid container justifyContent={"center"}>
                <Grid item md={9}>
                    <DataTable {...config} />
                </Grid>
            </Grid>
        </Layout>
    );
}
