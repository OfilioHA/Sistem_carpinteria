import {
    Grid,
    Stack,
    Button,
    TextField,
    Divider,
    Typography,
    MenuItem,
    ListSubheader,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { WorkerContractsTable } from "./table";

export function WorkersContractForm({ contracts, handleContracts }) {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            code: "",
            start_at: "",
            end_at: "",
            salary: 0,
            job_id: "",
        },
    });

    const [contractType, setContractType] = useState("Definido");
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/catalog/jobs")
            .then((response) => {
                const { data } = response;
                setJobList(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const contractTypes = ["Definido", "Nomina General"];
    const enableDateEnd = contractType == "Definido";

    const handleAddContract = (data) => {
        data["job_name"] = jobList.filter((e) => e.id == data.job_id).pop()[
            "name"
        ];

        handleContracts((prev) => [...prev, data]);
        reset();
    };

    return (
        <Grid item container spacing={3}>
            <Grid item md={12}>
                <Typography variant="h4" style={{ marginTop: "32px" }}>
                    Datos del Contrato
                </Typography>
                <Divider style={{ margin: "16px 0px 0px 0px" }} />
            </Grid>
            <Grid item md={6}>
                <Controller
                    control={control}
                    name="code"
                    rules={{ required: false }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Código de Contrato"
                        />
                    )}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    fullWidth
                    select
                    label="Tipo de contrato"
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value)}
                >
                    {contractTypes.map((e, index) => (
                        <MenuItem key={index} value={e}>
                            {e}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item md={6}>
                <Controller
                    control={control}
                    name="start_at"
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            fullWidth
                            type="date"
                            label="Fecha de inicio"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!error}
                        />
                    )}
                />
            </Grid>
            <Grid item md={6}>
                <Controller
                    control={control}
                    name="end_at"
                    rules={{
                        required: enableDateEnd,
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            fullWidth
                            type="date"
                            label="Fecha de Finalización"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={!enableDateEnd}
                            error={Boolean(error) && enableDateEnd}
                        />
                    )}
                />
            </Grid>
            <Grid item md={6}>
                <Controller
                    control={control}
                    name="salary"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField {...field} fullWidth label="Salario" />
                    )}
                />
            </Grid>
            <Grid item md={6}>
                <Controller
                    control={control}
                    name="job_id"
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            fullWidth
                            select
                            error={Boolean(error)}
                            label="Puesto de trabajo"
                        >
                            {jobList.map(({ name, jobs }, key) => (
                                <div>
                                    <ListSubheader key={key}>
                                        {name}
                                    </ListSubheader>
                                    {jobs.map((item, subKey) => (
                                        <MenuItem
                                            key={subKey}
                                            value={item["id"]}
                                        >
                                            {item["name"]}
                                        </MenuItem>
                                    ))}
                                </div>
                            ))}
                        </TextField>
                    )}
                />
            </Grid>
            <Grid item md={12}>
                <Stack direction="row" justifyContent="end">
                    <Button
                        variant="contained"
                        onClick={handleSubmit(handleAddContract)}
                    >
                        Añadir
                    </Button>
                </Stack>
            </Grid>
            <Grid item md={12}>
                <WorkerContractsTable contracts={contracts} />
            </Grid>
        </Grid>
    );
}
