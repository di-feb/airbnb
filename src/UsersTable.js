import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Avatar, Typography } from '@mui/material';
import axios from 'axios';
import Loading from './Loading';

export default function UsersTable() {

    const [dataReady, setDataReady] = React.useState(false);
    const [usersData, setUsersData] = React.useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:8080/admin/users');

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        const fetchDataAndSetData = async () => {
            try {
                const users = await fetchData();

                if (users) {
                    setUsersData(users);
                    setDataReady(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAndSetData();
    }, []);

    function seeUsers(event) {
        event.preventDefault();
    }

    // if (!dataReady) {
    //     // Data is not ready yet, show loading or placeholder
    //     return (
    //        <Loading />
    //     );
    // }

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
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Profile Picture</TableCell>
                        <TableCell>Usermame</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell align="right">Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersData.map((user) => (

                        <TableRow key={user.id}>
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
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.firstname}</TableCell>
                            <TableCell>{user.lastname}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phoneNumber}</TableCell>
                            <TableCell align="right">{user.role}</TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={seeUsers} sx={{ mt: 3 }}>
                See more users
            </Link>
        </Box>
    );
}