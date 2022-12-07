import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import moment from 'moment';
import * as React from 'react';

import { handleDateFormat } from '@/utils/commonHelperFunc';

interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
    sort: boolean;
}

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    headCells: [HeadCell];
}
function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort, headCells, rowCount } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    const Icon = () => {
        return (
            <span
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'Center',
                    alignItems: 'Center',
                    marginLeft: '5px',
                }}
            >
                {/*{order === 'asc' ? (*/}
                <KeyboardArrowUp fontSize="inherit" />
                {/*) : (*/}
                <KeyboardArrowDown fontSize="inherit" />
                {/*)}*/}
            </span>
        );
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        //align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={
                            headCell.sort ? (orderBy === headCell.id ? order : false) : false
                        }
                        style={{ pointerEvents: headCell.sort ? 'auto' : 'none' }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={
                                headCell.sort ? (orderBy === headCell.id ? order : 'asc') : order
                            }
                            onClick={headCell.sort ? createSortHandler(headCell.id) : null}
                            IconComponent={headCell.sort ? Icon : ''}
                        >
                            {headCell.label}
                            {/*{orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    <KeyboardArrowUp fontSize="inherit" />
                                    <KeyboardArrowDown fontSize="inherit" />
                                </Box>
                            ) : null}*/}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function CustomTable({
    tableData,
    headCells,
    dataFields,
    selectedUserAction,
    bodyCells,
    optionMenu,
    rowOptions,
}: any) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>(headCells[0].id);
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 15;
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const column = (columnData: any, index: number) => {
        switch (headCells[index]?.type) {
            case 'text':
                return columnData || '-';
            case 'date':
                return handleDateFormat(columnData) || '-';
            case 'dateTime':
                return moment(columnData).format('MM/DD/YYYY, HH:mm A') || '-';
            case 'boolean':
                return columnData ? 'Yes' : 'No';
            default:
                return columnData || '-';
        }
    };
    const timeDiff = (promisedTime: string, CreatedTime: string) => {
        const a = moment(promisedTime);
        const b = moment(CreatedTime);
        const diff_s = a.diff(b, 'minutes');
        return diff_s + ' min';
        //return moment.utc(moment.duration(diff_s, 'seconds').asMilliseconds()).format('hh:mm');
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer sx={{ minHeight: '40vh' }}>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={tableData.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {tableData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .sort(getComparator(order, orderBy))
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.id}
                                            onClick={() =>
                                                !rowOptions &&
                                                selectedUserAction({
                                                    action: 'edit',
                                                    data: row,
                                                })
                                            }
                                            style={{ cursor: rowOptions ? '' : 'pointer' }}
                                        >
                                            {dataFields.map((fieldName: any, index: number) => {
                                                return (
                                                    <TableCell
                                                        key={index}
                                                        sx={{
                                                            display:
                                                                dataFields.length == index + 1
                                                                    ? 'flex'
                                                                    : 'table-cell',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <span
                                                            className={
                                                                bodyCells &&
                                                                `${bodyCells[index]?.background} ${fieldName}-${row[fieldName]}`
                                                            }
                                                        >
                                                            {bodyCells && bodyCells[index]?.prefix}
                                                            {fieldName === 'order_promised_time'
                                                                ? timeDiff(
                                                                      row[fieldName],
                                                                      row['order_creation_date']
                                                                  )
                                                                : column(row[fieldName], index)}
                                                            {/*{bodyCells && bodyCells[index]?.postfix}*/}
                                                        </span>
                                                        {dataFields.length == index + 1 && (
                                                            <div
                                                                className="dropdown table"
                                                                style={{
                                                                    opacity: rowOptions ? 1 : 0,
                                                                    pointerEvents: rowOptions
                                                                        ? 'all'
                                                                        : 'none',
                                                                }}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="btn p-0"
                                                                    data-bs-toggle="dropdown"
                                                                >
                                                                    <i className="fas fa-ellipsis-v"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    {optionMenu?.map(
                                                                        (option, index) => (
                                                                            <button
                                                                                className="dropdown-item capitalize"
                                                                                key={index}
                                                                                onClick={() =>
                                                                                    selectedUserAction(
                                                                                        {
                                                                                            action: option,
                                                                                            data: row,
                                                                                        }
                                                                                    )
                                                                                }
                                                                            >
                                                                                {option}
                                                                            </button>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                            {/*<TableCell>
                                                {dataFields.length == index + 1 && (
                                                    <div
                                                        className="dropdown table"
                                                        style={{
                                                            opacity: rowOptions ? 1 : 0,
                                                            pointerEvents: rowOptions
                                                                ? 'all'
                                                                : 'none',
                                                        }}
                                                    >
                                                        <button
                                                            type="button"
                                                            className="btn p-0"
                                                            data-bs-toggle="dropdown"
                                                        >
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            {optionMenu.map((option, index) => (
                                                                <button
                                                                    className="dropdown-item capitalize"
                                                                    key={index}
                                                                    onClick={() =>
                                                                        selectedUserAction({
                                                                            action: option,
                                                                            data: row,
                                                                        })
                                                                    }
                                                                >
                                                                    {option}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </TableCell>*/}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Paper>
        </Box>
    );
}
