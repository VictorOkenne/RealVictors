/**
 * UI Store - Zustand State Management
 *
 * Manages global UI state across the app.
 *
 * What goes in this store?
 * ✅ Theme (dark/light mode)
 * ✅ Modal states (which modals are open)
 * ✅ Loading overlays
 * ✅ Toast/snackbar messages
 * ✅ Bottom sheet states
 * ❌ Server data (use TanStack Query)
 * ❌ Form state (use React Hook Form)
 *
 * Why Zustand for UI state?
 * - Share UI state across components easily
 * - No prop drilling for theme, modals, etc.
 * - Persists theme preference to AsyncStorage
 * - Simple API, easy to understand
 *
 * @see https://github.com/pmndrs/zustand
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Theme modes
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Modal identifiers
 * Add new modals here as you create them
 */
export type ModalId =
  | 'create-game'
  | 'edit-profile'
  | 'game-filters'
  | 'share'
  | 'report'
  | 'invite-friends';

/**
 * Toast/Snackbar message
 */
export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

/**
 * UI store state
 */
interface UIState {
  // ========================================================================
  // THEME
  // ========================================================================

  /**
   * Current theme mode
   */
  theme: Theme;

  /**
   * Set theme
   */
  setTheme: (theme: Theme) => void;

  // ========================================================================
  // MODALS
  // ========================================================================

  /**
   * Map of modal IDs to their open/closed state
   */
  modals: Record<ModalId, boolean>;

  /**
   * Open a modal
   */
  openModal: (modalId: ModalId) => void;

  /**
   * Close a modal
   */
  closeModal: (modalId: ModalId) => void;

  /**
   * Toggle a modal (open if closed, close if open)
   */
  toggleModal: (modalId: ModalId) => void;

  /**
   * Close all modals
   */
  closeAllModals: () => void;

  // ========================================================================
  // LOADING
  // ========================================================================

  /**
   * Global loading overlay (for blocking operations)
   */
  isLoading: boolean;

  /**
   * Loading message (optional)
   */
  loadingMessage?: string;

  /**
   * Show loading overlay
   */
  showLoading: (message?: string) => void;

  /**
   * Hide loading overlay
   */
  hideLoading: () => void;

  // ========================================================================
  // TOAST MESSAGES
  // ========================================================================

  /**
   * Active toast messages
   */
  toasts: ToastMessage[];

  /**
   * Show toast message
   */
  showToast: (message: string, type?: ToastMessage['type'], duration?: number) => void;

  /**
   * Hide specific toast
   */
  hideToast: (id: string) => void;

  /**
   * Clear all toasts
   */
  clearToasts: () => void;

  // ========================================================================
  // BOTTOM SHEET
  // ========================================================================

  /**
   * Current bottom sheet content (if any)
   */
  bottomSheet: {
    isOpen: boolean;
    content?: string; // Identifier for what to show
    data?: any; // Optional data for the sheet
  };

  /**
   * Open bottom sheet
   */
  openBottomSheet: (content: string, data?: any) => void;

  /**
   * Close bottom sheet
   */
  closeBottomSheet: () => void;

  // ========================================================================
  // UTILITIES
  // ========================================================================

  /**
   * Reset to default state
   */
  reset: () => void;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialModals: Record<ModalId, boolean> = {
  'create-game': false,
  'edit-profile': false,
  'game-filters': false,
  'share': false,
  'report': false,
  'invite-friends': false,
};

const initialState = {
  theme: 'system' as Theme,
  modals: initialModals,
  isLoading: false,
  loadingMessage: undefined,
  toasts: [],
  bottomSheet: {
    isOpen: false,
    content: undefined,
    data: undefined,
  },
};

// ============================================================================
// STORE DEFINITION
// ============================================================================

/**
 * UI Store
 *
 * Usage Examples:
 *
 * Theme:
 *   ```tsx
 *   const ThemeToggle = () => {
 *     const theme = useUIStore(state => state.theme);
 *     const setTheme = useUIStore(state => state.setTheme);
 *
 *     return (
 *       <Button onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
 *         Toggle Theme
 *       </Button>
 *     );
 *   };
 *   ```
 *
 * Modals:
 *   ```tsx
 *   const CreateGameButton = () => {
 *     const openModal = useUIStore(state => state.openModal);
 *
 *     return <Button onPress={() => openModal('create-game')}>Create Game</Button>;
 *   };
 *
 *   const CreateGameModal = () => {
 *     const isOpen = useUIStore(state => state.modals['create-game']);
 *     const closeModal = useUIStore(state => state.closeModal);
 *
 *     return (
 *       <Modal visible={isOpen} onClose={() => closeModal('create-game')}>
 *         <CreateGameForm />
 *       </Modal>
 *     );
 *   };
 *   ```
 *
 * Loading:
 *   ```tsx
 *   const DataLoader = () => {
 *     const { showLoading, hideLoading } = useUIStore();
 *
 *     const loadData = async () => {
 *       showLoading('Loading games...');
 *       await fetchGames();
 *       hideLoading();
 *     };
 *
 *     return <Button onPress={loadData}>Load</Button>;
 *   };
 *   ```
 *
 * Toast:
 *   ```tsx
 *   const SaveButton = () => {
 *     const showToast = useUIStore(state => state.showToast);
 *
 *     const handleSave = async () => {
 *       try {
 *         await save();
 *         showToast('Saved successfully!', 'success');
 *       } catch (error) {
 *         showToast('Save failed', 'error');
 *       }
 *     };
 *
 *     return <Button onPress={handleSave}>Save</Button>;
 *   };
 *   ```
 */
export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // ========================================================================
      // STATE
      // ========================================================================

