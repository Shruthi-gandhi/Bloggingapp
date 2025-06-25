const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');

const storage = new GridFsStorage({
    url: 'mongodb+srv://reddivarivamsika:vams%408126@cluster0.i6e5ulm.mongodb.net/blogapp-2',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ['image/png', 'image/jpg'];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        };
    }
});

const upload = multer({ storage });


const fileUpload = multer({ storage });

module.exports = fileUpload;
