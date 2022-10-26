import {
    Grid,
    Typography,
    Divider,
    Button,
    Stack,
    TextField,
    MenuItem
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { WorkersContractForm } from "./contract";

export function WorkersForm() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            person: {
                firstname: "",
                lastname: "",
            },
            gender_id: "",
            city_id: "",
            code: "",
            identification: "",
            birthday: "",
            email: "",
            direction: "",
        },
    });

    const [genders, setGenders] = useState([]);
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/catalog/genders")
            .then((response) => {
                const { data } = response;
                setGenders(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const sendData = (data) => {
        data['contracts'] = contracts;
        console.log(data);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item container md={10}>
                <form onSubmit={handleSubmit(sendData)}>
                    <Typography variant="h4">Datos Generales</Typography>
                    <Divider style={{ margin: "16px 0px 24px 0px" }} />
                    <div style={{ display: "flex" }}>
                        <Grid item container spacing={3}>
                            <Grid item md={6}>
                                <Controller
                                    control={control}
                                    name="person.firstname"
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Nombres"
                                            error={Boolean(error)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    control={control}
                                    name="person.lastname"
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Apellidos"
                                            error={Boolean(error)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    control={control}
                                    name="identification"
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Cédula"
                                            error={Boolean(error)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    control={control}
                                    name="code"
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="INSS"
                                            error={Boolean(error)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    control={control}
                                    name="birthday"
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Fecha de Nacimiento"
                                            error={Boolean(error)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    control={control}
                                    name="gender_id"
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            select
                                            label="Genero"
                                            error={Boolean(error)}
                                        >
                                            {genders.map(
                                                ({ id, name }, key) => (
                                                    <MenuItem
                                                        key={key}
                                                        value={id}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    control={control}
                                    name="direction"
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Direción"
                                            error={Boolean(error)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    control={control}
                                    name="email"
                                    rules={{ required: true }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Email"
                                            error={Boolean(error)}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <WorkersContractForm
                        contracts={contracts}
                        handleContracts={setContracts}
                    />
                    <Grid item md={12}>
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
                </form>
            </Grid>
        </Grid>
    );
}
