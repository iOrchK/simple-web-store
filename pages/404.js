import React from "react";
import { Grid } from "@material-ui/core";
import Layout from "../components/layout";

export default function Custom404() {
  return (
    <Layout>
      <Grid container>
        <Grid lg={12} item>
          <h1 style={{ marginBottom: 0 }}>404</h1>
        </Grid>
        <Grid lg={12} item>
          Page not found
        </Grid>
      </Grid>
    </Layout>
  );
}
