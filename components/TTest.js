import React from 'react';

const ProgressBarTable = ({ files }) => {
  if (files.length > 0) {
    return (
      <tbody id="progressBarBody" className="bg-white divide-y divide-gray-200">
        {files.map((file) => (
          <tr key={file.name}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{file.name}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="relative pt-1 w-1/2"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="overflow-hidden h-2 text-xs flex-grow rounded bg-indigo-200">
                    <div
                      style={{ width: '100%' }}
                      className="shadow-none h-full flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                    ></div>
                  </div>
                  <div className="text-right ml-1">
                    <span className="text-xs font-semibold inline-block text-indigo-600">100%</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-end">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                    file in server
                  </span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a href="#" className="sr-only text-indigo-600 hover:text-indigo-900">
                Pause
              </a>
              <a href="#" className="sr-only ml-2 text-indigo-600 hover:text-indigo-900">
                Cancel
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    );
  } else {
    return (
      <tbody id="progressBarBody" className="bg-white divide-y divide-gray-200">
        <tr id="emptyArea">
          <td colSpan="5">
            <div className="flex justify-center items-center py-32">
              <div className="text-sm font-medium text-gray-900">
                Empty List, try to{' '}
                <label htmlFor="fileUpload" className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                  upload
                </label>{' '}
                some files!
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }
};

export default ProgressBarTable;