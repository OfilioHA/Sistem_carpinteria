import {
    Table,
    TableBody,
    TableHead,
    TableContainer,
    TableCell,
    TableRow,
    Divider,
    Typography,
    Button,
    IconButton,
    Stack,
    Modal,
    Box,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "./../../libs/httpPetitions";
import { useRecoilState } from "recoil";
import { userState } from "../../stores/user";
import axios from "axios";

//TODO:: Atomizar este componente, es demasiado grande.
export default function DataTable(props) {
    const { title, headers, visible, route } = props;

    const [user] = useRecoilState(userState);

    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectId] = useState(null);

    useEffect(async () => {
        const { data } = await getData(route);
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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((item, key) => (
                                <TableCell key={key}>{item}</TableCell>
                            ))}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((item, keyItem) => (
                            <TableRow key={keyItem}>
                                {visible.map((prop, key) => (
                                    <TableCell key={key}>
                                        {item[prop]}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Stack direction="row" spacing={2}>
                                        {user.role_id <= 2 && (
                                            <>
                                                <IconButton
                                                    disabled={
                                                        item["id"] ===
                                                            user.id &&
                                                        route == "users"
                                                    }
                                                    color="error"
                                                    onClick={() =>
                                                        handleOpen(item["id"])
                                                    }
                                                >
                                                    <Delete />
                                                </IconButton>
                                                <Link
                                                    to={`/${route}/edit/${item["id"]}`}
                                                >
                                                    <IconButton>
                                                        <Edit />
                                                    </IconButton>
                                                </Link>
                                            </>
                                        )}
                                        <Link to={`/${route}/${item["id"]}`}>
                                            <IconButton color="primary">
                                                <Visibility />
                                            </IconButton>
                                        </Link>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
