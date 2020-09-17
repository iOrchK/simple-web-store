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
import {
  CategoryCombo,
  ProductQuantityCombo,
  StatusCombo,
} from "../../../lib/combos";

// Form styles definition
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

// Drawer definition
const anchor = "right";

// Fields definition
const fieldDefault = {
  error: true,
  message: "Este campo es requerido",
  model: "",
};

// Combos list definition
const categoryCombo = CategoryCombo;
const productQuantityCombo = ProductQuantityCombo;
const statusCombo = StatusCombo;

export default function DetalleProductoComponent({ ...props }) {
  // console.log(props.selected);
  // console.log(props.apiUrl);

  // useState Hooks definition
  const [state, setState] = useState({ loading: false });
  const [NameProduct, setNameProduct] = useState(fieldDefault);
  const [Description, setDescription] = useState(fieldDefault);
  const [Category, setCategory] = useState(fieldDefault);
  const [ProductQuantity, setProductQuantity] = useState(fieldDefault);
  const [Status, setStatus] = useState(fieldDefault);
  const [ProductDetail, setProductDetailState] = useState({
    [anchor]: false,
  });

  // Styles definition
  const classes = useStyles();

  // useEffect(() => {
  //   if (SelectedProduct !== props.selected) {
  //     setSelectedProduct(props.selected);
  //     console.log("Show product");
  //     setProductDetailState({ ...ProductDetail, [anchor]: true });
  //   }
  //   console.log("component updated");
  // });

  // Toggle Drawer Component
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setProductDetailState({ ...ProductDetail, [anchor]: open });
  };

  // Handle NameProduct TextField Changes
  const HandleNameProduct = async (e) => {
    const { value } = e.target;
    if (value === "") {
      setNameProduct({
        error: true,
        message: "Este campo es requerido",
        model: value || "",
      });
      return true;
    }
    setNameProduct({
      error: false,
      message: "",
      model: value || "",
    });
    return false;
  };

  // Handle Category TextField Changes
  const HandleCategory = (e) => {
    const { value } = e.target;
    if (value === "") {
      setCategory({
        error: true,
        message: "Este campo es requerido",
        model: value || "",
      });
      return true;
    }
    setCategory({
      error: false,
      message: "",
      model: value || "",
    });
    return false;
  };

  // Handle Description TextField Changes
  const HandleDescription = (e) => {
    const { value } = e.target;
    if (value === "") {
      setDescription({
        error: true,
        message: "Este campo es requerido",
        model: value || "",
      });
      return true;
    }
    setDescription({
      error: false,
      message: "",
      model: value || "",
    });
    return false;
  };

  // Handle ProductQuantity TextField Changes
  const HandleProductQuantity = (e) => {
    const { value } = e.target;
    if (ProductQuantity.model === "") {
      setProductQuantity({
        error: true,
        message: "Este campo es requerido",
        model: value || "",
      });
      return true;
    }
    setProductQuantity({
      error: false,
      message: "",
      model: value || "",
    });
    return false;
  };

  // Handle Status TextField Changes
  const HandleStatus = (e) => {
    const { value } = e.target;
    if (Status.model === "") {
      setStatus({
        error: true,
        message: "Este campo es requerido",
        model: value || "",
      });
      return true;
    }
    setStatus({
      error: false,
      message: "",
      model: value || "",
    });
    return false;
  };

  // Handle Cancel Button Clicks
  const HandleCancel = () => {
    setProductDetailState({ ...ProductDetail, [anchor]: false });
    setNameProduct(fieldDefault);
    setCategory(fieldDefault);
    setDescription(fieldDefault);
    setProductQuantity(fieldDefault);
    setStatus(fieldDefault);
  };

  // Handle Submit Button Clicks
  const HandleSubmit = async () => {
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
    setState({ loading: true });
    console.log("Saving");
    const body = {
      NameProduct: NameProduct.model,
      Category: Category.model,
      Description: Description.model,
      ProductQuantity: ProductQuantity.model,
      Status: Status.model,
    };
    const res = await saveProducts(apiUrl, null, body);
    if (res) {
      HandleCancel();
      alert("Producto creado");
    }
    setState({ loading: false });
  };

  // Render result
  return (
    <div>
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
      <Drawer
        anchor={anchor}
        open={ProductDetail[anchor]}
        variant="persistent"
        onClose={toggleDrawer(anchor, false)}
      >
        <form id="create-product-form" onSubmit={HandleSubmit}>
          <List>
            <ListItem>
              <ListItemText>
                <h3>Detalle del producto</h3>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <div className={classes.root}>
                  <div>
                    <TextField
                      id="standard-basic"
                      label="Nombre del producto"
                      onChange={HandleNameProduct}
                      fullWidth
                      error={NameProduct.error}
                      helperText={NameProduct.message}
                      value={NameProduct.model}
                    />
                    <TextField
                      label="Categoría"
                      select
                      onChange={HandleCategory}
                      fullWidth
                      error={Category.error}
                      helperText={Category.message}
                      value={Category.model}
                    >
                      {categoryCombo.map((option) => (
                        <MenuItem key={option || ""} value={option || ""}>
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
                      value={Description.model}
                    />
                    <TextField
                      label="Cantidad"
                      select
                      onChange={HandleProductQuantity}
                      fullWidth
                      error={ProductQuantity.error}
                      helperText={ProductQuantity.message}
                      value={ProductQuantity.model}
                    >
                      {productQuantityCombo.map((_, i) => {
                        i++;
                        return (
                          <MenuItem
                            key={i.toString() || ""}
                            value={i.toString() || ""}
                          >
                            {i}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                    <TextField
                      label="Estado"
                      select
                      onChange={HandleStatus}
                      fullWidth
                      error={Status.error}
                      helperText={Status.message}
                      value={Status.model}
                    >
                      {statusCombo.map((option) => (
                        <MenuItem
                          key={option.value || ""}
                          value={option.value || ""}
                        >
                          {option.text}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className={classes.buttonContainer}>
                <Button
                  color="secondary"
                  startIcon={<Close />}
                  variant="outlined"
                  onClick={HandleCancel}
                >
                  Cancelar
                </Button>
                &nbsp;
                <Button
                  color="primary"
                  startIcon={<Save />}
                  variant="outlined"
                  onClick={HandleSubmit}
                >
                  Guardar
                </Button>
                &nbsp;
              </ListItemText>
            </ListItem>
          </List>
        </form>
      </Drawer>
    </div>
  );
}

// export async function getStaticProps() {
//   const apiUrl = `${process.env.API_URL_ROOT}/${process.env.API_PATH_PRODUCTS}`;
//   return {
//     props: {
//       apiUrl,
//     },
//   };
// }
