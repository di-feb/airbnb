import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Avatar, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Switch from '@mui/material/Switch';
import axios from 'axios';

export default function UsersTable() {

    const [hostUser, setHostUsers] = React.useState([]);
    const [hosts, setHosts] = React.useState([]);
    const [switchValues, setSwitchValues] = React.useState({});

    const usersPerPage = 5; // Number of users to display per page
    const [currentPage, setCurrentPage] = React.useState(1); // Number of current page

    // Indexes for the users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    // Modify the users table so we can show a specific number of users.
    const currentUsers = hostUser.slice(indexOfFirstUser, indexOfLastUser);

    const totalPageCount = Math.ceil(hostUser.length / usersPerPage);

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    const fetchData = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            const [usersResponse, hostsResponse] = await Promise.all([
                axios.get('https://localhost:8080/admin/hostUsers'),
                axios.get('https://localhost:8080/admin/hosts'),
            ]);

            if (usersResponse.status === 200 && hostsResponse.status === 200) {
                return {
                    users: usersResponse.data,
                    hosts: hostsResponse.data,
                };
            }
        } catch (error) {
            console.error(error);
        }
    };

    

    const initiallizeSwitchValues = () => {
        const initialSwitchValues = {};

        hosts.forEach((host) => {
            initialSwitchValues[host.id] = host.approved;
        });

        setSwitchValues(initialSwitchValues);
    }

    React.useEffect(() => {
        const fetchSetData = async () => {
            try {
                const { users, hosts } = await fetchData();

                if (users && hosts) {
                    setHostUsers(users);
                    setHosts(hosts);
                    initiallizeSwitchValues();
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSetData();
    }, []);


    const giveApproval = async (e, id) => {
        const accessToken = localStorage.getItem('accessToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        const formData = new FormData();
        formData.append('id', id);
        formData.append('approved', !switchValues[id]);

        try {
            const response = await axios.post('https://localhost:8080/admin/setApproval', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type
                },
            });

            if (response.status === 200) {
                handleSwitchChange(e, id)
            }

        } catch (error) {
            console.error(error);
        }
    }


    const handleSwitchChange = (event, userId) => {
        // const copy = switchValues
        // const changeditem = copy[userId]
        // changeditem[event.target.name] = event.target.value

        setSwitchValues((prevSwitchValues) => ({
            ...prevSwitchValues,
            [userId]: event.target.checked,
        }));
    }




    return (
        <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' textAlign='center'>
            <Box bgcolor='cyan' width='100%' padding='2px' borderRadius='5px'>
                <Typography
                    color='black'
                    fontSize={18}
                >
                    Users Information
                </Typography>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Profile Picture</TableCell>
                        <TableCell>Usermame</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell >Approved</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentUsers.map((user) => (

                        <TableRow
                            key={user.id}
                        >
                            <TableCell>
                                <Avatar
                                    alt="Profile picture"
                                    src={`./user-photos/${user.id}/${user.profilePicture}`}
                                    sx={{
                                        width: '40px',
                                        height: '40px',
                                    }}
                                />

                            </TableCell>
                            <TableCell >{user.username}</TableCell>
                            <TableCell>{user.firstname}</TableCell>
                            <TableCell>{user.lastname}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phoneNumber}</TableCell>
                            <TableCell>
                                <Switch
                                    checked={switchValues[user.id].approved}
                                    onChange={(e) => { giveApproval(e, user.id) }}

                                />
                            </TableCell>

                        </TableRow>

                    ))}
                </TableBody>
            </Table>
            <Pagination
                color='info'
                count={totalPageCount}
                defaultPage={1}
                page={currentPage}
                onChange={handlePagination}
                siblingCount={0}
                sx={{ mt: 2, justifyContent: 'center' }}
            />
        </Box>
    );
}