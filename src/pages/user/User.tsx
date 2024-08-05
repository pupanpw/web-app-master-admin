// import React, { useState, useEffect } from 'react';

// const Users: React.FC = () => {
//     const [data, setData] = useState<any[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const apiUrl = 'https://api.example.com/users';

//         const fetchData = async () => {
//             try {
//                 const response = await fetch(apiUrl);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const result = await response.json();
//                 setData(result);
//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             } catch (error: any) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h2>Users Page</h2>
//             <ul>
//                 {data.map((user) => (
//                     <li key={user.id}>{user.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Users;
