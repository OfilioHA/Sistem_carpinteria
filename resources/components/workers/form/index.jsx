import {
    Grid,
    Typography,
    Divider,
    Button,
    Stack,
    TextField,
    MenuItem,
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
            code: "",
            identification: "",
            city_id: "",
            birthday: "",
            email: "",
            direction: ""
        },
    });

    const [contracts, setContracts] = useState([]); 

    const sendData = (data) => {
        console.log(data);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item container md={10}>
                <form onSubmit={handleSubmit(sendData)}>
                    <Typography variant="h4">Datos Generales</Typography>
                    <Divider style={{ margin: "16px 0px 24px 0px" }} />
                    <Grid item container spacing={3}>
                        <Grid item md={6}>
                            <Controller
                                control={control}
                                name="person.firstname"
                                rules={{ required: true }}
                                render={({ field, fieldState: { error } }) => (
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
                                render={({ field, fieldState: { error } }) => (
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
                                render={({ field, fieldState: { error } }) => (
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
                                render={({ field, fieldState: { error } }) => (
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
                                name="direction"
                                rules={{ required: true }}
                                render={({ field, fieldState: { error } }) => (
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
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Email"
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
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Fecha de Nacimiento"
                                        error={Boolean(error)}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
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
