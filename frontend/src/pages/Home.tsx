import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useForm } from "react-hook-form";

import styles from "./home.module.css";
import DiffViewerComponent from "../components/DiffViewerComponent";
import * as resumeService from "../services/resume";

function Home() {
  const { register, handleSubmit, setValue, getValues, reset } = useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [currentResume, setCurrentResume] = useState<string | undefined>();
  const [optimizedResume, setOptimizedResume] = useState<string | undefined>();
  const [responseLoaded, setResponseLoaded] = useState<boolean>(false);

  useEffect(() => {
    resumeService.getDefaultResume().then((data: any) => {
      setValue("currentResume", data.defaultResume);
    });
  }, [setValue]);

  const handleSaveDefaultResume = () => {
    const data = getValues("currentResume");
    if (data)
      resumeService.saveDefaultResume({
        defaultResume: getValues("currentResume"),
      });
  };

  const handleReset = async () => {
    reset();
    const data = await resumeService.getDefaultResume();
    setValue("currentResume", data.defaultResume);

    setResponseLoaded(false);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <h1 className={styles.heading}>AI Resume Optimizer</h1>
      <Box sx={{ m: 10 }} />
      <form
        onSubmit={handleSubmit(async (data: any) => {
          setLoading(true);
          setCurrentResume(data.currentResume);
          // Backend api call
          const optimizedResumeValue = await resumeService.getOptimizedResume(
            data
          );
          setOptimizedResume(optimizedResumeValue);
          setValue("optimizedResume", optimizedResumeValue);
          setResponseLoaded(true);
          setLoading(false);
        })}
      >
        <Grid container>
          <Grid xs={0} md={0.5} item={true}></Grid>
          <Grid xs={12} md={5.25} item={true}>
            <Item>
              <TextField
                id="filled-multiline-static"
                label="Job Description"
                multiline
                rows={14}
                variant="filled"
                fullWidth
                {...register("jobDescription", { required: true })}
                required
              />
            </Item>
          </Grid>
          <Grid xs={0} md={0.5} item={true}></Grid>
          <Grid xs={12} md={5.25} item={true}>
            <Item>
              <TextField
                id="filled-multiline-static"
                label="Current resume"
                multiline
                rows={14}
                variant="filled"
                fullWidth
                {...register("currentResume", { required: true })}
                required
              />
            </Item>
          </Grid>
          <Grid xs={0} md={0.5} item={true}></Grid>
        </Grid>
        <Box sx={{ m: 2 }} />
        <Grid container>
          <Grid xs={0} md={6} item={true}></Grid>
          <Grid xs={12} md={6} item={true}>
            <Button
              variant="outlined"
              onClick={handleSaveDefaultResume}
              style={{ margin: "10px" }}
            >
              Save as default resume
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={0} md={4} item={true}></Grid>
          <Grid xs={12} md={4} item={true}>
            <TextField
              id="filled-multiline-static"
              label="Custom instructions for AI (optional)"
              multiline
              rows={3}
              variant="filled"
              fullWidth
              {...register("customInstructions")}
            />
          </Grid>
          <Grid xs={0} md={4} item={true}></Grid>
        </Grid>

        <div style={{ margin: "20px auto" }}>
          {!responseLoaded && (
            <Button variant="contained" type="submit">
              Optimize resume
            </Button>
          )}
          {responseLoaded && (
            <>
              <Grid container>
                <Grid xs={0} md={4} item={true}></Grid>
                <Grid xs={12} md={4} item={true}>
                  <Button variant="contained" type="submit">
                    Re-optimize resume
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleReset}
                    style={{ marginLeft: "10px" }}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid xs={0} md={4} item={true}></Grid>
              </Grid>
            </>
          )}
        </div>

        {responseLoaded && (
          <>
            <Grid container>
              <Grid xs={0} md={0.5} item={true}></Grid>
              <Grid xs={12} md={11} item={true}>
                <TextField
                  id="filled-multiline-static"
                  label="Optimized resume"
                  multiline
                  rows={14}
                  variant="filled"
                  fullWidth
                  {...register("optimizedResume")}
                  onChange={(e) => {
                    setOptimizedResume(e.target.value);
                  }}
                />

                  <DiffViewerComponent
                    currentResume={currentResume}
                    optimizedResume={optimizedResume}
                    splitView={true}
                  />
              </Grid>
              <Grid xs={0} md={0.5} item={true}></Grid>
            </Grid>
          </>
        )}
      </form>
    </>
  );
}

export default Home;
