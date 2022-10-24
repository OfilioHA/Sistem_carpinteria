import {
    Grid,
    Typography,
    Divider,
    TextField,
    Button,
    MenuItem,
    Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { VaritiesForm } from "./varieties";
import axios from "axios";

export default function List() {
    const history = useNavigate();
    const { id } = useParams();
   
    const [species, setSpecies] = useState([]);

    const [varieties, setVarieties] = useState([]);
 
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            wood_species_id: "",
        },
    });

    useEffect(() => {
        if (id === undefined) return;
        axios
            .get(`http://localhost:8000/api/woods/${id}`)
            .then(({ data }) => setWood(data.data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/catalog/woods/species")
            .then((response) => {
                const { data } = response;
                setSpecies(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const sendData = async (data) => {
        const varietiesCopy = varieties.map((e)=> {
            return {
                'wood_type_cut_id': e.wood_type_cut_id,
                'dimensions': e.dimensions
            }
        })

        data['varieties'] = varietiesCopy;

        const petition = !id
            ? axios.post("http://localhost:8000/api/woods", data)
            : axios.put(`http://localhost:8000/api/woods/${id}`, data);

        petition
            .then(() => history("/woods"))
            .catch((error) => console.log(error));
    };

    return (
        <Grid container justifyContent="center">
            <Grid item md={10}>
                <Typography variant="h4">Datos Generales</Typography>
                <Divider style={{ margin: "8px 0px 16px 0px" }} />
                <form onSubmit={handleSubmit(sendData)}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item md={6}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        margin={"normal"}
                                        label="Nombre"
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Controller
                                name="wood_species_id"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        margin="normal"
                                        label="Especie"
                                        error={!!error}
                                    >
                                        {species.map(({ id, name }, key) => (
                                            <MenuItem key={key} value={id}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <VaritiesForm 
                        varieties={varieties}
                        handleVarities={setVarieties}
                    />
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
                </form>
            </Grid>
        </Grid>
    );
}
