const Vendor = require("../models/Vendor");

const registerVendor = async (req, res) => {
  try {
    const {
      businessName,
      contactName,
      contactDetails,
      email,
      website,
      businessType,
      businessAddress1,
      businessAddress2,
      city,
      country,
      pinCode,
      yearsOfExperience,
      serviceArea,
      natureOfServices,
      panNumber,
      gstNumber,
      licenseNumber,
      escalationMatrix,
    } = req.body;

    if (
      !businessName ||
      !contactName ||
      !contactDetails ||
      !email ||
      !businessType ||
      !businessAddress1 ||
      !city ||
      !country ||
      !pinCode ||
      yearsOfExperience === undefined ||
      !serviceArea ||
      !panNumber ||
      !gstNumber ||
      !licenseNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required vendor details.",
      });
    }

    const documents = {};

    if (req.files) {
      Object.keys(req.files).forEach((fieldName) => {
        if (req.files[fieldName]?.[0]) {
          documents[fieldName] = req.files[fieldName][0].filename;
        }
      });
    }

    let parsedEscalationMatrix = [];

    if (escalationMatrix) {
      try {
        parsedEscalationMatrix =
          typeof escalationMatrix === "string"
            ? JSON.parse(escalationMatrix)
            : escalationMatrix;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid escalationMatrix JSON.",
        });
      }
    }

    parsedEscalationMatrix = parsedEscalationMatrix.map(
      (item, index) => ({
        level: item.level || index + 1,
        name: item.name || "",
        designation: item.designation || "",
        phone: item.phone || "",
        email: item.email || "",
        responseTime: item.responseTime || "",
      })
    );

    const vendor = await Vendor.create({
      businessName,
      contactName,
      contactDetails,
      email,
      website,
      businessType,
      businessAddress1,
      businessAddress2,
      city,
      country,
      pinCode,
      yearsOfExperience: Number(yearsOfExperience),
      serviceArea,
      natureOfServices,
      panNumber,
      gstNumber,
      licenseNumber,
      documents,
      escalationMatrix: parsedEscalationMatrix,
    });

    return res.status(201).json({
      success: true,
      message: "Vendor registered successfully.",
      data: vendor,
    });
  } catch (error) {
    console.error("Vendor registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Vendor registration failed.",
      error: error.message,
    });
  }
};

const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: vendors.length,
      data: vendors,
    });
  } catch (error) {
    console.error("Get vendors error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch vendors.",
      error: error.message,
    });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("Get vendor error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch vendor.",
      error: error.message,
    });
  }
};

const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vendor updated successfully.",
      data: vendor,
    });
  } catch (error) {
    console.error("Update vendor error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update vendor.",
      error: error.message,
    });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vendor deleted successfully.",
    });
  } catch (error) {
    console.error("Delete vendor error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete vendor.",
      error: error.message,
    });
  }
};

module.exports = {
  registerVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
};