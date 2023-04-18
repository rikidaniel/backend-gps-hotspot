import express from "express";
import {
    deleteAllVouchers,
    deleteVoucher,
    getVoucherById,
    getVouchers,
    saveVoucher,
    updateVoucher
} from "../controllers/voucherController.js";

const voucherRouter = express.Router();

voucherRouter.get('/voucher', getVouchers);
voucherRouter.get('/voucher/:id', getVoucherById);
voucherRouter.post('/voucher', saveVoucher);
voucherRouter.patch('/voucher/:id', updateVoucher);
voucherRouter.delete('/voucher/:id', deleteVoucher);
voucherRouter.delete('/voucher', deleteAllVouchers);

export default voucherRouter;