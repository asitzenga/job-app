import * as React from 'react';
import Button from '@mui/material/Button';
import {useEffect} from "react";
import {Box, Typography} from "@mui/material";
import DomainIcon from '@mui/icons-material/Domain';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useNavigate} from "react-router-dom";

export default function JobRows({jobCategory, jobs}) {
    const navigate = useNavigate();

    if(jobs.filter(e => e.department.id === jobCategory.id).length > 0)
        return (
            <Box>
                <Typography fontSize={29} fontWeight={'bold'}>
                    {jobCategory?.title}
                </Typography>
                <Box bgcolor={'primary.main'} height={5} width={100} mt={2} mb={2}/>
                {
                    jobs.filter(e => e.department.id === jobCategory.id).map((each, pos) => (
                        <Box
                            key={pos}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 4, mb: 4
                            }}
                        >
                            <Box>
                                <Typography fontSize={22} fontWeight={'bold'}>
                                    {each?.title}
                                </Typography>
                                <Box display={'flex'} mt={1}>
                                    <DomainIcon sx={{height: 20, width: 20}} />
                                    <Typography ml={1} mr={2}>
                                        {each?.department?.title}
                                    </Typography>
                                    <LocationOnIcon sx={{height: 20, width: 20}} />
                                    <Typography ml={1}>
                                        {each?.location?.title}
                                    </Typography>
                                    <Typography ml={3} bgcolor={'#d6d6d6'} color={'#000'} px={2}>
                                        {each?.type}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display={'flex'} alignItems={'center'}>
                                <Button sx={{
                                    textTransform: 'capitalize',
                                    borderRadius: 10
                                }} variant={'outlined'} href={each?.applyUrl}>
                                    Apply
                                </Button>
                                <Button sx={{
                                    textTransform: 'capitalize',
                                    color: '#000',
                                    borderRadius: 10
                                }} onClick={() => {
                                    navigate({
                                        pathname: '/job-details',
                                        search: 'jobId='+each?.id,
                                    });
                                }}>
                                    View
                                </Button>
                            </Box>
                        </Box>
                    ))
                }
            </Box>
        );
    else
        return (
            <></>
        );
}
