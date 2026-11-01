import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * useModalA11y - Comprehensive accessibility hook for accessible modals and drawers.
 *
 * Provides:
 * - Escape key dismissal
 * - Focus trapping inside the modal container
 * - Initial focus on mount
 * - Restoration of focus to the triggering element on unmount
 *
 * @param {Object} options
 * @param {boolean} options.isOpen - Whether the modal is currently open
 * @param {Function} options.onClose - Callback triggered when Escape is pressed
 * @param {React.RefObject} [options.initialFocusRef] - Optional element to receive focus first
 * @returns {React.RefObject} containerRef to attach to the dialog wrapper
 */
export function useModalA11y({ isOpen, onClose, initialFocusRef = null }) {
  const containerRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Remember the element that had focus before opening the dialog
    previouslyFocusedElementRef.current = document.activeElement;

    const container = containerRef.current;
    if (!container) return;

    // Focus initial element or first focusable element inside the modal
    const focusTimer = setTimeout(() => {
      if (initialFocusRef && initialFocusRef.current) {
        initialFocusRef.current.focus();
      } else {
        const focusableElements = container.querySelectorAll(FOCUSABLE_SELECTOR);
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else {
          container.focus();
        }
      }
    }, 50);

    // Keydown handler for Escape and Tab trapping
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose && onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusables = Array.from(
          container.querySelectorAll(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null); // only visible elements

        if (focusables.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey) {
          // Shift + Tab: if on first element, wrap to last
          if (document.activeElement === first || !container.contains(document.activeElement)) {
            event.preventDefault();
            last.focus();
          }
        } else {
          // Tab: if on last element, wrap to first
          if (document.activeElement === last || !container.contains(document.activeElement)) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);

      // Return focus to previous element when modal closes
      if (
        previouslyFocusedElementRef.current &&
        typeof previouslyFocusedElementRef.current.focus === "function"
      ) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, onClose, initialFocusRef]);

  return containerRef;
}
