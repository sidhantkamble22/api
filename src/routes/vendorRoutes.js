const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  registerVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendorController");

const router = express.Router();

const uploadPath = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const documentFields = [
  { name: "businessRegistrationCertificate", maxCount: 1 },
  { name: "panCard", maxCount: 1 },
  { name: "aadhaarCard", maxCount: 1 },
  { name: "gstCertificate", maxCount: 1 },
  { name: "travelLicense", maxCount: 1 },
  { name: "bankAccountProof", maxCount: 1 },
  { name: "fssaiLicense", maxCount: 1 },
  { name: "officeAddressProof", maxCount: 1 },
  { name: "officePhotograph", maxCount: 1 },
];

/**
 * @swagger
 * /api/vendors/register:
 *   post:
 *     summary: Register a new vendor
 *     tags: [Vendors]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - businessName
 *               - contactName
 *               - contactDetails
 *               - email
 *               - businessType
 *               - businessAddress1
 *               - city
 *               - country
 *               - pinCode
 *               - yearsOfExperience
 *               - serviceArea
 *               - panNumber
 *               - gstNumber
 *               - licenseNumber
 *           encoding:
 *             escalationMatrix:
 *               contentType: application/json
 *     responses:
 *       201:
 *         description: Vendor registered successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.post(
  "/register",
  upload.fields(documentFields),
  registerVendor
);

/**
 * @swagger
 * /api/vendors:
 *   get:
 *     summary: Get all vendors
 *     tags: [Vendors]
 *     responses:
 *       200:
 *         description: Vendors fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/", getVendors);

/**
 * @swagger
 * /api/vendors/{id}:
 *   get:
 *     summary: Get vendor by ID
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor fetched successfully
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getVendorById);

/**
 * @swagger
 * /api/vendors/{id}:
 *   put:
 *     summary: Update vendor
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor updated successfully
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateVendor);

/**
 * @swagger
 * /api/vendors/{id}:
 *   delete:
 *     summary: Delete vendor
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor deleted successfully
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteVendor);

module.exports = router;