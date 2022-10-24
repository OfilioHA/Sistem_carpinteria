import {
    Table,
    TableBody,
    TableHead,
    TableFooter,
    TableContainer,
    TableCell,
    TableRow,
    TablePagination,
    Stack,
} from "@mui/material";
import { useState, useMemo } from "react";

export function MainTable(props) {
    //Components props
    const {
        headers,
        visible,
        size,
        rows,
        ActionButtons,
        ActionButtonsConfig,
        EmptyMessage,
    } = props;

    let { CustomCells } = props;
    CustomCells = (CustomCells == undefined) ? [] : CustomCells;

    //Default values
    const defaultSize = size ? size : 5;
    const paginationColSpan = ActionButtons
        ? headers.length + 1
        : headers.length;

    //States
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(defaultSize);

    //Filter data by page
    const currentTableData = useMemo(() => {
        const firstPageIndex = currentPage * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return rows.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, rows, pageSize]);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((item, key) => (
                            <TableCell key={key}>{item}</TableCell>
                        ))}
                        {ActionButtons && (
                            <TableCell style={{ textAlign: "center" }}>
                                Acciones
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentTableData.map((item, keyItem) => (
                        <TableRow key={keyItem}>
                            {visible.map((prop, key) => (
                                <TableCell key={key}>{item[prop]}</TableCell>
                            ))}
                            {CustomCells.map((render, key) => (
                                <TableCell key={key}>
                                    {render(item)}
                                </TableCell>
                            ))}
                            {ActionButtons && (
                                <TableCell style={{ width: "175px" }}>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        justifyContent="center"
                                    >
                                        <ActionButtons
                                            id={item["id"]}
                                            {...ActionButtonsConfig}
                                        />
                                    </Stack>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                    {EmptyMessage}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            colSpan={paginationColSpan}
                            count={rows.length}
                            rowsPerPage={pageSize}
                            page={currentPage}
                            onPageChange={(_e, newPage) =>
                                setCurrentPage(newPage)
                            }
                            onRowsPerPageChange={(_e) => {
                                setPageSize(parseInt(_e.target.value, 10));
                                setCurrentPage(0);
                            }}
                            labelRowsPerPage="Filas por páginas"
                            labelDisplayedRows={function ({ from, to, count }) {
                                return `${from}–${to} de ${
                                    count !== -1 ? count : `Más de ${to}`
                                }`;
                            }}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
