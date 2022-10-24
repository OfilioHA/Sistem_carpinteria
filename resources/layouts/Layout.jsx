import * as React from "react";
import Header from "../components/utils/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function layout() {
    return (
        <>
            <Header />
            <main style={{margin: "32px 64px"}}> 
                <Box sx={{flexGrow: 1}}>
                    <Outlet />
                </Box>
            </main>
            <footer>
            </footer>
        </>
    );
}
