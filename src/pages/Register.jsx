import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: yup.string().required("Role is required"),
});

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      });

      // Show SweetAlert on success
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You have been successfully registered.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/"); // Redirect to home page after confirmation
      });
    } catch (error) {
      // Show SweetAlert on error
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            {...register("firstName")}
            className="w-full p-2 border rounded"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            {...register("lastName")}
            className="w-full p-2 border rounded"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Role</label>
          <select {...register("role")} className="w-full p-2 border rounded">
            <option value="manager">Manager</option>
            <option value="team-member">Team Member</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
