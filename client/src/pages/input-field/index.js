import { useContext } from "react";
import { GlobalContext } from "../../context/index";

export default function Input() {
  const { dataInput, handleChange, handleSubmit } = useContext(GlobalContext);

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-6 mt-8">
        <div className="grid gap-6 mb-6 md:grid-cols-3 mt-6">
          <input
            type="date"
            name="date"
            id="date"
            value={dataInput.date}
            onChange={handleChange}
            className="bg-gray-50 dark:bg-gray-700 border-2 border-purple-500 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="Select a date"
            required
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="bpsys"
              className="block mb-2 text-sm font-bold text-purple-500 dark:text-purple-400"
            >
              BP SYS / mmHg
            </label>
            <input
              type="number"
              name="bpsys"
              id="bpsys"
              value={dataInput.bpsys}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border-2 border-purple-500 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="bpdia"
              className="block mb-2 text-sm font-bold text-purple-500 dark:text-purple-400"
            >
              BP DIA / mmHg
            </label>
            <input
              type="number"
              name="bpdia"
              id="bpdia"
              value={dataInput.bpdia}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border-2 border-purple-500 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="pulserate"
              className="block mb-2 text-sm font-bold text-purple-500 dark:text-purple-400"
            >
              Pulse Rate beats/min
            </label>
            <input
              type="number"
              name="pulserate"
              id="pulserate"
              value={dataInput.pulserate}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border-2 border-purple-500 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="totalcholesterol"
              className="block mb-2 text-sm font-bold text-purple-500 dark:text-purple-400"
            >
              Total Cholesterol mg/dL
            </label>
            <input
              type="number"
              name="totalcholesterol"
              id="totalcholesterol"
              value={dataInput.totalcholesterol}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border-2 border-purple-500 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="hdlcholesterol"
              className="block mb-2 text-sm font-bold text-purple-500 dark:text-purple-400"
            >
              HDL Cholesterol mg/dL
            </label>
            <input
              type="number"
              name="hdlcholesterol"
              id="hdlcholesterol"
              value={dataInput.hdlcholesterol}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border-2 border-purple-500 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="ldlcholesterol"
              className="block mb-2 text-sm font-bold text-purple-500 dark:text-purple-400"
            >
              LDL Cholesterol mg/dL
            </label>
            <input
              type="number"
              name="ldlcholesterol"
              id="ldlcholesterol"
              value={dataInput.ldlcholesterol}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border-2 border-purple-500 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="bloodglucosefasting"
              className="block mb-2 text-sm font-bold text-purple-500 dark:text-purple-400"
            >
              Blood Glucose(Fasting) mg/dL
            </label>
            <input
              type="number"
              name="bloodglucosefasting"
              id="bloodglucosefasting"
              value={dataInput.bloodglucosefasting}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border-2 border-purple-500 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="bloodglucosepp"
              className="block mb-2 text-sm font-bold text-purple-500 dark:text-purple-400"
            >
              Blood Glucose(PP) mg/dL
            </label>
            <input
              type="number"
              name="bloodglucosepp"
              id="bloodglucosepp"
              value={dataInput.bloodglucosepp}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border-2 border-purple-500 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="creatinine"
              className="block mb-2 text-sm font-bold text-purple-500 dark:text-purple-400"
            >
              Creatinine µmol/l
            </label>
            <input
              type="number"
              name="creatinine"
              id="creatinine"
              value={dataInput.creatinine}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border-2 border-purple-500 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-8 dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-900"
        >
          Submit
        </button>
      </form>
    </>
  );
}
