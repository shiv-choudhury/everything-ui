import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

export default function RecipeComponent() {
  const API_ID = "ebc8c214";
  const API_KEY = "820238d7d6a98c84073eb2662527e463";
  const [timeoutId, setTimoutId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);

  const fetchRecipe = async (search) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?app_id=${API_ID}&app_key=${API_KEY}&q=${search}`
      );
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
            <Typography>Loading...</Typography>
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
    </div>
  );
}

const CardComponent = (props) => {
  const { image, label, url } = props.recipeObj;
  return (
    <Grid key={label} item xs={12} sm={6} md={4} lg={3}>
      <Card key={label} raised>
        <CardMedia component="img" alt="Beach" height="240" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {label}
          </Typography>
          <Button fullWidth variant="contained">
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
  );
};
