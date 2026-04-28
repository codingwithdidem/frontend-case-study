import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { applyPromo, removePromo } from '../../store/packageSlice';
import { PROMO_CODES } from '../../lib/promoCodes';

export default function PromoCodeSection() {
  const [manualCode, setManualCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  
  const readyToApply = useSelector((state: RootState) => state.package.readyToApply);
  const appliedPromo = useSelector((state: RootState) => state.package.appliedPromo);

  const handleApplyReady = () => {
    dispatch(applyPromo());
  };

  const handleRemove = () => {
    dispatch(removePromo());
  };

  const handleManualApply = () => {
    if (PROMO_CODES[manualCode]) {
      dispatch({ type: 'package/setReadyToApply', payload: { code: manualCode, promo: PROMO_CODES[manualCode] } });
      dispatch(applyPromo());
      setManualCode('');
      setErrorMsg('');
    } else {
      setErrorMsg('Geçersiz indirim kodu.');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {readyToApply && !appliedPromo && (
        <Paper variant="outlined" sx={{ p: 2, borderStyle: 'dashed', mb: 2, borderColor: 'primary.main' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography data-testid="promo-ready-code" color="primary">{readyToApply.code} kodunuz bulundu!</Typography>
            <Button data-testid="promo-apply-ready" onClick={handleApplyReady}>Uygula</Button>
          </Box>
        </Paper>
      )}

      {appliedPromo && (
        <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: '#e8f5e9' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ color: 'success.main' }}>{appliedPromo.code} Uygulandı!</Typography>
            <Button color="error" data-testid="promo-remove" onClick={handleRemove}>Kaldır</Button>
          </Box>
        </Paper>
      )}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          size="small"
          label="İndirim Kodu"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          fullWidth
          error={!!errorMsg}
          helperText={errorMsg}
          slotProps={{ htmlInput: { 'data-testid': 'promo-input' } as any, formHelperText: { 'data-testid': 'promo-error' } as any }}
        />
        <Button
          variant="outlined"
          data-testid="promo-apply-manual"
          onClick={handleManualApply}
          sx={{ height: 40 }}
        >
          Uygula
        </Button>
      </Box>
    </Box>
  );
}
