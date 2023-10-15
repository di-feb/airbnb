import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Avatar, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';


export default function UsersTable() {

    const [usersData, setUsersData] = React.useState([]);

    const usersPerPage = 5; // Number of users to display per page
    const [currentPage, setCurrentPage] = React.useState(1); // Number of current page

    // Indexes for the users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    // Modify the users table so we can show a specific number of users.
    const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

    const totalPageCount = Math.ceil(usersData.length / usersPerPage);

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    const fetchData = async () => {
        try {

            const accessToken = localStorage.getItem('accessToken');
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            console.log(accessToken)
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

                if (users)
                    setUsersData(users);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAndSetData();
    }, []);




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
                        <TableCell >Role</TableCell>

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
                            <TableCell>{user.role}</TableCell>
                
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