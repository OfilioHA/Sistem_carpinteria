import {
    Grid,
    Typography,
    Divider,
    TextField,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    Select,
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
import { useState } from "react";

export default function List() {
    const [wood, setWood] = useState({
        varieties: [
            {
                height: 9,
                width: 12,
            },
        ],
    });

    return (
        <Grid container justifyContent={"center"}>
            <Grid item md={11}>
                <form>
                    <Typography variant="h4">Maderas</Typography>
                    <Divider style={{ margin: "24px 0px" }} />
                    <Grid container spacing={3}>
                        <Grid item md={6}>
                            <TextField
                                fullWidth
                                margin={"normal"}
                                label="Nombre"
                                //onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Age
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <Grid container spacing={2}>
                                <Grid item md={4}>
                                    <TextField
                                        fullWidth
                                        margin={"normal"}
                                        label="Alto"
                                        type="number"
                                        inputProps={{ inputMode: "numeric" }}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <TextField
                                        fullWidth
                                        margin={"normal"}
                                        label="Ancho"
                                        type="number"
                                        inputProps={{ inputMode: "numeric" }}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <Stack
                                        style={{
                                            height: "100%"
                                        }}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Button
                                            variant="outlined"
                                            margin={"normal"}
                                            size="medium"
                                        >
                                            Agregar
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={6}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Altura</TableCell>
                                            <TableCell>Anchura</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {wood.varieties.map(
                                            ({ height, width }, key) => {
                                                return (
                                                    <TableRow key={key}>
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
                </form>
                <Stack
                    style={{ marginTop: "32px" }}
                    justifyContent="end"
                    direction="row"
                >
                    <Button variant="contained" margin="normal" size="large">
                        Guardar
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
}
