import {
    Grid,
    Typography,
    Divider,
    TextField,
    Button,
    IconButton,
    MenuItem,
    Table,
    TableBody,
    TableHead,
    TableContainer,
    TableCell,
    TableRow,
    Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layouts/Layout";
import { useNavigate } from "react-router-dom";

export default function List() {
    const history = useNavigate();
    const [wood, setWood] = useState({
        name: "",
        species: null,
        varieties: [],
    });

    const [variety, setVariety] = useState({
        height: 0,
        width: 0,
    });

    const [species, setSpecies] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/catalog/woods/species")
            .then((response) => {
                const { data } = response;
                setSpecies(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleChange = (event) => {
        const {
            target: { name, value },
        } = event;
        setWood({ ...wood, [name]: value });
    };

    const handleChangeVariety = (event) => {
        const {
            target: { name, value },
        } = event;
        setVariety({ ...variety, [name]: value });
    };

    const addVariety = () => {
        setWood({
            ...wood,
            varieties: [...wood.varieties, variety],
        });
        setVariety({
            height: 0,
            width: 0,
        });
    };

    const sendData = async (event) => {
        event.preventDefault();
        if (!wood.name) return;
        if (!wood.species) return;
        if (!wood.varieties.length) return;
        axios
            .post("http://localhost:8000/api/woods", wood)
            .then((response) => {
                console.log(response);
                history('/woods');
            })
            .catch((error) => console.log(error));
    };

    return (
        <Layout>
            <Grid container justifyContent={"center"}>
                <Grid item md={11}>
                    <form onSubmit={sendData}>
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item md={7}>
                                <Typography variant="h4">Maderas</Typography>
                                <Divider style={{ margin: "24px 0px" }} />
                                <TextField
                                    fullWidth
                                    margin={"normal"}
                                    label="Nombre"
                                    name="name"
                                    style={{ marginTop: "0px" }}
                                    onChange={handleChange}
                                />
                                <TextField
                                    select
                                    fullWidth
                                    name="species"
                                    margin="normal"
                                    label="Especie"
                                    value={wood.species || ""} // (undefined || '') = ''
                                    onChange={handleChange}
                                >
                                    {species.map(({ id, name }, key) => (
                                        <MenuItem key={key} value={id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Grid
                                    container
                                    spacing={2}
                                    justifyContent="space-between"
                                >
                                    <Grid item md={4}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            label="Alto"
                                            name="height"
                                            value={variety.height}
                                            onChange={handleChangeVariety}
                                            inputProps={{
                                                inputMode: "numeric",
                                                pattern: "[0-9]*",
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            margin="none"
                                            label="Ancho"
                                            name="width"
                                            value={variety.width}
                                            onChange={handleChangeVariety}
                                            inputProps={{
                                                inputMode: "numeric",
                                                pattern: "[0-9]*",
                                            }}
                                        />
                                        <Stack style={{ marginTop: "8px" }}>
                                            <Button
                                                variant="outlined"
                                                margin={"normal"}
                                                size="medium"
                                                onClick={addVariety}
                                                disabled={
                                                    !variety.height ||
                                                    !variety.width
                                                }
                                            >
                                                Agregar
                                            </Button>
                                        </Stack>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            Altura
                                                        </TableCell>
                                                        <TableCell>
                                                            Anchura
                                                        </TableCell>
                                                        <TableCell>
                                                            Acciones
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {wood.varieties.map(
                                                        (
                                                            { height, width },
                                                            key
                                                        ) => {
                                                            return (
                                                                <TableRow
                                                                    key={key}
                                                                >
                                                                    <TableCell>
                                                                        {height}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {width}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <IconButton
                                                                            aria-label="delete"
                                                                            color="error"
                                                                        >
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                                <Stack
                                    style={{ marginTop: "32px" }}
                                    justifyContent="end"
                                    direction="row"
                                >
                                    <Button
                                        variant="contained"
                                        margin="normal"
                                        size="large"
                                        type="submit"
                                    >
                                        Guardar
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Layout>
    );
}