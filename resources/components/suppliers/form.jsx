import {
    Grid,
    TextField,
    Typography,
    Divider,
    Button,
    Rating,
    MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function SuppliersForm() {
    const [states, setStates] = useState([]);
    const [state,  setState ] = useState(null);
    const [cities, setCities] = useState([]);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            direction: "",
            state_id: "",
            city_id: "",
            phone: "",
            email: "",
            description: "",
            rating: 1,
        },
    });

    const { id } = useParams();
    const history = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/catalog/states")
            .then((response) => {
                const { data } = response;
                setStates(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (!state) return;
        axios
            .get(`http://localhost:8000/api/catalog/states/${state}/cities`)
            .then((response) => {
                const { data } = response;
                setCities(data.data);
            })
            .catch((error) => console.log(error));
    }, [state]);

    const sendData = (data) => {
        delete data["state_id"];
        const petition = !id
            ? axios.post("http://localhost:8000/api/suppliers", data)
            : axios.put(`http://localhost:8000/api/suppliers/${id}`, data);

        petition
            .then(() => history("/suppliers"))
            .catch((error) => console.log(error));
    };

    return (
        <Grid container justifyContent="center">
            <Grid item md={10}>
                <Typography variant="h4">Datos del proveedor</Typography>
                <Divider style={{ margin: "16px 0px 16px 0px" }} />
                <div>
                    <form onSubmit={handleSubmit(sendData)}>
                        <Grid container spacing={3}>
                            <Grid item md={6}>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Nombre"
                                            error={Boolean(error)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    name="direction"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Dirección"
                                            error={Boolean(error)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    name="state_id"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            onChange={({
                                                target: { value },
                                            }) => {
                                                setState(value);
                                                return onChange(value);
                                            }}
                                            value={value}
                                            fullWidth
                                            select
                                            label="Departamento"
                                            error={Boolean(error)}
                                        >
                                            {states.map(({ id, name }, key) => (
                                                <MenuItem key={key} value={id}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    name="city_id"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            select
                                            disabled={!cities.length}
                                            label="Ciudad"
                                            error={Boolean(error)}
                                        >
                                            {cities.map(({ id, name }, key) => (
                                                <MenuItem key={key} value={id}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    name="phone"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Teléfono"
                                            error={Boolean(error)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
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
                            <Grid item md={12}>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Descripción"
                                            error={Boolean(error)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "end",
                                    }}
                                >
                                    <Controller
                                        name="rating"
                                        control={control}
                                        render={({
                                            field: { value, onChange },
                                        }) => (
                                            <Rating
                                                value={value}
                                                size="large"
                                                onChange={(_e, newValue) =>
                                                    onChange(newValue)
                                                }
                                            />
                                        )}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={12}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "end",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                    >
                                        Guardar
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
