/**
 * FilterModal Component
 *
 * A reusable bottom sheet modal for filtering and sorting content
 * Can be configured with different filter sections and options
 */

import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterSection {
  title: string;
  key: string;
  options: FilterOption[];
  multiSelect?: boolean; // Allow multiple selections
}

export interface FilterState {
  [key: string]: string | string[];
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  sections: FilterSection[];
  selectedFilters: FilterState;
  onApply: (filters: FilterState) => void;
  onReset: () => void;
  onChange?: (filters: FilterState) => void; // Real-time filter changes
}

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  sections,
  selectedFilters,
  onApply,
  onReset,
  onChange,
}) => {
  const [tempFilters, setTempFilters] = React.useState<FilterState>(selectedFilters);

  React.useEffect(() => {
    setTempFilters(selectedFilters);
  }, [selectedFilters, visible]);

  const handleOptionPress = (sectionKey: string, value: string, multiSelect?: boolean) => {
    setTempFilters((prev) => {
      const newFilters = multiSelect
        ? (() => {
            const currentValues = (prev[sectionKey] as string[]) || [];
            const isSelected = currentValues.includes(value);
            return {
              ...prev,
              [sectionKey]: isSelected
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value],
            };
          })()
        : {
            ...prev,
            [sectionKey]: value,
          };

      // Notify parent of changes in real-time
      if (onChange) {
        onChange(newFilters);
      }

      return newFilters;
    });
  };

  const isOptionSelected = (sectionKey: string, value: string, multiSelect?: boolean) => {
    if (multiSelect) {
      const values = tempFilters[sectionKey] as string[] | undefined;
      return values?.includes(value) || false;
    } else {
      return tempFilters[sectionKey] === value;
    }
  };

  const handleApply = () => {
    onApply(tempFilters);
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filter & Sort</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Sections */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {sections.map((section, index) => (
              <View key={`${section.key}-${index}`} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.optionsContainer}>
                  {section.options.map((option) => {
                    const isSelected = isOptionSelected(
                      section.key,
                      option.value,
                      section.multiSelect
                    );

                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.optionButton,
                          isSelected && styles.optionButtonSelected,
                        ]}
                        onPress={() =>
                          handleOptionPress(
                            section.key,
                            option.value,
                            section.multiSelect
                          )
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            isSelected && styles.optionTextSelected,
                          ]}
                        >
                          {option.label}
                        </Text>
                        {isSelected && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
  },
  closeButton: {
    padding: 4,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.gray600,
    lineHeight: 24,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.white,
  },
  optionButtonSelected: {
    borderColor: COLORS.goldAccent,
    backgroundColor: COLORS.goldAccentLight || '#E8F5E9',
  },
  optionText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 15,
    color: COLORS.black,
  },
  optionTextSelected: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
  },
  checkmark: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.gray400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.gray700,
  },
  applyButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.white,
  },
});
