import React from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import { WhatsApp, Phone, Email, AccountBox, School } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const viewTitle = "Información del candidato";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const nombre = (
    <p>
      <AccountBox fontSize="small" />
      &nbsp; Jorge Carlos Chable Sanchez
    </p>
  );
  const email = (
    <p>
      <Email fontSize="small" />
      &nbsp; yahicimosclick9193@gmail.com
    </p>
  );
  const telefono = (
    <p>
      <Phone fontSize="small" />
      &nbsp; 9993310711
    </p>
  );
  const whatsApp = (
    <p>
      <WhatsApp fontSize="small" />
      &nbsp; 9992771993
    </p>
  );
  const escuela = (
    <p>
      <School fontSize="small" />
      &nbsp; Centro de Estudios Superios CTM
    </p>
  );
  const cursos = "";

  return (
    <Layout>
      <Head>
        <title>{viewTitle}</title>
      </Head>
      <h3>{viewTitle}</h3>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {Date()}
          </Typography>
          <Typography variant="h5" component="h2">
            {nombre}
          </Typography>
          <Typography variant="body2" component="p">
            {email}
          </Typography>
          <Typography variant="body2" component="p">
            {telefono}
          </Typography>
          <Typography variant="body2" component="p">
            {whatsApp}
          </Typography>
          <Typography variant="body2" component="p">
            {escuela}
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
}
