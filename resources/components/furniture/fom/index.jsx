import {
    Grid,
    Divider,
    Typography,
    MenuItem,
    TextField,
    Button,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export function FurnitureForm() {
    const [categories, setCategories] = useState([]);
    const [woods, setWoods] = useState([]);
    const [varieties, setVarieties] = useState([]);
    const [wood, setWood] = useState("");
    const [variety, setVariety] = useState();
    const [measures, setMeasures] = useState([]);
    const [cutTypes, setCutTypes] = useState([]);

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

        axios
            .get("http://localhost:8000/api/catalog/woods/measures")
            .then((response) => {
                const { data } = response;
                setMeasures(data.data);
            })
            .catch((error) => console.log(error));

        axios
            .get("http://localhost:8000/api/catalog/woods/typecuts")
            .then((response) => {
                const { data } = response;
                setCutTypes(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (!wood) return;
        axios
            .get(`http://localhost:8000/api/woods/${wood}/varieties`)
            .then((response) => setVarieties(response.data.data))
            .catch((error) => console.log(error));
    }, [wood]);

    const woodMeasures = useMemo(() => {
        if(!variety) return [];
        const obj = {}
        const dimensions = ['length', 'width', 'density'];
        const seletedVariety = varieties.filter(({id})=> id == variety).pop();
        
        dimensions.forEach((dimension)=> {
            obj[dimension] = {};
            obj[dimension]['max'] = seletedVariety[dimension]['value'];
            console.log(measures);
            obj[dimension]['measures'] = measures
                .filter(({ value }) => 
                    value <= seletedVariety[dimension]['measure_value']
                );
        });        
        
        return obj;
    }, [variety]);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            furniture_category_id: "",
        },
    });

    return (
        <Grid container justifyContent="center">
            <Grid item container md={11} spacing={3}>
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
            <Grid item container md={11} spacing={3} marginTop={0}>
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
                        disabled={!varieties.length}
                        onChange={(e) => setVariety(e.target.value)}
                        label="Variedad"
                        defaultValue={""}
                    >
                        {varieties.map(({ id, full }, key) => (
                            <MenuItem key={key} value={id}>
                                {full}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item md={6}>
                    <TextField fullWidth label="Cantidad" />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        fullWidth
                        select
                        label="Tipo de Corte"
                        defaultValue={""}
                    >
                        {cutTypes.map(({ id, name }, key) => (
                            <MenuItem key={key} value={id}>
                                {name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Grid item container md={11} spacing={3} marginTop={0}>
                <Grid item md={12}>
                    <Divider style={{ margin: "16px 0px 0px 0px" }} />
                </Grid>
                <Grid item md={6}>
                    <Controller
                        name="width.value"
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            },
                            validate: (v) => parseFloat(v) > 0,
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                fullWidth
                                margin="normal"
                                label="Ancho"
                                error={Boolean(error)}
                            />
                        )}
                    />
                    <Controller
                        name="length.value"
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            },
                            validate: (v) => parseFloat(v) > 0,
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                fullWidth
                                margin="normal"
                                label="Longitud"
                                error={Boolean(error)}
                            />
                        )}
                    />
                    <Controller
                        name="density.value"
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            },
                            validate: (v) => parseFloat(v) > 0,
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                fullWidth
                                margin="normal"
                                label="Espesor"
                                error={Boolean(error)}
                            />
                        )}
                    />
                </Grid>
                <Grid item md={6}>
                    <Controller
                        name="width.measure_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                margin="normal"
                                label="Tipo de medida"
                                error={Boolean(error)}
                            >
                                {woodMeasures.map(({ id, name }, key) => (
                                    <MenuItem key={key} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        name="length.measure_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                margin="normal"
                                label="Tipo de medida"
                                error={Boolean(error)}
                            >
                                {woodMeasures.map(({ id, name }, key) => (
                                    <MenuItem key={key} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        name="density.measure_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                margin="normal"
                                label="Tipo de medida"
                                error={Boolean(error)}
                            >
                                {woodMeasures.map(({ id, name }, key) => (
                                    <MenuItem key={key} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item md={12}>
                    <Button variant="contained" size="large">
                        Añadir
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
