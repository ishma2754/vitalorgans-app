import {useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { UserCircleIcon } from "@heroicons/react/outline";

export default function Home() {
  const [cookies] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [formData, setFormData] = useState(null);

  const getFormData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/${userEmail}`
      );
      const json = await response.json();
      setFormData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getFormData();
    }
  }, []);

  const [data, setData] = useState({
    user_email: cookies.Email,
    name: "",
    age: "",
    emergencycontact: "",
    gender: "",
    medicalconditions: "",
    bloodgroup: "",
  });

  const postData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        getFormData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        getFormData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitHome = async (e) => {
    e.preventDefault();

    if (formData && formData.length > 0) {
      await updateData();
    } else {
      await postData();
    }
  };

  const handleChangeHome = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const sortedFormData = formData?.sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-900 dark:to-black flex flex-col items-center justify-center">
    <div className="flex justify-center mt-8 mb-8">
      <UserCircleIcon className="h-20 w-20 text-gray-600 dark:text-gray-300" />
    </div>

    <form className="max-w-md mx-8 lg:mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg" onSubmit={handleSubmitHome}>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            value={data.name}
            onChange={handleChangeHome}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=""
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="age"
            id="age"
            value={data.age}
            onChange={handleChangeHome}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="age"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Age
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            pattern="[789][0-9]{9}"
            name="emergencycontact"
            id="emergencycontact"
            value={data.emergencycontact}
            onChange={handleChangeHome}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="emergencycontact"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Emergency Contact
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="gender"
            id="gender"
            value={data.gender}
            onChange={handleChangeHome}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label
            htmlFor="gender"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Gender
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="bloodgroup"
            id="bloodgroup"
            value={data.bloodgroup}
            onChange={handleChangeHome}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            required
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <label
            htmlFor="bloodgroup"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Blood Group
          </label>
        </div>
      </div>

      <label
        htmlFor="medicalconditions"
        className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
      >
        Medical Conditions And Prescriptions
      </label>
      <textarea
        id="medicalconditions"
        value={data.medicalconditions}
        onChange={(e) =>
          setData((data) => ({
            ...data,
            medicalconditions: e.target.value,
          }))
        }
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 mb-6"
        placeholder=""
      ></textarea>

      <button
        type="submit"
        className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
        onSubmit={handleSubmitHome}
      >
        Submit
      </button>
    </form>

    <div className="max-w-md mx-4 lg:mx-auto bg-white dark:bg-gray-800 border-4 border-blue-500 dark:border-blue-700 rounded-lg p-4 mt-8 shadow-lg">
      <h2 className="text-lg text-gray-900 dark:text-gray-100 font-bold mb-4">USER DETAILS</h2>
      <div className="">
        {sortedFormData?.map((formDataItem) => (
          <div key={formDataItem.id} className="grid grid-cols-3 gap-4">
            <div>
              <div className="font-semibold text-gray-500 dark:text-gray-400">Name</div>
              <div className="text-gray-900 dark:text-gray-100">{formDataItem.name}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-500 dark:text-gray-400">Age</div>
              <div className="text-gray-900 dark:text-gray-100">{formDataItem.age}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-500 dark:text-gray-400">Blood Group</div>
              <div className="text-gray-900 dark:text-gray-100">{formDataItem.bloodgroup}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-500 dark:text-gray-400">Emergency Contact</div>
              <div className="text-gray-900 dark:text-gray-100">{formDataItem.emergencycontact}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-500 dark:text-gray-400">Gender</div>
              <div className="text-gray-900 dark:text-gray-100">{formDataItem.gender}</div>
            </div>
            <div className="col-span-3">
              <div className="font-semibold text-gray-500 dark:text-gray-400">Medical Conditions And Prescriptions</div>
              <div className="text-gray-900 dark:text-gray-100">{formDataItem.medicalconditions}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}