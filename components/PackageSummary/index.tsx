import React, { useMemo } from 'react';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { mockProducts } from '../../lib/mockData';
import { optimizePackages } from '../../lib/optimize';
import { ghostAppliedPromo } from '../../store/packageSlice';

export default function PackageSummary() {
  const selections = useSelector((state: RootState) => state.package.selections);
  const appliedPromo = useSelector((state: RootState) => state.package.appliedPromo);


  const summaryDetails = useMemo(() => {
    return selections.map(sel => {
      for (const pt of mockProducts) {
        for (const st of pt.subTypes) {
          if (st.id === sel.subTypeId) {
            const optimizations = optimizePackages(sel.quantity, st.products);
            const price = optimizations.reduce((total, opt) => total + (opt.product.price * opt.count), 0);
            return {
              subType: st,
              quantity: sel.quantity,
              optimizations,
              price
            };
          }
        }
      }
      return null;
    }).filter(Boolean);
  }, [selections.length]);

  const subtotal = summaryDetails.reduce((t, s) => t + (s?.price || 0), 0);
  
  let discount = 0;

  if (ghostAppliedPromo) {
    const promo = ghostAppliedPromo.promo;
    if (promo.type === 'fixed') {
      discount = promo.value;
    } else if (promo.type === 'percentage') {
      discount = subtotal * (promo.value / 100);
    }
  }

  const total = Math.max(0, subtotal - discount);

  return (
    <Paper elevation={2} sx={{ p: 4, width: '100%' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Özet</Typography>
      
      {summaryDetails.map(detail => {
        if (!detail) return null;
        return (
          <Box key={detail.subType.id} data-testid={`summary-row-${detail.subType.id}`} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{detail.subType.name} ({detail.quantity})</Typography>
            <Typography variant="body2" color="text.secondary">
              {detail.optimizations.map(opt => `${opt.count} x ${opt.product.size}li`).join(' + ')}
            </Typography>
            <Typography variant="body1">{detail.price} TL</Typography>
          </Box>
        );
      })}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Ara Toplam</Typography>
        <Typography>{subtotal} TL</Typography>
      </Box>

      {discount > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: 'success.main' }} data-testid="summary-discount">
          <Typography>İndirim ({ghostAppliedPromo?.code})</Typography>
          <Typography>-{discount} TL</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 3 }}>
        <Typography variant="h6">Toplam</Typography>
        <Typography variant="h6" data-testid="summary-total">{total} TL</Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        data-testid="add-to-cart"
        disabled={selections.length === 0}
      >
        Sepete Ekle
      </Button>
    </Paper>
  );
}
