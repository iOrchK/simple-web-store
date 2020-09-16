import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { Add, Close, Save } from "@material-ui/icons";
import { saveProducts } from "../../../lib/store";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  buttonContainer: {
    padding: 10,
    textAlign: "right",
  },
}));

const categories = ["Bebidas", "Limpieza", "Botanas", "Cremeria"];

export default function DetalleProductoComponent({ ...props }) {
  // const [SelectedProduct, setSelectedProduct] = useState(null);

  // console.log(props.selected);
  const classes = useStyles();
  const anchor = "right";

  let [state, setState] = useState({
    [anchor]: false,
  });

  // useEffect(() => {
  //   if (SelectedProduct !== props.selected) {
  //     setSelectedProduct(props.selected);
  //     console.log("Show product");
  //     setState({ ...state, [anchor]: true });
  //   }
  //   console.log("component updated");
  // });

  let product = {
    NameProduct: "",
    Category: "",
    Description: "",
    ProductQuantity: "",
    Status: "",
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  /********************************* */
  const paramDefault = {
    error: true,
    message: "Este campo es requerido",
    model: "",
  };
  let [NameProduct, setNameProduct] = useState(paramDefault);
  const HandleNameProduct = async (e) => {
    product.NameProduct = e.target.value || "";
    if (product.NameProduct === "") {
      setNameProduct({
        error: true,
        message: "Este campo es requerido",
        model: e.target.value || "",
      });
      return product.NameProduct;
    }
    setNameProduct({
      error: false,
      message: "",
      model: e.target.value || "",
    });
    return product.NameProduct;
  };

  let [Category, setCategory] = useState(paramDefault);
  const HandleCategory = (e) => {
    product.Category = e.target.value || "";
    if (product.Category === "") {
      setCategory({
        error: true,
        message: "Este campo es requerido",
        model: e.target.value || "",
      });
      return true;
    }
    setCategory({
      error: false,
      message: "",
      model: e.target.value || "",
    });
    return false;
  };

  let [Description, setDescription] = useState(paramDefault);
  const HandleDescription = (e) => {
    if (Description.model === "") {
      setDescription({
        error: true,
        message: "Este campo es requerido",
        model: e.target.value || "",
      });
      return true;
    }
    setDescription({
      error: false,
      message: "",
      model: e.target.value || "",
    });
    return false;
  };

  let [ProductQuantity, setProductQuantity] = useState(paramDefault);
  const HandleProductQuantity = (e) => {
    ProductQuantity.model = e.target.value || "";
    if (ProductQuantity.model === "") {
      setProductQuantity({
        error: true,
        message: "Este campo es requerido",
        model: e.target.value || "",
      });
      return true;
    }
    setProductQuantity({
      error: false,
      message: "",
      model: e.target.value || "",
    });
    return false;
  };

  let [Status, setStatus] = useState(paramDefault);
  const HandleStatus = (e) => {
    Status.model = e.target.value || "";
    if (Status.model === "") {
      setStatus({
        error: true,
        message: "Este campo es requerido",
        model: e.target.value || "",
      });
      return true;
    }
    setStatus({
      error: false,
      message: "",
      model: e.target.value || "",
    });
    return false;
  };

  const ClickCancel = () => {
    setState({ ...state, [anchor]: false });
  };

  const ClickSave = async () => {
    if (
      !(
        !NameProduct.error &&
        !Category.error &&
        !Description.error &&
        !ProductQuantity.error &&
        !Status.error
      )
    ) {
      console.log("Invalid Fields");
      return;
    }
    console.log("Saving");
    let body = {
      NameProduct: NameProduct.model,
      Category: Category.model,
      Description: Description.model,
      ProductQuantity: ProductQuantity.model,
      Status: Status.model,
    };
    await saveProducts(null, body);
    document.getElementById("create-product-form").reset();
    setNameProduct(paramDefault);
    setCategory(paramDefault);
    setDescription(paramDefault);
    setProductQuantity(paramDefault);
    setStatus(paramDefault);
  };

  /********************* */

  return (
    <div>
      {
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={toggleDrawer(anchor, true)}
          >
            Crear nuevo producto
          </Button>
        </div>
      }
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        variant="persistent"
        onClose={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItem>
            <ListItemText>
              <h3>Detalle del producto</h3>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <div className={classes.root}>
                <form id="create-product-form">
                  <TextField
                    id="standard-basic"
                    label="Nombre del producto"
                    onChange={HandleNameProduct}
                    fullWidth
                    error={NameProduct.error}
                    helperText={NameProduct.message}
                  />
                  <TextField
                    label="Categoría"
                    select
                    onChange={HandleCategory}
                    fullWidth
                    error={Category.error}
                    helperText={Category.message}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Descripción"
                    onChange={HandleDescription}
                    fullWidth
                    error={Description.error}
                    helperText={Description.message}
                  />
                  <TextField
                    label="Cantidad"
                    onChange={HandleProductQuantity}
                    fullWidth
                    error={ProductQuantity.error}
                    helperText={ProductQuantity.message}
                  />
                  <TextField
                    label="Estado"
                    onChange={HandleStatus}
                    fullWidth
                    error={Status.error}
                    helperText={Status.message}
                  />
                </form>
              </div>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText className={classes.buttonContainer}>
              <Button
                color="secondary"
                startIcon={<Close />}
                variant="outlined"
                onClick={ClickCancel}
              >
                Cancelar
              </Button>
              &nbsp;
              <Button
                color="primary"
                startIcon={<Save />}
                variant="outlined"
                onClick={ClickSave}
              >
                Guardar
              </Button>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
