const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    contactName: {
      type: String,
      required: true,
      trim: true,
    },

    contactDetails: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    website: {
      type: String,
      trim: true,
    },

    businessType: {
      type: String,
      required: true,
      trim: true,
    },

    businessAddress1: {
      type: String,
      required: true,
      trim: true,
    },

    businessAddress2: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    pinCode: {
      type: String,
      required: true,
      trim: true,
    },

    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
    },

    serviceArea: {
      type: String,
      required: true,
      trim: true,
    },

    natureOfServices: {
      type: String,
      trim: true,
    },

    panNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    gstNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      trim: true,
    },

    documents: {
      businessRegistrationCertificate: {
        type: String,
      },

      panCard: {
        type: String,
      },

      aadhaarCard: {
        type: String,
      },

      gstCertificate: {
        type: String,
      },

      travelLicense: {
        type: String,
      },

      bankAccountProof: {
        type: String,
      },

      fssaiLicense: {
        type: String,
      },

      officeAddressProof: {
        type: String,
      },

      officePhotograph: {
        type: String,
      },
    },

    escalationMatrix: [
      {
        level: {
          type: Number,
          required: true,
        },

        name: {
          type: String,
          trim: true,
        },

        designation: {
          type: String,
          trim: true,
        },

        phone: {
          type: String,
          trim: true,
        },

        email: {
          type: String,
          trim: true,
          lowercase: true,
        },

        responseTime: {
          type: String,
          trim: true,
        },
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vendor", vendorSchema);