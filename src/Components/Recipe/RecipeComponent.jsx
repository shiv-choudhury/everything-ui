import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import Slide from "@mui/material/Slide";
import { getRecipes } from "../Api/apistore";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecipeComponent() {
  const [timeoutId, setTimoutId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [search, setSearch] = useState("");

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //TODO: use useReducer hook

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchRecipe(search);
  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchRecipe = async (search) => {
    setSearch(search);
    const params = {
      q: search,
      from: page * rowsPerPage,
      to: (page + 1) * rowsPerPage
    };
    setIsLoading(true);
    try {
      const response = await getRecipes({ params });
      setCount(response.data.count);
      setRecipeList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setIsLoading(false);
    }
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => {
      fetchRecipe(e.target.value);
    }, 1000);
    setTimoutId(timeout);
  };

  return (
    <div>
      <Box mt={2}>
        <TextField
          fullWidth
          placeholder="Search recipe"
          size="small"
          type="text"
          onChange={onTextChange}
        />
      </Box>
      <Grid container spacing={4} mt={2}>
        {isLoading ? (
          <Grid item xs={12}>
            <Typography>Fetching recipes...</Typography>
          </Grid>
        ) : recipeList?.hits?.length > 0 ? (
          recipeList?.hits?.map((recipes, index) => (
            <CardComponent recipeObj={recipes.recipe} />
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No recipe found</Typography>
          </Grid>
        )}
      </Grid>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

const CardComponent = (props) => {
  const { image, label, url, ingredients } = props.recipeObj;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid key={label} item xs={12} sm={6} md={4} lg={3}>
        <Card key={label} raised>
          <CardMedia component="img" alt="Beach" height="240" image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {label}
            </Typography>
            <Button fullWidth variant="contained" onClick={handleClickOpen}>
              Ingredients
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => window.open(url)}
            >
              See complete recipe
            </Button>
          </CardContent>
        </Card>
      </Grid>
      {/* //dialog */}
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="h6">{label}</Typography>
            <ul>
              {ingredients.map((ingredient) => (
                // <li><div>{`${ingredient.text}(${ingredient.weight}g)`}</div></li>
                <li key={ingredient.text} style={{ marginTop: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end"
                    }}
                  >
                    <span>{ingredient.text}</span>
                    <i>{`(${ingredient.weight}g)`}</i>
                  </div>
                </li>
              ))}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
