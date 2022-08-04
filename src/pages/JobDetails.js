import * as React from 'react';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import {Box, CircularProgress, Container, Divider, Grid, Typography} from "@mui/material";
import DomainIcon from "@mui/icons-material/Domain";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HtmllViewer from "../components/HtmllViewer";
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";

export default function JobDetails() {

    const [jobs, setJobs] = useState([]);
    const [jobDetails, setJobDetails] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const getOtherJobs = (dept) => {
        axios.get('https://teknorix.jobsoid.com/api/v1/jobs?dept='+dept)
            .then((response) => {
                setJobs([...(response?.data ? response?.data : [])])
            })
            .catch(function (error) {

            });
    }

    useEffect(() => {
        setLoading(true);
        const jobId  = searchParams.get('jobId');
        axios.get('https://teknorix.jobsoid.com/api/v1/jobs/'+jobId)
            .then((response) => {
                if(response?.data) {
                    setJobDetails({...response?.data})
                    getOtherJobs(response?.data?.department?.id)
                }
            })
            .catch(function (error) {

            })
            .finally(() => {
                setLoading(false);
            });
    }, [searchParams]);

    if(searchParams.get('jobId'))
        return (
            <Container maxWidth={'lg'}>
                {
                    loading ?
                        <Box width={'100%'} height={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                            <CircularProgress size={30} />
                            <Typography mt={3}>
                                Loading Job Details
                            </Typography>
                        </Box>
                        :
                        <Box mt={4}>
                            <Typography fontSize={17} fontWeight={'bold'}>
                                {`${jobDetails?.department?.title} Department At ${jobDetails?.company} ${jobDetails?.location?.state}`}
                            </Typography>
                            <Typography fontSize={28} fontWeight={'bold'}>
                                {jobDetails?.title}
                            </Typography>
                            <Box display={'flex'} mt={1}>
                                <DomainIcon sx={{height: 20, width: 20}} />
                                <Typography ml={1} mr={2}>
                                    {jobDetails?.department?.title}
                                </Typography>
                                <LocationOnIcon sx={{height: 20, width: 20}} />
                                <Typography ml={1}>
                                    {jobDetails?.location?.title}
                                </Typography>
                                <Typography ml={3} bgcolor={'#d6d6d6'} color={'#000'} px={2}>
                                    {jobDetails?.type}
                                </Typography>
                            </Box>
                            <Button
                                color={'primary'}
                                sx={{borderRadius: 20, textTransform: 'capitalize', minWidth: 190, mt: 4, color: 'white'}}
                                size={'large'}
                                href={jobDetails?.applyUrl}
                                variant={'contained'}
                            >
                                Apply
                            </Button>
                            <Divider sx={{mt: 5, mb: 4}}/>
                            <Grid container spacing={2}>
                                <Grid item md={8}>
                                    <HtmllViewer html={jobDetails?.description} />
                                </Grid>
                                <Grid item md={4}>
                                    <Box width={'100%'} bgcolor={'#eff3fc'} p={2}>
                                        <Typography fontSize={19} fontWeight={'bold'}>
                                            OTHER JOB OPENING
                                        </Typography>
                                        <Box bgcolor={'primary.main'} height={5} width={50} mt={1} mb={1}/>
                                        <Box width={'100%'}>
                                            {
                                                jobs.map((each, pos) => (
                                                    <Box
                                                        key={pos}
                                                        sx={{
                                                            mt: 2, mb: 2, cursor: 'pointer',
                                                            '&:hover': {
                                                                color: 'primary.main'
                                                            }
                                                        }}
                                                        onClick={() => {
                                                            navigate({
                                                                pathname: '/job-details',
                                                                search: 'jobId='+each?.id,
                                                            });
                                                        }}
                                                    >
                                                        <Typography fontSize={16} fontWeight={'bold'} sx={{color: 'inherit'}}>
                                                            {each?.title}
                                                        </Typography>
                                                        <Box display={'flex'} mt={1}>
                                                            <DomainIcon sx={{height: 16, width: 16}} />
                                                            <Typography ml={0.5} mr={0.5} variant={'caption'}>
                                                                {each?.department?.title}
                                                            </Typography>
                                                            <LocationOnIcon sx={{height: 16, width: 16}} />
                                                            <Typography ml={0.5} variant={'caption'}>
                                                                {each?.location?.title}
                                                            </Typography>
                                                            <Typography ml={0.5} bgcolor={'#d6d6d6'} color={'#000'} px={1} fontSize={12}>
                                                                {each?.type}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                    <Box mt={2} mb={4}>
                                        <Typography fontSize={19} fontWeight={'bold'}>
                                            SHARE JOB OPENING
                                        </Typography>
                                        <Box bgcolor={'primary.main'} height={5} width={50}/>
                                        <Box display={'flex'} mt={2}>
                                            <FacebookShareButton
                                                url={jobDetails?.applyUrl}
                                            >
                                                <FacebookIcon size={36} round={true}/>
                                            </FacebookShareButton>
                                            <Box ml={1} />
                                            <TwitterShareButton
                                                url={jobDetails?.applyUrl}
                                            >
                                                <TwitterIcon size={36} round={true}/>
                                            </TwitterShareButton>
                                            <Box ml={1} />
                                            <LinkedinShareButton
                                                url={jobDetails?.applyUrl}
                                            >
                                                <LinkedinIcon size={36} round={true}/>
                                            </LinkedinShareButton>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                }

            </Container>
        );
    else
        return (
            <Container maxWidth={'md'}>
                <Box width={'100%'} height={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    No jobs found. Please provide a valid job id
                </Box>
            </Container>
        );
}
