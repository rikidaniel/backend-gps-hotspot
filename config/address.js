import os from "os";


const interfaces = os.networkInterfaces();

let ipAddress;

Object.keys(interfaces).forEach((ifaceName) => {
    const iface = interfaces[ifaceName];
    iface.forEach((address) => {
        if (address.family === 'IPv4' && !address.internal) {
            ipAddress = address.address;
        }
    });
});

export const address = ipAddress;

export const port = 3002;