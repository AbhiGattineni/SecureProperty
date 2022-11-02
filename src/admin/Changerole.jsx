import React, { useEffect } from 'react'
import { useState } from 'react'
import { db, usersDbRef } from "../firebase";
import { doc, getDocs, updateDoc } from 'firebase/firestore';

function Changerole() {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('')
    const [changeUser, setChangeUser] = useState('');
    const [button, setButton] = useState(true);

    const handleChangeUsers = () => {
        const updateDocRef = doc(db, 'users', userId);
        updateDoc(updateDocRef, { role: changeUser })
            .then(response => {
                alert("Updated")
                setButton(true)
            })
            .catch(error => {
                alert("error")
            })
    }
    const editClick = () => {
        button === true ? setButton(false) : setButton(true);
    };
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersDbRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getUsers()
    }, [])
    return (
        <div className="container px-14">
            <div className='py-3'>Change Role</div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Role
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map((user, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {user.fullName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {user.emailAddress}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                <select defaultValue={user.role} disabled={button} onChange={e => (setChangeUser(e.target.value), setUserId(user.id))} className="p-2 text-black bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                                                    <option value='User' selected={true}>User</option>
                                                    <option value='Admin' selected={false}>Admin</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                <button onClick={editClick} className='bg-gray-200 px-3 p-2 rounded'>Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <button className='bg-blue-500 p-2 text-white rounded' onClick={handleChangeUsers}>UPDATE</button>
        </div>
    )
}

export default Changerole;