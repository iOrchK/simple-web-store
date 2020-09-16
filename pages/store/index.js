import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import { useTheme, withStyles } from "@material-ui/core/styles";
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
import { getProducts, saveProducts } from "../../lib/store";
import { Close } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip";
import { TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import useSWR from "swr";
import axios from "axios";

const viewTitle = "Store";

// Change TableCell Style
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

// Table Pagination Actions
function TablePaginationActions(props) {
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
    <div>
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

const categories = ["Todas", "Bebidas", "Limpieza", "Botanas", "Cremeria"];

const urlProducts = "http://localhost:3001/products";
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Store() {
  // Hooks for useState
  const paramDefault = null;
  const [ProductSelected, setProductSelected] = useState(paramDefault);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [state, setState] = useState({ loading: false });

  // Fetch data
  const { data, error } = useSWR(urlProducts, fetcher);

  // Data Fetching Error
  if (error) {
    return (
      <Layout>
        <Head>
          <title>{viewTitle}</title>
        </Head>
        <div>Error al cargar los productos</div>
      </Layout>
    );
  }

  // Data Fetching Loading
  if (!data) {
    return (
      <Layout>
        <Head>
          <title>{viewTitle}</title>
        </Head>
        <div>Cargando ...</div>
      </Layout>
    );
  }

  // Data fetching OK
  let products = data;

  const tableHead = (
    <TableHead>
      <TableRow>
        <StyledTableCell component="th">Código</StyledTableCell>
        <StyledTableCell component="th">Nombre Producto</StyledTableCell>
        <StyledTableCell component="th">Categoría</StyledTableCell>
        <StyledTableCell component="th">Descripción</StyledTableCell>
        <StyledTableCell component="th">Cantidad</StyledTableCell>
        <StyledTableCell component="th">TimeStamp</StyledTableCell>
        <StyledTableCell component="th"></StyledTableCell>
      </TableRow>
    </TableHead>
  );

  // Handle Edit Product
  const HandleEdit = async (e) => {
    let item = JSON.parse(e.currentTarget.value);
    console.log(item);
  };

  // Handle Delete Product
  const HandleDelete = async (e) => {
    setState({ loading: true });
    let itemId = e.currentTarget.value;
    let item = products.find((i) => i._id === itemId);
    item.Status = 0;
    let res = await saveProducts(itemId, item);
    if (res) {
      alert("Producto eliminado");
    }
    setState({ loading: false });
  };

  // Table Body
  const tableBody = (
    <TableBody>
      {products.map((row) => (
        <TableRow key={row._id.toString()}>
          <TableCell component="th" scope="row">
            {row.IdProduct}
          </TableCell>
          <TableCell>{row.NameProduct}</TableCell>
          <TableCell>{row.Category}</TableCell>
          <TableCell>{row.Description}</TableCell>
          <TableCell>{row.ProductQuantity}</TableCell>
          <TableCell>{row.TimeStamp}</TableCell>
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
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={7} />
        </TableRow>
      )}
    </TableBody>
  );

  // Table Pagination
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Table Footer
  const tableFooter = (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Registros por página:"
          colSpan={7}
          count={products.length}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );

  // Render Page
  return (
    <Layout>
      <Head>
        <title>{viewTitle}</title>
      </Head>
      <Grid container spacing={3}>
        <Grid md={3} item>
          <h3>
            <StoreIcon small="true" /> <span>{viewTitle}</span>
          </h3>
        </Grid>
        <Grid md={3} item>
          <TextField
            label="Nombre del producto"
            fullWidth
            variant="outlined"
          ></TextField>
        </Grid>
        <Grid md={3} item>
          <TextField label="Categoría" select fullWidth variant="outlined">
            {categories.map((option) => (
              <MenuItem key={option || ""} value={option || ""}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid md={3} item>
          <DetalleProducto
          // selected={ProductSelected}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          {tableHead}
          {tableBody}
          {tableFooter}
        </Table>
      </TableContainer>
    </Layout>
  );

  // const [FilterCategory, setFilterCategory] = useState("Todas");
  // const [FilterNameProduct, setFilterNameProduct] = useState("");
  // const HandleFilterCategory = (e) => {
  //   setFilterCategory(e.target.value || "Todas");
  // };
  // const HandleFilterNameProduct = (e) => {
  //   setFilterNameProduct(e.target.value || "");
  // };

  // const FilteredProducts = async () => {
  //   if (FilterCategory === "Todas") {
  //     if (FilterNameProduct === "") {
  //       return products;
  //     } else {
  //       return products.filter((e) =>
  //         e.NameProduct.includes(FilterNameProduct)
  //       );
  //     }
  //   } else {
  //     if (FilterNameProduct === "") {
  //       return products.filter((e) => e.Category === FilterCategory);
  //     } else {
  //       return products.filter(
  //         (e) =>
  //           e.NameProduct.includes(FilterNameProduct) ||
  //           e.Category === FilterCategory
  //       );
  //     }
  //   }
  // };
}
