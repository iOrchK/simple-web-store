import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import Drawer from "../components/drawer";

export const siteTitle = "Administrador de productos";

const useStyles = makeStyles({
  button: {
    marginTop: 15,
    marginBottom: 15,
  },
});

export default function LayoutComponent({ children, home }) {
  const classes = useStyles();
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
      </Head>

      <header>
        <AppBar position="static">
          <Toolbar>
            <Drawer />
            <Typography variant="h6" color="inherit">
              {siteTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      </header>

      <Container maxWidth="xl">
        <Grid container>
          {!home && (
            <Grid item cols={12}>
              <Link href="/">
                <Button
                  color="default"
                  small="true"
                  variant="outlined"
                  className={classes.button}
                  startIcon={<Home />}
                >
                  Regresar al inicio
                </Button>
              </Link>
            </Grid>
          )}
        </Grid>
        <main>{children}</main>
      </Container>
    </>
  );
}
