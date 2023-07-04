import * as React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

const Admin = () => {
  const [openNotify, setOpenNotify] = React.useState(false);

  const handleClickOpenNotify = () => {
    setOpenNotify(true);
  };

  const handleCloseNotify = () => {
    setOpenNotify(false);
  };

  return (
    <div>
      <button className="addToCart__btn" onClick={handleClickOpenNotify}>
        Xóa
      </button >
      <Dialog
        open={openNotify}
        onClose={handleCloseNotify}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thông báo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa sản phẩm ra khỏi giỏ hàng ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="addToCart__btn" onClick={handleCloseNotify}>Hủy</button>
          <button className="addToCart__btn" onClick={handleCloseNotify}>
            Đồng ý
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Admin