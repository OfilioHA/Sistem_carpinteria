import { Grid, Divider, Typography, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export function FurnitureForm() {
    const [categories, setCategories] = useState([]);
    const [woods, setWoods] = useState([]);
    const [varieties, setVarieties] = useState([]);
    const [wood, setWood] = useState('');

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/catalog/furnitures/categories")
            .then((response) => {
                const { data } = response;
                setCategories(data.data);
            })
            .catch((error) => console.log(error));

        axios
            .get("http://localhost:8000/api/woods")
            .then((response) => {
                const { data } = response;
                setWoods(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(()=> {
        if(!wood) return;
        axios
            .get(`http://localhost:8000/api/woods/${wood}/varieties`)
            .then((response) => setVarieties(response.data.data))
            .catch((error) => console.log(error));
    }, [wood]);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            furniture_category_id: "",
        },
    });

    return (
        <Grid container justifyContent="center">
            <Grid item container md={11} spacing={2}>
                <Grid item md={12}>
                    <Typography variant="h4">Datos Generales</Typography>
                    <Divider style={{ margin: "16px 0px 8px 0px" }} />
                </Grid>
                <Grid item md={6}>
                    <Controller
                        control={control}
                        name="name"
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
                        name="furniture_category_id"
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                fullWidth
                                select
                                label="Categoria"
                                error={Boolean(error)}
                            >
                                {categories.map(({ id, name }, key) => (
                                    <MenuItem key={key} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>
            </Grid>
            <Grid
                item
                container
                md={11}
                spacing={2}
                style={{ marginTop: "0px" }}
            >
                <Grid item md={12}>
                    <Typography variant="h4">Datos Generales</Typography>
                    <Divider style={{ margin: "16px 0px 8px 0px" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        fullWidth
                        select
                        label="Madera"
                        onChange={(e) => setWood(e.target.value)}
                        value={wood}
                    >
                        {woods.map(({ id, name }, key) => (
                            <MenuItem key={key} value={id}>
                                {name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item md={6}>
                    <TextField
                        fullWidth
                        select
                        label="Variedad"
                    >
                        {varieties.map(({ id, full }, key) => (
                            <MenuItem key={key} value={id}>
                                {full}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
        </Grid>
    );
}
