import React, { useEffect, useState } from 'react';
import { getUserPaging, deleteUser } from '../../../services/user.service';
import { toast } from 'react-toastify';
import './ManageUser.scss';
import { FaTrash, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const ManageUser = () => {
    const [listUsers, setListUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const LIMIT = 15; // Giới hạn 15 user/trang

    // Hàm gọi API
    const fetchListUsers = async (pageNo) => {
        try {
            const res = await getUserPaging(pageNo, LIMIT);
            console.log("🔥 CHECK DATA API:", res);

            // Xử lý nhiều định dạng trả về từ API
            if (res && res.data && res.data.items) {
                setListUsers(res.data.items);
                setTotalPages(res.data.totalPages);
            } else if (res && res.items) {
                setListUsers(res.items);
                setTotalPages(res.totalPages);
            } else if (Array.isArray(res)) {
                setListUsers(res);
            } else if (res.data && Array.isArray(res.data)) {
                setListUsers(res.data);
            } else {
                setListUsers([]);
            }
        } catch (error) {
            console.log(error);
            toast.error("Lỗi khi tải danh sách user");
        }
    };

    useEffect(() => {
        fetchListUsers(page);
    }, [page]);

    // Chuyển trang
    const handlePageClick = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages && pageNumber !== page) {
            setPage(pageNumber);
        }
    };

    // Xóa User
    const handleDeleteUser = async (user) => {
        if (!window.confirm(`Bạn có chắc chắn muốn xóa user: ${user.email}?`)) {
            return;
        }
        try {
            await deleteUser(user._id);
            toast.success("Xóa thành công user: " + user.email);
            fetchListUsers(page);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Xóa thất bại");
        }
    };

    // Format ngày
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    // Tạo danh sách số trang để hiển thị (tối đa 7 số, có ...)
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 7;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            const half = Math.floor(maxVisible / 2);
            let start = page - half;
            let end = page + half;

            if (start < 2) {
                start = 1;
                end = maxVisible - 1;
            }
            if (end > totalPages - 1) {
                end = totalPages;
                start = totalPages - maxVisible + 2;
            }

            if (start > 1) {
                pages.push(1);
                if (start > 2) pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages) {
                if (end < totalPages - 1) pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="manage-user-container">
            <div className="title">Quản lý Users</div>

            <div className="users-content">
                <div className="table-users-container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">User Info</th>
                                <th scope="col">Role</th>
                                <th scope="col" className="text-center">Level / XP</th>
                                <th scope="col">Ngày tạo</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ? (
                                listUsers.map((item, index) => (
                                    <tr key={`user-${index}`}>
                                        {/* User Info */}
                                        <td>
                                            <div className="user-info-cell">
                                                <div className="avatar-wrapper">
                                                    {item.avatar ? (
                                                        <img src={item.avatar} alt="avatar" />
                                                    ) : (
                                                        <div className="avatar-placeholder">
                                                            {item.name ? item.name.charAt(0).toUpperCase() : "U"}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-info">
                                                    <span className="user-name">{item.name || "No Name"}</span>
                                                    <span className="user-email">{item.email}</span>
                                                    <span className="user-id">ID: {item._id}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td>
                                            <span className={`badge-role ${item.role ? item.role.toLowerCase() : 'user'}`}>
                                                {item.role || 'user'}
                                            </span>
                                        </td>

                                        {/* Level & XP */}
                                        <td className="text-center">
                                            <div className="xp-cell">
                                                <div className="level-badge">LV.{item.level || 1}</div>
                                                <div className="xp-text">{item.xpPoints || 0} XP</div>
                                            </div>
                                        </td>

                                        {/* Ngày tạo */}
                                        <td>{formatDate(item.createdAt || item.createdAT)}</td>

                                        {/* Hành động - chỉ còn Xóa */}
                                        <td>
                                            <div className="actions-cell">
                                                <button
                                                    className="btn-action btn-delete"
                                                    title="Xóa"
                                                    onClick={() => handleDeleteUser(item)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center empty-state">
                                        Không có dữ liệu user nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PHÂN TRANG - ĐÃ SỬA ĐỂ NẰM NGANG ĐẸP */}
                {totalPages > 1 && (
                    <div className="pagination-wrapper">
                        <button
                            className="btn-page prev"
                            onClick={() => handlePageClick(page - 1)}
                            disabled={page === 1}
                        >
                            <FaAngleLeft />
                        </button>

                        {getPageNumbers().map((p, idx) => (
                            <button
                                key={idx}
                                className={`btn-page number ${p === page ? 'active' : ''} ${p === '...' ? 'dots' : ''}`}
                                onClick={() => typeof p === 'number' && handlePageClick(p)}
                                disabled={p === '...'}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            className="btn-page next"
                            onClick={() => handlePageClick(page + 1)}
                            disabled={page === totalPages}
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUser;