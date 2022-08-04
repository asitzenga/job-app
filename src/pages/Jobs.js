import * as React from 'react';
import {
    Box, Button, Chip,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import axios from "axios";
import JobRows from "../components/JobRows";
import {useNavigate, useSearchParams} from "react-router-dom";

export default function Jobs() {
    const [search, setSearch] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [locations, setLocations] = useState([]);
    const [functions, setFunctions] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const createSearchParam = (type, val) => {
        const q  = type && type === 'q' ? val : searchParams.get('q') ? searchParams.get('q') : '' ;
        const dept  = type && type === 'dept' ? val : searchParams.get('dept') ? searchParams.get('dept') : '';
        const fun  = type && type === 'fun' ? val : searchParams.get('fun') ? searchParams.get('fun') : '';
        const loc  = type && type === 'loc' ? val : searchParams.get('loc') ? searchParams.get('loc') : '';
        return `q=${q}&dept=${dept}&loc=${loc}&fun=${fun}`
    }

    const getAllDepartments = () => {
        axios.get('https://teknorix.jobsoid.com/api/v1/departments')
            .then((response) => {
                setDepartments([...(response?.data ? response?.data : [])])
            })
            .catch(function (error) {

            });
    }
    const getAllLocations = () => {
        axios.get('https://teknorix.jobsoid.com/api/v1/locations')
            .then((response) => {
                setLocations([...(response?.data ? response?.data : [])])
            })
            .catch(function (error) {

            });
    }
    const getAllFunctions = () => {
        axios.get('https://teknorix.jobsoid.com/api/v1/functions')
            .then((response) => {
                setFunctions([...(response?.data ? response?.data : [])])
            })
            .catch(function (error) {

            });
    }
    useEffect(() => {
        getAllDepartments();
        getAllLocations();
        getAllFunctions();
    }, []);

    useEffect(() => {
        setLoading(true);
        const q  = searchParams.get('q');
        setSearch(q);
        const dept  = searchParams.get('dept');
        const fun  = searchParams.get('fun');
        const loc  = searchParams.get('loc');
        axios.get('https://teknorix.jobsoid.com/api/v1/jobs', {
            params: {
                ...(q ? {q} : {}),
                ...(loc ? {loc} : {}),
                ...(dept ? {dept} : {}),
                ...(fun ? {fun} : {}),
            }
        })
            .then((response) => {
                setJobs([...(response?.data ? response?.data : [])])
            })
            .catch(function (error) {

            })
            .finally(() => {
                setLoading(false);
            });
    }, [searchParams]);

    return (
        <Container maxWidth={'md'} >
            <Box bgcolor={'#ececec'} width={'100%'} p={4} mt={3} mb={3}>
                <TextField
                    placeholder="Search for Job"
                    id="search-filed"
                    fullWidth
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton onClick={() => {
                                    // if(search.length > 0){
                                        navigate({
                                            pathname: '/',
                                            search: createSearchParam('q', search),
                                        });
                                    // }
                                }}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>,
                    }}
                    variant="outlined"
                />
                <Box display={'flex'} mt={2}>
                    <TextField
                        select
                        fullWidth
                        sx={{
                            flex: 1,
                            mr: 2
                        }}
                        label={'Select A Department'}
                        value={searchParams.get('dept')}
                        onChange={(e) => {
                            navigate({
                                pathname: '/',
                                search: createSearchParam('dept', e.target.value),
                            });
                        }}
                        variant="outlined"
                    >
                        {
                            departments.map((each, pos) => (
                                <MenuItem value={each?.id} key={pos}>{each?.title}</MenuItem>
                            ))
                        }
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        label={'Select A Location'}
                        sx={{
                            flex: 1,
                            mr: 2
                        }}
                        value={searchParams.get('loc')}
                        onChange={(e) => {
                            navigate({
                                pathname: '/',
                                search: createSearchParam('loc', e.target.value),
                            });
                        }}
                        variant="outlined"
                    >
                        {
                            locations.map((each, pos) => (
                                <MenuItem value={each?.id} key={pos}>{each?.title}</MenuItem>
                            ))
                        }
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        label={'Select A Function'}
                        sx={{
                            flex: 1,
                        }}
                        value={searchParams.get('fun')}
                        onChange={(e) => {
                            navigate({
                                pathname: '/',
                                search: createSearchParam('fun', e.target.value),
                            });
                        }}
                        variant="outlined"
                    >
                        {
                            functions.map((each, pos) => (
                                <MenuItem value={each?.id} key={pos}>{each?.title}</MenuItem>
                            ))
                        }
                    </TextField>
                </Box>
            </Box>
            {
                (searchParams.get('dept') || searchParams.get('loc') || searchParams.get('fun')) ?
                    <Box bgcolor={'#ececec'} width={'100%'} p={4} mt={3} mb={3} display={'flex'} justifyContent={'space-between'}>
                        <Box display={"flex"}>
                            {
                                departments && searchParams.get('dept') &&
                                <Chip
                                    label={departments.filter(e => e.id == searchParams.get('dept'))[0]?.title}
                                    variant="outlined"
                                    sx={{mr: 2}}
                                    onDelete={() => {
                                        navigate({
                                            pathname: '/',
                                            search: createSearchParam('dept', ''),
                                        });
                                    }}
                                />
                            }
                            {
                                locations && searchParams.get('loc') &&
                                <Chip
                                    label={locations.filter(e => e.id == searchParams.get('loc'))[0]?.title}
                                    variant="outlined"
                                    sx={{mr: 2}}
                                    onDelete={() => {
                                        navigate({
                                            pathname: '/',
                                            search: createSearchParam('loc', ''),
                                        });
                                    }}
                                />
                            }
                            {
                                functions && searchParams.get('fun') &&
                                <Chip
                                    label={functions.filter(e => e.id == searchParams.get('fun'))[0]?.title}
                                    variant="outlined"
                                    sx={{mr: 2}}
                                    onDelete={() => {
                                        navigate({
                                            pathname: '/',
                                            search: createSearchParam('fun', ''),
                                        });
                                    }}
                                />
                            }
                        </Box>
                        <Button
                            sx={{textTransform: 'capitalize'}}
                            onClick={() => {
                                navigate({
                                    pathname: '/',
                                    search:'',
                                });
                            }}
                        >
                            Clear All
                        </Button>
                    </Box>
                    : <></>
            }
            <Box width={'100%'} p={4} mt={3} mb={3} display={'flex'} flexDirection={'column'}>
                {
                    loading ?
                        <Box width={'100%'} height={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                            <CircularProgress size={30} />
                            <Typography mt={3}>
                                Loading Jobs
                            </Typography>
                        </Box>
                        : (departments && departments.length > 0) && (jobs && jobs.length > 0) ?
                        departments.map((each, pos) => (
                            <JobRows jobCategory={each} jobs={jobs} keys={pos} />
                        )) :
                        <Box width={'100%'} height={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            No jobs found
                        </Box>
                }
            </Box>
        </Container>
    );
}
