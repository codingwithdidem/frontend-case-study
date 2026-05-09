import React, { useState } from "react";
import { Box, Typography, Button, TextField, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../store";
import { applyPromo, removePromo } from "../../store/packageSlice";
import { PROMO_CODES } from "../../lib/promoCodes";

export default function PromoCodeSection() {
  const [manualCode, setManualCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const appliedPromo = useSelector(
    (state: RootState) => state.package.appliedPromo,
  );

  const urlCode = router.query.promoCode as string | undefined;
  const urlPromo =
    urlCode && PROMO_CODES[urlCode] && !appliedPromo
      ? { code: urlCode, promo: PROMO_CODES[urlCode] }
      : null;

  const handleRemove = () => {
    dispatch(removePromo());
  };

  const handleManualApply = () => {
    if (PROMO_CODES[manualCode]) {
      dispatch(
        applyPromo({ code: manualCode, promo: PROMO_CODES[manualCode] }),
      );
      setManualCode("");
      setErrorMsg("");
    } else {
      setErrorMsg("Geçersiz indirim kodu.");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {appliedPromo && (
        <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: "#e8f5e9" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "success.main" }}>
              {appliedPromo.code} Uygulandı!
            </Typography>
            <Button
              color="error"
              data-testid="promo-remove"
              onClick={handleRemove}
            >
              Kaldır
            </Button>
          </Box>
        </Paper>
      )}

      {urlPromo && (
        <Box
          sx={{
            border: "1.5px dashed #26C6DA",
            borderRadius: 2,
            p: 2,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              İndirim Kodu
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>{urlPromo.code}</Typography>
          </Box>
          <Button
            variant="outlined"
            data-testid="promo-apply-suggested"
            onClick={() =>
              dispatch(
                applyPromo({ code: urlPromo.code, promo: urlPromo.promo }),
              )
            }
            sx={{ borderRadius: "50px", textTransform: "none" }}
          >
            Uygula
          </Button>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          size="small"
          label="İndirim Kodu"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          fullWidth
          error={!!errorMsg}
          helperText={errorMsg}
          slotProps={{
            htmlInput: { "data-testid": "promo-input" } as any,
            formHelperText: { "data-testid": "promo-error" } as any,
          }}
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
