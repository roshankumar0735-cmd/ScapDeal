// src/utils/errorMessages.js
export const ErrorMessages = {
    required: (field) => `${field} is required.`,
    invalidPhone: "Please enter a valid 10-digit mobile number.",
    invalidEmail: "Please enter a valid email address.",
    invalidPassword:
      "Password must start with a letter, contain letters/digits, include @, and end with numbers. Example: axyz@123",
    shortName: "Name must be at least 3 characters long.",
    invalidPickupId: "Invalid Pickup ID. Please check and try again.",
    serverError: "Server error. Please try again.",
    networkError: "Network connection failed. Please check your internet.",
    notFound: "No record found.",
  };
  