const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const My = require('jm-ez-mysql');
const sharp = require('sharp');
const { PROPERTY_IMAGE_DIR, THUMB } = require('./constants');
const { ATTACHMENT, ATTACHMENT_THUMB } = require('./tables');

const media = {};

media.uploadFile = async (file) => {
    try {
        const rootPath = `${__dirname}/../`;
        const uploadPath = `${PROPERTY_IMAGE_DIR}/${uuid.v1()}`;
        const uploadDirPath = path.resolve(rootPath, uploadPath);
        fs.mkdirSync(uploadDirPath);
        const attachmentId = await media.moveOrignalFile(file, rootPath, uploadPath);
        return attachmentId;
    } catch(err) {
        throw err;
    }
}

media.moveOrignalFile = async (file, rootPath, uploadPath) => {
    try {
        const ext = path.extname(file.name);
        const fileName = `image${ext}`;
        const destinationPath = `${rootPath}/${uploadPath}/${fileName}`;
        await file.mv(destinationPath);
        const attachmentData = {
            path: `${uploadPath}/${fileName}`
        };
        const insertedAttachment = await My.insert(ATTACHMENT, attachmentData);
        if (insertedAttachment.insertId) {
            await media.moveThumbFile(file, rootPath, uploadPath, insertedAttachment.insertId);
            return insertedAttachment.insertId;
        }
    } catch (err) {
        throw err;
    }
}

media.moveThumbFile = (file, rootPath, uploadPath, attachmentId) => {
    try {
        return new Promise((resolve, reject) => {
            const ext = path.extname(file.name);
            const fileName = `image_thumb${ext}`;
            const destinationPath = `${rootPath}/${uploadPath}/${fileName}`;
            sharp(file.data).resize(THUMB.WIDTH, THUMB.HEIGHT).toFile(destinationPath, async (err, data) => {
                if (err) {
                    return reject(err);
                }
                const attachmentThumbData = {
                    path: `${uploadPath}/${fileName}`,
                    attachmentId
                };
                await My.insert(ATTACHMENT_THUMB, attachmentThumbData);
                return resolve(data);
            })
        });
    } catch (err) {
        throw err;
    }
}

module.exports = media;