import {
    Grid,
    Divider,
    Typography,
    MenuItem,
    TextField,
    Button,
    //Table parts
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const dimensions = ["length", "width", "density"];

export function FurnitureForm() {
    const [categories, setCategories] = useState([]);
    const [woods, setWoods] = useState([]);
    const [varieties, setVarieties] = useState([]);
    const [measures, setMeasures] = useState([]);

    const [wood, setWood] = useState("");
    const [variety, setVariety] = useState("");

    const [amountMain, setAmountMain] = useState(0);
    const [amountVariety, setAmountVariety] = useState(0);

    const [furnitureVarieties, setFurnitureVarieties] = useState([]);

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
    }, []);

    useEffect(() => {
        if (!wood) return;
        axios
            .get(`http://localhost:8000/api/woods/${wood}/varieties`)
            .then((response) => setVarieties(response.data.data))
            .catch((error) => console.log(error));
    }, [wood]);

    const woodMeasures = useMemo(() => {
        const obj = {};
        dimensions.forEach((dimension) => (obj[dimension] = {}));

        if (!variety) {
            dimensions.forEach((dimension) => {
                obj[dimension]["max"] = 0;
                obj[dimension]["measures"] = [];
            });
            return obj;
        }

        const seletedVariety = varieties.find(({ id }) => id == variety);

        dimensions.forEach((dimension) => {
            obj[dimension]["max"] = seletedVariety[dimension]["value"];
            obj[dimension]["measures"] = measures.filter(
                ({ value }) =>
                    value <= seletedVariety[dimension]["measure_value"]
            );
        });

        return obj;
    }, [variety]);

    const varietySelected = useMemo(() => {
        return varieties.find((item) => item.id === variety);
    }, [variety]);

    const furnitureGeneral = useForm({
        defaultValues: {
            name: "",
            furniture_category_id: "",
        },
    });

    const furnitureVariety = useForm({
        defaultValues: {
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

    const furnitureVarietiesList = useMemo(() => {
        return furnitureVarieties.map((item) => {
            let name = "";

            item["dimensions"].forEach((dimension, index) => {
                const { abbreviation } = measures.find(
                    (e) => e.id == dimension["measure_id"]
                );
                name = name + `${dimension["value"]} ${abbreviation}`;
                if (index < 2) name = name + " ";
            });

            let varietyLocal = varieties.find(
                (e) => e.id == item["variety_id"]
            );
            
            return {
                name,
                amount: item["amount"],
                woodName: varietyLocal['wood_name']
            };
        });
    }, [furnitureVarieties]);

    const addFunitureWoodVareity = (data) => {
        const dataCopy = JSON.parse(JSON.stringify(data));

        const array = [];
        const newVariety = {};

        dimensions.forEach((dimension) => {
            const object = dataCopy[dimension];
            array.push(object);
        });

        newVariety["dimensions"] = array;
        newVariety["amount"] = amountVariety;
        newVariety["variety_id"] = variety;

        setFurnitureVarieties((prev) => {
            if (!prev.length) {
                return [newVariety];
            } else {
                return [...prev, newVariety];
            }
        });

        furnitureVariety.reset();
        setVariety("");
        setVarieties([]);
        setWood("");
        setAmountMain(0);
        setAmountVariety(0);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item container md={11} spacing={3}>
                <Grid item md={12}>
                    <Typography variant="h4">Datos Generales</Typography>
                    <Divider style={{ margin: "16px 0px 8px 0px" }} />
                </Grid>
                <Grid item md={6}>
                    <Controller
                        control={furnitureGeneral.control}
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
                        control={furnitureGeneral.control}
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
                        value={variety}
                        label="Variedad"
                    >
                        {varieties.map(({ id, full }, key) => (
                            <MenuItem key={key} value={id}>
                                {full}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item md={6}>
                    <TextField
                        fullWidth
                        label="Cantidad"
                        value={amountMain}
                        onChange={(e) =>
                            setAmountMain(parseFloat(e.target.value))
                        }
                    />
                </Grid>
            </Grid>
            <Grid item container md={11} spacing={3} marginTop={0}>
                <Grid item md={12}>
                    <Divider style={{ margin: "16px 0px 0px 0px" }} />
                </Grid>
                {dimensions.map((dimension, index) => (
                    <Grid
                        container
                        item
                        md={12}
                        key={index}
                        spacing={3}
                        marginTop={index == 0 ? 0 : ""}
                    >
                        <Grid item md={6}>
                            <Controller
                                control={furnitureVariety.control}
                                name={`${dimension}.value`}
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                    },
                                    validate: (v) => {
                                        if (!amountMain) return false;
                                        if (!amountVariety) return false;

                                        const check =
                                            furnitureVariety.getValues()[
                                                dimension
                                            ];

                                        let measureSelectedValue =
                                            measures.find(
                                                (item) =>
                                                    item.id ==
                                                    check["measure_id"]
                                            );

                                        if (!measureSelectedValue) return false;

                                        v = parseFloat(v);

                                        measureSelectedValue =
                                            measureSelectedValue["value"];

                                        let measureVarietyValue =
                                            varietySelected[dimension][
                                                "measure_value"
                                            ];

                                        let measureVarietyDimension =
                                            varietySelected[dimension]["value"];

                                        let decimal =
                                            measureVarietyValue /
                                            measureSelectedValue;

                                        let decimalBig = 1;

                                        if (decimal < 1) {
                                            decimalBig =
                                                Math.abs(measureSelectedValue);
                                        }

                                        let amountMainLocal = Math.abs(
                                            measureVarietyDimension * decimalBig
                                        );

                                        let amountVarietyLocal = Math.abs(
                                            v *
                                                (measureSelectedValue /
                                                    decimalBig)
                                        );

                                        if (dimension != "density") {
                                            amountVarietyLocal =
                                                amountVarietyLocal *
                                                amountVariety;

                                            amountMainLocal =
                                                amountMainLocal * amountMain;
                                        }

                                        return (
                                            amountVarietyLocal <=
                                            amountMainLocal
                                        );
                                    },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Cantidad"
                                        disabled={!variety}
                                        error={
                                            Boolean(error) && Boolean(variety)
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Controller
                                control={furnitureVariety.control}
                                name={`${dimension}.measure_id`}
                                rules={{ required: true }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        select
                                        label="Medida"
                                        disabled={!variety}
                                        error={Boolean(error) && variety}
                                    >
                                        {woodMeasures[dimension][
                                            "measures"
                                        ].map(({ id, name }, key) => (
                                            <MenuItem key={key} value={id}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                    </Grid>
                ))}
                <Grid item md={6}>
                    <TextField
                        fullWidth
                        label="Cantidad de partes"
                        disabled={!Boolean(amountMain)}
                        onChange={(e) =>
                            setAmountVariety(parseFloat(e.target.value))
                        }
                        value={amountVariety}
                    />
                </Grid>
                <Grid item container md={12} justifyContent="end">
                    <Button
                        variant="contained"
                        size="large"
                        onClick={furnitureVariety.handleSubmit(
                            addFunitureWoodVareity
                        )}
                    >
                        Añadir
                    </Button>
                </Grid>
            </Grid>
            <Grid item md={11}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Madera</TableCell>
                                <TableCell>Medidas</TableCell>
                                <TableCell>Cantidad</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!furnitureVarietiesList.length && (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Typography align="center">
                                            No se han registrado variedades para
                                            esta madera
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                            {furnitureVarietiesList.map((item, index)=> (
                                <TableRow key={index}>
                                    <TableCell>
                                        {item['woodName']}
                                    </TableCell>
                                    <TableCell>
                                        {item['name']}
                                    </TableCell>
                                    <TableCell>
                                        {item['amount']}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
