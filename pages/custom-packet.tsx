import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { Box, Container, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { PROMO_CODES } from "../lib/promoCodes";
import { applyPromo } from "../store/packageSlice";
import ProductConfigurator from "../components/ProductConfigurator";
import PackageSummary from "../components/PackageSummary";
import PromoCodeSection from "../components/PromoCodeSection";
import { PromoCode } from "../types";

interface InternalProps {
  promoCode?: { code: string; promo: PromoCode };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const promoQuery = context.query.promoCode as string | undefined;

  if (promoQuery && PROMO_CODES[promoQuery]) {
    return {
      props: {
        promoCode: {
          code: promoQuery,
          promo: PROMO_CODES[promoQuery],
        },
      },
    };
  }

  return { props: {} };
};

export default function CustomPacketPage({ promoCode }: InternalProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <ProductConfigurator />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ position: { md: "sticky" }, top: { md: 24 } }}>
            <PackageSummary />
            <PromoCodeSection />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
