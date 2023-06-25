import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { json } from 'stream/consumers';
import ProgressBarTable from  '../components/TTest';

export default function How_to_Make_video() {
    return (
        <>

            <head>
                <Link rel="stylesheet" href="/stylesheets/tailwind.min.css" ></Link>
                <Link rel="stylesheet" href="/stylesheets/style.css" ></Link>
                <Link href="https://cdn.bootcdn.net/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></Link>

            </head>
            <body>
                <div>
                    <nav className="bg-gray-800">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                        className="h-8 w-8"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                        alt="Workflow"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                            <a href="/" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                                >Upload Examples
                                            </a>
                                            <a
                                                href="/downloads"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                >Download Examples
                                            </a>
                                            <a
                                                href="#"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                >Projects
                                            </a>
                                            <a
                                                href="#"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                >Calendar
                                            </a>
                                            <a
                                                href="#"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                >Reports
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button
                                            className="
                                                bg-gray-800
                                                p-1
                                                rounded-full
                                                text-gray-400
                                                hover:text-white
                                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
                                            "
                                        >
                                            <span className="sr-only">View notifications</span>
                                            {/* Heroicon name: outline/bell */}
                                            <svg
                                                className="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                                />
                                            </svg>
                                        </button>

                                        {/* Profile dropdown */}
                                        <div className="ml-3 relative">
                                            <div>
                                                <button
                                                type="button"
                                                className="
                                                    max-w-xs
                                                    bg-gray-800
                                                    rounded-full
                                                    flex
                                                    items-center
                                                    text-sm
                                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
                                                "
                                                id="user-menu-button"
                                                aria-expanded="false"
                                                aria-haspopup="true"
                                                >
                                                    <span className="sr-only">Open user menu</span>
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                        alt=""
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                    <button
                                        type="button"
                                        className="
                                        bg-gray-800
                                        inline-flex
                                        items-center
                                        justify-center
                                        p-2
                                        rounded-md
                                        text-gray-400
                                        hover:text-white hover:bg-gray-700
                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
                                        "
                                        aria-controls="mobile-menu"
                                        aria-expanded="false"
                                    >
                                        <span className="sr-only">Open main menu</span>
                                        <svg
                                            className="block h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                        <svg
                                            className="hidden h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="p-8 mx-auto">
                        <div id="dropzone" className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="fileUpload"
                                        className="
                                        relative
                                        cursor-pointer
                                        bg-white
                                        rounded-md
                                        font-medium
                                        text-indigo-600
                                        hover:text-indigo-500
                                        focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500
                                        "
                                    >
                                        <span>Upload a file</span>
                                        <input id="fileUpload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">For test, file size will limit to 50MB</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-8">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th scope="col" className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Chunk Progress
                                                </th>
                                                <th scope="col" className="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Progress
                                                </th>
                                                <th scope="col" className="w-2/12 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        {/*<ProgressBarTable/>
                                        
                                        <tbody id="progressBarBody" className="bg-white divide-y divide-gray-200">
                  <% if (files.length > 0) { %>
                    <% files.forEach(function(file) { %>
                      <tr>
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
                              <div className="text-sm font-medium text-gray-900"><%= file.name %></div>
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
                                  style="width: 100%;"
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
                          <a href="#" className="sr-only text-indigo-600 hover:text-indigo-900">Pause</a>
                          <a href="#" className="sr-only ml-2 text-indigo-600 hover:text-indigo-900">Cancel</a>
                        </td>
                      </tr>
                    <% });%>
                  <% } else { %>
                    <tr id="emptyArea">
                      <td colspan="5">
                        <div className="flex justify-center items-center py-32">
                          <div className="text-sm font-medium text-gray-900">
                            Empty List, try to <label for="fileUpload" className="text-indigo-600 hover:text-indigo-900 cursor-pointer">upload</label> some files!
                          </div>
                        </div>
                      </td>
                    </tr>
                  <% } %>

                                        </tbody>
                                        */}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <script src="/dist/vendor.min.js"></script>
                <script src="/dist/upload.min.js"></script>
            </body>

        </>
    )
}

