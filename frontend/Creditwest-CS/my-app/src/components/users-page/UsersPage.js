import React, { useEffect, useState } from "react";
import UserDetails from "./user-details/UserDetails";
import UsersTable from "./users-table/UsersTable";
import UsersFilter from "./users-filter/UsersFilter";
import useAuth from "../../hooks.js/useAuth";
import Popup from "../form-components/Popup";

const UsersPage = () => {

    const [currentUser, setCurrentUser] = useState(
        {
            id: '-',
            username: "",
            password: "",
            email: '',
            employee_id: "",
            first_name: "",
            last_name: '',
            phone: "",
            branch: "",
            groups: [],
            user_permissions: [],
            isActive: false
        }
    );

    const [search, setSearch] = useState('');
    const [searchOption, setSearchOption] = useState('Kullanıcı Adı');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); // Add state to manage filtered users
    const { auth } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [popUpOptions, setPopupOptions] = useState({});
    const [sortOrder, setSortOrder] = useState(null); // State to manage sorting

    const [newPassword, setNewPassword] = useState("")



    useEffect(() => {
        const getUsers = async () => {
            try {
                const headersList = {
                    "Authorization": `Bearer ${auth.token.access}`,
                };
                const response = await fetch('http://127.0.0.1:8000/users', { headers: headersList });
                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    const updatedUsers = data.map(user => ({ ...user, isActive: false, }));
                    setUsers(updatedUsers);
                    setFilteredUsers(updatedUsers); // Initially set filtered users as all users
                    setCurrentUser(updatedUsers[0]);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getUsers();
    }, [])

    useEffect(() => {
        const _updatedUsers = users.map(user => {
            user.id === currentUser.id ? user.isActive = true : user.isActive = false;
            return user;
        });
        setUsers(_updatedUsers); // Update filtered users
    }, [currentUser]);

    const handleSearch = () => {
        const searchValue = search.toLowerCase();
        const key = searchOption.toLowerCase().replace(" ", "_");

        const filteredUsers = users.filter(user => {
            return (
                (key === 'kullanıcı_adı' && user.username.toLowerCase().includes(searchValue)) ||
                (key === 'kimlik_numarası' && user.employee_id.toLowerCase().includes(searchValue)) ||
                (key === 'email' && user.email.toLowerCase().includes(searchValue)) ||
                (key === 'telefon_numarası' && user.phone.includes(searchValue))
            );
        });

        setFilteredUsers(filteredUsers);
    };

    const handleSort = () => {
        const key = searchOption.toLowerCase().replace(" ", "_");
        const sorted = [...filteredUsers].sort((a, b) => {
            if (sortOrder === "asc") {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });

        setFilteredUsers(sorted);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const deleteUser = async (id) => {
        try {
            const options = {
                method: "DELETE",
                headers: new Headers({ "Authorization": `Bearer ${auth.token.access}` }),
            };

            const response = await fetch(`http://127.0.0.1:8000/users/${id}/`, options);

            if (response.ok) setUsers(prevUsers => prevUsers.filter(user => user.id !== id));

            setShowPopup(false);
        } catch (e) {
            console.log(e);
        }
    };

    const updateUser = async (id) => {
        const updateUser = {
            ...currentUser,
            first_name: currentUser?.first_name[0]?.toUpperCase() + currentUser.first_name.slice(1),
            last_name: currentUser?.last_name[0]?.toUpperCase() + currentUser.last_name.slice(1),
            groups: currentUser.groups.map(group => group.id),
            user_permissions: currentUser.user_permissions.map(permission => permission.id),
            password: currentUser.password
        }

        const options = {
            method: "PUT",
            headers: new Headers({
                "Authorization": `Bearer ${auth.token.access}`,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(updateUser)
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/users/${id}/`, options);
            const data = await response.json()
            console.log(data);

            if (response.ok) {
                setUsers(prevUsers => prevUsers.map(user => user.id === id ? currentUser : user));
                setShowPopup(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <main className="user-list-page">
            <div className="user-list-container">
                <UserDetails
                    currentUser={currentUser}
                    setUsers={setUsers}
                    setCurrentUser={setCurrentUser}
                    setPopupOptions={setPopupOptions}
                    setShowPopup={setShowPopup}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                />

                <UsersFilter
                    search={search}
                    setSearch={setSearch}
                    searchOption={searchOption}
                    setSearchOption={setSearchOption}
                    handleSearch={handleSearch}
                    handleSort={handleSort}
                    setFilteredUsers={setFilteredUsers}
                    users={users}
                />

                <UsersTable setCurrentUser={setCurrentUser} users={users} />

            </div>

            <Popup
                borderColor={popUpOptions.function === 'update' ? 'green' : 'red'}
                show={showPopup}
                message={`${currentUser.username} ${popUpOptions.message}`}
                setShowPopup={setShowPopup}
                id={currentUser.id}
                isYesOrNo={true}
                onYesClick={popUpOptions.function === 'update' ? updateUser : deleteUser}
            />
        </main>
    );
};

export default UsersPage;
