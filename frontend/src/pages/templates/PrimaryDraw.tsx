import { Box, useMediaQuery, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import DrawToggle from "../../components/PrimaryDraw/DrawToggle";
import MuiDrawer from "@mui/material/Drawer";

const PrimaryDraw = () => {
  const theme = useTheme();
  const below600 = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const openedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    width: theme.primaryDraw.closed,
  });


  const Drawer = styled(
    MuiDrawer,
    {shouldForwardProp: (prop) => prop !== "open" }
  )(({ theme, open }) => ({
    width: theme.primaryDraw.width,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .MuiDrawer-paper": {
      ...(open ? openedMixin() : closedMixin())
    }
  }));

  useEffect(() => {
    setOpen(!below600);
  }, [below600]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      variant={below600 ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          width: theme.primaryDraw.width,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 0,
            width: open ? "auto" : "100%",
          }}
        >
          <DrawToggle
            open={open}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
          />
          {[...Array(115)].map((_, index) => (
            <Typography key={index} paragraph>
              {index + 1}
            </Typography>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default PrimaryDraw;
