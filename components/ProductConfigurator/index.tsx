import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { increment, decrement } from "../../store/packageSlice";
import { mockProducts } from "../../lib/mockData";

export default function ProductConfigurator() {
  const [tab, setTab] = React.useState<"menstrual" | "daily">("menstrual");
  const selections = useSelector(
    (state: RootState) => state.package.selections,
  );
  const dispatch = useDispatch();

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "menstrual" | "daily",
  ) => {
    setTab(newValue);
  };

  const getQuantity = (subTypeId: string) => {
    return selections.find((s) => s.subTypeId === subTypeId)?.quantity || 0;
  };

  const getTotalForType = (typeId: string) => {
    const type = mockProducts.find((p) => p.id === typeId);
    if (!type) return 0;
    return type.subTypes.reduce((total, st) => total + getQuantity(st.id), 0);
  };

  console.log(mockProducts);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Paketini Oluştur
      </Typography>
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab
          label="Menstrüel Ürünler"
          value="menstrual"
          data-testid="tab-menstrual"
        />
        <Tab label="Günlük Kullanım" value="daily" data-testid="tab-daily" />
      </Tabs>

      {mockProducts
        .filter((p) => p.tab === tab)
        .map((productType) => (
          <Accordion
            key={productType.id}
            defaultExpanded
            elevation={0}
            sx={{ borderBottom: "1px solid #ddd" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography>{productType.name}</Typography>
                <Typography
                  color="text.secondary"
                  sx={{ alignSelf: "center", fontSize: "0.9rem" }}
                >
                  {getTotalForType(productType.id) > 0
                    ? `${getTotalForType(productType.id)} Adet`
                    : ""}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {productType.subTypes.map((subType) => (
                <Box
                  key={subType.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {subType.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Organik Pamuk
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "transparent",
                      border: "1px solid #e0e0e0",
                      borderRadius: "50px",
                      p: 0.5,
                    }}
                  >
                    <IconButton
                      size="small"
                      style={{
                        borderRadius: "50px",
                        backgroundColor:
                          getQuantity(subType.id) === 0
                            ? "transparent"
                            : "#f5f5f5",
                      }}
                      data-testid={`decrement-${subType.id}`}
                      onClick={() =>
                        dispatch(decrement({ subTypeId: subType.id }))
                      }
                      disabled={getQuantity(subType.id) === 0}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      data-testid={`quantity-${subType.id}`}
                      sx={{
                        mx: 2,
                        minWidth: 24,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {getQuantity(subType.id)}
                    </Typography>
                    <IconButton
                      size="small"
                      style={{
                        borderRadius: "50px",
                        backgroundColor: "#f5f5f5",
                      }}
                      data-testid={`increment-${subType.id}`}
                      onClick={() =>
                        dispatch(increment({ subTypeId: subType.id }))
                      }
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}