      ...initialState,

      // ========================================================================
      // THEME ACTIONS
      // ========================================================================

      setTheme: (theme) => {
        console.log(`🎨 Setting theme to: ${theme}`);
        set({ theme });
      },

      // ========================================================================
      // MODAL ACTIONS
      // ========================================================================

      openModal: (modalId) => {
        console.log(`📖 Opening modal: ${modalId}`);
        set((state) => ({
          modals: {
            ...state.modals,
            [modalId]: true,
          },
        }));
      },

      closeModal: (modalId) => {
        console.log(`📕 Closing modal: ${modalId}`);
        set((state) => ({
          modals: {
            ...state.modals,
            [modalId]: false,
          },
        }));
      },

      toggleModal: (modalId) => {
        const isOpen = get().modals[modalId];
        console.log(`🔄 Toggling modal ${modalId}: ${!isOpen}`);
        set((state) => ({
          modals: {
            ...state.modals,
            [modalId]: !isOpen,
          },
        }));
      },

      closeAllModals: () => {
        console.log('📕 Closing all modals');
        set({ modals: initialModals });
      },

      // ========================================================================
      // LOADING ACTIONS
      // ========================================================================

      showLoading: (message) => {
        console.log(`⏳ Showing loading: ${message || 'Loading...'}`);
        set({
          isLoading: true,
          loadingMessage: message,
        });
      },

      hideLoading: () => {
        console.log('✅ Hiding loading');
        set({
          isLoading: false,
          loadingMessage: undefined,
        });
      },

      // ========================================================================
      // TOAST ACTIONS
      // ========================================================================

      showToast: (message, type = 'info', duration = 3000) => {
        const id = `toast-${Date.now()}`;
        console.log(`🍞 Showing toast [${type}]: ${message}`);

        set((state) => ({
          toasts: [
            ...state.toasts,
            {
              id,
              message,
              type,
              duration,
            },
          ],
        }));

        // Auto-hide after duration
        if (duration > 0) {
          setTimeout(() => {
            get().hideToast(id);
          }, duration);
        }
      },

      hideToast: (id) => {
        console.log(`🍞 Hiding toast: ${id}`);
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },

      clearToasts: () => {
        console.log('🍞 Clearing all toasts');
        set({ toasts: [] });
      },

      // ========================================================================
      // BOTTOM SHEET ACTIONS
      // ========================================================================

      openBottomSheet: (content, data) => {
        console.log(`📄 Opening bottom sheet: ${content}`);
        set({
          bottomSheet: {
            isOpen: true,
            content,
            data,
          },
        });
      },

      closeBottomSheet: () => {
        console.log('📄 Closing bottom sheet');
        set({
          bottomSheet: {
            isOpen: false,
            content: undefined,
            data: undefined,
          },
        });
      },

      // ========================================================================
      // UTILITIES
      // ========================================================================

      reset: () => {
        console.log('🔄 Resetting UI store to defaults');
        set(initialState);
      },
    }),

    // Persistence configuration
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => AsyncStorage),

      // Only persist theme preference
      // Don't persist modals, loading states, toasts (session-only)
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);

// ============================================================================
// SELECTORS
// ============================================================================

/**
 * Select theme only
 */
export const selectTheme = (state: UIState) => state.theme;

/**
 * Select if any modal is open
 */
export const selectIsAnyModalOpen = (state: UIState) =>
  Object.values(state.modals).some((isOpen) => isOpen);

/**
 * Select if specific modal is open
 */
export const selectIsModalOpen = (modalId: ModalId) => (state: UIState) =>
  state.modals[modalId];

/**
 * Select loading state
 */
export const selectIsLoading = (state: UIState) => state.isLoading;

/**
 * Select toasts
 */
export const selectToasts = (state: UIState) => state.toasts;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Show toast outside React components
 */
export const showToast = (message: string, type?: ToastMessage['type'], duration?: number) =>
  useUIStore.getState().showToast(message, type, duration);

/**
 * Show loading outside React components
 */
export const showLoading = (message?: string) =>
  useUIStore.getState().showLoading(message);

/**
 * Hide loading outside React components
 */
export const hideLoading = () =>
  useUIStore.getState().hideLoading();
