import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import { useTheme, withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StoreIcon from "@material-ui/icons/Store";
import PropTypes from "prop-types";
import DetalleProducto from "./components/detalle-producto";
import { saveProducts } from "../../lib/store";
import { Close } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip";
import { TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import useSWR from "swr";
import { CategoryFilterCombo } from "../../lib/combos";
import { fetchProducts } from "../../lib/store";
import Moment from "moment";
Moment.locale("es-MX");

// Page definitions
const pageTitle = "Store";

// TableCell with personalized style
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

// Pagination Options
const rowsPerPageOptions = [10, 25, 50, { label: "Todos", value: -1 }];
const labelRowsPerPage = "Registros por página:";
const colSpan = 7;

// Style for Pagination Actions
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

// Table Pagination Actions
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="Primera página"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Anterior"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Siguiente"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Última página"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

// Pagination Actions Prop Validation
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// Combos definition
const categoryFilterCombo = CategoryFilterCombo;

// Filters
const filterProducts = (products, search, category) => {
  let result = products.filter(
    (i) =>
      i.NameProduct.toLowerCase().includes(search) &&
      i.Category.includes(category === "0" ? "" : category)
  );
  return result;
};

export default function Store({ apiUrl }) {
  // useState Hooks definition
  const [productSelected, setProductSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("0");
  const [state, setState] = useState({ loading: false });

  // Fetch Data definition
  const { data, error } = useSWR(apiUrl, fetchProducts);

  // Render Data Fetching Error
  if (error) {
    return (
      <Layout>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <div>Error al cargar los productos</div>
      </Layout>
    );
  }

  // Render Data Fetching Loading
  if (!data) {
    return (
      <Layout>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <div>Cargando ...</div>
      </Layout>
    );
  }

  // Products definition
  const products = data;

  // Table Head definition
  const tableHead = (
    <TableHead>
      <TableRow>
        <StyledTableCell component="th">Código</StyledTableCell>
        <StyledTableCell component="th">Nombre Producto</StyledTableCell>
        <StyledTableCell component="th">Categoría</StyledTableCell>
        <StyledTableCell component="th">Descripción</StyledTableCell>
        <StyledTableCell component="th">Cantidad</StyledTableCell>
        <StyledTableCell component="th">Fecha de creación</StyledTableCell>
        <StyledTableCell component="th"></StyledTableCell>
      </TableRow>
    </TableHead>
  );

  // Handle Edit Button Clicks
  const HandleEdit = async (e) => {
    let item = JSON.parse(e.currentTarget.value);
    setProductSelected(Object.assign({}, item));
  };

  // Handle Delete Button Clicks
  const HandleDelete = async (e) => {
    setState({ loading: true });
    const { value } = e.currentTarget;
    const item = products.find((i) => i._id === value);
    item.Status = 0;
    const res = await saveProducts(apiUrl, value, Object.assign({}, item));
    if (res) {
      alert("Producto eliminado");
    }
    setState({ loading: false });
  };

  // Empty rows definition
  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      filterProducts(products, searchFilter, categoryFilter).length -
        page * rowsPerPage
    );

  // Table Body definition
  const tableBody = (
    <TableBody>
      {(rowsPerPage > 0
        ? filterProducts(products, searchFilter, categoryFilter).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        : filterProducts(products, searchFilter, categoryFilter)
      ).map((row) => (
        <TableRow key={row._id.toString()}>
          <TableCell component="th" scope="row">
            {row.IdProduct}
          </TableCell>
          <TableCell>{row.NameProduct}</TableCell>
          <TableCell>{row.Category}</TableCell>
          <TableCell>{row.Description}</TableCell>
          <TableCell>{row.ProductQuantity}</TableCell>
          <TableCell>
            {Moment(row.TimeStamp * 1000).format("LL, h:mm a")}
          </TableCell>
          <TableCell>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              small="true"
              onClick={HandleEdit}
              value={JSON.stringify(row)}
            >
              Editar
            </Button>
            &nbsp;
            {row.Status ? (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                small="true"
                onClick={HandleDelete}
                value={row._id}
              >
                Eliminar
              </Button>
            ) : (
              <Chip icon={<Close />} label="Eliminado" color="secondary" />
            )}
          </TableCell>
        </TableRow>
      ))}

      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows, backgroundColor: "silver" }}>
          <TableCell colSpan={colSpan}></TableCell>
        </TableRow>
      )}
    </TableBody>
  );

  // Handle Table Page Changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Rows Per Page Changes
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Table Footer definition
  const tableFooter = (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={labelRowsPerPage}
          colSpan={colSpan}
          count={filterProducts(products, searchFilter, categoryFilter).length}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );

  const HandleFormSubmit = () => {
    console.log(filterProducts(products, searchFilter, categoryFilter));
  };

  const HandleSearchFilter = (e) => {
    let { value } = e.target;
    setSearchFilter(value || "");
  };

  const HandleCategoryFilter = (e) => {
    let { value } = e.target;
    setCategoryFilter(value || "");
  };

  const HandleDetailClose = () => {
    setProductSelected(null);
  };

  // Render Page
  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Grid container spacing={3}>
        <Grid lg={3} md={6} xs={12} item>
          <h3 style={{ marginTop: 0 }}>
            <StoreIcon small="true" /> <span>{pageTitle}</span>
          </h3>
        </Grid>
        <Grid lg={3} md={6} xs={12} item>
          <TextField
            label="Nombre del producto"
            fullWidth
            variant="outlined"
            onChange={HandleSearchFilter}
            value={searchFilter}
            size="small"
          ></TextField>
        </Grid>
        <Grid lg={3} md={6} xs={12} item>
          <form onSubmit={HandleFormSubmit}>
            <TextField
              label="Categoría"
              select
              fullWidth
              variant="outlined"
              onChange={HandleCategoryFilter}
              value={categoryFilter}
              size="small"
            >
              {categoryFilterCombo.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </Grid>
        <Grid lg={3} md={6} xs={12} item>
          <DetalleProducto
            selected={productSelected}
            apiUrl={apiUrl}
            onCancel={HandleDetailClose}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader>
          {tableHead}
          {tableBody}
          {tableFooter}
        </Table>
      </TableContainer>
    </Layout>
  );
}

export async function getStaticProps() {
  const apiUrl = `${process.env.API_URL_ROOT}/${process.env.API_PATH_PRODUCTS}`;
  return {
    props: {
      apiUrl,
    },
  };
}
