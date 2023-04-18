import Voucher from "../models/voucherModel.js";
import {uuid} from "uuidv4";

export const getVouchers = async(req, res)=>{
    try {
        const response = await Voucher.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getVoucherById = async(req, res)=>{
    try {
        const response = await Voucher.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveVoucher = async (req, res) => {
    const vouchers = req.body; // Mendapatkan data JSON yang dikirimkan dari front-end
    try {
        const promises = vouchers.map(async (voucher) => {
            await Voucher.create({
                id: uuid(),
                login: voucher.login,
                password: voucher.password,
                upTime: voucher.upTime
            });
        });
        await Promise.all(promises); // Menunggu semua operasi penyimpanan selesai
        res.status(201).json({ msg: "Vouchers Uploaded Successfully" }); // Mengirimkan response sukses
    } catch (error) {
        console.log(error.message); // Menangani kesalahan atau error
    }
};


export const updateVoucher = async(req, res)=>{
    const voucher = await Voucher.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!voucher) return res.status(404).json({msg: "No Data Found"});

    const login = req.body.login;
    const password = req.body.password;
    const upTIme = req.body.upTime;

    try {
        await Voucher.update({
            login: login,
            password: password,
            upTime: upTIme,

        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Updated Voucher successfully"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteVoucher = async(req, res)=>{
    const voucher = await Voucher.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!voucher) return res.status(404).json({msg: "No Data Found"});

    try {
        await Voucher.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Slide One Deleted Successfully"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAllVouchers = async (req, res) => {
    try {
        // Menghapus semua data di tabel Voucher
        await Voucher.destroy({
            where: {},
            truncate: true // Menggunakan truncate untuk menghapus semua data dalam tabel
        });
        res.status(200).json({ msg: "All Vouchers Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Failed to delete vouchers", error: error.message });
    }
};

