import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import "./UpdateProfileModal.scss";

const UpdateProfileModal = ({ isOpen, onClose, currentUser, onUpdate }) => {
    const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(currentUser) {
             console.log('Current user in modal:', currentUser);
             setFormData({
                name: currentUser.name || "",
                password: "",
                confirmPassword: "",
                avatar: currentUser.avatar || "",
             });
        }
    }, [currentUser]);



    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    };



     const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống";
    }

    if (formData.password) {
      if (formData.password.length < 8) {
        newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      }
    }

    if (formData.avatar && !isValidUrl(formData.avatar)) {
      newErrors.avatar = "URL avatar không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


   const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Chỉ gửi các field có thay đổi
    const updateData = {};
    
    if (formData.name !== currentUser.name) {
      updateData.name = formData.name;
    }

    if (formData.password) {
      updateData.password = formData.password;
    }

    if (formData.avatar && formData.avatar !== currentUser.avatar) {
      updateData.avatar = formData.avatar;
    }

    // Nếu không có gì thay đổi
    if (Object.keys(updateData).length === 0) {
      toast.info("Không có thay đổi nào để cập nhật");
      setLoading(false);
      return;
    }

    console.log('Submitting update data:', updateData);
    console.log('Current user ID:', currentUser._id);


    try {
        const result = await onUpdate(updateData);
         console.log('Update result:', result);

         if (result.success) {
        toast.success("Cập nhật thông tin thành công!");
        handleClose();
      } else {
        toast.error(result.error || "Cập nhật thất bại");
      }

    } catch (error) {
        console.error('Update error:', error);
      toast.error(error.message || "Cập nhật thất bại, vui lòng thử lại");
    }
};



const handleClose = () => {
    setFormData({
      name: currentUser?.name || "",
      password: "",
      confirmPassword: "",
      avatar: currentUser?.avatar || "",
    });
    setErrors({});
    setShowPassword(false);
    onClose();
  };


    if (!isOpen) return null;


return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Cập nhật thông tin cá nhân</h2>
          <button className="modal-close" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
        
        

          {/* Avatar Preview */}
          <div className="avatar-preview">
            <img
              src={formData.avatar || "https://via.placeholder.com/120"}
              alt="Avatar"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/120";
              }}
            />
          </div>

          {/* Tên */}
          <div className="form-group">
            <label htmlFor="name">
              Tên hiển thị <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
              placeholder="Nhập tên của bạn"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Avatar URL */}
          <div className="form-group">
            <label htmlFor="avatar">URL Avatar</label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className={errors.avatar ? "error" : ""}
              placeholder="https://example.com/avatar.jpg"
            />
            {errors.avatar && <span className="error-message">{errors.avatar}</span>}
            <small className="form-hint">
              Để trống nếu không muốn thay đổi avatar
            </small>
          </div>

          <div className="form-divider">
            <span>Đổi mật khẩu (tùy chọn)</span>
          </div>

          {/* Mật khẩu mới */}
          <div className="form-group">
            <label htmlFor="password">Mật khẩu mới</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
            <small className="form-hint">
              Để trống nếu không muốn đổi mật khẩu
            </small>
          </div>

          {/* Xác nhận mật khẩu */}
          {formData.password && (
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Xác nhận mật khẩu <span className="required">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
                placeholder="Nhập lại mật khẩu mới"
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleClose}
              disabled={loading}
            >
              Hủy
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Đang lưu...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-check"></i> Lưu thay đổi
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};
export default UpdateProfileModal;