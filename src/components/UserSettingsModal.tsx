import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  CircleStackIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  XMarkIcon,
<<<<<<< HEAD
  TrashIcon,
} from '@heroicons/react/24/outline';
=======
  TrashIcon
} from "@heroicons/react/24/outline";
>>>>>>> 9677285 (file management page)
import { Theme, UserContext } from '../UserContext';
import '../styles/UserSettingsModal.css';
import { NotificationService } from '../service/NotificationService';
import { useTranslation } from 'react-i18next';
import { Transition } from '@headlessui/react';
import EditableInstructions from './EditableInstructions';

interface UserSettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

enum Tab {
  GENERAL_TAB = 'General',
  INSTRUCTIONS_TAB = 'Instructions',
  STORAGE_TAB = 'Storage',
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ isVisible, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { userSettings, setUserSettings } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.GENERAL_TAB);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
<<<<<<< HEAD
  const [fileList, setFileList] = useState<Array<{ name: string; type: string; size: number }>>([]);
=======
  const [fileList, setFileList] = useState<Array<{ name: string, type: string, size: number }>>([]);
>>>>>>> 9677285 (file management page)
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useTranslation();
  const editableInstructionsRef = useRef<{ getCurrentValue: () => string }>(null);

  useEffect(() => {
    if (isVisible) {
      setActiveTab(Tab.GENERAL_TAB);
      loadFileList();
    }
  }, [isVisible]);

  const handleClose = () => {
    const currentInstructions = editableInstructionsRef.current?.getCurrentValue();
    setUserSettings({ ...userSettings, instructions: currentInstructions || '' });
    onClose();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const fileData = await selectedFile.arrayBuffer();
        const fileInfo = {
          name: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size,
<<<<<<< HEAD
          data: Array.from(new Uint8Array(fileData)),
        };
        localStorage.setItem(`uploadedFile_${selectedFile.name}`, JSON.stringify(fileInfo));
        NotificationService.handleSuccess('File uploaded successfully.');
=======
          data: Array.from(new Uint8Array(fileData))
        };
        localStorage.setItem(`uploadedFile_${selectedFile.name}`, JSON.stringify(fileInfo));
        NotificationService.handleSuccess("File uploaded successfully.");
