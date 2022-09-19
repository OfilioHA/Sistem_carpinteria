import Layout from "../../layouts/Layout";
import { Grid } from "@mui/material";
import DataTable from "../../components/utils/dataTable";

export default function list() {
    const config = {
        title: "Usuarios",
        route: "users",
        headers: ["Nombre", "Rol"],
        visible: ["name", "role_name"],
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
