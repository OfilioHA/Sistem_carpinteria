import {
    Divider,
    Typography,
    Button,
    Stack,
    Modal,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "../../../libs/httpPetitions";
import { MainTable } from "./index";
import { LinkButtons } from "./LinkButtons";
import { EmptyMessage } from "./EmptyMessage";
import axios from "axios";

export default function DataTable(props) {
    const { title, headers, visible, route, size, CustomCells } = props;

    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectId] = useState(null);

    useEffect(async () => {
        const { data } = await getData(route);
        setLoading((prev) => !prev);
        setRows(data);
    }, []);

    const handleOpen = (id) => {
        setOpen(true);
        setSelectId(id);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectId(null);
    };

    const deleteConfirm = () => {
        axios
            .delete(`/api/${route}/${selectedId}`)
            .then(() => {
                const filtered = rows.filter((item) => item.id !== selectedId);
                setRows([...filtered]);
                handleClose();
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Typography variant="h4">{title}</Typography>
            <Stack direction="row" style={{ marginTop: "16px" }}>
                <Link to={`/${route}/create`}>
                    <Button variant="contained">Añadir</Button>
                </Link>
            </Stack>
            <Divider style={{ margin: "24px 0px" }} />
            <MainTable 
                ActionButtons={LinkButtons}
                ActionButtonsConfig={{route}}
                rows={rows}
                headers={headers}
                visible={visible}
                EmptyMessage={
                    <EmptyMessage 
                        loading={loading}
                        colSpan={headers.length + 1} 
                        rowsAmount={rows.length}
                    />
                } 
                CustomCells={CustomCells}
            />

            {/* Delete modal */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        borderRadius: "8px",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        ¿Esta seguro de querer borrar este registro?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Los demas elemenos que lo utilcen tambien seran
                        borrados.
                    </Typography>
                    <Stack
                        direction="row"
                        style={{ marginTop: "32px" }}
                        justifyContent="space-between"
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={deleteConfirm}>
                            Confirmar
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}
