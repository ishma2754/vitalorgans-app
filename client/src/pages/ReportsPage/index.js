import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Document, Page } from "react-pdf"; 
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js`;

export default function ReportsPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfReports, setPdfReports] = useState([]);
  const [cookies] = useCookies(null);
  const userEmail = cookies.Email;

  useEffect(() => {
    fetchPdfReports(); 
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
    formData.append("user_email", userEmail);

    try {
      await axios.post(`${process.env.REACT_APP_SERVERURL}/ReportsPage`, formData);
      alert("PDF file uploaded successfully");
      fetchPdfReports();
    } catch (error) {
      console.error(error);
      alert("Failed to upload the PDF file");
    }
  };

  const fetchPdfReports = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVERURL}/ReportsPage/${userEmail}`
      );
      setPdfReports(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch PDF reports");
    }
  };

  const deletePDF = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVERURL}/ReportsPage/${id}`);
      
      if (response.status === 200) {
        fetchPdfReports(); 
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-10 mb-40 mx-8 ">
      <div className="mb-6">
        <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        <button
          onClick={handleUpload}
          className="text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4 mb-8 dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-900"
        >
          Upload PDF
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {pdfReports.map((report) => (
          <div
            key={report.id}
            className="pdf-item relative rounded-lg border-blue-500 dark:border-gray-600 bg-white dark:bg-gray-800 border-4 shadow"
          >
            <div className="pdf-details p-5 relative">
              <h3 className="font-bold text-blue-500 dark:text-blue-400">{report.file_name}</h3>
              <div className="pdf-container relative w-full h-64 overflow-hidden">
                <Document file={report.signedurl}>
                  <Page pageNumber={1} scale={0.8} />
                </Document>
              </div>
              <div className="mt-2 flex justify-between">
                <a
                  href={report.signedurl}
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-6 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
                  style={{ display: "inline-block" }}
                >
                  Download PDF
                </a>
                <button 
                  onClick={() => deletePDF(report.id)}
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
                  style={{ display: "inline-block" }}
                >
                  Delete PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
