import React from "react";
import App, { Container } from "next/app";

export default class MyApp extends App {
  static async getInitialProps(ctx: any) {
    let pageProps = {};

    if (ctx.Component.getInitialProps) {
      pageProps = await ctx.Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
