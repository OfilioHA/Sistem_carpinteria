import * as React from "react";
import Header from "../components/utils/Header";
import { Box } from "@mui/material";

export default function layout({ children }) {
    return (
        <>
            <Header />
            <main style={{margin: "32px 0px"}}> 
                <Box sx={{flexGrow: 1}}>
                    {children}
                </Box>
            </main>
            <footer></footer>
        </>
    );
}
