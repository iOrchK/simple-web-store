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
    <Typography variant="h5" component="h2">
      <AccountBox fontSize="small" />
      &nbsp; Jorge Carlos Chable Sanchez
    </Typography>
  );
  const email = (
    <Typography variant="body2" component="p">
      <Email fontSize="small" />
      &nbsp; yahicimosclick9193@gmail.com
    </Typography>
  );
  const telefono = (
    <Typography variant="body2" component="p">
      <Phone fontSize="small" />
      &nbsp; 9993310711
    </Typography>
  );
  const whatsApp = (
    <Typography variant="body2" component="p">
      <WhatsApp fontSize="small" />
      &nbsp; 9992771993
    </Typography>
  );
  const escuela = (
    <Typography variant="body2" component="p">
      <School fontSize="small" />
      &nbsp; Centro de Estudios Superios CTM
    </Typography>
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
          {nombre}
          {email}
          {telefono}
          {whatsApp}
          {escuela}
        </CardContent>
      </Card>
    </Layout>
  );
}
