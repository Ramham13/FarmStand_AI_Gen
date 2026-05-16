"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Calendar, Users, Megaphone, Info, X, Check, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Notification,
  NotificationType,
  getStoredNotifications,
  markAsRead,
  markAllAsRead,
  clearAllNotifications,
  getUnreadCount,
  formatTimestamp,
} from "@/lib/notifications";

const notificationIcons: Record<NotificationType, JSX.Element> = {
  reservation: <Calendar className="w-4 h-4 text-green-600" />,
  waitlist: <Users className="w-4 h-4 text-blue-600" />,
  announcement: <Megaphone className="w-4 h-4 text-purple-600" />,
  system: <Info className="w-4 h-4 text-gray-600" />,
};

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadNotifications = () => {
    const stored = getStoredNotifications();
    setNotifications(stored);
    setUnreadCount(getUnreadCount());
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    loadNotifications();
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
    loadNotifications();
  };

  const handleClearAll = () => {
    clearAllNotifications();
    loadNotifications();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[70vh] bg-white rounded-xl shadow-xl border overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b flex items-center justify-between bg-gray-50">
            <h3 className="font-semibold text-base">Notifications</h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-gray-600 hover:text-green-600 px-2 py-1 min-h-[36px] flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
              <button
                onClick={handleClearAll}
                className="text-xs text-red-600 hover:underline px-2 py-1 min-h-[36px] flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Clear all
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[50vh]">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p>No notifications yet</p>
                <p className="text-xs mt-1">You&apos;ll see updates here</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 hover:bg-gray-50 transition-colors ${
                      !notification.read ? "bg-green-50/50" : ""
                    }`}
                    onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        {notificationIcons[notification.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm font-medium truncate ${!notification.read ? "text-green-800" : "text-gray-800"}`}>
                            {notification.title}
                          </p>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                        {notification.link && (
                          <Link
                            href={notification.link}
                            className="text-xs text-green-600 hover:underline mt-1 inline-block"
                            onClick={() => setIsOpen(false)}
                          >
                            View details →
                          </Link>
                        )}
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
