import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { FaUser, FaImage } from "react-icons/fa";
import axios from "axios";
import useAxios from "../../../Hook/useAxios";
import { AuthContex } from "../../../../Contex/AuthProvider";


const UpdateProfile = () => {
  const { user, upDateUser, setUser } = useContext(AuthContex);
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let imageUrl = user?.photoURL;

      // 👉 যদি user নতুন ছবি দেয়
      if (data.photoURL?.length > 0) {
        const formData = new FormData();
        formData.append("image", data.photoURL[0]);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMG}`,
          formData
        );

        imageUrl = res.data.data.url;
      }

      // 👉 Firebase profile update
      await upDateUser({
        displayName: data.name,
        photoURL: imageUrl,
      });

      // 👉 Local state update (instant UI update)
      setUser({
        ...user,
        displayName: data.name,
        photoURL: imageUrl,
      });

      // 👉 Backend DB update (optional but recommended)
      await axiosInstance.patch("/user/profile", {
        email: user.email,
        name: data.name,
        photo: imageUrl,
      });

      alert("Profile updated successfully 🎉");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-md mx-auto bg-surface p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-extrabold text-center text-primary mb-6">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                className="w-full py-3 pl-10 pr-4 rounded-lg border bg-background"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-error text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Profile Picture
            </label>
            <div className="relative">
              <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="file"
                className="w-full py-3 pl-10 pr-4 rounded-lg border bg-background"
                {...register("photoURL")}
              />
            </div>
          </div>

          {/* Current Image Preview */}
          {user?.photoURL && (
            <div className="flex justify-center">
              <img
                src={user.photoURL}
                alt="profile"
                className="w-20 h-20 rounded-full border-2 border-primary object-cover"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
