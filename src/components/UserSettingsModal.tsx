import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  CircleStackIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { Theme, UserContext } from '../UserContext';
import '../styles/UserSettingsModal.css';
import { OPENAI_DEFAULT_SYSTEM_PROMPT } from "../config";
import { NotificationService } from "../service/NotificationService";
import { useTranslation } from 'react-i18next';
import { Transition } from '@headlessui/react';
import { useConfirmDialog } from './ConfirmDialog';
import ConversationService from '../service/ConversationService';
import EditableInstructions from './EditableInstructions';

interface UserSettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

enum Tab {
  GENERAL_TAB = "General",
  INSTRUCTIONS_TAB = "Instructions",
  STORAGE_TAB = "Storage",
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ isVisible, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { userSettings, setUserSettings } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.GENERAL_TAB);
  const { showConfirmDialog, ConfirmDialog, isOpen } = useConfirmDialog();

  const [storageUsage, setStorageUsage] = useState<number | undefined>();
  const [storageQuota, setStorageQuota] = useState<number | undefined>();
  const [percentageUsed, setPercentageUsed] = useState<number | undefined>();
  const { t } = useTranslation();
  const editableInstructionsRef = useRef<{ getCurrentValue: () => string }>(null);

  useEffect(() => {
    if (isVisible) {
      setActiveTab(Tab.GENERAL_TAB);
    }
  }, [isVisible]);

  const formatBytesToMB = (bytes?: number) => {
    if (typeof bytes === 'undefined') {
      return;
    }
    const megabytes = bytes / 1024 / 1024;
    return `${megabytes.toFixed(2)} MB`;
  };

  const handleDeleteAllConversations = async () => {
    showConfirmDialog({
      message: 'Are you sure you want to delete all conversations? This action cannot be undone.',
      confirmText: 'Delete',
      confirmButtonVariant: 'critical',
      onConfirm: async () => {
        try {
          await ConversationService.deleteAllConversations();
          NotificationService.handleSuccess("All conversations have been successfully deleted.");
        } catch (error) {
          console.error('Failed to delete all conversations:', error);
          if (error instanceof Error) {
            NotificationService.handleUnexpectedError(error, "Failed to delete all conversations");
          } else {
            NotificationService.handleUnexpectedError(new Error('An unknown error occurred'), "Failed to delete all conversations");
          }
        }
      },
    })
  };

  const handleClose = () => {
    const currentInstructions = editableInstructionsRef.current?.getCurrentValue();
    setUserSettings({ ...userSettings, instructions: currentInstructions || '' });
    onClose();
  };

  useEffect(() => {
    const closeModalOnOutsideClick = (event: MouseEvent) => {
      if (!isOpen && dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (!isOpen && event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mousedown', closeModalOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeModalOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [handleClose, isOpen]);

  useEffect(() => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(({ usage, quota }) => {
        setStorageUsage(usage);
        setStorageQuota(quota);
        if (typeof usage !== 'undefined' && typeof quota !== 'undefined') {
          setPercentageUsed(((usage / quota) * 100));
        }
      }).catch(error => {
        console.error('Error getting storage estimate:', error);
      });
    } else {
      console.log('Storage Estimation API is not supported in this browser.');
    }
  }, []);

  const renderStorageInfo = (value?: number | string) => value ?? t('non-applicable');

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
          <div ref={dialogRef}
            className="flex flex-col bg-white dark:bg-gray-850 rounded-lg w-full max-w-md mx-auto overflow-hidden"
            style={{ minHeight: "640px", minWidth: "43em" }}>
            <div id='user-settings-header'
              className="flex justify-between items-center border-b border-gray-200 p-4">
              <h1 className="text-lg font-semibold">{t('settings-header')}</h1>
              <button onClick={handleClose}
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                <XMarkIcon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
            <div id='user-settings-content' className="flex flex-1">
              <div className="border-r border-gray-200 flex flex-col">
                <div
                  className={`cursor-pointer p-4 flex items-center ${activeTab === Tab.GENERAL_TAB ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveTab(Tab.GENERAL_TAB)}>
                  <Cog6ToothIcon className="w-4 h-4 mr-3" aria-hidden="true" />{t('general-tab')}
                </div>
                <div
                  className={`cursor-pointer p-4 flex items-center ${activeTab === Tab.INSTRUCTIONS_TAB ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveTab(Tab.INSTRUCTIONS_TAB)}>
                  <DocumentTextIcon className="w-4 h-4 mr-3"
                    aria-hidden="true" />{t('instructions-tab')}
                </div>
                <div
                  className={`cursor-pointer p-4 flex items-center ${activeTab === Tab.STORAGE_TAB ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveTab(Tab.STORAGE_TAB)}>
                  <CircleStackIcon className="w-4 h-4 mr-3" aria-hidden="true" />{t('storage-tab')}
                </div>
              </div>
              <div className="flex-1 p-4 flex flex-col">
                <div className={`${activeTab === Tab.GENERAL_TAB ? 'flex flex-col flex-1' : 'hidden'}`}>
                  <div className="border-b border-token-border-light pb-3 last-of-type:border-b-0">
                    <div className="flex items-center justify-between setting-panel">
                      <label htmlFor="theme">{t('theme-label')}</label>
                      <select id='theme' name='theme'
                        className="custom-select dark:custom-select border-gray-300 border rounded p-2
                                dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        value={userSettings.userTheme}
                        onChange={(e) => {
                          setUserSettings({
                            ...userSettings,
                            userTheme: e.target.value as Theme
                          });
                        }}>
                        <option value="dark">{t('dark-option')}</option>
                        <option value="light">{t('light-option')}</option>
                        <option value="system">{t('system-option')}</option>
                      </select>

                    </div>
                  </div>
                </div>
                <div
                  className={`${activeTab === Tab.INSTRUCTIONS_TAB ? 'flex flex-col flex-1' : 'hidden'}`}>
                  <div
                    className="flex flex-col flex-1 border-b border-token-border-light pb-3 last-of-type:border-b-0">
                    <EditableInstructions
                      ref={editableInstructionsRef}
                      initialValue={userSettings.instructions}
                      placeholder={OPENAI_DEFAULT_SYSTEM_PROMPT}
                      onChange={(text) => {
                        // setUserSettings({...userSettings, instructions: text});
                      }}
                      className="flex flex-col h-full"
                    />
                  </div>
                </div>
                <div className={`${activeTab === Tab.STORAGE_TAB ? 'flex flex-col flex-1' : 'hidden'}`}>
                  <h3 className="text-lg mb-4">{t('storage-header')}</h3>
                  <div className="setting-panel">
                    <p>Chats are stored locally in your browser's IndexedDB.</p>
                    <p>
                      Usage: {`${renderStorageInfo(formatBytesToMB(storageUsage))} of
                    ${renderStorageInfo(formatBytesToMB(storageQuota))}
                    (${renderStorageInfo(percentageUsed ? `${percentageUsed.toFixed(2)}%` : undefined)})`}
                    </p>
                  </div>
                  <div className="flex items-center justify-between setting-panel">
                    <span>{''}</span>
                    <div>
                      <button onClick={handleDeleteAllConversations}
                        className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700">{t('delete-all-chats-button')}
                      </button>
                      {ConfirmDialog}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default UserSettingsModal;