>>>>>>> 9677285 (file management page)
        setSelectedFile(null);
        loadFileList();
      } catch (error) {
        console.error('Failed to upload file:', error);
        NotificationService.handleUnexpectedError(new Error('Failed to upload file'));
      }
    }
  };

  const loadFileList = () => {
<<<<<<< HEAD
    const files: Array<{ name: string; type: string; size: number }> = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('uploadedFile_')) {
        try {
          const fileInfo = JSON.parse(localStorage.getItem(key) || '{}');
          if (fileInfo.name && fileInfo.type && fileInfo.size) {
            files.push({
              name: fileInfo.name,
              type: fileInfo.type,
              size: fileInfo.size,
            });
          } else {
            console.warn(`Invalid file info for key: ${key}`);
          }
        } catch (error) {
          console.error(`Failed to parse file info for key: ${key}`, error);
        }
=======
    const files = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('uploadedFile_')) {
        const fileInfo = JSON.parse(localStorage.getItem(key) || '{}');
        files.push({ name: fileInfo.name, type: fileInfo.type, size: fileInfo.size });
>>>>>>> 9677285 (file management page)
      }
    }
    setFileList(files);
  };

  const handleFileDelete = (fileName: string) => {
    localStorage.removeItem(`uploadedFile_${fileName}`);
<<<<<<< HEAD
    NotificationService.handleSuccess('File deleted successfully.');
=======
    NotificationService.handleSuccess("File deleted successfully.");
>>>>>>> 9677285 (file management page)
    loadFileList();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  return (
    <Transition show={isVisible} as={React.Fragment}>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 px-4">
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
<<<<<<< HEAD
          <div
            ref={dialogRef}
            className="flex flex-col bg-white dark:bg-gray-850 rounded-lg w-full max-w-2xl mx-auto overflow-hidden"
            style={{ height: '90vh', width: '170vh' }}
          >
            <div
              id="user-settings-header"
              className="flex justify-between items-center border-b border-gray-200 p-4"
            >
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('settings-header')}
              </h1>
              <button
                onClick={handleClose}
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <XMarkIcon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
            <div id="user-settings-content" className="flex flex-1 overflow-auto relative">
=======
          <div ref={dialogRef}
            className="flex flex-col bg-white dark:bg-gray-850 rounded-lg w-full max-w-lg mx-auto overflow-hidden"
            style={{ height: "90vh", width: "150vh" }}>
            <div id='user-settings-header'
              className="flex justify-between items-center border-b border-gray-200 p-4">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{t('settings-header')}</h1>
              <button onClick={handleClose}
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                <XMarkIcon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
            <div id='user-settings-content' className="flex flex-1 overflow-auto relative">
>>>>>>> 9677285 (file management page)
              <div className="border-r border-gray-200 flex flex-col">
                <div
                  className={`cursor-pointer p-4 flex items-center ${
                    activeTab === Tab.GENERAL_TAB ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                  onClick={() => setActiveTab(Tab.GENERAL_TAB)}
                >
                  <Cog6ToothIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  {t('general-tab')}
                </div>
                <div
<<<<<<< HEAD
                  className={`cursor-pointer p-4 flex items-center ${
                    activeTab === Tab.INSTRUCTIONS_TAB ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                  onClick={() => setActiveTab(Tab.INSTRUCTIONS_TAB)}
                >
                  <DocumentTextIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  {t('instructions-tab')}
=======
                  className={`cursor-pointer p-4 flex items-center ${activeTab === Tab.INSTRUCTIONS_TAB ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveTab(Tab.INSTRUCTIONS_TAB)}>
                  <DocumentTextIcon className="w-4 h-4 mr-3" aria-hidden="true" />{t('instructions-tab')}
>>>>>>> 9677285 (file management page)
                </div>
                <div
                  className={`cursor-pointer p-4 flex items-center ${
                    activeTab === Tab.STORAGE_TAB ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                  onClick={() => setActiveTab(Tab.STORAGE_TAB)}
                >
                  <CircleStackIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  {t('storage-tab')}
                </div>
              </div>
<<<<<<< HEAD
              <div className="flex-1 p-4">
                {activeTab === Tab.GENERAL_TAB && (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="theme">{t('theme-label')}</label>
                      <select
                        id="theme"
                        name="theme"
                        className="custom-select dark:custom-select border-gray-300 border rounded p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        value={userSettings.userTheme}
                        onChange={(e) => {
                          setUserSettings({
                            ...userSettings,
                            userTheme: e.target.value as Theme,
                          });
                        }}
                      >
                        <option value="dark">{t('dark-option')}</option>
                        <option value="light">{t('light-option')}</option>
                        <option value="system">{t('system-option')}</option>
                      </select>
                    </div>
                  </div>
                )}
                {activeTab === Tab.INSTRUCTIONS_TAB && (
                  <EditableInstructions
                    ref={editableInstructionsRef}
                    initialValue={userSettings.instructions || ''}
                    placeholder={t('instructions-placeholder')}
                  />
                )}
                {activeTab === Tab.STORAGE_TAB && (
                  <>
                    <div className="file-upload-box p-4 border-2 border-dashed rounded-lg">
                      <div
                        className={`drag-drop-area p-2 border-2 border-dashed rounded-lg ${
                          isDragging ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        {selectedFile ? (
                          <div className="file-info text-center text-gray-700 dark:text-gray-300">
                            <p>Selected File: {selectedFile.name}</p>
                            <p>Type: {selectedFile.type}</p>
                            <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                          </div>
                        ) : (
                          <>
                            <p className="text-center text-gray-500 dark:text-gray-400">
                              Drag and drop your files here
                            </p>
                            <p className="text-center text-gray-500 dark:text-gray-400">or</p>
                          </>
                        )}
                        <div className="text-center">
                          <label className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                            Choose File
                            <input type="file" onChange={handleFileSelect} className="hidden" />
                          </label>
                        </div>
                      </div>
                      <div className="upload-button-box mt-4 text-center">
                        <button
                          onClick={handleFileUpload}
                          disabled={!selectedFile}
                          className="block w-full text-sm text-white bg-blue-500 rounded-lg border border-blue-500 cursor-pointer dark:text-white focus:outline-none dark:bg-blue-700 dark:border-blue-700 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Upload to Storage
                        </button>
                      </div>
=======
              <div className="flex-1 p-4 flex flex-col">
                <div className={`${activeTab === Tab.GENERAL_TAB ? 'flex flex-col flex-1' : 'hidden'}`}>
                  {/* General settings content */}
                </div>
                <div className={`${activeTab === Tab.INSTRUCTIONS_TAB ? 'flex flex-col flex-1' : 'hidden'}`}>
                  {/* Instructions settings content */}
                </div>
                <div className={`${activeTab === Tab.STORAGE_TAB ? 'flex flex-col flex-1' : 'hidden'}`}>
                  <div className="file-upload-box p-4 border-2 border-dashed rounded-lg mb-4 mx-auto">
                    <div
                      className={`drag-drop-area p-2 border-2 border-dashed rounded-lg ${isDragging ? 'border-blue-500' : 'border-gray-300'}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {selectedFile ? (
                        <div className="file-info text-center text-gray-700 dark:text-gray-300">
                          <p>Selected File: {selectedFile.name}</p>
                          <p>Type: {selectedFile.type}</p>
                          <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                        </div>
                      ) : (
                        <>
                          <p className="text-center text-gray-500 dark:text-gray-400">Drag and drop your files here</p>
                          <p className="text-center text-gray-500 dark:text-gray-400">or</p>
                        </>
                      )}
                      <div className="text-center">
                        <label className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                          Choose File
                          <input type="file" onChange={handleFileSelect} className="hidden" />
                        </label>
                      </div>
                    </div>
                    <div className="upload-button-box mt-4 text-center">
                      <button onClick={handleFileUpload} disabled={!selectedFile} className="block w-full text-sm text-white bg-blue-500 rounded-lg border border-blue-500 cursor-pointer dark:text-white focus:outline-none dark:bg-blue-700 dark:border-blue-700 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        Upload to Storage
                      </button>
                    </div>
                  </div>
                  <div className="setting-panel mt-4 flex-1">
                    <h4 className="text-md mb-2 text-gray-900 dark:text-white">Uploaded Files:</h4>
                    <div className="overflow-y-auto">
                      <table className="min-w-full bg-white dark:bg-gray-850 rounded-lg shadow-md table-fixed">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-white w-1/4">Name</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-white w-1/4">Type</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-white w-1/4">Size</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-white w-1/4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fileList.length > 0 ? (
                            fileList.map((file, index) => (
                              <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="py-2 px-4 text-sm text-gray-900 dark:text-white flex items-center truncate">
                                  <FileIcon fileType={file.type} />
                                  <span className="file-name truncate" title={file.name}>{file.name}</span>
                                </td>
                                <td className="py-2 px-4 text-sm text-gray-900 dark:text-white truncate">{file.type}</td>
                                <td className="py-2 px-4 text-sm text-gray-900 dark:text-white text-right truncate">{(file.size / 1024).toFixed(2)} KB</td>
                                <td className="py-2 px-4 text-sm text-gray-900 dark:text-white truncate">
                                  <button onClick={() => handleFileDelete(file.name)} className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-700">
                                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="py-4 text-center text-gray-500 dark:text-gray-400">
                                No files
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
>>>>>>> 9677285 (file management page)
                    </div>
                    <div className="mt-4">
                      <h4>Uploaded Files:</h4>
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fileList.length > 0 ? (
                            fileList.map((file, index) => (
                              <tr key={index}>
                                <td title={file.name}>{file.name}</td>
                                <td>{file.type}</td>
                                <td>{(file.size / 1024).toFixed(2)} KB</td>
                                <td className="py-2 px-4 text-sm text-gray-900 dark:text-white w-1/4 truncate">
                                  <button
                                    onClick={() => handleFileDelete(file.name)}
                                    className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-700"
                                  >
                                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={4}
                                className="py-2 px-4 text-sm text-gray-900 dark:text-white text-center"
                              >
                                No files found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

const FileIcon: React.FC<{ fileType: string }> = ({ fileType }) => {
  switch (fileType) {
    case 'application/pdf':
      return <span className="mr-2 text-red-500">PDF</span>;
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return <span className="mr-2 text-green-500">XLSX</span>;
    default:
      return <span className="mr-2 text-gray-500">FILE</span>;
  }
};

export default UserSettingsModal;