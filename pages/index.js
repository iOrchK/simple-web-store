import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import HomeIcon from "@material-ui/icons/Home";

// Page definitions
const pageTitle = "Inicio";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <h3>
        <HomeIcon />
        {pageTitle}
      </h3>
      <p>Bienvenido al Administrador de productos.</p>
      <span>
        Esta aplicación web cuenta con un menú que se despliega al hacer clic en
        el botón (icono de hamburguesa) de la esquina superior derecha. En el
        menú se encuentran los enlaces a los siguientes módulos:
      </span>
      <ul>
        <li>Store - Para ver, crear, editar y eliminar productos</li>
        <li>Candidate information - Para ver la información del candidato</li>
      </ul>
    </Layout>
  );
}
