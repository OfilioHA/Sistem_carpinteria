import {
    Grid,
    TextField,
    Button,
    MenuItem,
    Typography,
    Divider,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { WoodVarietiesTable } from "./table";

export function VaritiesForm({ varieties, handleVarities }) {
    const [woodCutTypes, setWoodCutTypes] = useState([]);
    const [woodMeasures, setWoodMeasures] = useState([]);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            wood_type_cut_id: "",
            length: {
                value: 0,
                measure_id: "",
            },
            width: {
                value: 0,
                measure_id: "",
            },
            density: {
                value: 0,
                measure_id: "",
            },
        },
    });

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/catalog/woods/typecuts")
            .then((response) => {
                const { data } = response;
                setWoodCutTypes(data.data);
            })
            .catch((error) => console.log(error));

        axios
            .get("http://localhost:8000/api/catalog/woods/measures")
            .then((response) => {
                const { data } = response;
                setWoodMeasures(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleAddVariety = (data) => {
        const wood_cut_type = woodCutTypes
            .filter((e) => data.wood_type_cut_id == e.id)
            .pop();

        const dimensions = ['width', 'length', 'density'];

        data['dimensions'] = [];

        dimensions.forEach((dimension, key) => {
            dimension = { ...data[dimension] };
            dimension['dimension_id'] = key + 1;
            data['dimensions'].push(dimension);
        })

        dimensions.forEach((dimension) => delete data[dimension]);
    
        handleVarities((previus)=> {    
            const existsType = previus
                .filter((e) => e.wood_type_cut_id == wood_cut_type.id);

            if(existsType.length){
                return previus.map((e)=> {
                    if(e.wood_type_cut_id == wood_cut_type.id){
                        return {
                            ...e,
                            ['dimensions']: [...e['dimensions'], data['dimensions']]
                        }
                    }else{
                        return { ...e }
                    }
                })
            }else{
                data['wood_type_cut_name'] = wood_cut_type.name;
                data['dimensions'] = [data['dimensions']]; 
                return [...previus, data];
            }
        })
        reset();
    };

    return (
        <>
            <Typography variant="h4" style={{ marginTop: "18px" }}>
                Variedades de la madera
            </Typography>
            <Divider style={{ margin: "8px 0px 16px 0px" }} />
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Controller
                        name="wood_type_cut_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                margin="normal"
                                label="Tipo de corte"
                                error={!!error}
                            >
                                {woodCutTypes.map(({ id, name }, key) => (
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
                                error={!!error}
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
                                error={!!error}
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
                                error={!!error}
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
                                error={!!error}
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
                                error={!!error}
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
                                error={!!error}
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
                    <Button
                        onClick={handleSubmit(handleAddVariety)}
                        variant="contained"
                        size="large"
                    >
                        Añadir
                    </Button>
                </Grid>
                <Grid item md={12}>
                    <WoodVarietiesTable 
                        varieties={varieties}    
                        woodMeasures={woodMeasures}
                    />
                </Grid>
            </Grid>
        </>
    );
}
