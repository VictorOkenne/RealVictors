/**
 * DateRangePicker Component
 *
 * A custom date range picker for selecting start and end dates
 * Used within the FilterModal for custom date range selection
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

interface DateRangePickerProps {
  visible: boolean;
  onClose: () => void;
  onApply: (startDate: Date, endDate: Date) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
  minDate?: Date;
  maxDate?: Date;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  visible,
  onClose,
  onApply,
  initialStartDate,
  initialEndDate,
  minDate,
  maxDate,
}) => {
  const [startDate, setStartDate] = React.useState<Date>(
    initialStartDate || new Date()
  );
  const [endDate, setEndDate] = React.useState<Date>(
    initialEndDate || new Date()
  );
  const [selectingStart, setSelectingStart] = React.useState(true);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const minYear = minDate ? minDate.getFullYear() : currentYear - 10;
  const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 10;
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const selectedDate = selectingStart ? startDate : endDate;
  const setSelectedDate = selectingStart ? setStartDate : setEndDate;

  // Helper to check if a date is within allowed range
  const isDateValid = React.useCallback((date: Date) => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
  }, [minDate, maxDate]);

  // Helper to check if a specific day/month/year combination is valid
  const isDayValid = React.useCallback((day: number) => {
    const testDate = new Date(selectedDate);
    testDate.setDate(day);
    return isDateValid(testDate);
  }, [selectedDate, isDateValid]);

  const isMonthValid = React.useCallback((monthIndex: number) => {
    const testDate = new Date(selectedDate);
    testDate.setMonth(monthIndex);
    return isDateValid(testDate);
  }, [selectedDate, isDateValid]);

  const isYearValid = React.useCallback((year: number) => {
    const testDate = new Date(selectedDate);
    testDate.setFullYear(year);
    return isDateValid(testDate);
  }, [selectedDate, isDateValid]);

  const handleDayPress = (day: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };

  const handleMonthPress = (monthIndex: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(monthIndex);
    setSelectedDate(newDate);
  };

  const handleYearPress = (year: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    setSelectedDate(newDate);
  };

  const handleApply = () => {
    // Ensure startDate is before endDate
    if (startDate > endDate) {
      onApply(endDate, startDate);
    } else {
      onApply(startDate, endDate);
    }
    onClose();
  };

  const formatDate = (date: Date) => {
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const daysInMonth = getDaysInMonth(selectedDate.getMonth(), selectedDate.getFullYear());
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

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
            <Text style={styles.headerTitle}>Select Date Range</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Date Selection Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectingStart && styles.toggleButtonActive,
              ]}
              onPress={() => setSelectingStart(true)}
            >
              <Text style={[
                styles.toggleLabel,
                selectingStart && styles.toggleLabelActive,
              ]}>
                Start Date
              </Text>
              <Text style={[
                styles.toggleDate,
                selectingStart && styles.toggleDateActive,
              ]}>
                {formatDate(startDate)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                !selectingStart && styles.toggleButtonActive,
              ]}
              onPress={() => setSelectingStart(false)}
            >
              <Text style={[
                styles.toggleLabel,
                !selectingStart && styles.toggleLabelActive,
              ]}>
                End Date
              </Text>
              <Text style={[
                styles.toggleDate,
                !selectingStart && styles.toggleDateActive,
              ]}>
                {formatDate(endDate)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date Pickers */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Month Selector */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Month</Text>
              <View style={styles.gridContainer}>
                {months.map((month, index) => {
                  const valid = isMonthValid(index);
                  return (
                    <TouchableOpacity
                      key={month}
                      style={[
                        styles.gridItem,
                        selectedDate.getMonth() === index && styles.gridItemSelected,
                        !valid && styles.gridItemDisabled,
                      ]}
                      onPress={() => valid && handleMonthPress(index)}
                      disabled={!valid}
                    >
                      <Text
                        style={[
                          styles.gridItemText,
                          selectedDate.getMonth() === index && styles.gridItemTextSelected,
                          !valid && styles.gridItemTextDisabled,
                        ]}
                      >
                        {month.substring(0, 3)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Day Selector */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Day</Text>
              <View style={styles.gridContainer}>
                {days.map((day) => {
                  const valid = isDayValid(day);
                  return (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.gridItem,
                        styles.dayItem,
                        selectedDate.getDate() === day && styles.gridItemSelected,
                        !valid && styles.gridItemDisabled,
                      ]}
                      onPress={() => valid && handleDayPress(day)}
                      disabled={!valid}
                    >
                      <Text
                        style={[
                          styles.gridItemText,
                          selectedDate.getDate() === day && styles.gridItemTextSelected,
                          !valid && styles.gridItemTextDisabled,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Year Selector */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Year</Text>
              <View style={styles.gridContainer}>
                {years.map((year) => {
                  const valid = isYearValid(year);
                  return (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.gridItem,
                        selectedDate.getFullYear() === year && styles.gridItemSelected,
                        !valid && styles.gridItemDisabled,
                      ]}
                      onPress={() => valid && handleYearPress(year)}
                      disabled={!valid}
                    >
                      <Text
                        style={[
                          styles.gridItemText,
                          selectedDate.getFullYear() === year && styles.gridItemTextSelected,
                          !valid && styles.gridItemTextDisabled,
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Range</Text>
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
    maxHeight: '85%',
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
  toggleContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  toggleButtonActive: {
    borderColor: COLORS.goldAccent,
    backgroundColor: COLORS.goldAccentLight || '#FFF9E6',
  },
  toggleLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: COLORS.gray600,
    marginBottom: 4,
  },
  toggleLabelActive: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
  },
  toggleDate: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 14,
    color: COLORS.gray700,
  },
  toggleDateActive: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 8,
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.white,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayItem: {
    minWidth: 50,
  },
  gridItemSelected: {
    borderColor: COLORS.goldAccent,
    backgroundColor: COLORS.goldAccentLight || '#FFF9E6',
  },
  gridItemText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  gridItemTextSelected: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
  },
  gridItemDisabled: {
    opacity: 0.3,
    backgroundColor: COLORS.gray100,
  },
  gridItemTextDisabled: {
    color: COLORS.gray400,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.gray400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
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

export default DateRangePicker;
