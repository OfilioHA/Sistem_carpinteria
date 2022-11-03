import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
} from "@mui/material";
import { useMemo } from "react";

export function WoodVarietiesTable({ varieties, woodMeasures }) {
    const varietiesCopy = JSON.parse(JSON.stringify(varieties));

    const rows = useMemo(() => {
        return varietiesCopy.map((items) => {
            return items["dimensions"].map((subItem, key) => {
                subItem.forEach((e)=> {
                    let measureAbb = woodMeasures
                        .filter(measure => measure.id == e.measure_id)
                        .pop()['abbreviation'];
                    e['value'] = `${e['value']} ${measureAbb}`
                });
                if (!key) subItem.unshift(items["wood_type_cut_name"]);
                return subItem;
            });
        });
    });

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tipo de Corte</TableCell>
                        <TableCell>Ancho</TableCell>
                        <TableCell>Logintud</TableCell>
                        <TableCell>Espesor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!rows.length && (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Typography align="center">
                                    No se han registrado variedades para esta
                                    madera
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                    {rows.map((item) => {
                        return item.map((subItem, subKey) => {
                            return (
                                <TableRow key={subKey}>
                                    {subItem.map((element, ekey) => {
                                        if (typeof element == "string") {
                                            return (
                                                <TableCell
                                                    key={ekey}
                                                    rowSpan={item.length}
                                                >
                                                    {element}
                                                </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell key={ekey}>
                                                    {element["value"]}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            );
                        });
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
