import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";

export default function Tables() {
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: { username: "shiv1805", repoName: "react-vite-project" }
  });

  const fetchCommits = async (formData) => {
    const { username, repoName } = formData;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${username}/${repoName}/commits`
      );
      setCommits(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching commit history:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Grid container columnGap={1}>
        <Grid item>
          <Typography variant="h5">Tables</Typography>
        </Grid>
        <Grid item>
          <Button onClick={() => toast.success("success")}>Toastify</Button>
        </Grid>
      </Grid>
      <Box my={1}>
        <form onSubmit={handleSubmit(fetchCommits)}>
          <Grid
            container
            columnGap={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <TextField
                    {...register("username", { required: true })}
                    size="small"
                    placeholder="Git username"
                    type="search"
                  />
                </Grid>
                {errors.username && (
                  <Grid item>
                    <span style={{ color: "red", fontSize: "12px" }}>
                      This field is required
                    </span>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <TextField
                    {...register("repoName", { required: true })}
                    size="small"
                    placeholder="Git repo"
                    type="search"
                  />
                </Grid>
                {errors.repoName && (
                  <Grid item>
                    <span style={{ color: "red", fontSize: "12px" }}>
                      This field is required
                    </span>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="outlined" type="submit">
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>Auther Email</TableCell>
                <TableCell>Committer Name</TableCell>
                <TableCell>Committer Email</TableCell>
                <TableCell>Commit message</TableCell>
                <TableCell>Commit Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                "Loading..."
              ) : commits.length ? (
                commits.map((commit) => (
                  <TableRow key={commit.sha}>
                    <TableCell>{commit.commit.author.name}</TableCell>
                    <TableCell>{commit.commit.author.email}</TableCell>
                    <TableCell>{commit.commit.committer.name}</TableCell>
                    <TableCell>{commit.commit.committer.email}</TableCell>
                    <TableCell>
                      <Link
                        href={commit.html_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {commit.commit.message}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {moment(commit.commit.committer.date).format(
                        "Do MMMM YYYY, h:mm a"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No commits found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
