import React from 'react'
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Job from './Job';
import JobModal from './JobModal'

const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
  });



export default function Jobs({jobs}){


    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      console.log("handleClose called")
      setOpen(false);
      console.log(open);
    };


    const classes = useStyles();
    const theme = useTheme();
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50);

    const [activeStep, setActiveStep] = React.useState(0);

    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50 + 50));

    // step == 0, show 0-49
    // step == 1, show 50 - 99

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    console.log('job is ', jobs[0]);

    return (
        <div className="jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose}/>
            <Typography variant="h4" component="h1">
                Entry Level Software Jobs
            </Typography>

            <Typography variant="h6" component="h2">
                Found {numJobs} jobs.
            </Typography>
            <div>
                Page {activeStep + 1 <= numPages? activeStep + 1 : numPages} of {numPages}
            </div>
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numPages -1}>
                    Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                    </Button>
                }
                />

            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={() => {
                        selectJob(job)
                        handleClickOpen();
                    }}/>
                )
            }
            
        </div>
    )
}

