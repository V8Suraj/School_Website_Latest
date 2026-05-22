import React, { useState, useEffect } from "react";

// Toast list store karne ke liye
let toastList = [];

// Sab components ko update karne ke liye
let listeners = [];

// Unique ID generate karega
let count = 0;

function generateId() {
  count++;
  return count.toString();
}

// Toast add function
function toast(props) {

  const id = generateId();

  const newToast = {
    id: id,
    title: props.title,
    description: props.description,
    open: true,
  };

  // New toast add karo
  toastList = [newToast];

  // Sab listeners ko update bhejo
  listeners.forEach((listener) => {
    listener([...toastList]);
  });

  // Auto remove after 3 sec
  setTimeout(() => {

    toastList = toastList.filter((t) => t.id !== id);

    listeners.forEach((listener) => {
      listener([...toastList]);
    });

  }, 3000);

}

// Custom Hook
function useToast() {

  const [toasts, setToasts] = useState(toastList);

  useEffect(() => {

    listeners.push(setToasts);

    return () => {

      listeners = listeners.filter(
        (listener) => listener !== setToasts
      );

    };

  }, []);

  return {
    toasts,
    toast,
  };

}

export { useToast, toast };