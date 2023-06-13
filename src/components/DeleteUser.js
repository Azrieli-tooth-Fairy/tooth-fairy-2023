import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import './DeleteUser.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map((doc) =>{let data = doc.data(); data.docId = doc.id; return data});
        setUsers(usersList);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      if (searchId.trim() === '') {
        setFilteredUsers(users);
      } else {
        const filtered = users.filter(
          (user) => user.id && user.id.toLowerCase().indexOf(searchId.toLowerCase()) !== -1
        );
        setFilteredUsers(filtered);
      }
    };
  
    filterUsers();
  }, [searchId, users]);
  

  const deleteUser = async (id) => {
    try {
      const docRef = doc(db, 'users', id);
      await deleteDoc(docRef);
      console.log('User deleted successfully');
      alert("User deleted successfully");
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };
  
  return (
    <div className="UsersList">
      {/*  */}
      <h2>רשימת משתמשים</h2>
      {filteredUsers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>פעולות</th>
              <th>תפקיד</th>
              <th>שם מלא</th> {/* Add a column for actions */}
            </tr>
          </thead>
          <tbody>
          {filteredUsers.map((user, index) => (
          <tr key={index}>
            <td>
              <button className="delete-button" onClick={() => deleteUser(user.docId)}>מחק משתמש</button>
            </td>
            <td>{user.role}</td>
            <td>{user.full_name}</td>
            
          </tr>
        ))}
          </tbody>
        </table>
      ) : (
        <p>לא נמצאו משתמשים</p>
      )}
    </div>
  );
};

export default UserList;
